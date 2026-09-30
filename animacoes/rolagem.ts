// Animações de texto ligadas à rolagem (GSAP: ScrollTrigger + SplitText, grátis e oficiais).
// Este arquivo só é baixado quando uma página precisa dele (import dinâmico em hooks/useAnimacao.ts):
// quem abre o site pelo celular não paga por ele antes da hora.
// Regra da casa: o conteúdo nasce visível. Sem este arquivo (ou com "menos movimento" pedido no
// aparelho), a frase e os passos aparecem inteiros e parados.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const CONDICOES = {
  largo: '(min-width: 768px)',
  estreito: '(max-width: 767.98px)',
  calmo: '(prefers-reduced-motion: reduce)',
};

// O layout pode mudar sem a janela mudar de tamanho (fontes chegando, a vitrine 3D trocando de modo,
// uma dúvida aberta no FAQ): recalcula onde cada animação começa, no máximo a cada 200 ms.
let espera = 0;
const recalcular = () => {
  window.clearTimeout(espera);
  espera = window.setTimeout(() => ScrollTrigger.refresh(), 200);
};
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(recalcular).observe(document.body);
document.fonts?.ready.then(recalcular).catch(() => undefined);

// Frase que acende palavra por palavra enquanto a pessoa rola (o jeito do exemplo grátis
// "Scroll word reveal" do Motion): cada palavra vai de 15% a 100% de opacidade, na ordem de leitura.
export function revelarFrase(el: HTMLElement) {
  const mm = gsap.matchMedia();
  mm.add(CONDICOES, (ctx) => {
    if (ctx.conditions?.calmo) return;
    // aria "auto": o leitor de tela lê a frase inteira; as palavras soltas ficam escondidas dele
    const partes = SplitText.create(el, { type: 'words', aria: 'auto' });
    gsap.fromTo(
      partes.words,
      { opacity: 0.15 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: 0.4 },
      }
    );
  });
  return () => mm.revert();
}

// "Como começamos": um fio de latão se desenha por cima de cada passo, na ordem, e o número acende
// quando o fio chega nele (a técnica da linha que se desenha, sem gráfico nem número inventado).
export function desenharPassos(lista: HTMLElement) {
  const mm = gsap.matchMedia();
  mm.add(
    CONDICOES,
    (ctx) => {
      const { largo, calmo } = (ctx.conditions ?? {}) as Record<string, boolean>;
      if (calmo) return;
      const passos = gsap.utils.toArray<HTMLElement>('[data-passo]', lista);
      const trecho = (tl: gsap.core.Timeline, li: HTMLElement) =>
        tl
          .fromTo(li.querySelector('[data-fio]'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' })
          .fromTo(li.querySelector('[data-numero]'), { opacity: 0.3 }, { opacity: 1, duration: 0.3, ease: 'power1.out' }, '<0.8');
      if (largo) {
        // lado a lado: um fio só, que atravessa os três passos
        const tl = gsap.timeline({ scrollTrigger: { trigger: lista, start: 'top 80%', end: 'top 32%', scrub: 0.4 } });
        passos.forEach((li) => trecho(tl, li));
      } else {
        // um embaixo do outro: cada passo desenha o seu fio quando chega na tela
        passos.forEach((li) => trecho(gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 88%', end: 'top 58%', scrub: 0.4 } }), li));
      }
    },
    lista
  );
  return () => mm.revert();
}
