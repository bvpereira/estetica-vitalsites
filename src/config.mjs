export const clinic = {
  name: 'Aura Clínica Estética',
  professional: 'Dra. Mariana Costa',
  specialty: 'Especialista em Estética Avançada',
  practice: 'Estética Facial e Corporal',
  phone: '(22) 99999-8888',
  whatsapp: '5522999998888',
  whatsappMessage: 'Olá! Vim pelo site da Aura Clínica Estética e gostaria de agendar uma avaliação.',
  faqWhatsappMessage: 'Olá! Vim pelo site da Aura Clínica Estética e gostaria de tirar uma dúvida.',
  instagram: { handle: '@clinicadeesteticaro', url: 'https://instagram.com/clinicadeesteticaro' },
  address: {
    street: 'Rua João Viana, 10', district: 'Centro', city: 'Rio das Ostras', region: 'RJ', country: 'BR',
    full: 'Rua João Viana, 10, Centro, Rio das Ostras - RJ',
  },
  hours: [
    { label: 'Segunda a sexta', value: '08:00 às 19:00', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '19:00' },
    { label: 'Sábado', value: '08:00 às 13:00', days: ['Saturday'], opens: '08:00', closes: '13:00' },
    { label: 'Domingo', value: 'Fechado', days: ['Sunday'] },
  ],
  siteUrl: 'https://estetica.vitalsites.com.br',
  // Insira aqui a URL HTTPS do vídeo quando estiver disponível.
  directionsVideoUrl: '',
};

// Para substituir um placeholder, preencha src com /assets/images/nome-da-foto.webp.
// Mantenha alt descritivo. Arquivos fora da Hero são carregados com lazy loading.
export const images = {
  hero: { src: '/assets/images/hero-background.png', alt: 'Fundo marrom escuro com detalhes dourados da Aura Clínica Estética' },
  heroLogo: { src: '/assets/images/hero-logo.png', alt: 'Aura Clínica Estética — logo em tons de cobre e dourado' },
  introduction: { src: '/assets/images/aura-recepcao.png', alt: 'Recepção acolhedora da Aura Clínica Estética em Rio das Ostras - RJ' },
  professional: { src: '/assets/images/mariana-costa.png', alt: `${clinic.professional} em um ambiente da Aura Clínica Estética` },
};

export const heroValues = ['Atendimento personalizado', 'Tecnologia avançada', 'Resultados naturais', 'Estética facial e corporal', 'Cuidado em cada etapa', 'Sua essência em primeiro lugar'];

export const amenities = [
  { icon: 'accessibility', src: '/assets/images/banheiro-adaptado.svg', label: 'Banheiro adaptado' },
  { icon: 'snowflake', label: 'Ambiente climatizado' },
  { icon: 'wifi', label: 'Wi-Fi disponível' },
  { icon: 'car', src: '/assets/images/estacionamento-proximo.svg', label: 'Estacionamento próximo' },
];

export const treatments = [
  { id: 'toxina', title: 'Toxina Botulínica', category: 'Expressão & leveza', description: 'Suavização de linhas de expressão para uma aparência mais descansada e natural.', image: { src: '', alt: 'IMAGEM: tratamento com toxina botulínica em clínica estética' } },
  { id: 'colageno', title: 'Bioestimulador de Colágeno', category: 'Firmeza & qualidade', description: 'Estimula a produção natural de colágeno, auxiliando na firmeza e qualidade da pele.', image: { src: '', alt: 'IMAGEM: tratamento com bioestimulador de colágeno' } },
  { id: 'preenchimento', title: 'Preenchimento Facial e Labial', category: 'Contornos & harmonia', description: 'Valorização dos contornos e proporções faciais com resultados equilibrados e naturais.', image: { src: '', alt: 'IMAGEM: avaliação de contornos faciais e labiais' } },
  { id: 'ultrassom', title: 'Ultrassom Microfocado', category: 'Tecnologia & precisão', description: 'Tecnologia voltada ao estímulo de colágeno e tratamento da flacidez facial e corporal.', image: { src: '', alt: 'IMAGEM: procedimento de ultrassom microfocado' } },
  { id: 'skinbooster', title: 'Skinbooster', category: 'Hidratação & viço', description: 'Hidratação profunda para melhorar viço, textura e qualidade da pele.', image: { src: '', alt: 'IMAGEM: cuidado facial com skinbooster' } },
  { id: 'corporal', title: 'Estética Corporal', category: 'Corpo & bem-estar', description: 'Protocolos personalizados para flacidez, celulite, gordura localizada e contorno corporal.', image: { src: '', alt: 'IMAGEM: sala de tratamento de estética corporal' } },
];

