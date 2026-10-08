"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMedia, useReducedMotion } from "@/lib/hooks";
import type { Sims } from "../windows";

const Workspace = dynamic(() => import("./Workspace"), { ssr: false });

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
 * The fixed room behind every chapter. The painted dusk and ridges are the
 * fallback; the WebGL workspace mounts once the browser is idle, fades in
 * after its first frame, and stops rendering while opaque chapters hide it.
 */
export function Stage({ sims, sim }: { sims: Sims; sim: string }) {
  const reduced = useReducedMotion();
  const lite = useMedia("(pointer: coarse), (max-width: 767px)");
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  // A fixed home for the HTML windows, so drei never re-targets its portal
  // mid-mount (which would unmount a window's root while it renders).
  const layer = useRef<HTMLDivElement>(null);

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

  // Keep frames coming until the canvas reports in. With nothing animating
  // (reduced motion turns smooth scroll off) Chrome can skip the frame that
  // delivers the canvas's first size, and the room would never appear.
  useEffect(() => {
    if (!on || ready) return;
    let raf = requestAnimationFrame(function tick() {
      raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [on, ready]);

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
    <div aria-hidden className={`stage stage-fallback ${lite ? "lite" : ""}`}>
      {on && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <Workspace
            paused={paused}
            reduced={reduced}
            lite={lite}
            sims={sims}
            sim={sim}
            layer={layer}
            onReady={() => setReady(true)}
          />
          <div ref={layer} className="absolute inset-0 overflow-hidden" />
        </div>
      )}
    </div>
  );
}
