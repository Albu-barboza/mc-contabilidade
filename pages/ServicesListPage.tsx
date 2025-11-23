
import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';

const services = [
    {
        icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
        title: "Contabilidade MEI",
        description: "Gestão simplificada para Microempreendedores com suporte completo e preço acessível.",
        link: "/servicos/mei"
    },
    {
        icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        title: "Contabilidade PME",
        description: "Solução completa para pequenas e médias empresas. Otimize suas finanças e foque no crescimento.",
        link: "/servicos/pme"
    },
    {
        icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M22 10v6M2 10.01V16m0-6H22M5 16h14M5 20h14M5 4h14M10 4v16" /></svg>,
        title: "Abertura de Empresa",
        description: "Abra seu CNPJ de forma rápida e segura, com o enquadramento tributário ideal para o seu negócio.",
        link: "/servicos/abertura-empresa"
    },
    {
        icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
        title: "Consultoria Tributária",
        description: "Planejamento estratégico para reduzir custos legalmente e melhorar a saúde financeira da sua empresa.",
        link: "/servicos/consultoria-tributaria"
    },
    {
        icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
        title: "Planejamento Financeiro",
        description: "Análise de fluxo de caixa, projeções e estratégias para garantir um crescimento sustentável e lucrativo.",
        link: "/servicos/planejamento-financeiro"
    }
];

const ServicesListPage: React.FC = () => {
    const description = 'Conheça todos os serviços da MC Contabilidade: abertura de empresa, consultoria tributária, planos para MEI e PME e planejamento financeiro.';
    return (
        <div className="">
            <Seo title="Serviços contábeis especializados" description={description} />
            <section className="pt-28 pb-16 sm:pt-32 sm:pb-20">
                <div className="container mx-auto px-4 sm:px-6 text-center space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100">
                        Nossos <span className="text-gradient">Serviços</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Soluções contábeis completas e personalizadas para cada fase do seu negócio. Explore nossos serviços e descubra como podemos ajudar sua empresa a prosperar.
                    </p>
                </div>
            </section>

            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="sr-only">Lista completa de serviços disponíveis</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {services.map((service, index) => (
                            <Link
                                to={service.link}
                                key={index}
                                className={`backdrop-blur-sm p-6 sm:p-8 rounded-2xl border flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group ${index === 0
                                    ? 'bg-[#1F3A5F]/90 border-white/20 hover:border-white/40'
                                    : 'bg-white/60 dark:bg-slate-900/70 border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40'
                                    }`}
                            >
                                <div
                                    className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${index === 0
                                        ? 'bg-white/10 text-white'
                                        : 'bg-[#E8EDF4] dark:bg-white/10 text-[#1F3A5F] dark:text-white'
                                        }`}
                                >
                                    {service.icon}
                                </div>
                                <h3
                                    className={`text-xl sm:text-2xl font-bold mb-3 leading-tight ${index === 0 ? 'text-white' : 'text-slate-900 dark:text-white'
                                        }`}
                                >
                                    {service.title}
                                </h3>
                                <p
                                    className={`mb-5 flex-grow text-sm sm:text-base ${index === 0 ? 'text-gray-200' : 'text-gray-600 dark:text-gray-300'
                                        }`}
                                >
                                    {service.description}
                                </p>
                                <span
                                    className={`font-semibold self-start ${index === 0
                                        ? 'text-white group-hover:text-white/80'
                                        : 'text-[#1F3A5F] dark:text-[#C6D7FF] group-hover:text-[#2E4F7E] dark:group-hover:text-white'
                                        }`}
                                >
                                    Ver detalhes{' '}
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                        &rarr;
                                    </span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div >
    );
};

export default ServicesListPage;
