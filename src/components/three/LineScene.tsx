"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import {
  BELT_END,
  BELT_START,
  PALLET_X,
  PALLET_Z,
  STATION_X,
  lineState,
  type CamKey,
} from "@/lib/line";

/* ================================================================== */
/* Palette + dimensions                                                */
/* ================================================================== */

const C = {
  floor: "#e2e3de",
  floorLit: "#d3d5cf",
  ink: "#141517",
  signal: "#ffc61a",
  graphite: "#2b2e33",
  case: "#25282c",
  alloy: "#bfc2bd",
  alloyHi: "#d8dad5",
  rubber: "#1d1f22",
  go: "#1f9d55",
  idle: "#9a9d97",
} as const;

const SIGNAL = new THREE.Color(C.signal);
const GO = new THREE.Color(C.go);
const IDLE = new THREE.Color(C.idle);
const DIM = new THREE.Color("#4a4636");

const BELT_TOP = 0.92;
const FOOT = { x: 1.7, z: 1.2 };
const CASE = { x: 1.95, y: 1.62, z: 1.45 };
const PALLET_TOP = 0.36;
const GANTRY_H = 2.8;

/** The product, bottom to top. `s` is the station that adds the layer;
 *  `a..b` is the window (relative to that station) in which it drops in. */
const LAYERS = [
  { h: 0.34, color: C.graphite, metal: 0.3, rough: 0.46, s: 1, a: -3.4, b: -0.3, plate: "POSTGRESQL" },
  { h: 0.2, color: "#b4b7b2", metal: 1, rough: 0.36, s: 2, a: -3.6, b: -1.5, plate: "CELERY · REDIS" },
  { h: 0.2, color: C.alloyHi, metal: 1, rough: 0.26, s: 2, a: -1.9, b: 0, plate: "FASTAPI" },
  { h: 0.3, color: "#1a1c1f", metal: 0.2, rough: 0.14, s: 3, a: -3.4, b: -0.3, plate: "LLM" },
  { h: 0.24, color: "#f3f4f0", metal: 0, rough: 0.24, s: 4, a: -3.4, b: -0.3, plate: "REACT · NEXT.JS" },
] as const;

const STACK = (() => {
  let y = 0.05;
  return LAYERS.map((l) => {
    const c = y + l.h / 2;
    y += l.h + 0.035;
    return c;
  });
})();

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/* ================================================================== */
/* Camera keyframes, one per chapter                                   */
/* ================================================================== */

type V3 = [number, number, number];

interface Frame {
  pos: V3;
  look: V3;
  /** Lens shift as a fraction of the viewport; +x moves the subject right. */
  shift: [number, number];
  /** Where the product under construction sits on the line. */
  x: number;
  /** 0 = open, 1 = sealed in its shipping case. */
  boxed: number;
  /** 1 = the first station calls for the next product. */
  wait: number;
}

const station = (i: number): Frame => ({
  pos: [STATION_X[i] + 4.3, 3.35, 9.1],
  look: [STATION_X[i] + 0.3, 1.3, 0],
  shift: [0.2, -0.03],
  x: STATION_X[i],
  boxed: i === 6 ? 1 : 0,
  wait: 0,
});

// Seen from the far side of the line, so the belt's end sits behind the pallet.
const SHIPPED: Frame = {
  pos: [PALLET_X + 6, 6.4, PALLET_Z - 9],
  look: [PALLET_X - 0.8, 1.3, PALLET_Z + 0.4],
  shift: [0.22, 0.02],
  x: PALLET_X,
  boxed: 1,
  wait: 0,
};

const FRAMES: Record<CamKey, Frame> = {
  // Standing past the end of the line, looking back down it: the finished
  // product up front, the stations receding to a vanishing point on the right.
  hero: { pos: [56, 4.4, 1.1], look: [38, 1.25, 1.1], shift: [0.2, 0], x: 45, boxed: 0, wait: 0 },
  line: { pos: [-14.5, 4.6, 5.6], look: [8, 0.9, -0.6], shift: [0.3, 0.02], x: -4.5, boxed: 0, wait: 0 },
  s0: station(0),
  s1: station(1),
  s2: station(2),
  s3: station(3),
  s4: station(4),
  s5: station(5),
  s6: station(6),
  shipped: SHIPPED,
  rest: SHIPPED,
  contact: { pos: [-14, 2.6, 5.4], look: [3, 1, -0.2], shift: [0.24, 0.02], x: PALLET_X, boxed: 1, wait: 1 },
};

