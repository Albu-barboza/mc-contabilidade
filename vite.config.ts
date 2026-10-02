import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Publicado no Firebase Hosting (pasta dist/). A política de segurança (CSP com Trusted Types) e os demais
// cabeçalhos ficam no firebase.json. A pasta docs/ só guarda o aviso de mudança de endereço do GitHub Pages.
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    // fonte nunca vira data: embutido (a CSP só aceita fonte vinda do próprio site)
    assetsInlineLimit: (arquivo) => (/\.(woff2?|ttf|otf)$/.test(arquivo) ? false : undefined),
  },
});
