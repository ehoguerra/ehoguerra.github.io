"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  items: readonly string[];
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  separator?: ReactNode;
  className?: string;
}

/**
 * Seamless infinite ticker. The list is rendered twice and translated by
 * exactly -50%, so the loop has no visible seam. Pauses on hover.
 */
export function Marquee({
  items,
  speed = 42,
  reverse = false,
  separator,
  className = "",
}: MarqueeProps) {
  const sequence = [...items, ...items];

  return (
    <div className={`marquee-wrap mask-fade-x overflow-hidden ${className}`}>
      <div
        className={`flex w-max items-center ${
          reverse ? "marquee-track-reverse" : "marquee-track"
        }`}
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        {sequence.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-5 pr-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-soft"
          >
            <span className="transition-colors duration-300 hover:text-foreground">
              {item}
            </span>
            <span aria-hidden className="text-accent/40">
              {separator ?? "◆"}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
