/* ============================================================
   CORE — precisa ser o PRIMEIRO script carregado.
   Cria o "sobrenome" WSS, para que nenhum arquivo do site
   brigue com outro nem com bibliotecas de terceiros.
   ============================================================ */
window.WSS = window.WSS || {};

WSS.dados = WSS.dados || {};   /* conteúdo (js/data/*.js)      */
WSS.mod   = WSS.mod   || {};   /* módulos de comportamento     */

/* ------------------------------------------------------------
   CAMINHO BASE
   A home fica na raiz; uma página de produto fica em
   /sistemas/nome/. Para o topo e o rodapé funcionarem nas duas,
   cada página declara sua profundidade em <html data-base="...">.
     home ................ data-base="."
     /sistemas/x/ ........ data-base="../.."
   ------------------------------------------------------------ */
WSS.base = document.documentElement.dataset.base || '.';
WSS.url = function(caminho){
  if(/^(https?:|mailto:|tel:|#)/.test(caminho)) return caminho;
  return WSS.base + '/' + caminho.replace(/^\.?\//,'');
};

/* ------------------------------------------------------------
   AJUDANTES
   ------------------------------------------------------------ */
WSS.el = function(sel,raiz){ return (raiz||document).querySelector(sel); };
WSS.els = function(sel,raiz){ return Array.prototype.slice.call((raiz||document).querySelectorAll(sel)); };

/* Escapa texto vindo dos arquivos de dados antes de virar HTML. */
WSS.txt = function(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
};

/* Insere HTML num ponto da página. Se o ponto não existir,
   avisa no console e segue — uma peça quebrada não derruba o site. */
WSS.montar = function(sel,html){
  var alvo = WSS.el(sel);
  if(!alvo){ console.warn('[WSS] ponto de montagem não encontrado:',sel); return null; }
  alvo.innerHTML = html;
  return alvo;
};

/* Registra um módulo. main.js chama todos no fim do carregamento.
   Se um módulo der erro, os outros continuam funcionando.        */
WSS.registrar = function(nome,iniciar){ WSS.mod[nome] = iniciar; };
