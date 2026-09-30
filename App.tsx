import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import ServicoPage from './pages/ServicoPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ServicesListPage from './pages/ServicesListPage';
import CareersPage from './pages/CareersPage';
import NotFoundPage from './pages/NotFoundPage';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';
import { ContactFormProvider } from './context/ContactFormContext';
import MainLayout from './components/layout/MainLayout';
import { SERVICOS } from './data/servicos';

// Ao trocar de página, começa do topo sem rolar a página inteira na frente da pessoa.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
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
            {SERVICOS.map((s) => (
              // a key faz cada serviço montar a página do zero (canvas 3D novo), em vez de reaproveitar a do anterior
              <Route key={s.slug} path={s.rota} element={<ServicoPage key={s.slug} slug={s.slug} />} />
            ))}
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/trabalhe-conosco" element={<CareersPage />} />
            <Route path="/termos-de-uso" element={<TermsPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
            {/* os depoimentos eram de exemplo (fictícios): o endereço antigo leva para o início */}
            <Route path="/depoimentos" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ContactFormProvider>
  );
};

export default App;
