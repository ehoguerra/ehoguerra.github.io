"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale, Translations } from "@/lib/i18n";
import { CV, SOCIALS } from "@/lib/site";
import { lockScroll, scrollToId } from "@/lib/scroll";
import { useReducedMotion } from "@/lib/hooks";
import { Mark } from "./ui/Mark";

interface NavItem {
  id: string;
  label: string;
}

interface NavbarProps {
  items: NavItem[];
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  t: Translations["nav"];
  meta: Translations["meta"];
}

const EASE = [0.16, 1, 0.3, 1] as const;

function LanguageSwitch({
  locale,
  onChange,
  label,
}: {
  locale: Locale;
  onChange: (l: Locale) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full bg-white/[0.07] p-1">
      {(["en", "pt"] as const).map((l) => (
        <button
          key={l}
          type="button"
          lang={l === "pt" ? "pt-BR" : "en"}
          aria-pressed={locale === l}
          onClick={() => onChange(l)}
          className={`h-8 rounded-full px-3 text-[0.8125rem] font-[680] tracking-[0.02em] transition-colors duration-200 ${
            locale === l ? "bg-ink text-night" : "text-ink-2 hover:text-ink"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Navbar({ items, locale, onLocaleChange, t, meta }: NavbarProps) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // The section crossing the middle of the viewport owns the tag.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (e.isIntersecting) setActive(id);
          else setActive((cur) => (cur === id ? null : cur));
        }
      },
      { rootMargin: "-49% 0px -49% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    lockScroll(true);
    sheet.current?.querySelector<HTMLElement>("a[href], button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !sheet.current) return;
      const f = Array.from(sheet.current.querySelectorAll<HTMLElement>("a[href], button"));
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      button?.focus();
    };
  }, [open]);

  const goFromSheet = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    // Wait for the sheet's cleanup to release the scroll lock.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`glass mx-auto flex h-[3.75rem] max-w-[1180px] items-center justify-between gap-4 rounded-full py-0 pl-2.5 pr-2 transition-[background-color] duration-500 ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <a href="#top" aria-label={meta.home} className="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3">
            <Mark className="h-8 w-8 text-ink" />
            <span className="text-[0.9688rem] font-[680] tracking-[-0.01em] text-ink">Artur Guerra</span>
          </a>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                const on = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={on ? "location" : undefined}
                      className={`relative isolate block rounded-full px-4 py-2 text-[0.9375rem] font-[560] transition-colors duration-200 ${
                        on ? "text-ink" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="nav-pill"
                          aria-hidden
                          className="absolute inset-0 -z-10 rounded-full bg-white/[0.13] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
                          transition={
                            reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }
                          }
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch locale={locale} onChange={onLocaleChange} label={meta.language} />
            <a href={CV[locale]} download className="pill pill-primary pill-sm hidden min-h-10 sm:inline-flex">
              {t.cv}
              <Download aria-hidden className="h-4 w-4" />
            </a>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="menu-sheet"
              aria-label={meta.openMenu}
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.08] text-ink lg:hidden"
            >
              <Menu aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-sheet"
            ref={sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-night/80 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between pt-3">
              <span className="flex items-center gap-2.5 text-[0.9688rem] font-[680]">
                <Mark className="h-8 w-8" />
                Artur Guerra
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={meta.closeMenu}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.08]"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            </div>
            <nav className="shell mt-4 flex-1">
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="border-b rule">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => goFromSheet(e, item.id)}
                      className="block py-4 text-[2rem] font-[740] leading-tight tracking-[-0.025em]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="shell flex shrink-0 flex-col gap-3 py-8">
              <a href={`mailto:${SOCIALS.email}`} className="pill pill-primary w-full">
                {SOCIALS.email}
              </a>
              <a href={CV[locale]} download className="pill pill-glass w-full">
                {t.cv}
                <Download aria-hidden className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
