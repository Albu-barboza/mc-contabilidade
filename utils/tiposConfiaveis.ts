// Trusted Types (CSP "require-trusted-types-for 'script'" no firebase.json): o navegador bloqueia todo texto que
// viraria HTML ou script. A política "default" abre só duas portas, ambas para conteúdo do próprio site:
// - HTML guardado antes de uma animação mexer nele (o SplitText do GSAP devolve o texto original ao desfazer);
// - JSON (os dados estruturados do Google montados em JsonLd.tsx; JSON puro não executa nada).
// Importado primeiro em index.tsx, para a política existir antes de qualquer componente.
type TrustedTypes = {
  defaultPolicy: unknown;
  createPolicy: (
    nome: string,
    regras: { createHTML: (s: string) => string | null; createScript: (s: string) => string | null }
  ) => unknown;
};

const htmlDoSite = new Set<string>();

const tt = (window as Window & { trustedTypes?: TrustedTypes }).trustedTypes;
if (tt && !tt.defaultPolicy) {
  try {
    tt.createPolicy('default', {
      createHTML: (s) => (htmlDoSite.has(s) ? s : null),
      createScript: (s) => {
        try {
          JSON.parse(s);
          return s;
        } catch {
          return null;
        }
      },
    });
  } catch {
    /* política já criada */
  }
}

/** libera um HTML que veio da própria página, antes de uma animação mexer nele */
export function guardarHTMLDoSite(html: string) {
  htmlDoSite.add(html);
}
