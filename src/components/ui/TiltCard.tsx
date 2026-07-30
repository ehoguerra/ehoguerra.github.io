"use client";

import { ReactNode, useCallback, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. */
  intensity?: number;
  /** Colour of the cursor-tracking spotlight. */
  glow?: string;
  /** Adds a moving specular sheen across the surface. */
  sheen?: boolean;
}

const SPRING = { stiffness: 220, damping: 24, mass: 0.6 };

/**
 * Real 3D tilt: the card rotates in perspective toward the cursor while a
 * spotlight and specular sheen track the same position. Children can opt into
 * depth by adding their own `translateZ` inside a `preserve-3d` context.
 */
export function TiltCard({
  children,
  className = "",
  intensity = 9,
  glow = "rgba(139,124,255,0.16)",
  sheen = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const opacity = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(py, [0, 1], [intensity, -intensity]),
    SPRING,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-intensity, intensity]),
    SPRING,
  );

  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, ${glow}, transparent 65%)`;
  const sheenBg = useMotionTemplate`linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) ${glowX}, transparent 65%)`;

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    },
    [px, py],
  );

  const handleEnter = useCallback(() => opacity.set(1), [opacity]);
  const handleLeave = useCallback(() => {
    opacity.set(0);
    px.set(0.5);
    py.set(0.5);
  }, [opacity, px, py]);

  return (
    <div className={reduced ? "" : "perspective-1000"}>
      <motion.div
        ref={ref}
        onMouseMove={reduced ? undefined : handleMove}
        onMouseEnter={reduced ? undefined : handleEnter}
        onMouseLeave={reduced ? undefined : handleLeave}
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className={`relative isolate ${className}`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
          style={{ background: spotlight, opacity }}
        />
        {sheen && !reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit]"
            style={{ background: sheenBg, opacity }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}
