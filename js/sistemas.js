/* ============================================================
   SISTEMAS — transforma js/data/sistemas.js em cards na tela.
   Este arquivo é o "programa". Ele nunca sabe quais produtos
   existem: quem sabe é o arquivo de dados. Por isso adicionar
   um sistema novo nunca exige mexer aqui.
   ============================================================ */
WSS.registrar('sistemas', function(){

  var lista = WSS.dados.sistemas || [];

  var rotulo = { 'no-ar':'No ar', 'em-obras':'Em construção', 'em-estudo':'Em estudo' };

  function badge(status){
    var pulso = status === 'no-ar' ? '<i class="tag__pulse"></i>' : '';
    return '<span class="tag tag--'+WSS.txt(status)+'">'+pulso+WSS.txt(rotulo[status] || status)+'</span>';
  }

  function botoes(acoes){
    return (acoes || []).map(function(a){
      var externo = /^https?:/.test(a.url) ? ' target="_blank" rel="noopener"' : '';
      return '<a class="btn btn--'+(a.tipo === 'primary' ? 'primary' : 'ghost')+'" href="'+WSS.txt(a.url)+'"'+externo+'>'+WSS.txt(a.texto)+'</a>';
    }).join('');
  }

  function cardCompleto(s){
    var chips = (s.chips || []).map(function(c){ return '<span class="chip">'+WSS.txt(c)+'</span>'; }).join('');
    var imagem = s.logo
      ? '<div class="sys__shot"><img src="'+WSS.url(s.logo)+'" alt="Logotipo do '+WSS.txt(s.nome)+'" loading="lazy"></div>'
      : '';
    return '<article class="sys rv" id="sistema-'+WSS.txt(s.slug)+'">'+
      '<div class="sys__main"'+(imagem ? '' : ' style="grid-template-columns:1fr"')+'>'+
        '<div class="sys__body">'+
          badge(s.status)+
          '<h3>'+WSS.txt(s.nome)+'</h3>'+
          '<p>'+WSS.txt(s.resumo)+'</p>'+
          (chips ? '<div class="chips">'+chips+'</div>' : '')+
          '<div class="btn-row">'+botoes(s.acoes)+'</div>'+
        '</div>'+
        imagem+
      '</div>'+
    '</article>';
  }

  /* card médio: usado quando o sistema tem logo mas ainda não é o destaque.
     Dois deles ficam lado a lado, abaixo do card grande. */
  function cardMedio(s){
    var chips = (s.chips || []).slice(0,3).map(function(c){ return '<span class="chip">'+WSS.txt(c)+'</span>'; }).join('');
    return '<article class="sys sys--medio rv" id="sistema-'+WSS.txt(s.slug)+'">'+
      '<div class="sys__topo"><img src="'+WSS.url(s.logo)+'" alt="Logotipo do '+WSS.txt(s.nome)+'" loading="lazy"></div>'+
      '<div class="sys__body">'+
        badge(s.status)+
        '<h3>'+WSS.txt(s.nome)+'</h3>'+
        '<p>'+WSS.txt(s.resumo)+'</p>'+
        (chips ? '<div class="chips">'+chips+'</div>' : '')+
        '<div class="btn-row">'+botoes(s.acoes)+'</div>'+
      '</div>'+
    '</article>';
  }

  function cardSlim(s){
    return '<article class="sys rv" id="sistema-'+WSS.txt(s.slug)+'">'+
      '<div class="sys__slim">'+
        '<div>'+badge(s.status)+'<h3><b>'+WSS.txt(s.nome)+'.</b> '+WSS.txt(s.resumo)+'</h3></div>'+
        '<div class="btn-row">'+botoes(s.acoes)+'</div>'+
      '</div>'+
    '</article>';
  }

  function cardConvite(c){
    if(!c) return '';
    return '<article class="sys rv">'+
      '<div class="sys__slim">'+
        '<div>'+badge(c.status)+'<h3><b>'+WSS.txt(c.titulo)+'</b> '+WSS.txt(c.texto)+'</h3></div>'+
        '<div class="btn-row">'+botoes([c.acao])+'</div>'+
      '</div>'+
    '</article>';
  }

  /* Monta na ordem do catálogo, agrupando os cards médios de dois em dois. */
  var html = '', duo = [];

  function fecharDuo(){
    if(!duo.length) return;
    html += '<div class="sys-duo">' + duo.join('') + '</div>';
    duo = [];
  }

  lista.forEach(function(s){
    if(s.destaque){ fecharDuo(); html += cardCompleto(s); }
    else if(s.logo){ duo.push(cardMedio(s)); }
    else { fecharDuo(); html += cardSlim(s); }
  });
  fecharDuo();

  html += cardConvite(WSS.dados.convite);

  WSS.montar('[data-wss="sistemas"]', html);

  /* faixa de números: só conta o que realmente está no ar */
  var contador = WSS.el('[data-wss="conta-no-ar"]');
  if(contador) contador.textContent = lista.filter(function(s){ return s.status === 'no-ar'; }).length;
});
