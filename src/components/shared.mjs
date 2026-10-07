import { clinic, whatsappUrl } from '../config.mjs';

export function escape(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

const paths = {
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  whatsapp: '<path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.8a8.5 8.5 0 1 1 16.1-4.1Z"/><path d="M8.2 7.5c-.9 1.6.5 4 2.2 5.7s4.1 3.1 5.7 2.2l.8-1.3-2.6-1.3-.9 1c-1.5-.7-2.9-2.1-3.6-3.6l1-.9-1.3-2.6Z"/>',
  location: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sparkle: '<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4Z"/>',
  leaf: '<path d="M20 4C9 2 2 9 6 16s16 4 14-12Z"/><path d="M4 21 16 9"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
  heart: '<path d="M12 20S3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12Z"/>',
  play: '<path d="m9 5 11 7-11 7Z"/>',
};
export function icon(name, className = '') {
  return `<svg class="icon ${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
}
export function photo(image, className = '', eager = false) {
  if (image.src) return `<div class="photo ${className}"><img src="${escape(image.src)}" alt="${escape(image.alt)}" width="1200" height="1400" loading="${eager ? 'eager' : 'lazy'}" decoding="async" ${eager ? 'fetchpriority="high"' : ''}></div>`;
  return `<div class="photo placeholder ${className}" role="img" aria-label="${escape(image.alt)}"><span class="photo-mark" aria-hidden="true">a</span><span class="placeholder-label" aria-hidden="true">[${escape(image.alt)}]</span></div>`;
}
export function whatsapp(label, className = 'button', message) {
  return `<a class="${className}" href="${escape(whatsappUrl(message))}" target="_blank" rel="noopener noreferrer">${escape(label)}${icon('diagonal')}</a>`;
}
export function instagram(label, className = 'text-link') {
  return `<a class="${className}" href="${escape(clinic.instagram.url)}" target="_blank" rel="noopener noreferrer">${escape(label)}${icon('instagram')}</a>`;
}
export function eyebrow(text, number = '') {
  return `<p class="eyebrow">${number ? `<span>${number}</span>` : ''}${text}</p>`;
}
