import { clinic, whatsappUrl } from '../config.mjs';

export function escape(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

const paths = {
  accessibility: '<circle cx="12" cy="4" r="1.5"/><path d="m7 8 5-1 5 1M12 7v6l-4 7m4-7 4 7"/><path d="M7 12a6 6 0 1 0 10 5"/>',
  snowflake: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7m-12-3.5L12 7l3.3-3.5m-6.6 17L12 17l3.3 3.5M3 10l4-1-1-4m15 9-4 1 1 4M3 14l4 1-1 4m15-9-4-1 1-4"/>',
  wifi: '<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0"/><circle cx="12" cy="20" r=".6"/>',
  car: '<path d="m4 10 2-5h12l2 5v8h-2m-12 0H4v-8h16M8 18h8"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
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
export function eyebrow(text) {
  return `<p class="eyebrow">${text}</p>`;
}
