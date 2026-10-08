"use client";

import { MessageSquare } from "lucide-react";
import { useBeats, WindowShell, type WindowProps } from "./kit";

export interface EvoSolarSim {
  /** BCP 47 locale for number formatting. */
  fmt: string;
  sub: string;
  units: string;
  month: string;
  leads: string;
  contracts: string;
  royalties: string;
  auto: string;
  installed: string;
  sla: string;
  onTime: string;
}

/** Synthetic franchise units: the window walks the tenants one by one. */
const UNITS = [
  { name: "Friburgo", google: 112, meta: 72, contracts: 23, royalties: 18420, seed: 1.3 },
  { name: "Petrópolis", google: 80, meta: 62, contracts: 17, royalties: 13960, seed: 2.9 },
  { name: "Teresópolis", google: 61, meta: 36, contracts: 11, royalties: 9310, seed: 4.1 },
  { name: "Niterói", google: 129, meta: 84, contracts: 29, royalties: 22780, seed: 5.7 },
] as const;

const BEATS = [2600, 2600, 2600, 3600] as const;

const months = (seed: number) =>
  Array.from({ length: 12 }, (_, i) => 0.38 + 0.5 * Math.abs(Math.sin(seed + i * 0.55)) + i * 0.012);

export function EvoSolarWindow({ t, run, sim, frameRef }: WindowProps & { t: EvoSolarSim }) {
  const beat = useBeats(BEATS, run);
  const u = UNITS[beat];
  const n = new Intl.NumberFormat(t.fmt);
  const brl = new Intl.NumberFormat(t.fmt, { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const bars = months(u.seed);

  const kpi = (label: string, value: string, note?: string) => (
    <div className="win-panel flex flex-col gap-1.5 px-6 py-5">
      <span className="text-[18px] font-[600] text-[color:var(--ink-3)]">{label}</span>
      <span key={value} className="t-num num-in text-[40px] leading-none">
        {value}
      </span>
      {note && <span className="text-[16px] text-[color:var(--ink-3)]">{note}</span>}
    </div>
  );

  return (
    <WindowShell id="evosolar" w={1240} h={800} name="EvoSolar" sub={t.sub} sim={sim} frameRef={frameRef}>
      <div className="grid h-full grid-cols-[250px_1fr] gap-6 px-9 pb-9">
        <div className="win-panel flex flex-col gap-1.5 p-4">
          <span className="px-3 pb-2 pt-1 text-[18px] font-[600] text-[color:var(--ink-3)]">{t.units}</span>
          {UNITS.map((x, i) => (
            <span
              key={x.name}
              className={`flex h-[56px] items-center gap-3 rounded-[16px] px-3 text-[21px] font-[560] transition-colors duration-500 ${
                i === beat ? "bg-white/[0.11] text-[color:var(--ink)]" : "text-[color:var(--ink-2)]"
              }`}
            >
              <span
                className="h-[9px] w-[9px] rounded-full transition-colors duration-500"
                style={{ background: i === beat ? "var(--acc)" : "rgba(255,255,255,0.2)" }}
              />
              {x.name}
            </span>
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex items-baseline justify-between">
            <span key={u.name} className="num-in text-[28px] font-[700] tracking-[-0.02em]">
              {u.name} <span className="font-[500] text-[color:var(--ink-3)]">· {t.month}</span>
            </span>
            <span className="text-[17px] text-[color:var(--ink-3)]">{t.auto}</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {kpi(t.leads, n.format(u.google + u.meta), `Google Ads ${n.format(u.google)} · Meta ${n.format(u.meta)}`)}
            {kpi(t.contracts, n.format(u.contracts))}
            {kpi(t.royalties, brl.format(u.royalties))}
          </div>

          <div className="win-panel flex min-h-0 flex-1 flex-col px-6 pb-5 pt-4">
            <span className="text-[18px] font-[600] text-[color:var(--ink-3)]">{t.installed}</span>
            <div className="mt-4 flex flex-1 items-end gap-3">
              {bars.map((v, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-[6px] transition-[height] duration-700 ease-[var(--ease-out)]"
                  style={{
                    height: `${Math.min(v, 1) * 100}%`,
                    transitionDelay: `${i * 30}ms`,
                    background:
                      i === 9
                        ? "var(--acc)"
                        : "color-mix(in oklab, var(--acc) 38%, rgba(255,255,255,0.12))",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-[20px] bg-white/[0.05] px-5 py-4">
            <MessageSquare aria-hidden className="h-[24px] w-[24px] text-[color:var(--acc)]" />
            <span className="flex-1 text-[19px] text-[color:var(--ink-2)]">{t.sla}</span>
            <span className="t-num text-[22px]">04:12</span>
            <span className="inline-flex items-center gap-2 text-[17px] font-[600] text-[color:var(--live)]">
              <span className="lamp" />
              {t.onTime}
            </span>
          </div>
        </div>
      </div>
    </WindowShell>
  );
}
