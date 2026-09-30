import React, { useRef } from 'react';
import Monograma from '../common/Monograma';
import { useAnimacao } from '../../hooks/useAnimacao';

// O manifesto da página inicial. A frase acende palavra por palavra no ritmo de quem lê (rolagem):
// o próprio jeito de mostrar diz o que ela diz, sem alarde.
const Manifesto: React.FC = () => {
  const frase = useRef<HTMLParagraphElement>(null);
  useAnimacao(frase, 'revelarFrase');
  return (
    <section className="bg-marinho py-28 md:py-40">
      <div className="mx-auto max-w-4xl px-[var(--gutter)] text-center">
        <Monograma className="mx-auto h-auto w-12 text-latao" />
        <p ref={frase} className="mt-10 font-display text-[2.2rem] italic leading-[1.18] text-marfim md:text-[3.4rem]">
          O que é bem feito não precisa de alarde.
        </p>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-texto md:text-lg">
          Por isso falamos pouco e cuidamos muito: prazos antes do vencimento, números conferidos e uma pessoa de verdade do outro lado.
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
