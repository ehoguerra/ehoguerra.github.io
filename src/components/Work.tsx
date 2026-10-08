import { ArrowUpRight, Lock, Plus } from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { PROJECTS, type ProjectId, type ProjectMeta } from "@/lib/site";
import { Odometer } from "./ui/Odometer";
import { AppIcon } from "./windows/kit";

type T = Translations["work"];

const FEATURED: readonly ProjectId[] = ["vivi", "evosolar", "zelo", "fantasy"];
const MORE: readonly ProjectId[] = ["br1", "cesh", "pecci"];

const meta = (id: ProjectId) => PROJECTS.find((p) => p.id === id) as ProjectMeta;

function Links({ m, t }: { m: ProjectMeta; t: T }) {
  if (m.live)
    return (
      <a href={m.live} target="_blank" rel="noopener noreferrer" className="link-quiet inline-flex items-center gap-1.5">
        {t.live}
        <ArrowUpRight aria-hidden className="h-4 w-4" />
      </a>
    );
  if (m.repo)
    return (
      <a href={m.repo} target="_blank" rel="noopener noreferrer" className="link-quiet inline-flex items-center gap-1.5">
        {t.docs}
        <ArrowUpRight aria-hidden className="h-4 w-4" />
      </a>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-ink-3">
      <Lock aria-hidden className="h-3.5 w-3.5" />
      {t.privateCode}
    </span>
  );
}

function Metrics({ items, size }: { items: { value: string; label: string }[]; size: "lg" | "sm" }) {
  if (items.length === 0) return null;
  return (
    <dl className={`grid grid-cols-3 gap-4 border-y rule ${size === "lg" ? "mt-7 py-5" : "mt-5 py-4"}`}>
      {items.map((m) => (
        <div key={m.label} className="flex min-w-0 flex-col-reverse gap-1">
          <dt className="t-label">{m.label}</dt>
          <dd className={`t-num ${size === "lg" ? "text-[1.875rem]" : "text-[1.375rem]"} leading-none`}>
            <Odometer value={m.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Stack({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className="chip">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Chapter({ id, t, index }: { id: ProjectId; t: T; index: number }) {
  const m = meta(id);
  const p = t.items[id];
  return (
    <article
      data-cam={id}
      data-index={index}
      aria-labelledby={`p-${id}`}
      className="flex min-h-[100svh] items-end pb-16 pt-[50svh] lg:items-center lg:py-16"
    >
      <div className="shell">
        <div className="glass w-full max-w-[33rem] px-6 pb-6 pt-7 sm:px-9 sm:pb-8 sm:pt-9">
          <div className="flex items-start gap-4">
            <AppIcon id={id} size={52} />
            <div className="min-w-0 flex-1">
              <h3 id={`p-${id}`} className="t-title">
                {p.title}
              </h3>
              <p className="t-label mt-2">{p.sector}</p>
            </div>
          </div>
          {m.production && (
            <p className="mt-5 inline-flex items-center gap-2.5 text-[0.9375rem] font-[600] text-live">
              <span className="lamp" />
              {t.production}
            </p>
          )}
          <p className="t-body mt-5">{p.description}</p>
          <Metrics items={p.metrics} size="lg" />
          <details className="manifest mt-3 border-b rule">
            <summary>
              {t.manifest}
              <Plus aria-hidden className="h-5 w-5 text-ink-2" />
            </summary>
            <ul className="flex flex-col gap-2.5 pb-5">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[0.9688rem] leading-snug text-ink-2">
                  <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full" style={{ background: `var(--${id})` }} />
                  {h}
                </li>
              ))}
            </ul>
          </details>
          <Stack items={m.stack} />
          <div className="t-label mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <span>
              {t.role}: <span className="text-ink-2">{p.role}</span>
            </span>
            <Links m={m} t={t} />
          </div>
        </div>
      </div>
    </article>
  );
}

function More({ t }: { t: T }) {
  return (
    <article
      data-cam="more"
      aria-labelledby="more-title"
      className="flex min-h-[100svh] items-end pb-16 pt-[50svh] lg:items-center lg:py-16"
    >
      <div className="shell">
        <div className="glass w-full max-w-[36rem] px-6 pb-4 pt-7 sm:px-9 sm:pt-9">
          <h3 id="more-title" className="t-title">
            {t.more.title}
          </h3>
          <p className="t-body mt-3">{t.more.lead}</p>
          <ul className="mt-6">
            {MORE.map((id) => {
              const m = meta(id);
              const p = t.items[id];
              return (
                <li key={id} className="border-t rule py-6">
                  <div className="flex items-center gap-3.5">
                    <AppIcon id={id} size={40} />
                    <div className="min-w-0">
                      <h4 className="text-[1.1875rem] font-[700] leading-tight tracking-[-0.015em]">{p.title}</h4>
                      <p className="t-label mt-1">{p.sector}</p>
                    </div>
                    {m.production && (
                      <span className="ml-auto inline-flex items-center gap-2 text-[0.8125rem] font-[600] text-live">
                        <span className="lamp" />
                        <span className="sr-only sm:not-sr-only">{t.production}</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-3.5 text-[0.9688rem] leading-relaxed text-ink-2">{p.description}</p>
                  <Metrics items={p.metrics} size="sm" />
                  <p className="t-label mt-4">
                    {m.stack.join(" · ")}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}

/** Each shipped product gets the room's attention in turn. */
export function Work({ t }: { t: T }) {
  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      <header data-cam="vivi" className="shell pb-4 pt-28 lg:pt-36">
        <h2 id="work-title" className="t-headline max-w-[16ch]">
          {t.title}
        </h2>
        <p className="t-lead mt-5 max-w-[34rem]">{t.lead}</p>
      </header>
      {FEATURED.map((id, i) => (
        <Chapter key={id} id={id} t={t} index={i} />
      ))}
      <More t={t} />
    </section>
  );
}
