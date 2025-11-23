import React from 'react';
import { OptimizedImagePaths } from '../../data/testimonials';
import OptimizedImage from './OptimizedImage';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface TestimonialCardProps {
  rating: number;
  text: string;
  author: string;
  role: string;
  image: OptimizedImagePaths;
  delayIndex?: number;
}

const CARD_DELAY_CLASSES = ['delay-[0ms]', 'delay-[80ms]', 'delay-[160ms]', 'delay-[240ms]'];

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rating, text, author, role, image, delayIndex }) => {
  const cardRef = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const delayClass =
    typeof delayIndex === 'number' ? CARD_DELAY_CLASSES[Math.min(delayIndex, CARD_DELAY_CLASSES.length - 1)] : '';

  return (
    <article
      ref={cardRef}
      className={`scroll-reveal ${delayClass} bg-white/60 dark:bg-slate-900/70 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/20 flex flex-col relative overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full`}
    >
      <div className="absolute top-0 left-4 sm:left-6 font-serif text-8xl sm:text-9xl text-slate-200 dark:text-white/10 select-none -z-0">&ldquo;</div>
      <div className="flex gap-1 mb-4 z-10" role="img" aria-label={`Avaliação ${rating} de 5`}>
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B6EA5]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M10 1L12.5 6.5L18.5 7.5L14.25 11.5L15.5 17.5L10 14.5L4.5 17.5L5.75 11.5L1.5 7.5L7.5 6.5L10 1Z" />
          </svg>
        ))}
      </div>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 italic mb-6 flex-grow z-10 leading-relaxed">"{text}"</p>
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-white/10 z-10 mt-auto">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover overflow-hidden">
          <OptimizedImage src={image.src} webpSrc={image.webp} alt={image.alt} width={56} height={56} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">{author}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;
