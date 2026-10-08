"use client";

import { ArrowRight, Check, Copy, Download } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale, Translations } from "@/lib/i18n";
import { CV, SOCIALS } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

/** Dawn over the ridge: the room waits for the next window. */
export function Contact({ t, locale }: { t: Translations["contact"]; locale: Locale }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SOCIALS.email);
      setCopied(true);
    } catch {
      // Clipboard blocked: the address stays visible and selectable.
    }
  };

  return (
    <section
      id="contact"
      data-cam="contact"
      aria-labelledby="contact-title"
      className="flex min-h-[100svh] flex-col justify-end pb-14 pt-[46svh] lg:justify-center lg:py-14"
    >
      <div className="shell">
        <div className="glass w-full max-w-[38rem] px-6 pb-7 pt-8 sm:px-10 sm:pb-9 sm:pt-11">
          <h2 id="contact-title" className="t-headline">
            {t.title}
          </h2>
          <p className="t-lead mt-5">{t.lead}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${SOCIALS.email}`} className="pill pill-primary">
              {t.primary}
              <ArrowRight aria-hidden className="nudge h-[18px] w-[18px]" />
            </a>
            <a href={CV[locale]} download className="pill pill-glass">
              {t.cv}
              <Download aria-hidden className="h-[18px] w-[18px]" />
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t rule pt-6">
            <button
              type="button"
              onClick={copy}
              className="group inline-flex items-center gap-2.5 rounded-full py-1.5 text-[0.9688rem] font-[560] text-ink"
            >
              <span className="sr-only">{t.copy}: </span>
              <span className="link-quiet">{SOCIALS.email}</span>
              {copied ? (
                <Check aria-hidden className="h-4 w-4 text-live" />
              ) : (
                <Copy aria-hidden className="h-4 w-4 text-ink-3 transition-colors group-hover:text-ink" />
              )}
            </button>
            <span role="status" className="sr-only">
              {copied ? t.copied : ""}
            </span>
            <div className="flex items-center gap-1.5">
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-full text-ink-2 transition-colors hover:bg-white/10 hover:text-ink"
              >
                <GithubIcon className="h-[19px] w-[19px]" />
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full text-ink-2 transition-colors hover:bg-white/10 hover:text-ink"
              >
                <LinkedinIcon className="h-[19px] w-[19px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
