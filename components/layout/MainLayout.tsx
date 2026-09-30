import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsappFloat from '../common/WhatsappFloat';
import ScrollToTopButton from '../common/ScrollToTopButton';
import ContactModal from '../common/ContactModal';
import AvisoCookies from '../analytics/AvisoCookies';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-noite font-sans text-texto">
      <a
        href="#conteudo"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('conteudo')?.focus();
        }}
        className="fixed left-4 top-[-80px] z-[60] rounded-full bg-latao px-5 py-3 text-sm font-bold text-noite focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <AvisoCookies />
      <Header />
      <main id="conteudo" tabIndex={-1} className="relative z-10 focus:outline-none">
        {children}
      </main>
      <Footer />
      <WhatsappFloat />
      <ScrollToTopButton />
      <ContactModal />
    </div>
  );
};

export default MainLayout;
