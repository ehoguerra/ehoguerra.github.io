"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import type { ProjectId } from "@/lib/site";
import { PX_PER_UNIT, WINDOWS, spaceState, type CamKey, type V3 } from "@/lib/space";
import { WindowFor, type Sims } from "../windows";

/* ================================================================== */
/* Light: one set of uniforms drives the sky and every ridge           */
/* ================================================================== */

const hex = (h: string) => new THREE.Color(h);

/** Dusk (hero) → night (the middle of the page) → dawn (contact). */
const PALETTE = [
  { zenith: hex("#070920"), mid: hex("#33276a"), horizon: hex("#ff8650"), glow: hex("#ffb26b"), stars: 0.35, light: 1 },
  { zenith: hex("#03040b"), mid: hex("#101433"), horizon: hex("#3a2f6c"), glow: hex("#5c4fa8"), stars: 1, light: 0.55 },
  { zenith: hex("#0b1636"), mid: hex("#4c4589"), horizon: hex("#ffad78"), glow: hex("#ffd8a0"), stars: 0.15, light: 1.12 },
] as const;

// ponytail: module-scope light and camera state, one canvas per page; move
// into a context if the site ever mounts two workspaces.
const U = {
  uTime: { value: 0 },
  uZenith: { value: new THREE.Color() },
  uMid: { value: new THREE.Color() },
  uHorizon: { value: new THREE.Color() },
  uGlow: { value: new THREE.Color() },
  uStars: { value: 0 },
  uLight: { value: 1 },
  uSunDir: { value: new THREE.Vector3(0.62, -0.035, -1).normalize() },
};

const rigState = { phase: 0 };

function applyPhase(p: number) {
  const i = Math.min(Math.floor(p), PALETTE.length - 2);
  const f = THREE.MathUtils.clamp(p - i, 0, 1);
  const a = PALETTE[i];
  const b = PALETTE[i + 1];
  U.uZenith.value.copy(a.zenith).lerp(b.zenith, f);
  U.uMid.value.copy(a.mid).lerp(b.mid, f);
  U.uHorizon.value.copy(a.horizon).lerp(b.horizon, f);
  U.uGlow.value.copy(a.glow).lerp(b.glow, f);
  U.uStars.value = a.stars + (b.stars - a.stars) * f;
  U.uLight.value = a.light + (b.light - a.light) * f;
}

/* ================================================================== */
/* Sky                                                                  */
/* ================================================================== */

const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = p.xyww;
  }
