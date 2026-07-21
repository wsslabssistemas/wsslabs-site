/* ============================================================
   MIGRACAO DO PWA - roda ANTES de todo o resto, de proposito.

   POR QUE ESTE ARQUIVO EXISTE
   ---------------------------
   Ate a migracao, www.wsslabs.com.br servia o WSS Cripto Control.
   Quem instalou o app no celular ficou com DUAS herancas nesse
   mesmo endereco:
     1. um service worker registrado (o "motor offline" do app)
     2. caches com nome wss-cripto-*
   Depois da migracao esse endereco passa a servir ESTE site.
   O service worker antigo continua ali, intercepta os pedidos e
   pode devolver pedacos do sistema antigo em cima da vitrine.

   O produto tem um script parecido (public/js/pwa.js), mas ele so
   funciona ENQUANTO o www ainda serve o sistema. Depois da troca,
   quem nao tinha aberto o app fica orfao. Este arquivo cobre
   exatamente essas pessoas.

   O QUE ELE FAZ
   -------------
   A) SEMPRE: desregistra service workers e apaga os caches do
      Cripto Control neste dominio. Faxina, roda para todo mundo.
   B) SO SE for o APP INSTALADO abrindo (nao o navegador comum) E
      houver vestigio do sistema antigo: devolve a pessoa para
      cripto.wsslabs.com.br.

   As duas condicoes juntas evitam o erro grave: mandar embora
   quem so queria visitar o site da empresa.

   VALVULA DE ESCAPE (a mesma do produto): no console do
   navegador, rodar
     localStorage.setItem('wss:sem-migracao','1')
   desliga o redirecionamento nesse aparelho.

   PODE APAGAR ESTE ARQUIVO? Sim, mas so daqui a bastante tempo -
   ele existe para quem instalou o app ANTES da migracao e ainda
   nao abriu desde entao. Sugestao: manter por 12 meses.
   ============================================================ */
(function () {
  'use strict';

  var DESTINO = 'https://cripto.wsslabs.com.br';
  var vestigio = false;

  function appInstalado() {
    try {
      if (navigator.standalone === true) return true;
      if (window.matchMedia) {
        return matchMedia('(display-mode: standalone)').matches ||
               matchMedia('(display-mode: fullscreen)').matches ||
               matchMedia('(display-mode: minimal-ui)').matches;
      }
    } catch (e) {}
    return false;
  }

  function desligado() {
    try { return localStorage.getItem('wss:sem-migracao') === '1'; }
    catch (e) { return false; }
  }

  function levarParaOEnderecoNovo() {
    if (!vestigio || !appInstalado() || desligado()) return;
    try {
      location.replace(DESTINO + location.pathname + location.search + location.hash);
    } catch (e) {
      location.href = DESTINO;
    }
  }

  var etapas = [];

  if ('serviceWorker' in navigator) {
    etapas.push(
      navigator.serviceWorker.getRegistrations()
        .then(function (lista) {
          if (lista && lista.length) vestigio = true;
          return Promise.all(lista.map(function (r) {
            return r.unregister().catch(function () {});
          }));
        })
        .catch(function () {})
    );
  }

  if (window.caches && caches.keys) {
    etapas.push(
      caches.keys()
        .then(function (nomes) {
          var antigos = (nomes || []).filter(function (n) {
            return /wss[-_]?cripto/i.test(n);
          });
          if (antigos.length) vestigio = true;
          return Promise.all(antigos.map(function (n) {
            return caches.delete(n).catch(function () {});
          }));
        })
        .catch(function () {})
    );
  }

  if (etapas.length) {
    Promise.all(etapas).then(levarParaOEnderecoNovo).catch(function () {});
    setTimeout(levarParaOEnderecoNovo, 2500);
  }
})();
