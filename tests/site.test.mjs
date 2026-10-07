import test from 'node:test';
import assert from 'node:assert/strict';
import { renderPage, structuredData } from '../src/page.mjs';
import { clinic, maps, whatsappUrl } from '../src/config.mjs';
import { validateConfig, validateHtml } from '../scripts/validate.mjs';
import { escape, photo } from '../src/components/shared.mjs';
import { wrapPosition } from '../assets/js/gallery.js';

test('contatos e URLs mantêm os dados centralizados, inclusive acentos nas mensagens', () => {
  validateConfig();
  assert.equal(new URL(whatsappUrl('Olá! Quero avaliação facial.')).searchParams.get('text'), 'Olá! Quero avaliação facial.');
  assert.equal(new URL(maps.search).searchParams.get('query'), clinic.address.full);
});
test('HTML de produção tem navegação e referências acessíveis válidas sem precisar de JS para o conteúdo', () => {
  const html = renderPage();
  validateHtml(html);
  for (const id of ['inicio', 'introducao', 'tratamentos', 'sobre', 'resultados', 'clinica', 'contato']) assert.ok(html.includes(`id="${id}"`));
  assert.ok(html.includes('Depoimentos fictícios'));
  assert.ok(html.includes('Clínica fictícia'));
  assert.ok(html.includes('role="tablist"'));
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
