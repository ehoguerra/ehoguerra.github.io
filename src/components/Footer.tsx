import { ArrowUp } from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { Mark } from "./ui/Mark";

export function Footer({ t }: { t: Translations["footer"] }) {
  return (
    <footer className="relative z-10 pb-6">
      <div className="shell">
        <div className="glass glass-strong flex flex-col gap-8 px-6 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-9">
          <div className="text-[0.875rem] leading-relaxed text-ink-2">
            <p className="flex items-center gap-2.5 text-[0.9375rem] font-[650] text-ink">
              <Mark className="h-7 w-7" />
              Artur Guerra
            </p>
            <p className="mt-4">{t.company}</p>
            <p className="text-ink-3">
              &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Artur Guerra. {t.rights}{" "}
              {t.built}
            </p>
          </div>
          <a href="#top" className="pill pill-glass pill-sm self-start sm:self-auto">
            {t.backToTop}
            <ArrowUp aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
