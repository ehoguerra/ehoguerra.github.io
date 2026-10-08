"use client";

import { Check, KeyRound, RefreshCw, Sparkles } from "lucide-react";
import { Appear, useBeats, WindowShell, type WindowProps } from "./kit";

export interface CeshSim {
  sub: string;
  days: string[];
  calc: string;
  databases: string;
  networks: string;
  physics: string;
  syncing: string;
  synced: string;
  deviceStep: string;
  authorized: string;
  question: string;
  answer: string;
}

// empty · timetable · syncing · synced · device code · authorized + question · answer
const BEATS = [600, 1100, 1500, 1100, 1700, 1400, 3800] as const;

const CODE = "WDJB-MJHT";

export function CeshWindow({ t, run, sim, frameRef }: WindowProps & { t: CeshSim }) {
  const beat = useBeats(BEATS, run);
  const synced = beat >= 3;
  // col and row are 1-based grid lines; span is in rows
  const blocks = [
    { name: t.calc, col: 1, row: 1, span: 2 },
    { name: t.databases, col: 2, row: 2, span: 2 },
    { name: t.networks, col: 3, row: 1, span: 2 },
    { name: t.physics, col: 4, row: 3, span: 2 },
    { name: t.databases, col: 5, row: 1, span: 1 },
  ];

  return (
    <WindowShell id="cesh" w={1100} h={720} name="Cesh" sub={t.sub} sim={sim} frameRef={frameRef}>
      <div className="grid h-full grid-cols-[1fr_400px] gap-7 px-9 pb-9">
        {/* Timetable */}
        <div className="flex min-h-0 flex-col gap-4">
          <Appear on={beat >= 1} className="min-h-0 flex-1">
            <div className="win-panel flex h-full flex-col gap-3 p-5">
              <div className="grid grid-cols-5 gap-2">
                {t.days.map((d) => (
                  <span key={d} className="text-center text-[17px] font-[600] text-[color:var(--ink-3)]">
                    {d}
                  </span>
                ))}
              </div>
              <div className="grid min-h-0 flex-1 grid-cols-5 grid-rows-4 gap-2">
                {Array.from({ length: 20 }, (_, i) => (
                  <span key={i} className="rounded-[14px] bg-white/[0.035]" />
                ))}
                {blocks.map((b, i) => (
                  <div
                    key={`${b.col}-${b.row}`}
                    className="flex items-start rounded-[14px] px-3 py-2.5 text-[18px] font-[620] leading-[1.15] transition-[background-color,color] duration-700"
                    style={{
                      gridColumn: b.col,
                      gridRow: `${b.row} / span ${b.span}`,
                      transitionDelay: synced ? `${i * 110}ms` : "0ms",
                      color: synced ? "var(--ink)" : "var(--ink-3)",
                      background: synced
                        ? `color-mix(in oklab, var(--acc) ${i % 2 ? 24 : 34}%, rgba(255,255,255,0.05))`
                        : "rgba(255,255,255,0.07)",
                    }}
                  >
                    {b.name}
                  </div>
                ))}
              </div>
            </div>
          </Appear>

          <Appear on={beat >= 2}>
            <div className="flex min-h-[64px] items-center gap-4 rounded-[24px] bg-white/[0.07] px-5 py-3 shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
              <span
                className={`grid h-[38px] w-[38px] flex-none place-items-center rounded-full ${
                  synced
                    ? "bg-[rgba(95,227,160,0.14)] text-[color:var(--live)]"
                    : "bg-[color-mix(in_oklab,var(--acc)_18%,transparent)] text-[color:var(--acc)]"
                }`}
              >
                {synced ? (
                  <Check aria-hidden strokeWidth={2.8} className="h-[22px] w-[22px]" />
                ) : (
                  <RefreshCw aria-hidden strokeWidth={2.4} className="h-[22px] w-[22px] animate-spin" />
                )}
              </span>
              <span className="text-[18px] leading-[1.25] text-[color:var(--ink-2)]">
                {synced ? t.synced : t.syncing}
              </span>
            </div>
          </Appear>
        </div>

        {/* Copilot */}
        <Appear on={beat >= 1} className="min-h-0">
          <div className="win-panel flex h-full flex-col gap-4 p-5">
            <div className="flex items-center gap-4">
              <span className="grid h-[48px] w-[48px] flex-none place-items-center rounded-[16px] bg-[color-mix(in_oklab,var(--acc)_22%,transparent)] text-[color:var(--acc)]">
                <Sparkles aria-hidden strokeWidth={2.2} className="h-[26px] w-[26px]" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-[22px] font-[650] leading-[1.15] tracking-[-0.01em]">GitHub Copilot Chat</span>
                <span className="win-mono text-[16px] text-[color:var(--ink-3)]">OAuth Device Flow</span>
              </span>
            </div>

            <Appear on={beat >= 4}>
              <div className="flex flex-col gap-3 rounded-[20px] bg-black/20 px-5 py-4">
                <span
                  className="win-mono text-center text-[40px] font-[650] tracking-[0.1em] transition-colors duration-500"
                  style={{ color: beat >= 5 ? "var(--ink-3)" : "var(--ink)" }}
                >
                  {CODE}
                </span>
                <span className="relative h-[28px] text-[19px]">
                  <span
                    className="absolute inset-0 flex items-center justify-center gap-2.5 text-[color:var(--ink-2)] transition-opacity duration-500"
                    style={{ opacity: beat >= 5 ? 0 : 1 }}
                  >
                    <KeyRound aria-hidden strokeWidth={2.2} className="h-[20px] w-[20px]" />
                    {t.deviceStep}
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center gap-2.5 font-[600] text-[color:var(--live)] transition-opacity duration-500"
                    style={{ opacity: beat >= 5 ? 1 : 0 }}
                  >
                    <Check aria-hidden strokeWidth={2.8} className="h-[20px] w-[20px]" />
                    {t.authorized}
                  </span>
                </span>
              </div>
            </Appear>

            <Appear on={beat >= 5} className="self-end">
              <p className="max-w-[300px] rounded-[24px] rounded-br-[8px] bg-[color-mix(in_oklab,var(--acc)_26%,rgba(255,255,255,0.06))] px-5 py-3.5 text-[21px] leading-[1.3]">
                {t.question}
              </p>
            </Appear>

            <Appear on={beat >= 6}>
              <div className="rounded-[20px] rounded-tl-[8px] bg-white/[0.06] px-5 py-4">
                <p
                  className="text-[20px] leading-[1.38] transition-[clip-path] duration-[1600ms] ease-linear"
                  style={{ clipPath: beat >= 6 ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
                >
                  {t.answer}
                </p>
              </div>
            </Appear>
          </div>
        </Appear>
      </div>
    </WindowShell>
  );
}
