import type { Translations } from "@/lib/i18n";
import { EXPERIENCE } from "@/lib/site";

/** Where the work was done: a dense, quiet pane after the products. */
export function TrackRecord({ t }: { t: Translations["record"] }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 lg:py-28">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <h2 id="experience-title" className="t-headline lg:col-span-4">
          {t.title}
        </h2>
        <ol className="glass glass-strong lg:col-span-8">
          {EXPERIENCE.map((e, i) => {
            const item = t.items[e.id];
            return (
              <li
                key={e.id}
                className={`grid gap-x-10 gap-y-3 px-6 py-8 sm:grid-cols-[9rem_1fr] sm:px-9 ${i ? "border-t rule" : ""}`}
              >
                <p className="t-num pt-1 text-[0.9375rem] font-[650] text-amber">{item.period}</p>
                <div>
                  <h3 className="text-[1.375rem] font-[720] leading-tight tracking-[-0.02em]">{item.role}</h3>
                  <p className="mt-1.5 text-ink-2">{item.org}</p>
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
    </section>
  );
}
