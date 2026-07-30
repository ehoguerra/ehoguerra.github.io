"use client";

import { ReactNode, useCallback, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to drift toward the cursor, in px. */
  strength?: number;
}

/** Pulls its child toward the cursor while hovered, then springs back. */
export function Magnetic({
  children,
  className = "",
  strength = 14,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useSpring(useMotionValue(0), {
    stiffness: 260,
    damping: 18,
    mass: 0.5,
  });
  const y = useSpring(useMotionValue(0), {
    stiffness: 260,
    damping: 18,
    mass: 0.5,
  });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      x.set((dx / (rect.width / 2)) * strength);
      y.set((dy / (rect.height / 2)) * strength);
    },
    [strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
