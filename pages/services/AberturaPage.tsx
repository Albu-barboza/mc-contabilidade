
import React from 'react';
import ServicePageLayout from './ServicePageLayout';

const AberturaPage: React.FC = () => {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Abertura de Empresa",
        "provider": {
            "@type": "AccountingService",
            "name": "MC Contabilidade"
        },
        "description": "Abra sua empresa de forma rápida, segura e com o enquadramento tributário correto. Cuidamos de todo o processo de abertura do seu CNPJ, desde a viabilidade até o alvará de funcionamento.",
        "areaServed": {
            "@type": "Country",
            "name": "BR"
        }
    };
    const pageDescription =
        'Serviço completo de abertura de empresa em São Paulo. Escolhemos o regime ideal, cuidamos do CNPJ e entregamos tudo pronto para você começar certo.';

    return (
        <ServicePageLayout
            schema={serviceSchema}
            title={
                <>
                    Abertura de <span className="text-gradient">Empresa</span>
                </>
            }
            subtitle="Comece seu negócio com o pé direito. Cuidamos de toda a burocracia para você focar no que realmente importa: seu sucesso."
            seo={{ title: 'Abertura de empresa em São Paulo', description: pageDescription }}
        >
                <h2>Como funciona nosso serviço de Abertura de Empresa?</h2>
                <p>Nosso processo é desenhado para ser o mais simples e transparente possível para você. Ele se divide em 4 etapas principais:</p>
                <ol>
                    <li><strong>Consultoria Inicial:</strong> Conversamos com você para entender seu negócio, sócios e previsão de faturamento. Com base nisso, definimos o melhor tipo de empresa (LTDA, SLU, etc.) e o regime tributário mais econômico.</li>
                    <li><strong>Documentação:</strong> Orientamos você sobre todos os documentos necessários (seus e dos sócios) e cuidamos da elaboração do Contrato Social.</li>
                    <li><strong>Protocolo nos Órgãos:</strong> Realizamos todo o processo de registro na Junta Comercial, Receita Federal (para o CNPJ), Prefeitura (inscrição municipal) e Estado (inscrição estadual, se necessário).</li>
                    <li><strong>Entrega e Próximos Passos:</strong> Com o CNPJ em mãos, te entregamos toda a documentação e orientamos sobre os próximos passos, como a emissão de notas fiscais e certificados digitais.</li>
                </ol>
                
                <h2>Vantagens de abrir sua empresa conosco:</h2>
                <ul>
                    <li><strong>Economia de Impostos desde o Início:</strong> A escolha correta do regime tributário pode gerar uma economia significativa. Nossa análise garante a melhor decisão.</li>
                    <li><strong>Agilidade:</strong> Conhecemos os trâmites e usamos sistemas integrados para acelerar o processo.</li>
                    <li><strong>Segurança Jurídica:</strong> Elaboramos um Contrato Social sólido que protege você e seus sócios.</li>
                    <li><strong>Zero Burocracia:</strong> Você não precisa se preocupar com formulários, taxas ou idas a repartições públicas. Cuidamos de tudo.</li>
                </ul>
        </ServicePageLayout>
    );
};

export default AberturaPage;
