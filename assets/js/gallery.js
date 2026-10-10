export function initGallery(gallery) {
  const slides = [...gallery.querySelectorAll('[data-slide]')];
  if (slides.length < 2) return;
  let current = 0;
  let timer;
  let visible = !('IntersectionObserver' in window);
  function advance() {
    slides[current].classList.remove('is-active');
    slides[current].setAttribute('aria-hidden', 'true');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
    slides[current].setAttribute('aria-hidden', 'false');
  }
  function refresh() {
    clearInterval(timer);
    if (visible && !document.hidden) timer = setInterval(advance, 3000);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      refresh();
    }, { threshold: .1 }).observe(gallery);
  }
  document.addEventListener('visibilitychange', refresh);
  refresh();
}
