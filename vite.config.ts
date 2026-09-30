import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Política de segurança (CSP) da versão publicada: diz ao navegador de onde a página pode carregar
// cada coisa. Fica fora do modo de desenvolvimento, que precisa de scripts embutidos do Vite.
const CSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "connect-src 'self' https://formspree.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  'upgrade-insecure-requests',
].join('; ');

const politicaDeSeguranca = (): Plugin => ({
  name: 'politica-de-seguranca',
  apply: 'build',
  transformIndexHtml: (html) => html.replace(/<head>/i, `<head>\n  <meta http-equiv="Content-Security-Policy" content="${CSP}" />`),
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), politicaDeSeguranca()],
  // Use relative base to make assets work both locally and on GitHub Pages (project or custom domain)
  base: './',
  build: {
    outDir: 'docs',
  },
});
