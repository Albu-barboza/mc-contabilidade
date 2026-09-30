// A escolha do visitante sobre a medição de audiência (Google Analytics).
// Sem um ID de verdade configurado, a medição não existe: nada é perguntado e nada é gravado.
const CHAVE = 'mc-medicao';
const EVENTO = 'mc-medicao';

export const ID_GA = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();
export const MEDICAO_ATIVA = /^G-[A-Z0-9]{4,}$/.test(ID_GA) && ID_GA !== 'G-XXXXXXXXXX';

export type Escolha = 'sim' | 'nao' | null;

export function lerEscolha(): Escolha {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === 'sim' || v === 'nao' ? v : null;
  } catch {
    return null;
  }
}

export function gravarEscolha(v: 'sim' | 'nao') {
  try {
    localStorage.setItem(CHAVE, v);
  } catch {
    /* navegador sem armazenamento: vale só nesta visita */
  }
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: v }));
}

export function aoEscolher(fn: (v: 'sim' | 'nao') => void) {
  const ouvir = (e: Event) => fn((e as CustomEvent<'sim' | 'nao'>).detail);
  window.addEventListener(EVENTO, ouvir);
  return () => window.removeEventListener(EVENTO, ouvir);
}

// Rever a escolha: apaga a resposta e os cookies do Analytics e recarrega, para o aviso voltar.
export function reverEscolha() {
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    /* segue */
  }
  const partes = location.hostname.split('.');
  const dominios = ['', location.hostname, ...partes.slice(1).map((_, i) => '.' + partes.slice(i + 1).join('.'))];
  document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((nome) => nome.startsWith('_ga'))
    .forEach((nome) => {
      for (const d of dominios) document.cookie = `${nome}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    });
  location.reload();
}
