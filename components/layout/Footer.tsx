import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage';

const Footer: React.FC = () => {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const newsletterFormUrl = import.meta.env.VITE_FORMSPREE_NEWSLETTER_URL;
    const footerWhatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER_FOOTER;
    const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
    const companyCnpj = import.meta.env.VITE_COMPANY_CNPJ;
    const companyCrc = import.meta.env.VITE_COMPANY_CRC;

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail.includes('@')) {
            setNewsletterStatus('error');
            setTimeout(() => setNewsletterStatus('idle'), 2000);
            return;
        }
        setNewsletterStatus('sending');

        try {
            const response = await fetch(newsletterFormUrl, {
                method: 'POST',
                body: JSON.stringify({ email: newsletterEmail }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setNewsletterStatus('success');

                if (window.gtag) {
                    window.gtag('event', 'sign_up', {
                        method: 'Footer Newsletter',
                    });
                }

                setNewsletterEmail('');
                setTimeout(() => setNewsletterStatus('idle'), 3000);
            } else {
                setNewsletterStatus('error');
                setTimeout(() => setNewsletterStatus('idle'), 3000);
            }
        } catch {
            setNewsletterStatus('error');
            setTimeout(() => setNewsletterStatus('idle'), 3000);
        }
    };

    const getButtonText = () => {
        switch (newsletterStatus) {
            case 'sending':
                return 'Enviando...';
            case 'success':
                return 'Inscrito!';
            case 'error':
                return 'Tente novamente';
            default:
                return 'Baixar guia';
        }
    };

    return (
        <footer className="bg-gradient-to-b from-[#162B47] to-[#0F1F35] text-slate-100 pt-20">
            <div className="container mx-auto px-6">
                {/* TOPO DO FOOTER */}
                <div className="grid gap-10 lg:grid-cols-12 mb-16 text-center lg:text-left">
                    {/* COLUNA 1 – LOGO + TEXTO + WHATSAPP */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-5">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-xl font-semibold text-white"
                            aria-label="Página inicial - MC Contabilidade"
                        >
                            <div className="h-16 w-auto">
                                <OptimizedImage
                                    src={`${import.meta.env.BASE_URL}images/logo 1 (2).png`}
                                    alt="MC Contabilidade Logo"
                                    className="h-full w-auto object-contain"
                                    width={200}
                                    height={64}
                                />
                            </div>
                            <span>Contabilidade</span>
                        </Link>

                        <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                            Há 15 anos transformando números em estratégia. Especialistas em MEI, PME e consultoria
                            tributária em São Paulo.
                        </p>

                        <div className="w-full max-w-sm p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                                    Canal prioritário
                                </p>
                                <span className="text-xs font-semibold text-white/80">
                                    Tempo médio: 3 min
                                </span>
                            </div>
                            <a
                                href={`https://wa.me/${footerWhatsappNumber}?text=Olá! Gostaria de uma consultoria gratuita`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#1F3A5F] to-[#2E4F7E] rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#162B47] focus:ring-[#3B6EA5]"
                                aria-label="Falar com especialista no WhatsApp"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                                </svg>
                                Falar no WhatsApp
                            </a>
                            <p className="text-xs text-slate-400 text-center">
                                Atendimento humano, sem bots.
                            </p>
                        </div>
                    </div>

                    {/* COLUNA 2 – SERVIÇOS */}
                    <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-4">
                        <h3 className="text-lg font-semibold text-white">
                            Serviços
                        </h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>
                                <Link to="/servicos/mei" className="hover:text-white transition-colors focus:outline-none focus:underline">
                                    Contabilidade MEI
                                </Link>
                            </li>
                            <li>
                                <Link to="/servicos/pme" className="hover:text-white transition-colors focus:outline-none focus:underline">
                                    Contabilidade PME
                                </Link>
                            </li>
                            <li>
                                <Link to="/servicos/abertura-empresa" className="hover:text-white transition-colors focus:outline-none focus:underline">
                                    Abertura de Empresa
                                </Link>
                            </li>
                            <li>
                                <Link to="/servicos/consultoria-tributaria" className="hover:text-white transition-colors focus:outline-none focus:underline">
                                    Consultoria Tributária
                                </Link>
                            </li>
                            <li>
                                <Link to="/servicos/planejamento-financeiro" className="hover:text-white transition-colors focus:outline-none focus:underline">
                                    Planejamento Financeiro
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* COLUNA 3 – EMPRESA */}
                    <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-4">
                        <h3 className="text-lg font-semibold text-white">
                            Empresa
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    to="/sobre"
                                    className="text-slate-400 hover:text-[#5B8EC5] transition-colors focus:outline-none focus:underline"
                                >
                                    Sobre Nós
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="text-slate-400 hover:text-[#5B8EC5] transition-colors focus:outline-none focus:underline"
                                >
                                    Perguntas Frequentes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/trabalhe-conosco"
                                    className="text-slate-400 hover:text-[#5B8EC5] transition-colors focus:outline-none focus:underline"
                                >
                                    Trabalhe conosco
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/depoimentos"
                                    className="text-slate-400 hover:text-[#5B8EC5] transition-colors focus:outline-none focus:underline"
                                >
                                    Depoimentos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* COLUNA 4 – CONTATO */}
                    <div className="lg:col-span-3 flex flex-col items-center lg:items-start gap-4">
                        <h3 className="text-lg font-semibold text-white">
                            Contato
                        </h3>
                        <ul className="space-y-4 text-sm text-slate-300 w-full">
                            <li className="flex flex-col sm:flex-row gap-3 items-center sm:items-start text-center sm:text-left">
                                <svg
                                    className="w-5 h-5 text-[#6B7A8F]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                </svg>
                                <span>
                                    Av. Paulista, 1000 - Sala 1205
                                    <br />
                                    Bela Vista, São Paulo/SP
                                </span>
                            </li>
                            <li className="flex flex-col sm:flex-row gap-3 items-center sm:items-start text-center sm:text-left">
                                <svg
                                    className="w-5 h-5 text-[#6B7A8F]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    ></path>
                                </svg>
                                <a
                                    href={contactEmail ? `mailto:${contactEmail}` : undefined}
                                    className="hover:text-white focus:outline-none focus:underline"
                                >
                                    {contactEmail}
                                </a>
                            </li>
                            <li className="flex flex-col sm:flex-row gap-3 items-center sm:items-start text-center sm:text-left">
                                <svg
                                    className="w-5 h-5 text-[#6B7A8F]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <span>Segunda a Sexta · 8h às 18h</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section – versão minimalista */}
                <div className="mb-12 border-t border-white/10 pt-8 mt-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 text-center md:text-left space-y-1">
                            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
                                Conteúdo para gestores
                            </p>
                            <h3 className="text-lg font-semibold text-white">
                                Receba orientações práticas de contabilidade e tributos
                            </h3>
                            <p className="text-xs text-slate-300 max-w-md mx-auto md:mx-0">
                                Um e-mail por mês, com insights objetivos para ajudar na gestão financeira da sua empresa.
                            </p>
                        </div>

                        <form
                            onSubmit={handleNewsletterSubmit}
                            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1 max-w-lg md:justify-end"
                        >
                            <input
                                type="email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                className="flex-grow px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/60 text-sm"
                                placeholder="Seu melhor e-mail corporativo"
                                required
                                aria-label="Email para newsletter"
                            />
                            <button
                                type="submit"
                                disabled={newsletterStatus === 'sending'}
                                className={`px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#162B47] focus:ring-white
                                    ${newsletterStatus === 'success'
                                        ? 'bg-emerald-500 text-white'
                                        : newsletterStatus === 'error'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-[#3B6EA5] text-white hover:bg-[#325a87]'
                                    }
                                    disabled:opacity-70 disabled:cursor-not-allowed
                                `}
                            >
                                {getButtonText()}
                            </button>
                        </form>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-3 text-center md:text-left">
                        Sem spam. Você pode se descadastrar a qualquer momento.
                    </p>
                </div>

                {/* Barra inferior */}
                <div className="border-t border-gray-700/50 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                        <p className="text-sm text-slate-500 mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()} MC Contabilidade - CNPJ: {companyCnpj} - {companyCrc}
                            <br />
                            Todos os direitos reservados.
                        </p>
                        <div className="text-sm text-slate-500 space-x-4">
                            <Link
                                to="/politica-de-privacidade"
                                className="hover:text-white transition-colors focus:outline-none focus:underline"
                            >
                                Política de Privacidade
                            </Link>
                            <span className="select-none">|</span>
                            <Link to="/termos-de-uso" className="hover:text-white transition-colors focus:outline-none focus:underline">
                                Termos de Uso
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
