/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
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
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      }
    }
  },
  plugins: []
};
