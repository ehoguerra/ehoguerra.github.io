"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

/** Ashima simplex noise — used to breathe life into the core geometry. */
const SIMPLEX = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const CORE_VERT = /* glsl */ `
uniform float uTime;
uniform float uDistort;
uniform float uPointer;

varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;

${SIMPLEX}

void main() {
  float t = uTime * 0.18;

  float n1 = snoise(position * 1.05 + vec3(0.0, t, 0.0));
  float n2 = snoise(position * 2.6 - vec3(t * 0.8, 0.0, t * 0.4));
  float disp = (n1 * 0.30 + n2 * 0.11) * uDistort;
  disp *= 1.0 + uPointer * 0.35;

  vec3 displaced = position + normal * disp;
  vDisp = disp;

  // Cheap re-normalisation: bias the normal by the gradient direction.
  vNormal = normalize(normalMatrix * normalize(normal + normal * disp * 1.4));

  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const CORE_FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;

void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vView);

  float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.2);

  // Iridescent banding driven by the displacement field.
  float band = sin(vDisp * 11.0 + uTime * 0.5) * 0.5 + 0.5;
  vec3 color = mix(uColorA, uColorB, band);
  color = mix(color, uColorC, fres);

  // Rim light + soft inner falloff.
  color += fres * 0.55;
  color *= 0.35 + 0.65 * smoothstep(-0.35, 0.6, n.y);

  float alpha = 0.19 + fres * 0.55;
  gl_FragColor = vec4(color, alpha);
}
`;

const PARTICLE_VERT = /* glsl */ `
uniform float uTime;
uniform float uSize;
attribute float aScale;
attribute float aOffset;
varying float vTwinkle;

void main() {
  vec3 pos = position;
  float t = uTime * 0.35 + aOffset;
  pos.x += sin(t) * 0.14;
  pos.y += cos(t * 0.9) * 0.14;
  pos.z += sin(t * 1.3) * 0.1;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vTwinkle = 0.45 + 0.55 * (sin(uTime * 1.6 + aOffset * 6.0) * 0.5 + 0.5);
  gl_PointSize = uSize * aScale * (14.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const PARTICLE_FRAG = /* glsl */ `
precision mediump float;
uniform vec3 uColor;
varying float vTwinkle;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.0, d) * vTwinkle;
  gl_FragColor = vec4(uColor, alpha * 0.85);
}
`;

/* ------------------------------------------------------------------ */
/* Scene objects                                                       */
/* ------------------------------------------------------------------ */

function Core({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: 1 },
      uPointer: { value: 0 },
      uColorA: { value: new THREE.Color("#2a2470") },
      uColorB: { value: new THREE.Color("#8b5cf6") },
      uColorC: { value: new THREE.Color("#38bdf8") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const u = materialRef.current?.uniforms;

    if (u) {
      u.uTime.value = reduced ? 0.8 : t;
      const strength = Math.min(1, Math.hypot(pointer.x, pointer.y));
      u.uPointer.value = THREE.MathUtils.lerp(
        u.uPointer.value,
        reduced ? 0 : strength,
        delta * 2,
      );
    }

    if (groupRef.current) {
      const targetY = reduced ? 0 : pointer.x * 0.45;
      const targetX = reduced ? 0 : -pointer.y * 0.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        delta * 1.6,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        delta * 1.6,
      );
      groupRef.current.position.y = reduced ? 0 : Math.sin(t * 0.5) * 0.08;
    }

    if (meshRef.current && !reduced) meshRef.current.rotation.y += delta * 0.08;
    if (shellRef.current && !reduced) {
      shellRef.current.rotation.y -= delta * 0.05;
      shellRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Displaced iridescent core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.32, 48]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={CORE_VERT}
          fragmentShader={CORE_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Faceted wireframe shell */}
      <mesh ref={shellRef} scale={1.62}>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshBasicMaterial
          color="#8b7cff"
          wireframe
          transparent
          opacity={0.085}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner glow shell */}
      <mesh scale={0.92}>
        <sphereGeometry args={[1.32, 32, 32]} />
        <meshBasicMaterial
          color="#160f36"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Deterministic PRNG so the starfield is identical on every render. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles({ count = 520, reduced }: { count?: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const offsets = new Float32Array(count);
    const random = mulberry32(0x5eed);

    for (let i = 0; i < count; i++) {
      // Even-ish distribution over a spherical shell with jitter.
      const theta = Math.acos(2 * ((i + 0.5) / count) - 1);
      const phi = i * Math.PI * (3 - Math.sqrt(5));
      const r = 2.1 + random() * 1.9;

      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.cos(theta) * 0.72;
      positions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);

      scales[i] = 0.35 + random() * 1.1;
      offsets[i] = random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));

    return {
      geometry: geo,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 5.5 },
        uColor: { value: new THREE.Color("#a5b4ff") },
      },
    };
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const u = materialRef.current?.uniforms;
    if (u) u.uTime.value = reduced ? 1 : state.clock.elapsedTime;
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={PARTICLE_VERT}
        fragmentShader={PARTICLE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

export default function HeroCanvas({ reduced = false }: { reduced?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Stop rendering entirely once the hero scrolls out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6.1], fov: 42 }}
        style={{ pointerEvents: "none" }}
      >
        <Core reduced={reduced} />
        <Particles reduced={reduced} />
      </Canvas>
    </div>
  );
}
