// Os objetos-símbolo da MC Contabilidade, um para cada serviço, montados com formas do Three.js.
// Cada função devolve um grupo centrado na origem, com ~2,4 unidades no lado maior.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { rng, LOGO, LOMBADAS } from './texturas.js';

const TAU = Math.PI * 2;
export const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const V2 = (x, y) => new THREE.Vector2(x, y);
const limitar = (x) => Math.min(1, Math.max(0, x));
const suave = (x) => {
  const t = limitar(x);
  return t * t * (3 - 2 * t);
};

// ---------- utilidades ----------
export function malha(geo, mat) {
  return new THREE.Mesh(geo, mat);
}

function juntar(geos) {
  const prontos = geos.map((g) => {
    const n = g.index ? g.toNonIndexed() : g.clone();
    for (const k of Object.keys(n.attributes)) {
      if (!['position', 'normal', 'uv'].includes(k)) n.deleteAttribute(k);
    }
    if (!n.attributes.normal) n.computeVertexNormals();
    if (!n.attributes.uv) n.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n.attributes.position.count * 2), 2));
    n.clearGroups();
    return n;
  });
  return mergeGeometries(prontos, false);
}

function caixa(w, h, d, mat, x = 0, y = 0, z = 0, raio = 0) {
  const m = malha(raio > 0 ? new RoundedBoxGeometry(w, h, d, 3, raio) : new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

function cilindroEntre(a, b, r, mat, seg = 24) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const m = malha(new THREE.CylinderGeometry(r, r, dir.length(), seg, 1), mat);
  m.position.copy(a).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(V3(0, 1, 0), dir.normalize());
  return m;
}

function extrudar(shapes, prof, bisel = 0.01, curvas = 16) {
  const g = new THREE.ExtrudeGeometry(shapes, {
    depth: prof, bevelEnabled: bisel > 0, bevelThickness: bisel, bevelSize: bisel * 0.8, bevelSegments: 4, curveSegments: curvas,
  });
  g.translate(0, 0, -prof / 2);
  return g;
}

// retângulo de cantos redondos com UV de 0 a 1 (telas e capas)
function planoArredondado(w, h, r) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  const g = new THREE.ShapeGeometry(s, 12);
  const uv = g.attributes.uv, pos = g.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
  return g;
}

// ---------- o monograma MC em 3D ----------
function contornoTraco(pts, w) {
  const n = pts.length;
  const esq = [], dir = [];
  const normal = (a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const L = Math.hypot(dx, dy);
    return [-dy / L, dx / L];
  };
  for (let i = 0; i < n; i++) {
    let nx, ny, esc = 1;
    if (i === 0) [nx, ny] = normal(pts[0], pts[1]);
    else if (i === n - 1) [nx, ny] = normal(pts[n - 2], pts[n - 1]);
    else {
      const n1 = normal(pts[i - 1], pts[i]), n2 = normal(pts[i], pts[i + 1]);
      let mx = n1[0] + n2[0], my = n1[1] + n2[1];
      const L = Math.hypot(mx, my);
      mx /= L;
      my /= L;
      esc = 1 / Math.max(0.25, mx * n1[0] + my * n1[1]);
      nx = mx;
      ny = my;
    }
    const h = (w / 2) * esc;
    esq.push([pts[i][0] + nx * h, pts[i][1] + ny * h]);
    dir.push([pts[i][0] - nx * h, pts[i][1] - ny * h]);
  }
  return [...esq, ...dir.reverse()];
}

function contornoC() {
  const { x, yCima, yBaixo, r, fimCima, fimBaixo } = LOGO.c;
  const w = LOGO.traco;
  const ro = r + w / 2, ri = r - w / 2;
  const pts = [];
  const arco = (cx, cy, raio, a0, a1, n = 32) => {
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      pts.push([cx + raio * Math.cos(a), cy + raio * Math.sin(a)]);
    }
  };
  arco(x, yCima, ro, -fimCima, -Math.PI);
  arco(x, yBaixo, ro, Math.PI, fimBaixo);
  arco(x, yBaixo, ri, fimBaixo, Math.PI);
  arco(x, yCima, ri, -Math.PI, -fimCima);
  return pts;
}

