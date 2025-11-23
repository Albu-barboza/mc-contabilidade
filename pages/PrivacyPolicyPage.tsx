
import React from 'react';
import Seo from '../components/common/Seo';
import ScrollReveal from '../components/common/ScrollReveal';

const PrivacyPolicyPage: React.FC = () => {
    const description =
        'Entenda como a MC Contabilidade coleta, utiliza e protege seus dados pessoais em todos os nossos canais de atendimento.';

    return (
        <div className="text-slate-800 dark:text-slate-100">
            <Seo title="Política de Privacidade | MC Contabilidade" description={description} />
            <header className="pt-28 pb-16 sm:pt-32 sm:pb-20">
                <ScrollReveal className="container mx-auto px-4 sm:px-6 text-center space-y-3">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-slate-50">Política de Privacidade</h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-slate-200 max-w-3xl mx-auto">
                        Transparência sobre como tratamos seus dados nos formulários, atendimentos e materiais da MC Contabilidade.
                    </p>
                </ScrollReveal>
            </header>
            <main className="py-16 sm:py-24">
                <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-4xl prose lg:prose-lg dark:prose-invert">
                    <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

                    <h2>1. Introdução</h2>
                    <p>A MC Contabilidade ("nós", "nosso") está empenhada em proteger a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e salvaguardamos as suas informações quando você visita nosso site.</p>

                    <h2>2. Coleta de Informações</h2>
                    <p>Coletamos informações pessoais que você nos fornece voluntariamente ao preencher o formulário de contato ou se inscrever em nossa newsletter. As informações podem incluir:</p>
                    <ul>
                        <li>Nome completo</li>
                        <li>Endereço de e-mail</li>
                        <li>Número de telefone</li>
                        <li>Informações sobre sua empresa e serviço de interesse</li>
                    </ul>
                    <p>Também podemos coletar informações não pessoais, como tipo de navegador, sistema operacional e informações de uso do site através de cookies.</p>

                    <h2>3. Uso das Informações</h2>
                    <p>Usamos as informações coletadas para:</p>
                    <ul>
                        <li>Responder às suas solicitações de contato e propostas.</li>
                        <li>Enviar e-mails de marketing e newsletters, caso você opte por recebê-los.</li>
                        <li>Melhorar nosso site e serviços.</li>
                        <li>Cumprir obrigações legais e regulatórias.</li>
                    </ul>

                    <h2>4. Compartilhamento de Informações</h2>
                    <p>Não vendemos, trocamos ou transferimos para terceiros as suas informações pessoalmente identificáveis. Isso não inclui parceiros de confiança que nos auxiliam na operação do nosso site ou na condução dos nossos negócios, desde que essas partes concordem em manter essas informações confidenciais.</p>

                    <h2>5. Segurança das Informações</h2>
                    <p>Implementamos uma variedade de medidas de segurança para manter a segurança de suas informações pessoais. Seus dados são armazenados em redes seguras e são acessíveis apenas por um número limitado de pessoas que têm direitos de acesso especiais a tais sistemas.</p>

                    <h2>6. Seus Direitos</h2>
                    <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Você também pode optar por não receber nossas comunicações de marketing. Para exercer esses direitos, entre em contato conosco.</p>

                    <h2>7. Alterações a Esta Política</h2>
                    <p>Podemos atualizar esta Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações, publicando a nova Política de Privacidade nesta página.</p>

                    <h2>8. Contato</h2>
                    <p>Se tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do e-mail: contato@mccontabilidade.com.br.</p>
                </ScrollReveal>
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
