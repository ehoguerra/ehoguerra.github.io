import { ArrowRight, Download } from "lucide-react";
import type { Locale, Translations } from "@/lib/i18n";
import { CV, SOCIALS } from "@/lib/site";

export function Hero({ t, locale }: { t: Translations["hero"]; locale: Locale }) {
  return (
    <section
      id="top"
      data-cam="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end lg:justify-center"
    >
      <div className="shell on-scene pb-8 lg:pb-0">
        <div className="max-w-[40rem] xl:max-w-[44rem]">
          <h1 id="hero-title" className="t-display enter-title text-ink">
            {t.title}
          </h1>
          <p className="t-lead enter mt-6 max-w-[33rem]" style={{ "--n": 0 } as React.CSSProperties}>
            {t.lead}
          </p>
          <div
            className="enter mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
            style={{ "--n": 1 } as React.CSSProperties}
          >
            <a href={`mailto:${SOCIALS.email}`} className="btn btn-signal">
              {t.primary}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
            <a href={CV[locale]} download className="btn btn-outline">
              {t.secondary}
              <Download aria-hidden className="h-4 w-4" />
            </a>
          </div>
          <p
            className="enter mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-ink-2"
            style={{ "--n": 2 } as React.CSSProperties}
          >
            <span className="lamp" aria-hidden />
            <span>{t.status}</span>
            <span aria-hidden className="text-ink-3">
              ·
            </span>
            <span className="text-ink-3">{t.place}</span>
          </p>
        </div>
      </div>

      <a
        href="#process"
        className="shell enter absolute inset-x-0 bottom-6 hidden items-center gap-4 text-ink-2 hover:text-ink lg:flex"
        style={{ "--n": 4 } as React.CSSProperties}
      >
        <span aria-hidden className="belt-cue block h-1.5 w-16 rounded-full" />
        <span className="t-plate">{t.scroll}</span>
      </a>
    </section>
  );
}
