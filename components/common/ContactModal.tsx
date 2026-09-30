import React, { useEffect, useRef, useState } from 'react';
import { useContactForm } from '../../context/ContactFormContext';
import { env, getWhatsappLink, previaEnvio } from '../../config/env';
import SeloEnviado from './SeloEnviado';
import { AUTORIZACAO_FORMSPREE, AVISO_DADOS_SENSIVEIS, ERRO_AUTORIZACAO } from '../../config/privacidade';

type Campo = 'nome' | 'email' | 'telefone' | 'servico' | 'mensagem' | 'autorizo';
type Formulario = Record<Campo, string>;

const VAZIO: Formulario = { nome: '', email: '', telefone: '', servico: '', mensagem: '', autorizo: '' };
const OBRIGATORIOS: Campo[] = ['nome', 'telefone', 'email', 'servico', 'autorizo']; // na ordem da tela

const ASSUNTOS = [
  { valor: 'Abertura de empresa', texto: 'Quero abrir minha empresa' },
  { valor: 'Troca de contador', texto: 'Quero trocar de contador' },
  { valor: 'MEI', texto: 'Sou MEI e preciso de ajuda' },
  { valor: 'Consultoria tributária', texto: 'Preciso de consultoria tributária' },
  { valor: 'Regularização', texto: 'Quero regularizar minha empresa' },
  { valor: 'Outros', texto: 'Outro assunto' },
];

const validar = (campo: Campo, valor: string) => {
  switch (campo) {
    case 'nome':
      return valor.trim().split(/\s+/).length < 2 ? 'Escreva nome e sobrenome.' : '';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()) ? '' : 'Confira o e-mail: falta algo como nome@empresa.com.br.';
    case 'telefone':
      return valor.replace(/\D/g, '').length >= 10 ? '' : 'Informe o telefone com DDD.';
    case 'servico':
      return valor ? '' : 'Escolha um assunto.';
    case 'autorizo':
      return valor ? '' : ERRO_AUTORIZACAO;
    default:
      return '';
  }
};

const mascaraTelefone = (v: string) =>
  v
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');

