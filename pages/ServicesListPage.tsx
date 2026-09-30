import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import CabecalhoPagina from '../components/paginas/CabecalhoPagina';
import Convite from '../components/paginas/Convite';
import { SERVICOS } from '../data/servicos';

const ServicesListPage: React.FC = () => (
  <>
    <Seo
      title="Serviços"
      description="Os serviços da MC Contabilidade: abertura de empresa, MEI, pequenas e médias empresas, consultoria tributária e planejamento financeiro."
    />
    <CabecalhoPagina titulo="Serviços" lead="Cinco frentes para cada fase da empresa, da abertura ao planejamento financeiro." />

    <section className="bg-noite pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-[var(--gutter)]">
        <ul className="border-t border-[color:var(--linha)]">
          {SERVICOS.map((s) => (
            <li key={s.slug} className="border-b border-[color:var(--linha)]">
              <Link to={s.rota} className="group grid gap-6 py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12 md:py-14">
                <div>
                  <h2 className="font-display text-4xl font-medium leading-[1.05] text-marfim decoration-latao/60 decoration-1 underline-offset-[8px] transition-colors duration-300 group-hover:text-latao-claro group-hover:underline md:text-5xl">
                    {s.nome}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-texto">{s.resumo}</p>
                </div>
                <div className="md:pt-3">
                  <ul className="space-y-3 text-sm leading-relaxed text-texto">
                    {s.incluido.map((i) => (
                      <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3.5 before:bg-latao">
                        {i}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 inline-block text-sm font-semibold text-latao-claro underline-offset-4 group-hover:underline">Conhecer o serviço</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <Convite />
  </>
);

export default ServicesListPage;
