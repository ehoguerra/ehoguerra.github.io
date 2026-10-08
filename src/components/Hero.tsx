import { ArrowRight, Download } from "lucide-react";
import type { CSSProperties } from "react";
import type { Locale, Translations } from "@/lib/i18n";
import { CV, SOCIALS } from "@/lib/site";

const n = (i: number) => ({ "--n": i }) as CSSProperties;

/** The claim over the dusk sky; the live windows float to its right. */
export function Hero({ t, locale }: { t: Translations["hero"]; locale: Locale }) {
  return (
    <section id="top" data-cam="hero" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col">
      {/* Phones: the windows sit above, so the copy gets a night wash. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-night via-night/85 to-transparent lg:hidden"
      />
      {/* Phones: the top of the screen belongs to the windows. */}
      <div className="shell relative flex flex-1 flex-col pb-16 pt-[42svh] lg:justify-center lg:pb-20 lg:pt-[calc(var(--header-h)+2.5rem)]">
        <div className="max-w-[40rem]">
          <h1 id="hero-title" className="t-display enter-title">
            {t.title}
          </h1>
          <p className="t-lead enter mt-7 max-w-[33rem]" style={n(1)}>
            {t.lead}
          </p>
          <div className="enter mt-9 flex flex-wrap gap-3" style={n(2)}>
            <a href={`mailto:${SOCIALS.email}`} className="pill pill-primary">
              {t.primary}
              <ArrowRight aria-hidden className="nudge h-[18px] w-[18px]" />
            </a>
            <a href={CV[locale]} download className="pill pill-glass">
              {t.secondary}
              <Download aria-hidden className="h-[18px] w-[18px]" />
            </a>
          </div>
          <p className="t-label enter mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5" style={n(3)}>
            <span className="flex items-center gap-2.5 text-ink-2">
              <span className="lamp" />
              {t.status}
            </span>
            <span aria-hidden className="text-ink-3/60">
              ·
            </span>
            <span>{t.place}</span>
          </p>
        </div>
      </div>
      <div className="enter absolute inset-x-0 bottom-7 hidden flex-col items-center gap-3 lg:flex" style={n(5)}>
        <span aria-hidden className="cue-grabber" />
        <span className="t-label">{t.scroll}</span>
      </div>
    </section>
  );
}
