import { clinic, gallery, maps, whatsappUrl } from '../config.mjs';
import { escape, eyebrow, icon, instagram, photo, whatsapp } from './shared.mjs';

export function clinicSection() {
  return `<section class="clinic-section" id="clinica" aria-labelledby="clinic-title">
    <div class="section clinic-heading"><div class="center-heading reveal">${eyebrow('Sua pausa para se cuidar', '05')}<h2 id="clinic-title">Conheça <em>a Aura</em></h2><p>Um espaço pensado para que cada atendimento seja confortável, tranquilo e especial.</p></div></div>
    <div class="section location" aria-labelledby="location-title"><div class="location-info reveal">${eyebrow('Estamos esperando por você')}<h3 id="location-title">${escape(clinic.name)}</h3>
      <div class="contact-detail">${icon('location')}<div><span>Nosso endereço</span><p>${escape(clinic.address.street)}<br>${escape(clinic.address.district)} — ${escape(clinic.address.city)} - ${clinic.address.region}</p></div></div>
      <div class="location-contact-row"><div class="contact-detail">${icon('whatsapp')}<div><span>WhatsApp</span><a href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer">${escape(clinic.phone)}</a></div></div><div class="contact-detail">${icon('instagram')}<div><span>Instagram</span>${instagram(clinic.instagram.handle, 'inline-link')}</div></div></div>
      <div class="contact-detail">${icon('clock')}<div><span>Horários de atendimento</span><dl class="hours">${clinic.hours.map(hour => `<div><dt>${hour.label}</dt><dd>${hour.value}</dd></div>`).join('')}</dl></div></div>
      <div class="location-actions">${whatsapp('Falar pelo WhatsApp')}${instagram('Siga a Aura no Instagram', 'text-link')}<button class="text-link directions-button" type="button" data-directions>Como chegar ${icon('play')}</button></div>
    </div><div class="map-column"><div class="map-frame"><iframe src="${escape(maps.embed)}" title="Localização da Aura Clínica Estética em Rio das Ostras" width="600" height="560" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div><a class="text-link map-link" href="${escape(maps.search)}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps ${icon('diagonal')}</a></div></div>
    <div class="gallery-component" role="region" aria-roledescription="carrossel" aria-label="Ambientes da clínica" data-gallery>
      <div class="section gallery-intro"><h3>Um espaço criado para cuidar de você</h3><p>Cada detalhe foi pensado para proporcionar uma experiência acolhedora, confortável e sofisticada.</p></div>
      <div class="gallery-viewport" tabindex="0" aria-label="Galeria da clínica. Use as setas do teclado ou deslize para navegar.">
        <div class="gallery-track">${gallery.map((item, index) => `<figure class="gallery-slide gallery-tone-${index % 3}" role="group" aria-roledescription="slide" aria-label="${index + 1} de ${gallery.length}: ${escape(item.caption)}" data-slide>${photo(item.image, 'gallery-photo')}<figcaption><span>${String(index + 1).padStart(2, '0')}</span>${item.caption}</figcaption></figure>`).join('')}</div>
      </div>
      <div class="section gallery-bottom">
        <div class="gallery-controls"><button type="button" class="text-link gallery-toggle" data-gallery-toggle>Pausar galeria</button><div class="gallery-arrows"><button class="round-button previous" type="button" aria-label="Imagem anterior" data-gallery-prev>${icon('arrow')}</button><span class="gallery-counter" aria-live="polite" aria-atomic="true"><span data-gallery-count>01</span> / 10</span><button class="round-button" type="button" aria-label="Próxima imagem" data-gallery-next>${icon('arrow')}</button></div>
        <div class="gallery-dots" role="group" aria-label="Selecionar imagem">${gallery.map((item, index) => `<button type="button" aria-label="Ver ${escape(item.caption)}" ${index === 0 ? 'aria-current="true"' : ''} data-gallery-dot="${index}"><span></span></button>`).join('')}</div></div>
      </div>
    </div>
  </section>`;
}
