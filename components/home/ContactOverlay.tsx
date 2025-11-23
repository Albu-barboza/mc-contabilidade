import { ChangeEvent, FormEvent, ReactNode, RefObject, useEffect, useRef } from 'react';
import type { ContactField, ContactFormStatus, ContactFormValues } from '../../hooks/useContactForm';
import { contactItems as contactInfo, trustBadges as trustInfo, type ContactItemKind } from '../../data/home';

interface ContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  contactSectionRef: RefObject<HTMLElement>;
  form: {
    values: ContactFormValues;
    errors: Record<ContactField, string>;
    touched: Record<ContactField, boolean>;
    status: ContactFormStatus;
    submitError: string;
    handleInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleBlur: (field: ContactField) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  };
}

const contactIcons: Record<ContactItemKind, ReactNode> = {
  address: (
    <svg className="w-5 h-5 text-[#6B7A8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  email: (
    <svg className="w-5 h-5 text-[#6B7A8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  hours: (
    <svg className="w-5 h-5 text-[#6B7A8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

const ContactOverlay: React.FC<ContactOverlayProps> = ({ isOpen, onClose, contactSectionRef, form }) => {
  const { values, errors, touched, status, submitError, handleInputChange, handleBlur, handleSubmit } = form;
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const dialogTitleId = 'contact-modal-title';

  useEffect(() => {
    if (!isOpen) return undefined;
    const timeout = setTimeout(() => firstFieldRef.current?.focus(), 120);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <section
      id="contato"
      ref={contactSectionRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogTitleId}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className={`fixed inset-0 z-50 flex items-stretch sm:items-center justify-center px-0 sm:px-6 py-0 sm:py-6 transition-all duration-500 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto bg-slate-900/70 backdrop-blur-sm' : 'opacity-0 pointer-events-none bg-slate-900/0'
      }`}
    >
      <div
        className={`relative w-full max-w-none sm:max-w-5xl bg-gradient-to-br from-[#1F3A5F] via-[#233B63] to-[#2E4F7E] text-white rounded-t-[32px] sm:rounded-3xl border border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.65)] overflow-hidden max-h-[100vh] sm:max-h-[calc(100vh-80px)] ${
          isOpen ? 'translate-y-0' : 'translate-y-6 sm:translate-y-0'
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar formulário de contato"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/85 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1.05fr,0.95fr] gap-6 md:gap-0 h-full">
          <div className="min-w-0 flex flex-col gap-6 p-6 sm:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/85">Formulário de contato</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight" id={dialogTitleId}>
                Vamos conversar?
              </h2>
              <p className="text-sm md:text-base text-gray-100/90">
                Preencha os campos ao lado e retornamos o contato por e-mail, telefone ou WhatsApp, como for melhor para você.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-xs md:text-[13px]">
              <div className="rounded-2xl bg-white/10 border border-white/20 p-3 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-200">Resposta em até 24h úteis</span>
                <p className="font-semibold">Contato rápido e direto</p>
                <p className="text-white/80">Nossa equipe vê sua mensagem e retorna pessoalmente.</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/15 p-3 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-sky-200">Canal único</span>
                <p className="font-semibold">Um ponto de contato</p>
                <p className="text-white/80">Centralize dúvidas de documentos, impostos, prazos e mais.</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/15 p-3 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-200">Sem compromisso</span>
                <p className="font-semibold">Conversa tranquila</p>
                <p className="text-white/80">Você entende melhor como trabalhamos e decide com calma.</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/15 p-4 space-y-3 text-sm">
              {contactInfo
                .filter((item) => item.kind !== 'address')
                .map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="mt-1 text-white/80">{contactIcons[item.kind]}</div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-white/80">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-base font-semibold text-white hover:text-sky-100">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base font-semibold text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25em] text-white/75">
              {trustInfo.map((badge) => (
                <span key={badge.title} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  {badge.title} · {badge.description}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-0 bg-white text-slate-900 dark:bg-slate-950/90 dark:text-slate-100 flex flex-col h-full">
            <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-2 border-b border-slate-100/80 dark:border-slate-800/70">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">Entre em contato</p>
                <h3 className="text-lg md:text-xl font-semibold text-[#1F3A5F] dark:text-slate-100">Conte rapidamente como podemos te ajudar</h3>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Usamos seus dados apenas para retornar o contato. Não compartilhamos com terceiros.</p>

              {status === 'sending' && (
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full w-1/2 animate-[pulse_1.2s_ease-in-out_infinite] bg-gradient-to-r from-[#1F3A5F] via-[#3B6EA5] to-[#2E4F7E]" />
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-24 sm:p-6 sm:pb-6">
              <form className="space-y-5" onSubmit={handleSubmit}>
                {status === 'success' ? (
                  <div className="text-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500 p-6 rounded-2xl animate-fadeIn">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center bg-green-500/10 dark:bg-green-500/30 rounded-full mb-3">
                      <svg
                        className="w-10 h-10 text-green-500 dark:text-green-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-2xl text-green-700 dark:text-green-100 mb-2">Mensagem enviada!</h3>
                    <p className="text-green-600 dark:text-green-200 text-sm">Recebemos seu contato e em breve retornamos pelos canais informados.</p>
                  </div>
                ) : (
                  <>
                    {submitError && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500 text-red-700 dark:text-red-200 px-4 py-3 rounded-xl" role="alert">
                        <p className="font-bold text-sm">Atenção</p>
                        <p className="text-xs mt-1">{submitError}</p>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <InputField
                        id="nome"
                        label="Nome completo *"
                        name="nome"
                        value={values.nome}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('nome')}
                        error={errors.nome}
                        touched={touched.nome}
                        inputRef={firstFieldRef}
                      />
                      <InputField
                        id="telefone"
                        label="Telefone / WhatsApp *"
                        name="telefone"
                        value={values.telefone}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('telefone')}
                        error={errors.telefone}
                        touched={touched.telefone}
                        type="tel"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <InputField
                        id="email"
                        label="E-mail *"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        error={errors.email}
                        touched={touched.email}
                        type="email"
                      />

                      <div>
                        <label htmlFor="servico" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                          Assunto *
                        </label>
                        <div className="relative">
                          <select
                            id="servico"
                            name="servico"
                            value={values.servico}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('servico')}
                            className={`w-full px-4 py-3 bg-white dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 rounded-2xl border focus:outline-none focus:ring-2 appearance-none pr-10 transition-all duration-200 ${
                              errors.servico && touched.servico
                                ? 'border-red-400 focus:ring-red-300 dark:border-red-400 dark:focus:ring-red-400/40'
                                : 'border-slate-200 dark:border-slate-700/70 focus:ring-[#3B6EA5]/35 dark:focus:ring-[#7AB0FF]/30'
                            } ${!errors.servico && touched.servico ? 'border-green-400 focus:ring-green-200 dark:focus:ring-green-400/30' : ''}`}
                          >
                            <option value="">Selecione uma opção</option>
                            <option value="Dúvidas sobre serviços">Dúvidas sobre serviços</option>
                            <option value="Quero uma orientação rápida">Quero uma orientação rápida</option>
                            <option value="Orçamento">Orçamento</option>
                            <option value="Outros assuntos">Outros assuntos</option>
                          </select>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 dark:text-slate-500">⌄</span>
                        </div>
                        {errors.servico && touched.servico && <p className="text-red-500 dark:text-red-200 text-xs mt-1">{errors.servico}</p>}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="mensagem" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                          Mensagem
                        </label>
                        <span className="text-[11px] text-slate-400 dark:text-slate-400">Opcional, mas ajuda a agilizar o atendimento</span>
                      </div>
                      <textarea
                        id="mensagem"
                        name="mensagem"
                        value={values.mensagem}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('mensagem')}
                        rows={4}
                        className="w-full px-4 py-3 bg-white dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 rounded-2xl border border-slate-200 dark:border-slate-700/70 focus:outline-none focus:ring-2 focus:ring-[#3B6EA5]/35 dark:focus:ring-[#7AB0FF]/30 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm transition-all duration-200"
                        placeholder="Conte em poucas linhas o motivo do contato, dúvidas ou contexto."
                      />
                    </div>

                    <div className="space-y-2 pt-1">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full px-5 py-3 bg-gradient-to-r from-[#1F3A5F] to-[#2E4F7E] text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40"
                      >
                        {status === 'sending' ? (
                          <>
                            <span className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          'Enviar mensagem'
                        )}
                      </button>
                      <p className="text-xs text-slate-500 dark:text-slate-300 text-center">Usamos seus dados apenas para retornar o contato. Sem spam.</p>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface InputFieldProps {
  id: string;
  label: string;
  name: ContactField;
  value: string;
  error: string;
  touched: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: () => void;
  type?: string;
  inputRef?: RefObject<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, name, value, error, touched, onChange, onBlur, type = 'text', inputRef }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={inputRef}
        className={`w-full px-4 py-3 bg-white dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 rounded-2xl border focus:outline-none focus:ring-2 pr-10 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200 ${
          error && touched
            ? 'border-red-400 focus:ring-red-300 dark:border-red-400 dark:focus:ring-red-400/40'
            : 'border-slate-200 dark:border-slate-700/70 focus:ring-[#3B6EA5]/35 dark:focus:ring-[#7AB0FF]/30'
        } ${!error && touched ? 'border-green-400 focus:ring-green-200 dark:focus:ring-green-400/30' : ''}`}
        placeholder={
          name === 'nome' ? 'Seu nome e sobrenome' : name === 'telefone' ? '(73) 9 0000-0000' : name === 'email' ? 'seu.email@exemplo.com' : undefined
        }
      />
      {touched && (error ? <ErrorIcon /> : <SuccessIcon />)}
    </div>
    {error && touched && <p className="text-red-500 dark:text-red-200 text-xs mt-1">{error}</p>}
  </div>
);

const SuccessIcon = () => (
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
    <svg
      className="h-5 w-5 text-green-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const ErrorIcon = () => (
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
    <svg
      className="h-5 w-5 text-red-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>
);

export default ContactOverlay;