/** Damped values the rig writes and every object reads each frame. */
const rig = { x: FRAMES.hero.x, boxed: 0, wait: 0 };
const focus = new THREE.Vector3(...FRAMES.hero.look);

// ponytail: module-scope camera state, one canvas per page; move into the
// component if the site ever mounts two lines.
const cur = {
  pos: new THREE.Vector3(...FRAMES.hero.pos),
  look: new THREE.Vector3(...FRAMES.hero.look),
  shift: new THREE.Vector2(...FRAMES.hero.shift),
};
const tmp = { pos: new THREE.Vector3(), look: new THREE.Vector3(), b: new THREE.Vector3() };

interface Sec {
  key: CamKey;
  top: number;
}

function measure(): Sec[] {
  const y = window.scrollY;
  return Array.from(document.querySelectorAll<HTMLElement>("[data-cam]"))
    .filter((el) => (el.dataset.cam ?? "") in FRAMES)
    .map((el) => ({
      key: el.dataset.cam as CamKey,
      top: el.getBoundingClientRect().top + y,
    }));
}

/** Hold on each chapter, blend across a window centred on its edge. */
function sample(c: number, secs: Sec[], w: number): [CamKey, CamKey, number] {
  const n = secs.length;
  if (n === 0) return ["hero", "hero", 0];
  for (let i = 0; i < n - 1; i++) {
    const edge = secs[i + 1].top;
    if (c < edge - w / 2) return [secs[i].key, secs[i].key, 0];
    if (c < edge + w / 2)
      return [secs[i].key, secs[i + 1].key, smoother((c - edge + w / 2) / w)];
  }
  return [secs[n - 1].key, secs[n - 1].key, 0];
}

