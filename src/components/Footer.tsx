"use client";

import { ArrowUp } from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { SOCIALS } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

export function Footer({ t }: { t: Translations["footer"] }) {
  return (
    <footer className="relative border-t border-border px-6 py-10">
      {/* Oversized wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-6 select-none overflow-hidden"
      >
        <p className="mask-fade-b bg-gradient-to-b from-white/[0.045] to-transparent bg-clip-text text-center text-[18vw] font-bold leading-none tracking-tighter text-transparent">
          ARTUR GUERRA
        </p>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-soft">
            {t.built}
          </p>
          <p className="mt-1.5 text-xs text-muted-soft/80">
            &copy; {new Date().getFullYear()} Artur Guerra. {t.rights}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-soft transition-colors duration-300 hover:text-foreground"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-soft transition-colors duration-300 hover:text-foreground"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href="#top"
            className="group flex items-center gap-2 rounded-xl border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-soft transition-colors duration-300 hover:border-accent/40 hover:text-foreground"
          >
            {t.backToTop}
            <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
