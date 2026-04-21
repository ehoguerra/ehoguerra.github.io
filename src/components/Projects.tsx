"use client";

import { motion } from "framer-motion";
import { useRef, useCallback } from "react";
import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { Badge } from "./ui/Badge";
import { Sparkles, ExternalLink } from "lucide-react";

interface ProjectItem {
  readonly title: string;
  readonly domain: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly highlights: readonly string[];
  readonly role: string;
  readonly ai: boolean;
}

interface ProjectsProps {
  label: string;
  title: string;
  items: readonly ProjectItem[];
}

function ProjectCardWrapper({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.06), transparent 40%)`;
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4, scale: 1.005 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent/20"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="pointer-events-none absolute -bottom-px left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}

export function Projects({ label, title, items }: ProjectsProps) {
  return (
    <section id="projects" className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.03] blur-[120px]" />
        <div className="absolute right-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader label={label} title={title} />

        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.1}>
              <ProjectCardWrapper>
                {/* Header */}
                <div className="border-b border-border p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-foreground">
                          {project.title}
                        </h3>
                        {project.ai && (
                          <span className="inline-flex items-center gap-1 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                            <Sparkles className="h-3 w-3" />
                            AI
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted">{project.domain}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted/50 transition-colors group-hover:text-accent" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted/70">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 flex-1">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted/70">
                      Highlights
                    </p>
                    <ul className="space-y-1.5">
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto border-t border-border pt-4">
                    <p className="text-xs text-muted/70">{project.role}</p>
                  </div>
                </div>
              </ProjectCardWrapper>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
