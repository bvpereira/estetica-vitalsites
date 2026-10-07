import { directionsVideoUrl } from './site-config.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('.site-header');
const navigation = document.querySelector('.main-navigation');
const menuButton = document.querySelector('.menu-toggle');

function closeMenu({ returnFocus = false } = {}) {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') { closeMenu({ returnFocus: true }); return; }
  if (event.key !== 'Tab') return;
  const controls = [menuButton, ...navigation.querySelectorAll('a')];
  const first = controls[0];
  const last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
window.matchMedia('(min-width: 951px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 12); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Range gives keyboard and assistive technology access; pointers control the full surface.
document.querySelectorAll('[data-stage]').forEach(stage => {
  const range = stage.querySelector('[data-range]');
  function update(value) {
    const position = Math.max(0, Math.min(100, Number(value)));
    range.value = String(position);
    stage.style.setProperty('--position', `${position}%`);
    range.setAttribute('aria-valuetext', `${Math.round(position)}% da imagem antes visível`);
  }
  range.addEventListener('input', () => update(range.value));
  let pointer = null;
  function updatePointer(event) {
    const rect = stage.getBoundingClientRect();
    if (rect.width) update(((event.clientX - rect.left) / rect.width) * 100);
  }
  range.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault();
    range.focus({ preventScroll: true });
    pointer = event.pointerId;
    range.setPointerCapture(pointer);
    updatePointer(event);
  });
  range.addEventListener('pointermove', event => {
    if (event.pointerId === pointer) updatePointer(event);
  });
  function endPointer(event) {
    if (event.pointerId !== pointer) return;
    if (range.hasPointerCapture(pointer)) range.releasePointerCapture(pointer);
    pointer = null;
  }
  range.addEventListener('pointerup', endPointer);
  range.addEventListener('pointercancel', endPointer);
  range.addEventListener('lostpointercapture', () => { pointer = null; });
});

const resultTabs = [...document.querySelectorAll('[data-result]')];
function selectResult(index, focus = false) {
  resultTabs.forEach((tab, tabIndex) => {
    const active = tabIndex === index;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel.hidden = !active;
    if (active) {
      const stage = panel.querySelector('[data-stage]');
      const range = panel.querySelector('[data-range]');
      range.value = '50';
      range.setAttribute('aria-valuetext', '50% da imagem antes visível');
      stage.style.setProperty('--position', '50%');
      document.querySelector('#comparison-title').textContent = tab.dataset.title;
      if (focus) tab.focus();
    }
  });
}
resultTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectResult(index));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % resultTabs.length;
    if (event.key === 'ArrowLeft') target = (index - 1 + resultTabs.length) % resultTabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = resultTabs.length - 1;
    if (target !== undefined) { event.preventDefault(); selectResult(target, true); }
  });
});

const gallery = document.querySelector('[data-gallery]');
const viewport = gallery.querySelector('.gallery-viewport');
const slides = [...gallery.querySelectorAll('[data-slide]')];
const dots = [...gallery.querySelectorAll('[data-gallery-dot]')];
const previous = gallery.querySelector('[data-gallery-prev]');
const next = gallery.querySelector('[data-gallery-next]');
let currentSlide = 0;
function updateGallery(index) {
  currentSlide = index;
  slides.forEach((slide, i) => slide.classList.toggle('is-current', i === index));
  dots.forEach((dot, i) => {
    if (i === index) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
  gallery.querySelector('[data-gallery-count]').textContent = String(index + 1).padStart(2, '0');
  previous.disabled = index === 0;
  next.disabled = index === slides.length - 1;
}
function goToSlide(index, smooth = true) {
  const target = Math.max(0, Math.min(slides.length - 1, index));
  const slideRect = slides[target].getBoundingClientRect();
  const viewportRect = viewport.getBoundingClientRect();
  const offset = slideRect.left + slideRect.width / 2 - (viewportRect.left + viewportRect.width / 2);
  viewport.scrollTo({ left: viewport.scrollLeft + offset, behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant' });
  updateGallery(target);
}
previous.addEventListener('click', () => goToSlide(currentSlide - 1));
next.addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => goToSlide(index)));
viewport.addEventListener('keydown', event => {
  let target;
  if (event.key === 'ArrowRight') target = currentSlide + 1;
  if (event.key === 'ArrowLeft') target = currentSlide - 1;
  if (event.key === 'Home') target = 0;
  if (event.key === 'End') target = slides.length - 1;
  if (target !== undefined) { event.preventDefault(); goToSlide(target); }
});
let scrollTimer;
viewport.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    const viewportRect = viewport.getBoundingClientRect();
    const center = viewportRect.left + viewportRect.width / 2;
    let closest = 0;
    let distance = Infinity;
    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const delta = Math.abs(rect.left + rect.width / 2 - center);
      if (delta < distance) { distance = delta; closest = index; }
    });
    updateGallery(closest);
  }, 120);
}, { passive: true });
// Touch uses native momentum scrolling and snap; mouse drag uses pointer capture.
let drag = null;
viewport.addEventListener('pointerdown', event => {
  if (event.pointerType !== 'mouse' || event.button !== 0) return;
  drag = { id: event.pointerId, x: event.clientX, scroll: viewport.scrollLeft };
  viewport.setPointerCapture(event.pointerId);
  viewport.classList.add('is-dragging');
});
viewport.addEventListener('pointermove', event => {
  if (drag && event.pointerId === drag.id) viewport.scrollLeft = drag.scroll - (event.clientX - drag.x);
});
function stopDrag(event) {
  if (!drag || event.pointerId !== drag.id) return;
  drag = null;
  viewport.classList.remove('is-dragging');
  if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
}
viewport.addEventListener('pointerup', stopDrag);
viewport.addEventListener('pointercancel', stopDrag);
viewport.addEventListener('lostpointercapture', () => { drag = null; viewport.classList.remove('is-dragging'); });
viewport.addEventListener('dragstart', event => event.preventDefault());
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => goToSlide(currentSlide, false), 150); });
updateGallery(0);

const dialog = document.querySelector('.directions-dialog');
document.querySelector('[data-directions]').addEventListener('click', () => {
  if (directionsVideoUrl) {
    const url = new URL(directionsVideoUrl);
    if (url.protocol === 'https:') window.open(url.href, '_blank', 'noopener,noreferrer');
  } else dialog.showModal();
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('will-reveal');
    observer.observe(element);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      document.querySelectorAll('.will-reveal').forEach(element => element.classList.remove('will-reveal'));
    }
  });
}
