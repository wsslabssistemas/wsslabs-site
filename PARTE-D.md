# Parte D — a troca final dos domínios

> Última etapa. Aqui o `www.wsslabs.com.br` deixa de ser o Cripto Control e
> passa a ser a vitrine. É a única etapa com um intervalo curto (1–2 min) em
> que o `www` fica fora do ar — é inevitável, porque a Vercel não deixa dois
> projetos usarem o mesmo domínio ao mesmo tempo.
>
> **Escolha um horário de pouco movimento** (de madrugada, por exemplo).

---

## Etapa 0 — Publicar a vitrine corrigida PRIMEIRO

⚠️ **Não pule.** Se você trocar os domínios antes disso, os botões
"Abrir o Cripto Control" vão apontar para a própria vitrine (loop), e quem tem
o app instalado fica com o service worker antigo interceptando o site novo.

1. Substituir os arquivos alterados na pasta do repositório
2. GitHub Desktop → Commit → **Push origin**
3. Esperar a Vercel publicar (~30s)
4. Conferir em `wsslabs-site.vercel.app` que o botão do topo leva ao
   Cripto Control

---

## Etapa 1 — Remover os domínios do projeto do PRODUTO

Vercel → projeto **wss-vercel** (o do Cripto Control) → Settings → Domains

1. Na linha `www.wsslabs.com.br` → **Remove**
2. Na linha `wsslabs.com.br` → **Remove**

⚠️ **NÃO remova o `cripto.wsslabs.com.br`.** É ele que mantém o sistema no ar
durante toda a troca. Confira duas vezes antes de clicar.

➡️ A partir daqui o cronômetro começa. Vá direto para a Etapa 2.

---

## Etapa 2 — Adicionar os domínios ao projeto da VITRINE

Vercel → projeto **wsslabs-site** → Settings → Domains → **Add Existing**

**Primeiro o www:**
- Domínio: `www.wsslabs.com.br`
- **Connect to an environment** → `Production`
- Add Domain

**Depois o sem-www, como redirecionamento:**
- Domínio: `wsslabs.com.br`
- Marcar **Redirect to Another Domain**
- Tipo: **308 Permanent Redirect**
- Destino: `www.wsslabs.com.br`
- Add Domain

> Isso recria exatamente o comportamento que existia antes no projeto do
> produto. Sem ele, quem digitar o endereço sem "www" não chega a lugar nenhum.

---

## Etapa 3 — Conferir (o momento da verdade)

Em **janela anônima**, um de cada vez:

- [ ] `https://cripto.wsslabs.com.br` → abre o **Cripto Control**
- [ ] `https://www.wsslabs.com.br` → abre a **vitrine**
- [ ] `https://wsslabs.com.br` → redireciona para o `www` e abre a vitrine
- [ ] Na vitrine, clicar em **"Abrir o Cripto Control"** → vai para
      `cripto.wsslabs.com.br` (e **não** volta para a vitrine)
- [ ] Entrar numa conta no Cripto Control → login funciona
- [ ] No celular, abrir o app instalado do Cripto Control → ele deve ir sozinho
      para o endereço novo

Se algo falhar, dá para voltar atrás: remova os domínios da vitrine e
adicione-os de novo ao projeto do produto. O `cripto.` nunca parou.

---

## Etapa 4 — Limpeza no Supabase

Só depois que a Etapa 3 estiver 100%.

Supabase → Authentication → URL Configuration:

- **Remover** `https://www.wsslabs.com.br/**` das Redirect URLs
- Conferir que `https://cripto.wsslabs.com.br` segue como Site URL

> Motivo: aquele endereço agora é de outro site. Deixar uma URL de
> redirecionamento apontando para um domínio que não é mais seu produto é
> higiene de segurança.

---

## Etapa 5 — Fechamento

- [ ] Mandar `https://www.wsslabs.com.br` para si mesmo no WhatsApp: deve
      aparecer o card com a imagem do buraco negro
- [ ] Pedir para o Claude atualizar o `JOURNAL.txt` (aqui e no chat do produto)

### Pendências que ficaram do teste da Parte C (chat do produto)

- Cancelar a assinatura de teste (senão cobra R$ 9,90/mês) — e serve para
  validar o ciclo de cancelamento: `assinatura_ativa` deve virar `false` sozinho
- Apagar as variáveis `MP_PLAN_MENSAL` e `MP_PLAN_ANUAL` da Vercel (não são
  mais lidas em lugar nenhum)
- Apagar o plano "TESTE" no painel do Mercado Pago

---

## Depois da migração: o que muda no dia a dia

| Endereço | O que é |
|---|---|
| `wsslabs.com.br` | redireciona para o www |
| `www.wsslabs.com.br` | vitrine da WSS Labs |
| `cripto.wsslabs.com.br` | WSS Cripto Control |
| `wsslabs-site.vercel.app` | mesma vitrine (endereço técnico, continua funcionando) |

O próximo produto ganha o próprio subdomínio: `sales.wsslabs.com.br`,
`finance.wsslabs.com.br`. Projeto Vercel separado para cada um — nenhum
encosta no limite de funções do outro.
