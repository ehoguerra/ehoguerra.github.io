"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { GlowCard } from "./ui/GlowCard";
import {
  Workflow,
  ScanEye,
  MessageSquareMore,
  Zap,
  GitBranch,
  ImagePlus,
} from "lucide-react";

const icons = [Workflow, ScanEye, MessageSquareMore, Zap, GitBranch, ImagePlus];
const glowColors = [
  "rgba(99, 102, 241, 0.1)",
  "rgba(139, 92, 246, 0.1)",
  "rgba(59, 130, 246, 0.1)",
  "rgba(236, 72, 153, 0.1)",
  "rgba(34, 197, 94, 0.1)",
  "rgba(245, 158, 11, 0.1)",
];

interface Capability {
  title: string;
  description: string;
}

interface AISectionProps {
  label: string;
  title: string;
  subtitle: string;
  capabilities: readonly Capability[];
}

export function AISection({
  label,
  title,
  subtitle,
  capabilities,
}: AISectionProps) {
  return (
    <section id="ai" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader label={label} title={title} subtitle={subtitle} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => {
            const Icon = icons[i % icons.length];
            return (
              <AnimatedSection key={cap.title} delay={i * 0.08}>
                <GlowCard
                  className="h-full"
                  glowColor={glowColors[i % glowColors.length]}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {cap.description}
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
