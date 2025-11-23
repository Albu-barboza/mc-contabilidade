
import React from 'react';
import ServicePageLayout from './ServicePageLayout';

const PlanejamentoPage: React.FC = () => {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Planejamento Financeiro Empresarial",
        "provider": {
            "@type": "AccountingService",
            "name": "MC Contabilidade"
        },
        "description": "Análise de DRE, fluxo de caixa, projeções e indicadores de performance (KPIs) para garantir o crescimento sustentável e a lucratividade do seu negócio. Tenha clareza e controle sobre suas finanças.",
        "areaServed": {
            "@type": "Country",
            "name": "BR"
        }
    };
    const pageDescription =
        'Terceirize o financeiro com BPO completo: fluxo de caixa, DRE gerencial, projeções e KPIs para decisões precisas.';

    return (
            <ServicePageLayout
                schema={serviceSchema}
                title={<>Planejamento <span className="text-gradient">Financeiro</span></>}
                subtitle="Tenha total clareza sobre seus números e tome decisões baseadas em dados, não em suposições. O caminho para a lucratividade começa aqui."
                seo={{ title: 'Planejamento e BPO financeiro', description: pageDescription }}
            >
                <h2>Você sabe para onde o dinheiro da sua empresa está indo?</h2>
                <p>Muitos empreendedores se sentem perdidos em meio a planilhas e extratos bancários. O Planejamento Financeiro, também conhecido como BPO Financeiro ou Terceirização Financeira, é o serviço que organiza, analisa e projeta as finanças do seu negócio, te dando o controle e a visão estratégica que você precisa.</p>
                
                <h2>Como nosso Planejamento Financeiro funciona?</h2>
                <p>Atuamos como o departamento financeiro da sua empresa, cuidando de tarefas essenciais e gerando insights valiosos:</p>
                <ul>
                    <li><strong>Gestão de Contas a Pagar e a Receber:</strong> Organizamos todos os seus compromissos e recebimentos, garantindo que nada seja esquecido.</li>
                    <li><strong>Conciliação Bancária:</strong> Verificamos se tudo o que entrou e saiu do seu banco bate com seus registros.</li>
                    <li><strong>Análise de Fluxo de Caixa:</strong> Mostramos a movimentação do seu dinheiro, identificando gargalos e oportunidades.</li>
                    <li><strong>Elaboração de DRE Gerencial:</strong> Criamos um relatório claro que mostra se sua empresa está dando lucro ou prejuízo e onde é possível melhorar.</li>
                    <li><strong>Definição de KPIs:</strong> Juntos, definimos os indicadores chave (como margem de lucro, ponto de equilíbrio, ticket médio) para acompanhar a saúde do negócio.</li>
                </ul>
                
                <h2>Benefícios para sua empresa:</h2>
                <ul>
                    <li><strong>Visão Clara do Negócio:</strong> Saiba exatamente sua lucratividade, suas principais despesas e a saúde do seu caixa.</li>
                    <li><strong>Mais Tempo para Você:</strong> Deixe a parte operacional conosco e foque na estratégia e no crescimento da sua empresa.</li>
                    <li><strong>Decisões Assertivas:</strong> Baseie seus próximos passos em relatórios e projeções confiáveis.</li>
                    <li><strong>Previsibilidade:</strong> Tenha projeções de faturamento e despesas para se planejar e evitar surpresas.</li>
                </ul>
            </ServicePageLayout>
    );
};

export default PlanejamentoPage;
