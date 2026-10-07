import test from 'node:test';
import assert from 'node:assert/strict';
import { initTestimonials } from '../assets/js/carousels.js';

test('depoimentos alternam em dez segundos e mantêm navegação sem controle de pausa', t => {
  const buttons = Object.fromEntries(['prev', 'next'].map(name => [name, {
    textContent: '', addEventListener(_, handler) { this.click = handler; },
  }]));
  const cards = Array.from({ length: 3 }, () => ({
    offsetHeight: 300, dataset: {}, classList: { toggle() {} }, setAttribute() {},
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
