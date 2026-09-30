import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import CabecalhoPagina from '../components/paginas/CabecalhoPagina';
import { empresa } from '../config/env';

// Data da última revisão deste texto (não a data de hoje).
const ATUALIZACAO = '30 de setembro de 2026';

// Texto revisado com base no Código de Defesa do Consumidor (arts. 25, 46, 51 e 101) e no Decreto 7.962/2013.
const TermsPage: React.FC = () => {
  const { razaoSocial, cnpj, crc, endereco, email } = empresa;
  const responsavel = [razaoSocial || 'MC Contabilidade', cnpj && `CNPJ ${cnpj}`, crc, endereco].filter(Boolean).join(', ');

  return (
    <>
      <Seo title="Termos de uso" description="As regras de uso do site da MC Contabilidade." />
      <CabecalhoPagina titulo="Termos de uso" lead="As regras de uso deste site, em poucas palavras." />

      <section className="bg-noite pb-24 md:pb-32">
        <article className="texto-corrido mx-auto px-[var(--gutter)]">
          <p>
            <strong>Última atualização:</strong> {ATUALIZACAO}.
          </p>

          <h2>1. Quem somos</h2>
          <p>
            Responsável por este site: {responsavel}.
            {email ? (
              <>
                {' '}
                E-mail: <a href={`mailto:${email}`}>{email}</a>.
              </>
            ) : null}
          </p>

          <h2>2. Aceitação</h2>
          <p>Ao usar este site, você concorda com estes termos. Eles não limitam nenhum direito que a lei garante a você.</p>

          <h2>3. Para que serve o site</h2>
          <p>
            Apresentar a MC Contabilidade e os seus serviços. O conteúdo é informativo e geral: não substitui a análise do seu caso por um
            profissional.
          </p>
          <p>Enviar um formulário não contrata nenhum serviço. A contratação só acontece com proposta aceita e contrato assinado.</p>

          <h2>4. Uso adequado</h2>
          <p>
            Não use o site para fins ilegais, nem de forma que possa danificar, sobrecarregar ou prejudicar o funcionamento dele ou o uso por
            outras pessoas.
          </p>

          <h2>5. Propriedade intelectual</h2>
          <p>Textos, marca, logotipo e elementos visuais são da MC Contabilidade ou usados sob licença. Não copie sem autorização.</p>

          <h2>6. Responsabilidade</h2>
          <p>
            Cuidamos para manter as informações corretas e atualizadas, mas a legislação muda com frequência. Decisões fiscais e contábeis devem
            ser tomadas com orientação profissional para o seu caso.
          </p>

          <h2>7. Links para outros sites</h2>
          <p>O site pode ter links para páginas de terceiros. Não controlamos o conteúdo nem as políticas desses sites.</p>

          <h2>8. Dados pessoais</h2>
          <p>
            O tratamento dos dados enviados pelos formulários está descrito na <Link to="/politica-de-privacidade">política de privacidade</Link>.
          </p>

          <h2>9. Lei aplicável</h2>
          <p>Vale a lei brasileira. Se você for consumidor, pode resolver qualquer questão no foro da sua cidade.</p>

          <h2>10. Mudanças nestes termos</h2>
          <p>Se mudarmos algo importante, avisaremos em destaque nesta página. A data no topo mostra a última atualização.</p>

          <h2>11. Contato</h2>
          <p>
            Dúvidas sobre estes termos:{' '}
            {email ? (
              <>
                escreva para <a href={`mailto:${email}`}>{email}</a>
              </>
            ) : (
              'use o formulário de contato do site'
            )}
            .
          </p>
        </article>
      </section>
    </>
  );
};

export default TermsPage;
