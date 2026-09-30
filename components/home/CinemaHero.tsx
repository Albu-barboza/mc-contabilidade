import React, { useEffect, useRef } from 'react';
import { useContactForm } from '../../context/ContactFormContext';
import { env, getWhatsappLink } from '../../config/env';
import './cinema.css';

// Capítulos do passeio: [início na rolagem (0 a 1), nome que aparece no índice]
const CAPITULOS: [number, string][] = [
  [0, 'Início'],
  [0.15, 'Abertura de empresa'],
  [0.3, 'MEI'],
  [0.45, 'Pequenas e médias empresas'],
  [0.6, 'Consultoria tributária'],
  [0.75, 'Planejamento financeiro'],
  [0.88, 'Contato'],
];

// Cor do brilho atrás de cada objeto (mesmas janelas das cenas em cinema/estudio.js)
const BRILHOS: [number, string][] = [
  [0, 'rgba(201, 164, 94, 0.30)'],
  [0.15, 'rgba(214, 170, 92, 0.28)'],
  [0.3, 'rgba(76, 122, 196, 0.30)'],
  [0.45, 'rgba(150, 120, 170, 0.22)'],
  [0.6, 'rgba(214, 150, 80, 0.26)'],
  [0.75, 'rgba(226, 184, 101, 0.26)'],
  [0.88, 'rgba(201, 164, 94, 0.30)'],
];

