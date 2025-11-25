import React from 'react';
import TestimonialCard from '../components/common/TestimonialCard';
import { testimonials } from '../data/testimonials';
import Seo from '../components/common/Seo';
import { useContactForm } from '../context/ContactFormContext';
import Button from '../components/common/Button';

const TestimonialsPage: React.FC = () => {
  const { openForm } = useContactForm();
  const description =
    'Veja o que nossos clientes dizem sobre a parceria com a MC Contabilidade. Histórias reais de confiança e crescimento.';

  return (
    <>
      <Seo title="Depoimentos de clientes | MC Contabilidade" description={description} />
      <div className="">
        <section className="pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="container mx-auto px-4 sm:px-6 text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-slate-50">
              A Voz da <span className="text-gradient">Experiência</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-slate-200 max-w-3xl mx-auto">
              Estamos orgulhosos da confiança que nossos clientes depositam em nós. Veja como nossa parceria tem gerado resultados reais para empresas como a sua.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  rating={testimonial.rating}
                  text={testimonial.text}
                  author={testimonial.author}
                  role={testimonial.role}
                  image={testimonial.image}
                  delayIndex={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-slate-50">Quer ser nosso próximo caso de sucesso?</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-slate-200">
              Nossa equipe está pronta para te ajudar a crescer com segurança e eficiência. Fale conosco e solicite uma proposta sem compromisso.
            </p>
            <Button
              onClick={openForm}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-10 py-4 text-lg"
            >
              Fale com um Especialista
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default TestimonialsPage;
