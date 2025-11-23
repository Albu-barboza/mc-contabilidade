import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import TestimonialCard from '../common/TestimonialCard';
import { testimonials } from '../../data/testimonials';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface TestimonialsSectionProps {
  limit?: number;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ limit = 3 }) => {
  const displayedTestimonials = useMemo(() => testimonials.slice(0, limit), [limit]);
  const badgeRef = useScrollReveal<HTMLSpanElement>({ threshold: 0.2 });
  const headingRef = useScrollReveal<HTMLHeadingElement>({ threshold: 0.2 });
  const copyRef = useScrollReveal<HTMLParagraphElement>({ threshold: 0.25 });

  return (
    <section id="depoimentos" className="py-16 sm:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span
            ref={badgeRef}
            className="scroll-reveal delay-[40ms] inline-block px-4 py-1.5 bg-[#E8EDF4] dark:bg-white/10 text-[#1F3A5F] dark:text-slate-100 text-sm font-semibold rounded-full mb-4"
          >
            Depoimentos
          </span>
          <h2
            ref={headingRef}
            className="scroll-reveal delay-[120ms] text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-slate-50 leading-tight"
          >
            O que Nossos Clientes Dizem
          </h2>
          <p
            ref={copyRef}
            className="scroll-reveal delay-[200ms] text-base sm:text-lg text-gray-600 dark:text-slate-200"
          >
            Pessoas reais, atendidas no dia a dia, contando como foi o contato conosco.
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-1 px-1 md:m-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none">
          {displayedTestimonials.map((testimonial, index) => (
            <div key={`${testimonial.author}-${index}`} className="min-w-[280px] snap-start md:min-w-0">
              <TestimonialCard {...testimonial} delayIndex={index} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/depoimentos"
            className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-3 bg-transparent border-2 border-[#1F3A5F] dark:border-[#8EA5D8] text-[#1F3A5F] dark:text-[#C6D7FF] rounded-xl font-semibold text-center transition-all duração-300 hover:bg-[#1F3A5F] hover:text-white hover:-translate-y-1"
          >
            Ver todos os depoimentos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
