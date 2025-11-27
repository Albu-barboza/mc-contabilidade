import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsappFloat from '../common/WhatsappFloat';
import ScrollToTopButton from '../common/ScrollToTopButton';
import ContactModal from '../common/ContactModal';
import InteractiveBackground from '../common/InteractiveBackground';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="text-gray-700 font-sans dark:text-gray-100 relative min-h-screen">
      <InteractiveBackground />
      <Header />
      <main className="relative z-10">
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
