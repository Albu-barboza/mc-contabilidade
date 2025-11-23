
import React from 'react';
import ServicePageLayout from './ServicePageLayout';

const PmePage: React.FC = () => {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Contabilidade para PME",
        "provider": {
            "@type": "AccountingService",
            "name": "MC Contabilidade"
        },
        "description": "Solução completa de contabilidade para Pequenas e Médias Empresas (PME). Oferecemos escrituração fiscal e contábil, gestão de folha de pagamento, relatórios gerenciais e consultoria estratégica.",
         "areaServed": {
            "@type": "Country",
            "name": "BR"
        }
    };

    const pageDescription =
        'Contabilidade consultiva para PMEs com gestão fiscal, folha e relatórios gerenciais para impulsionar decisões estratégicas.';

    return (
            <ServicePageLayout
                schema={serviceSchema}
                title={<>Contabilidade para <span className="text-gradient">PME</span></>}
                subtitle="A parceria estratégica que sua Pequena ou Média Empresa precisa para crescer de forma sustentável e lucrativa."
                seo={{ title: 'Contabilidade para PME', description: pageDescription }}
            >
                <h2>O que é a Contabilidade para PME?</h2>
                <p>É uma solução contábil robusta e completa, desenhada para atender às necessidades de empresas no Simples Nacional, Lucro Presumido ou Lucro Real. Vamos além da conformidade legal, oferecendo insights e relatórios que transformam a contabilidade em uma ferramenta de gestão estratégica.</p>
                
                <h2>Para quem é este serviço?</h2>
                <p>Para empresas que já passaram da fase inicial e buscam:</p>
                <ul>
                    <li>Otimizar a carga tributária de forma legal e segura.</li>
                    <li>Ter uma visão clara da saúde financeira do negócio através de balancetes e DREs.</li>
                    <li>Garantir a conformidade em todas as esferas (Federal, Estadual e Municipal).</li>
                    <li>Gerenciar a folha de pagamento e obrigações trabalhistas sem dor de cabeça.</li>
                </ul>

                <h2>Vantagens da Nossa Contabilidade para PMEs:</h2>
                <ul>
                    <li><strong>Relatórios Gerenciais:</strong> Relatórios claros e objetivos que te ajudam a entender seus números e tomar as melhores decisões.</li>
                    <li><strong>Planejamento Tributário:</strong> Análise contínua para garantir que sua empresa pague o mínimo de imposto possível, dentro da lei.</li>
                    <li><strong>Atendimento Consultivo:</strong> Um contador especialista dedicado a entender seu negócio e a tirar suas dúvidas.</li>
                    <li><strong>Tecnologia e Eficiência:</strong> Usamos as melhores ferramentas do mercado para automatizar processos e garantir a precisão das informações.</li>
                </ul>
            </ServicePageLayout>
    );
};

export default PmePage;
