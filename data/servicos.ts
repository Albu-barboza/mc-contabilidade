// Os cinco serviços da MC Contabilidade: um lugar só para o texto de cada página,
// o resumo da página inicial e a lista de serviços. Nada de preço, prazo ou número
// sem comprovação; o valor aparece na clareza do que é feito.

export type Objeto = 'monograma' | 'chave' | 'celular' | 'pastas' | 'mecanismo' | 'grafico' | 'pasta';

export interface Item {
  destaque?: string;
  texto: string;
}

export interface Secao {
  titulo: string;
  texto?: string[];
  itens?: Item[];
  numerada?: boolean; // só quando a ordem é um passo a passo de verdade
}

export interface Servico {
  slug: string;
  rota: string;
  nome: string;
  objeto: Objeto;
  palavra: string; // a palavra grande atrás do objeto
  titulo: string;
  lead: string;
  resumo: string;
  incluido: string[];
  secoes: Secao[];
  seo: { title: string; description: string };
  tipoSchema: string;
}

export const SERVICOS: Servico[] = [
  {
    slug: 'abertura-empresa',
    rota: '/servicos/abertura-empresa',
    nome: 'Abertura de empresa',
    objeto: 'chave',
    palavra: 'Abertura',
    titulo: 'Abertura de empresa',
    lead: 'Do primeiro esboço ao CNPJ ativo. Cuidamos da orientação e dos documentos para você focar no que importa.',
    resumo: 'Enquadramento, documentos e registro do CNPJ, com acompanhamento em cada etapa.',
    incluido: ['Indicação do tipo de empresa e do regime tributário', 'Checklist de documentos', 'Acompanhamento online até o CNPJ ativo'],
    secoes: [
      {
        titulo: 'Como funciona',
        numerada: true,
        itens: [
          { destaque: 'Conversa inicial.', texto: 'Entendemos o negócio, os sócios e a previsão de faturamento. Com isso, indicamos o tipo de empresa e o regime tributário.' },
          { destaque: 'Documentação.', texto: 'Orientamos sobre os documentos necessários e preparamos os materiais de abertura.' },
          { destaque: 'Protocolo.', texto: 'Enviamos os pedidos de registro aos órgãos competentes e acompanhamos cada retorno.' },
          { destaque: 'Entrega e próximos passos.', texto: 'Com o CNPJ ativo, entregamos a documentação e orientamos sobre notas fiscais e certificado digital.' },
        ],
      },
      {
        titulo: 'O que está incluído',
        itens: [
          { destaque: 'Enquadramento orientado:', texto: 'regime tributário escolhido de acordo com o seu negócio.' },
          { destaque: 'Acompanhamento online:', texto: 'você sabe em que etapa o processo está.' },
          { destaque: 'Contrato social claro:', texto: 'estruturado para proteger os sócios.' },
          { destaque: 'Menos burocracia:', texto: 'nós cuidamos dos formulários e das idas e vindas.' },
        ],
      },
    ],
    seo: {
      title: 'Abertura de empresa',
      description: 'Abertura de empresa com orientação de enquadramento, checklist de documentos e acompanhamento online até o CNPJ ativo.',
    },
    tipoSchema: 'Abertura de empresa',
  },
  {
    slug: 'mei',
    rota: '/servicos/mei',
    nome: 'MEI',
    objeto: 'celular',
    palavra: 'MEI',
    titulo: 'Contabilidade para MEI',
    lead: 'Foque no seu trabalho. A gente cuida das guias, da declaração anual e avisa antes de cada prazo.',
    resumo: 'Guias, declaração anual e orientação para crescer no tempo certo.',
    incluido: ['Guia DAS todo mês', 'Declaração anual (DASN-SIMEI)', 'Controle do limite de faturamento'],
    secoes: [
      {
        titulo: 'O que é',
        texto: [
          'É o serviço que cuida das obrigações fiscais do microempreendedor individual. O regime do MEI é simples, mas tem responsabilidades mensais e anuais que, se esquecidas, geram multa e podem levar ao cancelamento do CNPJ.',
        ],
      },
      {
        titulo: 'Para quem é',
        itens: [
          { texto: 'Para quem quer a certeza de estar em dia com a Receita.' },
          { texto: 'Para quem precisa de orientação sobre o limite de faturamento e o momento certo de virar microempresa (ME).' },
          { texto: 'Para quem emite nota fiscal de serviço ou de venda e quer fazer isso do jeito certo.' },
          { texto: 'Para quem quer garantir os benefícios da previdência, como aposentadoria e auxílio-doença.' },
        ],
      },
      {
        titulo: 'O que está incluído',
        itens: [
          { texto: 'Emissão mensal da guia de imposto (DAS-MEI).' },
          { texto: 'Elaboração e entrega da declaração anual de faturamento (DASN-SIMEI).' },
          { texto: 'Controle do faturamento para não passar do limite.' },
          { texto: 'Orientação para emitir notas fiscais.' },
          { texto: 'Apoio no desenquadramento e na mudança para microempresa.' },
          { texto: 'Atendimento por WhatsApp e e-mail.' },
        ],
      },
      {
        titulo: 'Por que ter um contador',
        itens: [
          { destaque: 'Tranquilidade:', texto: 'a declaração anual deixa de ser uma preocupação.' },
          { destaque: 'Segurança:', texto: 'menos risco de erros que viram multa.' },
          { destaque: 'Planejamento:', texto: 'orientação profissional para crescer e virar ME na hora certa.' },
          { destaque: 'Tempo:', texto: 'você se dedica aos clientes, e a burocracia fica com a gente.' },
        ],
      },
    ],
    seo: {
      title: 'Contabilidade para MEI',
      description: 'Contabilidade para MEI: guia DAS, declaração anual, orientação de notas fiscais e apoio para quando for hora de crescer.',
    },
    tipoSchema: 'Contabilidade para MEI',
  },
  {
    slug: 'pme',
    rota: '/servicos/pme',
    nome: 'Pequenas e médias empresas',
    objeto: 'pastas',
    palavra: 'PME',
    titulo: 'Contabilidade para pequenas e médias empresas',
    lead: 'Escrituração, folha e impostos em ordem, com relatórios que ajudam a decidir.',
    resumo: 'Escrituração contábil e fiscal, folha e eSocial com rotina organizada.',
    incluido: ['Escrituração contábil e fiscal', 'Folha de pagamento e eSocial', 'Relatórios gerenciais combinados com você'],
    secoes: [
      {
        titulo: 'O que é',
        texto: [
          'É a contabilidade completa para empresas do Simples Nacional, do Lucro Presumido ou do Lucro Real. Vai além de cumprir a lei: organiza os números para que eles ajudem na gestão do negócio.',
        ],
      },
      {
        titulo: 'Para quem é',
        itens: [
          { texto: 'Para empresas que querem pagar o imposto certo, de forma legal e segura.' },
          { texto: 'Para quem quer enxergar a saúde financeira do negócio em balancetes e DRE.' },
          { texto: 'Para quem precisa estar em dia nas esferas federal, estadual e municipal.' },
          { texto: 'Para quem quer a folha de pagamento e as obrigações trabalhistas sem dor de cabeça.' },
        ],
      },
      {
        titulo: 'O que você recebe',
        itens: [
          { destaque: 'Relatórios gerenciais:', texto: 'números explicados de forma clara para apoiar as decisões.' },
          { destaque: 'Planejamento tributário:', texto: 'análise contínua para pagar o que é justo, dentro da lei.' },
          { destaque: 'Atendimento consultivo:', texto: 'um contador que conhece o seu negócio e responde às suas dúvidas.' },
          { destaque: 'Tecnologia a favor:', texto: 'ferramentas que automatizam o repetitivo e deixam as informações mais precisas.' },
        ],
      },
    ],
    seo: {
      title: 'Contabilidade para pequenas e médias empresas',
      description: 'Contabilidade consultiva para pequenas e médias empresas: escrituração contábil e fiscal, folha, eSocial e relatórios gerenciais.',
    },
    tipoSchema: 'Contabilidade para pequenas e médias empresas',
  },
  {
    slug: 'consultoria-tributaria',
    rota: '/servicos/consultoria-tributaria',
    nome: 'Consultoria tributária',
    objeto: 'mecanismo',
    palavra: 'Tributos',
    titulo: 'Consultoria tributária',
    lead: 'Pague o que é justo, dentro da lei. Analisamos o regime e as obrigações da empresa para encontrar o caminho mais eficiente.',
    resumo: 'Análise do regime e das obrigações para pagar o que é justo, dentro da lei.',
    incluido: ['Estudo do regime tributário', 'Revisão dos impostos pagos', 'Apoio em decisões com impacto fiscal'],
    secoes: [
      {
        titulo: 'Sua empresa pode estar pagando mais do que deveria',
        texto: [
          'A legislação tributária brasileira é complexa. Sem acompanhamento, é comum pagar imposto indevido ou deixar de aproveitar benefícios previstos em lei. A consultoria atua exatamente nesse ponto.',
        ],
      },
      {
        titulo: 'O que fazemos',
        itens: [
          { destaque: 'Planejamento tributário:', texto: 'diagnóstico da operação para definir o regime mais vantajoso entre Simples Nacional, Lucro Presumido e Lucro Real.' },
          { destaque: 'Revisão fiscal:', texto: 'análise dos impostos pagos nos últimos cinco anos em busca de créditos não aproveitados ou pagamentos a maior que podem ser recuperados.' },
          { destaque: 'Conformidade:', texto: 'obrigações fiscais em dia, para evitar multas e autuações.' },
          { destaque: 'Apoio estratégico:', texto: 'análise do impacto tributário de decisões como abrir uma filial ou lançar um produto.' },
        ],
      },
      {
        titulo: 'O que esperar',
        itens: [
          { destaque: 'Carga tributária adequada:', texto: 'o caminho mais econômico permitido pela lei.' },
          { destaque: 'Caixa mais folgado:', texto: 'quando há créditos a recuperar, eles voltam para o negócio.' },
          { destaque: 'Segurança:', texto: 'a empresa protegida de riscos fiscais.' },
          { destaque: 'Decisões melhores:', texto: 'o imposto entra na conta antes da decisão, e não depois.' },
        ],
      },
    ],
    seo: {
      title: 'Consultoria tributária',
      description: 'Consultoria e planejamento tributário para pagar o que é justo, recuperar créditos e manter a empresa em dia com o Fisco.',
    },
    tipoSchema: 'Consultoria tributária',
  },
  {
    slug: 'planejamento-financeiro',
    rota: '/servicos/planejamento-financeiro',
    nome: 'Planejamento financeiro',
    objeto: 'grafico',
    palavra: 'Finanças',
    titulo: 'Planejamento financeiro',
    lead: 'Clareza sobre os números para decidir com base em dados, e não em suposições.',
    resumo: 'Fluxo de caixa, DRE, projeções e indicadores para decidir com clareza.',
    incluido: ['Fluxo de caixa e conciliação', 'DRE gerencial', 'Projeções e indicadores do negócio'],
    secoes: [
      {
        titulo: 'Você sabe para onde vai o dinheiro da empresa?',
        texto: [
          'Muita gente se perde entre planilhas e extratos. O planejamento financeiro, também chamado de BPO financeiro, organiza, analisa e projeta as finanças do negócio, e devolve controle e visão para quem decide.',
        ],
      },
      {
        titulo: 'Como funciona',
        itens: [
          { destaque: 'Contas a pagar e a receber:', texto: 'compromissos e recebimentos organizados, sem nada esquecido.' },
          { destaque: 'Conciliação bancária:', texto: 'o que entrou e saiu do banco confere com os registros.' },
          { destaque: 'Fluxo de caixa:', texto: 'a movimentação do dinheiro, com gargalos e oportunidades à vista.' },
          { destaque: 'DRE gerencial:', texto: 'um relatório claro que mostra se há lucro ou prejuízo, e onde melhorar.' },
          { destaque: 'Indicadores:', texto: 'margem, ponto de equilíbrio e ticket médio definidos junto com você.' },
        ],
      },
      {
        titulo: 'O que muda para você',
        itens: [
          { destaque: 'Visão do negócio:', texto: 'lucratividade, despesas principais e saúde do caixa à vista.' },
          { destaque: 'Mais tempo:', texto: 'a parte operacional fica com a gente, e você foca no crescimento.' },
          { destaque: 'Decisões com base:', texto: 'os próximos passos apoiados em relatórios e projeções.' },
          { destaque: 'Previsibilidade:', texto: 'projeções de faturamento e despesas para evitar surpresas.' },
        ],
      },
    ],
    seo: {
      title: 'Planejamento financeiro',
      description: 'Planejamento e BPO financeiro: fluxo de caixa, conciliação, DRE gerencial, projeções e indicadores para decidir com clareza.',
    },
    tipoSchema: 'Planejamento financeiro empresarial',
  },
];

export const servicoPorSlug = (slug: string) => SERVICOS.find((s) => s.slug === slug);
