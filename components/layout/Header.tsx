import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { useContactForm } from '../../context/ContactFormContext';

const Header: React.FC<{ onMobileMenuToggle?: (isOpen: boolean) => void }> = ({ onMobileMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollPositionRef = useRef(0);
  const { openForm } = useContactForm();
  const location = useLocation();

  // Detect if we're on the Careers page
  const isCareersPage = location.pathname === '/carreiras';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    onMobileMenuToggle?.(isMenuOpen);
  }, [isMenuOpen, onMobileMenuToggle]);

  useEffect(() => {
    const html = document.documentElement;

    if (isMenuOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      html.style.overscrollBehavior = 'contain';
    } else {
      const scrollY = scrollPositionRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      html.style.overscrollBehavior = '';
      window.scrollTo(0, scrollY);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, []);

  const navItems = [
    { path: '/', name: 'Início' },
    { path: '/sobre', name: 'Sobre Nós' },
    { path: '/servicos', name: 'Serviços' },
    { path: '/depoimentos', name: 'Depoimentos' },
    { path: '/faq', name: 'FAQ' }
  ];
  const mobileMenuId = 'mobile-menu';
  const mobileMenuToggleLabel = isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação';

  // Dynamic nav colors based on page and scroll state
  const navLinkClasses = isCareersPage && !isScrolled
    ? 'text-sm font-medium relative py-2 transition-colors text-white/90 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-white after:w-0 hover:text-white hover:after:w-full'
    : 'text-sm font-medium relative py-2 transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#1F3A5F] after:w-0 hover:text-[#1F3A5F] dark:hover:text-[#C6D7FF] hover:after:w-full';

  const activeLinkClasses = isCareersPage && !isScrolled
    ? 'text-white after:w-full'
    : 'text-[#1F3A5F] dark:text-[#C6D7FF] after:w-full';

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg'
        : 'h-24 bg-transparent shadow-none'
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
        <Link to="/" className={`flex items-center gap-1 text-xl font-bold transition-colors ${isCareersPage && !isScrolled
          ? 'text-white'
          : 'text-gray-800 dark:text-white'
          }`}>
          <img
            src={isCareersPage && !isScrolled ? "/images/logo 1 (2).png" : "/images/logo.png"}
            alt="MC Contabilidade Logo"
            className="h-16 w-auto dark:hidden"
          />
          <img
            src="/images/logo 1 (2).png"
            alt="MC Contabilidade Logo"
            className="h-16 w-auto hidden dark:inline-block"
          />
          <span className="ml-1">MC Contabilidade</span>
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${navLinkClasses} ${isActive ? activeLinkClasses : 'text-gray-700 dark:text-[#C6D7FF]'}`
                }
                end={item.path === '/'}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={openForm}
              className="px-5 py-3 bg-gradient-to-r from-[#1F3A5F] to-[#2E4F7E] text-white rounded-lg font-semibold shadow-md shadow-[#1F3A5F]/25 hover:shadow-lg transition"
            >
              Fale Conosco
            </button>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* BOTÃO HAMBÚRGUER – MOBILE */}
        <button
          type="button"
          className={`
            lg:hidden group relative z-[65] inline-flex items-center justify-center
            w-11 h-11 rounded-2xl
            bg-white/90 dark:bg-slate-900/85
            border border-slate-200/80 dark:border-white/15
            shadow-md shadow-slate-900/10
            backdrop-blur-md
            transition-all duration-300
            hover:-translate-y-0.5 hover:shadow-xl
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[#1F3A5F]
            focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900
          `}
          aria-label={mobileMenuToggleLabel}
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          aria-controls={mobileMenuId}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">{mobileMenuToggleLabel}</span>
          <span className="relative flex w-6 h-6 items-center justify-center">
            <span
              className={`
                absolute w-full h-[2px] rounded-full
                bg-slate-900 dark:bg-slate-100
                transition-all duration-300 ease-out
                ${isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[7px]'}
              `}
            />
            <span
              className={`
                absolute w-full h-[2px] rounded-full
                bg-slate-900 dark:bg-slate-100
                transition-all duration-300 ease-out
                ${isMenuOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'}
              `}
            />
            <span
              className={`
                absolute w-full h-[2px] rounded-full
                bg-slate-900 dark:bg-slate-100
                transition-all duration-300 ease-out
                ${isMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-[7px]'}
              `}
            />
          </span>
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id={mobileMenuId}
          className="lg:hidden fixed inset-0 z-[70] bg-slate-950/95 text-white flex flex-col animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal de navegação"
        >
          <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2 text-xl font-semibold" onClick={closeMenu}>
              <img src="/images/logo.png" alt="MC Contabilidade Logo" className="h-12" />
              <span>MC Contabilidade</span>
            </Link>
            <button
              type="button"
              aria-label="Fechar menu móvel"
              className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-2xl transition hover:bg-white/10"
              onClick={closeMenu}
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col items-stretch text-center gap-8 overscroll-contain">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Navegue</p>
              <ul className="space-y-3 text-lg font-semibold">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `${isActive
                          ? 'text-white bg-white/5'
                          : 'text-white/75 hover:text-white hover:bg-white/5'
                        } block rounded-2xl py-3 text-base tracking-wide transition-colors`
                      }
                      onClick={closeMenu}
                      end={item.path === '/'}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                openForm();
                closeMenu();
              }}
              className="block w-full rounded-2xl bg-gradient-to-r from-[#1F3A5F] to-[#2E4F7E] text-white font-semibold py-3 shadow-lg shadow-[#1F3A5F]/30 hover:shadow-xl transition"
            >
              Fale Conosco
            </button>

            <div className="pt-4 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
