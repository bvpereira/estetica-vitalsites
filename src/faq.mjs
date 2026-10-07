import { clinic } from './config.mjs';

// One source for visible answers and their FAQPage structured data.
export const faqItems = [
  {
    question: 'Preciso fazer uma avaliação antes de iniciar um tratamento?',
    paragraphs: ['Sim. A avaliação é importante para entendermos suas necessidades, objetivos e características individuais. A partir dessa conversa, podemos indicar os procedimentos mais adequados e montar um protocolo personalizado para você.'],
  },
  {
    question: 'Como faço para agendar uma avaliação?',
    paragraphs: ['O agendamento pode ser feito diretamente pelo WhatsApp da Aura Clínica Estética. Basta clicar em um dos botões de atendimento disponíveis no site e nossa equipe dará continuidade ao agendamento.'],
  },
  {
    question: 'Quais tratamentos a clínica oferece?',
    paragraphs: ['A Aura Clínica Estética oferece tratamentos faciais e corporais, incluindo toxina botulínica, bioestimulador de colágeno, preenchimento facial e labial, ultrassom microfocado, skinbooster e protocolos personalizados de estética corporal.'],
  },
  {
    question: 'Como saber qual tratamento é mais indicado para mim?',
    paragraphs: ['Cada pessoa possui características e objetivos diferentes. Por isso, a indicação do tratamento é feita após uma avaliação individualizada, considerando suas necessidades, expectativas e as características da região que será tratada.'],
  },
  {
    question: 'Os resultados dos tratamentos são imediatos?',
    paragraphs: ['Isso depende do procedimento realizado. Alguns tratamentos podem apresentar mudanças perceptíveis em pouco tempo, enquanto outros possuem resultados progressivos ao longo das semanas. Durante a avaliação, explicamos o que pode ser esperado em cada caso.'],
  },
  {
    question: 'Quantas sessões são necessárias?',
    paragraphs: ['A quantidade de sessões varia de acordo com o tratamento, os objetivos e a resposta individual de cada pessoa. Alguns procedimentos podem ser realizados em uma única sessão, enquanto outros fazem parte de protocolos com mais etapas.'],
  },
  {
    question: 'Os procedimentos causam dor?',
    paragraphs: ['A sensibilidade varia de pessoa para pessoa e também depende do procedimento realizado. Nossa prioridade é proporcionar uma experiência confortável e segura, utilizando técnicas e cuidados adequados para cada tratamento.'],
  },
  {
    question: 'A clínica também realiza tratamentos corporais?',
    paragraphs: ['Sim. Além dos procedimentos faciais, a Aura Clínica Estética oferece protocolos corporais voltados para cuidados como flacidez, celulite, gordura localizada e contorno corporal, sempre de forma personalizada.'],
  },
  {
    question: 'Onde fica a Aura Clínica Estética?',
    paragraphs: [`Estamos localizados na ${clinic.address.full}.`, 'Na seção “Conheça a Clínica”, o visitante também pode visualizar nossa localização no Google Maps e acessar o botão para abrir a rota diretamente.'],
    emphasis: [clinic.address.full],
  },
  {
    question: 'Quais são os horários de atendimento?',
    paragraphs: [`Nosso atendimento funciona de segunda a sexta, das ${clinic.hours[0].value}, e aos sábados, das ${clinic.hours[1].value}.`, 'Aos domingos, a clínica não realiza atendimentos.'],
    emphasis: [`segunda a sexta, das ${clinic.hours[0].value}`, `sábados, das ${clinic.hours[1].value}`],
  },
];

export function faqStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${clinic.siteUrl}/#faq`,
    mainEntity: faqItems.map(item => ({
      '@type': 'Question', name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.paragraphs.join('\n\n') },
    })),
  };
}
