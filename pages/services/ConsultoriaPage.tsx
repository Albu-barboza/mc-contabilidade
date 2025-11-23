
import React from 'react';
import ServicePageLayout from './ServicePageLayout';

const ConsultoriaPage: React.FC = () => {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Consultoria Tributária",
        "provider": {
            "@type": "AccountingService",
            "name": "MC Contabilidade"
        },
        "description": "Serviço de consultoria e planejamento tributário para reduzir legalmente a carga de impostos da sua empresa. Analisamos seu regime tributário e identificamos oportunidades de economia.",
        "areaServed": {
            "@type": "Country",
            "name": "BR"
        }
    };
    const pageDescription =
        'Consultoria e planejamento tributário para reduzir impostos legalmente, recuperar créditos e manter sua empresa em conformidade.';

    return (
            <ServicePageLayout
                schema={serviceSchema}
                title={<>Consultoria <span className="text-gradient">Tributária</span></>}
                subtitle="Pague menos impostos de forma inteligente e 100% legal. Transforme a complexidade tributária em vantagem competitiva."
                seo={{ title: 'Consultoria e planejamento tributário', description: pageDescription }}
            >
                <h2>Sua empresa pode estar pagando mais impostos do que deveria.</h2>
                <p>A legislação tributária brasileira é uma das mais complexas do mundo. Sem um acompanhamento especializado, é muito comum que empresas acabem pagando impostos indevidos ou deixem de aproveitar benefícios fiscais. Nossa consultoria atua exatamente nesse ponto.</p>
                
                <h2>O que fazemos na Consultoria Tributária?</h2>
                <ul>
                    <li><strong>Planejamento Tributário:</strong> Realizamos um diagnóstico completo da sua operação para definir o regime tributário mais vantajoso (Simples Nacional, Lucro Presumido ou Lucro Real), resultando em economia imediata e futura.</li>
                    <li><strong>Revisão Fiscal:</strong> Analisamos os impostos pagos nos últimos 5 anos em busca de créditos não aproveitados ou pagamentos a maior, que podem ser recuperados.</li>
                    <li><strong>Compliance e Gestão de Riscos:</strong> Garantimos que sua empresa esteja em total conformidade com as obrigações fiscais, evitando multas e autuações.</li>
                    <li><strong>Consultoria Estratégica:</strong> Oferecemos suporte em decisões importantes, como a abertura de filiais, lançamento de novos produtos ou M&A, analisando o impacto tributário de cada movimento.</li>
                </ul>
                
                <h2>Resultados que você pode esperar:</h2>
                <ul>
                    <li><strong>Redução da Carga Tributária:</strong> Encontramos o caminho mais econômico para sua empresa operar dentro da lei.</li>
                    <li><strong>Fluxo de Caixa Otimizado:</strong> A recuperação de créditos pode injetar um capital inesperado no seu caixa.</li>
                    <li><strong>Segurança e Tranquilidade:</strong> Tenha a certeza de que sua empresa está protegida contra riscos fiscais.</li>
                    <li><strong>Decisões Mais Inteligentes:</strong> Use a variável tributária a seu favor no planejamento estratégico do negócio.</li>
                </ul>
            </ServicePageLayout>
    );
};

export default ConsultoriaPage;
