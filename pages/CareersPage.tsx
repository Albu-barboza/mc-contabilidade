import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import JsonLd from '../components/common/JsonLd';
import Seo from '../components/common/Seo';
import CabecalhoPagina from '../components/paginas/CabecalhoPagina';
import { env } from '../config/env';
import { AUTORIZACAO_FORMSPREE, AVISO_DADOS_SENSIVEIS, ERRO_AUTORIZACAO, PRAZO_CANDIDATURA } from '../config/privacidade';

const AREAS = ['Contábil', 'Fiscal e tributário', 'Departamento pessoal', 'Atendimento ao cliente', 'Outra área'];

const VALORES = [
  'Pensamento analítico para transformar números em planos.',
  'Comunicação clara com clientes e colegas.',
  'Autonomia com responsabilidade.',
  'Vontade de aprender e de ensinar.',
];

type Campo = 'nome' | 'email' | 'area' | 'mensagem' | 'autorizo';
const OBRIGATORIOS: Campo[] = ['nome', 'email', 'area', 'autorizo'];
const VAZIO: Record<Campo, string> = { nome: '', email: '', area: '', mensagem: '', autorizo: '' };
const validar = (campo: Campo, valor: string) => {
  if (campo === 'nome') return valor.trim().split(/\s+/).length < 2 ? 'Escreva nome e sobrenome.' : '';
  if (campo === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()) ? '' : 'Confira o e-mail: falta algo como nome@email.com.';
  if (campo === 'area') return valor ? '' : 'Escolha uma área.';
  if (campo === 'autorizo') return valor ? '' : ERRO_AUTORIZACAO;
  return '';
};

