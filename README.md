# Site WSS Labs — manual do projeto

Site institucional e vitrine dos sistemas da WSS Labs.
**Estático puro**: não precisa instalar nada, não precisa de Node, npm nem build.
Publicar = subir a pasta.

---

## 🗺️ Mapa das pastas

```
wsslabs-site/
├── index.html            ← página inicial (só conteúdo)
├── vercel.json           ← configuração de publicação
├── README.md             ← este manual
│
├── css/                  ← APARÊNCIA
│   ├── tokens.css        ← cores, fontes e medidas (fonte da verdade)
│   ├── base.css          ← reset e utilitários globais
│   ├── layout.css        ← topo, seções e rodapé
│   ├── components.css    ← botões, tags, chips, cards
│   └── pages/
│       └── home.css      ← só o que existe na página inicial
│
├── js/                   ← COMPORTAMENTO
│   ├── core.js           ← base (carrega primeiro, sempre)
│   ├── data/             ← ⭐ CONTEÚDO — é aqui que você mexe
│   │   ├── site.js       ← contato, menu, marca
│   │   └── sistemas.js   ← a lista de produtos
│   ├── layout.js         ← desenha topo e rodapé
│   ├── sistemas.js       ← desenha os cards de produto
│   ├── reveal.js         ← animação de entrada
│   ├── gravity.js        ← a malha do espaço-tempo
│   └── main.js           ← liga tudo (carrega por último)
│
├── assets/
│   ├── marcas/           ← logos em PNG transparente
│   └── video/            ← logo animado
│
└── sistemas/             ← (futuro) uma pasta por produto
```

---

## ⭐ Como adicionar um sistema novo ao site

**Você não mexe em HTML, CSS nem em programa.** São 3 passos:

1. Coloque o logo do produto em `assets/marcas/` (PNG com fundo transparente).
2. Abra `js/data/sistemas.js`. Dentro dele já existe um **modelo comentado**:
   copie o bloco, cole na lista e preencha.
3. Salve e publique. O card aparece sozinho, a contagem de
   "sistemas em produção" se atualiza sozinha.

### Campos de um sistema

| Campo | Para que serve |
|---|---|
| `slug` | nome curto, sem acento e sem espaço. Vira o endereço da futura página |
| `nome` | como aparece na tela |
| `status` | `'no-ar'` (verde), `'em-obras'` (turquesa) ou `'em-estudo'` (cinza) |
| `destaque` | `true` = card grande com logo · `false` = card em linha |
| `logo` | caminho do PNG |
| `resumo` | 2 a 3 frases: qual problema resolve e como |
| `chips` | etiquetas técnicas (integrações, leis, diferenciais) |
| `acoes` | botões. `tipo:'primary'` é o colorido, `'ghost'` é o de contorno |

### ⚠️ A única regra ao editar dados

Mantenha **as aspas e as vírgulas** exatamente como no modelo.
Uma vírgula a mais ou a menos é o erro mais comum.

Se errar, o site **não fica em branco** — o `main.js` isola a falha e o
resto da página continua no ar. Abra o console do navegador
(tecla `F12` → aba *Console*) e me mande a mensagem em vermelho.

---

## 🎨 Como mudar uma cor ou uma fonte

Abra `css/tokens.css`. Tudo está lá, com nome e comentário.
Mudou ali, mudou no site inteiro.

**Nunca escreva um código de cor (`#xxxxxx`) fora do `tokens.css`.**
É essa regra que impede o site de virar uma colcha de retalhos.

---

## 📄 Como criar uma página só para um produto (no futuro)

Quando o Cripto Control merecer uma página própria:

1. Crie `sistemas/cripto-control/index.html`.
2. Na primeira linha use `data-base="../.."`:
   ```html
   <html lang="pt-BR" data-base="../..">
   ```
   É isso que faz os caminhos de imagem, CSS e JS funcionarem
   de dentro de uma subpasta.
3. Inclua os mesmos CSS e JS do `index.html` (ajustando `../..` na frente).
4. Crie `css/pages/cripto-control.css` para o que for exclusivo dela.

O topo e o rodapé aparecem sozinhos — eles vêm do `js/layout.js`.

---

## 🚀 Publicar

👉 **Passo a passo detalhado: veja o arquivo `PUBLICAR.md`.**

O site é estático e **não usa nenhuma função serverless**.
Isso é proposital: o limite de 12 funções da Vercel é *por projeto*, e o
WSS Cripto Control já usa 8 das dele. Vitrine e produto ficam em
**projetos separados**, ligados por subdomínio.

1. Suba esta pasta para um repositório novo no GitHub.
2. Na Vercel: *Add New Project* → escolha o repositório → *Deploy*.
   Não precisa configurar build, nem variável de ambiente, nem nada.
3. Confira tudo no endereço `*.vercel.app` que a Vercel gerar.
4. **Só depois** mexa em DNS.

### ⚠️ Ao apontar o domínio (fazer com calma, em passo separado)

Hoje `www.wsslabs.com.br` é o **produto**. Se o domínio virar a vitrine,
quatro coisas quebram se forem esquecidas:

1. URL do webhook no painel do Mercado Pago
2. `notification_url` e `back_url` no `api/mp.js` do produto
3. Site URL e Redirect URLs no Supabase
4. Cache do service worker de quem já instalou o app no celular

---

## 👀 "Abri o index.html e a página veio branca"

Isso é esperado em **visualizadores que abrem um arquivo por vez** (o preview do
chat, um anexo de e-mail). O `index.html` é só o esqueleto: ele busca o estilo em
`css/` e o programa em `js/`. Sem essas pastas do lado, vem sem estilo — branco.

Como ver o site de verdade, do jeito mais simples ao mais correto:

1. **Baixe a pasta inteira** e dê dois cliques no `index.html`. Funciona.
   (Nenhum script aqui é "module", justamente para abrir direto do computador.)
2. Ou abra o `PREVIEW-visualizar.html` — é o site inteiro espremido num arquivo
   só, para mandar por WhatsApp/e-mail ou ver em qualquer lugar.
3. Ou publique na Vercel e veja no endereço real.

### Sobre o PREVIEW-visualizar.html

**Nunca edite esse arquivo.** Ele é gerado. Depois de mexer no site, rode:

```
python3 ferramentas/gerar-preview.py
```

e ele se refaz sozinho a partir do projeto real.

---

## 🔄 Publiquei mas a mudança não apareceu

O navegador guarda os arquivos antigos. Nos `<link>` e `<script>` do
`index.html` existe um `?v=1` no fim de cada endereço.
**Suba esse número** (`?v=2`, `?v=3`...) sempre que alterar CSS ou JS
e o navegador é obrigado a baixar a versão nova.
