// O mostruário das páginas de serviço: um objeto só, que chega se transformando
// (a chave gira, as pastas se organizam, as engrenagens se montam, o gráfico cresce)
// e depois fica respirando devagar, acompanhando o mouse.
import * as THREE from 'three';
import { criarMateriais, adicionarLuzes, criarPoeira, FABRICAS } from './estudio.js';
import { fontesProntas, criarRenderer, ambienteEstudio, liberar } from './base.js';

const limitar = (x) => Math.min(1, Math.max(0, x));
const saida = (x) => 1 - Math.pow(1 - limitar(x), 3);

// Pose de exibição de cada objeto (a chave de lado, as pastas de frente...) e o tamanho
// que ele ocupa pronto (largura × altura, em unidades da cena), para a câmera enquadrar.
const POSE = {
  monograma: { escala: 1.0, rotY: 0.35, w: 2.1, h: 1.9 },
  chave: { escala: 0.9, rotY: -0.25, w: 2.8, h: 1.5 },
  celular: { escala: 0.95, rotY: -0.3, w: 1.2, h: 2.3 },
  pastas: { escala: 0.95, rotY: -0.35, w: 2.3, h: 1.1 },
  mecanismo: { escala: 0.95, rotY: 0.0, w: 2.4, h: 1.7 },
  grafico: { escala: 0.95, rotY: -0.4, w: 2.8, h: 2.3 },
  pasta: { escala: 1.0, rotY: -0.3, w: 1.7, h: 2.3 },
};

export async function iniciarVitrine({ canvas, objeto, movel = false, reduzido = false, aoPronto, cancelado }) {
  await fontesProntas();
  // se a página já saiu (ou o React montou de novo), não cria nada: o canvas é de outra montagem
  if (cancelado && cancelado()) return { destruir() {} };
  const q = { movel };
  const renderer = criarRenderer(canvas, movel);
  const cena = new THREE.Scene();
  const M = criarMateriais(renderer, q);
  adicionarLuzes(cena);
  ambienteEstudio(renderer, cena);

  const fazer = FABRICAS[objeto] || FABRICAS.monograma;
  const obj = fazer(M);
  const pose = POSE[objeto] || POSE.monograma;
  const suporte = new THREE.Group();
  suporte.add(obj.grupo);
  cena.add(suporte);
  const poeira = criarPoeira(M, { movel: true });
  cena.add(poeira);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  camera.position.set(0, 0, 6.6);

  let largura = 0, altura = 0;
  const medir = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h || (w === largura && h === altura)) return;
    largura = w;
    altura = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // se o espaço for estreito, a lente abre para o objeto caber inteiro
    camera.fov = THREE.MathUtils.lerp(46, 30, limitar((w / h - 0.6) / 0.8));
    // a câmera chega perto até o objeto ocupar ~70% da largura ou ~78% da altura (o que vier primeiro)
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const distW = (pose.w * pose.escala) / (0.7 * 2 * tan * camera.aspect);
    const distH = (pose.h * pose.escala) / (0.78 * 2 * tan);
    camera.position.z = Math.max(distW, distH, 3.2);
    camera.updateProjectionMatrix();
    poeira.material.uniforms.uEscala.value = (h * renderer.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
  };
  medir();
  const ro = new ResizeObserver(medir);
  ro.observe(canvas);

  const mouse = { x: 0, y: 0, ax: 0, ay: 0 };
  const aoMover = (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouse.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  if (!movel && !reduzido) window.addEventListener('pointermove', aoMover, { passive: true });

  let ativo = true;
  const io = new IntersectionObserver((e) => { ativo = e[0].isIntersecting; });
  io.observe(canvas);

  try {
    await renderer.compileAsync(cena, camera);
  } catch (e) {
    /* segue sem pré-compilar */
  }

  let tempo = 0, ultimo = performance.now(), rodando = true, primeiro = true;
  function quadro(agora) {
    if (!rodando) return;
    requestAnimationFrame(quadro);
    const dt = Math.min(0.05, (agora - ultimo) / 1000);
    ultimo = agora;
    if (!ativo) return;
    tempo += dt;
    // chegada: 2,6 s se transformando; quem prefere menos movimento já vê o objeto pronto
    const k = reduzido ? 1 : saida(tempo / 2.6);
    const t = reduzido ? 0 : tempo;
    const chegada = reduzido ? 1 : saida(tempo / 1.4);
    suporte.position.y = (1 - chegada) * -0.6;
    suporte.scale.setScalar(pose.escala * (0.92 + 0.08 * chegada));
    obj.grupo.rotation.y = pose.rotY + (reduzido ? 0 : Math.sin(t * 0.4) * 0.14);
    // a chave chega de cabeça para baixo e dá meia-volta até ficar em pé (etiqueta pendurada para baixo)
    if (objeto === 'chave') obj.grupo.rotation.x = (k - 1) * Math.PI;
    if (objeto === 'monograma') {
      // o arame se desenha e o ouro sobe logo depois, enquanto o monograma vira de frente
      const enchimento = reduzido ? 1 : limitar((tempo - 1.1) / 1.5);
      const virar = enchimento * enchimento * (3 - 2 * enchimento);
      obj.revelar(reduzido ? 1 : limitar(tempo / 1.4), enchimento);
      obj.grupo.rotation.y = pose.rotY + (1 - virar) * -0.7 + (reduzido ? 0 : Math.sin(t * 0.4) * 0.3);
      obj.grupo.rotation.x = (1 - virar) * 0.3;
    }
    if (obj.dourar) obj.dourar(k);
    if (obj.animar) obj.animar(k, t);
    if (obj.organizar) obj.organizar(k);
    const f = 1 - Math.exp(-dt * 3);
    mouse.ax += (mouse.x - mouse.ax) * f;
    mouse.ay += (mouse.y - mouse.ay) * f;
    suporte.rotation.y = mouse.ax * 0.25;
    suporte.rotation.x = mouse.ay * 0.12;
    poeira.material.uniforms.uTempo.value = t;
    renderer.render(cena, camera);
    if (primeiro) {
      primeiro = false;
      if (aoPronto) aoPronto();
    }
  }
  requestAnimationFrame(quadro);

  return {
    destruir() {
      rodando = false;
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', aoMover);
      liberar(renderer);
    },
  };
}
