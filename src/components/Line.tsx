"use client";

import { useEffect, useRef, useState } from "react";
import type { Translations } from "@/lib/i18n";
import { STATIONS } from "@/lib/site";
import { Odometer } from "./ui/Odometer";

const pad = (n: number) => String(n).padStart(2, "0");

/** Floating readout of where the product is on the line (desktop). */
function LineHud({ t, active, visible }: { t: Translations["line"]; active: number; visible: boolean }) {
  const current = STATIONS[Math.max(0, active)];
  return (
    <nav
      aria-label={t.position}
      className={`plate fixed bottom-6 right-6 z-30 hidden px-4 py-3 transition-[opacity,visibility,transform] duration-300 lg:block ${
        visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
      }`}
    >
      <ol className="flex items-center gap-1">
        {STATIONS.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#station-${s.id}`}
              aria-current={i === active ? "step" : undefined}
              aria-label={`${t.station} ${i + 1}: ${t.stations[s.id].title}`}
              className="grid h-6 w-6 place-items-center rounded-[4px] hover:bg-floor-deep"
            >
              <span
                className="lamp"
                data-state={i < active ? undefined : i === active ? "active" : "idle"}
              />
            </a>
          </li>
        ))}
      </ol>
      <p className="t-plate mt-2 text-ink-2" aria-live="polite">
        <span className="tnum text-ink">{pad(Math.max(0, active) + 1)}</span> / {pad(STATIONS.length)} ·{" "}
        {t.stations[current.id].title}
      </p>
    </nav>
  );
}

export function Line({ t }: { t: Translations["line"] }) {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);
  const [inLine, setInLine] = useState(false);

  // Stations are contiguous, so "a station crosses the middle band" means
  // the visitor is on the line: that drives both the readout and its lamp.
  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const live = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.station);
          if (e.isIntersecting) {
            live.add(i);
            setActive(i);
          } else live.delete(i);
        }
        setInLine(live.size > 0);
      },
      { rootMargin: "-49% 0px -49% 0px" },
    );
    root.querySelectorAll<HTMLElement>("[data-station]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" ref={section} aria-labelledby="process-title">
      <div data-cam="line" className="flex min-h-[100svh] flex-col justify-end lg:justify-center">
        <div className="shell on-scene pb-16 lg:pb-0">
          <div className="max-w-[36rem]">
            <h2 id="process-title" className="t-h2">
              {t.title}
            </h2>
            <p className="t-lead mt-5">{t.lead}</p>
          </div>
        </div>
      </div>

      <ol>
        {STATIONS.map((s, i) => {
          const copy = t.stations[s.id];
          return (
            <li
              key={s.id}
              id={`station-${s.id}`}
              data-cam={`s${i}`}
              data-station={i}
              className="flex min-h-[100svh] flex-col justify-end py-10 lg:justify-center"
            >
              <div className="shell">
                <article className="plate screws w-full max-w-[29rem] px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9">
                  <h3 className="t-h3 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="tnum inline-grid h-[1.45em] min-w-[2.1em] place-items-center rounded-[4px] bg-ink px-1.5 text-[0.62em] text-signal"
                    >
                      {pad(i + 1)}
                    </span>
                    <span className="sr-only">
                      {t.station} {i + 1} {t.of} {STATIONS.length}:
                    </span>
                    {copy.title}
                  </h3>
                  <p className="t-body mt-4">{copy.body}</p>

                  <div className="mt-6 border-t border-rule pt-5">
                    <p className="flex items-baseline gap-4">
                      <Odometer
                        value={copy.proof.value}
                        className="shrink-0 text-[2.75rem] font-[800] leading-none tracking-[-0.03em] wdth-112"
                      />
                      <span className="text-[0.9375rem] leading-snug text-ink">{copy.proof.label}</span>
                    </p>
                    <p className="t-plate mt-3 text-ink-3">{copy.proof.source}</p>
                  </div>

                  <ul aria-label={t.tools} className="mt-6 flex flex-wrap gap-1.5">
                    {s.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-[4px] border border-rule-strong px-2 py-1 text-[0.8125rem] font-[560] text-ink-2 wdth-75"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </li>
          );
        })}
      </ol>

      <LineHud t={t} active={active} visible={inLine} />
    </section>
  );
}
