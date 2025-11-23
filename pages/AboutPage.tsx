import React from 'react';
import JsonLd from '../components/common/JsonLd';
import OptimizedImage from '../components/common/OptimizedImage';
import Seo from '../components/common/Seo';
import ScrollReveal from '../components/common/ScrollReveal';

const teamMembers = [
  { name: 'Carlos Ferreira', role: 'Sócio-Fundador, Contador Chefe', image: { src: '/images/team/icone.webp', webp: '/images/team/icone.webp' } },
  { name: 'Mariana Costa', role: 'Gerente Fiscal e Tributário', image: { src: '/images/team/icone.webp', webp: '/images/team/icone.webp' } },
  { name: 'Ricardo Almeida', role: 'Especialista em PME', image: { src: '/images/team/icone.webp', webp: '/images/team/icone.webp' } },
  { name: 'Beatriz Lima', role: 'Consultora de Abertura de Empresas', image: { src: '/images/team/icone.webp', webp: '/images/team/icone.webp' } },
];

const AboutPage: React.FC = () => {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Sobre a MC Contabilidade",
    "description": "Conheça a história, missão, visão e valores da MC Contabilidade. Somos um escritório de contabilidade em São Paulo dedicado a impulsionar o sucesso de MEIs e PMEs.",
    "mainEntity": {
      "@type": "AccountingService",
      "name": "MC Contabilidade",
      "telephone": "+55-11-98765-4321",
      "email": "contato@mccontabilidade.com.br",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Paulista, 1000 - Sala 1205",
        "addressLocality": "São Paulo",
        "addressRegion": "SP"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "08:00",
          "closes": "18:00"
        }
      ]
    }
  };

  const description =
    'Conheça a história, missão e o time da MC Contabilidade. Transparência, tecnologia e proximidade com MEIs e PMEs em todo o Brasil.';

  return (
    <>
      <Seo title="Sobre a MC Contabilidade" description={description} />
      <JsonLd schema={aboutPageSchema} />
      <div className="">
        {/* HERO */}
        <section className="pt-28 pb-16 sm:pt-32 sm:pb-20">
          <ScrollReveal className="container mx-auto px-4 sm:px-6 text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100">
              Transformando números em <span className="text-gradient">oportunidades</span>.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Somos mais que contadores. Somos parceiros estratégicos dedicados a simplificar a complexidade financeira e a impulsionar o crescimento do seu negócio.
            </p>
          </ScrollReveal>
        </section>

        {/* MISSÃO / VISÃO / VALORES */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal className="max-w-3xl mx-auto text-center mb-14 space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-[#3B6EA5] dark:text-[#C6D7FF]">
                Essência MC Contabilidade
              </p>
              <p className="text-sm uppercase tracking-[0.4em] text-[#3B6EA5] dark:text-[#C6D7FF] mb-3">
                Nossa história
              </p>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
                15 anos de dedicação
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  A MC Contabilidade nasceu em 2009 do sonho de Carlos Ferreira em oferecer um serviço
                  contábil diferente: mais próximo, consultivo e focado no sucesso do cliente.
                  O que começou em uma pequena sala na Av. Paulista hoje é um escritório consolidado,
                  com mais de 500 empresas atendidas.
                </p>
                <p>
                  Nossa jornada é marcada pela constante busca por inovação, pela adoção de tecnologias
                  que simplificam processos e pela construção de relacionamentos de longo prazo
                  baseados na confiança e nos resultados.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} className="rounded-2xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src="/images/sobrenos.webp"
                webpSrc="/images/sobrenos.webp"
                alt="Escritório da MC Contabilidade"
                className="w-full h-full object-cover"
              />
            </ScrollReveal>
          </div>
        </section>

        {/* EQUIPE */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <p className="text-sm uppercase tracking-[0.4em] text-[#3B6EA5] dark:text-[#C6D7FF]">
                Equipe
              </p>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                Conheça nossos especialistas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Uma equipe de profissionais apaixonados e altamente qualificados, pronta para atender sua empresa.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <ScrollReveal
                  key={member.name}
                  delay={index * 120}
                  className="text-center group"
                >
                  <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <OptimizedImage
                      src={member.image.src}
                      webpSrc={member.image.webp}
                      alt={`Foto de ${member.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width={400}
                      height={400}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;