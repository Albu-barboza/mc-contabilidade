import React from 'react';
import JsonLd from '../components/common/JsonLd';
import Seo from '../components/common/Seo';
import HeroObjeto from '../components/paginas/HeroObjeto';
import Convite from '../components/paginas/Convite';
import { useContactForm } from '../context/ContactFormContext';

// Três jeitos de trabalhar; não é uma sequência, por isso não há números.
const PRINCIPIOS = [
  { titulo: 'Método', texto: 'Rotina organizada e prazos cuidados antes do vencimento. Nada fica para a última hora.' },
  { titulo: 'Proximidade', texto: 'Uma pessoa de verdade do outro lado, que conhece a sua empresa e retorna em até 24h.' },
  { titulo: 'Clareza', texto: 'Sem contabilês. Explicamos os números para que eles ajudem você a decidir.' },
];

const AboutPage: React.FC = () => {
  const { openForm } = useContactForm();
  return (
    <>
      <Seo title="Sobre a MC Contabilidade" description="A MC Contabilidade é uma contabilidade consultiva, com atendimento 100% online, método e linguagem clara." />
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Sobre a MC Contabilidade',
          mainEntity: { '@type': 'AccountingService', name: 'MC Contabilidade', areaServed: 'BR' },
        }}
      />

      <HeroObjeto
        titulo="Sobre a MC"
        lead="Uma contabilidade consultiva, com atendimento 100% online e linguagem clara. Falamos pouco e cuidamos muito."
        objeto="monograma"
      >
        <button type="button" onClick={openForm} className="pressionar rounded-full bg-latao px-7 py-4 text-sm font-bold text-noite hover:bg-latao-claro">
          Agendar uma conversa
        </button>
      </HeroObjeto>

      <section className="bg-noite py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-[var(--gutter)]">
          <h2 className="max-w-2xl font-display text-5xl font-medium leading-[1.02] text-marfim md:text-7xl">Como trabalhamos</h2>
          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
            {PRINCIPIOS.map((p) => (
              <div key={p.titulo} className="border-t border-latao/40 pt-7">
                <h3 className="font-display text-3xl font-medium text-marfim">{p.titulo}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-texto">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-marinho py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-10 px-[var(--gutter)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
          <h2 className="font-display text-5xl font-medium leading-[1.02] text-marfim md:text-6xl">Onde atendemos</h2>
          <p className="max-w-md text-lg leading-relaxed text-texto">
            Em qualquer lugar. O atendimento é 100% online: conversas por vídeo, documentos digitais e acompanhamento por mensagem.
          </p>
        </div>
      </section>

      <Convite />
    </>
  );
};

export default AboutPage;
