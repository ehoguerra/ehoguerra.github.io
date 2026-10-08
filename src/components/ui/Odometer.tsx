"use client";

import { useEffect, useRef } from "react";

const DIGITS = "0123456789".split("");

/**
 * A mechanical counter. The server renders the final value, so the number
 * is right without JS; on the client, digits still below the fold reset to
 * zero and roll into place the first time they scroll into view.
 */
export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // In view or already passed when the page hydrates (an anchor link, a
    // restored scroll): keep the server's final value, there is nothing to roll.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.state = "reset";
    // In view or already scrolled past (an anchor jump never intersects).
    const check = () => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.96) return;
      el.dataset.state = "roll";
      window.removeEventListener("scroll", check);
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  let n = 0;
  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden className="odo">
        {value.split("").map((ch, i) =>
          /\d/.test(ch) ? (
            <span key={i} className="odo-digit">
              <span
                className="odo-strip"
                style={{ "--d": Number(ch), "--i": n++ } as React.CSSProperties}
              >
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i}>{ch}</span>
          ),
        )}
      </span>
    </span>
  );
}