// Geometria do logotipo com altura 1 (centrada na origem, virada para +z).
export function geoMonograma({ prof = 0.12, bisel = 0.012 } = {}) {
  const paraShape = (pts) => new THREE.Shape(pts.map(([x, y]) => V2((x - 540) / LOGO.altura, -(y - 540) / LOGO.altura)));
  const w = LOGO.traco;
  const formas = [paraShape(contornoTraco(LOGO.a, w)), paraShape(contornoTraco(LOGO.b, w)), paraShape(contornoC())];
  return juntar(formas.map((s) => extrudar(s, prof, bisel, 32)));
}

export function monograma(M) {
  const g = new THREE.Group();
  const m = malha(geoMonograma({ prof: 0.2, bisel: 0.022 }), M.latao);
  m.scale.setScalar(1.9);
  g.add(m);
  return { grupo: g };
}

// ---------- I · a chave (a cabeça da chave é o próprio monograma) ----------
export function chave(M, etiquetaMat) {
  const g = new THREE.Group();
  const xc = -0.9;
  const aro = malha(new THREE.TorusGeometry(0.46, 0.07, 24, 120), M.latao);
  aro.position.x = xc;
  g.add(aro);
  const mono = malha(geoMonograma({ prof: 0.1, bisel: 0.012 }), M.latao);
  mono.scale.setScalar(0.52);
  mono.position.set(xc, 0, 0);
  g.add(mono);
  // pescoço com anéis, haste e ponta
  g.add(cilindroEntre(V3(xc + 0.44, 0, 0), V3(-0.18, 0, 0), 0.1, M.latao, 40));
  for (const x of [-0.34, -0.22]) {
    const anel = malha(new THREE.TorusGeometry(0.105, 0.022, 12, 40), M.lataoEscovado);
    anel.rotation.y = Math.PI / 2;
    anel.position.x = x;
    g.add(anel);
  }
  g.add(cilindroEntre(V3(-0.18, 0, 0), V3(1.28, 0, 0), 0.066, M.latao, 40));
  const ponta = malha(new THREE.SphereGeometry(0.066, 24, 16), M.latao);
  ponta.position.x = 1.28;
  g.add(ponta);
  // segredo: os dentes pendurados na ponta da haste
  g.add(caixa(0.56, 0.08, 0.06, M.latao, 0.96, -0.08, 0, 0.01));
  for (const [x, h] of [[0.74, 0.3], [0.87, 0.2], [0.99, 0.36], [1.12, 0.24]]) g.add(caixa(0.1, h, 0.06, M.latao, x, -0.08 - h / 2, 0, 0.012));
  // argolinha e a etiqueta de couro "SUA EMPRESA"
  const argola = malha(new THREE.TorusGeometry(0.1, 0.014, 10, 40), M.latao);
  argola.position.set(xc - 0.5, -0.14, 0);
  argola.rotation.y = Math.PI / 2;
  g.add(argola);
  const etiqueta = new THREE.Group();
  const couro = malha(new RoundedBoxGeometry(0.5, 0.87, 0.03, 3, 0.012), M.couroEtiqueta);
  etiqueta.add(couro);
  const face = malha(planoArredondado(0.49, 0.86, 0.06), etiquetaMat);
  face.position.z = 0.0155;
  etiqueta.add(face);
  const ilhos = malha(new THREE.TorusGeometry(0.035, 0.01, 8, 24), M.latao);
  ilhos.position.set(0, 0.315, 0.017);
  etiqueta.add(ilhos);
  // a etiqueta pende da argolinha: o furo dela fica no ponto de apoio
  etiqueta.children.forEach((c) => (c.position.y -= 0.315));
  const pendulo = new THREE.Group();
  pendulo.position.set(xc - 0.5, -0.2, 0.02);
  pendulo.add(etiqueta);
  pendulo.rotation.z = -0.2;
  g.add(pendulo);
  // centraliza o conjunto
  g.children.forEach((c) => (c.position.x -= 0.05));
  const animar = (k, t) => {
    pendulo.rotation.z = -0.2 + Math.sin(t * 1.3) * 0.06;
  };
  return { grupo: g, animar };
}

