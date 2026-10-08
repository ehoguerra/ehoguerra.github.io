"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { translations, type Locale } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/hooks";
import { useSmoothScroll } from "@/lib/scroll";
import { Stage } from "./three/Stage";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Work } from "./Work";
import { Build } from "./Build";
import { TrackRecord } from "./TrackRecord";
import { OpenSource } from "./OpenSource";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

const STORAGE_KEY = "ag-locale";

/* Never subscribes — the preferred locale is only read once, on mount. */
const noopSubscribe = () => () => {};

/** Stored choice first, then the browser's language, then English. */
function readPreferredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "pt") return stored;
  } catch {
    // localStorage can be blocked; fall through to the language check.
  }
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function Portfolio() {
  // Server and first client paint agree on "en", then the stored preference
  // is applied — no setState-in-effect, no hydration mismatch.
  const preferred = useSyncExternalStore(
    noopSubscribe,
    readPreferredLocale,
    () => "en" as Locale,
  );
  const [chosen, setChosen] = useState<Locale | null>(null);
  const locale = chosen ?? preferred;
  const t = translations[locale];
  const reduced = useReducedMotion();

  useSmoothScroll(!reduced);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  // Persist only an explicit choice. Persisting `locale` from an effect would
  // write the hydration pass's "en" over the saved preference before
  // useSyncExternalStore re-reads it.
  const choose = (next: Locale) => {
    setChosen(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice simply won't persist.
    }
  };

  const navItems = useMemo(
    () => [
      { id: "work", label: t.nav.work },
      { id: "build", label: t.nav.build },
      { id: "experience", label: t.nav.record },
      { id: "open-source", label: t.nav.open },
      { id: "contact", label: t.nav.contact },
    ],
    [t],
  );

  return (
    <>
      <a href="#main" className="skip-link pill pill-primary">
        {t.meta.skip}
      </a>
      <Stage sims={t.sims} sim={t.work.sim} />
      <Navbar items={navItems} locale={locale} onLocaleChange={choose} t={t.nav} meta={t.meta} />
      <main id="main" className="relative z-10">
        <Hero t={t.hero} locale={locale} />
        <Work t={t.work} />
        <Build t={t.build} />
        <TrackRecord t={t.record} />
        <OpenSource t={t.openSource} />
        <Contact t={t.contact} locale={locale} />
      </main>
      <Footer t={t.footer} />
    </>
  );
}
