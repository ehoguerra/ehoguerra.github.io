"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { GlowCard } from "./ui/GlowCard";
import {
  Code2,
  Layers,
  Brain,
  Bot,
  Plug,
  Rocket,
} from "lucide-react";

const icons = [Code2, Layers, Brain, Bot, Plug, Rocket];

interface SpecialtyItem {
  title: string;
  description: string;
}

interface SpecialtiesProps {
  label: string;
  title: string;
  items: readonly SpecialtyItem[];
}

export function Specialties({ label, title, items }: SpecialtiesProps) {
  return (
    <section id="specialties" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label={label} title={title} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <GlowCard className="h-full">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </GlowCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
