"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Languages, Menu, X } from "lucide-react";
import type { Locale, Translations } from "@/lib/i18n";
import { CV } from "@/lib/site";
import { ScrambleText } from "./ui/TextFX";

interface NavItem {
  id: string;
  label: string;
}

interface NavbarProps {
  items: NavItem[];
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  t: Translations["nav"];
}

export function Navbar({ items, locale, onLocaleChange, t }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();

  /* Scroll state + scroll spy */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 160) current = item.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  /* Lock the page while the mobile sheet is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleLocale = useCallback(
    () => onLocaleChange(locale === "en" ? "pt" : "en"),
    [locale, onLocaleChange],
  );

  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[80] px-4 pt-3 sm:px-6 sm:pt-5"
      >
        <nav
          className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl px-3 transition-all duration-500 sm:px-4 ${
            scrolled
              ? "glass hairline shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]"
              : "border border-transparent bg-transparent"
          }`}
        >
          {/* Wordmark */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 rounded-lg px-2 py-1"
            aria-label="Artur Guerra — home"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-[11px] font-bold text-white shadow-lg shadow-accent/25">
              AG
              <span className="absolute inset-0 rounded-lg bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              Artur Guerra
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative rounded-xl px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-xl border border-border-strong bg-surface-strong"
                      transition={{ type: "spring", stiffness: 340, damping: 30 }}
                    />
                  )}
                  <ScrambleText text={item.label} active={hovered === item.id} />
                </a>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <a
              href={CV[locale]}
              download
              className="group hidden items-center gap-1.5 rounded-xl border border-border px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted transition-all duration-300 hover:border-accent/40 hover:text-foreground lg:flex"
            >
              {t.resume}
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 rounded-xl border border-border px-2.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-all duration-300 hover:border-accent/40 hover:text-foreground"
              aria-label={
                locale === "en" ? "Mudar para português" : "Switch to English"
              }
            >
              <Languages className="h-3.5 w-3.5" />
              <span className="tabular-nums">{locale}</span>
            </button>

            <button
              onClick={() => setOpen(true)}
              className="rounded-xl border border-border p-2 text-muted transition-colors hover:border-accent/40 hover:text-foreground md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-[#05060a]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-[11px] font-bold text-white">
                  AG
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-border p-2 text-muted transition-colors hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1">
                {items.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.06 + i * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-baseline gap-4 border-b border-border/60 py-5"
                  >
                    <span className="font-mono text-[11px] text-muted-soft">
                      0{i + 1}
                    </span>
                    <span className="text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent-hover">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <a
                  href={CV[locale]}
                  download
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-muted"
                >
                  {t.resume}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={() => {
                    toggleLocale();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 font-mono text-xs font-semibold uppercase text-muted"
                >
                  <Languages className="h-4 w-4" />
                  {locale === "en" ? "PT" : "EN"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
