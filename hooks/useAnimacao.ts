import { useEffect, type RefObject } from 'react';

type Animacao = 'revelarFrase' | 'desenharPassos';

// Liga uma animação de rolagem (animacoes/rolagem.ts) a um elemento da página.
// Segue o guia oficial do GSAP para React (gsap-react): tudo o que a animação cria fica num
// gsap.matchMedia(), que é desfeito na saída da página. O GSAP é carregado só aqui (import dinâmico),
// para não pesar a primeira abertura do site; se falhar, o conteúdo continua visível e parado.
export function useAnimacao(ref: RefObject<HTMLElement>, animacao: Animacao) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let saiu = false;
    let desfazer: (() => void) | undefined;
    import('../animacoes/rolagem')
      .then((m) => {
        if (!saiu) desfazer = m[animacao](el);
      })
      .catch((erro) => console.warn('Animação de rolagem desligada:', erro));
    return () => {
      saiu = true;
      desfazer?.();
    };
  }, [ref, animacao]);
}
