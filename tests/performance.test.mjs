import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import { renderPage } from '../src/page.mjs';
import { validateHtml } from '../scripts/validate.mjs';
import { bundleScripts } from '../scripts/bundle.mjs';

test('HTML entrega estilos sem CSS externo e antecipa fontes locais válidas', () => {
  const html = renderPage();
  assert.ok(!html.includes('fonts.googleapis.com') && !html.includes('fonts.gstatic.com'));
  assert.ok(!/<link[^>]+rel="stylesheet"/.test(html));
  assert.match(html, /<style>[\s\S]*\.hero-dark[\s\S]*<\/style>/);
  const fonts = validateHtml(html).filter(asset => asset.endsWith('.woff2'));
  assert.equal(fonts.length, 3);
  for (const font of fonts) {
    const bytes = readFileSync(new URL(`..${font}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'wOF2');
    assert.match(html, new RegExp(`<link rel="preload" href="${font}" as="font" type="font/woff2" crossorigin>`));
  }
  assert.equal((html.match(/font-display: swap/g) || []).length, 3);
});

test('bundle adiado contém todas as interações sem solicitações em cadeia de módulos', () => {
  const script = bundleScripts();
  assert.doesNotThrow(() => new Script(script));
  assert.ok(!/^\s*(import|export)\b/m.test(script));
  for (const name of ['initGallery', 'initTreatments', 'initTreatmentDialogs', 'initTestimonials', 'initFaq']) assert.ok(script.includes(`function ${name}(`));
  assert.match(renderPage(), /<script defer src="\/assets\/js\/site\.js"><\/script>/);
});
