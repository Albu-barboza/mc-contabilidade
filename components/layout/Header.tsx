import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useContactForm } from '../../context/ContactFormContext';
import Monograma from '../common/Monograma';

const ITENS = [
  { path: '/servicos', nome: 'Serviços' },
  { path: '/sobre', nome: 'Sobre' },
  { path: '/faq', nome: 'Dúvidas' },
];

// Topo discreto: transparente sobre o passeio 3D da página inicial e sólido no resto do site.
const Header: React.FC = () => {
  const [aberto, setAberto] = useState(false);
  const [solido, setSolido] = useState(false);
  const { openForm } = useContactForm();
  const { pathname } = useLocation();
  const naHome = pathname === '/';

  useEffect(() => {
    const aoRolar = () => {
      const cinema = document.getElementById('inicio');
      const limite = naHome && cinema ? cinema.offsetTop + cinema.offsetHeight - 90 : 24;
      setSolido(window.scrollY > limite);
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
    return () => {
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRolar);
    };
  }, [naHome]);

  useEffect(() => setAberto(false), [pathname]);

  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = 'hidden';
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false);
    };
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aberto]);

  const transparente = naHome && !solido && !aberto;
  const linkMenu = ({ isActive }: { isActive: boolean }) =>
    `text-[.95rem] font-medium transition-colors duration-300 ${isActive ? 'text-latao-claro' : 'text-marfim/75 hover:text-marfim'}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        transparente ? 'border-b border-transparent bg-transparent' : 'border-b border-[color:var(--linha)] bg-noite/90 backdrop-blur-md'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-[var(--gutter)]">
        <Link to="/" className="flex items-center gap-3 text-marfim" aria-label="MC Contabilidade, página inicial">
          <Monograma className="h-7 w-auto text-latao-claro" />
          <span translate="no" className="whitespace-nowrap font-display text-[1.3rem] font-semibold leading-none sm:text-[1.45rem]">MC Contabilidade</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-9 md:flex" aria-label="Principal">
          {ITENS.map((i) => (
            <NavLink key={i.path} to={i.path} className={linkMenu}>
              {i.nome}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={openForm}
            className="rounded-full border border-latao/70 px-5 py-2.5 text-[.9rem] font-semibold text-latao-claro transition-colors duration-300 hover:bg-latao hover:text-noite"
          >
            Agendar conversa
          </button>
        </nav>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center text-marfim md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-celular"
          onClick={() => setAberto((v) => !v)}
        >
          <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
          <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
            {aberto ? (
              <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {aberto && (
        <div
          id="menu-celular"
          className="fixed inset-x-0 bottom-0 top-[calc(72px+env(safe-area-inset-top,0px))] overflow-y-auto overscroll-contain bg-noite px-[var(--gutter)] pb-10 pt-8 md:hidden"
        >
          <nav className="flex flex-col" aria-label="Menu">
            {[{ path: '/', nome: 'Início' }, ...ITENS, { path: '/trabalhe-conosco', nome: 'Trabalhe conosco' }].map((i) => (
              <NavLink
                key={i.path}
                to={i.path}
                end={i.path === '/'}
                className={({ isActive }) =>
                  `border-b border-[color:var(--linha)] py-5 font-display text-3xl font-medium ${isActive ? 'text-latao-claro' : 'text-marfim'}`
                }
              >
                {i.nome}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setAberto(false);
              openForm();
            }}
            className="mt-10 w-full rounded-full bg-latao py-4 text-base font-bold text-noite"
          >
            Agendar uma conversa
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
