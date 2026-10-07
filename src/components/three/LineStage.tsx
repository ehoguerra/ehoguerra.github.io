"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const LineScene = dynamic(() => import("./LineScene"), { ssr: false });

function canRender3D() {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** True when `[data-opaque]` chapters together cover the whole viewport. */
function viewportCovered() {
  const vh = window.innerHeight;
  const spans = Array.from(document.querySelectorAll<HTMLElement>("[data-opaque]"))
    .map((el) => el.getBoundingClientRect())
    .filter((r) => r.bottom > 0 && r.top < vh)
    .sort((a, b) => a.top - b.top);
  let reach = 0;
  for (const r of spans) {
    if (r.top > reach + 1) return false;
    reach = Math.max(reach, r.bottom);
    if (reach >= vh) return true;
  }
  return false;
}

/**
 * The fixed stage behind every chapter. The painted floor line is the
 * fallback; the WebGL line mounts once the browser is idle, fades in after
 * its first frame, and stops rendering while opaque chapters hide it.
 */
export function LineStage() {
  const reduced = useReducedMotion();
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;
    const start = () => setOn(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setPaused(viewportCovered());
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div aria-hidden className="stage stage-fallback">
      {on && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <LineScene paused={paused} reduced={reduced} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
