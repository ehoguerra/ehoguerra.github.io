"use client";

import { ArrowUpRight, Bot, Brain, Code2, Layers, Plug, Rocket } from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";

const ICONS = [Code2, Layers, Brain, Bot, Plug, Rocket];

/** Bento spans — index-aligned with the six capability entries. */
const SPANS = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
];

const GLOWS = [
  "rgba(109,94,248,0.18)",
  "rgba(180,92,245,0.16)",
  "rgba(45,212,212,0.16)",
  "rgba(244,114,182,0.14)",
  "rgba(74,222,128,0.13)",
  "rgba(245,158,107,0.14)",
];

export function Specialties({
  t,
  workLabel,
}: {
  t: Translations["specialties"];
  workLabel: string;
}) {
  return (
    <section
      id="capabilities"
      className="relative px-6"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div
        aria-hidden
        className="bg-line-grid mask-radial pointer-events-none absolute inset-0 opacity-[0.025]"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading label={t.label} title={t.title} subtitle={t.subtitle} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const featured = i === 0 || i === 5;

            return (
              <Reveal
                key={item.title}
                delay={i * 0.06}
                depth
                className={SPANS[i]}
              >
                <TiltCard
                  intensity={featured ? 5 : 8}
                  glow={GLOWS[i % GLOWS.length]}
                  className="h-full rounded-3xl"
                >
                  <article className="conic-ring hairline group relative h-full overflow-hidden rounded-3xl bg-surface p-6 transition-colors duration-500 hover:bg-surface-hover sm:p-7">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                      style={{ background: GLOWS[i % GLOWS.length] }}
                    />

                    <div className="relative flex h-full flex-col">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-white/[0.07] to-transparent">
                          <Icon className="h-5 w-5 text-accent-hover" />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-soft/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3
                        className={`font-semibold tracking-tight ${
                          featured ? "text-xl sm:text-2xl" : "text-lg"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-2.5 text-pretty leading-relaxed text-muted ${
                          featured ? "text-[15px] sm:max-w-lg" : "text-sm"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}

          {/* Bento filler: shortcut into the work section */}
          <Reveal delay={0.4} depth className="lg:col-span-1">
            <a
              href="#work"
              className="hairline group flex h-full min-h-[160px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-accent/15 via-accent-2/10 to-transparent p-6 transition-all duration-500 hover:from-accent/25 sm:p-7"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-hover">
                →
              </span>
              <span className="flex items-end justify-between gap-3">
                <span className="text-xl font-semibold leading-tight tracking-tight">
                  {workLabel}
                </span>
                <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-accent-hover transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
