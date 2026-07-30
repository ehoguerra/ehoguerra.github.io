"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/**
 * Mounts the WebGL hero once the browser is idle and the device can
 * plausibly handle it. Falls back to a pure-CSS aurora otherwise, so the
 * hero never depends on the 3D bundle to look finished.
 */
export function HeroStage() {
  const reduced = useReducedMotion() ?? false;
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 640;
    const lowCores =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 2;

    if (coarse && narrow) return; // keep phones on the CSS fallback
    if (lowCores) return;

    const start = () => setEnabled(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    timer.current = window.setTimeout(start, 400);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(id);
  }, [enabled]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* CSS aurora — always present, dimmed once WebGL takes over */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: ready ? 0.45 : 1 }}
      >
        <div
          className="aurora-blob left-1/2 top-[38%] h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "rgba(109,94,248,0.16)" }}
        />
        <div
          className="aurora-blob right-[12%] top-[58%] h-[420px] w-[420px]"
          style={{ background: "rgba(180,92,245,0.11)", animationDelay: "-7s" }}
        />
        <div
          className="aurora-blob left-[14%] top-[62%] h-[360px] w-[360px]"
          style={{ background: "rgba(45,212,212,0.08)", animationDelay: "-13s" }}
        />
      </div>

      {enabled && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <HeroCanvas reduced={reduced} />
        </div>
      )}
    </div>
  );
}
