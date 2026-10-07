import { clinic } from '../config.mjs';
import { faqItems } from '../faq.mjs';
import { escape, eyebrow, whatsapp } from './shared.mjs';

function answerParagraph(text, emphasis = []) {
  let html = escape(text);
  for (const phrase of emphasis) html = html.replace(escape(phrase), `<strong>${escape(phrase)}</strong>`);
  return `<p>${html}</p>`;
}

export function faq() {
  return `<section class="section faq-section" id="faq" aria-labelledby="faq-title">
    <div class="faq-heading">${eyebrow('Perguntas frequentes')}<h2 id="faq-title">Dúvidas <em>frequentes</em></h2><p>Reunimos algumas das principais dúvidas sobre nossos atendimentos, tratamentos e funcionamento da clínica.</p></div>
    <div class="faq-list">${faqItems.map((item, index) => `<details class="faq-item" name="aura-faq"><summary id="faq-question-${index + 1}" aria-controls="faq-answer-${index + 1}"><span>${escape(item.question)}</span><span class="faq-icon" aria-hidden="true"></span></summary><div class="faq-answer" id="faq-answer-${index + 1}" role="region" aria-labelledby="faq-question-${index + 1}">${item.paragraphs.map(text => answerParagraph(text, item.emphasis)).join('')}</div></details>`).join('')}</div>
    <div class="faq-support"><div><h3>Ainda ficou com alguma dúvida?</h3><p>Fale com nossa equipe e teremos prazer em ajudar.</p></div>${whatsapp('Falar pelo WhatsApp', 'button', clinic.faqWhatsappMessage)}</div>
  </section>`;
}
