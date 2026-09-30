import React from 'react';

// Topo das páginas de texto (dúvidas, carreira, privacidade...): título na voz serifada, fio de latão e uma frase.
const CabecalhoPagina: React.FC<{ titulo: string; lead?: string; children?: React.ReactNode }> = ({ titulo, lead, children }) => (
  <header className="relative overflow-hidden bg-[radial-gradient(90%_120%_at_85%_0%,#16233A_0%,#0A1120_60%)] pb-14 pt-[calc(140px+env(safe-area-inset-top,0px))] md:pb-20 md:pt-[calc(170px+env(safe-area-inset-top,0px))]">
    <div className="mx-auto max-w-6xl px-[var(--gutter)]">
      <h1 className="max-w-3xl font-display text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.015em] text-marfim">{titulo}</h1>
      <span aria-hidden="true" className="mt-7 block h-px w-14 bg-latao" />
      {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-texto">{lead}</p>}
      {children}
    </div>
  </header>
);

export default CabecalhoPagina;
