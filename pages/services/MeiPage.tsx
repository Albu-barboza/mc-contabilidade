
import React from 'react';
import ServicePageLayout from './ServicePageLayout';

const MeiPage: React.FC = () => {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Contabilidade para MEI",
        "provider": {
            "@type": "AccountingService",
            "name": "MC Contabilidade"
        },
        "description": "Serviço completo de contabilidade para Microempreendedor Individual (MEI). Cuidamos da sua Declaração Anual (DASN-SIMEI), emissão de guias e fornecemos todo o suporte para você focar no seu negócio.",
        "areaServed": {
            "@type": "Country",
            "name": "BR"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços Contábeis MEI",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Entrega da DASN-SIMEI" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Emissão de guia DAS mensal" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Suporte para emissão de Nota Fiscal" } }
            ]
        }
    };
    
    const pageDescription =
        'Contabilidade completa para MEI: DAS, declaração anual, orientação de notas fiscais e suporte para quando for hora de crescer.';

    return (
            <ServicePageLayout
                schema={serviceSchema}
                title={<>Contabilidade para <span className="text-gradient">MEI</span></>}
                subtitle="Foque no seu talento, deixe a burocracia com a gente. Contabilidade completa e acessível para o Microempreendedor Individual."
                seo={{ title: 'Contabilidade especializada para MEI', description: pageDescription }}
            >
                <h2>O que é a Contabilidade para MEI?</h2>
                <p>É um serviço especializado que cuida de todas as obrigações fiscais e contábeis do Microempreendedor Individual. Embora o MEI tenha um regime simplificado, existem responsabilidades anuais e mensais que, se não cumpridas, podem gerar multas e até o cancelamento do CNPJ.</p>
                
                <h2>Para quem é este serviço?</h2>
                <p>Este serviço é ideal para todos os MEIs que desejam:</p>
                <ul>
                    <li>Ter a certeza de que estão em dia com o Fisco.</li>
                    <li>Receber orientação sobre o limite de faturamento e o momento certo de migrar para Microempresa (ME).</li>
                    <li>Ter suporte para emitir Notas Fiscais de serviço ou venda.</li>
                    <li>Garantir o acesso a benefícios previdenciários como aposentadoria e auxílio-doença.</li>
                </ul>

                <h2>Vantagens de ter um contador para seu MEI</h2>
                <ul>
                    <li><strong>Tranquilidade:</strong> Nunca mais se preocupe com a data de entrega da Declaração Anual.</li>
                    <li><strong>Segurança:</strong> Evite erros que podem levar a multas e problemas com a Receita Federal.</li>
                    <li><strong>Planejamento:</strong> Receba orientação profissional sobre o crescimento do seu negócio e a transição para ME.</li>
                    <li><strong>Foco no que importa:</strong> Libere seu tempo para se dedicar ao seu negócio e seus clientes.</li>
                </ul>

                <h2>Nossos Serviços para MEI Incluem:</h2>
                <ul>
                    <li>Emissão mensal da guia de imposto (DAS-MEI).</li>
                    <li>Elaboração e entrega da Declaração Anual de Faturamento (DASN-SIMEI).</li>
                    <li>Controle de faturamento para não exceder o limite.</li>
                    <li>Orientação para emissão de Notas Fiscais.</li>
                    <li>Suporte para desenquadramento e migração para ME.</li>
                    <li>Atendimento rápido via WhatsApp e email.</li>
                </ul>
            </ServicePageLayout>
    );
};

export default MeiPage;