// Janela de contato. Envia para o endereço do Formspree configurado em VITE_FORMSPREE_CONTACT_URL.
const ContactModal: React.FC = () => {
  const { isFormOpen, closeForm } = useContactForm();
  const [dados, setDados] = useState<Formulario>(VAZIO);
  const [erros, setErros] = useState<Partial<Record<Campo, string>>>({});
  const [status, setStatus] = useState<'parado' | 'enviando' | 'enviado'>('parado');
  const [falha, setFalha] = useState('');
  const [armadilha, setArmadilha] = useState(''); // campo invisível: só robô preenche
  const janelaRef = useRef<HTMLDivElement>(null);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const antesRef = useRef<HTMLElement | null>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);

  const destino = env.formspreeContactUrl;
  const destinoValido = /^https:\/\/\S+$/.test(destino || '');
  const temWhatsapp = Boolean(env.whatsappNumber);
  const email = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;

  // abrir: guarda onde estava o foco, trava a rolagem da página e põe o foco na janela
  useEffect(() => {
    if (!isFormOpen) return;
    antesRef.current = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const telaGrande = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    requestAnimationFrame(() => {
      if (telaGrande) janelaRef.current?.querySelector<HTMLInputElement>('#contato-nome')?.focus();
      else tituloRef.current?.focus();
    });
    return () => {
      document.body.style.overflow = overflow;
      antesRef.current?.focus?.();
    };
  }, [isFormOpen]);

  useEffect(() => {
    if (status === 'enviado') fecharRef.current?.focus();
  }, [status]);

  const fechar = () => {
    closeForm();
    if (status === 'enviado') {
      setStatus('parado');
      setDados(VAZIO);
    }
    setFalha('');
  };

  // Esc fecha; Tab fica preso dentro da janela
  const aoTeclar = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      fechar();
      return;
    }
    if (e.key !== 'Tab' || !janelaRef.current) return;
    const focaveis = Array.from(
      janelaRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), select, textarea, [tabindex="0"]')
    ).filter((el) => el.offsetParent !== null);
    if (!focaveis.length) return;
    const primeiro = focaveis[0], ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primeiro.focus();
    }
  };

  const mudar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const campo = e.target.name as Campo;
    const valor =
      campo === 'telefone'
        ? mascaraTelefone(e.target.value)
        : campo === 'autorizo'
          ? ((e.target as HTMLInputElement).checked ? 'sim' : '')
          : e.target.value;
    setDados((d) => ({ ...d, [campo]: valor }));
    if (erros[campo]) setErros((er) => ({ ...er, [campo]: validar(campo, valor) }));
  };

  const sair = (campo: Campo) => setErros((er) => ({ ...er, [campo]: validar(campo, dados[campo]) }));

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const novos: Partial<Record<Campo, string>> = {};
    for (const c of OBRIGATORIOS) novos[c] = validar(c, dados[c]);
    setErros(novos);
    const primeiroErro = OBRIGATORIOS.find((c) => novos[c]);
    if (primeiroErro) {
      setFalha('');
      janelaRef.current?.querySelector<HTMLElement>(`#contato-${primeiroErro}`)?.focus();
      return;
    }
    if (armadilha) {
      setStatus('enviado');
      return;
    }
    if (!destinoValido && previaEnvio) {
      // prévia privada: finge o envio para mostrar a confirmação (nada sai do navegador)
      setFalha('');
      setStatus('enviando');
      await new Promise((r) => window.setTimeout(r, 900));
      setStatus('enviado');
      setDados(VAZIO);
      setErros({});
      return;
    }
    if (!destinoValido) {
      setFalha(email || temWhatsapp ? 'O envio pelo site ainda não está ativo. Enquanto isso, fale com a equipe pelos contatos ao lado.' : 'O envio pelo site ainda não está ativo.');
      return;
    }
    setFalha('');
    setStatus('enviando');
    const controle = new AbortController();
    const prazo = window.setTimeout(() => controle.abort(), 15000);
    try {
      const resposta = await fetch(destino, {
        method: 'POST',
        body: JSON.stringify({
          nome: dados.nome.trim(),
          email: dados.email.trim(),
          telefone: dados.telefone,
          servico: dados.servico,
          mensagem: dados.mensagem.trim(),
          autorizacao: AUTORIZACAO_FORMSPREE,
          _gotcha: armadilha,
        }),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        signal: controle.signal,
      });
      if (!resposta.ok) throw new Error('resposta');
      window.gtag?.('event', 'generate_lead', { event_category: 'contact', event_label: 'Formulario de Contato Principal', value: 1 });
      setStatus('enviado');
      setDados(VAZIO);
      setErros({});
    } catch (erro) {
      const tempo = erro instanceof DOMException && erro.name === 'AbortError';
      setFalha(tempo ? 'A conexão demorou demais. Confira a internet e tente de novo.' : 'Não conseguimos enviar agora. Tente de novo em instantes.');
      setStatus('parado');
    } finally {
      window.clearTimeout(prazo);
    }
  };

  if (!isFormOpen) return null;

  const campoClasse = (c: Campo, fundo = 'bg-white/[0.04]') =>
    `w-full rounded-xl border ${fundo} px-4 py-3 text-base text-marfim placeholder:text-fraco transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latao ${
      erros[c] ? 'border-red-400/80' : 'border-[color:var(--linha)] hover:border-marfim/30'
    }`;
  const rotulo = 'mb-2 block text-sm font-semibold text-marfim';
  const ajuda = (c: Campo) =>
    erros[c] ? (
      <p id={`contato-${c}-erro`} className="mt-2 text-sm text-red-300">
        {erros[c]}
      </p>
    ) : null;
  const aria = (c: Campo) => ({ 'aria-invalid': Boolean(erros[c]) || undefined, 'aria-describedby': erros[c] ? `contato-${c}-erro` : undefined });

  return (
    <div
      className="modal-fundo fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) fechar();
      }}
    >
      <div
        ref={janelaRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contato-titulo"
        aria-describedby="contato-descricao"
        onKeyDown={aoTeclar}
        className="modal-painel relative max-h-[92vh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-3xl border border-[color:var(--linha)] bg-noite sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={fechar}
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-fraco transition-colors duration-200 hover:bg-white/5 hover:text-marfim"
          aria-label="Fechar"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="modal-cascata bg-marinho px-6 pb-8 pt-10 sm:px-10 lg:py-12">
            <h2 id="contato-titulo" ref={tituloRef} tabIndex={-1} className="font-display text-4xl font-medium text-marfim focus:outline-none sm:text-5xl">
              Vamos conversar?
            </h2>
            <span aria-hidden="true" className="modal-fio mt-6 block h-px w-14 bg-latao" />
            <p id="contato-descricao" className="mt-5 max-w-sm leading-relaxed text-texto">
              Conte o momento da sua empresa. A equipe retorna em até 24h.
            </p>
            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="font-semibold text-latao-claro">Atendimento</dt>
                <dd className="mt-1 text-marfim">100% online</dd>
              </div>
              {email && (
                <div>
                  <dt className="font-semibold text-latao-claro">E-mail</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${email}`} className="text-marfim underline-offset-4 hover:underline">
                      {email}
                    </a>
                  </dd>
                </div>
              )}
              {temWhatsapp && (
                <div>
                  <dt className="font-semibold text-latao-claro">WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      href={getWhatsappLink('Olá! Vim pelo site da MC Contabilidade e gostaria de conversar.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-marfim underline-offset-4 hover:underline"
                    >
                      Conversar no WhatsApp
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="px-6 pb-10 pt-8 sm:px-10 lg:py-12">
            {status === 'enviado' ? (
              <div className="flex min-h-[320px] flex-col items-start justify-center" role="status">
                <SeloEnviado className="h-16" />
                <p className="selo-texto mt-8 font-display text-4xl font-medium text-marfim">Mensagem enviada.</p>
                <p className="selo-texto mt-3 max-w-sm leading-relaxed text-texto">
                  Obrigado pelo contato. A equipe retorna em até 24h.
                  {previaEnvio && !destinoValido && <span className="mt-2 block text-sm text-latao-claro">Prévia: nada foi enviado de verdade.</span>}
                </p>
                <button
                  ref={fecharRef}
                  type="button"
                  onClick={fechar}
                  className="selo-texto pressionar mt-8 rounded-full border border-marfim/40 px-6 py-3 text-sm font-bold text-marfim transition-colors duration-200 hover:border-marfim"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate className="modal-cascata space-y-5">
                {!destinoValido && (
                  <p className="rounded-xl border border-latao/30 bg-latao/10 px-4 py-3 text-sm text-latao-claro">
                    {previaEnvio
                      ? 'Prévia: pode enviar para ver a confirmação. Nada sai daqui de verdade.'
                      : 'Prévia: o envio deste formulário será ligado quando o e-mail de recebimento for configurado.'}
                  </p>
                )}
                {/* nome e telefone lado a lado; e-mail e assunto na largura toda (textos longos não cortam) */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contato-nome" className={rotulo}>
                      Nome completo
                    </label>
                    <input
                      id="contato-nome"
                      name="nome"
                      type="text"
                      autoComplete="name"
                      maxLength={120}
                      value={dados.nome}
                      onChange={mudar}
                      onBlur={() => sair('nome')}
                      placeholder="Maria Souza…"
                      className={campoClasse('nome')}
                      {...aria('nome')}
                    />
                    {ajuda('nome')}
                  </div>
                  <div>
                    <label htmlFor="contato-telefone" className={rotulo}>
                      Telefone ou WhatsApp
                    </label>
                    <input
                      id="contato-telefone"
                      name="telefone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      maxLength={16}
                      value={dados.telefone}
                      onChange={mudar}
                      onBlur={() => sair('telefone')}
                      placeholder="(00) 00000-0000…"
                      className={campoClasse('telefone')}
                      {...aria('telefone')}
                    />
                    {ajuda('telefone')}
                  </div>
                </div>
                <div>
                  <label htmlFor="contato-email" className={rotulo}>
                    E-mail
                  </label>
                  <input
                    id="contato-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    maxLength={160}
                    value={dados.email}
                    onChange={mudar}
                    onBlur={() => sair('email')}
                    placeholder="nome@empresa.com.br…"
                    className={campoClasse('email')}
                    {...aria('email')}
                  />
                  {ajuda('email')}
                </div>
                <div>
                  <label htmlFor="contato-servico" className={rotulo}>
                    Assunto
                  </label>
                  <select
                    id="contato-servico"
                    name="servico"
                    value={dados.servico}
                    onChange={mudar}
                    onBlur={() => sair('servico')}
                    className={campoClasse('servico', 'bg-noite')}
                    {...aria('servico')}
                  >
                    <option value="">Escolha um assunto</option>
                    {ASSUNTOS.map((a) => (
                      <option key={a.valor} value={a.valor}>
                        {a.texto}
                      </option>
                    ))}
                  </select>
                  {ajuda('servico')}
                </div>
                <div>
                  <label htmlFor="contato-mensagem" className={rotulo}>
                    Mensagem <span className="font-normal text-fraco">(opcional)</span>
                  </label>
                  <textarea
                    id="contato-mensagem"
                    name="mensagem"
                    rows={3}
                    maxLength={2000}
                    value={dados.mensagem}
                    onChange={mudar}
                    placeholder="Ex.: tenho um MEI e quero virar ME no ano que vem…"
                    aria-describedby="contato-mensagem-dica"
                    className={`${campoClasse('mensagem')} resize-none`}
                  />
                  <p id="contato-mensagem-dica" className="mt-2 text-xs leading-relaxed text-fraco">
                    {AVISO_DADOS_SENSIVEIS}
                  </p>
                </div>
                <div>
                  <label htmlFor="contato-autorizo" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-texto">
                    <input
                      id="contato-autorizo"
                      name="autorizo"
                      type="checkbox"
                      checked={dados.autorizo === 'sim'}
                      onChange={mudar}
                      className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#C9A45E]"
                      {...aria('autorizo')}
                    />
                    <span>{AUTORIZACAO_FORMSPREE}</span>
                  </label>
                  {ajuda('autorizo')}
                </div>
                {/* armadilha para robôs: invisível para pessoas */}
                <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="contato-site">Site</label>
                  <input id="contato-site" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={armadilha} onChange={(e) => setArmadilha(e.target.value)} />
                </div>
                <div aria-live="polite">
                  {falha && <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{falha}</p>}
                </div>
                <button
                  type="submit"
                  disabled={status === 'enviando'}
                  className="pressionar flex w-full items-center justify-center gap-3 rounded-full bg-latao py-4 text-base font-bold text-noite hover:bg-latao-claro disabled:opacity-70"
                >
                  {status === 'enviando' && <span className="h-4 w-4 animate-spin rounded-full border-2 border-noite/30 border-t-noite" aria-hidden="true" />}
                  {status === 'enviando' ? 'Enviando…' : 'Enviar mensagem'}
                </button>
                <p className="text-center text-xs leading-relaxed text-fraco">
                  Usamos seus dados só para responder este contato. Veja a{' '}
                  <a href="#/politica-de-privacidade" onClick={fechar} className="text-marfim underline-offset-4 hover:underline">
                    política de privacidade
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
