"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Short intro curtain. Runs once per page load, skipped entirely when the
 * visitor prefers reduced motion.
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reduced motion skips the curtain entirely — no animation to wait for.
  const done = reduced || finished;

  useEffect(() => {
    if (reduced) return;

    const start = performance.now();
    const duration = 1100;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(() => setFinished(true), 180);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white shadow-[0_0_60px_-10px_rgba(109,94,248,0.9)]"
          >
            AG
          </motion.span>

          <div className="mt-7 h-px w-40 overflow-hidden bg-border">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent-3"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="mt-3 font-mono text-[10px] tabular-nums tracking-[0.3em] text-muted-soft">
            {String(progress).padStart(3, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
