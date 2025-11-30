import React from 'react';
import Seo from '../components/common/Seo';
import ScrollReveal from '../components/common/ScrollReveal';

const PrivacyPolicyPage: React.FC = () => {
    const description =
        'Entenda como a MC Contabilidade trata seus dados pessoais. Conteudo em revisao para o proximo ciclo de atualizacao.';

    return (
        <div className="text-slate-800 dark:text-slate-100">
            <Seo title="Politica de Privacidade | MC Contabilidade" description={description} />
            <header className="pt-28 pb-16 sm:pt-32 sm:pb-20">
                <ScrollReveal className="container mx-auto px-4 sm:px-6 text-center space-y-3">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-slate-50">Politica de Privacidade</h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-slate-200 max-w-3xl mx-auto">
                        Transparencia sobre como tratamos seus dados nos formularios, atendimentos e materiais da MC Contabilidade. Texto em atualizacao.
                    </p>
                </ScrollReveal>
            </header>
            <main className="py-16 sm:py-24">
                <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-4xl prose lg:prose-lg dark:prose-invert">
                    <p><strong>Ultima atualizacao:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

                    <h2>1. Introducao</h2>
                    <p>A MC Contabilidade ("nos", "nosso") esta empenhada em proteger a sua privacidade. Esta Politica explica como coletamos, usamos e guardamos suas informacoes.</p>

                    <h2>2. Coleta de Informacoes</h2>
                    <p>Coletamos informacoes pessoais que voce nos fornece voluntariamente ao preencher o formulario de contato ou se inscrever em nossa newsletter. As informacoes podem incluir:</p>
                    <ul>
                        <li>Nome completo</li>
                        <li>Endereco de e-mail</li>
                        <li>Numero de telefone</li>
                        <li>Informacoes sobre sua empresa e servico de interesse</li>
                    </ul>
                    <p>Tambem podemos coletar informacoes nao pessoais, como tipo de navegador, sistema operacional e informacoes de uso do site.</p>

                    <h2>3. Uso das Informacoes</h2>
                    <p>Usamos as informacoes coletadas para:</p>
                    <ul>
                        <li>Responder as suas solicitacoes de contato e propostas.</li>
                        <li>Enviar comunicacoes relevantes quando voce autorizar.</li>
                        <li>Melhorar nosso site e servicos.</li>
                        <li>Cumprir obrigacoes legais e regulatorias.</li>
                    </ul>

                    <h2>4. Compartilhamento de Informacoes</h2>
                    <p>Nao vendemos ou trocamos suas informacoes pessoais. Parceiros que apoiam a operacao podem ter acesso, desde que concordem em manter confidencialidade.</p>

                    <h2>5. Seguranca das Informacoes</h2>
                    <p>Aplicamos medidas razoaveis de seguranca para proteger seus dados. Nenhum metodo e totalmente infalivel, por isso revisamos continuamente nossos controles.</p>

                    <h2>6. Seus Direitos</h2>
                    <p>Voce pode acessar, corrigir ou solicitar a remocao de suas informacoes pessoais. Para exercer esses direitos, entre em contato conosco.</p>

                    <h2>7. Alteracoes a Esta Politica</h2>
                    <p>Podemos atualizar esta Politica de Privacidade periodicamente. Manteremos a data de revisao ajustada quando ocorrerem mudancas.</p>

                    <h2>8. Contato</h2>
                    <p>Se tiver alguma duvida, escreva para <strong>E-mail: em atualizacao</strong>.</p>
                </ScrollReveal>
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
