import React from 'react';
import Seo from '../components/common/Seo';
import ScrollReveal from '../components/common/ScrollReveal';

const TermsPage: React.FC = () => {
    const description =
        'Termos e condicoes de uso do site da MC Contabilidade. Conteudo em revisao e sujeito a ajustes.';

    return (
        <div className="text-slate-800 dark:text-slate-100">
            <Seo title="Termos de Uso | MC Contabilidade" description={description} />
            <header className="pt-28 pb-16 sm:pt-32 sm:pb-20">
                <ScrollReveal className="container mx-auto px-4 sm:px-6 text-center space-y-3">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-slate-50">Termos de Uso</h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-slate-200 max-w-3xl mx-auto">
                        Leia sobre direitos, responsabilidades e politicas de uso. Informacoes em atualizacao.
                    </p>
                </ScrollReveal>
            </header>
            <main className="py-16 sm:py-24">
                <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-4xl prose lg:prose-lg dark:prose-invert">
                    <p><strong>Ultima atualizacao:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

                    <h2>1. Aceitacao dos Termos</h2>
                    <p>Ao acessar e usar este site, voce aceita e concorda em seguir estes termos. Caso algum ponto esteja em desacordo, interrompa o uso.</p>

                    <h2>2. Uso do Site</h2>
                    <p>Este site e seu conteudo sao destinados apenas para fins informativos. Voce concorda em nao usar o site para fins ilegais ou proibidos por estes termos.</p>
                    <p>Evite qualquer uso que possa danificar, desativar, sobrecarregar ou prejudicar o site, ou interferir no uso de qualquer outra pessoa.</p>

                    <h2>3. Propriedade Intelectual</h2>
                    <p>O site e seu conteudo original, recursos e funcionalidades sao de propriedade da MC Contabilidade e protegidos por leis aplicaveis.</p>

                    <h2>4. Isencao de Responsabilidade</h2>
                    <p>As informacoes contidas neste site sao apenas para fins informativos. A MC Contabilidade nao assume responsabilidade por erros ou omissoes. O conteudo nao constitui aconselhamento profissional.</p>

                    <h2>5. Limitacao de Responsabilidade</h2>
                    <p>A MC Contabilidade nao sera responsavel por quaisquer danos especiais, diretos, indiretos ou consequenciais decorrentes do uso do servico ou do conteudo do servico.</p>

                    <h2>6. Links para Outros Sites</h2>
                    <p>Podemos exibir links para sites de terceiros. Nao temos controle e nao assumimos responsabilidade pelo conteudo ou politicas desses sites.</p>

                    <h2>7. Alteracoes aos Termos</h2>
                    <p>Podemos modificar estes Termos a qualquer momento. Quando houver mudancas relevantes, ajustaremos a data de atualizacao.</p>

                    <h2>8. Contato</h2>
                    <p>Duvidas? Escreva para <strong>E-mail: em atualizacao</strong>.</p>
                </ScrollReveal>
            </main>
        </div>
    );
};

export default TermsPage;
