/* ============================================================
   CATÁLOGO DE SISTEMAS  ←←← O ARQUIVO MAIS IMPORTANTE DO SITE
   ------------------------------------------------------------
   Para colocar um sistema NOVO no site você NÃO mexe em HTML,
   CSS nem em nenhum programa. Você copia um bloco { ... } aqui,
   troca o conteúdo e salva. O site se remonta sozinho.

   status aceita 3 valores:
     'no-ar'      → publicado, cliente pode usar hoje (badge verde)
     'em-obras'   → sendo construído (badge turquesa)
     'em-estudo'  → ainda decidindo (badge cinza)

   destaque: true  → card grande, com logo ao lado
   destaque: false → card em linha, discreto
   ============================================================ */
WSS.dados.sistemas = [

  {
    slug: 'cripto-control',
    nome: 'WSS Cripto Control',
    status: 'no-ar',
    destaque: true,
    logo: 'assets/marcas/cripto-lockup.png',
    resumo: 'Controle de carteira e Imposto de Renda de criptomoeda. Conecta nas corretoras, calcula o preço médio, entende que troca de cripto por cripto já gera imposto e separa o que é regra brasileira do que é regra do exterior. No fim, entrega o relatório pronto para o contador.',
    chips: ['Binance','CoinEx','MEXC','Foxbit','Mercado Bitcoin','Lei 14.754','IN 1.888','PDF p/ contador','Instala no celular'],
    acoes: [
      { texto:'Abrir o sistema',           url:'https://cripto.wsslabs.com.br', tipo:'primary' },
      { texto:'30 dias grátis, sem cartão', url:'https://cripto.wsslabs.com.br', tipo:'ghost'   }
    ]
  },

  {
    slug: 'kairos',
    nome: 'WSS Kairós',
    status: 'no-ar',
    destaque: true,
    logo: 'assets/marcas/kairos-lockup.png',
    resumo: 'O vendedor cola a mensagem do cliente e recebe a resposta pronta — com a técnica de venda explicada, para aprender no trabalho. O sistema cruza os fatos da empresa, a técnica do ramo e o histórico daquele cliente. E quando falta um dado para responder, ele avisa em vez de inventar.',
    chips: ['Resposta pronta','15 ramos, 285 situações','Nunca inventa preço ou horário','Fila de follow-up','Sem trocar o sistema atual'],
    acoes: [
      { texto:'Abrir o Kairós', url:'https://kairos.wsslabs.com.br', tipo:'primary' },
      { texto:'Falar com a gente',  url:'#contato', tipo:'ghost' }
    ]
  },

  {
    slug: 'finance-control',
    nome: 'WSS Finance Control',
    status: 'em-obras',
    destaque: false,
    logo: 'assets/marcas/finance-lockup.png',
    resumo: 'O controle do dinheiro do dia a dia: quanto entra, quanto sai, para onde vai e o que sobra no fim do mês. Com previsão de gastos e acompanhamento de investimentos.',
    chips: ['Entradas e saídas','Previsão do mês','Investimentos'],
    acoes: [
      { texto:'Quero testar quando abrir', url:'#contato', tipo:'ghost' }
    ]
  },

  {
    slug: 'play-edu',
    nome: 'WSS Play Edu',
    status: 'em-obras',
    destaque: false,
    logo: 'assets/marcas/playedu-lockup.png',
    resumo: 'Ensinar brincando, com o professor no comando. O professor propõe temas e atividades pela disciplina que está dando, acompanha a turma e cada aluno separadamente, e vê no relatório o que a criança acertou, errou e onde trava. Dos 5 aos 17 anos, seguindo o conteúdo exigido pelo MEC.',
    chips: ['Painel do professor','Turmas e alunos','Relatório de desempenho','Base curricular do MEC','5 a 17 anos'],
    acoes: [
      { texto:'Quero saber quando abrir', url:'#contato', tipo:'ghost' }
    ]
  }


  /* ------------------------------------------------------------
     MODELO PARA O PRÓXIMO SISTEMA — copie, cole acima desta nota
     (com vírgula separando do bloco anterior) e preencha:

  ,{
    slug: 'nome-curto-sem-acento',
    nome: 'WSS Nome do Sistema',
    status: 'em-obras',
    destaque: true,
    logo: 'assets/marcas/nome-lockup.png',
    resumo: 'Uma frase dizendo qual problema ele resolve, e mais duas explicando como.',
    chips: ['Palavra-chave','Integração','Diferencial'],
    acoes: [
      { texto:'Ver o sistema', url:'https://...', tipo:'primary' }
    ]
  }

     ------------------------------------------------------------ */
];

/* ---- Convite que aparece depois da lista (o "próximo problema") ---- */
WSS.dados.convite = {
  status: 'em-estudo',
  titulo: 'O próximo sistema ainda não tem nome.',
  texto:  'Estamos escolhendo qual problema vale a pena resolver. Se o seu trabalho vive preso numa planilha, ele pode ser o próximo.',
  acao:   { texto:'Contar meu problema', url:'#contato', tipo:'ghost' }
};
