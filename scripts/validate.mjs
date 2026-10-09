import assert from 'node:assert/strict';
import { clinic, gallery, images, maps, results, treatments, whatsappUrl } from '../src/config.mjs';

export function validateConfig() {
  assert.match(clinic.whatsapp, /^\d{12,15}$/);
  assert.equal(new URL(whatsappUrl()).searchParams.get('text'), clinic.whatsappMessage);
  assert.equal(new URL(maps.search).searchParams.get('query'), clinic.address.full);
  assert.equal(new URL(maps.embed).searchParams.get('q'), clinic.address.full);
  for (const value of [clinic.siteUrl, clinic.instagram.url, ...(clinic.directionsVideoUrl && !clinic.directionsVideoUrl.startsWith('/assets/videos/') ? [clinic.directionsVideoUrl] : [])]) assert.equal(new URL(value).protocol, 'https:');
  assert.equal(treatments.length, 6);
  assert.equal(results.length, 3);
  assert.equal(gallery.length, 10);
  const allImages = [...Object.values(images), ...treatments.flatMap(item => [item.image, item.before, item.after]), ...results.flatMap(item => [item.before, item.after]), ...gallery.map(item => item.image)];
  for (const image of allImages) {
    assert.ok(image.alt.trim(), 'Cada imagem precisa de descrição.');
    if (image.src) assert.match(image.src, /^\/assets\/images\/[a-zA-Z0-9_./-]+\.(webp|avif|jpe?g|png|svg)$/i, 'Utilize uma imagem local em /assets/images/.');
    if (image.variants) {
      assert.ok(image.width > 0 && image.height > 0 && image.sizes, 'Imagem responsiva precisa de dimensões e sizes.');
      for (const variant of image.variants) {
        assert.match(variant.src, /^\/assets\/images\/[a-zA-Z0-9_./-]+\.webp$/);
        assert.ok(variant.width > 0);
      }
    }
  }
}

export function validateHtml(html) {
  assert.equal((html.match(/<h1\b/g) || []).length, 1, 'A página deve ter um único H1.');
  assert.ok(!/<form\b/i.test(html), 'Não criar formulário.');
  assert.ok(!/\b(?:src|href)=""/.test(html), 'Não gerar links ou imagens vazios.');
  for (const match of html.matchAll(/<a\b[^>]*href="(https:[^"]+)"[^>]*>/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'));
    if (url.hostname === 'wa.me') {
      assert.equal(url.pathname, `/${clinic.whatsapp}`);
      assert.ok(url.searchParams.get('text'), 'WhatsApp precisa de mensagem automática.');
    }
    assert.ok(match[0].includes('rel="noopener noreferrer"'), 'Link externo deve proteger a nova aba.');
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'IDs duplicados.');
  const references = [...html.matchAll(/\bhref="#([^"]+)"/g)].map(match => match[1]);
  for (const target of references) assert.ok(ids.includes(target), `Âncora inexistente: ${target}`);
  for (const attribute of ['aria-controls', 'aria-labelledby']) {
    for (const match of html.matchAll(new RegExp(`${attribute}="([^"]+)"`, 'g'))) {
      for (const target of match[1].split(' ')) assert.ok(ids.includes(target), `Referência ARIA inexistente: ${target}`);
    }
  }
  assert.equal((html.match(/data-slide>/g) || []).length, 10);
  assert.ok(!html.includes('data-gallery-dot='), 'Galeria da clínica não deve ter navegação por indicadores.');
  assert.equal((html.match(/data-range>/g) || []).length, 3);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.name, clinic.name);
  assert.equal(schema.telephone, `+${clinic.whatsapp}`);
  assert.ok(!('aggregateRating' in schema), 'Não publicar avaliações fictícias como classificação real.');
  const assets = [...html.matchAll(/(?:href|src)="(\/assets\/[^"?]+)"/g)].map(match => match[1]);
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const [asset, descriptor] = candidate.trim().split(/\s+/);
      assert.match(asset, /^\/assets\/images\/[a-zA-Z0-9_./-]+\.webp$/);
      assert.match(descriptor, /^\d+w$/);
      assets.push(asset);
    }
  }
  for (const match of html.matchAll(/url\(['"]?(\/assets\/[^'"\s)]+)['"]?\)/g)) assets.push(match[1]);
  return [...new Set(assets)];
}
