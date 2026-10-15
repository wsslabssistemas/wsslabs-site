/* ============================================================
   DADOS DO SITE  ←←← VOCÊ PODE EDITAR ESTE ARQUIVO SEM MEDO
   ------------------------------------------------------------
   Aqui ficam contato, redes, menu e rodapé. Nenhum código de
   programa nesta pasta: só informação. Mudar aqui muda em todas
   as páginas de uma vez.

   REGRA: mantenha as aspas e as vírgulas exatamente como estão.
   ============================================================ */
WSS.dados.site = {

  nome: 'WSS Labs',
  descricao: 'Laboratório de sistemas',
  cidade: 'Porto Alegre, Brasil',

  /* ---- EMPRESA (aparece no rodapé) ---- */
  razaoSocial: 'WSSLABS TECNOLOGIA LTDA',
  cnpj: '69.480.417/0001-03',

  /* ---- CONTATO ---- */
  contato: {
    email:    'contato@wsslabs.com.br',
    whatsapp: 'https://wa.me/5551994394890'   /* o número do Kairós (WSS Labs) */
  },

  /* ---- REDES SOCIAIS (aparecem no rodapé, na ordem desta lista) ---- */
  redes: [
    { nome:'@wss_labs',           url:'https://instagram.com/wss_labs' },
    { nome:'@wsscriptocontrol',   url:'https://instagram.com/wsscriptocontrol' }
  ],

  /* ---- BOTÃO PRINCIPAL DO TOPO ---- */
  ctaTopo: { texto:'Abrir o Cripto Control', url:'https://cripto.wsslabs.com.br' },

  /* ---- MENU (a ordem aqui é a ordem na tela) ---- */
  menu: [
    { texto:'Sistemas',          url:'#sistemas'  },
    { texto:'Como trabalhamos',  url:'#metodo'    },
    { texto:'Sob medida',        url:'#sobmedida' },
    { texto:'O símbolo',         url:'#simbolo'   },
    { texto:'Contato',           url:'#contato'   }
  ],

  /* ---- IMAGENS DA MARCA ---- */
  marcas: {
    simbolo: 'assets/marcas/labs-mark.png',
    cena:    'assets/marcas/labs-cena.jpeg',
    video:   'assets/video/logo-animado.mp4'
  }
};