`;

const SKY_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uZenith, uMid, uHorizon, uGlow, uSunDir;
  uniform float uStars;
  varying vec3 vDir;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 col = mix(uHorizon, uMid, smoothstep(-0.015, 0.2, h));
    col = mix(col, uZenith, smoothstep(0.16, 0.72, h));
    col = mix(col, uHorizon * 0.3, smoothstep(0.0, -0.2, h));

    // The sun just under the ridge: a wide warm bloom and a hot core.
    float s = max(dot(d, uSunDir), 0.0);
    col += uGlow * (pow(s, 5.0) * 0.5 + pow(s, 48.0) * 0.75) * smoothstep(-0.12, 0.04, h);

    // Stars: one candidate per cell of a fine grid on the sphere.
    vec3 sp = d * 260.0;
    vec3 cell = floor(sp);
    float r = hash(cell);
    float lit = step(0.9962, r) * smoothstep(0.06, 0.42, h);
    float core = smoothstep(0.3, 0.0, length(fract(sp) - 0.5));
    float tw = 0.65 + 0.35 * sin(uTime * (1.2 + r * 3.0) + r * 50.0);
    col += vec3(0.86, 0.89, 1.0) * lit * core * tw * uStars * (0.6 + 1.4 * fract(r * 91.0));

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

function Sky() {
  const mesh = useRef<THREE.Mesh>(null!);
  const camera = useThree((s) => s.camera);
  useFrame(() => mesh.current.position.copy(camera.position));
  return (
    <mesh ref={mesh} renderOrder={-10} frustumCulled={false}>
      <sphereGeometry args={[800, 48, 24]} />
      <shaderMaterial
        vertexShader={SKY_VERT}
        fragmentShader={SKY_FRAG}
        uniforms={U}
        side={THREE.BackSide}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ================================================================== */
/* Ridges: the Serra Fluminense in five layers of aerial perspective   */
/* ================================================================== */

const RIDGE_VERT = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const RIDGE_FRAG = /* glsl */ `
  uniform vec3 uTop, uBot, uHorizon, uMid, uGlow;
  uniform float uBase, uAmp, uFreq, uSeed, uRim, uMist, uLight;
  varying vec3 vWorld;

  float h1(float x) { return fract(sin(x * 127.1 + uSeed * 311.7) * 43758.5453); }
  float n1(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(h1(i), h1(i + 1.0), u);
  }
  // Ridged fbm: sharp granite crests, soft valleys.
  float ridged(float x) {
    float v = 0.0;
    float a = 0.55;
    for (int k = 0; k < 5; k++) {
      float n = 1.0 - abs(n1(x) * 2.0 - 1.0);
      v += a * n * n;
      x = x * 2.07 + 3.1;
      a *= 0.48;
    }
    return v;
  }

  void main() {
    float crest = uBase + uAmp * ridged(vWorld.x * uFreq + uSeed);
    float d = crest - vWorld.y;
    float aa = fwidth(vWorld.y) * 1.5;
    float alpha = smoothstep(0.0, aa, d);
    if (alpha <= 0.0) discard;

    float fall = uAmp * 0.55 + 1.0;
    vec3 col = mix(uBot, uTop, exp(-d / fall)) * uLight;
    // Crest lit from behind by the horizon, strongest toward the sun.
    float side = smoothstep(-80.0, 160.0, vWorld.x);
    col += uGlow * uRim * exp(-d / (fall * 0.05)) * (0.35 + 0.65 * side);
    // Valley haze: the sky's violet with a little of the horizon in it.
    float valley = smoothstep(uBase + uAmp * 0.35, uBase - uAmp * 0.25, vWorld.y);
    col = mix(col, mix(uMid, uHorizon, 0.3) * 0.7 * uLight, uMist * valley);

    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

const RIDGES = [
  { z: -190, base: 1, amp: 30, freq: 0.0085, seed: 11.3, top: "#8b70ad", bot: "#4a3e7b", rim: 0.7, mist: 0.5 },
  { z: -125, base: -1.5, amp: 18, freq: 0.014, seed: 4.7, top: "#5b4787", bot: "#2b2456", rim: 0.5, mist: 0.4 },
  { z: -80, base: -2.8, amp: 11, freq: 0.024, seed: 9.1, top: "#352a61", bot: "#191637", rim: 0.36, mist: 0.28 },
  { z: -48, base: -3.2, amp: 6.5, freq: 0.04, seed: 2.2, top: "#1d1a3d", bot: "#0e0d21", rim: 0.24, mist: 0.14 },
  { z: -27, base: -3.5, amp: 3.6, freq: 0.07, seed: 6.6, top: "#100f23", bot: "#07070f", rim: 0.14, mist: 0.06 },
] as const;

function Ridge({ r }: { r: (typeof RIDGES)[number] }) {
  const dist = 14 - r.z;
  const width = dist * 3.2 + 140;
  const bottom = r.base - 60;
  const top = r.base + r.amp * 1.15;
  return (
    <mesh position={[10, (bottom + top) / 2, r.z]} renderOrder={-5}>
      <planeGeometry args={[width, top - bottom]} />
      <shaderMaterial
        vertexShader={RIDGE_VERT}
        fragmentShader={RIDGE_FRAG}
        transparent
        toneMapped={false}
        uniforms={{
          uTop: { value: hex(r.top) },
          uBot: { value: hex(r.bot) },
          uHorizon: U.uHorizon,
          uMid: U.uMid,
          uGlow: U.uGlow,
          uLight: U.uLight,
          uBase: { value: r.base },
          uAmp: { value: r.amp },
          uFreq: { value: r.freq },
          uSeed: { value: r.seed },
          uRim: { value: r.rim },
          uMist: { value: r.mist },
        }}
      />
    </mesh>
  );
}

/* ================================================================== */
/* Windows                                                              */
/* ================================================================== */

function Windows({
  sims,
  sim,
  run,
  reduced,
  layer,
}: {
  sims: Sims;
  sim: string;
  run: boolean;
  reduced: boolean;
  layer: RefObject<HTMLDivElement | null>;
}) {
  const frames = useRef<Partial<Record<ProjectId, HTMLDivElement | null>>>({});
  const groups = useRef<Partial<Record<ProjectId, THREE.Group | null>>>({});
  const [focus, setFocus] = useState<readonly ProjectId[] | null>(null);

  useFrame((state) => {
    if (spaceState.focus !== focus) setFocus(spaceState.focus);
    const t = state.clock.elapsedTime;
    WINDOWS.forEach((w, i) => {
      const el = frames.current[w.id];
      const dim = String(focus !== null && !focus.includes(w.id));
      if (el && el.dataset.dim !== dim) el.dataset.dim = dim;
      const g = groups.current[w.id];
      // A slow drift so the room never reads as a screenshot.
      if (g && !reduced) g.position.y = w.pos[1] + Math.sin(t * 0.45 + i * 1.7) * 0.035;
    });
  });

  return (
    <>
      {WINDOWS.map((w) => {
        const active = focus === null || focus.includes(w.id);
        return (
        <group
          key={w.id}
          ref={(g) => {
            groups.current[w.id] = g;
          }}
          position={w.pos}
          rotation-y={w.yaw}
        >
          <Html
            transform
            portal={layer as RefObject<HTMLElement>}
            distanceFactor={400 / PX_PER_UNIT}
            pointerEvents="none"
            zIndexRange={[100, 0]}
          >
            <WindowFor
              // A new key replays the story from its first beat when the
              // window's chapter arrives; dimmed windows hold the finished state.
              key={active ? (focus?.join() ?? "wide") : "dim"}
              id={w.id}
              sims={sims}
              sim={sim}
              run={run && active}
              frameRef={(el) => {
                frames.current[w.id] = el;
              }}
            />
          </Html>
        </group>
        );
      })}
    </>
  );
}

/* ================================================================== */
/* Camera rig                                                           */
/* ================================================================== */

interface Frame {
  pos: V3;
  look: V3;
  /** Lens shift as a fraction of the viewport; +x moves the subject right. */
  shift: [number, number];
  /** 0 dusk, 1 night, 2 dawn. */
  phase: number;
  /** Windows this chapter is about; the rest of the room dims. */
  focus: ProjectId[] | null;
}

/** Stand `dist` in front of a window, `side` along its width (− = left). */
function focusOn(id: ProjectId, dist: number, phase: number, side = 0): Frame {
  const w = WINDOWS.find((x) => x.id === id)!;
  const nx = Math.sin(w.yaw);
  const nz = Math.cos(w.yaw);
  return {
    pos: [w.pos[0] + nx * dist + nz * side, w.pos[1] + 0.3, w.pos[2] + nz * dist - nx * side],
    look: [w.pos[0], w.pos[1] - 0.04, w.pos[2]],
    shift: [0.2, 0],
    phase,
    focus: [id],
  };
}

const FRAMES: Record<CamKey, Frame> = {
  hero: { pos: [0.6, 1.2, 10.5], look: [4.1, 1.95, -1.5], shift: [0.15, 0.02], phase: 0, focus: null },
  // From the left, so Zelo's phone clears Vivi's model chain.
  vivi: focusOn("vivi", 5.5, 0.18, -1.6),
  evosolar: focusOn("evosolar", 5.5, 0.36),
  zelo: focusOn("zelo", 5.3, 0.52),
  fantasy: focusOn("fantasy", 5.3, 0.7),
  more: {
    pos: [15.5, 3.2, 5.0],
    look: [20.2, 2.8, -7.0],
    shift: [0.18, 0],
    phase: 0.86,
    focus: ["br1", "cesh", "pecci"],
  },
  // Crane up over the room: the reading chapters sit on the night sky.
  build: { pos: [9, 16, 30], look: [9, 17, -60], shift: [0.12, 0], phase: 1, focus: null },
  // Back down at dawn, the whole workspace small beside the closing card.
  contact: { pos: [-0.5, 1.6, 16.5], look: [5.2, 3.9, -6], shift: [0.17, 0], phase: 2, focus: null },
};

const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

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
    .map((el) => ({ key: el.dataset.cam as CamKey, top: el.getBoundingClientRect().top + y }));
}