function Rig({ reduced }: { reduced: boolean }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const invalidate = useThree((s) => s.invalidate);
  const secs = useRef<Sec[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const first = useRef(true);

  useEffect(() => {
    const update = () => {
      secs.current = measure();
      invalidate();
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    const onScroll = () => invalidate();
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, [invalidate, reduced]);

  useFrame((state, dt) => {
    const { width, height } = state.size;
    const vh = window.innerHeight;
    const [ka, kb, raw] = sample(window.scrollY + vh / 2, secs.current, vh * 0.75);
    // Reduced motion cuts between chapters instead of flying.
    const t = reduced ? (raw < 0.5 ? 0 : 1) : raw;
    const A = FRAMES[ka];
    const B = FRAMES[kb];

    tmp.pos.set(...A.pos);
    const span = tmp.pos.distanceTo(tmp.b.set(...B.pos));
    tmp.pos.lerp(tmp.b, t);
    // Long moves arc up and out, like a crane shot, instead of skimming the belt.
    const arc = Math.sin(Math.PI * t) * Math.min(1, span / 40);
    tmp.pos.y += arc * 9;
    tmp.pos.z += arc * 7;
    tmp.look.set(...A.look).lerp(tmp.b.set(...B.look), t);
    let sx = A.shift[0] + (B.shift[0] - A.shift[0]) * t;
    let sy = A.shift[1] + (B.shift[1] - A.shift[1]) * t;

    // Portrait screens: pull back and lift the subject above the copy.
    const aspect = width / height;
    if (aspect < 1) {
      const k = 1 + (1 - aspect) * 0.95;
      tmp.pos.sub(tmp.look).multiplyScalar(k).add(tmp.look);
      sx = 0;
      sy = 0.3;
    }

    tmp.look.x += pointer.current.x * 0.35;
    tmp.look.y -= pointer.current.y * 0.18;

    const snap = reduced || first.current;
    first.current = false;
    const k = snap ? 1 : 1 - Math.exp(-dt * 4.2);
    cur.pos.lerp(tmp.pos, k);
    cur.look.lerp(tmp.look, k);
    cur.shift.x += (sx - cur.shift.x) * k;
    cur.shift.y += (sy - cur.shift.y) * k;

    const kp = snap ? 1 : 1 - Math.exp(-dt * 5);
    rig.x += (A.x + (B.x - A.x) * t - rig.x) * kp;
    rig.boxed += (A.boxed + (B.boxed - A.boxed) * t - rig.boxed) * kp;
    rig.wait += (A.wait + (B.wait - A.wait) * t - rig.wait) * kp;

    focus.copy(cur.look);
    camera.position.copy(cur.pos);
    camera.lookAt(cur.look);
    camera.setViewOffset(width, height, -cur.shift.x * width, cur.shift.y * height, width, height);
    camera.updateProjectionMatrix();
  }, -1);

  return null;
}

/* ================================================================== */
/* Textures (canvas-drawn: no network, no binary assets)               */
/* ================================================================== */

function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.roundRect(x, y, w, h, r);
  g.fill();
}

interface Textures {
  belt: THREE.CanvasTexture;
  hazardV: THREE.CanvasTexture;
  hazardH: THREE.CanvasTexture;
  screen: THREE.CanvasTexture;
  slice: THREE.CanvasTexture;
  label: THREE.CanvasTexture | null;
  plates: (THREE.CanvasTexture | null)[];
  numbers: (THREE.CanvasTexture | null)[];
}

/** Resolves the self-hosted Archivo face for canvas text. */
function useArchivo() {
  const [family, setFamily] = useState<string | null>(null);
  useEffect(() => {
    const f =
      getComputedStyle(document.documentElement).getPropertyValue("--font-archivo").trim() ||
      "sans-serif";
    let live = true;
    document.fonts
      .load(`800 64px ${f}`)
      .catch(() => undefined)
      .then(() => live && setFamily(f));
    return () => {
      live = false;
    };
  }, []);
  return family;
}

function useTextures(): Textures {
  const family = useArchivo();

  const base = useMemo(() => {
    const belt = canvasTexture(64, 8, (g) => {
      g.fillStyle = C.rubber;
      g.fillRect(0, 0, 64, 8);
      g.fillStyle = "#2b2e32";
      g.fillRect(0, 0, 10, 8);
    });
    belt.wrapS = belt.wrapT = THREE.RepeatWrapping;
    belt.repeat.set((BELT_END - BELT_START) / 0.55, 1);

    const hazard = (rx: number, ry: number) => {
      const t = canvasTexture(64, 64, (g) => {
        g.fillStyle = C.ink;
        g.fillRect(0, 0, 64, 64);
        g.fillStyle = C.signal;
        g.beginPath();
        for (let i = -64; i < 128; i += 32) {
          g.moveTo(i, 0);
          g.lineTo(i + 16, 0);
          g.lineTo(i + 16 - 64, 64);
          g.lineTo(i - 64, 64);
          g.closePath();
        }
        g.fill();
      });
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(rx, ry);
      return t;
    };

    // Synthetic dashboard for the interface layer's screen.
    const screen = canvasTexture(512, 336, (g) => {
      g.fillStyle = "#15171a";
      g.fillRect(0, 0, 512, 336);
      g.fillStyle = "#23262a";
      g.fillRect(0, 0, 512, 38);
      g.fillStyle = C.signal;
      roundRect(g, 16, 13, 56, 12, 3);
      g.fillStyle = "#1d2023";
      g.fillRect(0, 38, 92, 298);
      for (let i = 0; i < 6; i++) {
        g.fillStyle = i === 1 ? "#43474e" : "#2c2f34";
        roundRect(g, 14, 58 + i * 32, 64, 11, 3);
      }
      g.fillStyle = "#202327";
      roundRect(g, 108, 54, 182, 112, 6);
      roundRect(g, 302, 54, 194, 112, 6);
      roundRect(g, 108, 180, 388, 140, 6);
      const bars = [0.42, 0.66, 0.5, 0.82, 0.58, 0.94, 0.72, 0.88];
      bars.forEach((v, i) => {
        g.fillStyle = i === 5 ? C.signal : "#4d525a";
        g.fillRect(126 + i * 44, 306 - v * 108, 26, v * 108);
      });
      g.strokeStyle = C.signal;
      g.lineWidth = 3;
      g.beginPath();
      [118, 96, 104, 74, 82, 66].forEach((y, i) => g.lineTo(122 + i * 32, y + 30));
      g.stroke();
      g.fillStyle = "#e9eae5";
      g.font = "700 30px sans-serif";
      g.fillText("99.9%", 320, 120);
    });

    // Soft-edged scan slice for the quality gate.
    const slice = canvasTexture(128, 128, (g) => {
      const r = g.createRadialGradient(64, 64, 6, 64, 64, 64);
      r.addColorStop(0, "rgba(255,214,79,0.95)");
      r.addColorStop(0.55, "rgba(255,198,26,0.55)");
      r.addColorStop(1, "rgba(255,198,26,0)");
      g.fillStyle = r;
      g.fillRect(0, 0, 128, 128);
    });

    return { belt, hazardV: hazard(0.5, 10), hazardH: hazard(10, 0.5), screen, slice };
  }, []);

  const lettered = useMemo(() => {
    if (!family) return null;
    const label = canvasTexture(512, 288, (g) => {
      g.fillStyle = C.signal;
      g.fillRect(0, 0, 512, 288);
      g.fillStyle = C.ink;
      g.font = `800 96px ${family}`;
      g.fillText("AG", 30, 110);
      g.font = `700 24px ${family}`;
      g.fillText("ARTUR GUERRA", 34, 150);
      let x = 34;
      let seed = 7;
      while (x < 470) {
        seed = (seed * 9301 + 49297) % 233280;
        const w = 2 + Math.floor((seed / 233280) * 6);
        g.fillRect(x, 182, w, 76);
        x += w + 3 + (seed % 4);
      }
    });
    const plates = LAYERS.map((l) =>
      canvasTexture(512, 72, (g) => {
        g.fillStyle = "#ecede8";
        roundRect(g, 0, 0, 512, 72, 10);
        g.fillStyle = "rgba(20,21,23,0.82)";
        g.font = `700 34px ${family}`;
        g.textBaseline = "middle";
        g.fillText(l.plate, 24, 38);
      }),
    );
    const numbers = STATION_X.map((_, i) =>
      canvasTexture(256, 128, (g) => {
        g.fillStyle = C.signal;
        g.font = `800 116px ${family}`;
        g.textBaseline = "middle";
        g.fillText(String(i + 1).padStart(2, "0"), 8, 68);
      }),
    );
    return { label, plates, numbers };
  }, [family]);

  useEffect(() => {
    return () => {
      Object.values(base).forEach((t) => t.dispose());
    };
  }, [base]);
  useEffect(() => {
    return () => {
      lettered?.label.dispose();
      lettered?.plates.forEach((t) => t.dispose());
      lettered?.numbers.forEach((t) => t.dispose());
    };
  }, [lettered]);

  return {
    ...base,
    label: lettered?.label ?? null,
    plates: lettered?.plates ?? LAYERS.map(() => null),
    numbers: lettered?.numbers ?? STATION_X.map(() => null),
  };
}

/* ================================================================== */
/* World                                                               */
/* ================================================================== */

function Environment() {
  const get = useThree((s) => s.get);
  useEffect(() => {
    const { gl, scene } = get();
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.5;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [get]);
  return null;
}

function Lights({ shadows }: { shadows: number }) {
  const sun = useRef<THREE.DirectionalLight>(null!);
  useLayoutEffect(() => {
    const s = sun.current.shadow;
    s.mapSize.set(shadows, shadows);
    s.camera.left = s.camera.bottom = -10;
    s.camera.right = s.camera.top = 10;
    s.camera.near = 1;
    s.camera.far = 60;
    s.bias = -0.0004;
    s.normalBias = 0.03;
    s.radius = 4;
    s.camera.updateProjectionMatrix();
  }, [shadows]);
  useFrame(() => {
    sun.current.position.set(focus.x + 7, focus.y + 15, focus.z + 9);
    sun.current.target.position.copy(focus);
    sun.current.target.updateMatrixWorld();
  });
  return (
    <>
      <hemisphereLight args={["#ffffff", "#bcbeb7", 1.15]} />
      <directionalLight ref={sun} color="#fff8ec" intensity={2.1} castShadow={shadows > 0} />
    </>
  );
}

function Floor({ t }: { t: Textures }) {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[320, 160]} />
        <meshStandardMaterial color={C.floorLit} roughness={0.96} />
      </mesh>
      {/* Safety lines: one continuous path from the first station to dispatch. */}
      {[-2.45, 2.45].map((z) => (
        <mesh key={z} rotation-x={-Math.PI / 2} position={[24, 0.004, z]} receiveShadow>
          <planeGeometry args={[78, 0.13]} />
          <meshStandardMaterial color={C.signal} roughness={0.7} />
        </mesh>
      ))}
      {STATION_X.map((sx, i) =>
        t.numbers[i] ? (
          <mesh key={sx} rotation-x={-Math.PI / 2} position={[sx - 0.4, 0.006, 3.35]} receiveShadow>
            <planeGeometry args={[1.5, 0.75]} />
            <meshStandardMaterial
              map={t.numbers[i]}
              transparent
              roughness={0.8}
              polygonOffset
              polygonOffsetFactor={-2}
            />
          </mesh>
        ) : null,
      )}
    </group>
  );
}

function Legs() {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const xs = useMemo(() => {
    const a: number[] = [];
    for (let x = BELT_START + 0.6; x <= BELT_END - 0.6; x += 3.4) a.push(x);
    return a;
  }, []);
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    let i = 0;
    for (const x of xs)
      for (const z of [-0.56, 0.56]) {
        m.makeTranslation(x, (BELT_TOP - 0.1) / 2, z);
        ref.current.setMatrixAt(i++, m);
      }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [xs]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, xs.length * 2]} castShadow>
      <boxGeometry args={[0.08, BELT_TOP - 0.1, 0.08]} />
      <meshStandardMaterial color={C.alloy} metalness={1} roughness={0.4} />
    </instancedMesh>
  );
}

