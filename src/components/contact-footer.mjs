import { clinic, images, maps, navigation, whatsappUrl } from '../config.mjs';
import { escape, eyebrow, icon, instagram, whatsapp } from './shared.mjs';

export function finalCta() {
  return `<section class="final-cta" aria-labelledby="cta-title"><div class="section"><span class="cta-symbol" aria-hidden="true">a.</span><div class="cta-copy">${eyebrow('Um primeiro passo, muitas possibilidades')}<h2 id="cta-title">O melhor tratamento começa<br>com uma <em>boa avaliação.</em></h2><p>Conte para nós o que deseja melhorar e descubra quais tratamentos podem fazer sentido para você.</p><div class="cta-actions">${whatsapp('Quero agendar minha avaliação', 'button button-light')}${instagram('Conheça nosso Instagram', 'text-link')}</div></div></div></section>`;
}

export function footer() {
  return `<footer class="site-footer"><div class="section footer-top"><a class="footer-logo" href="#inicio" aria-label="${escape(clinic.name)} — início"><img src="${escape(images.heroLogo.src)}" alt="${escape(clinic.name)}" width="256" height="256" loading="lazy" decoding="async"></a><nav aria-label="Navegação do rodapé">${navigation.filter(([id]) => id !== 'inicio').map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</nav><div class="footer-socials"><a href="${escape(whatsappUrl())}" aria-label="WhatsApp da Aura" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}</a><a href="${escape(clinic.instagram.url)}" aria-label="Instagram da Aura" target="_blank" rel="noopener noreferrer">${icon('instagram')}</a></div></div>
    <div class="section footer-details"><span>${escape(clinic.address.full)}</span><a href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer">${escape(clinic.phone)}</a>${instagram(clinic.instagram.handle, 'footer-instagram')}</div>
    <div class="section footer-bottom"><p>© ${new Date().getUTCFullYear()} ${escape(clinic.name)}. Todos os direitos reservados.</p><a href="#inicio">Voltar ao início ↑</a></div>
  </footer>
  <a class="floating-whatsapp" href="${escape(whatsappUrl())}" aria-label="Agendar avaliação pelo WhatsApp" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<span>Vamos conversar?</span></a>
  <dialog class="directions-dialog" aria-labelledby="directions-title"><button class="dialog-close round-button" type="button" aria-label="Fechar orientação">×</button>${eyebrow('Seu caminho até a Aura')}<h2 id="directions-title">Esperamos <em>você</em></h2><p>Em breve, teremos um vídeo mostrando o caminho até a clínica. Enquanto isso, veja nossa localização no Google Maps.</p><p class="dialog-address">${escape(clinic.address.full)}</p><a class="button" href="${escape(maps.search)}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps ${icon('diagonal')}</a></dialog>`;
}
