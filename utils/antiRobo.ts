// Antirrobô dos formulários, além do campo-armadilha (_gotcha): robô costuma enviar segundos depois de abrir o
// formulário e repetir sem parar. Envio rápido demais finge que deu certo; depois de um envio, espera um minuto.
// (O Formspree tem o próprio filtro de spam do lado dele.)
const MINIMO_MS = 3000; // ninguém preenche nome, e-mail e mensagem em menos de 3 segundos
const ESPERA_MS = 60_000;
const CHAVE = 'mc-ultimo-envio';

export const rapidoDemais = (abertoEm: number) => Date.now() - abertoEm < MINIMO_MS;

export function segundosParaEnviarDeNovo(): number {
  try {
    const ultimo = Number(localStorage.getItem(CHAVE) || 0);
    return Math.max(0, Math.ceil((ultimo + ESPERA_MS - Date.now()) / 1000));
  } catch {
    return 0;
  }
}

export function marcarEnvio() {
  try {
    localStorage.setItem(CHAVE, String(Date.now()));
  } catch {
    /* sem armazenamento: segue sem a espera */
  }
}
