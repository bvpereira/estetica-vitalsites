import { cp, mkdir, readFile, writeFile, stat, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { renderPage } from '../src/page.mjs';
import { clinic } from '../src/config.mjs';
import { validateConfig, validateHtml } from './validate.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== path.resolve(root)) throw new Error('Saída fora do projeto.');
validateConfig();
const html = renderPage();
const assets = validateHtml(html);
for (const asset of assets) {
  const assetPath = path.resolve(root, `.${asset}`);
  if (!assetPath.startsWith(path.join(root, 'assets') + path.sep)) throw new Error(`Recurso fora de assets: ${asset}`);
  if (asset === '/assets/js/site-config.js') continue;
  if (!(await stat(assetPath)).isFile()) throw new Error(`Arquivo não encontrado: ${asset}`);
}
// Only the verified, generated dist directory is replaced; sources stay intact.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, 'assets'), path.join(output, 'assets'), {
  recursive: true, filter: source => path.basename(source) !== '.gitkeep',
});
await writeFile(path.join(output, 'assets/js/site-config.js'), `// Gerado a partir de src/config.mjs.\nexport const directionsVideoUrl = ${JSON.stringify(clinic.directionsVideoUrl)};\n`);
await writeFile(path.join(output, 'index.html'), html);
// Root HTML remains complete for tools and repository inspection. Always edit src.
await writeFile(path.join(root, 'index.html'), html);
await writeFile(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${clinic.siteUrl}/sitemap.xml\n`);
await writeFile(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${clinic.siteUrl}/</loc></url></urlset>\n`);
const built = await readFile(path.join(output, 'index.html'), 'utf8');
validateHtml(built);
console.log(`Build concluído: dist/index.html (${Buffer.byteLength(built)} bytes), CSS, JS, favicon, robots.txt e sitemap.xml. Sem dependências ou servidor local.`);
