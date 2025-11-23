import React, { useState, useRef, useEffect } from 'react';
import { useContactForm } from '../../context/ContactFormContext';
import InteractiveBackground from './InteractiveBackground';
import { env } from '../../config/env';

type ContactField = 'nome' | 'email' | 'telefone' | 'servico' | 'mensagem';

interface ContactFormState {
    nome: string;
    email: string;
    telefone: string;
    servico: string;
    mensagem: string;
}

const initialFormState: ContactFormState = {
    nome: '',
    email: '',
    telefone: '',
    servico: '',
    mensagem: ''
};

const contactItems = [
    {
        icon: (
            <svg className="w-5 h-5 text-[#6B7A8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        label: 'Endereço',
        value: 'Av. Paulista, 1000 - Sala 1205 · São Paulo/SP'
    },
    {
        icon: (
            <svg className="w-5 h-5 text-[#6B7A8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        label: 'E-mail',
        value: env.contactEmail,
        href: `mailto:${env.contactEmail}`
    },
    {
        icon: (
            <svg className="w-5 h-5 text-[#6B7A8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        label: 'Atendimento',
        value: 'Segunda a Sexta · 8h às 18h'
    }
];

const SuccessIcon = () => (
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
    </div>
);

const ErrorIcon = () => (
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
);

const ContactModal: React.FC = () => {
    const { isFormOpen, closeForm } = useContactForm();
    const [formState, setFormState] = useState<ContactFormState>(initialFormState);
    const [errors, setErrors] = useState<Record<ContactField, string>>({
        nome: '',
        email: '',
        telefone: '',
        servico: '',
        mensagem: ''
    });
    const [touched, setTouched] = useState<Record<ContactField, boolean>>({
        nome: false,
        email: false,
        telefone: false,
        servico: false,
        mensagem: false
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [submitError, setSubmitError] = useState('');
    const contactSectionRef = useRef<HTMLDivElement>(null);
    const contactEndpoint = env.formspreeContactUrl;

    useEffect(() => {
        if (isFormOpen && contactSectionRef.current) {
            // Small delay to ensure rendering
            setTimeout(() => {
                contactSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [isFormOpen]);

    const validateField = (name: ContactField, value: string) => {
        switch (name) {
            case 'nome':
                return value.trim().split(' ').length < 2 ? 'Informe nome e sobrenome.' : '';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Informe um e-mail válido.';
            case 'telefone':
                return value.replace(/\D/g, '').length >= 10 ? '' : 'Telefone inválido.';
            case 'servico':
                return value ? '' : 'Selecione um assunto.';
            default:
                return '';
        }
    };

    const handleBlur = (field: ContactField) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        setErrors((prev) => ({ ...prev, [field]: validateField(field, formState[field]) }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as { name: ContactField; value: string };
        let finalValue = value;

        if (name === 'telefone') {
            finalValue = value
                .replace(/\D/g, '')
                .slice(0, 11)
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1');
        }

        setFormState((prev) => ({ ...prev, [name]: finalValue }));

        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, finalValue) }));
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const requiredFields: ContactField[] = ['nome', 'email', 'telefone', 'servico'];

        const newErrors = requiredFields.reduce(
            (acc, field) => ({
                ...acc,
                [field]: validateField(field, formState[field])
            }),
            {} as Record<ContactField, string>
        );

        setErrors((prev) => ({ ...prev, ...newErrors }));
        setTouched((prev) => ({ ...prev, ...requiredFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}) }));

        const isValid = Object.values(newErrors).every((error) => error === '');

        if (!isValid) {
            setSubmitError('Revise os campos destacados para continuar.');
            return;
        }

        if (!contactEndpoint) {
            setSubmitError('Endpoint de contato não configurado.');
            return;
        }

        setSubmitError('');
        setFormStatus('sending');

        try {
            const response = await fetch(contactEndpoint, {
                method: 'POST',
                body: JSON.stringify(formState),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.errors?.map((err: { message: string }) => err.message).join(', ') || 'Erro no envio.');
            }

            if (window.gtag) {
                window.gtag('event', 'generate_lead', {
                    event_category: 'contact',
                    event_label: 'Formulário de Contato Principal',
                    value: 1
                });
            }

            setFormStatus('success');
            setFormState(initialFormState);
            setTouched({
                nome: false,
                email: false,
                telefone: false,
                servico: false,
                mensagem: false
            });
            setErrors({
                nome: '',
                email: '',
                telefone: '',
                servico: '',
                mensagem: ''
            });

            setTimeout(() => {
                setFormStatus('idle');
                closeForm();
            }, 5000);
        } catch (error) {
            setSubmitError((error as Error).message || 'Ocorreu um erro. Tente novamente.');
            setFormStatus('idle');
        }
    };

    if (!isFormOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div
                ref={contactSectionRef}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-scaleIn"
            >
                <button
                    onClick={closeForm}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label="Fechar formulário"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="grid lg:grid-cols-2">
                    <div className="p-8 lg:p-12 bg-[#1F3A5F] text-white">
                        <h3 className="text-3xl font-bold mb-6">Vamos conversar?</h3>
                        <p className="text-blue-100 mb-8">
                            Preencha o formulário e entraremos em contato o mais breve possível. Se preferir, use nossos outros canais.
                        </p>

                        <div className="space-y-6">
                            {contactItems.map((item) => (
                                <div key={item.label} className="flex items-start gap-4">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        {React.cloneElement(item.icon as React.ReactElement, { className: 'w-6 h-6 text-white' })}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-1">
                                            {item.label}
                                        </p>
                                        {item.href ? (
                                            <a href={item.href} className="text-lg font-medium hover:text-white transition-colors">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-lg font-medium">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10">
                            <p className="text-sm text-blue-200 mb-4">Nos acompanhe nas redes sociais</p>
                            <div className="flex gap-4">
                                <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" aria-label="Instagram">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                                <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 lg:p-12">
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Nome completo
                                    </label>
                                    <input
                                        id="nome"
                                        name="nome"
                                        type="text"
                                        value={formState.nome}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur('nome')}
                                        className={`w-full px-4 py-3 rounded-xl border ${touched.nome && errors.nome ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                                            } dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition-all`}
                                        placeholder="Seu nome"
                                    />
                                    {touched.nome && errors.nome && (
                                        <p className="mt-1 text-xs text-red-500">{errors.nome}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="telefone" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        WhatsApp
                                    </label>
                                    <input
                                        id="telefone"
                                        name="telefone"
                                        type="tel"
                                        value={formState.telefone}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur('telefone')}
                                        className={`w-full px-4 py-3 rounded-xl border ${touched.telefone && errors.telefone ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                                            } dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition-all`}
                                        placeholder="(00) 00000-0000"
                                    />
                                    {touched.telefone && errors.telefone && (
                                        <p className="mt-1 text-xs text-red-500">{errors.telefone}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    E-mail corporativo
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleInputChange}
                                    onBlur={() => handleBlur('email')}
                                    className={`w-full px-4 py-3 rounded-xl border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                                        } dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition-all`}
                                    placeholder="seu@email.com"
                                />
                                {touched.email && errors.email && (
                                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="servico" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Como podemos ajudar?
                                </label>
                                <select
                                    id="servico"
                                    name="servico"
                                    value={formState.servico}
                                    onChange={handleInputChange}
                                    onBlur={() => handleBlur('servico')}
                                    className={`w-full px-4 py-3 rounded-xl border ${touched.servico && errors.servico ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                                        } dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition-all`}
                                >
                                    <option value="">Selecione um assunto</option>
                                    <option value="Abertura de Empresa">Quero abrir minha empresa</option>
                                    <option value="Troca de Contador">Quero trocar de contador</option>
                                    <option value="Consultoria Tributária">Preciso de consultoria tributária</option>
                                    <option value="Regularização">Regularização de empresa</option>
                                    <option value="Outros">Outros assuntos</option>
                                </select>
                                {touched.servico && errors.servico && (
                                    <p className="mt-1 text-xs text-red-500">{errors.servico}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="mensagem" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Mensagem (opcional)
                                </label>
                                <textarea
                                    id="mensagem"
                                    name="mensagem"
                                    rows={3}
                                    value={formState.mensagem}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition-all resize-none"
                                    placeholder="Conte um pouco mais sobre sua necessidade..."
                                />
                            </div>

                            {submitError && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center">
                                    <ErrorIcon />
                                    {submitError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={formStatus === 'sending'}
                                className="w-full py-4 bg-[#1F3A5F] text-white font-bold rounded-xl hover:bg-[#2E4F7E] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {formStatus === 'sending' ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Enviando...
                                    </>
                                ) : formStatus === 'success' ? (
                                    <>
                                        <SuccessIcon />
                                        Mensagem Enviada!
                                    </>
                                ) : (
                                    'Enviar Solicitação'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