/** Hold on each chapter, blend across a window centred on its edge. */
function sample(c: number, secs: Sec[], w: number): [CamKey, CamKey, number] {
  const n = secs.length;
  if (n === 0) return ["hero", "hero", 0];
  for (let i = 0; i < n - 1; i++) {
    const edge = secs[i + 1].top;
    if (c < edge - w / 2) return [secs[i].key, secs[i].key, 0];
    if (c < edge + w / 2) return [secs[i].key, secs[i + 1].key, smoother((c - edge + w / 2) / w)];
  }
  return [secs[n - 1].key, secs[n - 1].key, 0];
}

function Rig({ reduced, layer }: { reduced: boolean; layer: RefObject<HTMLDivElement | null> }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const invalidate = useThree((s) => s.invalidate);
  const secs = useRef<Sec[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const first = useRef(true);
  const windowsLayer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    windowsLayer.current = layer.current;
  }, [layer]);

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
    const [ka, kb, raw] = sample(window.scrollY + vh / 2, secs.current, vh * 0.8);
    // Reduced motion cuts between chapters instead of flying.
    const t = reduced ? (raw < 0.5 ? 0 : 1) : raw;
    const A = FRAMES[ka];
    const B = FRAMES[kb];
    spaceState.focus = t < 0.5 ? A.focus : B.focus;

    tmp.pos.set(...A.pos);
    const span = tmp.pos.distanceTo(tmp.b.set(...B.pos));
    tmp.pos.lerp(tmp.b, t);
    // Long moves rise and pull back a little, like stepping back to look.
    const arc = Math.sin(Math.PI * t) * Math.min(1, span / 14);
    tmp.pos.y += arc * 1.4;
    tmp.pos.z += arc * 2.6;
    tmp.look.set(...A.look).lerp(tmp.b.set(...B.look), t);
    let sx = A.shift[0] + (B.shift[0] - A.shift[0]) * t;
    let sy = A.shift[1] + (B.shift[1] - A.shift[1]) * t;

    // Portrait screens: step back until the subject fits the width, and lift
    // it into the top half that the chapters leave open on phones.
    const aspect = width / height;
    if (aspect < 1) {
      const k = 1 + (1 - aspect) * 1.75;
      tmp.pos.sub(tmp.look).multiplyScalar(k).add(tmp.look);
      sx = 0;
      sy = 0.22;
    }

    tmp.look.x += pointer.current.x * 0.32;
    tmp.look.y -= pointer.current.y * 0.16;

    const snap = reduced || first.current;
    first.current = false;
    const k = snap ? 1 : 1 - Math.exp(-dt * 3.6);
    cur.pos.lerp(tmp.pos, k);
    cur.look.lerp(tmp.look, k);
    cur.shift.x += (sx - cur.shift.x) * k;
    cur.shift.y += (sy - cur.shift.y) * k;

    const phase = A.phase + (B.phase - A.phase) * t;
    rigState.phase += (phase - rigState.phase) * (snap ? 1 : 1 - Math.exp(-dt * 2.4));
    applyPhase(rigState.phase);
    U.uTime.value = state.clock.elapsedTime;

    camera.position.copy(cur.pos);
    camera.lookAt(cur.look);
    camera.setViewOffset(width, height, -cur.shift.x * width, cur.shift.y * height, width, height);
    camera.updateProjectionMatrix();
    // drei's CSS camera ignores the lens shift; it is a pure translation of
    // the projection, so the HTML windows take the same translation.
    const l = windowsLayer.current;
    if (l) l.style.transform = `translate3d(${cur.shift.x * width}px, ${-cur.shift.y * height}px, 0)`;
  }, -1);

  return null;
}

