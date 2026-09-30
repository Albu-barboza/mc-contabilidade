import React from 'react';
import JsonLd from '../components/common/JsonLd';
import Seo from '../components/common/Seo';
import CabecalhoPagina from '../components/paginas/CabecalhoPagina';
import Convite from '../components/paginas/Convite';

const GRUPOS = [
  {
    nome: 'Geral',
    perguntas: [
      {
        q: 'Quais serviços a MC Contabilidade oferece?',
        a: 'Abertura de empresa, contabilidade para MEI e para pequenas e médias empresas, consultoria tributária, planejamento financeiro e folha de pagamento.',
      },
      {
        q: 'Qual é o diferencial de vocês?',
        a: 'O atendimento próximo e consultivo. Mais do que calcular impostos, ajudamos a tomar as decisões que fazem a empresa crescer.',
      },
    ],
  },
  {
    nome: 'Abertura de empresa',
    perguntas: [
      {
        q: 'Quanto tempo leva para abrir minha empresa?',
        a: 'Depende da cidade, do tipo de empresa e de a documentação estar completa. Na primeira conversa estimamos o prazo para o seu caso.',
      },
      {
        q: 'Posso abrir uma empresa com o nome sujo?',
        a: 'Sim. Restrições no CPF não impedem a abertura de um CNPJ, mas podem dificultar o crédito para a empresa no futuro.',
      },
    ],
  },
  {
    nome: 'MEI',
    perguntas: [
      {
        q: 'MEI precisa de contador?',
        a: 'Não é obrigatório por lei, mas é recomendado: garante que obrigações como a declaração anual (DASN-SIMEI) sejam cumpridas do jeito certo e ajuda na mudança para microempresa quando chegar a hora.',
      },
      {
        q: 'O que está incluído no serviço para MEI?',
        a: 'A emissão mensal da guia DAS, a elaboração e entrega da declaração anual, o apoio na emissão de notas fiscais e a orientação sobre o limite de faturamento.',
      },
    ],
  },
  {
    nome: 'Impostos',
    perguntas: [
      {
        q: 'Como saber se minha empresa está no regime tributário certo?',
        a: 'Com um planejamento tributário: analisamos faturamento, despesas e atividade para ver se o Simples Nacional, o Lucro Presumido ou o Lucro Real é o mais vantajoso para você.',
      },
      {
        q: 'É possível recuperar impostos pagos a mais?',
        a: 'Sim. Analisamos os pagamentos dos últimos cinco anos em busca de valores indevidos ou pagos a maior e cuidamos do pedido de restituição ou compensação.',
      },
    ],
  },
];

const FaqPage: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GRUPOS.flatMap((g) => g.perguntas).map((p) => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  };

  return (
    <>
      <Seo title="Dúvidas frequentes" description="Respostas sobre abertura de empresa, MEI, impostos e os serviços da MC Contabilidade." />
      <JsonLd schema={schema} />
      <CabecalhoPagina titulo="Dúvidas frequentes" lead="As perguntas que mais ouvimos sobre abertura de empresa, MEI e impostos." />

      <section className="bg-noite pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl px-[var(--gutter)]">
          {GRUPOS.map((g) => (
            <div key={g.nome} className="mt-16 first:mt-0">
              <h2 className="font-display text-3xl font-medium text-marfim md:text-4xl">{g.nome}</h2>
              <div className="mt-6 border-t border-[color:var(--linha)]">
                {g.perguntas.map((p) => (
                  <details key={p.q} className="group border-b border-[color:var(--linha)]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-6 text-left text-lg font-semibold text-marfim transition-colors duration-200 hover:text-latao-claro [&::-webkit-details-marker]:hidden">
                      {p.q}
                      <svg className="h-5 w-5 shrink-0 text-latao transition-transform duration-200 group-open:rotate-45" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </summary>
                    <p className="max-w-[65ch] pb-7 pr-10 leading-relaxed text-texto">{p.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Convite titulo="Ficou alguma dúvida?" texto="Pergunte direto para a equipe. A resposta chega em até 24h." />
    </>
  );
};

export default FaqPage;
