"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { translations, type Locale } from "@/lib/i18n";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Experience } from "./Experience";
import { Specialties } from "./Specialties";
import { Projects } from "./Projects";
import { OpenSource } from "./OpenSource";
import { AISection } from "./AISection";
import { Impact } from "./Impact";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Cursor } from "./ui/Cursor";
import { ScrollProgress } from "./ui/ScrollProgress";
import { Preloader } from "./ui/Preloader";

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
  const setLocale = setChosen;
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const navItems = useMemo(
    () => [
      { id: "about", label: t.nav.about },
      { id: "work", label: t.nav.work },
      { id: "ai", label: t.nav.ai },
      { id: "open-source", label: t.nav.open },
      { id: "contact", label: t.nav.contact },
    ],
    [t],
  );

  return (
    <div className="grain">
      <Preloader />
      <ScrollProgress />
      <Cursor />

      <Navbar
        items={navItems}
        locale={locale}
        onLocaleChange={setLocale}
        t={t.nav}
      />

      <main>
        <Hero t={t.hero} locale={locale} />
        <About t={t.about} />
        <Experience t={t.experience} />
        <Specialties t={t.specialties} workLabel={t.nav.work} />
        <Projects t={t.projects} />
        <AISection t={t.aiSection} />
        <OpenSource t={t.openSource} />
        <Impact t={t.impact} />
        <Contact t={t.contact} locale={locale} />
      </main>

      <Footer t={t.footer} />
    </div>
  );
}
