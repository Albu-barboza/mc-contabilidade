import { useEffect, useState } from 'react';
import OptimizedImage from '../common/OptimizedImage';
import { heroBenefits, proofBadges, statHighlights, type HeroBenefit, type StatHighlightItem } from '../../data/home';
import useContactForm from '../../hooks/useContactForm';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface HeroProps {
  contactEndpoint?: string;
  onOpenContact: (trigger?: HTMLElement | null) => void;
}

const Hero: React.FC<HeroProps> = ({ contactEndpoint, onOpenContact }) => {
  const heroBadgeRef = useScrollReveal<HTMLSpanElement>({ threshold: 0.2, rootMargin: '-5% 0px' });
  const heroTitleRef = useScrollReveal<HTMLHeadingElement>({ threshold: 0.2, rootMargin: '-5% 0px' });
  const heroSubtitleRef = useScrollReveal<HTMLHeadingElement>({ threshold: 0.2, rootMargin: '-5% 0px' });
  const heroProofRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      id="home"
      className="relative flex min-h-[640px] sm:min-h-[80vh] items-center overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14 dark:bg-slate-900"
    >
      {/* BG */}
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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid gap-12 xl:gap-16 lg:grid-cols-[1.05fr,0.95fr] items-start lg:items-center">
          {/* TEXTO DO HERO */}
          <div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0 space-y-4">
            <div className="space-y-4">
              <span
                ref={heroBadgeRef}
                className="scroll-reveal inline-block px-4 py-1.5 bg-[#E8EDF4] dark:bg-white/10 text-[#1F3A5F] dark:text-slate-100 text-sm font-semibold rounded-full"
                style={{ transitionDelay: '40ms' }}
              >
                Contabilidade que Impulsiona
              </span>

              {/* Bloco H1 + H2 */}
              <div className="max-w-2xl mx-auto lg:mx-0">
                <h1
                  ref={heroTitleRef}
                  className="scroll-reveal text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-slate-50 leading-tight"
                  style={{ transitionDelay: '120ms' }}
                >
                  Seu Negócio em <span className="text-gradient">Boas Mãos</span>
                </h1>

                <h2
                  ref={heroSubtitleRef}
                  className="scroll-reveal mt-4 sm:mt-5 md:mt-6 text-lg sm:text-xl text-slate-700 dark:text-slate-200 font-semibold leading-relaxed mx-auto lg:mx-0"
                  style={{ transitionDelay: '160ms' }}
                >
                  Contabilidade consultiva para MEI e PME, com linguagem simples, foco em resultado e atendimento próximo.
                </h2>
              </div>

              {/* Parágrafo colado no bloco, sem buraco embaixo do H2 */}
              <p
                className="scroll-reveal mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 dark:text-slate-200 leading-relaxed"
                style={{ transitionDelay: '200ms' }}
              >
                Estratégia contábil consultiva, rotina organizada e retorno humano em até 24h — tudo pensado para MEIs e PMEs que
                precisam crescer com confiança, inclusive em jornadas 100% digitais.
              </p>
            </div>

            {/* CTAs – aproximados do texto */}
            <div
              className="scroll-reveal mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3"
              style={{ transitionDelay: '220ms' }}
            >
              <button
                type="button"
                onClick={(event) => onOpenContact(event.currentTarget)}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-gradient-to-r from-[#1F3A5F] to-[#2E4F7E] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#1F3A5F]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F3A5F]/70"
              >
                Falar com um especialista
              </button>
              <a
                href="#servicos"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-[#1F3A5F]/50 px-6 py-3 text-base font-semibold text-[#1F3A5F] dark:text-slate-100 bg-white/70 dark:bg-slate-900/60 backdrop-blur hover:bg-white"
              >
                Ver serviços
              </a>
            </div>

            {/* Benefícios – subindo um pouco */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {heroBenefits.map((benefit, index) => (
                <HeroBenefitCard key={benefit.title} benefit={benefit} index={index} />
              ))}
            </div>

            {/* Stats – colados nos cards, sem buraco */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {statHighlights.map((stat, index) => (
                <StatHighlight key={stat.label} stat={stat} delayMs={index * 70} />
              ))}
            </div>

            {/* Provas sociais */}
            <div
              ref={heroProofRef}
              className="scroll-reveal flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 border-t border-gray-200 pt-5 text-sm text-gray-700 dark:text-slate-200 dark:border-slate-800/70"
            >
              {proofBadges.map((proof) => (
                <div key={proof.label} className="flex items-center gap-2">
                  <span className="text-[#3B6EA5] text-lg">&#10022;</span>
                  <span>{proof.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CARD DO FORMULÁRIO */}
          <div className="w-full max-w-lg mx-auto lg:mx-0 flex justify-center lg:justify-end">
            <HeroQuickForm endpoint={contactEndpoint} onOpenContact={onOpenContact} />
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroBenefitCard: React.FC<{ benefit: HeroBenefit; index: number }> = ({ benefit, index }) => {
  const benefitRef = useScrollReveal<HTMLDivElement>({ threshold: 0.25 });
  const delay = `${index * 80}ms`;

  return (
    <div
      ref={benefitRef}
      className="scroll-reveal flex items-start gap-3 bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white dark:bg-slate-900/60 dark:border-slate-800/70"
      style={{ transitionDelay: delay }}
    >
      <span className="text-2xl" aria-hidden>
        {benefit.icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-[#1F3A5F] dark:text-slate-100 uppercase tracking-widest">
          {benefit.title}
        </p>
        <p className="text-sm text-gray-600 dark:text-slate-300">{benefit.description}</p>
      </div>
    </div>
  );
};

const HeroQuickForm: React.FC<{ endpoint?: string; onOpenContact: (trigger?: HTMLElement | null) => void }> = ({
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
              className={`mt-1 w-full rounded-xl border px-4 py-3.5 text-base text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 pr-10 dark:bg-slate-950 ${
                errors.nome && touched.nome
                  ? 'border-red-400 ring-red-200 dark:border-red-400'
                  : 'border-gray-200 focus:ring-[#3B6EA5] dark:border-white/20'
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
              className={`mt-1 w-full rounded-xl border px-4 py-3.5 text-base text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 pr-10 dark:bg-slate-950 ${
                errors.telefone && touched.telefone
                  ? 'border-red-400 ring-red-200 dark:border-red-400'
                  : 'border-gray-200 focus:ring-[#3B6EA5] dark:border-white/20'
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

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-xl bg-gradient-to-r from-[#1F3A5F] to-[#2E4F7E] py-3.5 text-base text-white font-semibold transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {status === 'sending' ? (
            <>
              <span className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              Enviando...
            </>
          ) : (
            'Quero ser atendido'
          )}
        </button>

        <button
          type="button"
          onClick={(event) => onOpenContact(event.currentTarget)}
          className="block w-full text-center text-sm text-[#1F3A5F] dark:text-slate-100 font-semibold hover:underline"
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

const StatHighlight: React.FC<{ stat: StatHighlightItem; delayMs?: number }> = ({ stat, delayMs = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statRef = useScrollReveal<HTMLDivElement>({ threshold: 0.4 });

  useEffect(() => {
    const element = statRef.current;
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
  }, [hasAnimated, statRef]);

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
    <div ref={statRef} className="scroll-reveal text-center" style={{ transitionDelay: `${delayMs}ms` }}>
      <p className="text-2xl sm:text-3xl font-bold text-[#1F3A5F] dark:text-slate-100 leading-tight">
        {stat.prefix || ''}
        {count.toLocaleString('pt-BR')}
        {stat.suffix || ''}
      </p>
      <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300">{stat.label}</p>
    </div>
  );
};

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

export default Hero;
