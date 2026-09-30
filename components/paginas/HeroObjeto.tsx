import React from 'react';
import Mostruario from './Mostruario';

interface Props {
  titulo: string;
  lead: string;
  objeto: React.ComponentProps<typeof Mostruario>['objeto'];
  palavra?: string;
  children?: React.ReactNode; // botões
}

// No celular a altura do palco acompanha o formato da peça: a chave e as pastas são largas e baixas,
// o celular é alto. Assim o título não fica empurrado para baixo por um espaço vazio.
const ALTURA_MOVEL: Record<Props['objeto'], string> = {
  chave: 'h-[min(34vh,280px)]',
  pastas: 'h-[min(34vh,280px)]',
  mecanismo: 'h-[min(40vh,330px)]',
  grafico: 'h-[min(42vh,350px)]',
  monograma: 'h-[min(42vh,350px)]',
  pasta: 'h-[min(46vh,400px)]',
  celular: 'h-[min(50vh,430px)]',
};

// Topo das páginas com objeto: o texto à esquerda e a peça de latão à direita, sobre o mesmo
// fundo da vitrine da página inicial. No celular a peça vem primeiro e o texto logo abaixo.
const HeroObjeto: React.FC<Props> = ({ titulo, lead, objeto, palavra, children }) => (
  <section className="relative overflow-hidden bg-[radial-gradient(110%_85%_at_70%_40%,#17243D_0%,#0E182B_45%,#0A1120_80%)] pt-[calc(72px+env(safe-area-inset-top,0px))]">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-10%] top-[8%] aspect-square w-[min(110vw,900px)] bg-[radial-gradient(closest-side,rgba(201,164,94,0.22),rgba(10,17,32,0)_70%)]"
    />
    {palavra && (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[-2%] top-[18%] select-none whitespace-nowrap font-display text-[clamp(6rem,24vw,20rem)] font-light leading-none tracking-[-0.02em] text-marfim/[0.06] lg:top-[24%]"
      >
        {palavra}
      </span>
    )}
    <div className="relative mx-auto grid max-w-7xl items-center gap-4 px-[var(--gutter)] pb-16 lg:min-h-[min(88vh,820px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:pb-20">
      {/* key: um canvas novo por objeto. Um canvas cujo contexto 3D já foi liberado não serve para o próximo. */}
      <Mostruario key={objeto} objeto={objeto} className={`order-first ${ALTURA_MOVEL[objeto]} lg:order-last lg:h-[min(72vh,680px)]`} />
      {/* first:pt-10: sem 3D (aparelho sem WebGL) o texto vira o primeiro item e ganha respiro abaixo do menu */}
      <div className="max-w-xl first:pt-10 lg:first:pt-0">
        <h1 className="font-display text-[clamp(2.9rem,6.2vw,5.4rem)] font-medium leading-[1] tracking-[-0.015em] text-marfim">{titulo}</h1>
        <span aria-hidden="true" className="mt-7 block h-px w-14 bg-latao" />
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-texto">{lead}</p>
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  </section>
);

export default HeroObjeto;
