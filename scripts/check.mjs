import { readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(full));
    else if (/\.(mjs|js)$/.test(entry.name)) files.push(full);
  }
  return files;
}
const files = (await Promise.all(['src', 'scripts', 'tests', 'assets/js'].map(directory => collect(path.join(root, directory))))).flat();
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) { process.stderr.write(result.stderr); process.exit(1); }
}
console.log(`Sintaxe JavaScript validada: ${files.length} arquivos. Sem servidor local.`);
