import React from 'react';
import useContactForm from '../../hooks/useContactForm';
import Button from '../common/Button';

interface HeroQuickFormProps {
    endpoint?: string;
    onOpenContact?: (trigger?: HTMLElement | null) => void;
}

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

const HeroQuickForm: React.FC<HeroQuickFormProps> = ({
    endpoint,
    onOpenContact
}) => {
    const { values, errors, touched, status, submitError, handleInputChange, handleBlur, handleSubmit } = useContactForm({
        endpoint,
        requiredFields: ['nome', 'telefone'],
        analyticsLabel: 'Hero Quick Form',
        payloadTransformer: (formValues) => ({
            nome: formValues.nome,
            telefone: formValues.telefone,
            origem: 'hero_quick_form'
        })
    });

    return (
        <div className="w-full bg-white/35 dark:bg-slate-900/60 backdrop-blur-2xl rounded-2xl shadow-2xl px-5 py-6 sm:px-8 sm:py-8 border border-white/50 dark:border-white/10 translate-y-4 lg:translate-y-8 lg:translate-x-8">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-600 dark:text-slate-200 mb-2 text-center lg:text-left">
                Fale com a equipe
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-2 text-center lg:text-left">
                Receba um contato em até 24h
            </h3>
            <p className="text-sm text-gray-700 dark:text-slate-200 mb-2 text-center lg:text-left">
                Deixe seu nome e WhatsApp e retornamos por mensagem ou ligação.
            </p>
            <p className="text-sm text-gray-600 dark:text-slate-300 mb-6 text-center lg:text-left">
                Atendimento humano, sem robô, para tirar dúvidas e entender sua necessidade com calma.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="heroNome" className="text-sm font-semibold text-gray-700 dark:text-slate-200">
                        Nome completo
                    </label>
                    <div className="relative">
                        <input
                            id="heroNome"
                            name="nome"
                            type="text"
                            value={values.nome}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('nome')}
                            className={`mt-1 w-full rounded-xl border px-4 py-3.5 text-base text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 pr-10 dark:bg-slate-950 ${errors.nome && touched.nome
                                ? 'border-red-400 ring-red-200 dark:border-red-400'
                                : 'border-gray-200 focus:ring-secondary dark:border-white/20'
                                } ${!errors.nome && touched.nome ? 'border-green-400 ring-green-100' : ''}`}
                            placeholder="Como devemos te chamar?"
                        />
                        {touched.nome && (errors.nome ? <ErrorIcon /> : <SuccessIcon />)}
                    </div>
                    {errors.nome && touched.nome && <p className="text-xs text-red-500 mt-1">{errors.nome}</p>}
                </div>

                <div>
                    <label htmlFor="heroTelefone" className="text-sm font-semibold text-gray-700 dark:text-slate-200">
                        WhatsApp
                    </label>
                    <div className="relative">
                        <input
                            id="heroTelefone"
                            name="telefone"
                            type="tel"
                            value={values.telefone}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('telefone')}
                            className={`mt-1 w-full rounded-xl border px-4 py-3.5 text-base text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 pr-10 dark:bg-slate-950 ${errors.telefone && touched.telefone
                                ? 'border-red-400 ring-red-200 dark:border-red-400'
                                : 'border-gray-200 focus:ring-secondary dark:border-white/20'
                                } ${!errors.telefone && touched.telefone ? 'border-green-400 ring-green-100' : ''}`}
                            placeholder="(73) 9 0000-0000"
                        />
                        {touched.telefone && (errors.telefone ? <ErrorIcon /> : <SuccessIcon />)}
                    </div>
                    {errors.telefone && touched.telefone && <p className="text-xs text-red-500 mt-1">{errors.telefone}</p>}
                </div>

                {submitError && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2" role="alert">
                        {submitError}
                    </p>
                )}

                {status === 'success' && (
                    <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3" role="status">
                        Recebemos seu contato! Logo nossa equipe retorna pelo WhatsApp informado.
                    </div>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3.5"
                    isLoading={status === 'sending'}
                    disabled={status === 'sending'}
                >
                    {status === 'success' ? 'Mensagem enviada!' : 'Quero ser atendido'}
                </Button>

                <button
                    type="button"
                    onClick={(event) => onOpenContact?.(event.currentTarget)}
                    className="block w-full text-center text-sm text-primary dark:text-slate-100 font-semibold hover:underline"
                >
                    Ver formulário completo
                </button>

                <p className="text-xs text-gray-500 dark:text-slate-300 text-center">
                    Usamos seus dados apenas para retornar o contato. Sem spam.
                </p>
            </form>
        </div>
    );
};

export default HeroQuickForm;
