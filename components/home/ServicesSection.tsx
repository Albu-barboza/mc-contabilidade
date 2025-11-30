import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { serviceCards, type ServiceCardContent, type ServiceIconKey } from '../../data/services';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const serviceIcons: Record<ServiceIconKey, ReactNode> = {
  company: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 10v6M2 10.01V16m0-6H22M5 16h14M5 20h14M5 4h14M10 4v16" />
    </svg>
  ),
  mei: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  ),
  pme: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  consultoria: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 1 1 0 7H6" />
    </svg>
  ),
  finance: (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
};

const CARD_DELAY_CLASSES = ['delay-[0ms]', 'delay-[80ms]', 'delay-[160ms]', 'delay-[240ms]', 'delay-[320ms]'];

const ServicesSection: React.FC = () => {
  const sectionBadgeRef = useScrollReveal<HTMLSpanElement>({ threshold: 0.2 });
  const sectionHeadingRef = useScrollReveal<HTMLHeadingElement>({ threshold: 0.2 });
  const sectionCopyRef = useScrollReveal<HTMLParagraphElement>({ threshold: 0.25 });

  return (
    <section id="servicos" className="py-16 sm:py-24 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span
            ref={sectionBadgeRef}
            className="scroll-reveal delay-[40ms] inline-block px-4 py-1.5 bg-white dark:bg-white/10 text-[#1F3A5F] dark:text-slate-100 text-sm font-semibold rounded-full mb-4"
          >
            Servicos
          </span>
          <h2
            ref={sectionHeadingRef}
            className="scroll-reveal delay-[120ms] text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-slate-50 leading-tight"
          >
            Solucoes sob medida para cada fase do seu negocio
          </h2>
          <p
            ref={sectionCopyRef}
            className="scroll-reveal delay-[200ms] text-base sm:text-lg text-gray-600 dark:text-slate-200"
          >
            Da abertura ao planejamento financeiro, estamos disponiveis para tirar duvidas e orientar o proximo passo.
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-1 px-1 md:m-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none">
          {serviceCards.map((card, index) => (
            <div key={card.title} className="min-w-[280px] snap-start md:min-w-0">
              <ServiceCard {...card} icon={serviceIcons[card.icon]} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps extends Omit<ServiceCardContent, 'icon'> {
  icon: ReactNode;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  link,
  featured = false,
  badge,
  index
}) => {
  const cardRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const delayClass = CARD_DELAY_CLASSES[Math.min(index, CARD_DELAY_CLASSES.length - 1)];
  const baseClasses =
    'scroll-reveal rounded-2xl p-6 sm:p-8 border flex flex-col transition-all duration-300 group h-full';

  if (featured) {
    return (
      <article
        ref={cardRef}
        className={`${baseClasses} ${delayClass} relative bg-gradient-to-br from-[#1F3A5F] to-[#2E4F7E] text-white border-transparent shadow-2xl lg:scale-105 hover:-translate-y-3`}
      >
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 text-xs font-bold rounded-full uppercase tracking-wider">
          Em destaque
        </div>
        <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          {icon}
        </div>
        {badge ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-3">
            {badge}
          </span>
        ) : null}
        <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight">{title}</h3>
        <p className="text-gray-200/90 mb-5 flex-grow text-sm sm:text-base">{description}</p>
        <ul className="space-y-2 mb-6 text-sm text-white/90">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <Link to={link} className="font-semibold text-white self-start group/link">
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
      className={`${baseClasses} ${delayClass} bg-white dark:bg-slate-900/70 border-gray-200 dark:border-slate-800/70 hover:shadow-2xl hover:border-[#1F3A5F] dark:hover:border-slate-100 hover:-translate-y-3`}
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-[#E8EDF4] dark:bg-white/10 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-primary dark:text-white">
        {icon}
      </div>
      {badge ? (
        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#3B6EA5] dark:text-[#C6D7FF] mb-3">
          {badge}
        </span>
      ) : null}
      <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight text-slate-900 dark:text-slate-50">{title}</h3>
      <p className="text-gray-600 dark:text-slate-200 mb-5 flex-grow text-sm sm:text-base">{description}</p>
      <ul className="space-y-2 mb-6 text-sm text-gray-700 dark:text-slate-300">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-[#1F3A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link to={link} className="font-semibold text-[#1F3A5F] dark:text-[#C6D7FF] self-start group/link">
        Saiba mais{' '}
        <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
          &rarr;
        </span>
      </Link>
    </article>
  );
};

export default ServicesSection;
