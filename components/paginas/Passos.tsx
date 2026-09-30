import React from 'react';

// Aqui a ordem importa: é o caminho de quem chega. Por isso os números.
export const PASSOS = [
  { titulo: 'Primeira conversa', texto: 'Você conta o momento da empresa, sem compromisso e sem contabilês.' },
  { titulo: 'Diagnóstico', texto: 'Olhamos regime, obrigações e rotina, e dizemos com clareza o que fazer.' },
  { titulo: 'Rotina em ordem', texto: 'Cuidamos do mês a mês e avisamos antes de cada prazo.' },
];

const Passos: React.FC<{ titulo?: string; className?: string }> = ({ titulo = 'Como começamos', className = '' }) => (
  <section className={`bg-noite py-24 md:py-32 ${className}`}>
    <div className="mx-auto max-w-6xl px-[var(--gutter)]">
      <h2 className="max-w-2xl font-display text-5xl font-medium leading-[1.02] text-marfim md:text-7xl">{titulo}</h2>
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
);

export default Passos;