const suave = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const IcoSeta = () => (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoConversa = () => (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 5.5h16v10H9l-5 4v-14Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const IcoWhatsapp = () => (
  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.870 9.870 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.880 11.880 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z"
    />
  </svg>
);

const CinemaHero: React.FC = () => {
  const secRef = useRef<HTMLElement>(null);
  const { openForm } = useContactForm();
  const temWhatsapp = Boolean(env.whatsappNumber);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const $ = <T extends Element>(s: string) => sec.querySelector(s) as T;
    const palco = $<HTMLDivElement>('.cinema-palco');
    const cenas = Array.from(sec.querySelectorAll<HTMLElement>('.cena, .palavra')).map((el) => ({
      el,
      de: Number(el.dataset.de),
      ate: Number(el.dataset.ate),
      fixa: el.classList.contains('cena-titulo'),
      palavra: el.classList.contains('palavra'),
    }));
    const miolo = $<HTMLDivElement>('.cena-titulo');
    const cheio = $<HTMLSpanElement>('.trilho-cheio');
    const indice = $<HTMLParagraphElement>('.indice');
    const trilho = $<HTMLDivElement>('.trilho');
    const marcas = CAPITULOS.slice(1).map(([p]) => {
      const m = document.createElement('span');
      m.className = 'trilho-marca';
      m.style.top = `${p * 100}%`;
      trilho.appendChild(m);
      return { m, p };
    });

    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const movel = window.matchMedia('(max-width: 820px), (pointer: coarse)').matches;
    const direto = reduzido || /[?&]direto\b/.test(window.location.search);

    const lerBruto = () => {
      const r = sec.getBoundingClientRect();
      const total = r.height - palco.offsetHeight;
      return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    };
    let p = lerBruto();
    let ultimo = performance.now();
    let rotuloAtual = '';
    let brilhoAtual = '';

    const pintar = (pp: number) => {
      const f = 0.02;
      for (const c of cenas) {
        let a = 1;
        if (c.de > -1) a *= suave(c.de - f, c.de + f, pp);
        a *= 1 - suave(c.ate - f, c.ate + f, pp);
        if (c.palavra) {
          // a palavra gigante atravessa a tela devagar enquanto a cena dura
          const k = (pp - c.de) / (c.ate - c.de);
          c.el.style.opacity = (a * 0.9).toFixed(3);
          c.el.style.transform = `translate3d(-50%, calc(-50% + ${((0.5 - k) * 6).toFixed(2)}vh), 0)`;
          continue;
        }
        c.el.style.opacity = a.toFixed(3);
        c.el.style.visibility = a > 0.02 ? 'visible' : 'hidden'; // o que não aparece não recebe foco
        if (!c.fixa) c.el.style.transform = `translate3d(0, ${((1 - a) * 18).toFixed(1)}px, 0)`;
        c.el.classList.toggle('ativa', a > 0.6);
      }
      if (miolo) miolo.style.transform = `translate3d(0, ${(-suave(0, 0.12, pp) * 40).toFixed(1)}px, 0)`;
      cheio.style.transform = `scaleY(${pp.toFixed(4)})`;
      marcas.forEach(({ m, p: mp }) => m.classList.toggle('passou', pp >= mp - 0.005));
      let rotulo = CAPITULOS[0][1];
      for (const [cp, nome] of CAPITULOS) if (pp >= cp) rotulo = nome;
      if (rotulo !== rotuloAtual) {
        indice.textContent = rotulo;
        rotuloAtual = rotulo;
      }
      let brilho = BRILHOS[0][1];
      for (const [cp, cor] of BRILHOS) if (pp >= cp) brilho = cor;
      if (brilho !== brilhoAtual) {
        palco.style.setProperty('--brilho', brilho);
        brilhoAtual = brilho;
      }
    };

    let visivel = true;
    const io = new IntersectionObserver((e) => { visivel = e[0].isIntersecting; });
    io.observe(sec);
    let raf = 0;
    const laco = (agora: number) => {
      raf = requestAnimationFrame(laco);
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;
      if (!visivel) return;
      const alvo = lerBruto();
      p = direto ? alvo : p + (alvo - p) * (1 - Math.exp(-dt * 4.2));
      if (Math.abs(alvo - p) < 0.00005) p = alvo;
      pintar(p);
    };
    raf = requestAnimationFrame(laco);

    let destruido = false;
    let cinema: { destruir: () => void } | null = null;
    const semTresD = (motivo?: unknown) => {
      if (motivo) console.warn('Cinema 3D desligado:', motivo);
      sec.classList.add('sem-3d', 'pronto');
    };
    const temWebGL = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
      } catch {
        return false;
      }
    })();
    const canvas = $<HTMLCanvasElement>('.cinema-tela');
    const perdido = (e: Event) => {
      e.preventDefault();
      semTresD('contexto perdido');
    };
    if (!temWebGL) semTresD('sem WebGL');
    else {
      canvas.addEventListener('webglcontextlost', perdido);
      import('../../cinema/cinema.js')
        .then(({ iniciarCinema }) =>
          iniciarCinema({
            canvas,
            lerProgresso: () => p,
            aoQuadro: () => sec.classList.add('pronto'),
            movel,
            reduzido,
          })
        )
        .then((c) => {
          if (destruido) c.destruir();
          else cinema = c;
        })
        .catch((e) => semTresD(e));
    }

    return () => {
      destruido = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener('webglcontextlost', perdido);
      marcas.forEach(({ m }) => m.remove());
      cinema?.destruir();
    };
  }, []);

  const irParaServicos = () => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="cinema" id="inicio" ref={secRef} aria-label="Apresentação da MC Contabilidade">
      <div className="cinema-palco">
        <div className="cinema-brilho" aria-hidden="true" />
        <div className="palavras" aria-hidden="true">
          <span className="palavra" data-de="0.15" data-ate="0.29">Abertura</span>
          <span className="palavra" data-de="0.31" data-ate="0.44">MEI</span>
          <span className="palavra" data-de="0.46" data-ate="0.59">PME</span>
          <span className="palavra" data-de="0.61" data-ate="0.74">Tributos</span>
          <span className="palavra" data-de="0.76" data-ate="0.87">Finanças</span>
        </div>
        <canvas className="cinema-tela" aria-hidden="true" />
        <div className="cinema-veu" aria-hidden="true" />
        <div className="cinema-grao" aria-hidden="true" />

        <div className="cena cena-titulo" data-de="-1" data-ate="0.11">
          <p className="olho">Contabilidade consultiva</p>
          <div className="titulo-base">
            <h1 className="titulo-nome" translate="no">MC&nbsp;Contabilidade</h1>
            <p className="subtitulo">Seu negócio em boas mãos.</p>
            <p className="dica-rolar">
              <span>Role para conhecer</span>
              <IcoSeta />
            </p>
          </div>
        </div>

        <div className="cena" data-de="0.17" data-ate="0.29">
          <div className="cap">
            <p className="cap-num">Abertura de empresa</p>
            <h2>A chave do seu negócio.</h2>
            <span className="cap-linha" aria-hidden="true" />
            <p>Do enquadramento ao CNPJ, cada passo orientado e acompanhado de perto.</p>
          </div>
        </div>

        <div className="cena" data-de="0.33" data-ate="0.44">
          <div className="cap">
            <p className="cap-num">MEI</p>
            <h2>Em dia, sem pensar nisso.</h2>
            <span className="cap-linha" aria-hidden="true" />
            <p>Guias, declaração anual e alguém para responder quando surgir a dúvida.</p>
          </div>
        </div>

        <div className="cena" data-de="0.48" data-ate="0.59">
          <div className="cap">
            <p className="cap-num">Pequenas e médias empresas</p>
            <h2>Cada documento no seu lugar.</h2>
            <span className="cap-linha" aria-hidden="true" />
            <p>Escrituração contábil e fiscal, folha e eSocial com rotina e prazo.</p>
          </div>
        </div>

        <div className="cena" data-de="0.63" data-ate="0.74">
          <div className="cap">
            <p className="cap-num">Consultoria tributária</p>
            <h2>Precisão em cada engrenagem.</h2>
            <span className="cap-linha" aria-hidden="true" />
            <p>Análise do regime tributário para pagar o que é justo, dentro da lei.</p>
          </div>
        </div>

        <div className="cena" data-de="0.78" data-ate="0.87">
          <div className="cap">
            <p className="cap-num">Planejamento financeiro</p>
            <h2>Decisões com clareza.</h2>
            <span className="cap-linha" aria-hidden="true" />
            <p>Fluxo de caixa, DRE e projeções para crescer com segurança.</p>
          </div>
        </div>

        <div className="cena cena-final" data-de="0.91" data-ate="2">
          <div className="cap">
            <h2>Seu negócio em boas mãos.</h2>
            <span className="cap-linha" aria-hidden="true" />
            <div className="cena-acoes">
              <button type="button" className="btn btn-latao" onClick={openForm}>
                <IcoConversa />
                Agendar uma conversa
              </button>
              {temWhatsapp ? (
                <a className="btn btn-contorno" href={getWhatsappLink('Olá! Vim pelo site da MC Contabilidade e gostaria de conversar.')} target="_blank" rel="noopener noreferrer">
                  <IcoWhatsapp />
                  WhatsApp
                </a>
              ) : (
                <button type="button" className="btn btn-contorno" onClick={irParaServicos}>
                  Conhecer os serviços
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="trilho" aria-hidden="true">
          <span className="trilho-cheio" />
        </div>
        <p className="indice" aria-hidden="true">
          Início
        </p>

        <div className="cinema-carregando" aria-live="polite">
          <span className="carregando-ponto" aria-hidden="true" />
          <span>Preparando a vitrine…</span>
        </div>
      </div>
    </section>
  );
};

export default CinemaHero;
