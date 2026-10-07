import { ArrowUp } from "lucide-react";
import type { Translations } from "@/lib/i18n";

export function Footer({ t }: { t: Translations["footer"] }) {
  return (
    <footer data-opaque className="on-steel relative z-10 bg-steel text-steel-ink-2">
      <div className="shell flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-[0.875rem] leading-relaxed">
          <p className="t-plate text-[0.8125rem] text-steel-ink">Artur Guerra</p>
          <p className="mt-4">{t.company}</p>
          <p>
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Artur Guerra.{" "}
            {t.rights} {t.built}
          </p>
        </div>
        <a href="#top" className="btn btn-outline h-11 min-h-0 self-start sm:self-auto">
          {t.backToTop}
          <ArrowUp aria-hidden className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
