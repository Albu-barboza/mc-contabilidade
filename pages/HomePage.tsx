import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import JsonLd from '../components/common/JsonLd';
import Seo from '../components/common/Seo';
import TestimonialCard from '../components/common/TestimonialCard';
import { testimonials } from '../data/testimonials';
import { useContactForm } from '../context/ContactFormContext';
import ScrollReveal from '../components/common/ScrollReveal';
import { env, getWhatsappLink } from '../config/env';
import Hero from '../components/home/Hero';
import ServiceCard, { ServiceCardContent } from '../components/common/ServiceCard';
import Section from '../components/common/Section';

const serviceCards: ServiceCardContent[] = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10.01V16m0-6H22M5 16h14M5 20h14M5 4h14M10 4v16" />
      </svg>
    ),
    title: 'Abertura de Empresa',
    description: 'Processo completo de abertura de CNPJ, escolha do regime tributário ideal e registro nos órgãos competentes.',
    features: ['Consultoria para enquadramento', 'Documentação completa', 'Processo ágil e digital'],
    link: '/servicos/abertura-empresa',
    badge: 'CNPJ pronto em 7 dias'
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
    title: 'Contabilidade MEI',
    description: 'Gestão simplificada para microempreendedores com suporte completo e preço acessível.',
    features: ['Declaração anual (DASN-SIMEI)', 'Emissão de guias DAS', 'Suporte especializado'],
    link: '/servicos/mei',
    badge: 'a partir de R$ 99/mês'
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Contabilidade PME',
    description: 'Solução completa para pequenas e médias empresas crescerem com segurança.',
    features: ['Escrituração contábil e fiscal', 'Folha completa e eSocial', 'Relatórios gerenciais mensais'],
    link: '/servicos/pme',
    featured: true,
    badge: 'Plano consultivo'
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 1 1 0 7H6" />
      </svg>
    ),
    title: 'Consultoria Tributária',
    description: 'Planejamento tributário estratégico para reduzir custos legalmente e melhorar sua margem.',
    features: ['Análise de regime tributário', 'Recuperação de impostos', 'Compliance fiscal contínuo'],
    link: '/servicos/consultoria-tributaria',
    badge: 'Economia média de 28%'
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Planejamento Financeiro',
    description: 'Análises, projeções e indicadores para um crescimento sustentável.',
    features: ['Fluxo de caixa e DRE', 'Projeções financeiras', 'KPIs personalizados'],
    link: '/servicos/planejamento-financeiro',
    badge: 'Visibilidade < 30 dias'
  }
];

const HomePage: React.FC = () => {
  const { openForm } = useContactForm();
  const contactEndpoint = env.formspreeContactUrl;
  const whatsappLink = getWhatsappLink();

  const homePageSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'MC Contabilidade',
      url: 'https://mccontabilidade.com.br',
      description:
        'Escritório de contabilidade em São Paulo especializado em MEI, PME, consultoria tributária e planejamento financeiro.',
      publisher: {
        '@type': 'Organization',
        name: 'MC Contabilidade',
        logo: {
          '@type': 'ImageObject',
          url: 'https://mccontabilidade.com.br/images/logo.png'
        }
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços Contábeis',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contabilidade para MEI' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contabilidade para PME' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Abertura de Empresa' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Consultoria Tributária' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Planejamento Financeiro' } }
        ]
      }
    }),
    []
  );

  const displayedTestimonials = useMemo(() => testimonials.slice(0, 3), []);

  return (
    <>
      <Seo
        title="Contabilidade Premium - Seu Negócio em Boas Mãos"
        description="Escritório de contabilidade em São Paulo especializado em MEI, PME, consultoria tributária e planejamento financeiro."
      />
      <JsonLd schema={homePageSchema} />

      {/* HERO */}
      <Hero contactEndpoint={contactEndpoint} onOpenContact={openForm} />

      {/* SERVIÇOS */}
      <Section
        id="servicos"
        title="Soluções sob medida para cada fase do seu negócio"
        eyebrow="Serviços"
        description="Da abertura ao planejamento financeiro, estamos disponíveis para tirar dúvidas e orientar o próximo passo."
        headerWrapper={(header) => (
          <ScrollReveal direction="up">
            {header}
          </ScrollReveal>
        )}
      >
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none">
          {serviceCards.map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 100} direction="up">
              <div className="min-w-[280px] snap-start md:min-w-0">
                <ServiceCard {...card} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* DEPOIMENTOS */}
      <Section
        id="depoimentos"
        title="O que Nossos Clientes Dizem"
        eyebrow="Depoimentos"
        description="Pessoas reais, atendidas no dia a dia, contando como foi o contato conosco."
        eyebrowClassName="bg-[#E8EDF4] dark:bg-white/10 text-[#1F3A5F] dark:text-[#C6D7FF]"
        headerWrapper={(header) => (
          <ScrollReveal direction="up">
            {header}
          </ScrollReveal>
        )}
      >
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none">
          {displayedTestimonials.map((testimonial, index) => (
            <div key={index} className="min-w-[300px] snap-start md:min-w-0">
              <TestimonialCard
                rating={testimonial.rating}
                text={testimonial.text}
                author={testimonial.author}
                role={testimonial.role}
                image={testimonial.image}
                delayIndex={index}
              />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/depoimentos"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#1F3A5F] rounded-xl hover:bg-[#2E4F7E] transition-colors duration-300"
          >
            Ver todos os depoimentos
          </Link>
        </div>
      </Section>

      {/* CTA FINAL */}
      <section className="py-20 border-t border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Pronto para levar sua empresa para o próximo nível?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
              Agende uma conversa gratuita com nossos especialistas e descubra como podemos ajudar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1F3A5F] text-white font-semibold rounded-xl hover:bg-[#2E4F7E] transition-all duration-300 shadow-lg hover:shadow-[#1F3A5F]/25 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                Falar no WhatsApp
              </a>
              <button
                onClick={openForm}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 hover:-translate-y-0.5"
              >
                Solicitar Proposta
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
