"use client";

import { ArrowUpRight } from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { OPEN_SOURCE, SOCIALS } from "@/lib/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";
import { GithubIcon } from "./ui/BrandIcons";
import { Magnetic } from "./ui/Magnetic";

export function OpenSource({ t }: { t: Translations["openSource"] }) {
  return (
    <section
      id="open-source"
      className="relative px-6"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading label={t.label} title={t.title} subtitle={t.subtitle} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OPEN_SOURCE.map((repo, i) => (
            <Reveal key={repo.id} delay={i * 0.06} depth>
              <TiltCard
                intensity={9}
                glow="rgba(139,124,255,0.15)"
                className="h-full rounded-2xl"
              >
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="conic-ring hairline group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface p-5 transition-colors duration-500 hover:bg-surface-hover"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-background-soft">
                      <GithubIcon className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-foreground" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-hover" />
                  </div>

                  <h3 className="mt-4 break-all font-mono text-[13px] font-semibold tracking-tight text-foreground">
                    {repo.name}
                  </h3>

                  <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted">
                    {t.items[repo.id].description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {repo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Magnetic strength={10}>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass hairline group inline-flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-semibold text-muted transition-colors duration-300 hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" />
              {t.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
