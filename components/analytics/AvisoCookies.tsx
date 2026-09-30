import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MEDICAO_ATIVA, gravarEscolha, lerEscolha } from './consentimento';

// Aviso de cookies. Só aparece se a medição (Google Analytics) estiver configurada e o visitante
// ainda não tiver respondido. Recusar é tão fácil quanto aceitar: os dois botões têm o mesmo peso.
const AvisoCookies: React.FC = () => {
  const [aberto, setAberto] = useState(() => MEDICAO_ATIVA && lerEscolha() === null);
  if (!aberto) return null;

  const escolher = (v: 'sim' | 'nao') => {
    gravarEscolha(v);
    setAberto(false);
  };
  const botao =
    'pressionar flex-1 rounded-full border border-marfim/40 px-6 py-3 text-sm font-bold text-marfim transition-colors duration-200 hover:border-marfim hover:bg-white/5 sm:flex-none';

  return (
    <section
      aria-labelledby="aviso-cookies-texto"
      className="aviso-cookies fixed inset-x-3 bottom-3 z-[45] mx-auto max-w-2xl rounded-2xl border border-[color:var(--linha)] bg-marinho/95 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md sm:bottom-6 sm:flex sm:items-center sm:gap-6 sm:p-6"
    >
      <p id="aviso-cookies-texto" className="text-sm leading-relaxed text-texto">
        Podemos medir, de forma agregada, como o site é usado? Para isso, o Google Analytics grava cookies no seu navegador. Detalhes na{' '}
        <Link to="/politica-de-privacidade" className="text-marfim underline decoration-latao/60 underline-offset-4 hover:decoration-latao">
          política de privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
        <button type="button" onClick={() => escolher('nao')} className={botao}>
          Recusar
        </button>
        <button type="button" onClick={() => escolher('sim')} className={botao}>
          Aceitar
        </button>
      </div>
    </section>
  );
};

export default AvisoCookies;
