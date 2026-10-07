export const clinic = {
  name: 'Aura Clínica Estética',
  professional: 'Dra. Mariana Costa',
  specialty: 'Especialista em Estética Avançada',
  practice: 'Estética Facial e Corporal',
  phone: '(22) 99999-8888',
  whatsapp: '5522999998888',
  whatsappMessage: 'Olá! Vim pelo site da Aura Clínica Estética e gostaria de agendar uma avaliação.',
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
  hero: { src: '', alt: 'IMAGEM HERO: mulher em ambiente de clínica estética premium, aparência natural, elegante e sofisticada' },
  introduction: { src: '', alt: 'IMAGEM: atendimento ou procedimento estético em ambiente sofisticado' },
  professional: { src: '', alt: `IMAGEM: retrato profissional da ${clinic.professional} em ambiente elegante da clínica` },
};

export const treatments = [
  { id: 'toxina', title: 'Toxina Botulínica', category: 'Expressão & leveza', description: 'Suavização de linhas de expressão para uma aparência mais descansada e natural.', image: { src: '', alt: 'IMAGEM: tratamento com toxina botulínica em clínica estética' } },
  { id: 'colageno', title: 'Bioestimulador de Colágeno', category: 'Firmeza & qualidade', description: 'Estimula a produção natural de colágeno, auxiliando na firmeza e qualidade da pele.', image: { src: '', alt: 'IMAGEM: tratamento com bioestimulador de colágeno' } },
  { id: 'preenchimento', title: 'Preenchimento Facial e Labial', category: 'Contornos & harmonia', description: 'Valorização dos contornos e proporções faciais com resultados equilibrados e naturais.', image: { src: '', alt: 'IMAGEM: avaliação de contornos faciais e labiais' } },
  { id: 'ultrassom', title: 'Ultrassom Microfocado', category: 'Tecnologia & precisão', description: 'Tecnologia voltada ao estímulo de colágeno e tratamento da flacidez facial e corporal.', image: { src: '', alt: 'IMAGEM: procedimento de ultrassom microfocado' } },
  { id: 'skinbooster', title: 'Skinbooster', category: 'Hidratação & viço', description: 'Hidratação profunda para melhorar viço, textura e qualidade da pele.', image: { src: '', alt: 'IMAGEM: cuidado facial com skinbooster' } },
  { id: 'corporal', title: 'Estética Corporal', category: 'Corpo & bem-estar', description: 'Protocolos personalizados para flacidez, celulite, gordura localizada e contorno corporal.', image: { src: '', alt: 'IMAGEM: sala de tratamento de estética corporal' } },
];

export const results = [
  { title: 'Harmonização Facial', tab: 'Facial', before: { src: '', alt: 'IMAGEM ANTES: harmonização facial' }, after: { src: '', alt: 'IMAGEM DEPOIS: harmonização facial' } },
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
].map(([caption, description], index) => ({
  caption, image: { src: '', alt: `IMAGEM CLÍNICA ${String(index + 1).padStart(2, '0')}: ${description}` },
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
