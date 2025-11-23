
import React from 'react';
import Seo from '../components/common/Seo';

const TermsPage: React.FC = () => {
    const description =
        'Termos e condições de uso do site da MC Contabilidade. Leia sobre direitos, responsabilidades e políticas de uso.';

    return (
        <div className="text-slate-800 dark:text-slate-100">
            <Seo title="Termos de Uso | MC Contabilidade" description={description} />
            <header className="pt-28 pb-16 sm:pt-32 sm:pb-20">
                <div className="container mx-auto px-4 sm:px-6 text-center space-y-3">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-slate-50">Termos de Uso</h1>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-slate-200 max-w-3xl mx-auto">
                        Leia sobre direitos, responsabilidades e políticas de uso ao navegar pelos materiais da MC Contabilidade.
                    </p>
                </div>
            </header>
            <main className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl prose lg:prose-lg dark:prose-invert">
                    <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

                    <h2>1. Aceitação dos Termos</h2>
                    <p>Ao acessar e usar este site, você aceita e concorda em ficar vinculado pelos termos e disposições deste acordo. Além disso, ao usar estes serviços específicos, você estará sujeito a quaisquer diretrizes ou regras aplicáveis postadas.</p>

                    <h2>2. Uso do Site</h2>
                    <p>Este site e seu conteúdo são destinados apenas para fins informativos. Você concorda em não usar o site para fins ilegais ou proibidos por estes termos.</p>
                    <p>Você não pode usar o site de qualquer maneira que possa danificar, desativar, sobrecarregar ou prejudicar o site, ou interferir no uso de qualquer outra parte e gozo do site.</p>

                    <h2>3. Propriedade Intelectual</h2>
                    <p>O site e seu conteúdo original, recursos e funcionalidades são de propriedade da MC Contabilidade e são protegidos por direitos autorais internacionais, marcas registradas, patentes, segredos comerciais e outras leis de propriedade intelectual ou de direitos de propriedade.</p>

                    <h2>4. Isenção de Responsabilidade</h2>
                    <p>As informações contidas neste site são apenas para fins de informação geral. A MC Contabilidade não assume nenhuma responsabilidade por erros ou omissões no conteúdo do serviço. O conteúdo não constitui aconselhamento profissional e não deve ser considerado como tal.</p>

                    <h2>5. Limitação de Responsabilidade</h2>
                    <p>Em nenhuma circunstância a MC Contabilidade será responsável por quaisquer danos especiais, diretos, indiretos, consequenciais ou incidentais ou quaisquer danos, seja em uma ação de contrato, negligência ou outro ato ilícito, decorrentes de ou em conexão com o uso do Serviço ou o conteúdo do Serviço.</p>

                    <h2>6. Links para Outros Sites</h2>
                    <p>Nosso serviço pode conter links para sites de terceiros que não são de propriedade ou controlados pela MC Contabilidade. Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites de terceiros.</p>

                    <h2>7. Alterações aos Termos</h2>
                    <p>Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso de pelo menos 30 dias antes de quaisquer novos termos entrarem em vigor.</p>

                    <h2>8. Contato</h2>
                    <p>Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através do e-mail: contato@mccontabilidade.com.br.</p>
                </div>
            </main>
        </div>
    );
};

export default TermsPage;
