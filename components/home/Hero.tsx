import React from 'react';
import { getAssetUrl } from '../../utils/assets';
import { heroBenefits, proofBadges, statHighlights } from '../../data/home';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import HeroQuickForm from './HeroQuickForm';
import StatHighlight from '../common/StatHighlight';
import Button from '../common/Button';

interface HeroProps {
  contactEndpoint?: string;
  onOpenContact: (trigger?: HTMLElement | null) => void;
}

const Hero: React.FC<HeroProps> = ({ contactEndpoint, onOpenContact }) => {
  const heroBadgeRef = useScrollReveal<HTMLSpanElement>({ threshold: 0.2, rootMargin: '-5% 0px' });
  const heroTitleRef = useScrollReveal<HTMLHeadingElement>({ threshold: 0.2, rootMargin: '-5% 0px' });
  const heroSubtitleRef = useScrollReveal<HTMLHeadingElement>({ threshold: 0.2, rootMargin: '-5% 0px' });
  const heroProofRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  const heroBackground = getAssetUrl('/images/background.webp');

  return (
    <section
      id="home"
      className="relative flex min-h-[640px] sm:min-h-[80vh] items-center overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14 dark:bg-slate-900"
    >
      {/* BG */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${heroBackground})` }} aria-hidden />
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

              <p
                className="scroll-reveal mt-3 sm:mt-4 text-base sm:text-lg text-gray-700 dark:text-slate-200 leading-relaxed"
                style={{ transitionDelay: '200ms' }}
              >
                Estratégia contábil consultiva, rotina organizada e retorno humano em até 24h — tudo pensado para MEIs e PMEs que
                precisam crescer com confiança, inclusive em jornadas 100% digitais.
              </p>
            </div>

            {/* BENEFÍCIOS — estilo lista (mais fino/premium) */}
            <div className="mt-5 flex flex-col gap-3">
              {heroBenefits.map((benefit, index) => (
                <HeroBenefitCard key={benefit.title} benefit={benefit} index={index} />
              ))}
            </div>

            {/* CTA — AGORA abaixo dos cards */}
            <div
              className="scroll-reveal mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3"
              style={{ transitionDelay: '220ms' }}
            >
              <Button
                as="a"
                href="#servicos"
                variant="outline"
                className="w-full sm:w-auto bg-white/70 dark:bg-slate-900/60 backdrop-blur hover:bg-white"
              >
                Ver serviços
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
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

const HeroBenefitCard: React.FC<{ benefit: { title: string; description: string; icon: string }; index: number }> = ({
  benefit,
  index,
}) => {
  const benefitRef = useScrollReveal<HTMLDivElement>({ threshold: 0.25 });
  const delay = `${index * 80}ms`;

  return (
    <div
      ref={benefitRef}
      className="scroll-reveal group rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/65 backdrop-blur-sm shadow-sm transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-[1px] hover:shadow-md focus-within:shadow-md px-4 py-3"
      style={{ transitionDelay: delay }}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#E8EDF4] text-[#1F3A5F] dark:bg-white/10 dark:text-white text-lg shadow-sm shrink-0"
          aria-hidden
        >
          {benefit.icon}
        </span>

        <div className="min-w-0 text-left">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
            {benefit.title}
          </p>
          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {benefit.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
