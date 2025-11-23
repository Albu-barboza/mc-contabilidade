import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import JsonLd from '../components/common/JsonLd';
import Seo from '../components/common/Seo';
import TestimonialCard from '../components/common/TestimonialCard';
import { testimonials } from '../data/testimonials';
import OptimizedImage from '../components/common/OptimizedImage';
import { useContactForm } from '../context/ContactFormContext';
import ScrollReveal from '../components/common/ScrollReveal';
import { env, getWhatsappLink } from '../config/env';

const contactLink = { pathname: '/', hash: '#contato' } as const;
const contactHash = contactLink.hash;

type ContactField = 'nome' | 'email' | 'telefone' | 'servico' | 'mensagem';

interface ContactFormState {
  nome: string;
  email: string;
  telefone: string;
  servico: string;
  mensagem: string;
}

interface ServiceCardContent {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  link: string;
  featured?: boolean;
  badge?: string;
}

interface StatHighlightItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

const statHighlights: StatHighlightItem[] = [
  { value: 500, prefix: '+', label: 'Empresas atendidas' },
  { value: 15, suffix: ' anos', label: 'de experiência' },
  { value: 35, suffix: '%', label: 'economia média em tributos' },
  { value: 24, suffix: 'h', label: 'para retorno ao contato' }
];

const proofBadges = [
  { label: 'Parceiro Google Workspace' },
  { label: 'Escala SEBRAE' },
  { label: 'Clientes em 8 estados' }
];

const heroBenefits = [
  { title: 'Retorno em até 24h', description: 'Contato rápido e direto com a equipe.', icon: '⚡' },
  { title: 'Especialistas CRC', description: 'Time 100% certificado à disposição.', icon: '🛡️' },
  { title: 'Atendimento próximo', description: 'Linguagem clara, sem “contabilês”.', icon: '🎯' }
];

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
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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

const StatHighlight: React.FC<{ stat: StatHighlightItem }> = ({ stat }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let start: number | null = null;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(stat.value * eased));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hasAnimated, stat.value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-bold text-[#1F3A5F] dark:text-[#C6D7FF]">
        {stat.prefix || ''}
        {count.toLocaleString('pt-BR')}
        {stat.suffix || ''}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">{stat.label}</p>
    </div>
  );
};

const HeroQuickForm: React.FC<{ endpoint?: string }> = ({ endpoint }) => {
  const [formState, setFormState] = useState({ nome: '', telefone: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.nome.trim() || formState.telefone.replace(/\D/g, '').length < 10) {
      setError('Informe nome e WhatsApp válidos.');
      return;
    }
    if (!endpoint) {
      setError('Endpoint de contato não configurado.');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formState,
          origem: 'hero_quick_form'
        })
      });
      if (!response.ok) {
        throw new Error('Não foi possível enviar agora.');
      }
      setStatus('success');
      setFormState({ nome: '', telefone: '' });
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'contact',
          event_label: 'Hero Quick Form',
          value: 1
        });
      }
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setError((err as Error).message || 'Erro ao enviar. Tente novamente.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="bg-white/60 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-white/20 translate-y-4 lg:translate-y-8 lg:translate-x-8">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/80 mb-2 text-center lg:text-left">
        Fale com a equipe
      </p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center lg:text-left">
        Receba um contato em até 24h
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 text-center lg:text-left">
        Deixe seu nome e WhatsApp e retornamos por mensagem ou ligação.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center lg:text-left">
        Atendimento humano, sem robô, para tirar dúvidas e entender sua necessidade com calma.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="heroNome" className="text-sm font-semibold text-slate-700 dark:text-white">
            Nome completo
          </label>
          <input
            id="heroNome"
            name="nome"
            type="text"
            value={formState.nome}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-gray-300 dark:border-white/20 px-4 py-3 text-slate-900 dark:text-white bg-white/50 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/50 dark:focus:ring-white/50 placeholder:text-gray-400 dark:placeholder:text-white/50"
            placeholder="Como devemos te chamar?"
          />
        </div>
        <div>
          <label htmlFor="heroTelefone" className="text-sm font-semibold text-slate-700 dark:text-white">
            WhatsApp
          </label>
          <input
            id="heroTelefone"
            name="telefone"
            type="tel"
            value={formState.telefone}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-gray-300 dark:border-white/20 px-4 py-3 text-slate-900 dark:text-white bg-white/50 dark:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]/50 dark:focus:ring-white/50 placeholder:text-gray-400 dark:placeholder:text-white/50"
            placeholder="(73) 9 0000-0000"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-xl bg-gradient-to-r from-[#1F3A5F] to-[#2E4F7E] py-3 text-white font-semibold transition-all duration-300 hover:-translate-y-1 disabled:opacity-70"
        >
          {status === 'sending' ? 'Enviando...' : status === 'success' ? 'Mensagem enviada!' : 'Quero ser atendido'}
        </button>
        <p className="text-xs text-gray-300 text-center">Sem spam · Respeito total aos seus dados.</p>
      </form>
    </div>
  );
};

