import type { Translations } from "@/lib/i18n";
import { DISCIPLINES } from "@/lib/site";
import { Odometer } from "./ui/Odometer";

/** The whole room from the back, at night: how every window got built. */
export function Build({ t }: { t: Translations["build"] }) {
  return (
    <section id="build" data-cam="build" aria-labelledby="build-title" className="py-24 lg:py-36">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <h2 id="build-title" className="t-headline">
              {t.title}
            </h2>
            <p className="t-lead mt-5">{t.lead}</p>
          </div>
        </header>
        <ol className="glass glass-strong lg:col-span-8">
          {DISCIPLINES.map((d, i) => {
            const c = t.items[d.id];
            return (
              <li
                key={d.id}
                className={`grid gap-x-8 gap-y-4 px-6 py-7 sm:grid-cols-[1fr_11rem] sm:px-9 sm:py-8 ${i ? "border-t rule" : ""}`}
              >
                <div className="min-w-0">
                  <h3 className="text-[1.375rem] font-[720] leading-tight tracking-[-0.02em]">{c.title}</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-ink-2">{c.body}</p>
                  <p className="t-label mt-4">
                    <span className="sr-only">{t.tools}: </span>
                    {d.tools.join(" · ")}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 sm:items-end sm:text-right">
                  <span className="t-num text-[2.25rem] leading-none">
                    <Odometer value={c.proof.value} />
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-ink-2">{c.proof.label}</span>
                  <span className="t-label">{c.proof.source}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
