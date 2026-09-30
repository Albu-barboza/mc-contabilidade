import React from 'react';

// O monograma MC (o M com o "visto" e o C entrelaçado), desenhado com o mesmo traço do logotipo.
// Herda a cor do texto (currentColor).
const Monograma: React.FC<{ className?: string; titulo?: string }> = ({ className, titulo }) => (
  <svg
    viewBox="300 318 480 436"
    className={className}
    role={titulo ? 'img' : undefined}
    aria-hidden={titulo ? undefined : true}
    fill="none"
    stroke="currentColor"
    strokeWidth={39}
    strokeLinejoin="miter"
    strokeMiterlimit={8}
  >
    {titulo && <title>{titulo}</title>}
    <polyline points="325,711 325,407 412.5,474" />
    <polyline points="463,515 540,572 755,407 755,711" />
    <path d="M659.03,424.31 A127.5,127.5 0 0 0 412.5,470 L412.5,600 A127.5,127.5 0 0 0 656.48,651.86" />
  </svg>
);

export default Monograma;
