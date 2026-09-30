/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: {
    relative: true,
    files: [
      './index.html',
      './App.tsx',
      './components/**/*.{ts,tsx}',
      './pages/**/*.{ts,tsx}'
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F3A5F',
          light: '#2E4F7E',
          dark: '#162B47',
        },
        secondary: {
          DEFAULT: '#3B6EA5',
          light: '#4A82C2',
          dark: '#2C5480',
        },
        accent: {
          DEFAULT: '#E8EDF4',
          dark: '#1F2937', // slate-800 equivalent for dark mode backgrounds
        },
        // paleta da marca (vitrine escura)
        noite: '#0A1120',
        marinho: '#121C30',
        marfim: '#EFE8DB',
        texto: '#C5CBD7',
        fraco: '#9AA3B5',
        latao: {
          DEFAULT: '#C9A45E',
          claro: '#E2C68D',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'system-ui', 'sans-serif'],
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      }
    }
  },
  plugins: []
};
