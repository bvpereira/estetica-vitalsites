import { clinic, gallery, maps, whatsappUrl } from '../config.mjs';
import { escape, eyebrow, icon, instagram, photo } from './shared.mjs';

export function clinicSection() {
  return `<section class="clinic-section" id="clinica" aria-labelledby="clinic-title">
    <div class="section clinic-heading"><div class="center-heading reveal">${eyebrow('Sua pausa para se cuidar', '05')}<h2 id="clinic-title">Conheça <em>a Aura</em></h2><p>Um espaço pensado para que cada atendimento seja confortável, tranquilo e especial.</p></div></div>
    <div class="section location" id="contato" aria-labelledby="location-title"><div class="location-info reveal">${eyebrow('Estamos esperando por você')}<h3 id="location-title">${escape(clinic.name)}</h3>
      <div class="contact-detail">${icon('location')}<div><span>Nosso endereço</span><p>${escape(clinic.address.street)}<br>${escape(clinic.address.district)} — ${escape(clinic.address.city)} - ${clinic.address.region}</p></div></div>
      <div class="location-contact-row"><div class="contact-detail">${icon('whatsapp')}<div><span>WhatsApp</span><a href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer">${escape(clinic.phone)}</a></div></div><div class="contact-detail">${icon('instagram')}<div><span>Instagram</span>${instagram(clinic.instagram.handle, 'inline-link')}</div></div></div>
      <div class="contact-detail">${icon('clock')}<div><span>Horários de atendimento</span><dl class="hours">${clinic.hours.map(hour => `<div><dt>${hour.label}</dt><dd>${hour.value}</dd></div>`).join('')}</dl></div></div>
      <div class="location-actions"><button class="button directions-button" type="button" data-directions>Como chegar ${icon('play')}</button></div>
    </div><div class="map-column"><div class="map-frame"><iframe src="${escape(maps.embed)}" title="Localização da Aura Clínica Estética em Rio das Ostras" width="600" height="560" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div><a class="text-link map-link" href="${escape(maps.search)}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps ${icon('diagonal')}</a></div></div>
    <div class="gallery-component" role="region" aria-roledescription="carrossel" aria-label="Ambientes da clínica" data-gallery>
      <div class="section gallery-intro"><h3>Um espaço criado para cuidar de você</h3><p>Cada detalhe foi pensado para proporcionar uma experiência acolhedora, confortável e sofisticada.</p></div>
      <div class="gallery-viewport" tabindex="0" aria-label="Galeria da clínica. Use as setas do teclado ou deslize para navegar.">
        <div class="gallery-track">${gallery.map((item, index) => `<figure class="gallery-slide gallery-tone-${index % 3}" role="group" aria-roledescription="slide" aria-label="${escape(item.caption)}" data-slide>${photo(item.image, 'gallery-photo')}<figcaption>${item.caption}</figcaption></figure>`).join('')}</div>
      </div>
      <div class="section gallery-bottom">
        <button type="button" class="text-link gallery-toggle" data-gallery-toggle>Pausar movimento</button>
      </div>
    </div>
  </section>`;
}
