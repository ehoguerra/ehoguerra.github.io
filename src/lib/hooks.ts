"use client";

import { useSyncExternalStore } from "react";

/** Live `matchMedia` result; the server snapshot is `server`. */
export function useMedia(query: string, server = false) {
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => server,
  );
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
