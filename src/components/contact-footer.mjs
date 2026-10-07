import { clinic, maps, navigation, whatsappUrl } from '../config.mjs';
import { brand, escape, eyebrow, icon, instagram, whatsapp } from './shared.mjs';

export function finalCta() {
  return `<section class="final-cta" aria-labelledby="cta-title"><div class="section"><span class="cta-symbol" aria-hidden="true">a.</span><div class="cta-copy">${eyebrow('Um primeiro passo, muitas possibilidades')}<h2 id="cta-title">O melhor tratamento começa<br>com uma <em>boa avaliação.</em></h2><p>Conte para nós o que deseja melhorar e descubra quais tratamentos podem fazer sentido para você.</p><div class="cta-actions">${whatsapp('Quero agendar minha avaliação', 'button button-light')}${instagram('Conheça nosso Instagram', 'text-link')}</div></div></div></section>`;
}

export function contact() {
  return `<section class="section contact-section" id="contato" aria-labelledby="contact-title"><div class="contact-intro reveal">${eyebrow('Será um prazer receber você', '06')}<h2 id="contact-title">Vamos cuidar<br><em>de você?</em></h2><p>Entre em contato com nossa equipe e agende sua avaliação.</p><div class="contact-actions">${whatsapp('Falar pelo WhatsApp')}${instagram('Seguir no Instagram', 'text-link')}</div></div>
    <div class="contact-list"><a href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer"><span>${icon('whatsapp')} WhatsApp</span><strong>${escape(clinic.phone)}</strong>${icon('diagonal')}</a><a href="${escape(clinic.instagram.url)}" target="_blank" rel="noopener noreferrer"><span>${icon('instagram')} Instagram</span><strong>${escape(clinic.instagram.handle)}</strong>${icon('diagonal')}</a><a href="${escape(maps.search)}" target="_blank" rel="noopener noreferrer"><span>${icon('location')} Endereço</span><strong>${escape(clinic.address.full)}</strong>${icon('diagonal')}</a></div>
  </section>`;
}

export function footer() {
  return `<footer class="site-footer"><div class="section footer-top">${brand()}<nav aria-label="Navegação do rodapé">${navigation.filter(([id]) => id !== 'inicio').map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</nav><div class="footer-socials"><a href="${escape(whatsappUrl())}" aria-label="WhatsApp da Aura" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}</a><a href="${escape(clinic.instagram.url)}" aria-label="Instagram da Aura" target="_blank" rel="noopener noreferrer">${icon('instagram')}</a></div></div>
    <div class="section footer-details"><span>${escape(clinic.address.full)}</span><a href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer">${escape(clinic.phone)}</a>${instagram(clinic.instagram.handle, 'footer-instagram')}</div>
    <div class="section footer-bottom"><p>© ${new Date().getUTCFullYear()} ${escape(clinic.name)}. Todos os direitos reservados.</p><p>Clínica fictícia · Projeto demonstrativo</p><a href="#inicio">Voltar ao início ↑</a></div>
  </footer>
  <a class="floating-whatsapp" href="${escape(whatsappUrl())}" aria-label="Agendar avaliação pelo WhatsApp" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<span>Vamos conversar?</span></a>
  <dialog class="directions-dialog" aria-labelledby="directions-title"><button class="dialog-close round-button" type="button" aria-label="Fechar orientação">×</button>${eyebrow('Seu caminho até a Aura')}<h2 id="directions-title">Esperamos <em>você</em></h2><p>Em breve, teremos um vídeo mostrando o caminho até a clínica. Enquanto isso, veja nossa localização no Google Maps.</p><p class="dialog-address">${escape(clinic.address.full)}</p><a class="button" href="${escape(maps.search)}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps ${icon('diagonal')}</a></dialog>`;
}
