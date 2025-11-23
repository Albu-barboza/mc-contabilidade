import { ctaSteps } from '../../data/home';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ContactCtaStripProps {
  whatsappLink?: string;
  onOpenContact: (trigger?: HTMLElement | null) => void;
}

const ContactCtaStrip: React.FC<ContactCtaStripProps> = ({ whatsappLink, onOpenContact }) => {
  const stripRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="py-14 sm:py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div
          ref={stripRef}
          className="scroll-reveal rounded-3xl bg-[#1A2D48] text-white px-5 py-7 sm:px-8 sm:py-10 flex flex-col lg:flex-row items-start gap-8 shadow-lg"
        >
          <div className="flex-1 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/90">Precisa falar com alguém?</p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
              Um canal aberto para tirar dúvidas, sem compromisso de contratação
            </h2>
            <p className="text-sm md:text-base text-white/90 max-w-xl">
              Entre em contato para entender possibilidades, alinhar expectativas e ver se faz sentido seguirmos juntos.
            </p>
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ctaSteps.map((step) => (
                <div key={step.number} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/85">{step.number}</p>
                  <h3 className="text-sm font-semibold mt-1">{step.title}</h3>
                  <p className="text-xs text-white/85 mt-1">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
              <button
                type="button"
                onClick={(event) => onOpenContact(event.currentTarget)}
                className="flex-1 px-6 py-3.5 rounded-xl text-base font-semibold text-[#1A2D48] bg-white text-center transition-colors duration-200 hover:bg-gray-100"
              >
                Fale conosco
              </button>

              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3.5 rounded-xl text-base font-semibold text-white border border-white/60 text-center transition-colors duration-200 hover:bg-white/10"
                >
                  Conversar pelo WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCtaStrip;
