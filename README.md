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
src/components/hero.mjs           Hero
src/components/care.mjs           Introdução, tratamentos, diferenciais,
                                 profissional, etapas e depoimentos
src/components/results.mjs        Comparação interativa antes/depois
src/components/clinic.mjs         Galeria, localização e mapa
src/components/contact-footer.mjs CTA, footer e diálogo de orientação
src/components/shared.mjs        Botões, ícones, marca e imagens reutilizáveis
assets/css/styles.css            Estilos e responsividade
assets/js/main.js                Comparação e faixa da Hero
assets/js/gallery.js             Galeria contínua e pausas
assets/js/carousels.js           Tratamentos, popups e depoimentos
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

- Fundo da Hero: `images.hero`.
- Logo da Hero: `images.heroLogo`.
- Introdução: `images.introduction`.
- Profissional: `images.professional`.
- Tratamentos: `treatments[].image`.
- Antes/depois principal: `results[].before` e `results[].after` (seis fotos).
- Antes/depois dos popups: `treatments[].before` e `treatments[].after` (12 fotos).
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

- Antes/depois sobreposto em formato 1:1, com mouse, touch e range para teclado.
- Três resultados com tabs e navegação por setas, Home e End.
- Galeria com dez fotos quadradas abaixo dos contatos e do mapa, movimento
  automático contínuo, swipe, arraste com mouse e teclado. Sem setas,
  indicadores ou numeração visual; legendas em badges dentro das imagens.
  Repetições visuais permitem o loop sem duplicar conteúdo acessível.
  Pausa durante arraste, ao sair da tela ou trocar de aba; botão para pausar.
  O movimento automático solicitado permanece ativo independentemente de
  `prefers-reduced-motion`; os demais efeitos respeitam essa preferência.
- Seis etapas de cuidado: avaliação, protocolo, tratamento, recuperação,
  acompanhamento da evolução e planejamento da continuidade.
- Parágrafos de 16 px e textos de apoio ampliados para facilitar a leitura.
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

## Refinamento atual

- Banner escuro e logo transparente enviados pelo usuário; fotos reais fornecidas
  para introdução e profissional. Arquivos PNG preservados em `assets/images/`.
- Hero com seis diferenciais em faixa contínua e controle de pausa.
- Tratamentos em uma linha: três no desktop, dois no tablet, um no celular.
  Navegação por páginas, teclado e swipe; seis popups independentes com indicação
  individual, imagens de antes/depois, X e botão para retornar à página.
- Diferenciais centralizados, ícones 30% maiores e títulos em negrito.
- Comparação principal mantém 1:1 e largura máxima 35% menor (468 px).
- Depoimentos alternam a cada dez segundos, com card central em destaque
  e laterais desfocadas; navegação manual e controle de pausa permanecem disponíveis.
- Galeria da clínica com largura das imagens reduzida em 50%, badge e sem navegação.
- Contato permanece junto do mapa, com a âncora `#contato`; seção repetida removida.
- Rodapé com fundo escuro e texto claro.

## Perguntas frequentes

- Conteúdo: `src/faq.mjs`, com as dez perguntas e respostas fornecidas.
- Seção: `src/components/faq.mjs`, imediatamente antes do rodapé, após o CTA final.
- Accordion nativo `details/summary`, agrupado para abrir uma resposta por vez,
  com fallback em `assets/js/faq.js`. Teclado e estado expandido são fornecidos
  pela semântica nativa do navegador.
- Estilos limitados às classes `faq-*`, mantendo as demais seções.
- CTA usa `clinic.faqWhatsappMessage` e o número centralizado em `src/config.mjs`.
- JSON-LD `FAQPage` gerado da mesma fonte das respostas visíveis, conforme
  https://schema.org/FAQPage. O Google encerrou o recurso de rich results de FAQ
  em maio de 2026; a marcação semântica não implica exibição especial na busca.
  Fonte: https://developers.google.com/search/updates#may-2026

A faixa da Hero percorre toda a largura do banner da direita para a esquerda.
A galeria mantém movimento contínuo na mesma direção. Passar o mouse sobre
as seções não interrompe o automático; os controles explícitos permitem pausar.
Não são exibidas mensagens de movimento reduzido nos carrosséis.

O header foi removido. A navegação permanece no rodapé, com o logo enviado.
A introdução tem moldura assimétrica em rosé; os títulos dos tratamentos estão
em negrito. Na área da clínica, a ação principal é Como chegar, com fundo escuro.
As referências a projeto fictício foram retiradas do rodapé e da descrição do
negócio; os depoimentos criados para composição continuam identificados como
exemplos sem vínculo com pacientes reais.
A galeria acumula frações de pixel antes de atualizar o scroll, garantindo
movimento em navegadores que arredondam scrollLeft para valores inteiros.

As 18 imagens dos seis tratamentos foram fornecidas pelo usuário e estão
em `assets/images/tratamentos/`. Cada ID tem a imagem principal (`id.png`),
antes (`id-antes.png`) e depois (`id-depois.png`), vinculados em `src/config.mjs`.
Os arquivos PNG originais foram preservados e mantêm proporção 1:1.

Controles de pausa removidos da Hero, galeria e depoimentos. A faixa da Hero
e a galeria mantêm movimento contínuo; depoimentos alternam a cada dez segundos
com navegação anterior/próximo. Instagram aparece abaixo do WhatsApp na clínica.
A primeira comparação em Resultados agora apresenta Toxina Botulínica e utiliza
as imagens de antes/depois fornecidas, compartilhadas com o popup do tratamento.
