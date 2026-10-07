"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const HEADER_OFFSET = -76;

let lenis: Lenis | null = null;

/** Inertial page scroll. Off under reduced motion: native scroll stays. */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: HEADER_OFFSET } });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, [enabled]);
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: HEADER_OFFSET });
  else el.scrollIntoView({ block: "start" });
}
