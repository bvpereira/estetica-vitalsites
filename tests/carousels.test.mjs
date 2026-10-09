import test from 'node:test';
import assert from 'node:assert/strict';
import { initTestimonials, initTreatments } from '../assets/js/carousels.js';

test('depoimentos alternam em dez segundos e mantêm navegação sem controle de pausa', t => {
  const buttons = Object.fromEntries(['prev', 'next'].map(name => [name, {
    textContent: '', addEventListener(_, handler) { this.click = handler; },
  }]));
  const cards = Array.from({ length: 3 }, () => ({
    get offsetHeight() { throw new Error('Depoimentos devem dimensionar-se pelo CSS.'); }, dataset: {}, classList: { toggle() {} }, setAttribute() {},
  }));
  const quotes = { style: {} };
  const root = {
    querySelectorAll: () => cards,
    querySelector: selector => selector === '.quotes' ? quotes : buttons[selector.includes('prev') ? 'prev' : selector.includes('next') ? 'next' : 'pause'],
  };
  const events = {};
  const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { hidden: false, addEventListener: (name, handler) => { events[name] = handler; } } });
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { addEventListener() {} } });
  t.after(() => {
    if (originalDocument) Object.defineProperty(globalThis, 'document', originalDocument); else delete globalThis.document;
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else delete globalThis.window;
  });
  let nextId = 0;
  const timers = new Map();
  t.mock.method(globalThis, 'setInterval', (callback, delay) => { timers.set(++nextId, { callback, delay }); return nextId; });
  t.mock.method(globalThis, 'clearInterval', id => timers.delete(id));
  initTestimonials(root);
  assert.equal(timers.size, 1);
  assert.equal([...timers.values()][0].delay, 10000);
  assert.equal(cards[0].dataset.position, 'center');
  [...timers.values()][0].callback();
  assert.equal(cards[1].dataset.position, 'center');
  buttons.next.click();
  assert.equal(cards[2].dataset.position, 'center');
  buttons.prev.click();
  assert.equal(cards[1].dataset.position, 'center');
  assert.equal(timers.size, 1);
  document.hidden = true;
  events.visibilitychange();
  assert.equal(timers.size, 0);
});

test('tratamentos usam medidas em cache após alterar controles e ao navegar', t => {
  let dirty = false;
  let slideWidth = 300;
  const read = value => { assert.equal(dirty, false, 'Leitura de layout após escrita no DOM'); return value; };
  const slides = Array.from({ length: 6 }, (_, index) => ({
    get offsetLeft() { return read(index * (slideWidth + 32)); },
    get offsetWidth() { return read(slideWidth); },
  }));
  const viewport = {
    get clientWidth() { return read(slideWidth * 3 + 64); }, scrollLeft: 0,
    scrollTo({ left }) { this.scrollLeft = left; dirty = true; },
    addEventListener(name, callback) { this[name] = callback; },
  };
  const button = () => ({ addEventListener(name, callback) { this[name] = callback; }, setAttribute() { dirty = true; } });
  const prev = button(), next = button();
  const pages = { children: [], replaceChildren() { this.children = []; dirty = true; }, append(item) { this.children.push(item); dirty = true; } };
  const root = {
    querySelectorAll: () => slides,
    querySelector: selector => ({ '.treatment-viewport': viewport, '[data-treatment-prev]': prev, '[data-treatment-next]': next, '[data-treatment-pages]': pages })[selector],
  };
  const originals = ['window', 'document', 'ResizeObserver'].map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]);
  let resize;
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { ResizeObserver: true } });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { createElement: button } });
  Object.defineProperty(globalThis, 'ResizeObserver', { configurable: true, value: class { constructor(callback) { resize = callback; } observe() {} } });
  t.after(() => originals.forEach(([name, descriptor]) => { if (descriptor) Object.defineProperty(globalThis, name, descriptor); else delete globalThis[name]; }));
  initTreatments(root, { matches: true });
  resize();
  assert.equal(pages.children.length, 2);
  next.click();
  assert.equal(viewport.scrollLeft, 996);
  assert.equal(next.disabled, true);
  prev.click();
  assert.equal(viewport.scrollLeft, 0);
  // A new layout pass precedes ResizeObserver when the viewport changes.
  dirty = false;
  slideWidth = 220;
  resize();
  next.click();
  assert.equal(viewport.scrollLeft, 756);
});
