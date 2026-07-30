"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import type { Locale, Translations } from "@/lib/i18n";
import { CV, SOCIALS } from "@/lib/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { Magnetic } from "./ui/Magnetic";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

export function Contact({
  t,
  locale,
}: {
  t: Translations["contact"];
  locale: Locale;
}) {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(t.email);
      setCopied(true);
    } catch {
      // Clipboard unavailable (insecure context) — the mailto link still works.
    }
  }, [t.email]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6"
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div
        aria-hidden
        className="aurora-blob left-1/2 bottom-0 h-[560px] w-[720px] -translate-x-1/2 translate-y-1/3"
        style={{ background: "rgba(109,94,248,0.11)" }}
      />
      <div
        aria-hidden
        className="bg-dot-grid mask-radial pointer-events-none absolute inset-0 opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionHeading label={t.label} title={t.title} subtitle={t.subtitle} />

        {/* Primary CTA */}
        <Reveal delay={0.1}>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic strength={12}>
              <a
                href={`mailto:${t.email}`}
                className="group relative flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent-2 px-8 py-4 text-base font-semibold text-white shadow-[0_12px_50px_-14px_rgba(109,94,248,0.95)] transition-shadow duration-300 hover:shadow-[0_16px_60px_-12px_rgba(139,124,255,1)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Mail className="relative h-[18px] w-[18px]" />
                <span className="relative">{t.cta}</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>

            <Magnetic strength={8}>
              <a
                href={CV[locale]}
                download
                className="glass hairline flex items-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold text-muted transition-colors duration-300 hover:text-foreground"
              >
                <Download className="h-4 w-4" />
                {t.resume}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {/* Email + copy */}
        <Reveal delay={0.2} className="relative mt-8">
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-2.5 rounded-xl border border-border px-4 py-2 font-mono text-[13px] text-muted transition-colors duration-300 hover:border-border-strong hover:text-foreground"
            aria-label={t.copy}
          >
            {t.email}
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute"
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute"
                  >
                    <Copy className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>
          <span
            aria-live="polite"
            className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-wider text-emerald-400 transition-opacity duration-300 ${
              copied ? "opacity-100" : "opacity-0"
            }`}
          >
            {t.copied}
          </span>
        </Reveal>

        {/* Socials */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex items-center justify-center gap-6">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
              {t.github}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
            <span aria-hidden className="h-4 w-px bg-border-strong" />
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
            >
              <LinkedinIcon className="h-[18px] w-[18px]" />
              {t.linkedin}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
