import type { Translations } from "@/lib/i18n";
import { EXPERIENCE } from "@/lib/site";

/** A quiet, dense passage after the line: the 3D stage pauses behind it. */
export function TrackRecord({ t }: { t: Translations["record"] }) {
  return (
    <section
      id="experience"
      data-cam="rest"
      data-opaque
      aria-labelledby="experience-title"
      className="on-steel section-y bg-steel text-steel-ink"
    >
      <div className="shell grid gap-12 lg:grid-cols-12">
        <h2 id="experience-title" className="t-h2 lg:col-span-4">
          {t.title}
        </h2>
        <ol className="border-t-2 border-steel-ink lg:col-span-8">
          {EXPERIENCE.map((e) => {
            const item = t.items[e.id];
            return (
              <li
                key={e.id}
                className="grid gap-x-10 gap-y-3 border-b border-white/12 py-8 sm:grid-cols-[9.5rem_1fr]"
              >
                <p className="t-plate tnum pt-1.5 text-signal">{item.period}</p>
                <div>
                  <h3 className="text-[1.5rem] font-[760] leading-tight tracking-[-0.015em] wdth-112">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-steel-ink-2">{item.org}</p>
                  <p className="mt-4 max-w-[62ch] text-steel-ink-2">{item.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {e.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-[4px] border border-white/20 px-2 py-1 text-[0.8125rem] font-[560] text-steel-ink wdth-75"
                      >
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
    </section>
  );
}
