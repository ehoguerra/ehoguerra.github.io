"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { Translations } from "@/lib/i18n";
import { EXPERIENCE } from "@/lib/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Experience({ t }: { t: Translations["experience"] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative px-6"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading label={t.label} title={t.title} align="left" />

        <div ref={railRef} className="relative pl-8 sm:pl-12">
          {/* Rail */}
          <div
            aria-hidden
            className="absolute left-[3px] top-2 h-full w-px bg-border sm:left-[7px]"
          />
          <motion.div
            aria-hidden
            style={reduced ? { scaleY: 1 } : { scaleY }}
            className="absolute left-[3px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 sm:left-[7px]"
          />

          <div className="space-y-10 sm:space-y-14">
            {EXPERIENCE.map((entry, i) => {
              const copy = t.items[entry.id];
              return (
                <Reveal key={entry.id} delay={i * 0.08} from="right" distance={20}>
                  <div className="group relative">
                    {/* Node */}
                    <span
                      aria-hidden
                      className={`absolute -left-8 top-1.5 flex h-[9px] w-[9px] items-center justify-center rounded-full ring-4 ring-background transition-colors duration-500 sm:-left-12 ${
                        entry.current
                          ? "bg-accent-hover"
                          : "bg-muted-soft group-hover:bg-accent"
                      }`}
                    >
                      {entry.current && (
                        <span className="absolute h-full w-full animate-ping rounded-full bg-accent-hover/60" />
                      )}
                    </span>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-hover">
                        {copy.period}
                      </span>
                      {entry.current && (
                        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                          live
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                      {copy.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-muted">
                      {copy.org}
                    </p>
                    <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted/85">
                      {copy.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-soft transition-colors duration-300 group-hover:border-border-strong group-hover:text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
