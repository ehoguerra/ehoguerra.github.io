"use client";

import { Building2, GraduationCap, HeartPulse, Sun, Trophy } from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const ICONS = [HeartPulse, Sun, Trophy, GraduationCap, Building2];

const TINTS = [
  "rgba(45,212,212,0.10)",
  "rgba(245,158,107,0.10)",
  "rgba(74,222,128,0.10)",
  "rgba(109,94,248,0.10)",
  "rgba(180,92,245,0.10)",
];

export function Impact({ t }: { t: Translations["impact"] }) {
  return (
    <section
      id="impact"
      className="relative px-6"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading label={t.label} title={t.title} align="left" />

        <div className="border-t border-border">
          {t.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="group relative overflow-hidden border-b border-border">
                  {/* Hover wash */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    style={{
                      background: `linear-gradient(90deg, ${TINTS[i % TINTS.length]}, transparent 75%)`,
                    }}
                  />

                  <div className="relative flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:gap-8 sm:py-8">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-muted-soft sm:w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="flex items-center gap-4 sm:w-64 sm:flex-shrink-0">
                      <Icon className="h-5 w-5 flex-shrink-0 text-muted-soft transition-colors duration-500 group-hover:text-accent-hover" />
                      <h3 className="text-xl font-semibold tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 sm:text-2xl">
                        {item.title}
                      </h3>
                    </span>

                    <p className="text-pretty text-sm leading-relaxed text-muted sm:flex-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