// ---------- II · o celular com o MEI em dia ----------
export function celular(M, telaMat) {
  const g = new THREE.Group();
  const W = 0.8, H = 1.66, D = 0.085;
  g.add(malha(new RoundedBoxGeometry(W, H, D, 6, 0.1), M.aluminioEscuro));
  const tela = malha(planoArredondado(W - 0.05, H - 0.05, 0.085), telaMat);
  tela.position.z = D / 2 + 0.002;
  g.add(tela);
  const vidro = malha(planoArredondado(W - 0.02, H - 0.02, 0.095), M.vidroTela);
  vidro.position.z = D / 2 + 0.004;
  g.add(vidro);
  // ilha da câmera (a da frente, em cima)
  const ilha = malha(planoArredondado(0.2, 0.055, 0.027), M.laca);
  ilha.position.set(0, H / 2 - 0.085, D / 2 + 0.005);
  g.add(ilha);
  // câmeras de trás
  const mod = caixa(0.32, 0.32, 0.024, M.aluminioEscuro, -W / 2 + 0.22, H / 2 - 0.22, -D / 2 - 0.01, 0.07);
  g.add(mod);
  for (const [x, y] of [[-W / 2 + 0.15, H / 2 - 0.15], [-W / 2 + 0.29, H / 2 - 0.29], [-W / 2 + 0.15, H / 2 - 0.29]]) {
    const lente = malha(new THREE.CylinderGeometry(0.052, 0.052, 0.03, 32), M.lente);
    lente.rotation.x = Math.PI / 2;
    lente.position.set(x, y, -D / 2 - 0.028);
    g.add(lente);
  }
  // botões laterais
  g.add(caixa(0.012, 0.22, 0.03, M.aluminioEscuro, W / 2 + 0.004, 0.3, 0, 0.005));
  g.add(caixa(0.012, 0.14, 0.03, M.aluminioEscuro, -W / 2 - 0.004, 0.42, 0, 0.005));
  g.add(caixa(0.012, 0.14, 0.03, M.aluminioEscuro, -W / 2 - 0.004, 0.24, 0, 0.005));
  g.scale.setScalar(1.62);
  const raiz = new THREE.Group();
  raiz.add(g);
  const animar = (k, t) => {
    g.rotation.y = Math.sin(t * 0.5) * 0.12;
    g.rotation.x = Math.sin(t * 0.37) * 0.05;
  };
  return { grupo: raiz, animar };
}

// ---------- III · as pastas que se organizam sozinhas ----------
function geoPasta(k, w, h, d) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const uv = geo.attributes.uv;
  const n = LOMBADAS.length;
  const u0 = k / n, u1 = (k + 1) / n;
  // faces do BoxGeometry: +x, -x, +y, -y, +z, -z (4 vértices cada); a lombada é a +z
  for (let f = 0; f < 6; f++) {
    for (let v = 0; v < 4; v++) {
      const i = f * 4 + v;
      if (f === 4) uv.setXY(i, u0 + uv.getX(i) * (u1 - u0), uv.getY(i));
      else uv.setXY(i, (u0 + u1) / 2, 0.04);
    }
  }
  return geo;
}

export function pastas(M) {
  const g = new THREE.Group();
  const r = rng(11);
  const n = LOMBADAS.length;
  const w = 0.25, h = 1.04, d = 0.96, folga = 0.012;
  const itens = [];
  for (let i = 0; i < n; i++) {
    const m = malha(geoPasta(i, w, h, d), M.pastas);
    const fim = V3((i - (n - 1) / 2) * (w + folga), 0, 0);
    const ini = V3((r() - 0.5) * 3.6, (r() - 0.5) * 2.4, (r() - 0.5) * 1.8 - 0.4);
    const qi = new THREE.Quaternion().setFromEuler(new THREE.Euler((r() - 0.5) * 2.2, (r() - 0.5) * 3, (r() - 0.5) * 2.2));
    const qf = new THREE.Quaternion();
    itens.push({ m, ini, fim, qi, qf, atraso: i * 0.05 });
    g.add(m);
  }
  // aparadores de latão, que chegam quando tudo já está no lugar
  const largura = n * (w + folga);
  const aparadores = [-1, 1].map((lado) => {
    const a = new THREE.Group();
    a.add(caixa(0.05, 0.9, 0.7, M.lataoEscovado, 0, -0.07, 0, 0.012));
    a.add(caixa(0.36, 0.04, 0.7, M.lataoEscovado, -lado * 0.16, -0.5, 0, 0.012));
    a.position.x = lado * (largura / 2 + 0.05);
    g.add(a);
    return a;
  });
  const organizar = (k) => {
    for (const it of itens) {
      const t = suave((k - it.atraso) / 0.62);
      it.m.position.lerpVectors(it.ini, it.fim, t);
      it.m.quaternion.slerpQuaternions(it.qi, it.qf, t);
    }
    const a = suave((k - 0.72) / 0.2);
    aparadores.forEach((ap, i) => {
      ap.visible = a > 0.01;
      ap.position.y = (1 - a) * -0.6;
      ap.scale.setScalar(Math.max(0.001, a));
      ap.position.x = (i ? 1 : -1) * (largura / 2 + 0.05 + (1 - a) * 0.6);
    });
  };
  organizar(0);
  return { grupo: g, organizar };
}

