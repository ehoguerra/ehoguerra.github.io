"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  value: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

/** Counts up to a numeric value the first time it scrolls into view. */
export function Counter({
  value,
  suffix = "",
  className = "",
  duration = 1500,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const target = Number.parseFloat(value);
  const numeric = Number.isFinite(target);
  const [display, setDisplay] = useState(numeric && !reduced ? 0 : target);

  useEffect(() => {
    if (!numeric || reduced || !inView) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, inView, numeric, reduced, target]);

  return (
    <span ref={ref} className={className}>
      {numeric ? display : value}
      {suffix}
    </span>
  );
}
