import React from 'react';
import Seo from '../components/common/Seo';
import CabecalhoPagina from '../components/paginas/CabecalhoPagina';
import { empresa, env } from '../config/env';
import { AVISO_DADOS_SENSIVEIS, PRAZO_CANDIDATURA, PRAZO_CONTATO } from '../config/privacidade';
import { MEDICAO_ATIVA, reverEscolha } from '../components/analytics/consentimento';

// Data da última revisão deste texto (não a data de hoje: a política só muda quando o texto muda).
const ATUALIZACAO = '30 de setembro de 2026';

// Texto revisado com base na LGPD (Lei nº 13.709/2018): arts. 6º, 7º, 8º, 9º, 18, 33, 41 e 48.
// Os dados do escritório vêm das variáveis VITE_COMPANY_* e VITE_CONTACT_EMAIL; vazios, o texto se ajusta.
const PrivacyPolicyPage: React.FC = () => {
  const { razaoSocial, cnpj, endereco, email, encarregado } = empresa;
  const temWhatsapp = Boolean(env.whatsappNumber);
  const canal = email ? (
    <>
      escreva para <a href={`mailto:${email}`}>{email}</a>
    </>
  ) : (
    'use o formulário de contato do site'
  );

  return (
    <>
      <Seo title="Política de privacidade" description="Como a MC Contabilidade trata os dados pessoais recebidos pelo site, de acordo com a LGPD." />
      <CabecalhoPagina titulo="Política de privacidade" lead="Quais dados recebemos pelo site, para que usamos e quais são os seus direitos." />

      <section className="bg-noite pb-24 md:pb-32">
        <article className="texto-corrido mx-auto px-[var(--gutter)]">
          <p>
            <strong>Última atualização:</strong> {ATUALIZACAO}.
          </p>

          <h2>1. Quem cuida dos seus dados</h2>
          <p>
            Controladora dos dados pessoais recebidos por este site: {razaoSocial || 'MC Contabilidade'}
            {cnpj ? `, CNPJ ${cnpj}` : ''}
            {endereco ? `, ${endereco}` : ''}. Esta política segue a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018, a LGPD).
          </p>
          <p>
            {encarregado ? `Encarregado pelo tratamento de dados: ${encarregado}. ` : ''}
            Para qualquer assunto de privacidade, {canal}.
          </p>

          <h2>2. Quais dados recebemos</h2>
          <p>Os que você escreve nos formulários:</p>
          <ul>
            <li>
              <strong>Contato:</strong> nome, e-mail, telefone, assunto e, se quiser, uma mensagem.
            </li>
            <li>
              <strong>Trabalhe conosco:</strong> nome, e-mail, área de interesse e, se quiser, uma mensagem sobre a sua trajetória.
            </li>
          </ul>
          <p>Para começar a conversa, não precisamos de nada além disso. {AVISO_DADOS_SENSIVEIS}</p>
          <p>
            Ao abrir o site, o seu navegador também informa o endereço IP à hospedagem (GitHub Pages) e ao Google Fonts, que o usam para entregar
            e proteger as páginas.
          </p>
          {MEDICAO_ATIVA ? (
            <p>
              Com a sua autorização, o site usa o Google Analytics para medir, de forma agregada, como as páginas são usadas. Ele grava cookies no
              seu navegador e só é ligado se você aceitar no aviso de cookies.
            </p>
          ) : (
            <p>Hoje o site não grava cookies no seu navegador.</p>
          )}
          {temWhatsapp && <p>Se você falar conosco pelo WhatsApp, a conversa também segue as regras de privacidade do próprio WhatsApp.</p>}

          <h2>3. Para que usamos e com qual base legal</h2>
          <ul>
            <li>
              <strong>Responder ao seu contato e preparar propostas</strong>, a seu pedido (art. 7º, V, da LGPD).
            </li>
            <li>
              <strong>Tirar dúvidas gerais</strong> enviadas pelo site, por legítimo interesse (art. 7º, IX).
            </li>
            <li>
              <strong>Avaliar candidaturas</strong> enviadas pelo Trabalhe conosco, a seu pedido (art. 7º, V).
            </li>
            <li>
              <strong>Cumprir obrigações legais</strong> e regulatórias (art. 7º, II).
            </li>
            {MEDICAO_ATIVA && (
              <li>
                <strong>Medir o uso do site</strong>, com o seu consentimento (art. 7º, I).
              </li>
            )}
          </ul>
          <p>Não usamos seus dados para outros fins, como propaganda. Se isso mudar, pediremos a sua autorização antes.</p>

          <h2>4. Com quem compartilhamos</h2>
          <p>Não vendemos nem trocamos dados pessoais. Estes serviços participam do funcionamento do site, todos com servidores nos Estados Unidos:</p>
          <ul>
            <li>
              <strong>Formspree:</strong> recebe as mensagens dos formulários e as entrega à equipe, atuando em nosso nome só para isso.
            </li>
            <li>
              <strong>GitHub Pages:</strong> hospeda o site.
            </li>
            <li>
              <strong>Google Fonts:</strong> entrega as letras do site.
            </li>
            {MEDICAO_ATIVA && (
              <li>
                <strong>Google Analytics:</strong> mede o uso do site, só se você aceitar.
              </li>
            )}
          </ul>
          <p>
            Por isso, seus dados saem do Brasil. O envio pelos formulários só acontece com a sua autorização, marcada no próprio formulário (art. 33,
            VIII, da LGPD).
            {email ? ' Se preferir não autorizar, fale conosco por e-mail.' : ''} Também informamos dados a autoridades quando a lei exigir.
          </p>

          <h2>5. Por quanto tempo guardamos</h2>
          <p>
            Mensagens de quem não se tornou cliente são apagadas em até {PRAZO_CONTATO}; candidaturas, em até {PRAZO_CANDIDATURA}, inclusive as cópias
            guardadas no Formspree. Se você se tornar cliente, os dados passam a seguir os prazos exigidos pela legislação contábil e fiscal.
          </p>
          {MEDICAO_ATIVA && <p>Os cookies do Google Analytics duram até 2 anos, a menos que você os apague ou mude a sua escolha.</p>}

          <h2>6. Seus direitos</h2>
          <p>Você pode pedir, de graça e a qualquer momento:</p>
          <ul>
            <li>confirmação de que tratamos os seus dados e acesso a eles;</li>
            <li>correção de dados incompletos, errados ou desatualizados;</li>
            <li>anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desacordo com a LGPD;</li>
            <li>portabilidade dos seus dados a outro fornecedor;</li>
            <li>eliminação dos dados tratados com o seu consentimento, salvo quando a lei nos obrigar a guardá-los;</li>
            <li>informação sobre com quem compartilhamos os seus dados;</li>
            <li>informação sobre a possibilidade de não dar o consentimento e sobre o que isso implica;</li>
            <li>revogação do consentimento.</li>
          </ul>
          <p>
            Você também pode se opor a um tratamento feito em desacordo com a LGPD e reclamar à Autoridade Nacional de Proteção de Dados (ANPD) ou a
            um órgão de defesa do consumidor. Para fazer um pedido, use o canal indicado no item 1.
          </p>
          {MEDICAO_ATIVA && (
            <p>
              Para mudar a sua escolha sobre cookies,{' '}
              <button
                type="button"
                onClick={reverEscolha}
                className="text-marfim underline decoration-latao/60 underline-offset-4 transition-colors hover:decoration-latao"
              >
                reveja o aviso de cookies
              </button>
              .
            </p>
          )}

          <h2>7. Segurança</h2>
          <p>
            O site usa conexão criptografada (HTTPS) e regras que impedem o carregamento de conteúdo de origens desconhecidas. Nenhum sistema é
            infalível: se acontecer um incidente de segurança que possa trazer risco ou dano relevante a você, avisaremos você e a ANPD, como manda a
            lei.
          </p>

          <h2>8. Mudanças nesta política</h2>
          <p>Se mudarmos algo importante, avisaremos em destaque nesta página, explicando o que mudou. A data no topo mostra a última atualização.</p>

          <h2>9. Contato</h2>
          <p>Para exercer os seus direitos ou tirar dúvidas sobre esta política, {canal}.</p>
        </article>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
