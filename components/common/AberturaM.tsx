import React, { useId } from 'react';

// Abertura da janela de contato: o monograma dourado aparece no centro e se abre em duas metades
// (a perna do M com o C para um lado, o "visto" com a outra perna para o outro), como uma porta;
// o formulário nasce do meio, entre elas. Só CSS (index.css), para começar no mesmo instante do clique.
const AberturaM: React.FC = () => {
  const ouro = `abertura-ouro-${useId().replace(/:/g, '')}`;
  const traco = { fill: 'none', stroke: `url(#${ouro})`, strokeWidth: 39, strokeLinejoin: 'miter' as const, strokeMiterlimit: 8 };
  return (
    <div aria-hidden="true" className="modal-abertura pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="abertura-m relative aspect-[480/436] h-20 sm:h-24">
        <span className="absolute -inset-16 rounded-full bg-[radial-gradient(closest-side,rgba(201,164,94,0.32),rgba(201,164,94,0))]" />
        <svg viewBox="300 318 480 436" className="abertura-esq absolute inset-0 h-full w-full" {...traco}>
          <defs>
            {/* o mesmo dourado de hot-stamping da pasta preta e do selo de envio */}
            <linearGradient id={ouro} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F6E2AE" />
              <stop offset="0.45" stopColor="#D8B26A" />
              <stop offset="0.7" stopColor="#B88B45" />
              <stop offset="1" stopColor="#E9CD8E" />
            </linearGradient>
          </defs>
          <polyline points="325,711 325,407 412.5,474" />
          <path d="M659.03,424.31 A127.5,127.5 0 0 0 412.5,470 L412.5,600 A127.5,127.5 0 0 0 656.48,651.86" />
        </svg>
        <svg viewBox="300 318 480 436" className="abertura-dir absolute inset-0 h-full w-full" {...traco}>
          <polyline points="463,515 540,572 755,407 755,711" />
        </svg>
      </div>
    </div>
  );
};

export default AberturaM;
