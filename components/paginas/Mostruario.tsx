import React, { useEffect, useRef, useState } from 'react';

type Objeto = 'monograma' | 'chave' | 'celular' | 'pastas' | 'mecanismo' | 'grafico' | 'pasta';

// Um objeto 3D em latão, sozinho no seu canvas. Sem WebGL (aparelho antigo), o espaço some sem deixar buraco.
const Mostruario: React.FC<{ objeto: Objeto; className?: string }> = ({ objeto, className = '' }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [estado, setEstado] = useState<'carregando' | 'pronto' | 'sem3d'>('carregando');

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const temWebGL = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
      } catch {
        return false;
      }
    })();
    if (!temWebGL) {
      console.warn('Mostruário 3D desligado: sem WebGL');
      setEstado('sem3d');
      return;
    }
    // ?direto no endereço (como na página inicial) mostra o objeto já pronto, sem a chegada animada
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]direto\b/.test(window.location.search);
    const movel = window.matchMedia('(max-width: 820px), (pointer: coarse)').matches;
    let destruido = false;
    let vitrine: { destruir: () => void } | null = null;
    const perdido = (e: Event) => {
      e.preventDefault();
      console.warn('Mostruário 3D desligado: contexto perdido');
      setEstado('sem3d');
    };
    canvas.addEventListener('webglcontextlost', perdido);
    import('../../cinema/vitrine.js')
      .then(({ iniciarVitrine }) => iniciarVitrine({ canvas, objeto, movel, reduzido, aoPronto: () => !destruido && setEstado('pronto'), cancelado: () => destruido }))
      .then((v) => {
        if (destruido) v.destruir();
        else vitrine = v;
      })
      .catch((erro) => {
        console.warn('Mostruário 3D desligado:', erro);
        if (!destruido) setEstado('sem3d');
      });
    return () => {
      destruido = true;
      canvas.removeEventListener('webglcontextlost', perdido);
      vitrine?.destruir();
    };
  }, [objeto]);

  if (estado === 'sem3d') return null;
  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={ref}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${estado === 'pronto' ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default Mostruario;
