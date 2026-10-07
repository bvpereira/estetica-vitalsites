import { clinic, images, heroValues } from '../config.mjs';
import { escape, eyebrow, icon, photo, whatsapp } from './shared.mjs';

export function hero() {
  return `<section class="hero hero-dark" id="inicio" aria-labelledby="hero-title">
    <div class="hero-background">${photo(images.hero, 'hero-backdrop', true)}</div>
    <div class="section hero-inner">
    <div class="hero-copy">${eyebrow(`Estética & cuidado · ${escape(clinic.address.city)}, ${clinic.address.region}`)}
      <h1 id="hero-title">Sua beleza,<br>em sua <em>melhor</em><br>versão.</h1>
      <p class="hero-description">Tratamentos personalizados que unem tecnologia, cuidado e naturalidade para valorizar o que você tem de mais bonito.</p>
      <div class="hero-actions">${whatsapp('Agende sua avaliação')}<a class="text-link" href="#tratamentos">Conheça nossos tratamentos ${icon('arrow')}</a></div>
    </div>
    <div class="hero-logo">${photo(images.heroLogo, 'hero-logo-photo', true)}</div></div>
    <div class="hero-marquee" role="region" aria-label="Diferenciais da Aura" tabindex="0"><div class="hero-marquee-track">
    ${[false, true].map(copy => `<ul ${copy ? 'aria-hidden="true"' : ''}>${heroValues.map(value => `<li>${escape(value)}<span aria-hidden="true">✦</span></li>`).join('')}</ul>`).join('')}
    </div><button type="button" class="marquee-pause" data-marquee-pause aria-label="Pausar textos em movimento" aria-pressed="false">Ⅱ</button></div>
  </section>`;
}
