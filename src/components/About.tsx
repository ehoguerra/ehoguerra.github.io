"use client";

import type { Translations } from "@/lib/i18n";
import { Reveal, RevealItem, Stagger } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TiltCard } from "./ui/TiltCard";
import { Counter } from "./ui/Counter";

const CODE_LINES: { text: string; tone: "key" | "str" | "cmt" | "fn" }[] = [
  { text: "class Engineer(Builder):", tone: "key" },
  { text: "    stack = ['python', 'ts', 'php']", tone: "str" },
  { text: "    ai = MultiProvider(fallback=True)", tone: "fn" },
  { text: "", tone: "cmt" },
  { text: "    async def ship(self, idea):", tone: "key" },
  { text: "        # architecture → deploy", tone: "cmt" },
  { text: "        return await self.build(idea)", tone: "fn" },
];

const TONE = {
  key: "text-accent-hover",
  str: "text-accent-3",
  cmt: "text-muted-soft",
  fn: "text-foreground/80",
} as const;

export function About({ t }: { t: Translations["about"] }) {
  return (
    <section
      id="about"
      className="relative px-6"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div
        aria-hidden
        className="aurora-blob left-[-10%] top-1/4 h-[420px] w-[420px]"
        style={{ background: "rgba(109,94,248,0.07)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading label={t.label} title={t.title} align="left" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-balance font-serif text-3xl italic leading-tight text-foreground sm:text-4xl">
                {t.lead}
              </p>
              <span className="mt-6 block h-px w-24 bg-gradient-to-r from-accent to-transparent" />
            </Reveal>

            <Stagger className="mt-8 space-y-5" gap={0.12}>
              {[t.p1, t.p2, t.p3].map((paragraph, i) => (
                <RevealItem key={i}>
                  <p className="text-pretty text-[15px] leading-[1.85] text-muted sm:text-base">
                    {paragraph}
                  </p>
                </RevealItem>
              ))}
            </Stagger>
          </div>

          {/* Terminal card */}
          <div className="lg:col-span-5">
            <Reveal from="right" delay={0.15} depth>
              <TiltCard
                intensity={7}
                glow="rgba(45,212,212,0.14)"
                className="rounded-3xl"
              >
                <div className="hairline glass relative overflow-hidden rounded-3xl">
                  <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 font-mono text-[11px] text-muted-soft">
                      artur@builder ~ %
                    </span>
                  </div>

                  <pre className="overflow-x-auto px-5 py-6 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
                    <code>
                      {CODE_LINES.map((line, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="w-4 select-none text-right text-muted-soft/50">
                            {i + 1}
                          </span>
                          <span className={TONE[line.tone]}>
                            {line.text || " "}
                          </span>
                        </div>
                      ))}
                    </code>
                  </pre>

                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent/[0.07] to-transparent"
                  />
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <Stagger
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4"
          gap={0.09}
        >
          {t.stats.map((stat) => (
            <RevealItem key={stat.label} className="bg-background">
              <div className="group relative h-full overflow-hidden px-6 py-8 transition-colors duration-500 hover:bg-surface">
                <div className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                  {stat.label}
                </p>
                <span
                  aria-hidden
                  className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-3 transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
