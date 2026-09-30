import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import JsonLd from '../components/common/JsonLd';
import HeroObjeto from '../components/paginas/HeroObjeto';
import Passos from '../components/paginas/Passos';
import Convite from '../components/paginas/Convite';
import { useContactForm } from '../context/ContactFormContext';
import { SERVICOS, servicoPorSlug, type Item } from '../data/servicos';

const itemTexto = (it: Item) => (
  <>
    {it.destaque && <strong>{it.destaque}</strong>} {it.texto}
  </>
);

// Página de um serviço. O conteúdo vem de data/servicos.ts; o objeto 3D é o mesmo da vitrine da página inicial.
const ServicoPage: React.FC<{ slug: string }> = ({ slug }) => {
  const servico = servicoPorSlug(slug) ?? SERVICOS[0];
  const { openForm } = useContactForm();
  const outros = SERVICOS.filter((o) => o.slug !== servico.slug);
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: servico.tipoSchema,
      provider: { '@type': 'AccountingService', name: 'MC Contabilidade' },
      description: servico.seo.description,
      areaServed: { '@type': 'Country', name: 'BR' },
    }),
    [servico]
  );
  const verDetalhes = () => document.getElementById('detalhes')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Seo title={servico.seo.title} description={servico.seo.description} />
      <JsonLd schema={schema} />

      <HeroObjeto titulo={servico.titulo} lead={servico.lead} objeto={servico.objeto} palavra={servico.palavra}>
        <button type="button" onClick={openForm} className="pressionar rounded-full bg-latao px-7 py-4 text-sm font-bold text-noite hover:bg-latao-claro">
          Agendar uma conversa
        </button>
        <button type="button" onClick={verDetalhes} className="pressionar rounded-full border border-marfim/40 px-7 py-4 text-sm font-bold text-marfim hover:border-marfim">
          Ver como funciona
        </button>
      </HeroObjeto>

      <section id="detalhes" className="bg-noite py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-[var(--gutter)] lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-20">
          <div className="texto-corrido min-w-0">
            {servico.secoes.map((secao) => (
              <React.Fragment key={secao.titulo}>
                <h2>{secao.titulo}</h2>
                {secao.texto?.map((t) => (
                  <p key={t}>{t}</p>
                ))}
                {secao.itens &&
                  (secao.numerada ? (
                    <ol>
                      {secao.itens.map((it) => (
                        <li key={it.texto}>{itemTexto(it)}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul>
                      {secao.itens.map((it) => (
                        <li key={it.texto}>{itemTexto(it)}</li>
                      ))}
                    </ul>
                  ))}
              </React.Fragment>
            ))}
          </div>

          <aside className="self-start border-t border-latao/50 pt-6 lg:sticky lg:top-28" aria-label="Resumo do serviço">
            <p className="font-display text-2xl font-medium text-marfim">Em resumo</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-texto">
              {servico.incluido.map((i) => (
                <li key={i} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-latao">
                  {i}
                </li>
              ))}
            </ul>
            <button type="button" onClick={openForm} className="pressionar mt-8 w-full rounded-full bg-latao px-6 py-3.5 text-sm font-bold text-noite hover:bg-latao-claro">
              Agendar uma conversa
            </button>
          </aside>
        </div>
      </section>

      <Passos className="border-t border-[color:var(--linha)]" />

      <section className="border-t border-[color:var(--linha)] bg-noite py-20 md:py-24" aria-labelledby="outros-servicos">
        <div className="mx-auto max-w-6xl px-[var(--gutter)]">
          <h2 id="outros-servicos" className="font-display text-4xl font-medium text-marfim md:text-5xl">
            Outros serviços
          </h2>
          <ul className="mt-10 grid border-t border-[color:var(--linha)] sm:grid-cols-2">
            {outros.map((o) => (
              <li key={o.slug} className="border-b border-[color:var(--linha)] sm:odd:border-r sm:odd:pr-8 sm:even:pl-8">
                <Link to={o.rota} className="group block py-6">
                  <span className="font-display text-2xl font-medium text-marfim decoration-latao/60 decoration-1 underline-offset-[6px] transition-colors duration-300 group-hover:text-latao-claro group-hover:underline">
                    {o.nome}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-texto">{o.resumo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Convite />
    </>
  );
};

export default ServicoPage;
