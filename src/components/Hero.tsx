"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import type { Locale, Translations } from "@/lib/i18n";
import { CV, SOCIALS, TECH_MARQUEE } from "@/lib/site";
import { HeroStage } from "./three/HeroStage";
import { Magnetic } from "./ui/Magnetic";
import { Marquee } from "./ui/Marquee";
import { RoleRotator } from "./ui/TextFX";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

interface HeroProps {
  t: Translations["hero"];
  locale: Locale;
}

const rise = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const wipe = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero({ t, locale }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-32 sm:pb-24"
    >
      {/* 3D / aurora stage */}
      <motion.div
        style={reduced ? undefined : { scale: stageScale }}
        className="absolute inset-0"
      >
        <HeroStage />
      </motion.div>

      {/* Grid texture */}
      <div
        aria-hidden
        className="bg-dot-grid mask-radial pointer-events-none absolute inset-0 opacity-[0.045]"
      />
      {/* Scrim so the headline always beats the 3D behind it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 54% 52% at 50% 44%, rgba(5,6,10,0.88) 0%, rgba(5,6,10,0.6) 46%, transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent"
      />

      {/* Social rail */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex"
      >
        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-soft transition-colors duration-300 hover:text-foreground"
          aria-label="GitHub"
        >
          <GithubIcon className="h-[18px] w-[18px]" />
        </a>
        <a
          href={SOCIALS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-soft transition-colors duration-300 hover:text-foreground"
          aria-label="LinkedIn"
        >
          <LinkedinIcon className="h-[18px] w-[18px]" />
        </a>
        <a
          href={`mailto:${SOCIALS.email}`}
          className="text-muted-soft transition-colors duration-300 hover:text-foreground"
          aria-label="Email"
        >
          <Mail className="h-[18px] w-[18px]" />
        </a>
        <span className="h-20 w-px bg-gradient-to-b from-border-strong to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        variants={{ visible: { transition: { staggerChildren: 0.11 } } }}
        initial={reduced ? false : "hidden"}
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        {/* Availability */}
        <motion.div variants={rise}>
          <span className="glass hairline inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            <span className="pulse-dot relative flex h-1.5 w-1.5 rounded-full bg-emerald-400 text-emerald-400" />
            {t.availability}
          </span>
        </motion.div>

        {/* Name */}
        <motion.p
          variants={rise}
          className="mt-8 font-mono text-xs uppercase tracking-[0.42em] text-muted-soft"
        >
          {t.greeting}
        </motion.p>

        {/* Headline */}
        <h1 className="mt-5 text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[5.25rem]">
          <motion.span variants={rise} className="block">
            {t.headlineLead}
          </motion.span>
          {/* Line wipe: the gradient stays on an untransformed element so
              background-clip:text keeps working. */}
          <span className="block overflow-hidden py-[0.12em]">
            <motion.span variants={wipe} className="block">
              <span className="text-gradient block">{t.headlineAccent}</span>
            </motion.span>
          </span>
          <motion.span variants={rise} className="block">
            {t.headlineTail}
          </motion.span>
        </h1>

        {/* Rotating role */}
        <motion.div
          variants={rise}
          className="mt-7 flex h-7 items-center justify-center font-mono text-sm text-muted sm:text-base"
        >
          <span className="text-accent-hover">&gt;</span>
          <RoleRotator roles={t.roles} className="ml-2 h-7 text-foreground" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={rise}
          className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
        >
          {t.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={rise}
          className="mt-11 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic strength={10}>
            <a
              href="#work"
              className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-12px_rgba(109,94,248,0.9)] transition-shadow duration-300 hover:shadow-[0_14px_50px_-10px_rgba(139,124,255,0.95)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{t.cta}</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>

          <Magnetic strength={8}>
            <a
              href="#contact"
              className="glass hairline flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-muted transition-colors duration-300 hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              {t.contact}
            </a>
          </Magnetic>

          <a
            href={CV[locale]}
            download
            className="flex items-center gap-1.5 px-3 py-3.5 text-sm font-medium text-muted-soft underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline"
          >
            {t.resume}
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom rail: marquee + scroll cue */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <Marquee items={TECH_MARQUEE} speed={55} className="py-4 opacity-60" />
        <div className="flex items-center justify-center pb-5">
          <motion.a
            href="#about"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="group flex flex-col items-center gap-1.5"
            aria-label={t.scroll}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-soft transition-colors group-hover:text-muted">
              {t.scroll}
            </span>
            <motion.span
              animate={reduced ? undefined : { y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-muted-soft transition-colors group-hover:text-accent-hover"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
