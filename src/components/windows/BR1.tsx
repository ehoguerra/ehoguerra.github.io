"use client";

import { FileText } from "lucide-react";
import { Appear, useBeats, WindowShell, type WindowProps } from "./kit";

export interface BR1Sim {
  sub: string;
  athleteMeta: string;
  bio: string;
  lean: string;
  leanValue: string;
  fat: string;
  fatValue: string;
  hydration: string;
  hydrationValue: string;
  who: string;
  coach: string;
  doctor: string;
  psychologist: string;
  trainer: string;
  granted: string;
  report: string;
  generating: string;
  ready: string;
  sections: string[];
}

// empty · athlete · bars fill · roles light · report generates · report ready
const BEATS = [600, 900, 1600, 1800, 1600, 3200] as const;

export function BR1Window({ t, run, sim, frameRef }: WindowProps & { t: BR1Sim }) {
  const beat = useBeats(BEATS, run);
  const bars = [
    { label: t.lean, value: t.leanValue, fill: 0.74 },
    { label: t.fat, value: t.fatValue, fill: 0.28 },
    { label: t.hydration, value: t.hydrationValue, fill: 0.62 },
  ];
  const roles = [t.coach, t.doctor, t.psychologist, t.trainer];

  return (
    <WindowShell id="br1" w={1100} h={720} name="BR1 Sports Academy" sub={t.sub} sim={sim} frameRef={frameRef}>
      <div className="grid h-full grid-cols-2 gap-7 px-9 pb-9">
        {/* Athlete + bioimpedance */}
        <div className="flex min-h-0 flex-col gap-5">
          <Appear on={beat >= 1}>
            <div className="win-panel flex items-center gap-5 p-5">
              <span className="grid h-[76px] w-[76px] flex-none place-items-center rounded-full bg-[color:var(--acc)] text-[28px] font-[700] text-[#0b0c16]">
                LM
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-[30px] font-[680] leading-[1.1] tracking-[-0.01em]">Lucas M.</span>
                <span className="text-[19px] font-[500] text-[color:var(--ink-3)]">{t.athleteMeta}</span>
              </span>
            </div>
          </Appear>

          <Appear on={beat >= 1} delay={150} className="min-h-0 flex-1">
            <div className="win-panel flex h-full flex-col p-6">
              <span className="text-[18px] font-[600] text-[color:var(--ink-3)]">{t.bio}</span>
              <div className="flex flex-1 flex-col justify-evenly">
                {bars.map((b, i) => (
                  <div key={b.label} className="flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[20px] text-[color:var(--ink-2)]">{b.label}</span>
                      <span
                        className="t-num text-[36px] transition-opacity duration-700"
                        style={{ opacity: beat >= 2 ? 1 : 0, transitionDelay: beat >= 2 ? `${i * 200}ms` : "0ms" }}
                      >
                        {b.value}
                      </span>
                    </div>
                    <div className="h-[14px] overflow-hidden rounded-full bg-white/[0.08]">
                      <span
                        className="block h-full origin-left rounded-full bg-[color:var(--acc)] transition-transform duration-[1100ms] ease-[var(--ease-out)]"
                        style={{
                          transform: beat >= 2 ? `scaleX(${b.fill})` : "scaleX(0)",
                          transitionDelay: beat >= 2 ? `${i * 200}ms` : "0ms",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Appear>
        </div>

        {/* Access + report */}
        <div className="flex min-h-0 flex-col gap-5">
          <Appear on={beat >= 2}>
            <div className="win-panel flex flex-col gap-2.5 p-5">
              <span className="px-1 pb-1 text-[18px] font-[600] text-[color:var(--ink-3)]">{t.who}</span>
              {roles.map((role, i) => {
                const lit = beat >= 3;
                const delay = lit ? `${i * 260}ms` : "0ms";
                return (
                  <div
                    key={role}
                    className="flex h-[54px] items-center gap-4 rounded-[18px] bg-white/[0.04] px-5"
                  >
                    <span
                      className="h-[14px] w-[14px] flex-none rounded-full transition-[background-color,box-shadow] duration-500"
                      style={{
                        transitionDelay: delay,
                        background: lit ? "var(--acc)" : "rgba(255,255,255,0.16)",
                        boxShadow: lit ? "0 0 14px 2px color-mix(in oklab, var(--acc) 70%, transparent)" : "none",
                      }}
                    />
                    <span className="text-[22px] font-[600] tracking-[-0.01em]">{role}</span>
                    <span
                      className="ml-auto inline-flex h-[34px] items-center rounded-full bg-[color-mix(in_oklab,var(--acc)_18%,transparent)] px-4 text-[17px] font-[600] text-[color:var(--acc)] transition-opacity duration-500"
                      style={{ opacity: lit ? 1 : 0, transitionDelay: delay }}
                    >
                      {t.granted}
                    </span>
                  </div>
                );
              })}
            </div>
          </Appear>

          <Appear on={beat >= 4} className="min-h-0 flex-1">
            <div className="win-panel flex h-full flex-col justify-between p-6">
              <div className="flex items-center gap-5">
                <span className="grid h-[64px] w-[64px] flex-none place-items-center rounded-[20px] bg-[color-mix(in_oklab,var(--acc)_22%,transparent)] text-[color:var(--acc)]">
                  <FileText aria-hidden strokeWidth={2} className="h-[32px] w-[32px]" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[24px] font-[650] leading-[1.15] tracking-[-0.01em]">{t.report}</span>
                  <span className="relative h-[26px] text-[19px]">
                    <span
                      className="absolute inset-y-0 left-0 whitespace-nowrap text-[color:var(--ink-3)] transition-opacity duration-500"
                      style={{ opacity: beat >= 5 ? 0 : 1 }}
                    >
                      {t.generating}
                    </span>
                    <span
                      className="absolute inset-y-0 left-0 whitespace-nowrap font-[600] text-[color:var(--acc)] transition-opacity duration-500"
                      style={{ opacity: beat >= 5 ? 1 : 0 }}
                    >
                      {t.ready}
                    </span>
                  </span>
                </span>
              </div>

              <div className="h-[12px] overflow-hidden rounded-full bg-white/[0.08]">
                <span
                  className="block h-full origin-left rounded-full bg-[color:var(--acc)] transition-transform duration-[1400ms] ease-linear"
                  style={{ transform: beat >= 4 ? "scaleX(1)" : "scaleX(0)" }}
                />
              </div>

              <div className="flex gap-3">
                {t.sections.map((s, i) => (
                  <span
                    key={s}
                    className="inline-flex h-[38px] items-center rounded-full bg-white/[0.07] px-4 text-[17px] font-[560] text-[color:var(--ink-2)] transition-opacity duration-500"
                    style={{ opacity: beat >= 4 ? 1 : 0, transitionDelay: beat >= 4 ? `${300 + i * 350}ms` : "0ms" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Appear>
        </div>
      </div>
    </WindowShell>
  );
}
