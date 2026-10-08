import type { ExperienceCopy, Translations } from "@/lib/i18n";
import { EXPERIENCE, type Span } from "@/lib/site";

/** The timeline's axis runs from January 2024 to the end of 2028. */
const FROM = 2024;
const TO = 2029;
const YEARS = [2024, 2025, 2026, 2027, 2028];

// The build month (next.config `env`): "now" moves with every deploy, and the
// static render and the hydrated page agree on it.
const [nowYear, nowMonth] = (process.env.BUILD_MONTH ?? new Date().toISOString().slice(0, 7))
  .split("-")
  .map(Number);
/** The middle of the build month, as a fractional year. */
const NOW = nowYear + (nowMonth - 0.5) / 12;

/** A year's position on the axis, in percent. */
const at = (year: number) => ((Math.min(Math.max(year, FROM), TO) - FROM) / (TO - FROM)) * 100;

type Kind = "done" | "now" | "ahead";
type Segment = { from: number; to: number; kind: Kind };

/** Splits spans at today: time lived is solid, time still ahead is dashed. */
function segments(spans: readonly Span[]): Segment[] {
  return spans.flatMap(({ from, to, earlier }): Segment[] => {
    if (to === "now") return [{ from, to: NOW, kind: earlier ? "done" : "now" }];
    if (earlier || to <= NOW) return [{ from, to, kind: "done" }];
    return [
      { from, to: NOW, kind: "now" },
      { from: NOW, to, kind: "ahead" },
    ];
  });
}

const TONE: Record<Kind, string> = {
  now: "bg-ink",
  done: "bg-ink/30",
  ahead: "span-ahead",
};

/** A role's time on the shared axis; today's tick lines up across every row. */
function Rail({ spans }: { spans: readonly Span[] }) {
  return (
    <div aria-hidden className="relative h-1.5 rounded-full bg-white/[0.07]">
      <div className="timeline-draw absolute inset-0">
        {segments(spans).map((s) => (
          <span
            key={`${s.kind}-${s.from}`}
            data-kind={s.kind}
            className={`absolute inset-y-0 rounded-full ${TONE[s.kind]}`}
            style={{ left: `${at(s.from)}%`, width: `${at(s.to) - at(s.from)}%` }}
          />
        ))}
      </div>
      <span
        data-now
        className="absolute -top-[5px] h-4 w-0.5 -translate-x-1/2 rounded-full bg-amber"
        style={{ left: `${at(NOW)}%` }}
      />
    </div>
  );
}

/** Where the work happens: every role on one timeline, today marked across all. */
export function TrackRecord({ t }: { t: Translations["record"] }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 lg:py-28">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <h2 id="experience-title" className="t-headline">
              {t.title}
            </h2>
            <p className="t-lead mt-5 max-w-[26rem]">{t.lead}</p>
          </div>
        </div>

        <div className="glass glass-strong lg:col-span-8">
          <div aria-hidden className="grid gap-x-10 px-6 pt-7 sm:grid-cols-[9rem_1fr] sm:px-9">
            <span className="max-sm:hidden" />
            <div className="relative h-10">
              <span
                className="t-label absolute top-0 -translate-x-1/2 font-[650] leading-none text-amber"
                style={{ left: `${at(NOW)}%` }}
              >
                {t.now}
              </span>
              {YEARS.map((y) => (
                <span
                  key={y}
                  className={`t-label absolute bottom-0 tabular-nums ${y % 2 ? "max-sm:hidden" : ""}`}
                  style={{ left: `${at(y)}%` }}
                >
                  {y}
                </span>
              ))}
            </div>
          </div>

          <ol>
            {EXPERIENCE.map((e, i) => {
              const item: ExperienceCopy = t.items[e.id];
              return (
                <li
                  key={e.id}
                  data-exp={e.id}
                  className={`grid gap-x-10 gap-y-3 px-6 py-7 sm:grid-cols-[9rem_1fr] sm:px-9 ${i ? "border-t rule" : ""}`}
                >
                  <p className="t-num text-[1.0625rem] leading-6 text-amber sm:-mt-[9px]">{item.period}</p>
                  <div>
                    <Rail spans={e.spans} />
                    <h3 className="mt-5 text-[1.375rem] font-[720] leading-tight tracking-[-0.02em]">{item.role}</h3>
                    <p className="mt-1.5 text-ink-2">{item.org}</p>
                    {item.phases && <p className="t-label mt-2">{item.phases}</p>}
                    <p className="mt-4 max-w-[62ch] leading-relaxed text-ink-2">{item.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {e.tags.map((tag) => (
                        <li key={tag} className="chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
