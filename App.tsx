import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import MeiPage from './pages/services/MeiPage';
import PmePage from './pages/services/PmePage';
import AberturaPage from './pages/services/AberturaPage';
import ConsultoriaPage from './pages/services/ConsultoriaPage';
import PlanejamentoPage from './pages/services/PlanejamentoPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ServicesListPage from './pages/ServicesListPage';
import TestimonialsPage from './pages/TestimonialsPage';
import CareersPage from './pages/CareersPage';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';
import { ContactFormProvider } from './context/ContactFormContext';
import MainLayout from './components/layout/MainLayout';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <ContactFormProvider>
      <Router>
        <ScrollToTop />
        <GoogleAnalytics />
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/servicos" element={<ServicesListPage />} />
            <Route path="/depoimentos" element={<TestimonialsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/servicos/mei" element={<MeiPage />} />
            <Route path="/servicos/pme" element={<PmePage />} />
            <Route path="/servicos/abertura-empresa" element={<AberturaPage />} />
            <Route path="/servicos/consultoria-tributaria" element={<ConsultoriaPage />} />
            <Route path="/servicos/planejamento-financeiro" element={<PlanejamentoPage />} />
            <Route path="/trabalhe-conosco" element={<CareersPage />} />
            <Route path="/termos-de-uso" element={<TermsPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ContactFormProvider>
  );
};

export default App;
