import React, { useId } from 'react';

// Abertura da janela de contato: duas portas azul-marinho cobrem o formulário, com o monograma dourado
// dividido entre elas (a perna do M com o C numa porta, o "visto" com a outra perna na outra). O M surge,
// as portas deslizam para os lados levando cada metade e o formulário aparece entre elas.
// Só transform e opacity (index.css): a placa de vídeo faz o movimento sozinha, sem engasgar no celular,
// e começa no mesmo instante do clique, sem esperar biblioteca.
const AberturaM: React.FC = () => {
  const ouro = `abertura-ouro-${useId().replace(/:/g, '')}`;
  const traco = {
    viewBox: '300 318 480 436',
    fill: 'none',
    stroke: `url(#${ouro})`,
    strokeWidth: 39,
    strokeLinejoin: 'miter' as const,
    strokeMiterlimit: 8,
    className: 'abertura-parte aspect-[480/436] h-20 sm:h-24',
  };
  return (
    <div aria-hidden="true" className="modal-abertura pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-t-3xl sm:rounded-3xl">
      {/* cada porta tem meia largura + 1px: fechadas, elas se sobrepõem no meio e não deixam fresta */}
      <div className="porta porta-esq absolute inset-y-0 left-0 w-[calc(50%+1px)]" />
      <div className="porta porta-dir absolute inset-y-0 right-0 w-[calc(50%+1px)]" />
      <div className="abertura-brilho absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,164,94,0.28),rgba(201,164,94,0))]" />
      {/* cada metade ocupa a janela inteira e anda meia largura: o mesmo tanto que a sua porta */}
      <div className="metade metade-esq absolute inset-0 flex items-center justify-center">
        <svg {...traco}>
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
      </div>
      <div className="metade metade-dir absolute inset-0 flex items-center justify-center">
        <svg {...traco}>
          <polyline points="463,515 540,572 755,407 755,711" />
        </svg>
      </div>
    </div>
  );
};

export default AberturaM;
