
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
        "description": "Abertura de empresa com orientacao de enquadramento e acompanhamento online. Informacoes de prazos em atualizacao.",
        "areaServed": {
            "@type": "Country",
            "name": "BR"
        }
    };
    const pageDescription =
        'Servico de abertura de empresa com checklist de documentos e orientacao sobre regime tributario. Conteudo em revisao.';

    return (
        <ServicePageLayout
            schema={serviceSchema}
            title={
                <>
                    Abertura de <span className="text-gradient">Empresa</span>
                </>
            }
            subtitle="Comece seu negocio com o pe direito. Cuidamos da orientacao e do fluxo de documentos para voce focar no que importa."
            seo={{ title: 'Abertura de empresa (em atualizacao)', description: pageDescription }}
        >
                <h2>Como funciona nosso servico de Abertura de Empresa?</h2>
                <p>Nosso processo e desenhado para ser simples e transparente. Ele se divide em quatro etapas principais:</p>
                <ol>
                    <li><strong>Consultoria Inicial:</strong> Conversamos para entender o negocio, socios e previsao de faturamento. Com base nisso, indicamos o tipo de empresa e o regime tributario.</li>
                    <li><strong>Documentacao:</strong> Orientamos sobre os documentos necessarios e preparamos os materiais de abertura.</li>
                    <li><strong>Protocolo:</strong> Enviamos os pedidos de registro nos orgaos competentes e acompanhamos os retornos.</li>
                    <li><strong>Entrega e proximos passos:</strong> Com o CNPJ ativo, entregamos a documentacao e orientamos sobre emissao de notas e certificados.</li>
                </ol>
                
                <h2>O que voce encontra neste servico</h2>
                <ul>
                    <li><strong>Enquadramento orientado:</strong> Escolha do regime tributario alinhada ao contexto do negocio.</li>
                    <li><strong>Acompanhamento online:</strong> Atualizacoes sobre o andamento do processo.</li>
                    <li><strong>Clareza juridica:</strong> Contrato Social estruturado para proteger os socios.</li>
                    <li><strong>Sem burocracia:</strong> Simplificamos formulários e tramitacoes.</li>
                </ul>
        </ServicePageLayout>
    );
};

export default AberturaPage;