// ---------- IV · o mecanismo de relógio (engrenagens que se montam) ----------
export function geoEngrenagem({ z = 24, modulo = 0.006, esp = 0.012, furo = 0.006, raios = 5, bisel = 0.0012 } = {}) {
  const r = (modulo * z) / 2;
  const r0 = r - modulo * 1.15, r1 = r + modulo;
  const s = new THREE.Shape();
  const passo = TAU / z;
  for (let i = 0; i < z; i++) {
    const a = i * passo;
    // pé do dente, flanco, topo, flanco; o fundo liga até o próximo dente
    const p = [[r0, 0.12], [r1, 0.34], [r1, 0.66], [r0, 0.88]];
    p.forEach(([rr, f], j) => {
      const ang = a + f * passo;
      const x = rr * Math.cos(ang), y = rr * Math.sin(ang);
      if (i === 0 && j === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    });
  }
  s.closePath();
  const furoC = new THREE.Path();
  furoC.absarc(0, 0, furo, 0, TAU, true);
  s.holes.push(furoC);
  if (raios > 0 && r0 > furo * 4) {
    const rAro = r0 - Math.max(modulo * 1.2, r * 0.12);
    const rCubo = furo + Math.max(modulo, r * 0.14);
    const larg = Math.min(0.5, (0.09 * TAU) / raios + 0.03);
    for (let k = 0; k < raios; k++) {
      const a0 = (k / raios) * TAU + larg / 2, a1 = ((k + 1) / raios) * TAU - larg / 2;
      const jan = new THREE.Path();
      jan.absarc(0, 0, rAro, a0, a1, false);
      jan.absarc(0, 0, rCubo, a1, a0, true);
      jan.closePath();
      s.holes.push(jan);
    }
  }
  return extrudar(s, esp, bisel, 10);
}

export function mecanismo(M) {
  const g = new THREE.Group();
  const mod = 0.0058;
  const rodas = [];
  const nova = ({ z, mat, raios = 5, esp = 0.01 }) => {
    const mesh = malha(geoEngrenagem({ z, modulo: mod, esp, raios, furo: 0.0055 }), mat);
    const roda = { mesh, z, r: (mod * z) / 2, fase: 0, w: 0 };
    g.add(mesh);
    rodas.push(roda);
    return roda;
  };
  // engrena b em a, na direção phi (b gira ao contrário, na razão dos dentes)
  const engrenar = (a, b, phi, prof = a.mesh.position.z) => {
    const d = a.r + b.r;
    b.mesh.position.set(a.mesh.position.x + d * Math.cos(phi), a.mesh.position.y + d * Math.sin(phi), prof);
    b.w = (-a.w * a.z) / b.z;
    const pa = TAU / a.z, pb = TAU / b.z;
    const ua = ((((phi - a.fase) / pa) % 1) + 1) % 1;
    b.fase = phi + Math.PI - (0.5 - ua) * pb;
  };
  const coaxial = (a, b, dz) => {
    b.mesh.position.set(a.mesh.position.x, a.mesh.position.y, a.mesh.position.z + dz);
    b.w = a.w;
  };

  const principal = nova({ z: 64, mat: M.latao, raios: 6, esp: 0.012 });
  principal.mesh.position.set(0, 0.02, 0);
  principal.w = 0.05;
  const p1 = nova({ z: 10, mat: M.aco, raios: 0 });
  engrenar(principal, p1, -0.62, 0.0);
  const r1 = nova({ z: 50, mat: M.latao, raios: 5 });
  coaxial(p1, r1, 0.018);
  const p2 = nova({ z: 8, mat: M.aco, raios: 0 });
  engrenar(r1, p2, 0.55, 0.018);
  const r2 = nova({ z: 40, mat: M.lataoClaro, raios: 5, esp: 0.009 });
  coaxial(p2, r2, -0.017);
  const p3 = nova({ z: 8, mat: M.aco, raios: 0 });
  engrenar(r2, p3, 1.7, 0.001);
  const r3 = nova({ z: 30, mat: M.latao, raios: 4, esp: 0.008 });
  coaxial(p3, r3, 0.017);
  const lado = nova({ z: 36, mat: M.lataoClaro, raios: 5 });
  engrenar(principal, lado, 3.55, 0.0);
  const lado2 = nova({ z: 12, mat: M.aco, raios: 0 });
  engrenar(lado, lado2, 2.3, 0.0);
  const lado3 = nova({ z: 44, mat: M.latao, raios: 5, esp: 0.009 });
  coaxial(lado2, lado3, -0.016);

  // balanço (roda com aro pesado) e a espiral
  const balanco = new THREE.Group();
  balanco.add(malha(new THREE.TorusGeometry(0.075, 0.0065, 12, 64), M.lataoClaro));
  for (let k = 0; k < 3; k++) {
    const raio = malha(new THREE.BoxGeometry(0.15, 0.006, 0.004), M.lataoClaro);
    raio.rotation.z = (k / 3) * Math.PI;
    balanco.add(raio);
  }
  const pts = [];
  for (let i = 0; i <= 220; i++) {
    const a = (i / 220) * TAU * 6;
    const rr = 0.008 + (i / 220) * 0.048;
    pts.push(V3(rr * Math.cos(a), rr * Math.sin(a), 0.006));
  }
  balanco.add(malha(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 400, 0.0009, 5, false), M.aco));
  balanco.position.set(-0.2, 0.3, 0.025);
  g.add(balanco);

  // placa de fundo e pontes
  const placa = malha(new THREE.CylinderGeometry(0.42, 0.42, 0.012, 96), M.acoEscuro);
  placa.rotation.x = Math.PI / 2;
  placa.position.set(0.02, 0.06, -0.045);
  g.add(placa);
  const ponte = (a, b, larg, z) => {
    const dir = new THREE.Vector3().subVectors(b, a);
    const m = malha(new RoundedBoxGeometry(dir.length() + larg, larg, 0.006, 2, 0.006), M.acoPolido);
    m.position.copy(a).addScaledVector(dir, 0.5);
    m.position.z = z;
    m.rotation.z = Math.atan2(dir.y, dir.x);
    g.add(m);
  };
  ponte(principal.mesh.position, r1.mesh.position, 0.034, 0.034);
  ponte(r2.mesh.position, r3.mesh.position, 0.028, 0.036);
  ponte(lado.mesh.position, V3(-0.2, 0.3, 0), 0.026, 0.02);
  for (const roda of rodas) {
    const rubi = malha(new THREE.SphereGeometry(0.0058, 16, 12), M.rubi);
    rubi.position.set(roda.mesh.position.x, roda.mesh.position.y, Math.max(roda.mesh.position.z + 0.012, 0.038));
    g.add(rubi);
  }
  const rubiB = malha(new THREE.SphereGeometry(0.006, 16, 12), M.rubi);
  rubiB.position.set(-0.2, 0.3, 0.038);
  g.add(rubiB);
  [[0.28, -0.22], [-0.3, -0.18], [0.18, 0.36], [-0.05, 0.4]].forEach(([x, y]) => {
    const p = malha(new THREE.CylinderGeometry(0.009, 0.009, 0.006, 20), M.parafuso);
    p.rotation.x = Math.PI / 2;
    p.position.set(x, y, 0.036);
    g.add(p);
  });

  // vista explodida: cada peça guarda a profundidade original; explodir(1) espalha as camadas em z
  g.children.forEach((c) => (c.userData.z0 = c.position.z));
  const explodir = (e) => {
    for (const c of g.children) {
      c.position.z = c === placa ? c.userData.z0 - 0.42 * e : c.userData.z0 * (1 + 16 * e) + (c === balanco ? 0.2 * e : 0);
    }
  };
  // centraliza (o conjunto fica um pouco à esquerda e acima) e aumenta para o tamanho de vitrine
  g.position.set(0.02, -0.06, 0);
  const raiz = new THREE.Group();
  raiz.add(g);
  raiz.scale.setScalar(2.55);
  const animar = (k, t) => {
    for (const r of rodas) r.mesh.rotation.z = r.fase + r.w * t;
    balanco.rotation.z = Math.sin(t * TAU * 1.25) * 1.9;
    explodir(1 - suave(k / 0.7));
  };
  animar(0, 0);
  return { grupo: raiz, animar };
}

