"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Split reveal                                                        */
/* ------------------------------------------------------------------ */

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Per-character stagger, in seconds. */
  step?: number;
  /** Animate on mount instead of on scroll. */
  immediate?: boolean;
}

/**
 * Character-level entrance with a 3D flip. The visible text is aria-hidden and
 * the readable string is exposed once on the wrapper.
 */
export function SplitText({
  text,
  className = "",
  delay = 0,
  step = 0.022,
  immediate = false,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  if (reduced) return <span className={className}>{text}</span>;

  const animation = {
    hidden: { opacity: 0, y: "0.5em", rotateX: -70 },
    visible: {
      opacity: 1,
      y: "0em",
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  let index = 0;

  return (
    <motion.span
      aria-label={text}
      className={`inline-block ${className}`}
      style={{ perspective: 700 }}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, margin: "-60px" } })}
      transition={{ staggerChildren: step, delayChildren: delay }}
    >
      {words.map((word, w) => (
        <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char) => {
            const i = index++;
            return (
              <motion.span
                key={i}
                aria-hidden
                variants={animation}
                className="inline-block will-change-transform"
              >
                {char}
              </motion.span>
            );
          })}
          {w < words.length - 1 && <span aria-hidden>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Rotating role                                                       */
/* ------------------------------------------------------------------ */

/** Cycles through job titles with a vertical wipe and a blinking caret. */
export function RoleRotator({
  roles,
  className = "",
  interval = 2800,
}: {
  roles: string[];
  className?: string;
  interval?: number;
}) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || roles.length < 2) return;
    const id = window.setInterval(
      () => setI((prev) => (prev + 1) % roles.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [interval, reduced, roles.length]);

  return (
    <span
      className={`relative inline-flex items-center overflow-hidden align-bottom ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[i]}
          initial={reduced ? false : { y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduced ? undefined : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
      <motion.span
        aria-hidden
        animate={reduced ? undefined : { opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-accent-hover"
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scramble on hover                                                   */
/* ------------------------------------------------------------------ */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#$%&";

/** Cyber-style text scramble used for nav labels and micro copy. */
export function ScrambleText({
  text,
  className = "",
  active,
}: {
  text: string;
  className?: string;
  active: boolean;
}) {
  const reduced = useReducedMotion();
  // Keyed by `text` so a locale switch falls straight back to the clean label
  // instead of leaving a stale scramble on screen.
  const [scramble, setScramble] = useState<{ text: string; value: string } | null>(
    null,
  );
  const display = scramble?.text === text ? scramble.value : text;

  useEffect(() => {
    if (!active || reduced) return;

    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      if (frame > text.length + 2) {
        window.clearInterval(id);
        setScramble(null);
        return;
      }
      setScramble({
        text,
        value: Array.from(text)
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < frame - 2) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      });
    }, 28);

    return () => window.clearInterval(id);
  }, [active, reduced, text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
