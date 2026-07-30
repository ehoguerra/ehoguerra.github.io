"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: Direction;
  distance?: number;
  /** Adds a subtle 3D lift as the element enters. */
  depth?: boolean;
  once?: boolean;
}

const offset = (from: Direction, d: number) => {
  switch (from) {
    case "up":
      return { y: d };
    case "down":
      return { y: -d };
    case "left":
      return { x: -d };
    case "right":
      return { x: d };
    default:
      return {};
  }
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  from = "up",
  distance = 26,
  depth = false,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(6px)",
        ...offset(from, distance),
        ...(depth ? { rotateX: 8, scale: 0.97 } : {}),
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
        ...(depth ? { rotateX: 0, scale: 1 } : {}),
      }}
      viewport={{ once, margin: "-90px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      style={depth ? { transformPerspective: 900 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}

/** Wrap a list to have `RevealItem` children animate in sequence. */
export function Stagger({
  children,
  className = "",
  gap = 0.08,
  delay = 0,
}: StaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  distance = 22,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance, filter: "blur(5px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
