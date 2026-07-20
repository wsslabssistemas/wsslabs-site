# Publicar o site — passo a passo

Leia uma etapa por vez. **Não pule para a Etapa 4** antes de terminar a 3.

Regra de ouro: **até a Etapa 3, nada do que você fizer afeta o WSS Cripto Control.**
O risco só começa na Etapa 4.

---

## Etapa 0 — Contas (10 minutos, uma vez só)

1. Crie uma conta no **GitHub**: https://github.com/signup
   Use o e-mail `wsslabs.sistemas@gmail.com`. Plano gratuito.
2. Crie uma conta na **Vercel**: https://vercel.com/signup
   Na tela de cadastro escolha **"Continue with GitHub"**. Isso já liga as duas contas.

> Se você já tem essas contas (o Cripto Control está na Vercel), use as mesmas.

---

## Etapa 1 — Colocar o site no GitHub

O GitHub é onde o site vai morar. Ele guarda o histórico: toda alteração fica
registrada e dá para voltar atrás. É por isso que a partir de agora eu paro de
te mandar ZIP.

1. Descompacte o `wsslabs-site.zip` no seu computador.
2. No GitHub, clique no **+** no canto superior direito → **New repository**.
3. Preencha:
   - **Repository name:** `wsslabs-site`
   - **Private** (marque; ninguém precisa ver o código)
   - **NÃO** marque "Add a README file"
4. Clique em **Create repository**.
5. Na tela seguinte, clique no link **"uploading an existing file"**.
6. Abra a pasta `wsslabs-site` no seu computador.
   **Entre na pasta.** Selecione tudo que está *dentro* dela
   (`index.html`, `css`, `js`, `assets`, `README.md`...) e arraste para o navegador.

   ⚠️ Arraste o **conteúdo** da pasta, não a pasta. Se você arrastar a pasta
   inteira, o site fica um nível abaixo e não funciona.
7. Espere terminar de enviar (o vídeo e as imagens demoram um pouco).
8. Em **Commit changes**, escreva `primeira versão do site` e clique no botão verde.

✅ **Confira:** a lista de arquivos do repositório deve começar com `index.html`.
Se aparecer só uma pasta `wsslabs-site`, você arrastou errado — apague e refaça o passo 6.

---

## Etapa 2 — Publicar na Vercel

1. Na Vercel, clique em **Add New...** → **Project**.
2. Encontre `wsslabs-site` na lista e clique em **Import**.
3. Na tela de configuração, **não mude nada**:
   - Framework Preset: `Other`
   - Build Command: vazio
   - Output Directory: vazio
   - Environment Variables: nenhuma

   > Este site não tem programa de servidor. É só arquivo. Por isso não precisa
   > de nada disso — e por isso ele nunca vai brigar com o limite de 12 funções
   > que o Cripto Control já usa.
4. Clique em **Deploy** e espere. Leva menos de um minuto.
5. A Vercel te dá um endereço tipo `wsslabs-site.vercel.app`. **Esse é o seu site no ar.**

---

## Etapa 3 — Conferir antes de mexer no domínio

Abra o endereço `.vercel.app` **no computador e no celular** e confira:

- [ ] O vídeo do buraco negro aparece e está rodando
- [ ] A malha do fundo se deforma quando você passa o mouse (só no computador)
- [ ] Os 3 logos de produto aparecem, sem fundo quadrado
- [ ] O menu abre no celular (botão ☰)
- [ ] O botão "Abrir o Cripto Control" leva ao sistema certo
- [ ] O e-mail no rodapé e no contato está correto
- [ ] Rolar a página faz os blocos aparecerem suavemente

Se algo estiver errado, **pare aqui e me chame.** Não siga para a Etapa 4.

---

## Etapa 4 — O domínio ⚠️ ETAPA DELICADA

Só entre aqui quando a Etapa 3 estiver 100%.

### Onde queremos chegar

| Endereço | O que fica lá |
|---|---|
| `wsslabs.com.br` e `www.wsslabs.com.br` | este site (vitrine) |
| `cripto.wsslabs.com.br` | o WSS Cripto Control |

### Por que a ordem importa

O Cripto Control está hoje no `www`. Se a gente simplesmente tirar o `www` dele
e entregar para a vitrine, o sistema fica **inacessível** entre um passo e outro,
e quem tentar pagar nesse intervalo vai dar erro.

A solução é fazer o produto atender **nos dois endereços ao mesmo tempo** durante
a troca. Assim nunca existe um minuto sem sistema no ar.

### A ordem correta

**Parte A — dar um segundo endereço ao produto (nada quebra aqui)**

1. No projeto da Vercel **do Cripto Control** (não o da vitrine):
   Settings → Domains → adicione `cripto.wsslabs.com.br`.
2. Siga a instrução de DNS que a Vercel mostrar, no painel onde você comprou o domínio.
3. Espere propagar (pode levar de minutos a algumas horas).
4. Abra `cripto.wsslabs.com.br`. O Cripto Control tem que abrir normalmente.

   ➡️ Neste ponto o produto responde nos **dois** endereços. Nada quebrou.

**Parte B — apontar os serviços para o endereço novo** *(faça no outro chat, é lá que está o código)*

5. **Supabase** → Authentication → URL Configuration:
   adicione `https://cripto.wsslabs.com.br` no Site URL e nas Redirect URLs.
   **Mantenha o `www` na lista por enquanto.**
6. **`api/mp.js`** → trocar `notification_url` e `back_url` para `cripto.wsslabs.com.br`.
   Publicar a alteração.
7. **Painel do Mercado Pago** → atualizar a URL do webhook para o endereço novo.
8. **Service worker / PWA:** quem já instalou o app no celular está apontando para
   o `www`. Precisa sair uma atualização que redirecione essas pessoas para o
   endereço novo **antes** da Parte C. Trate isso no chat do produto.

**Parte C — testar de verdade antes de soltar o `www`**

9. Em `cripto.wsslabs.com.br`, faça o caminho completo:
   criar conta → confirmar e-mail → entrar → **fazer um pagamento de teste** →
   conferir se o webhook chegou e se a assinatura ativou.

   ⚠️ Se qualquer coisa falhar, **pare.** O `www` ainda está funcionando —
   você não perdeu nada. Conserte e teste de novo.

**Parte D — entregar o `www` para a vitrine**

10. No projeto do **Cripto Control**: Settings → Domains → **remover** `wsslabs.com.br` e `www.wsslabs.com.br`.
11. No projeto da **vitrine**: Settings → Domains → **adicionar** os dois.
12. Esperar propagar e conferir: `wsslabs.com.br` mostra a vitrine,
    `cripto.wsslabs.com.br` mostra o sistema.
13. No Supabase, **agora sim** remova o `www` das Redirect URLs.

---

## Depois de publicado: como alterar o site

Nunca mais precisa de ZIP.

- **Mudar texto, produto, cor:** edite o arquivo direto no GitHub
  (abra o arquivo → ícone de lápis → altere → *Commit changes*).
  A Vercel republica sozinha em segundos.
- **Alteração maior:** me mande o que quer, eu devolvo o arquivo pronto e você
  substitui pelo GitHub.
- **Se der errado:** no GitHub, aba *Commits*, você vê tudo que mudou e volta atrás.

⚠️ Sempre que mexer em algo dentro de `css/` ou `js/`, **suba o número do `?v=`**
no `index.html` (`?v=4` → `?v=5`). É o que obriga o navegador de quem já visitou
a baixar a versão nova.