function Conveyor({ t }: { t: Textures }) {
  const len = BELT_END - BELT_START;
  const cx = (BELT_START + BELT_END) / 2;
  const belt = useRef<THREE.MeshStandardMaterial>(null!);
  // The belt surface travels with the product.
  useFrame(() => {
    if (belt.current.map) belt.current.map.offset.x = -rig.x / 0.55;
  });
  return (
    <group>
      <mesh position={[cx, BELT_TOP - 0.05, 0]} receiveShadow castShadow>
        <boxGeometry args={[len, 0.1, 1.36]} />
        <meshStandardMaterial ref={belt} map={t.belt} roughness={0.88} />
      </mesh>
      {[-0.71, 0.71].map((z) => (
        <mesh key={z} position={[cx, BELT_TOP - 0.02, z]} castShadow receiveShadow>
          <boxGeometry args={[len, 0.17, 0.07]} />
          <meshStandardMaterial color={C.alloy} metalness={1} roughness={0.32} />
        </mesh>
      ))}
      {[BELT_START, BELT_END].map((x) => (
        <mesh key={x} position={[x, BELT_TOP - 0.06, 0]} rotation-x={Math.PI / 2} castShadow>
          <cylinderGeometry args={[0.13, 0.13, 1.46, 24]} />
          <meshStandardMaterial color={C.signal} roughness={0.45} />
        </mesh>
      ))}
      <Legs />
    </group>
  );
}

