// Texturas da MC Contabilidade desenhadas no próprio navegador (canvas 2D): a tela do celular,
// a capa da pasta preta, a etiqueta de couro da chave, as lombadas do arquivo e o próprio logotipo.
// Nada aqui baixa imagem e este arquivo não depende do Three.js.

// ---------- utilidades ----------
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const TAU = Math.PI * 2;
const GRAU = Math.PI / 180;

export function tela(w, h = w) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

export function tom(hex, k) {
  const n = parseInt(hex.slice(1), 16);
  const r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const f = (c) => Math.max(0, Math.min(255, Math.round(k >= 0 ? c + (255 - c) * k : c * (1 + k))));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}

function rrect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function granulado(ctx, W, H, n, a = 0.05, seed = 7) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = r() < 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`;
    ctx.fillRect(r() * W, r() * H, 1.5, 1.5);
  }
}

export const FONTE = {
  display: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
  texto: '"Manrope", "Segoe UI", system-ui, sans-serif',
  serifa: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
};

function texto(ctx, t, x, y, { size = 20, peso = 600, cor = '#fff', fam = FONTE.texto, alinhar = 'left', espaco = 0, italico = false } = {}) {
  ctx.font = `${italico ? 'italic ' : ''}${peso} ${size}px ${fam}`;
  ctx.fillStyle = cor;
  ctx.textAlign = alinhar;
  ctx.textBaseline = 'alphabetic';
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${espaco}px`;
  ctx.fillText(t, x, y);
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
}

// ---------- o logotipo MC ----------
// Medidas tiradas do logotipo original (quadro de 1080 px): o M com um "visto" no meio e o C
// entrelaçado. Traço de 39 px, altura total de 434 px, centro em (540, 540).
export const LOGO = {
  traco: 39,
  altura: 434,
  // perna esquerda do M e a diagonal que entra nas costas do C
  a: [[325, 711], [325, 407], [412.5, 474]],
  // o "visto" e a perna direita do M
  b: [[463, 515], [540, 572], [755, 407], [755, 711]],
  // o C: dois arcos ligados por uma reta vertical em x = 412.5
  c: { x: 540, yCima: 470, yBaixo: 600, r: 127.5, fimCima: 21 * GRAU, fimBaixo: 24 * GRAU },
};

export function desenharLogo(ctx, cx, cy, altura, cor) {
  const k = altura / LOGO.altura;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(k, k);
  ctx.translate(-540, -540);
  ctx.strokeStyle = cor;
  ctx.lineWidth = LOGO.traco;
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 8;
  ctx.lineCap = 'butt';
  for (const linha of [LOGO.a, LOGO.b]) {
    ctx.beginPath();
    linha.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
  }
  const { x, yCima, yBaixo, r, fimCima, fimBaixo } = LOGO.c;
  ctx.beginPath();
  ctx.arc(x, yCima, r, -fimCima, -Math.PI, true);
  ctx.lineTo(x - r, yBaixo);
  ctx.arc(x, yBaixo, r, Math.PI, fimBaixo, true);
  ctx.stroke();
  ctx.restore();
}

// dourado de hot-stamping (gradiente que imita a folha metálica)
function ouro(ctx, y0, y1) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  g.addColorStop(0, '#F6E2AE');
  g.addColorStop(0.45, '#D8B26A');
  g.addColorStop(0.7, '#B88B45');
  g.addColorStop(1, '#E9CD8E');
  return g;
}

// ---------- couro da etiqueta da chave ----------
export function desenharEtiquetaChave({ W = 512, H = 896 } = {}) {
  const c = tela(W, H);
  const ctx = c.getContext('2d');
  const k = W / 512;
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#7B4526');
  g.addColorStop(1, '#4A2714');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  granulado(ctx, W, H, W * 18, 0.05, 5);
  ctx.setLineDash([18 * k, 14 * k]);
  ctx.strokeStyle = 'rgba(236,210,160,0.75)';
  ctx.lineWidth = 5 * k;
  rrect(ctx, 34 * k, 34 * k, W - 68 * k, H - 68 * k, 50 * k);
  ctx.stroke();
  ctx.setLineDash([]);
  // furo do ilhós
  ctx.fillStyle = '#2A170C';
  ctx.beginPath();
  ctx.arc(W / 2, 120 * k, 38 * k, 0, TAU);
  ctx.fill();
  const dourado = ouro(ctx, H * 0.3, H * 0.8);
  desenharLogo(ctx, W / 2, H * 0.45, 150 * k, dourado);
  texto(ctx, 'SUA', W / 2, H * 0.66, { size: 66 * k, peso: 600, cor: dourado, alinhar: 'center', espaco: 16 * k, fam: FONTE.display });
  texto(ctx, 'EMPRESA', W / 2, H * 0.75, { size: 66 * k, peso: 600, cor: dourado, alinhar: 'center', espaco: 10 * k, fam: FONTE.display });
  return c;
}

