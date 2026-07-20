/* ============================================================
   REVEAL — faz os blocos aparecerem ao entrar na tela.
   Precisa rodar DEPOIS de layout.js e sistemas.js, porque parte
   dos elementos .rv é criada por eles.
   ============================================================ */
WSS.registrar('reveal', function(){

  if(!('IntersectionObserver' in window)){
    /* navegador antigo: mostra tudo, sem animação. Nunca esconde conteúdo. */
    WSS.els('.rv').forEach(function(el){ el.classList.add('on'); });
    return;
  }

  var entrada = new IntersectionObserver(function(itens){
    itens.forEach(function(item,i){
      if(!item.isIntersecting) return;
      setTimeout(function(){ item.target.classList.add('on'); }, i * 70);
      entrada.unobserve(item.target);
    });
  }, { threshold:.16, rootMargin:'0px 0px -8% 0px' });

  WSS.els('.rv').forEach(function(el){ entrada.observe(el); });

  /* passos do método: a linha do gradiente só corre quando o passo aparece */
  var linha = new IntersectionObserver(function(itens){
    itens.forEach(function(item){
      if(!item.isIntersecting) return;
      item.target.classList.add('on');
      linha.unobserve(item.target);
    });
  }, { threshold:.4 });

  WSS.els('.step').forEach(function(el){ linha.observe(el); });
});
