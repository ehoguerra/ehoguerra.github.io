"use client";

import { Check } from "lucide-react";
import { Appear, useBeats, WindowShell, type WindowProps } from "./kit";

export interface FantasySim {
  fmt: string;
  sub: string;
  round: string;
  pick: string;
  live: string;
  ft: string;
  survived: string;
  alive: string;
  wallet: string;
  picks: string;
  prize: string;
}

// fixtures · pick · kick-off · goal · full time · hold
const BEATS = [900, 1100, 1200, 1500, 1300, 3600] as const;

/** A synthetic round; the visitor's pick is the away side of the first game. */
const GAMES = [
  { home: "Flamengo", away: "Palmeiras", time: "16:00", s: [[0, 0], [0, 1], [1, 2]] },
  { home: "Corinthians", away: "São Paulo", time: "16:00", s: [[0, 0], [1, 0], [1, 1]] },
  { home: "Grêmio", away: "Internacional", time: "18:30", s: [[0, 0], [1, 1], [2, 1]] },
  { home: "Fluminense", away: "Botafogo", time: "18:30", s: [[0, 0], [0, 0], [0, 1]] },
  { home: "Atlético-MG", away: "Cruzeiro", time: "21:00", s: [[0, 0], [0, 1], [1, 1]] },
] as const;

export function FantasyWindow({ t, run, sim, frameRef }: WindowProps & { t: FantasySim }) {
  const beat = useBeats(BEATS, run);
  const phase = beat < 2 ? -1 : beat === 2 ? 0 : beat === 3 ? 1 : 2;
  const brl = new Intl.NumberFormat(t.fmt, { style: "currency", currency: "BRL" });
  const alive = beat >= 4 ? 187 : 214;

  return (
    <WindowShell id="fantasy" w={1160} h={760} name="Fantasy Picks" sub={t.sub} sim={sim} frameRef={frameRef}>
      <div className="grid h-full grid-cols-[1fr_320px] gap-6 px-9 pb-9">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-[26px] font-[700] tracking-[-0.02em]">{t.round}</span>
            {phase >= 0 && (
              <span
                className={`inline-flex h-[36px] items-center gap-2 rounded-full px-4 text-[17px] font-[650] ${
                  phase < 2 ? "bg-[rgba(255,107,122,0.16)] text-[#ff8e99]" : "bg-white/[0.08] text-[color:var(--ink-2)]"
                }`}
              >
                {phase < 2 && <span className="h-[8px] w-[8px] animate-[blink_1s_ease-in-out_infinite] rounded-full bg-[#ff6b7a]" />}
                {phase < 2 ? t.live : t.ft}
              </span>
            )}
          </div>
          {GAMES.map((g, i) => {
            const picked = i === 0 && beat >= 1;
            const score = phase >= 0 ? g.s[phase as 0 | 1 | 2] : null;
            return (
              <div
                key={g.home}
                className={`grid h-[84px] grid-cols-[1fr_120px_1fr] items-center rounded-[20px] px-6 text-[21px] transition-[background-color,box-shadow] duration-500 ${
                  picked
                    ? "bg-[color-mix(in_oklab,var(--acc)_16%,transparent)] shadow-[inset_0_0_0_2px_var(--acc)]"
                    : "bg-white/[0.04]"
                }`}
              >
                <span className="font-[560]">{g.home}</span>
                <span className="t-num text-center text-[26px]">
                  {score ? `${score[0]} – ${score[1]}` : <span className="text-[19px] text-[color:var(--ink-3)]">{g.time}</span>}
                </span>
                <span className="flex items-center justify-end gap-3 font-[560]">
                  {picked && (
                    <span
                      className={`inline-flex h-[32px] items-center gap-1.5 rounded-full px-3 text-[15px] font-[700] text-[#0b0c16] transition-colors duration-500 ${
                        beat >= 4 ? "bg-[color:var(--live)]" : "bg-[color:var(--acc)]"
                      }`}
                    >
                      {beat >= 4 && <Check aria-hidden strokeWidth={3} className="h-[16px] w-[16px]" />}
                      {beat >= 4 ? t.survived : t.pick}
                    </span>
                  )}
                  {g.away}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4">
          <div className="win-panel flex flex-col gap-2 px-6 py-6">
            <span className="text-[18px] font-[600] text-[color:var(--ink-3)]">{t.alive}</span>
            <span key={alive} className="t-num num-in text-[56px] leading-none">
              {alive}
            </span>
            <span className="text-[17px] text-[color:var(--ink-3)]">/ 500</span>
          </div>
          <Appear on={beat >= 1} className="win-panel flex flex-1 flex-col gap-4 px-6 py-6">
            <span className="text-[18px] font-[600] text-[color:var(--ink-3)]">{t.wallet}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-[19px] text-[color:var(--ink-2)]">{t.picks}</span>
              <span className="t-num text-[30px]">3</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-white/10 pt-4">
              <span className="text-[19px] text-[color:var(--ink-2)]">{t.prize}</span>
              <span className="t-num text-[30px]">{brl.format(120)}</span>
            </div>
          </Appear>
        </div>
      </div>
    </WindowShell>
  );
}
