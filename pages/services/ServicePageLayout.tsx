import React from 'react';
import JsonLd from '../../components/common/JsonLd';
import { useContactForm } from '../../context/ContactFormContext';



interface ServicePageLayoutProps {
  schema: object;
  title: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
}

const serviceSteps = [
  { number: '01', title: 'Diagnóstico personalizado', description: 'Analisamos sua operação atual e obrigações fiscais.' },
  { number: '02', title: 'Plano sob medida', description: 'Definimos rotinas, prazos, canais e responsáveis.' },
  { number: '03', title: 'Implantação assistida', description: 'Equipe dedicada conduz o onboarding e os primeiros ciclos.' }
];

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER_FLOAT;
const whatsappLink = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=Ol%C3%A1!%20Vim%20do%20site%20da%20MC%20Contabilidade.`
  : undefined;

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ schema, title, subtitle, children }) => {
  const { openForm } = useContactForm();
  return (
    <>
      <JsonLd schema={schema} />
      <div className="">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 dark:text-white">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              {subtitle}
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl prose lg:prose-lg dark:prose-invert">
            {children}
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-6">
            <div className="rounded-2xl bg-[#1A2D48] text-white px-6 py-8 md:px-10 md:py-10 flex flex-col lg:flex-row items-start gap-8 shadow-lg">
              {/* LADO ESQUERDO – TEXTO CLEAN COM A COR NOVA */}
              <div className="flex-1 space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  Para empresas em crescimento
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
                  Contabilidade clara, objetiva e feita para a rotina do seu negócio
                </h2>
                <p className="text-sm md:text-base text-white/80 max-w-xl">
                  Organizamos obrigações, impostos e relatórios para você acompanhar os números sem ruído
                  e decidir com mais segurança.
                </p>
              </div>

              {/* LADO DIREITO – ETAPAS + BOTÕES */}
              <div className="flex-1 w-full space-y-4">
                <div className="grid sm:grid-cols-3 gap-3">
                  {serviceSteps.map((step) => (
                    <div
                      key={step.number}
                      className="rounded-xl border border-white/15 bg-white/5 px-4 py-3"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
                        {step.number}
                      </p>
                      <h3 className="text-sm font-semibold mt-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-white/80 mt-1">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={openForm}
                    className="flex-1 px-6 py-3 rounded-lg text-sm font-semibold text-[#1A2D48] bg-white text-center transition-colors duration-200 hover:bg-gray-100"
                  >
                    Quero meu diagnóstico gratuito
                  </button>

                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 rounded-lg text-sm font-semibold text-white border border-white/60 text-center transition-colors duration-200 hover:bg-white/10"
                    >
                      Falar com especialista
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicePageLayout;
