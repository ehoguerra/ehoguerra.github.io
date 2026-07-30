"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  GitBranch,
  ImagePlus,
  MessageSquareMore,
  Rocket,
  ScanEye,
  Workflow,
  Zap,
} from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { PIPELINE } from "@/lib/site";
import { Reveal, RevealItem, Stagger } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";

const PIPELINE_ICONS = [ScanEye, Brain, Workflow, Rocket];

const CAPABILITY_ICONS = [
  Workflow,
  ScanEye,
  MessageSquareMore,
  Zap,
  GitBranch,
  ImagePlus,
];

const CAPABILITY_GLOWS = [
  "rgba(109,94,248,0.16)",
  "rgba(180,92,245,0.15)",
  "rgba(45,212,212,0.15)",
  "rgba(244,114,182,0.13)",
  "rgba(74,222,128,0.13)",
  "rgba(245,158,107,0.13)",
];

export function AISection({ t }: { t: Translations["aiSection"] }) {
  const reduced = useReducedMotion();

  return (
    <section
      id="ai"
      className="relative overflow-hidden px-6"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div
        aria-hidden
        className="aurora-blob left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2"
        style={{ background: "rgba(180,92,245,0.07)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading label={t.label} title={t.title} subtitle={t.subtitle} />

        {/* Pipeline */}
        <Reveal className="mb-20">
          <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
            {t.pipelineLabel}
          </p>

          <div className="relative grid gap-6 md:grid-cols-4 md:gap-0">
            {/* Connector rail (desktop) */}
            <div
              aria-hidden
              className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px overflow-hidden bg-border md:block"
            >
              <motion.span
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent-hover to-transparent"
                animate={reduced ? undefined : { x: ["-40%", "340%"] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {PIPELINE.map((stage, i) => {
              const Icon = PIPELINE_ICONS[i];
              const copy = t.pipeline[stage];
              return (
                <Reveal
                  key={stage}
                  delay={i * 0.12}
                  className="relative flex flex-col items-center px-2 text-center"
                >
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background shadow-[0_0_0_6px_var(--background)]">
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent" />
                    <Icon className="relative h-5 w-5 text-accent-hover" />
                  </span>
                  <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 text-base font-semibold tracking-tight">
                    {copy.title}
                  </h3>
                  <p className="mt-2 max-w-[26ch] text-pretty text-[13px] leading-relaxed text-muted">
                    {copy.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </Reveal>

        {/* Capabilities */}
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {t.capabilities.map((capability, i) => {
            const Icon = CAPABILITY_ICONS[i % CAPABILITY_ICONS.length];
            const glow = CAPABILITY_GLOWS[i % CAPABILITY_GLOWS.length];

            return (
              <RevealItem key={capability.title} className="h-full">
                <TiltCard intensity={8} glow={glow} className="h-full rounded-2xl">
                  <article className="hairline group relative h-full overflow-hidden rounded-2xl bg-surface p-6 transition-colors duration-500 hover:bg-surface-hover">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                      style={{ background: glow }}
                    />
                    <span className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background-soft">
                      <Icon className="h-[18px] w-[18px] text-accent-hover" />
                    </span>
                    <h3 className="relative text-base font-semibold tracking-tight">
                      {capability.title}
                    </h3>
                    <p className="relative mt-2 text-pretty text-sm leading-relaxed text-muted">
                      {capability.description}
                    </p>
                  </article>
                </TiltCard>
              </RevealItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
