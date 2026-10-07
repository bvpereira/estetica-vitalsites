# Estética · Vital Sites

Landing page de uma única página para `estetica.vitalsites.com.br`.

## Base do projeto

Site estático com HTML, CSS e JavaScript nativos. Sem framework, dependências
de aplicação ou etapa de build. O `index.html` permanece vazio nesta fase;
conteúdo e decisões visuais serão definidos antes da implementação.

```text
index.html                          Página única
assets/css/                         Estilos
assets/js/                          Interações, quando necessárias
assets/images/                      Imagens e ícones
assets/fonts/                       Fontes locais, quando necessárias
.agents/skills/frontend-design/     Referência de design do Codex
vercel.json                         Configuração de hospedagem estática
.vercelignore                       Exclusões do envio pela CLI da Vercel
```

Os arquivos `.gitkeep` preservam as pastas vazias no Git.

## Desenvolvimento no Codex

Criação de arquivos, execução local e comandos Git serão realizados pelo Codex.
Para uma prévia local, o ambiente já possui Python e permite usar seu servidor
estático, sem instalar pacotes:

```text
python -m http.server 3000 --bind 127.0.0.1
```

Endereço da prévia: `http://127.0.0.1:3000`. O servidor deve ser iniciado pelo
Codex quando houver necessidade de visualizar a página.

## Design

Foi instalada somente a skill `frontend-design`, integralmente, a partir de:
https://github.com/bear2u/my-skills/tree/master/skills/frontend-design

Ela orientará tipografia, hierarquia, composição, espaçamento, responsividade,
acessibilidade e acabamento. A escolha de tecnologia permanece independente
da referência de design.

## GitHub e Vercel

- Repositório remoto: https://github.com/bvpereira/estetica-vitalsites
- Branch atual: `main`.
- Configuração declarada em `vercel.json`: preset `Other`, sem build e saída
  na raiz do projeto (`.`).
- A conexão do repositório à Vercel foi informada pelo responsável pelo projeto.
  A configuração do painel, o domínio e os registros DNS ainda precisam ser
  verificados na Vercel antes de confirmar a publicação no endereço final.
- Arquivos `.env`, dependências locais e configuração local da Vercel são
  ignorados pelo Git.

O envio de commits à branch conectada pode disparar um deploy automático.
Nesta etapa, a página permanece sem conteúdo visual.
