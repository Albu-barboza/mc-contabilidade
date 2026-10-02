import React from 'react';
import { Link } from 'react-router-dom';
import Monograma from '../common/Monograma';
import AssinaturaQuilha from '../common/AssinaturaQuilha';
import { SERVICOS as LISTA } from '../../data/servicos';
import { empresa } from '../../config/env';

const SERVICOS = LISTA.map((s) => ({ to: s.rota, nome: s.nome }));

const ESCRITORIO = [
  { to: '/sobre', nome: 'Sobre' },
  { to: '/faq', nome: 'Dúvidas frequentes' },
  { to: '/trabalhe-conosco', nome: 'Trabalhe conosco' },
];

// Rodapé enxuto: marca, os caminhos do site e os dados legais (quando configurados).
const Footer: React.FC = () => {
  const ano = new Date().getFullYear();
  // dados legais: só aparecem quando configurados (VITE_COMPANY_* e VITE_CONTACT_EMAIL)
  const { razaoSocial, cnpj, crc, endereco, email } = empresa;

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
          {endereco && <p className="mt-3 max-w-xs text-sm leading-relaxed text-fraco">{endereco}</p>}
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
        {/* respiro à direita: o botão flutuante "voltar ao topo" fica ali no fim da página */}
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-[var(--gutter)] py-6 text-xs text-fraco md:flex-row md:items-center md:justify-between md:pr-[calc(var(--gutter)+4rem)]">
          <p>
            © {ano} {razaoSocial || 'MC Contabilidade'}
            {cnpj ? ` · CNPJ ${cnpj}` : ''}
            {crc ? ` · ${crc}` : ''}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/politica-de-privacidade" className="hover:text-marfim">
              Privacidade
            </Link>
            <Link to="/termos-de-uso" className="hover:text-marfim">
              Termos de uso
            </Link>
            <AssinaturaQuilha classeSimbolo="text-latao-claro" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
