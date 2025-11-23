import React, { useEffect, useState } from 'react';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('mc-theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('mc-theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      aria-label="Alternar modo de cor"
      className="ml-4 inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-700 hover:border-[#1F3A5F] hover:text-[#1F3A5F] transition-colors dark:border-white/40 dark:text-white"
    >
      {theme === 'dark' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m13.72 13.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m13.72-13.72l1.42-1.42" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
