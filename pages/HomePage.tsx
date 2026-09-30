import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import JsonLd from '../components/common/JsonLd';
import Seo from '../components/common/Seo';
import { useContactForm } from '../context/ContactFormContext';
import { env, getWhatsappLink } from '../config/env';
import CinemaHero from '../components/home/CinemaHero';
import Monograma from '../components/common/Monograma';

// Os cinco serviços, na mesma ordem dos objetos da vitrine.
const SERVICOS = [
  { titulo: 'Abertura de empresa', texto: 'Enquadramento, documentos e registro do CNPJ, com acompanhamento em cada etapa.', link: '/servicos/abertura-empresa' },
  { titulo: 'MEI', texto: 'Guias, declaração anual e orientação para crescer no tempo certo.', link: '/servicos/mei' },
  { titulo: 'Pequenas e médias empresas', texto: 'Escrituração contábil e fiscal, folha e eSocial com rotina organizada.', link: '/servicos/pme' },
  { titulo: 'Consultoria tributária', texto: 'Análise do regime e das obrigações para pagar o que é justo, dentro da lei.', link: '/servicos/consultoria-tributaria' },
  { titulo: 'Planejamento financeiro', texto: 'Fluxo de caixa, DRE, projeções e indicadores para decidir com clareza.', link: '/servicos/planejamento-financeiro' },
];

// Aqui a ordem importa: é o caminho de quem chega.
const PASSOS = [
  { titulo: 'Primeira conversa', texto: 'Você conta o momento da empresa, sem compromisso e sem contabilês.' },
  { titulo: 'Diagnóstico', texto: 'Olhamos regime, obrigações e rotina, e dizemos com clareza o que fazer.' },
  { titulo: 'Rotina em ordem', texto: 'Cuidamos do mês a mês e avisamos antes de cada prazo.' },
];

const HomePage: React.FC = () => {
  const { openForm } = useContactForm();
  const temWhatsapp = Boolean(env.whatsappNumber);
  const email = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'MC Contabilidade',
      description: 'Contabilidade consultiva: abertura de empresa, MEI, pequenas e médias empresas, consultoria tributária e planejamento financeiro.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços contábeis',
        itemListElement: SERVICOS.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.titulo } })),
      },
    }),
    []
  );

  return (
    <>
      <Seo
        title="MC Contabilidade · Seu negócio em boas mãos"
        description="Contabilidade consultiva para abertura de empresa, MEI, pequenas e médias empresas, consultoria tributária e planejamento financeiro."
      />
      <JsonLd schema={schema} />

      <CinemaHero />

      {/* SERVIÇOS */}
      <section id="servicos" className="bg-noite py-24 md:py-36">
        <div className="mx-auto max-w-6xl px-[var(--gutter)]">
          <h2 className="max-w-2xl font-display text-5xl font-medium leading-[1.02] text-marfim md:text-7xl">O que cuidamos para você</h2>
          <ul className="mt-14 border-t border-[color:var(--linha)] md:mt-20">
            {SERVICOS.map((s) => (
              <li key={s.titulo} className="border-b border-[color:var(--linha)]">
                <Link
                  to={s.link}
                  className="group grid gap-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-10 md:py-10"
                >
                  <span className="font-display text-3xl font-medium text-marfim decoration-latao/60 decoration-1 underline-offset-[6px] transition-colors duration-300 group-hover:text-latao-claro group-hover:underline md:text-[2.4rem]">
                    {s.titulo}
                  </span>
                  <span className="max-w-md text-base leading-relaxed text-texto">{s.texto}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-marinho py-28 md:py-40">
        <div className="mx-auto max-w-4xl px-[var(--gutter)] text-center">
          <Monograma className="mx-auto h-auto w-12 text-latao" />
          <p className="mt-10 font-display text-[2.2rem] italic leading-[1.18] text-marfim md:text-[3.4rem]">O que é bem feito não precisa de alarde.</p>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-texto md:text-lg">
            Por isso falamos pouco e cuidamos muito: prazos antes do vencimento, números conferidos e uma pessoa de verdade do outro lado.
          </p>
        </div>
      </section>

      {/* COMO TRABALHAMOS */}
      <section className="bg-noite py-24 md:py-36">
        <div className="mx-auto max-w-6xl px-[var(--gutter)]">
          <h2 className="max-w-2xl font-display text-5xl font-medium leading-[1.02] text-marfim md:text-7xl">Como começamos</h2>
          <ol className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
            {PASSOS.map((p, i) => (
              <li key={p.titulo} className="border-t border-latao/40 pt-7">
                <span className="font-display text-4xl font-medium text-latao">{i + 1}</span>
                <h3 className="mt-3 font-display text-3xl font-medium text-marfim">{p.titulo}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-texto">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="border-t border-[color:var(--linha)] bg-noite py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-[var(--gutter)] text-center">
          <h2 className="font-display text-5xl font-medium text-marfim md:text-7xl">Vamos conversar?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-texto">Conte o momento da sua empresa. A equipe retorna em até 24h.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={openForm}
              className="pressionar inline-flex items-center gap-2 rounded-full bg-latao px-7 py-4 text-sm font-bold text-noite hover:bg-latao-claro"
            >
              Agendar uma conversa
            </button>
            {temWhatsapp && (
              <a
                href={getWhatsappLink('Olá! Vim pelo site da MC Contabilidade e gostaria de conversar.')}
                target="_blank"
                rel="noopener noreferrer"
                className="pressionar inline-flex items-center gap-2 rounded-full border border-marfim/40 px-7 py-4 text-sm font-bold text-marfim hover:border-marfim"
              >
                Conversar no WhatsApp
              </a>
            )}
          </div>
          {email && (
            <p className="mt-8 text-sm text-fraco">
              ou escreva para{' '}
              <a href={`mailto:${email}`} className="text-marfim underline-offset-4 hover:underline">
                {email}
              </a>
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
