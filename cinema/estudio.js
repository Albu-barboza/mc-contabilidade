// O "estúdio" da MC Contabilidade: fundo escuro limpo (desenhado pela página, atrás do canvas),
// luz de vitrine e um objeto-símbolo por vez. Conforme a pessoa rola, o objeto entra de baixo girando,
// se transforma (a chave gira, as pastas se organizam, as engrenagens se montam, o gráfico cresce)
// e sai por cima, dando lugar ao próximo. Nada de preço à mostra: o valor está nos detalhes.
import * as THREE from 'three';
import * as T from './texturas.js';
import * as O from './objetos.js';

const limitar = (x) => Math.min(1, Math.max(0, x));
const suave = (a, b, x) => {
  const t = limitar((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Janelas da rolagem (0 a 1): entra de a→b, fica até c, sai de c→d. A página usa as mesmas
// marcas para os textos (CinemaHero.tsx).
export const CENAS = [
  { id: 'monograma', a: -1, b: 0, c: 0.11, d: 0.17 },
  { id: 'chave', a: 0.11, b: 0.18, c: 0.27, d: 0.33 },
  { id: 'celular', a: 0.27, b: 0.34, c: 0.42, d: 0.48 },
  { id: 'pastas', a: 0.42, b: 0.49, c: 0.57, d: 0.63 },
  { id: 'mecanismo', a: 0.57, b: 0.64, c: 0.72, d: 0.78 },
  { id: 'grafico', a: 0.72, b: 0.79, c: 0.85, d: 0.9 },
  { id: 'pasta', a: 0.85, b: 0.92, c: 2, d: 3 },
];

function criarMateriais(renderer, q) {
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const deCanvas = (c) => {
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = aniso;
    return t;
  };
  const brilho = T.tela(64, 64);
  T.desenharBrilho(brilho.getContext('2d'), 64);
  const tex = {
    brilho: deCanvas(brilho),
    etiqueta: deCanvas(T.desenharEtiquetaChave(q.movel ? { W: 256, H: 448 } : {})),
    capa: deCanvas(T.desenharCapaPasta(q.movel ? { W: 640, H: 854 } : {})),
    celular: deCanvas(T.desenharTelaCelular(q.movel ? { W: 540, H: 1110 } : {})),
    lombadas: deCanvas(T.desenharLombadas(q.movel ? { W: 512, H: 256 } : {})),
  };
  const std = (o) => new THREE.MeshStandardMaterial(o);
  const fis = (o) => new THREE.MeshPhysicalMaterial(o);
  return {
    tex,
    latao: std({ color: '#E0BF7B', metalness: 1, roughness: 0.2 }),
    lataoClaro: std({ color: '#EACD8F', metalness: 1, roughness: 0.18 }),
    lataoEscovado: std({ color: '#CDAA6A', metalness: 1, roughness: 0.38 }),
    lataoPolido: std({ color: '#E8C67F', metalness: 1, roughness: 0.1 }),
    aco: std({ color: '#C8CDD4', metalness: 1, roughness: 0.22 }),
    acoPolido: std({ color: '#DADDE2', metalness: 1, roughness: 0.12 }),
    acoEscuro: std({ color: '#1C1F24', metalness: 0.6, roughness: 0.32 }),
    parafuso: std({ color: '#3552A8', metalness: 1, roughness: 0.22 }),
    rubi: fis({ color: '#B0122B', metalness: 0, roughness: 0.08, clearcoat: 1, emissive: '#3A0008' }),
    aluminioEscuro: std({ color: '#2B2F36', metalness: 0.85, roughness: 0.3 }),
    laca: fis({ color: '#0D0E11', metalness: 0.1, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08 }),
    lente: fis({ color: '#07080A', metalness: 0.2, roughness: 0.05, clearcoat: 1 }),
    vidroTela: std({ color: '#FFFFFF', metalness: 0, roughness: 0.04, transparent: true, opacity: 0.08, depthWrite: false }),
    couroEtiqueta: std({ color: '#5E3219', roughness: 0.62 }),
    couroPreto: fis({ color: '#121316', roughness: 0.55, clearcoat: 0.25, clearcoatRoughness: 0.5 }),
    papel: std({ color: '#F2ECDF', roughness: 0.9 }),
    pastas: std({ map: tex.lombadas, roughness: 0.5 }),
    vidroAmbar: fis({ color: '#D39A3E', metalness: 0.25, roughness: 0.16, transparent: true, opacity: 0.92, emissive: '#7A4A10', emissiveIntensity: 0.55, clearcoat: 1 }),
    luzOuro: new THREE.MeshBasicMaterial({ color: '#FFE3AA', transparent: true }),
    telaCelular: new THREE.MeshBasicMaterial({ map: tex.celular, toneMapped: false }),
    etiqueta: std({ map: tex.etiqueta, roughness: 0.6 }),
    capa: std({ map: tex.capa, roughness: 0.45, metalness: 0.25 }),
  };
}

// Poeira dourada flutuando no ar (sobe devagar e acompanha a rolagem).
function criarPoeira(M, q) {
  const n = q.movel ? 150 : 300;
  const r = T.rng(5);
  const pos = new Float32Array(n * 3), tam = new Float32Array(n), fase = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    pos.set([(r() - 0.5) * 14, (r() - 0.5) * 9, -8 + r() * 10], i * 3);
    tam[i] = 0.015 + r() * r() * 0.06;
    fase[i] = r() * 6.28;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('tamanho', new THREE.BufferAttribute(tam, 1));
  geo.setAttribute('fase', new THREE.BufferAttribute(fase, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uMapa: { value: M.tex.brilho }, uEscala: { value: 800 }, uTempo: { value: 0 }, uRolagem: { value: 0 } },
    vertexShader: `
      attribute float tamanho; attribute float fase;
      uniform float uEscala; uniform float uTempo; uniform float uRolagem;
      varying float vAlfa;
      void main(){
        vec3 p = position;
        p.y = mod(p.y + uTempo * (0.05 + tamanho) + uRolagem * 5.0 + 4.5, 9.0) - 4.5;
        p.x += sin(uTempo * 0.3 + fase) * 0.15;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = tamanho * uEscala / max(-mv.z, 0.1);
        vAlfa = 0.35 + 0.35 * sin(uTempo * 1.2 + fase * 3.0);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform sampler2D uMapa;
      varying float vAlfa;
      void main(){
        float a = texture2D(uMapa, gl_PointCoord).a * vAlfa;
        gl_FragColor = vec4(vec3(1.0, 0.86, 0.6), a);
      }`,
  });
  const pontos = new THREE.Points(geo, mat);
  pontos.frustumCulled = false;
  pontos.renderOrder = 10;
  return pontos;
}

export function montarEstudio(renderer, q) {
  const M = criarMateriais(renderer, q);
  const cena = new THREE.Scene();

  // luz de vitrine: principal quente do alto à esquerda, contraluz fria do outro lado
  const principal = new THREE.DirectionalLight('#FFE6C2', 2.4);
  principal.position.set(-4, 5, 6);
  const contra = new THREE.DirectionalLight('#9FB8FF', 1.6);
  contra.position.set(5, 2, -5);
  const baixo = new THREE.DirectionalLight('#FFC98A', 0.6);
  baixo.position.set(2, -4, 3);
  cena.add(principal, contra, baixo, new THREE.HemisphereLight('#DDE6FF', '#1A1410', 0.35));

  const palco = new THREE.Group();
  cena.add(palco);
  const objetos = {
    monograma: O.monograma(M),
    chave: O.chave(M, M.etiqueta),
    celular: O.celular(M, M.telaCelular),
    pastas: O.pastas(M),
    mecanismo: O.mecanismo(M),
    grafico: O.grafico(M),
    pasta: O.pastaPreta(M, M.capa),
  };
  const suportes = {};
  for (const c of CENAS) {
    const s = new THREE.Group();
    s.add(objetos[c.id].grupo);
    s.visible = false;
    palco.add(s);
    suportes[c.id] = s;
  }
  const poeira = criarPoeira(M, q);
  cena.add(poeira);

  const mouse = { x: 0, y: 0, ax: 0, ay: 0 };
  // enquadramento: no celular em pé o objeto sobe (o texto fica embaixo); na tela larga ele vai para a direita
  let deslocX = 0, deslocY = 0, escalaRetrato = 1;
  // objetos compridos encolhem na tela em pé para caber de ponta a ponta
  const LARGOS = new Set(['chave', 'pastas', 'mecanismo', 'grafico']);
  const enquadrar = (aspecto) => {
    const largo = limitar((aspecto - 1.0) / 0.6);
    const retrato = limitar((1.0 - aspecto) / 0.45);
    deslocX = 1.15 * largo;
    deslocY = 0.62 * retrato;
    escalaRetrato = 1 - 0.3 * retrato;
  };

  const atualizar = (p, t, dt) => {
    for (const c of CENAS) {
      const s = suportes[c.id];
      const ent = c.a < 0 ? 1 : suave(c.a, c.b, p);
      const sai = suave(c.c, c.d, p);
      const vis = ent > 0.001 && sai < 0.999;
      s.visible = vis;
      if (!vis) continue;
      // entra subindo e girando; sai subindo e recuando
      const centro = c.id === 'monograma' ? 0 : 1;
      s.position.set(deslocX * centro, deslocY * centro + (1 - ent) * -3.4 + sai * 3.6, -sai * 1.6 - (1 - ent) * 0.8);
      s.rotation.set((1 - ent) * 0.35 - sai * 0.25, (1 - ent) * -1.5 + sai * 1.2, 0);
      s.scale.setScalar((0.8 + 0.2 * ent - 0.12 * sai) * (LARGOS.has(c.id) ? escalaRetrato : 1));
      const k = limitar((p - c.a - (c.b - c.a) * 0.5) / (c.c - c.a - (c.b - c.a) * 0.5));
      const obj = objetos[c.id];
      if (obj.animar) obj.animar(k, t);
      if (obj.organizar) obj.organizar(limitar((p - c.a) / (c.c - c.a) * 1.25));
    }
    // o monograma respira devagar; a chave gira como se abrisse a porta
    objetos.monograma.grupo.rotation.y = Math.sin(t * 0.4) * 0.32 + p * 4;
    objetos.chave.grupo.rotation.x = suave(0.17, 0.3, p) * Math.PI;
    objetos.chave.grupo.rotation.y = Math.sin(t * 0.35) * 0.18;
    // um pouco de interação: o palco acompanha o mouse
    const f = 1 - Math.exp(-dt * 3);
    mouse.ax += (mouse.x - mouse.ax) * f;
    mouse.ay += (mouse.y - mouse.ay) * f;
    palco.rotation.y = mouse.ax * 0.22;
    palco.rotation.x = mouse.ay * 0.12;
    poeira.material.uniforms.uTempo.value = t;
    poeira.material.uniforms.uRolagem.value = p;
  };

  return { cena, M, atualizar, mouse, enquadrar, poeira };
}
