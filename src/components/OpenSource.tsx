import { ArrowUpRight } from "lucide-react";
import type { Translations } from "@/lib/i18n";
import { OPEN_SOURCE, SOCIALS } from "@/lib/site";
import { GithubIcon } from "./ui/BrandIcons";

/** The parts bin: public repos as a plain, scannable list. */
export function OpenSource({ t }: { t: Translations["openSource"] }) {
  return (
    <section
      id="open-source"
      data-cam="rest"
      data-opaque
      aria-labelledby="open-source-title"
      className="section-y bg-floor"
    >
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="open-source-title" className="t-h2">
            {t.title}
          </h2>
          <p className="t-lead mt-5">{t.lead}</p>
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-8"
          >
            <GithubIcon className="h-4 w-4" />
            {t.cta}
          </a>
        </div>

        <ul className="border-t-2 border-ink lg:col-span-8">
          {OPEN_SOURCE.map((repo) => (
            <li key={repo.id} className="border-b border-rule">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-x-8 gap-y-2 py-6 transition-colors duration-200 hover:bg-floor-deep/60 sm:grid-cols-[minmax(0,15rem)_1fr_auto] sm:px-3"
              >
                <span className="font-mono text-[0.9375rem] font-medium text-ink">{repo.name}</span>
                <span className="text-ink-2">
                  {t.items[repo.id].description}
                  <span className="mt-2 block text-[0.8125rem] font-[560] text-ink-3 wdth-75">
                    {repo.tags.join(" · ")}
                  </span>
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
