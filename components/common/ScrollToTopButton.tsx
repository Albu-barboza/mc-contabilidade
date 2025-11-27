import React, { useState, useEffect } from 'react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`hidden sm:flex fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#1F3A5F] to-[#2E4F7E] text-white rounded-full items-center justify-center shadow-xl transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 visible transform scale-100' : 'opacity-0 invisible transform scale-75'
      } hover:scale-110 hover:-translate-y-1`}
      aria-label="Voltar ao topo da página"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
