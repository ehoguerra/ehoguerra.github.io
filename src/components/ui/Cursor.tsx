"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const FINE_POINTER = "(pointer: fine)";

function subscribeFinePointer(onChange: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Two-layer pointer: a crisp dot that tracks exactly, and a lagging ring that
 * swells over interactive elements. Only mounts on precise pointers.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const glowX = useSpring(x, { stiffness: 60, damping: 22, mass: 1 });
  const glowY = useSpring(y, { stiffness: 60, damping: 22, mass: 1 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = e.target as HTMLElement | null;
      setHot(Boolean(el?.closest("a, button, [data-cursor='hot']")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Ambient glow that trails far behind the pointer */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-30 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: glowX,
          y: glowY,
          opacity: visible ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(109,94,248,0.075) 0%, transparent 65%)",
          transition: "opacity 0.4s",
        }}
      />

      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none fixed z-[95] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-hover/60 mix-blend-difference"
            style={{
              x: ringX,
              y: ringY,
              width: hot ? 44 : 26,
              height: hot ? 44 : 26,
              opacity: visible ? 1 : 0,
              transition: "width 0.28s, height 0.28s, opacity 0.3s",
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none fixed z-[96] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-hover"
            style={{
              x,
              y,
              opacity: visible ? (hot ? 0 : 1) : 0,
              transition: "opacity 0.25s",
            }}
          />
        </>
      )}
    </>
  );
}
