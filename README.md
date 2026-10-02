# MC Contabilidade

Site institucional da MC Contabilidade: vitrine 3D (um objeto por serviço), páginas de serviços, LGPD e
formulários de contato e de candidatura.

No ar em **https://mc-contabilidade-site.web.app** (Firebase Hosting, projeto `mc-contabilidade-site`).
O endereço antigo do GitHub Pages (`albu-barboza.github.io/mc-contabilidade`) só redireciona para o novo:
a pasta `docs/` guarda apenas essa página de aviso.

## Stack
- React 18 + React Router 7 (HashRouter) + Vite 5 + TypeScript + Tailwind
- three.js (vitrine 3D) e GSAP (ScrollTrigger + SplitText)
- Fontes Cormorant Garamond e Manrope servidas pelo próprio site (`@fontsource`)

## Rodar e publicar
```bash
npm install
npm run dev        # desenvolvimento
npm run build      # gera dist/
firebase deploy --only hosting --project mc-contabilidade-site
```

## Segurança
- Cabeçalhos no `firebase.json`: CSP sem script de fora, com **Trusted Types** (o navegador bloqueia texto que
  viraria HTML ou script; a política `default` em `utils/tiposConfiaveis.ts` só libera o HTML original que o
  SplitText devolve e o JSON dos dados estruturados), X-Frame-Options, HSTS, Permissions-Policy etc.
- Ligar um serviço de fora (Google Analytics, mapa, vídeo) exige incluir o domínio na CSP do `firebase.json`.
  O Google Analytics também precisa liberar a URL do `gtag` na política `default` (Trusted Types).
- Formulários: Formspree (`VITE_FORMSPREE_CONTACT_URL` e `VITE_FORMSPREE_CAREERS_URL`), com campo-armadilha
  `_gotcha`, descarte de envio rápido demais e espera de 1 minuto entre envios (`utils/antiRobo.ts`).
