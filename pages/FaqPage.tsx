
import React, { useEffect, useRef, useState } from 'react';
import JsonLd from '../components/common/JsonLd';
import Seo from '../components/common/Seo';
import ScrollReveal from '../components/common/ScrollReveal';

const faqs = {
    "Geral": [
        { q: "Quais serviços a MC Contabilidade oferece?", a: "Oferecemos uma gama completa de serviços, incluindo Abertura de Empresa, Contabilidade para MEI e PME, Consultoria Tributária, Planejamento Financeiro, e gestão de Folha de Pagamento." },
        { q: "Qual o diferencial de vocês?", a: "Nosso diferencial é o atendimento próximo e consultivo. Não somos apenas 'lançadores de impostos', mas parceiros estratégicos que ajudam na tomada de decisões para o crescimento da sua empresa." },
    ],
    "Abertura de Empresa": [
        { q: "Quanto tempo leva para abrir minha empresa?", a: "O prazo varia conforme a cidade e tipo de empresa, mas em média, o processo leva de 7 a 15 dias úteis após a entrega de toda a documentação." },
        { q: "Posso abrir uma empresa com nome sujo?", a: "Sim, é possível. Restrições no CPF não impedem a abertura de um CNPJ, mas podem dificultar a obtenção de crédito para a empresa no futuro." },
    ],
    "Contabilidade MEI": [
        { q: "MEI precisa de contador?", a: "Embora não seja obrigatório por lei, ter um contador é altamente recomendado para garantir que todas as obrigações, como a Declaração Anual (DASN-SIMEI), sejam cumpridas corretamente e para ajudar na transição para Microempresa (ME) quando necessário." },
        { q: "O que está incluso no plano de contabilidade para MEI?", a: "Nosso plano inclui a emissão mensal da guia DAS, a elaboração e entrega da Declaração Anual, suporte para emissão de notas fiscais e orientação sobre o limite de faturamento." },
    ],
    "Impostos e Tributação": [
        { q: "Como saber se minha empresa está no regime tributário correto?", a: "Nossa equipe realiza um estudo detalhado (planejamento tributário) que analisa seu faturamento, despesas e atividade para determinar se o Simples Nacional, Lucro Presumido ou Lucro Real é a opção mais vantajosa para você." },
        { q: "É possível recuperar impostos pagos a mais?", a: "Sim. Realizamos uma análise retroativa dos últimos 5 anos para identificar pagamentos indevidos ou a maior de impostos, e cuidamos de todo o processo de recuperação ou compensação desses valores." },
    ],
};

const FaqItem = ({ q, a }: { q: string; a: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const answerId = `faq-${q.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}`;
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        buttonRef.current?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }, [isOpen]);

    return (
        <div className="border-b border-gray-200 dark:border-white/10 py-6">
            <button
                ref={buttonRef}
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full flex justify-between items-center text-left"
                aria-controls={answerId}
            >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{q}</h3>
                <svg
                    className={`w-6 h-6 text-[#3B6EA5] dark:text-[#C6D7FF] transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div
                id={answerId}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
            >
                <p className="text-gray-600 dark:text-gray-300 pr-0 sm:pr-8">{a}</p>
            </div>
        </div>
    );
};


const FaqPage: React.FC = () => {
    const faqPageSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": Object.values(faqs).flat().map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    const description =
        'Tire suas dúvidas sobre abertura de empresa, contabilidade MEI, impostos e serviços da MC Contabilidade em um só lugar.';

    return (
        <>
            <Seo title="Perguntas frequentes MC Contabilidade" description={description} />
            <JsonLd schema={faqPageSchema} />
            <div className="">
                <section className="pt-28 pb-16 sm:pt-32 sm:pb-20">
                    <ScrollReveal className="container mx-auto px-4 sm:px-6 text-center space-y-4">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100">Perguntas Frequentes</h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Tire suas principais dúvidas sobre nossos serviços e o universo da contabilidade para empreendedores.
                        </p>
                    </ScrollReveal>
                </section>

                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                        {Object.entries(faqs).map(([category, questions], index) => (
                            <ScrollReveal key={category} delay={index * 100} className="mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b-2 border-[#3B6EA5] dark:border-[#C6D7FF]">{category}</h2>
                                {questions.map((faq, idx) => (
                                    <FaqItem key={idx} q={faq.q} a={faq.a} />
                                ))}
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default FaqPage;
