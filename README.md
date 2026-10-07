# Aura Clínica Estética

Landing page demonstrativa de uma clínica fictícia para
https://estetica.vitalsites.com.br. HTML, CSS e JavaScript nativos; zero
 dependências de aplicação. Nenhuma foto é gerada ou incluída nesta etapa.

## Fluxo de trabalho

**Nunca iniciar servidor local.** A revisão visual acontece exclusivamente na
versão publicada pela Vercel. Comandos são executados pelo Codex:

```text
npm run check
npm test
npm run build
git add <arquivos relacionados>
git commit -m "descrição da alteração"
git push origin main
```

- `check`: verifica sintaxe JavaScript, sem instalar ferramentas de lint.
- `test`: runner nativo do Node para contatos, navegação, ARIA, SEO e fotos.
- `build`: compõe o HTML completo e copia os recursos públicos para `dist/`;
  valida configuração, links internos e existência dos arquivos.
- Não há TypeScript, lint dedicado, framework ou servidor de desenvolvimento.
- Node 22 ou superior é suficiente. Não é necessário instalar dependências.

## Organização

```text
src/config.mjs                    Dados da clínica, fotos, tratamentos e galeria
src/page.mjs                      Documento HTML, SEO e composição das seções
src/components/header-hero.mjs    Header e Hero
src/components/care.mjs           Introdução, tratamentos, diferenciais,
                                 profissional, etapas e depoimentos
src/components/results.mjs        Comparação interativa antes/depois
src/components/clinic.mjs         Galeria, localização e mapa
src/components/contact-footer.mjs CTA, contato, footer e diálogo de orientação
src/components/shared.mjs        Botões, ícones, marca e imagens reutilizáveis
assets/css/styles.css            Estilos e responsividade
assets/js/main.js                Menu, comparação, galeria e interações
assets/images/                   Fotos futuras e favicon vetorial
scripts/                         Build e validações
tests/site.test.mjs               Verificações automatizadas
index.html                       HTML gerado pelo build; não editar diretamente
dist/                            Saída de produção ignorada pelo Git
AGENTS.md                        Regra de nunca iniciar servidor local
```

Todo o conteúdo é entregue no HTML de produção, sem depender de JavaScript
para renderizar seções. O JS cuida das interações. Cormorant Garamond e Manrope
são carregadas pelo Google Fonts com `display=swap` e fontes fallback.
O mapa depende do Google Maps, com iframe lazy loading.

## Substituir as imagens

1. Adicione fotos otimizadas (preferencialmente WebP/AVIF) em `assets/images/`.
2. Em `src/config.mjs`, preencha `src` com `/assets/images/nome-da-foto.webp`.
3. Atualize `alt` com uma descrição da foto real, removendo o rótulo `IMAGEM`.
4. Execute as validações e o build, faça commit e push.

Locais da configuração:

- Hero: `images.hero`.
- Introdução: `images.introduction`.
- Profissional: `images.professional`.
- Tratamentos: `treatments[].image`.
- Antes/depois: `results[].before` e `results[].after` (seis fotos).
- Clínica: `gallery[].image` (dez fotos); legendas em `caption`.

Use fotos antes/depois com o mesmo enquadramento, proporção, posição do rosto
 e iluminação. As duas ocupam o mesmo retângulo; o divisor controla o recorte
 da camada anterior, sem redimensioná-la. Hero usa carregamento prioritário;
 demais fotos reais usam lazy loading.

## Vídeo de “Como chegar”

Em `src/config.mjs`, preencha `clinic.directionsVideoUrl` com uma URL HTTPS.
O build gera a configuração pública utilizada pelo JavaScript. Enquanto a URL
estiver vazia, o botão abre um diálogo acessível com a localização e acesso ao
Google Maps. Com a URL configurada, abre o vídeo em nova aba.

## Interações e acessibilidade

- Menu mobile com Escape, controle de foco e fechamento ao escolher uma seção.
- Antes/depois sobreposto com mouse, touch e controle range para teclado.
- Três resultados com tabs e navegação por setas, Home e End.
- Galeria com dez fotos, snap nativo, swipe, arraste com mouse, setas,
  indicadores, teclado e contador.
- Animações respeitam `prefers-reduced-motion`; conteúdo visível sem JS.
- WhatsApp fixo em faixa mobile, com espaço reservado e respeito à safe area.
- Nenhum formulário, banco de dados ou autenticação.

## GitHub e Vercel

- Repositório: https://github.com/bvpereira/estetica-vitalsites
- Branch: `main`.
- Vercel: preset `Other`, build `npm run build`, saída `dist`, raiz do projeto.
- O push aciona o deploy do repositório conectado. Domínio, DNS e eventuais
  configurações do painel dependem do projeto Vercel existente.
- Build produz sitemap, robots.txt, canonical, Open Graph e JSON-LD local.
  Não publica notas, registros profissionais ou certificações inventadas.
- Os dados, os depoimentos e a clínica são fictícios. Substituir por dados
  autorizados antes de usar o projeto para uma clínica real.

Skill de referência: `.agents/skills/frontend-design/SKILL.md`, instalada de
https://github.com/bear2u/my-skills/tree/master/skills/frontend-design.
Nenhuma outra skill foi instalada.