function Stations({ t }: { t: Textures }) {
  const heads = useRef<(THREE.Group | null)[]>([]);
  const lamps = useMemo(
    () =>
      STATION_X.map(
        () => new THREE.MeshStandardMaterial({ color: C.idle, emissive: C.idle, roughness: 0.3 }),
      ),
    [],
  );
  const scan = useRef<THREE.Mesh>(null!);
  const scanMat = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    STATION_X.forEach((sx, i) => {
      const d = rig.x - sx;
      const near = 1 - clamp01(Math.abs(d) / 1.6);
      const m = lamps[i];
      if (i === 0 && rig.wait > 0.5) {
        m.color.copy(SIGNAL);
        m.emissive.copy(SIGNAL);
        m.emissiveIntensity = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(time * 4.5));
      } else if (near > 0.08) {
        m.color.copy(SIGNAL);
        m.emissive.copy(SIGNAL);
        m.emissiveIntensity = 0.2 + 0.6 * near;
      } else if (d > 0) {
        m.color.copy(GO);
        m.emissive.copy(GO);
        m.emissiveIntensity = 0.45;
      } else {
        m.color.copy(IDLE);
        m.emissive.copy(IDLE);
        m.emissiveIntensity = 0;
      }
      const h = heads.current[i];
      if (h) h.position.y = GANTRY_H - 0.42 - near * 0.3;
    });

    // Quality gate: a scan slice sweeps up and down through the product.
    const near = 1 - clamp01(Math.abs(rig.x - STATION_X[5]) / 1.8);
    scan.current.visible = near > 0.01;
    scan.current.position.x = rig.x;
    scan.current.position.y = BELT_TOP + 0.08 + (0.5 + 0.5 * Math.sin(time * 2.2)) * 1.45;
    scanMat.current.opacity = near * 0.9;
  });

  return (
    <group>
      {STATION_X.map((sx, i) => {
        const gate = i === 5;
        return (
          <group key={sx} position={[sx, 0, 0]}>
            {[-1.32, 1.32].map((z) => (
              <mesh key={z} position={[0, GANTRY_H / 2, z]} castShadow>
                <boxGeometry args={[0.14, GANTRY_H, 0.14]} />
                {gate ? (
                  <meshStandardMaterial map={t.hazardV} roughness={0.5} />
                ) : (
                  <meshStandardMaterial color={C.alloy} metalness={1} roughness={0.34} />
                )}
              </mesh>
            ))}
            <mesh position={[0, GANTRY_H, 0]} castShadow>
              <boxGeometry args={[0.16, 0.16, 2.8]} />
              {gate ? (
                <meshStandardMaterial map={t.hazardH} roughness={0.5} />
              ) : (
                <meshStandardMaterial color={C.alloy} metalness={1} roughness={0.34} />
              )}
            </mesh>
            {!gate && (
              <group
                ref={(el) => {
                  heads.current[i] = el;
                }}
                position={[0, GANTRY_H - 0.42, 0]}
              >
                <mesh castShadow>
                  <boxGeometry args={[0.46, 0.3, 0.46]} />
                  <meshStandardMaterial color={C.graphite} metalness={0.4} roughness={0.42} />
                </mesh>
                <mesh position={[0, -0.24, 0]} castShadow>
                  <cylinderGeometry args={[0.05, 0.07, 0.2, 16]} />
                  <meshStandardMaterial color={C.alloyHi} metalness={1} roughness={0.25} />
                </mesh>
              </group>
            )}
            <mesh position={[0, GANTRY_H + 0.15, 0]} material={lamps[i]}>
              <cylinderGeometry args={[0.1, 0.1, 0.14, 20]} />
            </mesh>
          </group>
        );
      })}
      <mesh ref={scan} position={[STATION_X[5], BELT_TOP, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshBasicMaterial
          ref={scanMat}
          map={t.slice}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// Animated every frame, so they live outside React's render data.
const ghostMat = new THREE.LineBasicMaterial({
  color: C.ink,
  transparent: true,
  opacity: 0,
  depthWrite: false,
});
const providers = [0, 1, 2].map(() => new THREE.MeshBasicMaterial({ color: DIM }));

const labelMaterial = () =>
  new THREE.MeshStandardMaterial({
    color: C.signal,
    emissive: C.signal,
    emissiveIntensity: 0,
    roughness: 0.6,
  });
const caseLabel = labelMaterial();

/** Shipping labels on the lid and both long faces, so every camera reads one. */
function paintLabel(m: THREE.MeshStandardMaterial, map: THREE.Texture | null) {
  m.map = map;
  m.color.set(map ? "#ffffff" : C.signal);
  m.needsUpdate = true;
}

function CaseLabels({ material }: { material: THREE.Material }) {
  return (
    <>
      <mesh position={[0, CASE.y / 2 + 0.003, 0]} rotation-x={-Math.PI / 2} material={material}>
        <planeGeometry args={[1.15, 0.65]} />
      </mesh>
      <mesh position={[0, 0.12, CASE.z / 2 + 0.003]} material={material}>
        <planeGeometry args={[1.15, 0.65]} />
      </mesh>
      <mesh position={[0, 0.12, -CASE.z / 2 - 0.003]} rotation-y={Math.PI} material={material}>
        <planeGeometry args={[1.15, 0.65]} />
      </mesh>
    </>
  );
}

function Product({ t }: { t: Textures }) {
  const group = useRef<THREE.Group>(null!);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const tray = useRef<THREE.Mesh>(null!);
  const kase = useRef<THREE.Group>(null!);
  const geos = useMemo(
    () => LAYERS.map((l) => new RoundedBoxGeometry(FOOT.x, l.h, FOOT.z, 3, 0.04)),
    [],
  );
  const edges = useMemo(
    () =>
      LAYERS.map(
        (l) => new THREE.EdgesGeometry(new THREE.BoxGeometry(FOOT.x + 0.03, l.h + 0.03, FOOT.z + 0.03)),
      ),
    [],
  );
  const caseGeo = useMemo(() => new RoundedBoxGeometry(CASE.x, CASE.y, CASE.z, 3, 0.07), []);

  useFrame((state) => {
    const x = rig.x;
    // Past the belt's end the sealed case is lifted across onto the pallet.
    const off = BELT_END - 0.4;
    let y = BELT_TOP;
    let z = 0;
    if (x > off) {
      const u = clamp01((x - off) / (PALLET_X - off));
      y = BELT_TOP + (PALLET_TOP + CASE.y - BELT_TOP) * u + Math.sin(Math.PI * u) * 1.1;
      z = PALLET_Z * smoother(u);
    }
    group.current.position.set(x, y, z);

    LAYERS.forEach((l, i) => {
      const g = layers.current[i];
      if (!g) return;
      const sx = STATION_X[l.s];
      const p = clamp01((x - (sx + l.a)) / (l.b - l.a));
      const e = easeOut(p);
      g.visible = p > 0.001 && rig.boxed < 0.97;
      g.position.y = STACK[i] + (1 - e) * 2.3;
      g.rotation.y = (1 - e) * 0.45;
    });

    // Architecture: the whole product exists first as a plan.
    ghostMat.opacity =
      clamp01((x + 2.6) / 2.6) * (1 - clamp01((x - 30) / 3)) * (1 - rig.boxed) * 0.55;
    tray.current.visible = x > -2.6;

    // Provider lights: one carries the request, the chain falls back in turn.
    const active = Math.floor(state.clock.elapsedTime / 1.3) % 3;
    providers.forEach((m, i) => m.color.copy(i === active ? SIGNAL : DIM));

    const b = rig.boxed;
    kase.current.visible = b > 0.01;
    kase.current.position.y = CASE.y / 2 + (1 - easeOut(b)) * 2.6;
    caseLabel.emissiveIntensity = lineState.product === 0 ? 0.5 : 0;
  });

  useEffect(() => {
    paintLabel(caseLabel, t.label);
  }, [t.label]);

  return (
    <group ref={group} position={[FRAMES.hero.x, BELT_TOP, 0]}>
      <mesh ref={tray} position={[0, 0.025, 0]} castShadow receiveShadow>
        <boxGeometry args={[FOOT.x + 0.2, 0.05, FOOT.z + 0.12]} />
        <meshStandardMaterial color={C.alloy} metalness={1} roughness={0.42} />
      </mesh>

      {LAYERS.map((l, i) => (
        <group
          key={l.plate}
          ref={(el) => {
            layers.current[i] = el;
          }}
          position={[0, STACK[i], 0]}
        >
          <mesh geometry={geos[i]} castShadow receiveShadow>
            {i === 4 ? (
              <meshPhysicalMaterial color={l.color} roughness={l.rough} clearcoat={1} clearcoatRoughness={0.2} />
            ) : (
              <meshStandardMaterial color={l.color} metalness={l.metal} roughness={l.rough} />
            )}
          </mesh>
          {t.plates[i] && (
            // Right of centre: from the station camera the gantry's front post
            // lands on x ≈ -0.4…-0.25 of this face. LLM keeps the left for its lamps.
            <mesh position={[i === 3 ? -0.3 : 0.3, 0, FOOT.z / 2 + 0.003]}>
              <planeGeometry args={[0.92, l.h * 0.46]} />
              <meshBasicMaterial map={t.plates[i]} toneMapped={false} />
            </mesh>
          )}
          {i === 3 &&
            providers.map((m, k) => (
              <mesh key={k} position={[0.36 + k * 0.17, 0, FOOT.z / 2 + 0.003]} material={m}>
                <planeGeometry args={[0.12, 0.05]} />
              </mesh>
            ))}
          {i === 4 && (
            <mesh position={[0, l.h / 2 + 0.002, 0]} rotation-x={-Math.PI / 2}>
              <planeGeometry args={[1.42, 0.93]} />
              <meshBasicMaterial map={t.screen} toneMapped={false} />
            </mesh>
          )}
        </group>
      ))}

      <group>
        {edges.map((g, i) => (
          <lineSegments key={i} geometry={g} material={ghostMat} position={[0, STACK[i], 0]} />
        ))}
      </group>

      <group ref={kase} visible={false}>
        <mesh geometry={caseGeo} castShadow receiveShadow>
          <meshStandardMaterial color={C.case} metalness={0.35} roughness={0.42} />
        </mesh>
        <CaseLabels material={caseLabel} />
      </group>
    </group>
  );
}

const CASE_SLOTS: [number, number][] = [
  [-2.05, -0.78],
  [0, -0.78],
  [2.05, -0.78],
  [-2.05, 0.78],
  [0, 0.78],
  [2.05, 0.78],
];

function Pallet({ t }: { t: Textures }) {
  const cases = useRef<(THREE.Group | null)[]>([]);
  const labels = useMemo(() => CASE_SLOTS.map(labelMaterial), []);
  const geo = useMemo(() => new RoundedBoxGeometry(CASE.x, CASE.y, CASE.z, 3, 0.07), []);

  useEffect(() => {
    labels.forEach((m) => paintLabel(m, t.label));
  }, [labels, t.label]);

  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 8);
    cases.current.forEach((g, i) => {
      if (!g) return;
      const on = lineState.product === i + 1 ? 1 : 0;
      g.position.y += (PALLET_TOP + CASE.y / 2 + on * 0.18 - g.position.y) * k;
      labels[i].emissiveIntensity += (on * 0.5 - labels[i].emissiveIntensity) * k;
    });
  });

  return (
    <group position={[PALLET_X, 0, PALLET_Z]}>
      <mesh position={[0, PALLET_TOP / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.5, PALLET_TOP, 3.3]} />
        <meshStandardMaterial color="#33363b" roughness={0.72} />
      </mesh>
      {CASE_SLOTS.map(([x, z], i) => (
        <group
          key={i}
          ref={(el) => {
            cases.current[i] = el;
          }}
          position={[x, PALLET_TOP + CASE.y / 2, z]}
        >
          <mesh geometry={geo} castShadow receiveShadow>
            <meshStandardMaterial color={C.case} metalness={0.35} roughness={0.42} />
          </mesh>
          <CaseLabels material={labels[i]} />
        </group>
      ))}
    </group>
  );
}

