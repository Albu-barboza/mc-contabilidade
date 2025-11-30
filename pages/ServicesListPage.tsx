import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import ScrollReveal from '../components/common/ScrollReveal';
import Card from '../components/common/Card';
import Section from '../components/common/Section';
import { serviceCards, type ServiceIconKey } from '../data/services';

const serviceIcons: Record<ServiceIconKey, React.ReactNode> = {
  company: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M22 10v6M2 10.01V16m0-6H22M5 16h14M5 20h14M5 4h14M10 4v16" /></svg>,
  mei: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
  pme: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  consultoria: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 1 1 0 7H6"></path></svg>,
  finance: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
};

const ServicesListPage: React.FC = () => {
  const description = 'Conheca os servicos da MC Contabilidade. Conteudos e informacoes em revisao para o proximo ciclo de atualizacao.';
  return (
    <div className="">
      <Seo title="Servicos contabeis especializados" description={description} />
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-20">
        <ScrollReveal className="container mx-auto px-4 sm:px-6 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100">
            Nossos <span className="text-gradient">Servicos</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Solucoes contabeis completas e personalizadas para cada fase do seu negocio. Informacoes de planos e prazos em revisao.
          </p>
        </ScrollReveal>
      </section>

      <Section
        title="Lista completa de servicos disponiveis"
        sectionClassName="!py-16 sm:!py-24"
        containerClassName="!px-4 sm:!px-6"
        headerWrapper={() => (
          <h2 className="sr-only">Lista completa de servicos disponiveis</h2>
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceCards.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 100} direction="up" className="h-full">
              {index === 0 ? (
                <div className="h-full">
                  <Card
                    variant="default"
                    className="h-full flex flex-col !bg-primary/90 !text-white !border-white/20 hover:!border-white/40"
                    hoverEffect={true}
                  >
                    <Link to={service.link} className="flex flex-col h-full">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-white/10 text-white">
                        {serviceIcons[service.icon]}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight text-white">
                        {service.title}
                      </h3>
                      <p className="mb-5 flex-grow text-sm sm:text-base text-gray-200">
                        {service.description}
                      </p>
                      <span className="font-semibold self-start text-white group-hover:text-white/80">
                        Ver detalhes{' '}
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </Link>
                  </Card>
                </div>
              ) : (
                <div className="h-full">
                  <Card
                    variant="glass"
                    className="h-full flex flex-col"
                    hoverEffect={true}
                  >
                    <Link to={service.link} className="flex flex-col h-full">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-accent dark:bg-white/10 text-primary dark:text-white">
                        {serviceIcons[service.icon]}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight text-slate-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="mb-5 flex-grow text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        {service.description}
                      </p>
                      <span className="font-semibold self-start text-primary dark:text-[#C6D7FF] group-hover:text-secondary dark:group-hover:text-white">
                        Ver detalhes{' '}
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </Link>
                  </Card>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </div >
  );
};

export default ServicesListPage;
