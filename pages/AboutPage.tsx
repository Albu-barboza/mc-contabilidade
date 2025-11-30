import React from 'react';
import JsonLd from '../components/common/JsonLd';
import OptimizedImage from '../components/common/OptimizedImage';
import Seo from '../components/common/Seo';
import ScrollReveal from '../components/common/ScrollReveal';
import Card from '../components/common/Card';
import Section from '../components/common/Section';

const teamMembers = [
  { name: 'Pessoa 1', role: 'Contabilidade', image: { src: '/images/team/icone.webp', webp: '/images/team/icone.webp' } },
  { name: 'Pessoa 2', role: 'Fiscal e Tributario', image: { src: '/images/team/icone.webp', webp: '/images/team/icone.webp' } },
  { name: 'Pessoa 3', role: 'Especialista PME', image: { src: '/images/team/icone.webp', webp: '/images/team/icone.webp' } },
  { name: 'Pessoa 4', role: 'Abertura de Empresas', image: { src: '/images/team/icone.webp', webp: '/images/team/icone.webp' } },
];

const AboutPage: React.FC = () => {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Sobre a MC Contabilidade",
    "description": "Informacoes institucionais em revisao. Conteudo sera atualizado com dados confirmados.",
    "mainEntity": {
      "@type": "AccountingService",
      "name": "MC Contabilidade",
      "areaServed": "BR",
      "address": "Atendimento 100% online (em atualizacao)"
    }
  };

  const description =
    'Conheca a historia, valores e time da MC Contabilidade. Todas as informacoes estao em revisao para o proximo ciclo de atualizacoes.';

  return (
    <>
      <Seo title="Sobre a MC Contabilidade" description={description} />
      <JsonLd schema={aboutPageSchema} />
      <div className="">
        {/* HERO */}
        <section className="pt-28 pb-16 sm:pt-32 sm:pb-20">
          <ScrollReveal className="container mx-auto px-4 sm:px-6 text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100">
              Transformando numeros em <span className="text-gradient">oportunidades</span>.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Somos parceiros dedicados a simplificar a rotina contabile e fiscal de quem empreende. Esta pagina esta em atualizacao para refletir nosso proximo ciclo de servicos.
            </p>
          </ScrollReveal>
        </section>

        {/* MISSAO / VISAO / VALORES */}
        <Section
          title="Historia em atualizacao"
          sectionClassName="!py-16 sm:!py-24"
          containerClassName="!px-4 sm:!px-6"
          headerWrapper={() => (
            <ScrollReveal className="max-w-3xl mx-auto text-center mb-14 space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-secondary dark:text-[#C6D7FF]">
                Essencia MC Contabilidade
              </p>
              <p className="text-sm uppercase tracking-[0.4em] text-secondary dark:text-[#C6D7FF] mb-3">
                Nossa historia
              </p>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
                Jornada em revisao
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Estamos revisando nossa cronologia e dados institucionais para garantir informacoes atualizadas e transparentes.
                </p>
                <p>
                  Enquanto isso, seguimos focados em atendimento humano e processos claros para MEI e PME, em operacao 100% online.
                </p>
              </div>
            </ScrollReveal>
          )}
        >
          <ScrollReveal delay={150} className="rounded-2xl overflow-hidden shadow-2xl">
            <OptimizedImage
              src="/images/sobrenos.webp"
              webpSrc="/images/sobrenos.webp"
              alt="Escritorio da MC Contabilidade"
              className="w-full h-full object-cover"
            />
          </ScrollReveal>
        </Section>

        {/* EQUIPE */}
        <Section
          title="Conheca nossos especialistas"
          sectionClassName="!py-16 sm:!py-24"
          containerClassName="!px-4 sm:!px-6"
          headerWrapper={() => (
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <p className="text-sm uppercase tracking-[0.4em] text-secondary dark:text-[#C6D7FF]">
                Equipe
              </p>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                Pessoas cuidando de pessoas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Time dedicado a orientar com clareza. Informacoes de trajetoria e certificacoes em atualizacao.
              </p>
            </ScrollReveal>
          )}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal
                key={member.name}
                delay={index * 120}
                className="h-full"
              >
                <Card variant="glass" className="h-full text-center group" hoverEffect={true}>
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
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
};

export default AboutPage;
