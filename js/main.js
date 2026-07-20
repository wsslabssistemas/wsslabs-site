/* ============================================================
   MAIN — o último script da página. Liga os módulos na ordem.

   PONTO IMPORTANTE: cada módulo roda dentro de um try/catch.
   Se um deles quebrar (um dado com vírgula errada, por exemplo),
   os outros continuam funcionando e o site NÃO fica em branco.
   O erro aparece só no console, para você me mandar.
   ============================================================ */
(function(){

  var ordem = ['layout','sistemas','reveal','gravity'];

  function ligar(){
    ordem.forEach(function(nome){
      var iniciar = WSS.mod[nome];
      if(typeof iniciar !== 'function'){
        console.warn('[WSS] módulo não carregado:', nome);
        return;
      }
      try{
        iniciar();
      }catch(erro){
        console.error('[WSS] falha no módulo "'+nome+'":', erro);
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ligar);
  }else{
    ligar();
  }
})();
