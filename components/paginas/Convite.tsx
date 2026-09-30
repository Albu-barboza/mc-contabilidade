import React from 'react';
import { useContactForm } from '../../context/ContactFormContext';
import { env, getWhatsappLink } from '../../config/env';

// O convite do fim de cada página: uma pergunta, uma frase e o caminho para conversar.
const Convite: React.FC<{ titulo?: string; texto?: string }> = ({
  titulo = 'Vamos conversar?',
  texto = 'Conte o momento da sua empresa. A equipe retorna em até 24h.',
}) => {
  const { openForm } = useContactForm();
  const temWhatsapp = Boolean(env.whatsappNumber);
  const email = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;
  return (
    <section id="contato" className="border-t border-[color:var(--linha)] bg-noite py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-[var(--gutter)] text-center">
        <h2 className="font-display text-5xl font-medium text-marfim md:text-7xl">{titulo}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-texto">{texto}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={openForm}
            className="pressionar inline-flex items-center gap-2 rounded-full bg-latao px-7 py-4 text-sm font-bold text-noite hover:bg-latao-claro"
          >
            Agendar uma conversa
          </button>
          {temWhatsapp && (
            <a
              href={getWhatsappLink('Olá! Vim pelo site da MC Contabilidade e gostaria de conversar.')}
              target="_blank"
              rel="noopener noreferrer"
              className="pressionar inline-flex items-center gap-2 rounded-full border border-marfim/40 px-7 py-4 text-sm font-bold text-marfim hover:border-marfim"
            >
              Conversar no WhatsApp
            </a>
          )}
        </div>
        {email && (
          <p className="mt-8 text-sm text-fraco">
            ou escreva para{' '}
            <a href={`mailto:${email}`} className="text-marfim hover:underline">
              {email}
            </a>
          </p>
        )}
      </div>
    </section>
  );
};

export default Convite;
