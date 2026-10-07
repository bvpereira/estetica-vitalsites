import test from 'node:test';
import assert from 'node:assert/strict';
import { renderPage, structuredData } from '../src/page.mjs';
import { clinic, maps, whatsappUrl, treatments } from '../src/config.mjs';
import { validateConfig, validateHtml } from '../scripts/validate.mjs';
import { escape, photo } from '../src/components/shared.mjs';
import { wrapPosition, advanceDistance } from '../assets/js/gallery.js';
import { faqItems } from '../src/faq.mjs';

test('contatos e URLs mantêm os dados centralizados, inclusive acentos nas mensagens', () => {
  validateConfig();
  assert.equal(new URL(whatsappUrl('Olá! Quero avaliação facial.')).searchParams.get('text'), 'Olá! Quero avaliação facial.');
  assert.equal(new URL(maps.search).searchParams.get('query'), clinic.address.full);
});

test('cada tratamento abre seu próprio diálogo e oferece duas formas de voltar', () => {
  const html = renderPage();
  for (const treatment of treatments) {
    assert.ok(html.includes(`data-treatment-open="${treatment.id}"`));
    const dialog = html.match(new RegExp(`<dialog[^>]*id="treatment-dialog-${treatment.id}"[\\s\\S]*?<\\/dialog>`))[0];
    assert.ok(dialog.includes(treatment.explanation));
    assert.ok(dialog.includes('Para quem pode ser indicado'));
    assert.ok(dialog.includes('IMAGEM ANTES:'));
    assert.ok(dialog.includes('IMAGEM DEPOIS:'));
    assert.equal((dialog.match(/data-dialog-close/g) || []).length, 2);
  }
});

test('Hero usa os arquivos enviados e a galeria não apresenta navegação nem numeração nas legendas', () => {
  const html = renderPage();
  assert.ok(html.includes('/assets/images/hero-background.png'));
  assert.ok(html.includes('/assets/images/hero-logo.png'));
  assert.ok(html.includes('/assets/images/aura-recepcao.png'));
  assert.ok(html.includes('/assets/images/mariana-costa.png'));
  for (const removed of ['Descubra a Aura', 'Essência preservada.', 'Um novo olhar para o cuidado', 'Conheça quem cuida de você', 'Será um prazer receber você', 'data-gallery-prev', 'data-gallery-next']) assert.ok(!html.includes(removed), removed);
  assert.ok(html.includes('<figcaption>Recepção</figcaption>'));
});
test('HTML de produção tem navegação e referências acessíveis válidas sem precisar de JS para o conteúdo', () => {
  const html = renderPage();
  validateHtml(html);
  for (const id of ['inicio', 'introducao', 'tratamentos', 'sobre', 'resultados', 'clinica', 'contato']) assert.ok(html.includes(`id="${id}"`));
  assert.ok(html.includes('Depoimentos de exemplo, sem vínculo com pacientes reais.'));
  assert.ok(!html.includes('Clínica fictícia'));
  assert.ok(html.includes('role="tablist"'));
});

test('galeria acumula deslocamentos menores que um pixel em navegadores com scroll inteiro', () => {
  let scroll = 0;
  let remainder = 0;
  for (let frame = 0; frame < 120; frame++) {
    const step = advanceDistance(16, remainder);
    scroll += step.pixels;
    remainder = step.remainder;
  }
  assert.equal(scroll, 67);
  assert.ok(Math.abs(remainder - .2) < .001);
});
test('dados estruturados não apresentam avaliações fictícias nem credenciais inventadas', () => {
  const data = structuredData();
  assert.equal(data['@type'], 'LocalBusiness');
  assert.equal(data.address.addressLocality, 'Rio das Ostras');
  assert.equal(data.openingHoursSpecification.length, 2);
  assert.ok(!data.aggregateRating && !data.review && !data.medicalSpecialty);
});
test('fotos reais substituem placeholders sem link vazio e usam carregamento adequado', () => {
  const image = { src: '/assets/images/retrato.webp', alt: 'Retrato de Mariana' };
  assert.match(photo(image), /loading="lazy"/);
  assert.match(photo(image, '', true), /fetchpriority="high"/);
  assert.match(photo({ src: '', alt: 'IMAGEM: clínica' }), /role="img"/);
  assert.ok(!photo({ src: '', alt: 'IMAGEM: clínica' }).includes('<img'));
  assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');
});
test('o validador rejeita âncoras quebradas antes de publicar', () => {
  assert.throws(() => validateHtml(renderPage().replace('href="#tratamentos"', 'href="#inexistente"')), /Âncora inexistente/);
});

test('galeria mantém a posição visual ao atravessar os limites do loop em ambos os sentidos', () => {
  assert.equal(wrapPosition(5200, 1000, 4200), 1000);
  assert.equal(wrapPosition(999, 1000, 4200), 5199);
  assert.equal(wrapPosition(1000 + 4200 * 5 + 150.5, 1000, 4200), 1150.5);
  assert.equal(wrapPosition(1200, 1000, 4200), 1200);
  assert.equal(wrapPosition(1200, 1000, 0), 1000);
});

test('a clínica apresenta localização antes da galeria e o cuidado inclui acompanhamento dos resultados', () => {
  const html = renderPage();
  assert.ok(html.indexOf('class="section location"') < html.indexOf('class="gallery-component"'));
  assert.ok(html.indexOf('<iframe') < html.indexOf('class="gallery-component"'));
  assert.ok(html.includes('data-gallery-toggle'));
  assert.ok(html.includes('Cuide da sua recuperação'));
  assert.ok(html.includes('Acompanhe sua evolução'));
  assert.ok(html.includes('Planeje a continuidade do cuidado'));
});

test('FAQ tem dez respostas visíveis no HTML e dados estruturados correspondentes', () => {
  const html = renderPage();
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const faqSchema = schemas.find(schema => schema['@type'] === 'FAQPage');
  assert.equal(faqItems.length, 10);
  assert.equal(faqSchema.mainEntity.length, 10);
  const visibleFaq = html.slice(html.indexOf('id="faq"'), html.indexOf('<footer'));
  assert.equal((visibleFaq.match(/<details /g) || []).length, 10);
  for (const [index, item] of faqItems.entries()) {
    const question = faqSchema.mainEntity[index];
    assert.equal(question.name, item.question);
    assert.equal(question.acceptedAnswer.text, item.paragraphs.join('\n\n'));
    assert.ok(visibleFaq.includes(escape(item.question)));
    for (const paragraph of item.paragraphs) assert.ok(visibleFaq.replaceAll('<strong>', '').replaceAll('</strong>', '').includes(escape(paragraph)));
  }
  assert.match(visibleFaq, /name="aura-faq"/);
  assert.ok(html.indexOf('class="final-cta"') < html.indexOf('id="faq"'));
  assert.ok(/<\/section>\s*<\/main>\s*$/.test(visibleFaq));
  const cta = visibleFaq.match(/href="(https:\/\/wa\.me\/[^\"]+)"/)[1].replaceAll('&amp;', '&');
  assert.equal(new URL(cta).pathname, `/${clinic.whatsapp}`);
  assert.equal(new URL(cta).searchParams.get('text'), clinic.faqWhatsappMessage);
});
