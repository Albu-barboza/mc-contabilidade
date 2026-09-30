import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import JsonLd from '../components/common/JsonLd';
import Seo from '../components/common/Seo';
import CinemaHero from '../components/home/CinemaHero';
import Monograma from '../components/common/Monograma';
import Passos from '../components/paginas/Passos';
import Convite from '../components/paginas/Convite';
import { SERVICOS } from '../data/servicos';

const HomePage: React.FC = () => {
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'MC Contabilidade',
      description: 'Contabilidade consultiva: abertura de empresa, MEI, pequenas e médias empresas, consultoria tributária e planejamento financeiro.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços contábeis',
        itemListElement: SERVICOS.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.nome } })),
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

      {/* SERVIÇOS: a mesma ordem dos objetos da vitrine */}
      <section id="servicos" className="bg-noite py-24 md:py-36">
        <div className="mx-auto max-w-6xl px-[var(--gutter)]">
          <h2 className="max-w-2xl font-display text-5xl font-medium leading-[1.02] text-marfim md:text-7xl">O que cuidamos para você</h2>
          <ul className="mt-14 border-t border-[color:var(--linha)] md:mt-20">
            {SERVICOS.map((s) => (
              <li key={s.slug} className="border-b border-[color:var(--linha)]">
                <Link to={s.rota} className="group grid gap-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-10 md:py-10">
                  <span className="font-display text-3xl font-medium text-marfim decoration-latao/60 decoration-1 underline-offset-[6px] transition-colors duration-300 group-hover:text-latao-claro group-hover:underline md:text-[2.4rem]">
                    {s.nome}
                  </span>
                  <span className="max-w-md text-base leading-relaxed text-texto">{s.resumo}</span>
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

      <Passos />
      <Convite />
    </>
  );
};

export default HomePage;