/** Steps the pixel ratio down when the device can't hold the frame rate. */
function Governor() {
  const setDpr = useThree((s) => s.setDpr);
  const dpr = useThree((s) => s.viewport.dpr);
  const acc = useRef({ t: 0, f: 0 });
  useFrame((_, dt) => {
    const a = acc.current;
    a.t += Math.min(dt, 0.25);
    a.f += 1;
    if (a.t < 2) return;
    if (a.f / a.t < 40 && dpr > 1) setDpr(Math.max(1, dpr - 0.25));
    a.t = 0;
    a.f = 0;
  });
  return null;
}

function Ready({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(onReady);
  });
  return null;
}

type Tier = "high" | "mid" | "low";

function World({ tier, reduced, onReady }: { tier: Tier; reduced: boolean; onReady: () => void }) {
  const t = useTextures();
  return (
    <>
      <color attach="background" args={[C.floor]} />
      <fog attach="fog" args={[C.floor, 28, 95]} />
      <Environment />
      <Lights shadows={tier === "high" ? 2048 : tier === "mid" ? 1024 : 0} />
      <Rig reduced={reduced} />
      <Floor t={t} />
      <Conveyor t={t} />
      <Stations t={t} />
      <Product t={t} />
      <Pallet t={t} />
      {!reduced && <Governor />}
      <Ready onReady={onReady} />
    </>
  );
}

export default function LineScene({
  paused,
  reduced,
  onReady,
}: {
  paused: boolean;
  reduced: boolean;
  onReady: () => void;
}) {
  const [tier] = useState<Tier>(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return "low";
    return (navigator.hardwareConcurrency ?? 4) >= 8 ? "high" : "mid";
  });

  return (
    <Canvas
      flat
      shadows={tier === "low" ? false : "percentage"}
      dpr={tier === "high" ? [1, 1.75] : [1, 1.5]}
      frameloop={paused ? "never" : reduced ? "demand" : "always"}
      camera={{ fov: tier === "low" ? 34 : 30, near: 0.5, far: 180, position: FRAMES.hero.pos }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <World tier={tier} reduced={reduced} onReady={onReady} />
    </Canvas>
  );
}