const treatmentDetails = {
  toxina: {
    summary: 'Um cuidado direcionado às linhas de expressão, com planejamento individual para suavizar a aparência e preservar a naturalidade do rosto.',
    explanation: 'A toxina botulínica é utilizada para suavizar linhas de expressão associadas ao movimento da musculatura facial. Na avaliação, conversamos sobre suas expectativas e planejamos as regiões a tratar, buscando uma aparência mais descansada e equilibrada, sem prometer um resultado padronizado.',
    indication: 'Pode ser considerada por quem deseja suavizar linhas de expressão. A indicação, as áreas de aplicação e as condições para realizar o procedimento dependem da avaliação individual.',
  },
  colageno: {
    summary: 'Protocolos voltados ao estímulo de colágeno e ao cuidado com a firmeza e a qualidade da pele, respeitando o tempo de resposta de cada pessoa.',
    explanation: 'Os bioestimuladores de colágeno fazem parte de protocolos que buscam estimular a produção natural de colágeno e cuidar da firmeza e da qualidade da pele. O planejamento considera a região, as características da pele e os objetivos apresentados. A evolução é acompanhada ao longo do protocolo.',
    indication: 'Pode fazer parte do cuidado de pessoas que percebem perda de firmeza e desejam melhorar a qualidade da pele. A escolha do protocolo deve ser feita após avaliação.',
  },
  preenchimento: {
    summary: 'Planejamento dos contornos faciais e labiais para valorizar proporções, com atenção ao equilíbrio e às características individuais do seu rosto.',
    explanation: 'O preenchimento facial e labial é planejado para valorizar contornos e proporções, considerando as características que tornam cada rosto único. Antes do procedimento, avaliamos seus objetivos e discutimos as possibilidades do tratamento, buscando harmonia e respeitando sua identidade.',
    indication: 'Pode ser considerado por quem deseja avaliar contornos, proporções ou volume em regiões do rosto e dos lábios. A indicação é individual, sem um modelo de beleza único.',
  },
  ultrassom: {
    summary: 'Tecnologia para protocolos de estímulo de colágeno e cuidado com a flacidez facial e corporal, escolhidos a partir das necessidades da sua pele.',
    explanation: 'O ultrassom microfocado é uma tecnologia utilizada em protocolos voltados ao estímulo de colágeno e ao cuidado com a flacidez. A avaliação define se o recurso faz sentido para a região e o objetivo desejado, além de orientar o acompanhamento da resposta ao tratamento.',
    indication: 'Pode ser considerado por quem busca opções para o cuidado da flacidez facial ou corporal. A adequação da tecnologia depende da avaliação das características da pele e da região.',
  },
  skinbooster: {
    summary: 'Cuidado voltado à hidratação da pele, ao viço e à textura, com um protocolo que considera seu momento e sua rotina de cuidados.',
    explanation: 'O skinbooster integra protocolos de hidratação profunda para cuidar do viço, da textura e da qualidade da pele. Na consulta, avaliamos suas necessidades e a rotina de cuidados para definir uma proposta coerente com seus objetivos, com orientação antes e depois do procedimento.',
    indication: 'Pode ser considerado por quem deseja avaliar opções de hidratação e melhora do aspecto da pele. A indicação e o planejamento são definidos individualmente.',
  },
  corporal: {
    summary: 'Uma proposta de cuidado para flacidez, celulite, gordura localizada e contorno corporal, com opções selecionadas de acordo com seus objetivos.',
    explanation: 'A estética corporal reúne possibilidades de cuidado para necessidades como flacidez, celulite, gordura localizada e contorno corporal. Em vez de um protocolo igual para todas as pessoas, a avaliação considera seus objetivos, as regiões de interesse e a resposta esperada para planejar e acompanhar cada etapa.',
    indication: 'Pode ser considerada por quem deseja cuidar de questões relacionadas à pele e ao contorno corporal. As opções indicadas dependem de uma avaliação individual e não substituem hábitos de cuidado e bem-estar.',
  },
};

