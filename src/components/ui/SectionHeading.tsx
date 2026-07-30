"use client";

import { Reveal } from "./Reveal";
import { SplitText } from "./TextFX";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto text-center" : "text-left"} mb-14 max-w-3xl sm:mb-20 ${className}`}
    >
      <Reveal>
        <span
          className={`inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-accent-hover ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent-hover/70" />
          {label}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent-hover/70" />
        </span>
      </Reveal>

      <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
        <SplitText text={title} step={0.016} />
      </h2>

      {subtitle && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg ${
              centered ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