const CareersPage: React.FC = () => {
  const [dados, setDados] = useState<Record<Campo, string>>(VAZIO);
  const [erros, setErros] = useState<Partial<Record<Campo, string>>>({});
  const [status, setStatus] = useState<'parado' | 'enviando' | 'enviado'>('parado');
  const [falha, setFalha] = useState('');
  const [armadilha, setArmadilha] = useState(''); // campo invisível: só robô preenche
  const formRef = useRef<HTMLFormElement>(null);
  const destino = env.formspreeCareersUrl;
  const destinoValido = /^https:\/\/\S+$/.test(destino || '');

  const mudar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const campo = e.target.name as Campo;
    const valor = campo === 'autorizo' ? ((e.target as HTMLInputElement).checked ? 'sim' : '') : e.target.value;
    setDados((d) => ({ ...d, [campo]: valor }));
    if (erros[campo]) setErros((er) => ({ ...er, [campo]: validar(campo, valor) }));
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const novos: Partial<Record<Campo, string>> = {};
    for (const c of OBRIGATORIOS) novos[c] = validar(c, dados[c]);
    setErros(novos);
    const primeiro = OBRIGATORIOS.find((c) => novos[c]);
    if (primeiro) {
      formRef.current?.querySelector<HTMLElement>(`#carreira-${primeiro}`)?.focus();
      return;
    }
    if (armadilha) {
      // robô caiu na armadilha: finge que deu certo e não envia nada
      setStatus('enviado');
      return;
    }
    if (!destinoValido) {
      setFalha('O envio pelo site ainda não está ativo.');
      return;
    }
    setFalha('');
    setStatus('enviando');
    const controle = new AbortController();
    const prazo = window.setTimeout(() => controle.abort(), 15000);
    try {
      const resposta = await fetch(destino, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: dados.nome.trim(),
          email: dados.email.trim(),
          area: dados.area,
          mensagem: dados.mensagem.trim(),
          autorizacao: AUTORIZACAO_FORMSPREE,
          origem: 'careers_page',
          _gotcha: armadilha,
        }),
        signal: controle.signal,
      });
      if (!resposta.ok) throw new Error('resposta');
      setStatus('enviado');
      setDados(VAZIO);
    } catch (erro) {
      const tempo = erro instanceof DOMException && erro.name === 'AbortError';
      setFalha(tempo ? 'A conexão demorou demais. Confira a internet e tente de novo.' : 'Não conseguimos enviar agora. Tente de novo em instantes.');
      setStatus('parado');
    } finally {
      window.clearTimeout(prazo);
    }
  };

  const campoClasse = (c: Campo, fundo = 'bg-white/[0.04]') =>
    `w-full rounded-xl border ${fundo} px-4 py-3 text-base text-marfim placeholder:text-fraco transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-latao ${
      erros[c] ? 'border-red-400/80' : 'border-[color:var(--linha)] hover:border-marfim/30'
    }`;
  const rotulo = 'mb-2 block text-sm font-semibold text-marfim';
  const aria = (c: Campo) => ({ 'aria-invalid': Boolean(erros[c]) || undefined, 'aria-describedby': erros[c] ? `carreira-${c}-erro` : undefined });
  const ajuda = (c: Campo) =>
    erros[c] ? (
      <p id={`carreira-${c}-erro`} className="mt-2 text-sm text-red-300">
        {erros[c]}
      </p>
    ) : null;

  return (
    <>
      <Seo title="Trabalhe conosco" description="Quer trabalhar na MC Contabilidade? Conte a sua trajetória e a área em que você quer atuar." />
      <JsonLd schema={{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Trabalhe conosco · MC Contabilidade' }} />
      <CabecalhoPagina
        titulo="Trabalhe conosco"
        lead="Procuramos pessoas cuidadosas, curiosas e que gostam de explicar números com clareza. Conte a sua trajetória."
      />

      <section className="bg-noite pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-[var(--gutter)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <h2 className="font-display text-4xl font-medium text-marfim md:text-5xl">O que valorizamos</h2>
            <ul className="mt-8 space-y-4 text-base leading-relaxed text-texto">
              {VALORES.map((v) => (
                <li key={v} className="relative pl-6 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3.5 before:bg-latao">
                  {v}
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-md text-base leading-relaxed text-texto">
              Não precisa esperar uma vaga aberta: guardamos o seu perfil por até {PRAZO_CANDIDATURA} e chamamos se surgir uma oportunidade na sua área.
            </p>
          </div>

          <div className="rounded-3xl border border-[color:var(--linha)] bg-marinho p-6 sm:p-10">
            {status === 'enviado' ? (
              <div role="status" className="flex min-h-[300px] flex-col justify-center">
                <p className="font-display text-4xl font-medium text-marfim">Perfil recebido.</p>
                <p className="mt-3 max-w-sm leading-relaxed text-texto">Obrigado por contar a sua trajetória. Guardamos o seu perfil por até {PRAZO_CANDIDATURA} para as próximas oportunidades.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={enviar} noValidate className="relative space-y-5">
                <h2 className="font-display text-3xl font-medium text-marfim">Envie o seu perfil</h2>
                {!destinoValido && (
                  <p className="rounded-xl border border-latao/30 bg-latao/10 px-4 py-3 text-sm text-latao-claro">
                    Prévia: o envio deste formulário será ligado quando o e-mail de recebimento for configurado.
                  </p>
                )}
                <div>
                  <label htmlFor="carreira-nome" className={rotulo}>
                    Nome completo
                  </label>
                  <input
                    id="carreira-nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    maxLength={120}
                    value={dados.nome}
                    onChange={mudar}
                    onBlur={() => setErros((er) => ({ ...er, nome: validar('nome', dados.nome) }))}
                    placeholder="Maria Souza…"
                    className={campoClasse('nome')}
                    {...aria('nome')}
                  />
                  {ajuda('nome')}
                </div>
                <div>
                  <label htmlFor="carreira-email" className={rotulo}>
                    E-mail
                  </label>
                  <input
                    id="carreira-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    maxLength={160}
                    value={dados.email}
                    onChange={mudar}
                    onBlur={() => setErros((er) => ({ ...er, email: validar('email', dados.email) }))}
                    placeholder="nome@email.com…"
                    className={campoClasse('email')}
                    {...aria('email')}
                  />
                  {ajuda('email')}
                </div>
                <div>
                  <label htmlFor="carreira-area" className={rotulo}>
                    Área de interesse
                  </label>
                  <select id="carreira-area" name="area" value={dados.area} onChange={mudar} className={campoClasse('area', 'bg-noite')} {...aria('area')}>
                    <option value="">Escolha uma área</option>
                    {AREAS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                  {ajuda('area')}
                </div>
                <div>
                  <label htmlFor="carreira-mensagem" className={rotulo}>
                    Sobre você <span className="font-normal text-fraco">(opcional)</span>
                  </label>
                  <textarea
                    id="carreira-mensagem"
                    name="mensagem"
                    rows={4}
                    maxLength={2000}
                    value={dados.mensagem}
                    onChange={mudar}
                    placeholder="LinkedIn, experiência, o que você procura…"
                    aria-describedby="carreira-mensagem-dica"
                    className={`${campoClasse('mensagem')} resize-none`}
                  />
                  <p id="carreira-mensagem-dica" className="mt-2 text-xs leading-relaxed text-fraco">
                    {AVISO_DADOS_SENSIVEIS}
                  </p>
                </div>
                <div>
                  <label htmlFor="carreira-autorizo" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-texto">
                    <input
                      id="carreira-autorizo"
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
                  <label htmlFor="carreira-site">Site</label>
                  <input id="carreira-site" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={armadilha} onChange={(e) => setArmadilha(e.target.value)} />
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
                  {status === 'enviando' ? 'Enviando…' : 'Enviar meu perfil'}
                </button>
                <p className="text-center text-xs leading-relaxed text-fraco">
                  Usamos seus dados só para avaliar a sua candidatura. Veja a{' '}
                  <Link to="/politica-de-privacidade" className="text-marfim underline-offset-4 hover:underline">
                    política de privacidade
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
