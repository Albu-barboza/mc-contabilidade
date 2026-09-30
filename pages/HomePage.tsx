import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import JsonLd from '../components/common/JsonLd';
import Seo from '../components/common/Seo';
import CinemaHero from '../components/home/CinemaHero';
import Manifesto from '../components/paginas/Manifesto';
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

      <Manifesto />
      <Passos />
      <Convite />
    </>
  );
};

export default HomePage;
