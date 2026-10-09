import { readFileSync } from 'node:fs';

// Only these local modules are bundled. No application or build dependencies.
export function bundleScripts() {
  const modules = ['gallery.js', 'carousels.js', 'faq.js', 'main.js'];
  const source = modules.map(name => {
    const code = readFileSync(new URL(`../assets/js/${name}`, import.meta.url), 'utf8');
    const bundled = code.replace(/^import \{[^}]+\} from '\.\/(?:gallery|carousels|faq)\.js';\r?\n/gm, '')
      .replace(/^export function /gm, 'function ');
    if (/^\s*(?:import|export)\b/m.test(bundled)) throw new Error(`Import/export não suportado no bundle: ${name}`);
    return bundled;
  }).join('\n');
  return `// Gerado a partir dos módulos em assets/js.\n(() => {\n'use strict';\n${source}\n})();\n`;
}
