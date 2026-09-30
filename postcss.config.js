import { fileURLToPath } from 'node:url';

// Caminho do Tailwind fixo ao lado deste arquivo: funciona mesmo se o Vite for aberto de outra pasta.
export default {
  plugins: {
    tailwindcss: { config: fileURLToPath(new URL('./tailwind.config.js', import.meta.url)) },
    autoprefixer: {},
  },
}
