import React, { useState, useEffect } from 'react';

// Botão de voltar ao topo: some durante o passeio 3D e aparece depois dele (ou após rolar nas outras páginas).
const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const cinema = document.getElementById('inicio');
      const limite = cinema ? cinema.offsetTop + cinema.offsetHeight : 600;
      setIsVisible(window.scrollY > limite);
    };
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-latao/60 bg-noite/70 text-latao-claro backdrop-blur-md transition-[opacity,background-color,border-color,color] duration-300 hover:border-latao-claro hover:bg-latao hover:text-noite sm:flex ${
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      aria-label="Voltar ao topo da página"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