// ---------- V · o gráfico que cresce ----------
export function grafico(M, { alturas = [0.34, 0.46, 0.52, 0.66, 0.8, 0.98, 1.22] } = {}) {
  const g = new THREE.Group();
  const n = alturas.length;
  const passo = 0.2;
  g.add(caixa(n * passo + 0.24, 0.1, 0.44, M.laca, 0, 0.05, 0, 0.02));
  g.add(caixa(n * passo + 0.24, 0.012, 0.44, M.lataoEscovado, 0, 0.1, 0));
  const barras = alturas.map((h, i) => {
    const b = malha(new RoundedBoxGeometry(0.12, 1, 0.12, 2, 0.012), i === n - 1 ? M.lataoPolido : M.vidroAmbar);
    b.geometry.translate(0, 0.5, 0);
    b.position.set(-((n - 1) * passo) / 2 + i * passo, 0.106, 0);
    b.userData.h = h;
    g.add(b);
    return b;
  });
  const curva = new THREE.CatmullRomCurve3(barras.map((b, i) => V3(b.position.x, 0.106 + alturas[i] + 0.1, 0.0)));
  const linha = malha(new THREE.TubeGeometry(curva, 80, 0.009, 10, false), M.luzOuro);
  g.add(linha);
  const ponta = malha(new THREE.SphereGeometry(0.028, 20, 14), M.luzOuro);
  ponta.position.copy(curva.getPoint(1));
  g.add(ponta);
  g.position.y = -0.75;
  const raiz = new THREE.Group();
  raiz.add(g);
  raiz.scale.setScalar(1.75);
  const crescer = (k) => {
    barras.forEach((b, i) => {
      const t = suave((k - i * 0.07) / 0.5);
      b.scale.y = Math.max(0.001, b.userData.h * (1 - Math.pow(1 - t, 3)));
    });
    const l = suave((k - 0.55) / 0.3);
    linha.visible = ponta.visible = l > 0.01;
    linha.material.opacity = l;
  };
  crescer(0);
  return { grupo: raiz, animar: (k) => crescer(k) };
}

