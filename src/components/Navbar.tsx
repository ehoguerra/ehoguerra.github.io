"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale, Translations } from "@/lib/i18n";
import { CV, SOCIALS } from "@/lib/site";
import { lockScroll, scrollToId } from "@/lib/scroll";
import { useReducedMotion } from "@/lib/hooks";

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
    <div role="group" aria-label={label} className="flex rounded-[6px] border border-rule-strong p-0.5">
      {(["en", "pt"] as const).map((l) => (
        <button
          key={l}
          type="button"
          lang={l === "pt" ? "pt-BR" : "en"}
          aria-pressed={locale === l}
          onClick={() => onChange(l)}
          className={`t-plate h-8 rounded-[4px] px-2.5 transition-colors duration-200 ${
            locale === l ? "bg-ink text-floor" : "text-ink-2 hover:text-ink"
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
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b bg-floor/95 transition-[border-color] duration-300 ${
          scrolled ? "border-rule" : "border-transparent"
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <a href="#top" aria-label={meta.home} className="flex items-center gap-2.5 py-2">
            <span
              aria-hidden
              className="h-3.5 w-3.5 rounded-[2px] bg-signal shadow-[inset_0_0_0_1px_var(--signal-deep)]"
            />
            <span className="t-plate text-[0.8125rem] text-ink">Artur Guerra</span>
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
                      className={`relative isolate block px-3 py-2 text-[0.9375rem] font-[560] transition-colors duration-200 ${
                        on ? "text-ink" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="nav-tag"
                          aria-hidden
                          className="absolute inset-0 -z-10 rounded-[4px] bg-signal"
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
            <a
              href={CV[locale]}
              download
              className="btn btn-signal hidden h-9 min-h-0 px-3.5 text-[0.75rem] sm:inline-flex"
            >
              {t.cv}
              <Download aria-hidden className="h-3.5 w-3.5" />
            </a>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="menu-sheet"
              aria-label={meta.openMenu}
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-[6px] border border-rule-strong lg:hidden"
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
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-floor lg:hidden"
          >
            <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <span className="t-plate text-[0.8125rem]">Artur Guerra</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={meta.closeMenu}
                className="grid h-9 w-9 place-items-center rounded-[6px] border border-rule-strong"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            </div>
            <nav className="shell mt-4 flex-1">
              <ul className="border-t-2 border-ink">
                {items.map((item) => (
                  <li key={item.id} className="border-b border-rule">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => goFromSheet(e, item.id)}
                      className="block py-4 text-[2rem] font-[780] leading-tight tracking-[-0.02em] wdth-112"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="shell flex shrink-0 flex-col gap-3 py-8">
              <a href={`mailto:${SOCIALS.email}`} className="btn btn-signal w-full normal-case tracking-normal">
                {SOCIALS.email}
              </a>
              <a href={CV[locale]} download className="btn btn-outline w-full">
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