// ---------- capa da pasta preta (a "caixa preta" da MC) ----------
export function desenharCapaPasta({ W = 1024, H = 1366 } = {}) {
  const c = tela(W, H);
  const ctx = c.getContext('2d');
  const k = W / 1024;
  ctx.fillStyle = '#121316';
  ctx.fillRect(0, 0, W, H);
  granulado(ctx, W, H, W * 30, 0.035, 9);
  const dourado = ouro(ctx, H * 0.2, H * 0.7);
  desenharLogo(ctx, W / 2, H * 0.4, 230 * k, dourado);
  texto(ctx, 'MC Contabilidade', W / 2, H * 0.6, { size: 76 * k, peso: 600, cor: dourado, alinhar: 'center', fam: FONTE.display });
  ctx.fillStyle = dourado;
  ctx.fillRect(W / 2 - 60 * k, H * 0.64, 120 * k, 3 * k);
  texto(ctx, 'Proposta de serviços', W / 2, H * 0.7, { size: 50 * k, peso: 500, cor: '#CDB88F', alinhar: 'center', fam: FONTE.serifa, italico: true });
  return c;
}

// ---------- tela do celular: o MEI em dia ----------
function iconeVisto(ctx, x, y, s, cor) {
  ctx.save();
  ctx.strokeStyle = cor;
  ctx.lineWidth = s * 0.16;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x - s * 0.32, y + s * 0.02);
  ctx.lineTo(x - s * 0.08, y + s * 0.26);
  ctx.lineTo(x + s * 0.34, y - s * 0.24);
  ctx.stroke();
  ctx.restore();
}

function pilula(ctx, x, y, t, { fundo, cor, size }) {
  ctx.font = `700 ${size}px ${FONTE.texto}`;
  const w = ctx.measureText(t).width + size * 3.2;
  ctx.fillStyle = fundo;
  rrect(ctx, x, y - size * 1.3, w, size * 2.1, size * 1.05);
  ctx.fill();
  iconeVisto(ctx, x + size * 1.2, y - size * 0.25, size * 1.1, cor);
  texto(ctx, t, x + size * 2.2, y + size * 0.1, { size, peso: 700, cor });
  return w;
}

export function desenharTelaCelular({ W = 720, H = 1480 } = {}) {
  const c = tela(W, H);
  const ctx = c.getContext('2d');
  const k = W / 720;
  const OURO = '#DDBB78', VERDE = '#4CC38A', TXT = '#EEF1F6', FRACO = '#8E9BB0';
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#111D31');
  g.addColorStop(1, '#0A1220');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // barra de status
  texto(ctx, '17:42', 70 * k, 76 * k, { size: 30 * k, peso: 700, cor: TXT });
  ctx.fillStyle = TXT;
  for (let i = 0; i < 4; i++) ctx.fillRect(W - 180 * k + i * 14 * k, 62 * k - i * 5 * k, 9 * k, 14 * k + i * 5 * k);
  rrect(ctx, W - 110 * k, 50 * k, 52 * k, 26 * k, 7 * k);
  ctx.strokeStyle = TXT;
  ctx.lineWidth = 3 * k;
  ctx.stroke();
  ctx.fillRect(W - 105 * k, 55 * k, 36 * k, 16 * k);
  // cabeçalho do app
  desenharLogo(ctx, 100 * k, 196 * k, 54 * k, OURO);
  texto(ctx, 'MC Contabilidade', 150 * k, 208 * k, { size: 30 * k, peso: 700, cor: TXT });
  texto(ctx, 'Olá! Seu MEI', 70 * k, 330 * k, { size: 76 * k, peso: 500, cor: TXT, fam: FONTE.display });
  texto(ctx, 'está em dia.', 70 * k, 410 * k, { size: 76 * k, peso: 500, cor: TXT, fam: FONTE.display });
  const cartao = (y, h) => {
    ctx.fillStyle = '#17263F';
    rrect(ctx, 50 * k, y, W - 100 * k, h, 34 * k);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 2 * k;
    ctx.stroke();
  };
  // guia DAS
  cartao(470 * k, 300 * k);
  texto(ctx, 'GUIA DAS · SETEMBRO', 90 * k, 530 * k, { size: 24 * k, peso: 800, cor: FRACO, espaco: 3 * k });
  texto(ctx, 'Paga', 90 * k, 628 * k, { size: 78 * k, peso: 800, cor: TXT });
  pilula(ctx, 90 * k, 715 * k, 'Comprovante recebido', { fundo: 'rgba(76,195,138,0.16)', cor: VERDE, size: 24 * k });
  ctx.fillStyle = 'rgba(76,195,138,0.14)';
  ctx.beginPath();
  ctx.arc(W - 150 * k, 600 * k, 62 * k, 0, TAU);
  ctx.fill();
  iconeVisto(ctx, W - 150 * k, 600 * k, 70 * k, VERDE);
  // declaração anual
  cartao(800 * k, 190 * k);
  texto(ctx, 'DECLARAÇÃO ANUAL', 90 * k, 860 * k, { size: 24 * k, peso: 800, cor: FRACO, espaco: 3 * k });
  texto(ctx, 'DASN-SIMEI', 90 * k, 930 * k, { size: 42 * k, peso: 800, cor: TXT });
  pilula(ctx, W - 290 * k, 925 * k, 'Entregue', { fundo: 'rgba(76,195,138,0.16)', cor: VERDE, size: 24 * k });
  // faturamento
  cartao(1020 * k, 300 * k);
  texto(ctx, 'FATURAMENTO EM 2026', 90 * k, 1080 * k, { size: 24 * k, peso: 800, cor: FRACO, espaco: 3 * k });
  const meses = [0.42, 0.5, 0.46, 0.58, 0.61, 0.55, 0.66, 0.72, 0.7];
  const bx = 92 * k, by = 1275 * k, bw = 46 * k, gap = 16 * k, bh = 150 * k;
  meses.forEach((v, i) => {
    const x = bx + i * (bw + gap);
    const gg = ctx.createLinearGradient(0, by - bh * v, 0, by);
    gg.addColorStop(0, OURO);
    gg.addColorStop(1, 'rgba(221,187,120,0.3)');
    ctx.fillStyle = gg;
    rrect(ctx, x, by - bh * v, bw, bh * v, 10 * k);
    ctx.fill();
  });
  // barra de navegação
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  rrect(ctx, W / 2 - 110 * k, H - 44 * k, 220 * k, 10 * k, 5 * k);
  ctx.fill();
  return c;
}

