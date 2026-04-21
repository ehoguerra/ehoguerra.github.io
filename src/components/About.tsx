"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";

interface AboutProps {
  label: string;
  title: string;
  p1: string;
  p2: string;
  p3: string;
}

export function About({ label, title, p1, p2, p3 }: AboutProps) {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader label={label} title={title} />

        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <AnimatedSection delay={0.1}>
            <p>{p1}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p>{p2}</p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p>{p3}</p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.4}>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "6+", label: "Projects Shipped" },
              { value: "83k+", label: "Lines of Code" },
              { value: "5", label: "Domains" },
              { value: "3+", label: "AI Providers" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-surface p-4 text-center"
              >
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
