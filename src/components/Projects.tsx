"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { PROJECTS, type ProjectMeta } from "@/lib/site";
import { Reveal, RevealItem, Stagger } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";
import { GithubIcon } from "./ui/BrandIcons";

/* ------------------------------------------------------------------ */
/* Generated cover art                                                 */
/* ------------------------------------------------------------------ */

/**
 * Each project gets a deterministic abstract cover built from its two hues:
 * stacked glass planes in perspective over a gradient field. No screenshots
 * needed, and every card stays visually distinct.
 */
function ProjectVisual({
  meta,
  index,
}: {
  meta: ProjectMeta;
  index: string;
}) {
  const [a, b] = meta.hues;

  return (
    <div className="perspective-1000 relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-[16/11]">
      {/* Gradient field */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 20% 15%, ${a}33 0%, transparent 55%), radial-gradient(120% 120% at 85% 85%, ${b}38 0%, transparent 55%), linear-gradient(160deg, #0b0d16 0%, #06070c 100%)`,
        }}
      />

      {/* Grid */}
      <div
        aria-hidden
        className="bg-line-grid absolute inset-0 opacity-[0.07]"
        style={{ backgroundSize: "44px 44px" }}
      />

      {/* Floating planes */}
      <div className="preserve-3d absolute inset-0 grid place-items-center">
        <div
          className="preserve-3d relative h-[62%] w-[68%]"
          style={{ transform: "rotateX(46deg) rotateZ(-32deg)" }}
        >
          {[0, 1, 2].map((layer) => (
            <div
              key={layer}
              className="absolute inset-0 rounded-xl border"
              style={{
                transform: `translateZ(${layer * 26}px)`,
                borderColor: `${layer === 2 ? a : b}55`,
                background: `linear-gradient(135deg, ${layer === 2 ? a : b}1f, transparent 70%)`,
                boxShadow: `0 18px 60px -22px ${a}88`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Index watermark */}
      <span
        aria-hidden
        className="absolute bottom-3 right-5 font-mono text-[5rem] font-bold leading-none tracking-tighter text-white/[0.045] sm:text-[7rem]"
      >
        {index}
      </span>

      {/* Sheen */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Row                                                                 */
/* ------------------------------------------------------------------ */

function ProjectRow({
  meta,
  copy,
  labels,
  flip,
}: {
  meta: ProjectMeta;
  copy: Translations["projects"]["items"][keyof Translations["projects"]["items"]];
  labels: Translations["projects"];
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [42, -42]);

  return (
    <div
      ref={ref}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      {/* Visual */}
      <Reveal
        from={flip ? "right" : "left"}
        distance={40}
        className={flip ? "lg:order-2" : ""}
      >
        <motion.div style={reduced ? undefined : { y }}>
          <TiltCard
            intensity={6}
            glow={`${meta.hues[0]}22`}
            className="rounded-3xl"
          >
            <ProjectVisual meta={meta} index={meta.index} />
          </TiltCard>
        </motion.div>
      </Reveal>

      {/* Content */}
      <div className={flip ? "lg:order-1" : ""}>
        <Stagger gap={0.07}>
          <RevealItem>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[11px] tracking-[0.2em] text-muted-soft">
                {meta.index}
              </span>
              <span className="h-px w-6 bg-border-strong" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {copy.domain}
              </span>
              {meta.ai && (
                <span className="inline-flex items-center gap-1 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-hover">
                  <Sparkles className="h-3 w-3" />
                  AI
                </span>
              )}
            </div>
          </RevealItem>

          <RevealItem>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {copy.title}
            </h3>
          </RevealItem>

          <RevealItem>
            <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted">
              {copy.description}
            </p>
          </RevealItem>

          {/* Metrics */}
          {copy.metrics.length > 0 && (
            <RevealItem>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {copy.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div
                      className="text-2xl font-semibold tracking-tight"
                      style={{ color: meta.hues[0] }}
                    >
                      {metric.value}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-soft">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </RevealItem>
          )}

          {/* Highlights */}
          <RevealItem>
            <ul className="mt-6 space-y-2">
              {copy.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-muted/85"
                >
                  <span
                    aria-hidden
                    className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full"
                    style={{ background: meta.hues[1] }}
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Stack */}
          <RevealItem>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {meta.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-surface px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-muted transition-colors duration-300 hover:border-border-strong hover:text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </RevealItem>

          {/* Footer: role + links */}
          <RevealItem>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-soft">
                {labels.roleLabel} · {copy.role}
              </span>

              <span className="flex flex-wrap items-center gap-4">
                {meta.live && (
                  <a
                    href={meta.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
                  >
                    {labels.viewLive}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
                {meta.repo ? (
                  <a
                    href={meta.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    {labels.viewCode}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-soft">
                    <Lock className="h-3 w-3" />
                    {labels.privateRepo}
                  </span>
                )}
              </span>
            </div>
          </RevealItem>
        </Stagger>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Projects({ t }: { t: Translations["projects"] }) {
  return (
    <section
      id="work"
      className="relative px-6"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div
        aria-hidden
        className="aurora-blob right-[-8%] top-[12%] h-[500px] w-[500px]"
        style={{ background: "rgba(180,92,245,0.06)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading label={t.label} title={t.title} subtitle={t.subtitle} />

        <div className="space-y-24 sm:space-y-32">
          {PROJECTS.map((meta, i) => (
            <ProjectRow
              key={meta.id}
              meta={meta}
              copy={t.items[meta.id]}
              labels={t}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
