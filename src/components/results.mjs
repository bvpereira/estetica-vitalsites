import { results } from '../config.mjs';
import { escape, eyebrow, photo } from './shared.mjs';

export function beforeAfter() {
  return `<section class="results-section" id="resultados" aria-labelledby="results-title"><div class="section">
    <div class="section-heading reveal"><div>${eyebrow('Naturalidade em primeiro lugar')}<h2 id="results-title">Resultados que respeitam<br><em>sua essência</em></h2></div><p>Cada resultado é único. Conheça algumas transformações realizadas com protocolos personalizados.</p></div>
    <div class="comparison-component" data-comparison>
      <div class="comparison-heading"><h3 id="comparison-title">${results[0].title}</h3><p>Arraste para comparar <span aria-hidden="true">↔</span></p></div>
      ${results.map((result, index) => `<div class="comparison-panel" id="comparison-panel-${index}" role="tabpanel" aria-labelledby="comparison-tab-${index}" ${index ? 'hidden' : ''}>
        <div class="comparison-stage" style="--position:50%" data-stage>
          <div class="comparison-after">${photo(result.after, 'comparison-photo after-photo')}</div>
          <div class="comparison-before">${photo(result.before, 'comparison-photo before-photo')}</div>
          <span class="comparison-label before-label">Antes</span><span class="comparison-label after-label">Depois</span>
          <div class="comparison-divider" aria-hidden="true"><span>‹<span class="handle-line"></span>›</span></div>
          <input class="comparison-range" type="range" min="0" max="100" value="50" aria-label="Comparar antes e depois de ${escape(result.title)}" aria-valuetext="50% da imagem antes visível" data-range>
        </div>
      </div>`).join('')}
      <div class="comparison-tabs" role="tablist" aria-label="Escolher resultado">${results.map((result, index) => `<button type="button" id="comparison-tab-${index}" role="tab" aria-selected="${index === 0}" aria-controls="comparison-panel-${index}" tabindex="${index ? '-1' : '0'}" data-result="${index}" data-title="${escape(result.title)}"><span>0${index + 1}</span>${result.tab}</button>`).join('')}</div>
      <p class="section-footnote">Resultados podem variar de pessoa para pessoa.</p>
    </div>
  </div></section>`;
}
