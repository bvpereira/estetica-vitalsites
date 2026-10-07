import { clinic } from './config.mjs';
import { header, hero } from './components/header-hero.mjs';
import { introduction, treatmentSection, differentials, about, howItWorks, testimonials } from './components/care.mjs';
import { beforeAfter } from './components/results.mjs';
import { clinicSection } from './components/clinic.mjs';
import { finalCta, contact, footer } from './components/contact-footer.mjs';
import { escape } from './components/shared.mjs';

export function structuredData() {
  return {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    name: clinic.name, url: clinic.siteUrl, telephone: `+${clinic.whatsapp}`,
    description: 'Clínica de estética facial e corporal em Rio das Ostras, com protocolos personalizados e foco na naturalidade. Projeto demonstrativo de clínica fictícia.',
    address: { '@type': 'PostalAddress', streetAddress: `${clinic.address.street}, ${clinic.address.district}`, addressLocality: clinic.address.city, addressRegion: clinic.address.region, addressCountry: clinic.address.country },
    sameAs: [clinic.instagram.url],
    openingHoursSpecification: clinic.hours.filter(hour => hour.opens).map(hour => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: hour.days.map(day => `https://schema.org/${day}`), opens: hour.opens, closes: hour.closes })),
  };
}

export function renderPage() {
  const title = `${clinic.name} | Estética em ${clinic.address.city}`;
  const description = 'Estética facial e corporal em Rio das Ostras - RJ. Conheça a Aura: cuidado personalizado, tecnologia e naturalidade. Agende sua avaliação pelo WhatsApp.';
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#F7F3EF">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${clinic.siteUrl}/">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${escape(clinic.name)}">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${clinic.siteUrl}/">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <script type="application/ld+json">${JSON.stringify(structuredData()).replaceAll('<', '\\u003c')}</script>
  <script type="module" src="/assets/js/main.js"></script>
</head>
<body>
${header()}
<main id="conteudo">
${hero()}
${introduction()}
${treatmentSection()}
${differentials()}
${about()}
${beforeAfter()}
${howItWorks()}
${testimonials()}
${clinicSection()}
${finalCta()}
${contact()}
</main>
${footer()}
</body>
</html>`;
}
