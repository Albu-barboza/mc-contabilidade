import React, { useId } from 'react';

// Os três traços do monograma (os mesmos de Monograma.tsx). pathLength = 1 deixa o desenho em
// traço (stroke-dashoffset) independente do tamanho real de cada traço.
const Tracos: React.FC = () => (
  <>
    <polyline points="325,711 325,407 412.5,474" pathLength={1} />
    <polyline points="463,515 540,572 755,407 755,711" pathLength={1} />
    <path d="M659.03,424.31 A127.5,127.5 0 0 0 412.5,470 L412.5,600 A127.5,127.5 0 0 0 656.48,651.86" pathLength={1} />
  </>
);

// Confirmação de envio: o MC se desenha num fio fino e se enche de ouro de baixo para cima, o mesmo
// gesto da abertura do site, em pequeno. Acontece uma vez, quando a mensagem sai (animação em index.css).
const SeloEnviado: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ouro = `selo-ouro-${useId().replace(/:/g, '')}`;
  return (
    <div aria-hidden="true" className={`relative aspect-[480/436] self-start ${className}`}>
      <svg
        viewBox="300 318 480 436"
        className="selo-fio absolute inset-0 h-full w-full text-latao-claro"
        fill="none"
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Tracos />
      </svg>
      <svg viewBox="300 318 480 436" className="selo-ouro absolute inset-0 h-full w-full" fill="none" stroke={`url(#${ouro})`} strokeWidth={39} strokeLinejoin="miter" strokeMiterlimit={8}>
        <defs>
          {/* o mesmo dourado de hot-stamping da pasta preta (cinema/texturas.js) */}
          <linearGradient id={ouro} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F6E2AE" />
            <stop offset="0.45" stopColor="#D8B26A" />
            <stop offset="0.7" stopColor="#B88B45" />
            <stop offset="1" stopColor="#E9CD8E" />
          </linearGradient>
        </defs>
        <Tracos />
      </svg>
    </div>
  );
};

export default SeloEnviado;
