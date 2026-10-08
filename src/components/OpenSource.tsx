import { ArrowUpRight } from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { OPEN_SOURCE, SOCIALS } from "@/lib/site";
import { GithubIcon } from "./ui/BrandIcons";

/** Public repos as a plain, scannable list; names set as the code they are. */
export function OpenSource({ t }: { t: Translations["openSource"] }) {
  return (
    <section id="open-source" aria-labelledby="open-source-title" className="py-20 lg:py-28">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 id="open-source-title" className="t-headline">
            {t.title}
          </h2>
          <p className="t-lead mt-5">{t.lead}</p>
          <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="pill pill-glass mt-8">
            <GithubIcon className="h-[18px] w-[18px]" />
            {t.cta}
          </a>
        </div>
        <ul className="glass glass-strong overflow-hidden lg:col-span-8">
          {OPEN_SOURCE.map((repo, i) => (
            <li key={repo.id} className={i ? "border-t rule" : ""}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-x-8 gap-y-2 px-6 py-6 transition-colors duration-300 hover:bg-white/[0.05] sm:grid-cols-[minmax(0,15rem)_1fr_auto] sm:px-9"
              >
                <span className="font-mono text-[0.9375rem] font-[500] text-ink">{repo.name}</span>
                <span className="text-ink-2">
                  {t.items[repo.id].description}
                  <span className="t-label mt-2 block">{repo.tags.join(" · ")}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="hidden h-5 w-5 text-ink-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:block"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
