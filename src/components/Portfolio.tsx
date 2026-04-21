"use client";

import { useState } from "react";
import { translations, type Locale } from "@/lib/i18n";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Specialties } from "./Specialties";
import { Projects } from "./Projects";
import { AISection } from "./AISection";
import { Impact } from "./Impact";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { CursorGlow } from "./ui/CursorGlow";

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.specialties, href: "#specialties" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.ai, href: "#ai" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <>
      <CursorGlow />
      <Navbar items={navItems} locale={locale} onLocaleChange={setLocale} />
      <main>
        <Hero {...t.hero} />
        <About {...t.about} />
        <Specialties {...t.specialties} />
        <Projects {...t.projects} />
        <AISection {...t.aiSection} />
        <Impact {...t.impact} />
        <Contact {...t.contact} />
      </main>
      <Footer {...t.footer} />
    </>
  );
}