// ---------- final · a pasta preta com o MC em dourado (a "caixa preta") ----------
export function canetaTinteiro(M) {
  const g = new THREE.Group();
  g.add(cilindroEntre(V3(0, 0, 0), V3(0.105, 0, 0), 0.0068, M.laca, 28));
  g.add(cilindroEntre(V3(0.105, 0, 0), V3(0.15, 0, 0), 0.0072, M.laca, 28));
  g.add(cilindroEntre(V3(0.102, 0, 0), V3(0.108, 0, 0), 0.0077, M.latao, 28));
  g.add(cilindroEntre(V3(0.146, 0, 0), V3(0.15, 0, 0), 0.0075, M.latao, 28));
  const bico = malha(new THREE.ConeGeometry(0.0062, 0.018, 24), M.latao);
  bico.rotation.z = Math.PI / 2;
  bico.position.x = -0.009;
  g.add(bico);
  g.add(caixa(0.04, 0.002, 0.003, M.latao, 0.125, 0.0078, 0));
  return g;
}

export function pastaPreta(M, capaMat) {
  const g = new THREE.Group();
  const W = 1.5, H = 2.0, D = 0.075;
  g.add(malha(new RoundedBoxGeometry(W, H, D, 4, 0.03), M.couroPreto));
  const capa = malha(planoArredondado(W - 0.03, H - 0.03, 0.03), capaMat);
  capa.position.z = D / 2 + 0.001;
  g.add(capa);
  // miolo de papel aparecendo na lateral
  g.add(caixa(0.02, H - 0.1, D - 0.024, M.papel, W / 2 - 0.004, 0, 0));
  const caneta = canetaTinteiro(M);
  caneta.scale.setScalar(6.2);
  caneta.rotation.set(0, 0, 0.42);
  caneta.position.set(-0.05, -0.86, D / 2 + 0.045);
  g.add(caneta);
  const raiz = new THREE.Group();
  raiz.add(g);
  raiz.scale.setScalar(1.12);
  const animar = (k, t) => {
    g.rotation.y = Math.sin(t * 0.45) * 0.1 - 0.12;
    g.rotation.x = Math.sin(t * 0.33) * 0.04;
  };
  return { grupo: raiz, animar };
}
