"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import {
  HeartPulse,
  Sun,
  Trophy,
  GraduationCap,
  Building2,
} from "lucide-react";

const icons = [HeartPulse, Sun, Trophy, GraduationCap, Building2];

interface ImpactItem {
  title: string;
  description: string;
}

interface ImpactProps {
  label: string;
  title: string;
  items: readonly ImpactItem[];
}


export function Impact({ label, title, items }: ImpactProps) {
  return (
    <section id="impact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label={label} title={title} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/20">
                  <Icon className="mb-4 h-8 w-8 text-accent/70 transition-colors group-hover:text-accent" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
