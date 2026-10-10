/* ============================================================
   LAYOUT — desenha o TOPO e o RODAPÉ.
   Existe uma única cópia deles. Toda página nova que incluir
   estes scripts ganha o mesmo topo e rodapé, sempre atualizados.
   ============================================================ */
WSS.registrar('layout', function(){
  var s = WSS.dados.site;
  if(!s) return;

  /* ---------------- TOPO ---------------- */
  var links = s.menu.map(function(i){
    return '<a href="'+WSS.txt(i.url)+'">'+WSS.txt(i.texto)+'</a>';
  }).join('');

  WSS.montar('[data-wss="nav"]',
    '<div class="nav__in">'+
      '<a class="brand" href="'+WSS.url('index.html')+'">'+
        '<img src="'+WSS.url(s.marcas.simbolo)+'" alt="" aria-hidden="true">'+
        'WSS <small>Labs</small>'+
      '</a>'+
      '<button class="nav__burger" id="wss-burger" aria-label="Abrir menu" aria-expanded="false">☰</button>'+
      '<nav class="nav__links" id="wss-links">'+links+'</nav>'+
      '<a class="btn btn--primary" href="'+WSS.txt(s.ctaTopo.url)+'" target="_blank" rel="noopener">'+WSS.txt(s.ctaTopo.texto)+'</a>'+
    '</div>');

  /* comportamento: sombra ao rolar + menu do celular */
  var nav = WSS.el('[data-wss="nav"]');
  if(nav){
    var marcar = function(){ nav.classList.toggle('is-stuck', window.scrollY > 20); };
    addEventListener('scroll', marcar, {passive:true}); marcar();

    var burger = WSS.el('#wss-burger'), lista = WSS.el('#wss-links');
    if(burger && lista){
      burger.addEventListener('click', function(){
        burger.setAttribute('aria-expanded', lista.classList.toggle('is-open'));
      });
      lista.addEventListener('click', function(e){
        if(e.target.tagName === 'A') lista.classList.remove('is-open');
      });
    }
  }

  /* ---------------- BOTÕES DE CONTATO ---------------- */
  /* Ficam aqui para existirem em UM lugar só: js/data/site.js */
  var contatos = ['<a class="btn btn--primary" href="mailto:'+WSS.txt(s.contato.email)+'">'+WSS.txt(s.contato.email)+'</a>'];
  if(s.contato.whatsapp) contatos.push('<a class="btn btn--ghost" href="'+WSS.txt(s.contato.whatsapp)+'" target="_blank" rel="noopener">WhatsApp</a>');
  (s.redes || []).forEach(function(r){
    contatos.push('<a class="btn btn--ghost" href="'+WSS.txt(r.url)+'" target="_blank" rel="noopener">'+WSS.txt(r.nome)+'</a>');
  });
  var pontoContato = WSS.el('[data-wss="contato"]');
  if(pontoContato) pontoContato.innerHTML = contatos.join('');

  /* ---------------- RODAPÉ ---------------- */
  var extras = ['<a href="'+WSS.txt(s.ctaTopo.url)+'" target="_blank" rel="noopener">WSS Cripto Control</a>'];
  (s.redes || []).forEach(function(r){
    extras.push('<a href="'+WSS.txt(r.url)+'" target="_blank" rel="noopener">'+WSS.txt(r.nome)+'</a>');
  });
  extras.push('<a href="mailto:'+WSS.txt(s.contato.email)+'">'+WSS.txt(s.contato.email)+'</a>');

  WSS.montar('[data-wss="footer"]',
    '<div class="footer__in">'+
      '<span>'+
        '<img class="footer__mark" src="'+WSS.url(s.marcas.simbolo)+'" alt="" aria-hidden="true">'+
        '© '+new Date().getFullYear()+' '+WSS.txt(s.nome)+' Sistemas · '+WSS.txt(s.cidade)+
        (s.cnpj ? ' · '+WSS.txt(s.razaoSocial)+' · CNPJ '+WSS.txt(s.cnpj) : '')+
      '</span>'+
      '<span>'+extras.join(' · ')+'</span>'+
    '</div>');
});
