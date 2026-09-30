// Peças comuns aos dois motores 3D (o passeio da página inicial e o mostruário das outras páginas).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// As texturas desenham texto em canvas: espera as fontes chegarem (no máximo 3,5 s).
export async function fontesProntas() {
  if (!document.fonts || !document.fonts.load) return;
  const pedidos = [
    '500 64px "Cormorant Garamond"', '600 64px "Cormorant Garamond"',
    '500 64px "Manrope"', '600 64px "Manrope"', '700 64px "Manrope"', '800 64px "Manrope"',
    'italic 500 64px "Cormorant Garamond"',
  ].map((f) => document.fonts.load(f).catch(() => null));
  await Promise.race([Promise.all(pedidos), new Promise((r) => setTimeout(r, 3500))]);
}

// Canvas transparente sobre o fundo da página, com o tom de cor do cinema.
export function criarRenderer(canvas, movel) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, movel ? 1.75 : 2));
  // o monograma se enche de ouro por um plano de corte (só vale para materiais que pedem)
  renderer.localClippingEnabled = true;
  return renderer;
}

// Reflexos neutros de estúdio: o latão brilha como latão.
export function ambienteEstudio(renderer, cena) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  cena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  cena.environmentIntensity = 0.9;
  pmrem.dispose();
}

// Libera a placa de vídeo ao sair da página (o site troca de página sem recarregar).
export function liberar(renderer) {
  renderer.dispose();
  renderer.forceContextLoss();
}
