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
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    el.dataset.state = "reset";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.state = "roll";
        io.disconnect();
      },
      { rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
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
