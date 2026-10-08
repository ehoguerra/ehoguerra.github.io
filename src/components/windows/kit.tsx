"use client";

import {
  Dumbbell,
  GraduationCap,
  Pill,
  Sparkles,
  Stethoscope,
  Sun,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type CSSProperties, type ReactNode, type Ref } from "react";
import type { ProjectId } from "@/lib/site";

/** Each product's mark, shared by its window in the room and its chapter. */
export const LOOK: Record<ProjectId, { icon: LucideIcon; accent: string }> = {
  vivi: { icon: Sparkles, accent: "var(--vivi)" },
  evosolar: { icon: Sun, accent: "var(--evosolar)" },
  zelo: { icon: Pill, accent: "var(--zelo)" },
  fantasy: { icon: Trophy, accent: "var(--fantasy)" },
  br1: { icon: Dumbbell, accent: "var(--br1)" },
  cesh: { icon: GraduationCap, accent: "var(--cesh)" },
  pecci: { icon: Stethoscope, accent: "var(--pecci)" },
};

/** The app-icon tile: the product's accent as a lit glass square. */
export function AppIcon({ id, size }: { id: ProjectId; size: number }) {
  const { icon: Icon, accent } = LOOK[id];
  return (
    <span
      aria-hidden
      className="grid flex-none place-items-center text-[#0b0c16]"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.31,
        background: `linear-gradient(160deg, color-mix(in oklab, ${accent} 70%, white), ${accent})`,
        boxShadow: "inset 0 1.5px 0 rgba(255,255,255,.55), 0 8px 18px -10px rgba(0,0,0,.6)",
      }}
    >
      <Icon strokeWidth={2.2} style={{ width: size * 0.52, height: size * 0.52 }} />
    </span>
  );
}

/**
 * Steps through a looping timeline of beats (durations in ms) and returns the
 * current beat. When `run` is false (reduced motion, paused stage) it holds
 * the last beat: the finished state of the simulation.
 */
export function useBeats(durations: readonly number[], run: boolean) {
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (!run) return;
    const id = setTimeout(() => setBeat((b) => (b + 1) % durations.length), durations[beat]);
    return () => clearTimeout(id);
  }, [beat, run, durations]);
  return run ? beat : durations.length - 1;
}

export interface WindowProps {
  run: boolean;
  /** "Simulation · synthetic data", localized. */
  sim: string;
  frameRef?: Ref<HTMLDivElement>;
}

/** A visionOS-style app window: glass pane, title row, grabber pill below. */
export function WindowShell({
  id,
  w,
  h,
  name,
  sub,
  status,
  sim,
  frameRef,
  compact = false,
  children,
}: {
  id: ProjectId;
  w: number;
  h: number;
  name: string;
  sub: string;
  /** Right side of the title row, before the simulation tag. */
  status?: ReactNode;
  sim: string;
  frameRef?: Ref<HTMLDivElement>;
  /** Phone-sized windows: no status in the title row, tag at the bottom. */
  compact?: boolean;
  children: ReactNode;
}) {
  const tag = (
    <span className="inline-flex h-[38px] items-center rounded-full bg-black/25 px-4 text-[17px] font-[560] text-[color:var(--ink-2)]">
      {sim}
    </span>
  );
  return (
    <div ref={frameRef} className="win-frame" data-win={id} data-dim="false">
      <div className="win" style={{ width: w, height: h, "--acc": LOOK[id].accent } as CSSProperties}>
        <div className="flex h-[104px] items-center gap-5 px-9">
          <AppIcon id={id} size={58} />
          <span className="flex min-w-0 flex-col">
            <span className="text-[30px] font-[700] leading-[1.05] tracking-[-0.02em]">{name}</span>
            <span className="truncate text-[19px] font-[500] text-[color:var(--ink-3)]">{sub}</span>
          </span>
          {!compact && (
            <span className="ml-auto flex items-center gap-3">
              {status}
              {tag}
            </span>
          )}
        </div>
        <div className={`absolute inset-x-0 top-[104px] ${compact ? "bottom-[72px]" : "bottom-0"}`}>{children}</div>
        {compact && <div className="absolute inset-x-0 bottom-[22px] flex justify-center">{tag}</div>}
      </div>
      <span aria-hidden className="win-grabber" />
    </div>
  );
}

/** "In production" lamp used in title rows. */
export function LivePill({ label }: { label: string }) {
  return (
    <span className="inline-flex h-[38px] items-center gap-2.5 rounded-full bg-[rgba(95,227,160,0.12)] px-4 text-[17px] font-[600] text-[color:var(--live)]">
      <span className="lamp" />
      {label}
    </span>
  );
}

/** Fade + lift in when `on`; already visible state is the default. */
export function Appear({
  on,
  delay = 0,
  className = "",
  style,
  children,
}: {
  on: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={`transition-[opacity,transform,filter] duration-700 ease-[var(--ease-out)] ${className}`}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateY(14px) scale(0.985)",
        filter: on ? "none" : "blur(6px)",
        transitionDelay: on ? `${delay}ms` : "0ms",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