function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(onReady);
  });
  return null;
}

/* ================================================================== */
/* Canvas                                                               */
/* ================================================================== */

export default function Workspace({
  paused,
  reduced,
  lite,
  sims,
  sim,
  layer,
  onReady,
}: {
  paused: boolean;
  reduced: boolean;
  /** Touch or small screens: no post-processing, lower pixel ratio. */
  lite: boolean;
  sims: Sims;
  sim: string;
  /** Where the HTML windows live, above the canvas. */
  layer: RefObject<HTMLDivElement | null>;
  onReady: () => void;
}) {
  return (
    <Canvas
      // Sky and ridges are soft gradients; the windows are DOM and stay crisp.
      dpr={lite ? [1, 1.25] : [1, 1.5]}
      gl={{ antialias: lite, powerPreference: "high-performance", stencil: false }}
      camera={{ fov: 34, near: 0.1, far: 2000, position: FRAMES.hero.pos }}
      frameloop={paused ? "never" : reduced ? "demand" : "always"}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping;
      }}
    >
      <Sky />
      {RIDGES.map((r) => (
        <Ridge key={r.z} r={r} />
      ))}
      <Windows sims={sims} sim={sim} run={!paused && !reduced} reduced={reduced} layer={layer} />
      <Rig reduced={reduced} layer={layer} />
      <FirstFrame onReady={onReady} />
      {!lite && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur luminanceThreshold={0.82} luminanceSmoothing={0.15} intensity={0.55} radius={0.7} />
          <Vignette offset={0.28} darkness={0.62} />
          <ToneMapping mode={ToneMappingMode.NEUTRAL} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
