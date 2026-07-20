/* ============================================================
   GRAVITY — a assinatura visual do site.
   Desenha a malha do espaço-tempo curvada por um poço
   gravitacional (o buraco negro do logo) e pelo cursor.

   É o conceito da marca virando comportamento: a WSS Labs
   "atrai soluções e distorce limites".
   ============================================================ */
WSS.registrar('gravity', function(){

  var tela = WSS.el('[data-wss="gravity"]');
  if(!tela || !tela.getContext) return;

  var ctx = tela.getContext('2d');
  if(!ctx) return;   /* navegador sem canvas: a página segue normal, só sem a malha */
  var menosMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var COLUNAS = 34, LINHAS = 22;
  var L, A, t = 0;
  var mouse = { x:-9999, y:-9999 };

  function medir(){
    var dpr = Math.min(devicePixelRatio || 1, 2);
    L = tela.clientWidth; A = tela.clientHeight;
    tela.width = L * dpr; tela.height = A * dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  addEventListener('resize', medir);
  addEventListener('mousemove', function(e){
    var r = tela.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  }, {passive:true});
  addEventListener('mouseleave', function(){ mouse.x = mouse.y = -9999; });

  /* desloca um ponto na direção dos poços gravitacionais */
  function curvar(x,y){
    var telaLarga = innerWidth > 900;
    var pocos = [
      { x:L * (telaLarga ? .72 : .5), y:A * (telaLarga ? .46 : .32), massa:26000 },
      { x:mouse.x, y:mouse.y, massa:9000 }
    ];
    var dx = 0, dy = 0;
    for(var i = 0; i < pocos.length; i++){
      var p = pocos[i], ax = x - p.x, ay = y - p.y;
      var f = p.massa / (ax*ax + ay*ay + 12000);
      dx -= ax * f; dy -= ay * f;
    }
    return [x + dx, y + dy];
  }

  function desenhar(){
    ctx.clearRect(0,0,L,A);

    var folgaX = L * .1, folgaY = A * .1;
    var passoX = (L + folgaX*2) / COLUNAS, passoY = (A + folgaY*2) / LINHAS;

    var g = ctx.createLinearGradient(0,0,L,A);
    g.addColorStop(0,   'rgba(31,101,191,.30)');   /* --blue  */
    g.addColorStop(.5,  'rgba(87,207,212,.24)');   /* --cyan  */
    g.addColorStop(1,   'rgba(166,236,114,.16)');  /* --lime  */
    ctx.strokeStyle = g; ctx.lineWidth = 1;

    var respiro = menosMovimento ? 0 : Math.sin(t/90) * 6;
    var c, r, p;

    for(r = 0; r <= LINHAS; r++){
      ctx.beginPath();
      for(c = 0; c <= COLUNAS; c++){
        p = curvar(-folgaX + c*passoX, -folgaY + r*passoY + respiro);
        c ? ctx.lineTo(p[0],p[1]) : ctx.moveTo(p[0],p[1]);
      }
      ctx.stroke();
    }
    for(c = 0; c <= COLUNAS; c++){
      ctx.beginPath();
      for(r = 0; r <= LINHAS; r++){
        p = curvar(-folgaX + c*passoX, -folgaY + r*passoY + respiro);
        r ? ctx.lineTo(p[0],p[1]) : ctx.moveTo(p[0],p[1]);
      }
      ctx.stroke();
    }

    t++;
    if(!menosMovimento) requestAnimationFrame(desenhar);
  }

  medir();
  desenhar();
});
