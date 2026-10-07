import { clinic, images, treatments } from '../config.mjs';
import { escape, eyebrow, icon, photo, whatsapp } from './shared.mjs';

export function introduction() {
  return `<section class="section introduction" id="introducao" aria-labelledby="introduction-title">
    <div class="intro-visual">${photo(images.introduction, 'intro-photo')}<span class="image-caption">Cuidado em cada detalhe.</span></div>
    <div class="intro-copy reveal">${eyebrow('O jeito Aura de cuidar', '01')}
      <h2 id="introduction-title">Cuidado que começa<br><em>entendendo você</em></h2>
      <p>Cada pessoa possui características, necessidades e objetivos únicos. Por isso, na ${escape(clinic.name)}, cada tratamento começa com uma avaliação individualizada para criar um protocolo pensado especialmente para você.</p>
      <p>O objetivo não é transformar quem você é, mas valorizar sua beleza de maneira natural e equilibrada.</p>
      <a href="#sobre" class="text-link">Conheça quem cuida de você ${icon('arrow')}</a>
    </div>
  </section>`;
}

export function treatmentSection() {
  return `<section class="section treatments" id="tratamentos" aria-labelledby="treatments-title">
    <div class="section-heading reveal"><div>${eyebrow('Facial & corporal', '02')}<h2 id="treatments-title">Tratamentos<br><em>pensados para você</em></h2></div><p>Tecnologia, conhecimento e protocolos personalizados para cuidar do rosto e do corpo.</p></div>
    <div class="treatment-grid">${treatments.map((treatment, index) => `<article class="treatment treatment-${index + 1} reveal">
      <div class="treatment-image">${photo(treatment.image)}<span class="treatment-number">${String(index + 1).padStart(2, '0')}</span></div>
      <p class="treatment-category">${treatment.category}</p><h3>${treatment.title}</h3><p class="treatment-description">${treatment.description}</p>
      ${whatsapp('Saiba mais', 'text-link', `Olá! Vim pelo site da ${clinic.name} e gostaria de saber mais sobre ${treatment.title}.`)}
    </article>`).join('')}</div>
    <p class="section-footnote">A indicação de cada procedimento é definida em uma avaliação individualizada.</p>
  </section>`;
}

export function differentials() {
  const items = [
    ['sparkle', 'Avaliação individualizada', 'Cada tratamento começa entendendo suas necessidades e objetivos.'],
    ['leaf', 'Resultados naturais', 'Procedimentos planejados para valorizar seus traços sem exageros.'],
    ['shield', 'Tecnologia e segurança', 'Equipamentos e técnicas modernas aliados a protocolos cuidadosamente planejados.'],
    ['heart', 'Acompanhamento próximo', 'Orientação antes, durante e depois de cada tratamento.'],
  ];
  return `<section class="differentials" aria-labelledby="differentials-title"><div class="section">
    <div class="center-heading reveal">${eyebrow('Muito além de um procedimento')}<h2 id="differentials-title">Uma experiência de<br><em>cuidado completa</em></h2></div>
    <div class="differentials-grid">${items.map(([symbol, title, description]) => `<article class="reveal">${icon(symbol)}<h3>${title}</h3><p>${description}</p></article>`).join('')}</div>
  </div></section>`;
}

export function about() {
  return `<section class="section about" id="sobre" aria-labelledby="about-title">
    <div class="about-copy reveal">${eyebrow('Um olhar atento para você', '03')}<h2 id="about-title">Beleza começa<br>com <em>confiança</em></h2>
      <p>À frente da ${escape(clinic.name)}, <strong>${escape(clinic.professional)}</strong> acredita que estética deve estar diretamente ligada ao cuidado, autoestima e naturalidade.</p>
      <p>Cada protocolo é planejado individualmente, respeitando as características de cada paciente e buscando resultados equilibrados e harmoniosos.</p>
      <div class="professional-signature"><p>${escape(clinic.professional)}</p><span>${escape(clinic.specialty)}<br>${escape(clinic.practice)}</span></div>
      ${whatsapp('Vamos conversar?', 'text-link')}
    </div><div class="about-visual">${photo(images.professional, 'professional-photo')}<span class="portrait-caption">Ciência, sensibilidade e cuidado.</span></div>
  </section>`;
}

export function howItWorks() {
  const steps = [
    ['Agende sua avaliação', 'Entre em contato pelo WhatsApp e escolha o melhor horário.'],
    ['Criamos seu protocolo', 'Entendemos seus objetivos e indicamos as opções mais adequadas.'],
    ['Comece seu tratamento', 'Realizamos seu protocolo com acompanhamento personalizado.'],
  ];
  return `<section class="section how-it-works" aria-labelledby="steps-title"><div class="center-heading reveal">${eyebrow('Simples, próximo, personalizado')}<h2 id="steps-title">Seu cuidado <em>começa aqui</em></h2></div>
    <ol class="steps">${steps.map(([title, text], index) => `<li class="reveal"><span class="step-number">0${index + 1}</span><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol>
    <div class="center-actions">${whatsapp('Agendar minha avaliação')}</div></section>`;
}

export function testimonials() {
  const quotes = [
    ['Camila R.', 'Desde a primeira avaliação me senti muito segura. Todo o atendimento foi cuidadoso e o resultado ficou muito natural.'],
    ['Fernanda M.', 'A clínica é linda e acolhedora. Gostei principalmente da atenção em explicar cada etapa do tratamento.'],
    ['Juliana A.', 'Foi exatamente o que eu procurava: um tratamento personalizado e sem exageros.'],
  ];
  return `<section class="testimonials" aria-labelledby="testimonials-title"><div class="section"><div class="section-heading reveal"><div>${eyebrow('Histórias de cuidado')}<h2 id="testimonials-title">Quem se cuida<br><em>com a Aura</em></h2></div><p>O cuidado se revela nos detalhes.<br>E na forma como você se sente.</p></div>
    <div class="quotes">${quotes.map(([name, quote]) => `<figure class="quote reveal"><span class="quote-mark" aria-hidden="true">“</span><blockquote><p>${quote}</p></blockquote><figcaption>${name}<span>Relato ilustrativo</span></figcaption></figure>`).join('')}</div>
    <p class="section-footnote">Depoimentos fictícios para composição deste projeto demonstrativo.</p>
  </div></section>`;
}