for (const treatment of treatments) {
  Object.assign(treatment, treatmentDetails[treatment.id]);
  treatment.image.src = `/assets/images/tratamentos/${treatment.id}.png`;
  treatment.image.alt = treatment.image.alt.replace('IMAGEM: ', '');
  treatment.before = { src: `/assets/images/tratamentos/${treatment.id}-antes.png`, alt: `Imagem antes: ${treatment.title}` };
  treatment.after = { src: `/assets/images/tratamentos/${treatment.id}-depois.png`, alt: `Imagem depois: ${treatment.title}` };
}

export const results = [
  { title: 'Toxina Botulínica', tab: 'Toxina Botulínica', before: treatments[0].before, after: treatments[0].after },
  { title: 'Bioestimulador de Colágeno', tab: 'Colágeno', before: { src: '', alt: 'IMAGEM ANTES: bioestimulador de colágeno' }, after: { src: '', alt: 'IMAGEM DEPOIS: bioestimulador de colágeno' } },
  { title: 'Tratamento Facial', tab: 'Tratamento Facial', before: { src: '', alt: 'IMAGEM ANTES: tratamento facial' }, after: { src: '', alt: 'IMAGEM DEPOIS: tratamento facial' } },
];

export const gallery = [
  ['Fachada', 'fachada da Aura Clínica Estética'],
  ['Recepção', 'recepção elegante'],
  ['Sala de Espera', 'sala de espera'],
  ['Espaço de Avaliação', 'consultório de avaliação'],
  ['Estética Facial', 'sala de procedimentos faciais'],
  ['Estética Corporal', 'sala de procedimentos corporais'],
  ['Detalhes da Aura', 'detalhes sofisticados da decoração'],
  ['Tecnologia', 'equipamentos e tecnologia'],
  ['Conforto', 'ambiente interno da clínica'],
  ['Nossa Clínica', 'outro ângulo da clínica'],
].map(([caption, description]) => ({
  caption, image: { src: '', alt: `IMAGEM CLÍNICA: ${description}` },
}));

export const navigation = [
  ['inicio', 'Início'], ['tratamentos', 'Tratamentos'], ['sobre', 'Sobre'],
  ['resultados', 'Resultados'], ['clinica', 'Clínica'], ['contato', 'Contato'],
];

export function whatsappUrl(message = clinic.whatsappMessage) {
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const maps = {
  embed: `https://maps.google.com/maps?q=${encodeURIComponent(clinic.address.full)}&output=embed`,
  search: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address.full)}`,
};

// Perfis de demonstração para a prévia de layout; substituir antes da versão final.
export const testimonialPreviewProfiles = [
  { name: 'Mariana Oliveira', city: 'Rio das Ostras - RJ', image: '/assets/images/depoimento-1.jpg' },
  { name: 'Rafael Santos', city: 'Rio das Ostras - RJ', image: '/assets/images/depoimento-2.jpg' },
  { name: 'Helena Costa', city: 'Macaé - RJ', image: '/assets/images/depoimento-3.jpg' },
];
