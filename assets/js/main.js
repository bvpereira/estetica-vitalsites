import { directionsVideoUrl } from './site-config.js';
import { initGallery } from './gallery.js';
import { initTreatments, initTreatmentDialogs, initTestimonials } from './carousels.js';
import { initFaq } from './faq.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
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

initGallery(document.querySelector('[data-gallery]'));
initTreatments(document.querySelector('[data-treatments]'), reducedMotion);
initTreatmentDialogs();
initTestimonials(document.querySelector('[data-testimonials]'));
initFaq(document.querySelector('#faq'));
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