interface ServiceCardProps extends ServiceCardContent {
  badge?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, link, featured = false, badge }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const baseClasses = 'rounded-2xl p-8 border flex flex-col transition-all duration-300 group data-[animate]:animate-in';

  if (featured) {
    return (
      <article
        ref={cardRef}
        data-animate
        className={`${baseClasses} relative bg-gradient-to-br from-[#1F3A5F] to-[#2E4F7E] text-white border-transparent shadow-2xl lg:scale-105 hover:-translate-y-3`}
      >
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 text-xs font-bold rounded-full uppercase tracking-wider">
          Mais Procurado
        </div>
        <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          {icon}
        </div>
        {badge ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-3">
            {badge}
          </span>
        ) : null}
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-200/90 mb-5 flex-grow">{description}</p>
        <ul className="space-y-2 mb-6 text-sm text-white/90">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <Link to={link} className="font-semibold text-white self-start group/link after:absolute after:inset-0">
          Saiba mais{' '}
          <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
            &rarr;
          </span>
        </Link>
      </article>
    );
  }

  return (
    <article
      ref={cardRef}
      data-animate
      className={`${baseClasses} bg-white/60 dark:bg-slate-900/70 border-gray-200 dark:border-white/20 hover:shadow-2xl hover:border-gray-300 dark:hover:border-white/40 hover:-translate-y-3 relative`}
    >
      <div className="w-16 h-16 flex items-center justify-center bg-[#E8EDF4] dark:bg-white/10 rounded-xl text-[#1F3A5F] dark:text-white mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
        <span aria-hidden="true">{icon}</span>
      </div>
      {badge ? (
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[#1F3A5F] dark:text-white bg-[#E8EDF4] dark:bg-white/20 rounded-full mb-3">
          {badge}
        </span>
      ) : null}
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-5 flex-grow">{description}</p>
      <ul className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-300">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-[#1F3A5F] dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        to={link}
        className="font-semibold text-[#1F3A5F] dark:text-[#C6D7FF] self-start group-hover:text-[#2E4F7E] dark:group-hover:text-white after:absolute after:inset-0"
      >
        Saiba mais{' '}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </Link>
    </article>
  );
};

const initialFormState: ContactFormState = {
  nome: '',
  email: '',
  telefone: '',
  servico: '',
  mensagem: ''
};

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
      <section id="home" className="relative min-h-screen md:min-h-[90vh] flex items-center overflow-hidden pt-28 pb-16 dark:bg-slate-900">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/images/background.webp"
            webpSrc="/images/background.webp"
            alt="Reunião de negócios em um escritório moderno"
            className="w-full h-full min-h-[620px] md:min-h-0 object-cover animate-kenBurns"
            lazy={false}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90 dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-950" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-start lg:items-center">
            <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
              <span className="inline-block px-4 py-1.5 bg-[#E8EDF4] dark:bg-white/10 text-[#1F3A5F] dark:text-[#C6D7FF] text-sm font-semibold rounded-full mb-6 animate-fadeInUp">
                Contabilidade que Impulsiona
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight mb-6 animate-fadeInUp"
                style={{ animationDelay: '0.2s' }}
              >
                Seu Negócio em <span className="text-gradient">Boas Mãos</span>
              </h1>

              <div className="mb-8" />
              <div className="mb-10" />

              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 animate-fadeInUp"
                style={{ animationDelay: '0.7s' }}
              >
                {heroBenefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-white/10 dark:border-white/20"
                  >
                    <span className="text-2xl text-[#1F3A5F] dark:text-white" aria-hidden>
                      {benefit.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-widest">
                        {benefit.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-200">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                {statHighlights.map((stat) => (
                  <StatHighlight key={stat.label} stat={stat} />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 border-t border-gray-200 pt-6 text-sm text-gray-700 dark:text-gray-200 dark:border-white/10">
                {proofBadges.map((proof) => (
                  <div key={proof.label} className="flex items-center gap-2">
                    <span className="text-[#3B6EA5] text-lg">✦</span>
                    <span>{proof.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-lg mx-auto lg:mx-0 flex justify-center lg:justify-end">
              <HeroQuickForm endpoint={contactEndpoint} />
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-white dark:bg-white/10 text-[#1F3A5F] dark:text-[#C6D7FF] text-sm font-semibold rounded-full mb-4">
                Serviços
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                Soluções sob medida para cada fase do seu negócio
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Da abertura ao planejamento financeiro, estamos disponíveis para tirar dúvidas e orientar o próximo passo.
              </p>
            </div>
          </ScrollReveal>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none">
            {serviceCards.map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 100} direction="up">
                <div className="min-w-[280px] snap-start md:min-w-0">
                  <ServiceCard {...card} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-[#E8EDF4] dark:bg-white/10 text-[#1F3A5F] dark:text-[#C6D7FF] text-sm font-semibold rounded-full mb-4">
                Depoimentos
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                O que Nossos Clientes Dizem
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Pessoas reais, atendidas no dia a dia, contando como foi o contato conosco.
              </p>
            </div>
          </ScrollReveal>
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
        </div>
      </section>

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
