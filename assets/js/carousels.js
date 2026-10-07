export function initTreatments(root, reducedMotion) {
  const viewport = root.querySelector('.treatment-viewport');
  const slides = [...root.querySelectorAll('.treatment')];
  const prev = root.querySelector('[data-treatment-prev]');
  const next = root.querySelector('[data-treatment-next]');
  const pages = root.querySelector('[data-treatment-pages]');
  let perPage = 3;
  let currentPage = 0;
  let totalPages = 2;
  const offset = slide => slide.offsetLeft - slides[0].offsetLeft;
  function updateControls() {
    prev.disabled = currentPage === 0;
    next.disabled = currentPage === totalPages - 1;
    [...pages.children].forEach((button, index) => button.setAttribute('aria-current', index === currentPage ? 'true' : 'false'));
  }
  function goToPage(index, smooth = true) {
    currentPage = Math.max(0, Math.min(totalPages - 1, index));
    viewport.scrollTo({ left: offset(slides[currentPage * perPage]), behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant' });
    updateControls();
  }
  function measure() {
    perPage = Math.max(1, Math.round(viewport.clientWidth / slides[0].offsetWidth));
    totalPages = Math.ceil(slides.length / perPage);
    currentPage = Math.min(currentPage, totalPages - 1);
    pages.replaceChildren();
    for (let index = 0; index < totalPages; index++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = String(index + 1).padStart(2, '0');
      button.setAttribute('aria-label', `Ver tratamentos ${index * perPage + 1} a ${Math.min(slides.length, (index + 1) * perPage)}`);
      button.addEventListener('click', () => goToPage(index));
      pages.append(button);
    }
    goToPage(currentPage, false);
  }
  prev.addEventListener('click', () => goToPage(currentPage - 1));
  next.addEventListener('click', () => goToPage(currentPage + 1));
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); goToPage(currentPage + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let timer;
  viewport.addEventListener('scroll', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      currentPage = Math.min(totalPages - 1, Math.round(viewport.scrollLeft / (offset(slides[1]) * perPage)));
      updateControls();
    }, 120);
  }, { passive: true });
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 150); });
  measure();
}

export function initTreatmentDialogs() {
  document.querySelectorAll('[data-treatment-open]').forEach(button => {
    const dialog = document.getElementById(button.getAttribute('aria-controls'));
    button.addEventListener('click', () => {
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add('dialog-open');
    });
    dialog.querySelectorAll('[data-dialog-close]').forEach(close => close.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); button.focus({ preventScroll: true }); });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
}

export function initTestimonials(root) {
  const cards = [...root.querySelectorAll('[data-quote]')];
  let current = 0;
  let timer;
  let visible = false;
  function measure() {
    root.querySelector('.quotes').style.minHeight = `${Math.max(...cards.map(card => card.offsetHeight)) + 36}px`;
  }
  function select(index) {
    current = (index + cards.length) % cards.length;
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === current);
      card.dataset.position = i === current ? 'center' : i === (current + 1) % cards.length ? 'right' : 'left';
      card.setAttribute('aria-hidden', String(i !== current));
    });
  }
  function refresh() {
    clearInterval(timer);
    if (!document.hidden && visible) timer = setInterval(() => select(current + 1), 10000);
  }
  root.querySelector('[data-testimonial-prev]').addEventListener('click', () => { select(current - 1); refresh(); });
  root.querySelector('[data-testimonial-next]').addEventListener('click', () => { select(current + 1); refresh(); });
  document.addEventListener('visibilitychange', refresh);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; refresh(); }, { threshold: .15 }).observe(root);
  else visible = true;
  select(0);
  measure();
  document.fonts?.ready.then(measure);
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 150); });
  refresh();
}
