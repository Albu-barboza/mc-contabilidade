import React from 'react';
import { Link } from 'react-router-dom';
import Monograma from '../common/Monograma';

const SERVICOS = [
  { to: '/servicos/abertura-empresa', nome: 'Abertura de empresa' },
  { to: '/servicos/mei', nome: 'MEI' },
  { to: '/servicos/pme', nome: 'Pequenas e médias empresas' },
  { to: '/servicos/consultoria-tributaria', nome: 'Consultoria tributária' },
  { to: '/servicos/planejamento-financeiro', nome: 'Planejamento financeiro' },
];

const ESCRITORIO = [
  { to: '/sobre', nome: 'Sobre' },
  { to: '/faq', nome: 'Dúvidas frequentes' },
  { to: '/trabalhe-conosco', nome: 'Trabalhe conosco' },
];

// Rodapé enxuto: marca, os caminhos do site e os dados legais (quando configurados).
const Footer: React.FC = () => {
  const ano = new Date().getFullYear();
  const email = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;
  const cnpj = import.meta.env.VITE_COMPANY_CNPJ as string | undefined;
  const crc = import.meta.env.VITE_COMPANY_CRC as string | undefined;

  const titulo = 'text-sm font-semibold text-latao-claro';
  const link = 'text-sm text-texto transition-colors duration-300 hover:text-marfim';

  return (
    <footer className="border-t border-[color:var(--linha)] bg-noite">
      <div className="mx-auto grid max-w-6xl gap-12 px-[var(--gutter)] py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 text-marfim" aria-label="MC Contabilidade, página inicial">
            <Monograma className="h-8 w-auto text-latao-claro" />
            <span translate="no" className="whitespace-nowrap font-display text-[1.45rem] font-semibold leading-none">MC Contabilidade</span>
          </Link>
          <p className="mt-6 max-w-xs font-display text-2xl italic leading-snug text-marfim/90">Seu negócio em boas mãos.</p>
          {email && (
            <a href={`mailto:${email}`} className={`mt-6 inline-block ${link}`}>
              {email}
            </a>
          )}
        </div>
        <nav aria-label="Serviços">
          <p className={titulo}>Serviços</p>
          <ul className="mt-6 space-y-3">
            {SERVICOS.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className={link}>
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Escritório">
          <p className={titulo}>Escritório</p>
          <ul className="mt-6 space-y-3">
            {ESCRITORIO.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className={link}>
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-[color:var(--linha)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-[var(--gutter)] py-6 text-xs text-fraco md:flex-row md:items-center md:justify-between">
          <p>
            © {ano} MC Contabilidade
            {cnpj ? ` · CNPJ ${cnpj}` : ''}
            {crc ? ` · ${crc}` : ''}
          </p>
          <div className="flex gap-6">
            <Link to="/politica-de-privacidade" className="hover:text-marfim">
              Privacidade
            </Link>
            <Link to="/termos-de-uso" className="hover:text-marfim">
              Termos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
