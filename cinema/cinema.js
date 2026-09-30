// O motor do passeio: um canvas transparente sobre o fundo da página, com a câmera parada
// (como numa vitrine) e os objetos animados pela rolagem (ver estudio.js).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { montarEstudio, CENAS } from './estudio.js';

export { CENAS };

async function fontesProntas() {
  if (!document.fonts || !document.fonts.load) return;
  const pedidos = [
    '500 64px "Cormorant Garamond"', '600 64px "Cormorant Garamond"',
    '500 64px "Manrope"', '600 64px "Manrope"', '700 64px "Manrope"', '800 64px "Manrope"',
    'italic 500 64px "Cormorant Garamond"',
  ].map((f) => document.fonts.load(f).catch(() => null));
  await Promise.race([Promise.all(pedidos), new Promise((r) => setTimeout(r, 3500))]);
}

export async function iniciarCinema({ canvas, lerProgresso, aoQuadro, movel = false, reduzido = false }) {
  await fontesProntas();
  const q = { movel };

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  let dpr = Math.min(window.devicePixelRatio || 1, movel ? 1.75 : 2);
  renderer.setPixelRatio(dpr);

  const estudio = montarEstudio(renderer, q);
  const { cena, atualizar, mouse, enquadrar, poeira } = estudio;

  // reflexos neutros de estúdio: o latão brilha como latão
  const pmrem = new THREE.PMREMGenerator(renderer);
  cena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  cena.environmentIntensity = 0.9;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
  camera.position.set(0, 0, 6.4);

  let largura = 0, altura = 0;
  function medir(forcar = false) {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    if (!forcar && w === largura && Math.abs(h - altura) < 120) return;
    largura = w;
    altura = h;
    renderer.setSize(w, h, false);
    const aspecto = w / h;
    camera.aspect = aspecto;
    // tela em pé pede lente mais aberta para o objeto caber na largura
    camera.fov = THREE.MathUtils.lerp(50, 32, THREE.MathUtils.clamp((aspecto - 0.45) / 0.9, 0, 1));
    camera.updateProjectionMatrix();
    enquadrar(aspecto);
    poeira.material.uniforms.uEscala.value = (h * dpr) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
  }
  medir(true);
  const ro = new ResizeObserver(() => medir());
  ro.observe(canvas);

  const aoMover = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (!movel && !reduzido) window.addEventListener('pointermove', aoMover, { passive: true });

  try {
    atualizar(0, 0, 0);
    await renderer.compileAsync(cena, camera);
  } catch (e) {
    /* segue sem pré-compilar */
  }

  let ativo = true;
  const io = new IntersectionObserver((ents) => { ativo = ents[0].isIntersecting; }, { rootMargin: '100px' });
  io.observe(canvas);
  const aoVisibilidade = () => { ativo = !document.hidden; };
  document.addEventListener('visibilitychange', aoVisibilidade);

  let ultimo = performance.now();
  let tempo = 0;
  let lentos = 0, contagem = 0;
  let rodando = true;

  function quadro(agora) {
    if (!rodando) return;
    requestAnimationFrame(quadro);
    const dt = Math.min(0.05, (agora - ultimo) / 1000);
    ultimo = agora;
    if (!ativo) return;
    if (!reduzido) tempo += dt;
    const p = lerProgresso(); // já vem suavizado pela página
    atualizar(p, tempo, dt);
    renderer.render(cena, camera);
    if (aoQuadro) aoQuadro(p);
    // se o aparelho estiver sofrendo, baixa a resolução um pouco
    contagem++;
    if (dt > 0.034) lentos++;
    if (contagem >= 90) {
      if (lentos > 45 && dpr > 0.75) {
        dpr = Math.max(0.75, dpr - 0.25);
        renderer.setPixelRatio(dpr);
        medir(true);
      }
      contagem = 0;
      lentos = 0;
    }
  }
  requestAnimationFrame(quadro);

  return {
    camera,
    renderer,
    destruir() {
      rodando = false;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', aoVisibilidade);
      window.removeEventListener('pointermove', aoMover);
      renderer.dispose();
    },
  };
}
