"use client";

import { BellRing, Check } from "lucide-react";
import { Appear, useBeats, WindowShell, type WindowProps } from "./kit";

export interface ZeloSim {
  sub: string;
  reading: string;
  read: string;
  match: string;
  drug: string;
  form: string;
  doses: string;
  daily: string;
  synced: string;
}

// empty · scanning · text found · ANVISA match · doses · caregivers · hold
const BEATS = [600, 1800, 900, 1000, 900, 900, 3400] as const;

/** The box in the camera: a Brazilian prescription carton, read by OCR. */
function Carton({ boxed }: { boxed: boolean }) {
  const line = (on: boolean) =>
    `rounded-[6px] transition-[box-shadow] duration-500 ${on ? "shadow-[0_0_0_2.5px_var(--acc)]" : "shadow-none"}`;
  return (
    <div className="relative w-[292px] rotate-[-5deg] overflow-hidden rounded-[10px] bg-[#f4f2ec] text-[#14151a] shadow-[0_24px_40px_-18px_rgba(0,0,0,0.7)]">
      <div className="h-[16px] bg-[#1f6f8b]" />
      <div className="flex flex-col gap-1.5 px-5 pb-3 pt-4">
        <span className={`self-start px-1 text-[25px] font-[760] leading-tight tracking-[-0.02em] ${line(boxed)}`}>
          Losartana Potássica
        </span>
        <span className={`self-start px-1 text-[34px] font-[800] leading-none ${line(boxed)}`}>50 mg</span>
        <span className={`self-start px-1 text-[16px] font-[560] text-[#4a4d55] ${line(boxed)}`}>
          30 comprimidos revestidos
        </span>
      </div>
      <div className="bg-[#c8242c] py-1.5 text-center text-[11px] font-[760] tracking-[0.08em] text-white">
        VENDA SOB PRESCRIÇÃO MÉDICA
      </div>
    </div>
  );
}

export function ZeloWindow({ t, run, sim, frameRef }: WindowProps & { t: ZeloSim }) {
  const beat = useBeats(BEATS, run);
  const scanning = beat === 1;

  return (
    <WindowShell id="zelo" w={430} h={900} name="Zelo" sub={t.sub} sim={sim} frameRef={frameRef} compact>
      <div className="flex h-full flex-col gap-4 px-6">
        {/* Camera */}
        <div className="relative grid h-[300px] flex-none place-items-center overflow-hidden rounded-[28px] bg-[#05060c]/70 shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
          <Carton boxed={beat >= 2} />
          {(["left-4 top-4 border-l-[3px] border-t-[3px] rounded-tl-[12px]", "right-4 top-4 border-r-[3px] border-t-[3px] rounded-tr-[12px]", "bottom-4 left-4 border-b-[3px] border-l-[3px] rounded-bl-[12px]", "bottom-4 right-4 border-b-[3px] border-r-[3px] rounded-br-[12px]"] as const).map((c) => (
            <span key={c} className={`absolute h-[34px] w-[34px] border-[color:var(--acc)] ${c}`} />
          ))}
          <span
            className={`scan-line absolute inset-x-6 top-6 h-[3px] rounded-full bg-[color:var(--acc)] shadow-[0_0_18px_4px_color-mix(in_oklab,var(--acc)_60%,transparent)] transition-opacity duration-300 ${
              scanning ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <p className="flex-none text-center text-[18px] font-[560] text-[color:var(--ink-2)]">
          {beat >= 2 ? t.read : t.reading}
        </p>

        {/* ANVISA match */}
        <Appear on={beat >= 3}>
          <div className="win-panel flex gap-4 p-4">
            <span className="grid h-[44px] w-[44px] flex-none place-items-center rounded-full bg-[color:var(--acc)] text-[#0b0c16]">
              <Check aria-hidden strokeWidth={3} className="h-[24px] w-[24px]" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[16px] font-[600] text-[color:var(--acc)]">{t.match}</span>
              <span className="text-[21px] font-[660] leading-tight">{t.drug}</span>
              <span className="text-[17px] text-[color:var(--ink-3)]">{t.form}</span>
            </span>
          </div>
        </Appear>

        {/* Doses */}
        <Appear on={beat >= 4}>
          <div className="flex items-center justify-between px-1">
            <span className="text-[18px] font-[600] text-[color:var(--ink-2)]">{t.doses}</span>
            <span className="text-[16px] text-[color:var(--ink-3)]">{t.daily}</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {["08:00", "20:00"].map((h) => (
              <span key={h} className="t-num rounded-[18px] bg-white/[0.08] py-3 text-center text-[28px]">
                {h}
              </span>
            ))}
          </div>
        </Appear>

        {/* Caregivers */}
        <Appear on={beat >= 5}>
          <div className="flex items-center gap-3 rounded-[20px] bg-[color-mix(in_oklab,var(--acc)_14%,transparent)] px-4 py-3">
            <span className="flex -space-x-2.5">
              {["A", "M"].map((i, k) => (
                <span
                  key={i}
                  className="grid h-[38px] w-[38px] place-items-center rounded-full text-[17px] font-[700] text-[#0b0c16] ring-2 ring-[#1a1c33]"
                  style={{ background: k ? "#c9b8ff" : "#ffd29a" }}
                >
                  {i}
                </span>
              ))}
            </span>
            <span className="flex-1 text-[17px] font-[560] leading-tight">{t.synced}</span>
            <BellRing aria-hidden className="h-[22px] w-[22px] text-[color:var(--acc)]" />
          </div>
        </Appear>
      </div>
    </WindowShell>
  );
}
