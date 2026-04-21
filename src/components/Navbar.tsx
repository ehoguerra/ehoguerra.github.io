"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items: NavItem[];
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function Navbar({ items, locale, onLocaleChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = items.map((item) => item.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-[#0A0A0F]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#"
            className="text-lg font-bold tracking-tight transition-colors hover:text-accent"
          >
            AG<span className="text-accent">.</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href.replace("#", "")
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="mt-0.5 h-px bg-accent"
                    transition={{ duration: 0.25 }}
                  />
                )}
              </a>
            ))}
            <button
              onClick={() => onLocaleChange(locale === "en" ? "pt" : "en")}
              className="ml-4 flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/30 hover:text-foreground"
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5" />
              {locale.toUpperCase()}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg p-2 text-muted transition-colors hover:text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0F]/95 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  AG<span className="text-accent">.</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-muted transition-colors hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col items-center justify-center gap-8">
                {items.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="text-2xl font-medium text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: items.length * 0.05, duration: 0.3 }}
                  onClick={() => {
                    onLocaleChange(locale === "en" ? "pt" : "en");
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-lg text-muted transition-colors hover:text-foreground"
                >
                  <Globe className="h-5 w-5" />
                  {locale === "en" ? "Português" : "English"}
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
