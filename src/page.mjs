import { clinic } from './config.mjs';
import { hero } from './components/hero.mjs';
import { introduction, treatmentSection, differentials, about, howItWorks, testimonials } from './components/care.mjs';
import { beforeAfter } from './components/results.mjs';
import { clinicSection } from './components/clinic.mjs';
import { finalCta, footer } from './components/contact-footer.mjs';
import { escape } from './components/shared.mjs';
import { faq } from './components/faq.mjs';
import { faqStructuredData } from './faq.mjs';
import { readFileSync } from 'node:fs';

// This single-page site ships its small compressed stylesheet with the HTML,
// so the first paint never waits for a separate CSS request (even without JS).
const styles = readFileSync(new URL('../assets/css/styles.css', import.meta.url), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/[\t ]+$/gm, '').trim();

export function structuredData() {
  return {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    name: clinic.name, url: clinic.siteUrl, telephone: `+${clinic.whatsapp}`,
    description: 'Clínica de estética facial e corporal em Rio das Ostras, com protocolos personalizados e foco na naturalidade.',
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
  <link rel="preload" href="/assets/fonts/cormorant-garamond-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/cormorant-garamond-italic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/manrope.woff2" as="font" type="font/woff2" crossorigin>
  <style>${styles}</style>
  <script type="application/ld+json">${JSON.stringify(structuredData()).replaceAll('<', '\\u003c')}</script>
  <script type="application/ld+json">${JSON.stringify(faqStructuredData()).replaceAll('<', '\\u003c')}</script>
  <script defer src="/assets/js/site.js"></script>
</head>
<body>
<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
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
${faq()}
</main>
${footer()}
</body>
</html>`;
}
