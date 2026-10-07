"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Translations } from "@/lib/i18n";
import { lineState } from "@/lib/line";
import { PROJECTS, type ProjectMeta } from "@/lib/site";
import { Odometer } from "./ui/Odometer";

type Copy = Translations["shipped"];

function ProductLabel({ meta, index, t }: { meta: ProjectMeta; index: number; t: Copy }) {
  const copy = t.items[meta.id];
  const pad = "px-5 sm:px-7";
  return (
    <article className="label" aria-labelledby={`product-${meta.id}`}>
      <header className={`flex items-start justify-between gap-4 pb-4 pt-5 sm:pt-6 ${pad}`}>
        <div>
          <h3 id={`product-${meta.id}`} className="t-h3">
            {copy.title}
          </h3>
          <p className="t-plate mt-2 text-ink-3">{copy.sector}</p>
        </div>
        <span
          aria-hidden
          className="t-plate tnum shrink-0 rounded-[3px] bg-ink px-2 py-1.5 text-signal"
        >
          AG-{String(index + 1).padStart(2, "0")}
        </span>
      </header>

      {meta.production && (
        <p className={`flex items-center gap-2.5 pb-4 text-[0.875rem] font-[600] text-ink ${pad}`}>
          <span className="lamp" aria-hidden />
          {t.production}
        </p>
      )}

      <div className={`label-rule py-5 ${pad}`}>
        <p className="t-body">{copy.description}</p>
      </div>

      {copy.metrics.length > 0 && (
        <dl
          className="label-rule grid"
          style={{ gridTemplateColumns: `repeat(${copy.metrics.length}, minmax(0, 1fr))` }}
        >
          {copy.metrics.map((m) => (
            <div key={m.label} className={`label-cell flex flex-col-reverse justify-end gap-1.5 py-4 ${pad}`}>
              <dt className="text-[0.8125rem] leading-snug text-ink-2">{m.label}</dt>
              <dd>
                <Odometer
                  value={m.value}
                  className="text-[1.75rem] font-[800] leading-none tracking-[-0.02em] wdth-112"
                />
              </dd>
            </div>
          ))}
        </dl>
      )}

      <dl className={`label-rule grid gap-x-6 gap-y-2 py-4 text-[0.9375rem] sm:grid-cols-[5.5rem_1fr] ${pad}`}>
        <dt className="t-plate pt-1 text-ink-3">{t.role}</dt>
        <dd className="text-ink">{copy.role}</dd>
        <dt className="t-plate pt-1 text-ink-3">{t.stack}</dt>
        <dd className="font-[560] text-ink-2 wdth-75">{meta.stack.join(" · ")}</dd>
      </dl>

      <details className="manifest label-rule">
        <summary
          className={`t-plate flex min-h-12 items-center justify-between py-4 text-ink transition-colors duration-200 hover:bg-floor/70 ${pad}`}
        >
          {t.manifest}
          <Plus aria-hidden className="h-4 w-4" />
        </summary>
        <ul className={`space-y-2.5 pb-6 ${pad}`}>
          {copy.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-2">
              <span aria-hidden className="mt-[0.62em] h-[2px] w-3 shrink-0 bg-ink" />
              {h}
            </li>
          ))}
        </ul>
      </details>

      <div className={`label-rule flex flex-wrap items-center gap-x-6 gap-y-2 py-4 ${pad}`}>
        {meta.live && (
          <a
            href={meta.live}
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule inline-flex items-center gap-1.5 font-[620] text-ink"
          >
            {t.live}
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
        )}
        {meta.repo && (
          <a
            href={meta.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule inline-flex items-center gap-1.5 font-[620] text-ink"
          >
            {t.docs}
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
        )}
        {!meta.live && !meta.repo && <span className="t-plate text-ink-3">{t.privateCode}</span>}
      </div>
    </article>
  );
}

export function Shipped({ t }: { t: Copy }) {
  const list = useRef<HTMLOListElement>(null);

  // The label in the middle of the viewport lights its case on the pallet.
  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const live = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.index);
          if (e.isIntersecting) {
            live.add(i);
            lineState.product = i;
          } else live.delete(i);
        }
        if (live.size === 0) lineState.product = -1;
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    root.querySelectorAll<HTMLElement>("[data-index]").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      lineState.product = -1;
    };
  }, []);

  return (
    <section id="work" data-cam="shipped" aria-labelledby="work-title" className="section-y">
      <div className="shell on-scene">
        <div className="max-w-[40rem]">
          <h2 id="work-title" className="t-h2">
            {t.title}
          </h2>
          <p className="t-lead mt-5">{t.lead}</p>
        </div>
      </div>
      <div className="shell">
        <ol ref={list} className="mt-14 flex max-w-[46rem] flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <li key={p.id} data-index={i}>
              <ProductLabel meta={p} index={i} t={t} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
