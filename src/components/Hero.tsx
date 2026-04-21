"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { MouseParallax } from "./ui/MouseParallax";
import { FloatingParticles } from "./ui/FloatingParticles";

interface HeroProps {
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  cta: string;
  contact: string;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero({
  greeting,
  name,
  title,
  subtitle,
  cta,
  contact,
}: HeroProps) {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      {/* Gradient orbs with parallax */}
      <div className="pointer-events-none absolute inset-0">
        <MouseParallax intensity={30}>
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.07] blur-[120px]" />
        </MouseParallax>
        <MouseParallax intensity={-20}>
          <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/[0.05] blur-[100px]" />
        </MouseParallax>
        <MouseParallax intensity={15}>
          <div className="absolute left-1/4 top-2/3 h-[300px] w-[300px] rounded-full bg-blue-500/[0.04] blur-[80px]" />
        </MouseParallax>
      </div>

      {/* Floating particles */}
      <FloatingParticles count={30} />

      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.p
          variants={fadeUp}
          className="mb-4 text-sm font-medium tracking-widest text-muted uppercase"
        >
          {greeting}
        </motion.p>

        <MouseParallax intensity={-5} className="inline-block">
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {name}
          </motion.h1>
        </MouseParallax>

        <motion.p
          variants={fadeUp}
          className="mt-4 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl"
        >
          {title}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-200 hover:bg-accent-hover hover:shadow-accent/30"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-full" />
            {cta}
            <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-muted transition-all duration-200 hover:border-accent/30 hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            {contact}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border border-border/50 p-1"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