// ---------- arquivo: lombadas das pastas ----------
export const LOMBADAS = [
  { cor: '#1C2E4A', t1: 'FISCAL', t2: '2025' },
  { cor: '#5E1C27', t1: 'FOLHA', t2: '2025' },
  { cor: '#1F4436', t1: 'eSocial', t2: 'eventos' },
  { cor: '#2A2E36', t1: 'ECD', t2: '2025' },
  { cor: '#6E4322', t1: 'ECF', t2: '2025' },
  { cor: '#1C2E4A', t1: 'DCTFWeb', t2: 'mensal' },
  { cor: '#3B2D4F', t1: 'NF-e', t2: 'entradas' },
  { cor: '#D6CFBF', t1: 'BALANÇO', t2: '2025', claro: true },
];

export function desenharLombadas({ W = 1024, H = 512 } = {}) {
  const c = tela(W, H);
  const ctx = c.getContext('2d');
  const n = LOMBADAS.length;
  const L = W / n;
  const k = L / 128;
  LOMBADAS.forEach((l, i) => {
    const x = i * L;
    const g = ctx.createLinearGradient(x, 0, x + L, 0);
    g.addColorStop(0, tom(l.cor, -0.25));
    g.addColorStop(0.18, l.cor);
    g.addColorStop(0.82, l.cor);
    g.addColorStop(1, tom(l.cor, -0.3));
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, L, H);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, 0, L, H);
    ctx.clip();
    granulado(ctx, W, H, 900, 0.05, i + 3);
    ctx.restore();
    // etiqueta
    const ex = x + 16 * k, ey = H * 0.14, ew = L - 32 * k, eh = H * 0.34;
    ctx.fillStyle = l.claro ? '#FFFDF7' : '#F4EFE4';
    ctx.fillRect(ex, ey, ew, eh);
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 2 * k;
    ctx.strokeRect(ex, ey, ew, eh);
    ctx.fillStyle = '#B8975A';
    ctx.fillRect(ex + 8 * k, ey + 10 * k, ew - 16 * k, 3 * k);
    const size = Math.min(22 * k, (ew - 10 * k) / Math.max(4, l.t1.length * 0.62));
    texto(ctx, l.t1, x + L / 2, ey + eh * 0.5, { size, peso: 800, cor: '#1B2230', alinhar: 'center' });
    texto(ctx, l.t2, x + L / 2, ey + eh * 0.76, { size: 17 * k, peso: 600, cor: '#5A6070', alinhar: 'center' });
    // furo para o dedo
    const fy = H * 0.8;
    ctx.fillStyle = 'rgba(10,10,12,0.9)';
    ctx.beginPath();
    ctx.arc(x + L / 2, fy, 18 * k, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = 'rgba(200,190,170,0.8)';
    ctx.lineWidth = 4 * k;
    ctx.stroke();
  });
  return c;
}

// ---------- brilho redondo (partículas de poeira dourada) ----------
export function desenharBrilho(ctx, S, cor = '255,232,196') {
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, `rgba(${cor},1)`);
  g.addColorStop(0.22, `rgba(${cor},0.5)`);
  g.addColorStop(0.55, `rgba(${cor},0.12)`);
  g.addColorStop(1, `rgba(${cor},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
}
