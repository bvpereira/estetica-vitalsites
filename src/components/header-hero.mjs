import { clinic, images, navigation } from '../config.mjs';
import { brand, escape, eyebrow, icon, instagram, photo, whatsapp } from './shared.mjs';

export function header() {
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header" id="site-header"><div class="header-inner">
    ${brand()}
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-navigation"><span class="menu-lines" aria-hidden="true"></span><span class="menu-text">Menu</span></button>
    <nav class="main-navigation" id="main-navigation" aria-label="Navegação principal">
      <div class="nav-links">${navigation.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</div>
      <div class="header-actions">${instagram(clinic.instagram.handle, 'header-instagram')}${whatsapp('Agendar avaliação', 'button button-small')}</div>
    </nav>
  </div></header>`;
}

export function hero() {
  return `<section class="hero section" id="inicio" aria-labelledby="hero-title">
    <div class="hero-copy">${eyebrow(`Estética & cuidado · ${escape(clinic.address.city)}, ${clinic.address.region}`)}
      <h1 id="hero-title">Sua beleza,<br>em sua <em>melhor</em><br>versão.</h1>
      <p class="hero-description">Tratamentos personalizados que unem tecnologia, cuidado e naturalidade para valorizar o que você tem de mais bonito.</p>
      <div class="hero-actions">${whatsapp('Agende sua avaliação')}<a class="text-link" href="#tratamentos">Conheça nossos tratamentos ${icon('arrow')}</a></div>
      <p class="hero-values">Atendimento personalizado <span>·</span> Tecnologia avançada <span>·</span> Resultados naturais</p>
    </div>
    <div class="hero-visual">${photo(images.hero, 'hero-photo', true)}
      <div class="hero-note"><span class="note-line"></span><p>Essência preservada.<br><em>Beleza valorizada.</em></p></div>
      <span class="vertical-note" aria-hidden="true">Um novo olhar para o cuidado</span>
    </div>
    <a class="scroll-note" href="#introducao"><span>Descubra a Aura</span><span aria-hidden="true">↓</span></a>
  </section>`;
}
