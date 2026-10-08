"use client";

import { Check } from "lucide-react";
import { Appear, LivePill, useBeats, WindowShell, type WindowProps } from "./kit";

export interface PecciSim {
  sub: string;
  live: string;
  physio: string;
  psych: string;
  nutrition: string;
  speech: string;
  now: string;
  selectHint: string;
  evolution: string;
  role: string;
  note: string;
  saved: string;
  progress: string;
}

// agenda · now line steps ×2 · appointment selected · note types · saved
const BEATS = [600, 1000, 1000, 1000, 1000, 2400, 3400] as const;

const ROW = 58;
const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
/** Where the now line sits at each beat, in rows from 08:00. */
const LINE = [1.5, 1.5, 3.5, 5.5, 5.5, 5.5, 5.5] as const;
/** Synthetic evolution over the last sessions. */
const SESSIONS = [0.3, 0.42, 0.5, 0.62, 0.78];

export function PecciWindow({ t, run, sim, frameRef }: WindowProps & { t: PecciSim }) {
  const beat = useBeats(BEATS, run);
  const line = LINE[beat];
  const appts = [
    { row: 0, type: t.physio, who: "R.A." },
    { row: 1, type: t.psych, who: "M.S." },
    { row: 3, type: t.nutrition, who: "J.P." },
    { row: 5, type: t.speech, who: "L.C." },
    { row: 7, type: t.physio, who: "T.B." },
  ];

  return (
    <WindowShell
      id="pecci"
      w={1100}
      h={720}
      name="Pecci"
      sub={t.sub}
      status={<LivePill label={t.live} />}
      sim={sim}
      frameRef={frameRef}
    >
      <div className="grid h-full grid-cols-[1fr_470px] gap-7 px-9 pb-9">
        {/* Day agenda */}
        <Appear on={beat >= 1}>
          <div className="relative grid grid-cols-[72px_1fr]" style={{ gridTemplateRows: `repeat(10, ${ROW}px)` }}>
            {HOURS.map((h, i) => (
              <div key={h} className="contents">
                <span
                  className="win-mono flex items-start pt-3 text-[18px] text-[color:var(--ink-3)]"
                  style={{ gridColumn: 1, gridRow: i + 1 }}
                >
                  {h}
                </span>
                <span className="border-t border-white/[0.08]" style={{ gridColumn: 2, gridRow: i + 1 }} />
              </div>
            ))}

            {appts.map((a) => {
              const done = line > a.row + 1;
              const picked = beat >= 4 && a.row === 5;
              return (
                <div
                  key={a.row}
                  className="z-[1] my-[5px] flex items-center justify-between rounded-[16px] px-5 transition-[background-color,opacity,box-shadow] duration-500"
                  style={{
                    gridColumn: 2,
                    gridRow: a.row + 1,
                    opacity: done ? 0.5 : 1,
                    background: picked
                      ? "color-mix(in oklab, var(--acc) 34%, rgba(255,255,255,0.06))"
                      : "color-mix(in oklab, var(--acc) 14%, rgba(255,255,255,0.05))",
                    boxShadow: picked ? "inset 0 0 0 2px var(--acc)" : "none",
                  }}
                >
                  <span className="text-[21px] font-[620] tracking-[-0.01em]">{a.type}</span>
                  <span className="win-mono text-[18px] text-[color:var(--ink-2)]">{a.who}</span>
                </div>
              );
            })}

            <div
              className="pointer-events-none absolute left-[72px] right-0 z-[2] h-0 transition-[top,opacity] duration-700 ease-[var(--ease-out)]"
              style={{ top: line * ROW, opacity: beat >= 1 ? 1 : 0 }}
            >
              <span className="absolute inset-x-0 top-[-1px] h-[2px] bg-[color:var(--acc)] shadow-[0_0_12px_color-mix(in_oklab,var(--acc)_70%,transparent)]" />
              <span className="absolute right-0 top-[-15px] inline-flex h-[30px] items-center rounded-full bg-[color:var(--acc)] px-3.5 text-[16px] font-[700] text-[#0b0c16]">
                {t.now}
              </span>
            </div>
          </div>
        </Appear>

        {/* Evolution note */}
        <Appear on={beat >= 1} className="min-h-0">
          <div className="win-panel relative h-full">
            <span
              className="absolute inset-0 grid place-items-center px-10 text-center text-[22px] text-[color:var(--ink-3)] transition-opacity duration-500"
              style={{ opacity: beat >= 4 ? 0 : 1 }}
            >
              {t.selectHint}
            </span>

            <Appear on={beat >= 4} className="flex h-full flex-col gap-5 p-6">
              <div className="flex items-center gap-4">
                <span className="grid h-[64px] w-[64px] flex-none place-items-center rounded-full bg-[color:var(--acc)] text-[24px] font-[700] text-[#0b0c16]">
                  LC
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[22px] font-[650] leading-[1.15] tracking-[-0.01em]">
                    {t.evolution} · L.C.
                  </span>
                  <span className="text-[18px] text-[color:var(--ink-3)]">
                    {t.role} · 13:00
                  </span>
                </span>
              </div>

              <p
                className="text-[21px] leading-[1.4] transition-[clip-path] duration-[2200ms] ease-linear"
                style={{ clipPath: beat >= 5 ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
              >
                {t.note}
              </p>

              <Appear on={beat >= 6} className="self-start">
                <span className="inline-flex h-[44px] items-center gap-2.5 rounded-full bg-[rgba(95,227,160,0.13)] px-5 text-[19px] font-[600] text-[color:var(--live)]">
                  <Check aria-hidden strokeWidth={2.8} className="h-[22px] w-[22px]" />
                  {t.saved}
                </span>
              </Appear>

              <div className="mt-auto flex flex-col gap-3">
                <span className="text-[18px] font-[600] text-[color:var(--ink-3)]">{t.progress}</span>
                <div className="flex h-[84px] items-end gap-3">
                  {SESSIONS.map((v, i) => (
                    <span
                      key={i}
                      className="flex-1 origin-bottom rounded-[6px] transition-transform duration-700 ease-[var(--ease-out)]"
                      style={{
                        height: `${v * 100}%`,
                        transform: beat >= 6 ? "scaleY(1)" : "scaleY(0.04)",
                        transitionDelay: beat >= 6 ? `${i * 90}ms` : "0ms",
                        background:
                          i === SESSIONS.length - 1
                            ? "var(--acc)"
                            : "color-mix(in oklab, var(--acc) 42%, rgba(255,255,255,0.12))",
                      }}
                    />
                  ))}
                </div>
              </div>
            </Appear>
          </div>
        </Appear>
      </div>
    </WindowShell>
  );
}
