// Continuous motion at a constant speed, with repeated visual copies for a seamless loop.
// Only the ten original slides are exposed to assistive technology.
export function wrapPosition(position, start, length) {
  if (length <= 0) return start;
  return start + ((position - start) % length + length) % length;
}

export function advanceDistance(elapsed, remainder = 0) {
  const distance = elapsed * .035 + remainder;
  const pixels = Math.floor(distance);
  return { pixels, remainder: distance - pixels };
}

export function initGallery(gallery) {
  const viewport = gallery.querySelector('.gallery-viewport');
  const track = gallery.querySelector('.gallery-track');
  const slides = [...gallery.querySelectorAll('[data-slide]')];
  const before = document.createDocumentFragment();
  const after = document.createDocumentFragment();
  slides.forEach(slide => {
    for (const fragment of [before, after]) {
      const copy = slide.cloneNode(true);
      copy.removeAttribute('data-slide');
      copy.removeAttribute('role');
      copy.removeAttribute('aria-roledescription');
      copy.removeAttribute('aria-label');
      copy.setAttribute('aria-hidden', 'true');
      copy.inert = true;
      copy.dataset.galleryCopy = '';
      fragment.append(copy);
    }
  });
  track.prepend(before);
  track.append(after);
  const allSlides = [...track.children];
  let currentSlide = 0;
  let start = 0;
  let cycle = 0;
  let frame = 0;
  let lastTime = 0;
  let remainder = 0;
  let touching = false;
  let visible = false;
  let drag = null;

  function active() {
    return !touching && visible && !document.hidden;
  }
  function updateGallery(index) { currentSlide = index; }
  function slidePosition(slide) {
    return slide.offsetLeft + slide.offsetWidth / 2 - viewport.clientWidth / 2;
  }
  function measure() {
    start = slidePosition(slides[0]);
    cycle = allSlides[slides.length * 2].offsetLeft - slides[0].offsetLeft;
    viewport.scrollLeft = slidePosition(slides[currentSlide]);
  }
  function synchronize() {
    if (!cycle) return;
    const wrapped = wrapPosition(viewport.scrollLeft, start, cycle);
    if (Math.abs(wrapped - viewport.scrollLeft) > 1) {
      // Keep mouse dragging consistent across a loop boundary.
      if (drag) drag.scroll += wrapped - viewport.scrollLeft;
      viewport.scrollLeft = wrapped;
    }
    const center = viewport.scrollLeft + viewport.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;
    allSlides.forEach((slide, index) => {
      const delta = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
      if (delta < distance) { closest = index % slides.length; distance = delta; }
    });
    if (closest !== currentSlide) updateGallery(closest);
  }
  function tick(time) {
    frame = 0;
    if (!active()) { lastTime = 0; return; }
    if (lastTime) {
      const elapsed = Math.min(time - lastTime, 50);
      const step = advanceDistance(elapsed, remainder);
      remainder = step.remainder;
      if (step.pixels) {
        viewport.scrollLeft = wrapPosition(viewport.scrollLeft + step.pixels, start, cycle);
        synchronize();
      }
    }
    lastTime = time;
    frame = requestAnimationFrame(tick);
  }
  function refresh() {
    if (active() && !frame) { lastTime = 0; frame = requestAnimationFrame(tick); }
    else if (!active() && frame) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
  }
  function goToSlide(index) {
    const target = (index + slides.length) % slides.length;
    // Select the closest visual copy so next/previous also work at either end.
    const candidates = allSlides.filter((_, i) => i % slides.length === target);
    const nearest = candidates.reduce((best, slide) => Math.abs(slidePosition(slide) - viewport.scrollLeft) < Math.abs(slidePosition(best) - viewport.scrollLeft) ? slide : best);
    viewport.scrollTo({ left: slidePosition(nearest), behavior: 'instant' });
    updateGallery(target);
  }
  viewport.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = currentSlide + 1;
    if (event.key === 'ArrowLeft') target = currentSlide - 1;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = slides.length - 1;
    if (target !== undefined) { event.preventDefault(); goToSlide(target); }
  });
  viewport.addEventListener('scroll', synchronize, { passive: true });
  viewport.addEventListener('pointerdown', event => {
    touching = true;
    refresh();
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, scroll: viewport.scrollLeft };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', event => {
    if (drag && event.pointerId === drag.id) viewport.scrollLeft = drag.scroll - (event.clientX - drag.x);
  });
  function stopDrag(event) {
    if (!touching && !drag) return;
    touching = false;
    if (drag && event.pointerId === drag.id) {
      drag = null;
      viewport.classList.remove('is-dragging');
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    }
    refresh();
  }
  window.addEventListener('pointerup', stopDrag);
  window.addEventListener('pointercancel', stopDrag);
  viewport.addEventListener('lostpointercapture', stopDrag);
  viewport.addEventListener('dragstart', event => event.preventDefault());
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 150); });
  document.addEventListener('visibilitychange', refresh);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; refresh(); }, { threshold: .05 }).observe(gallery);
  } else visible = true;
  measure();
  updateGallery(0);
  refresh();
}
