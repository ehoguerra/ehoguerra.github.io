"use client";

import { ArrowUp } from "lucide-react";
import { Appear, LivePill, useBeats, WindowShell, type WindowProps } from "./kit";

export interface ViviSim {
  sub: string;
  live: string;
  question: string;
  intent: string;
  tool: string;
  answer: string;
  chain: string;
  trying: string;
  timeout: string;
  answered: string;
  standby: string;
  fallback: string;
  latency: string;
  ask: string;
}

// empty · ask · intent · tool · openai tries · falls back · answer · chart · hold
const BEATS = [700, 900, 700, 800, 1300, 1100, 1700, 1300, 3600] as const;

/** Daily generation for the synthetic plant, peak on the 14th. */
const DAYS = [
  0.62, 0.7, 0.66, 0.48, 0.74, 0.8, 0.77, 0.58, 0.69, 0.83, 0.86, 0.72, 0.9, 1, 0.88, 0.64, 0.42,
  0.71, 0.79, 0.84, 0.76, 0.6, 0.73, 0.81, 0.68, 0.55, 0.78, 0.82, 0.74, 0.7,
];

type Provider = "idle" | "trying" | "timeout" | "answered" | "standby";

function ProviderRow({ name, state, t }: { name: string; state: Provider; t: ViviSim }) {
  const label = {
    idle: "",
    trying: t.trying,
    timeout: t.timeout,
    answered: t.answered,
    standby: t.standby,
  }[state];
  const tone = {
    idle: "text-[color:var(--ink-3)] bg-white/[0.04]",
    trying: "text-[color:var(--acc)] bg-[color-mix(in_oklab,var(--acc)_16%,transparent)] animate-[blink_1s_ease-in-out_infinite]",
    timeout: "text-[#ff9a8a] bg-[rgba(255,120,100,0.13)]",
    answered: "text-[color:var(--live)] bg-[rgba(95,227,160,0.13)]",
    standby: "text-[color:var(--ink-3)] bg-white/[0.05]",
  }[state];
  return (
    <div
      className={`flex h-[74px] items-center justify-between rounded-[20px] px-6 transition-colors duration-500 ${
        state === "answered" ? "bg-white/[0.09]" : "bg-white/[0.035]"
      }`}
    >
      <span className="text-[23px] font-[620] tracking-[-0.01em]">{name}</span>
      {label && (
        <span className={`inline-flex h-[36px] items-center rounded-full px-4 text-[17px] font-[600] ${tone}`}>
          {label}
        </span>
      )}
    </div>
  );
}

export function ViviWindow({ t, run, sim, frameRef }: WindowProps & { t: ViviSim }) {
  const beat = useBeats(BEATS, run);
  const openai: Provider = beat < 4 ? "idle" : beat === 4 ? "trying" : "timeout";
  const claude: Provider = beat < 5 ? "idle" : beat === 5 ? "trying" : "answered";

  return (
    <WindowShell
      id="vivi"
      w={1240}
      h={800}
      name="Vivi"
      sub={t.sub}
      status={<LivePill label={t.live} />}
      sim={sim}
      frameRef={frameRef}
    >
      <div className="grid h-full grid-cols-[1fr_372px] gap-7 px-9 pb-9">
        {/* Conversation */}
        <div className="relative flex min-h-0 flex-col">
          <div className="flex flex-1 flex-col gap-5 pt-2">
            <Appear on={beat >= 1} className="self-end">
              <p className="max-w-[560px] rounded-[28px] rounded-br-[10px] bg-[color-mix(in_oklab,var(--acc)_26%,rgba(255,255,255,0.06))] px-7 py-5 text-[24px] leading-[1.38]">
                {t.question}
              </p>
            </Appear>

            <div className="win-mono flex flex-col gap-1.5 pl-1 text-[18px] text-[color:var(--ink-3)]">
              <Appear on={beat >= 2}>
                <span className="text-[color:var(--ink-2)]">intent</span> → {t.intent}
              </Appear>
              <Appear on={beat >= 3}>
                <span className="text-[color:var(--ink-2)]">tool</span> → {t.tool}
              </Appear>
            </div>

            <Appear on={beat >= 6} className="max-w-[640px]">
              <div className="win-panel rounded-tl-[10px] px-7 pb-6 pt-5">
                <p
                  className="text-[24px] leading-[1.38] transition-[clip-path] duration-[1600ms] ease-linear"
                  style={{ clipPath: beat >= 6 ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
                >
                  {t.answer}
                </p>
                <div className="mt-5 flex h-[86px] items-end gap-[5px]">
                  {DAYS.map((v, i) => (
                    <span
                      key={i}
                      className="flex-1 origin-bottom rounded-[3px] transition-transform duration-700 ease-[var(--ease-out)]"
                      style={{
                        height: `${v * 100}%`,
                        transform: beat >= 7 ? "scaleY(1)" : "scaleY(0.04)",
                        transitionDelay: beat >= 7 ? `${i * 22}ms` : "0ms",
                        background: i === 13 ? "var(--acc)" : "color-mix(in oklab, var(--acc) 42%, rgba(255,255,255,0.12))",
                      }}
                    />
                  ))}
                </div>
              </div>
            </Appear>
          </div>

          <div className="mt-4 flex h-[72px] items-center gap-4 rounded-full bg-white/[0.07] pl-7 pr-2.5 shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
            <span className="flex-1 text-[22px] text-[color:var(--ink-3)]">{t.ask}</span>
            <span className="grid h-[54px] w-[54px] place-items-center rounded-full bg-[color:var(--acc)] text-[#0b0c16]">
              <ArrowUp aria-hidden strokeWidth={2.6} className="h-[26px] w-[26px]" />
            </span>
          </div>
        </div>

        {/* Model chain */}
        <div className="win-panel flex flex-col gap-3 p-5">
          <span className="px-1 pb-1 pt-1 text-[18px] font-[600] text-[color:var(--ink-3)]">{t.chain}</span>
          <ProviderRow name="OpenAI" state={openai} t={t} />
          <ProviderRow name="Claude" state={claude} t={t} />
          <ProviderRow name="Gemini" state="standby" t={t} />
          <div className="mt-auto flex flex-col gap-2 border-t border-white/10 px-1 pt-4 text-[18px]">
            <span className="text-[color:var(--ink-2)]">{t.fallback}</span>
            <Appear on={beat >= 8}>
              <span className="t-num text-[34px] text-[color:var(--ink)]">1.4 s</span>{" "}
              <span className="text-[color:var(--ink-3)]">{t.latency}</span>
            </Appear>
          </div>
        </div>
      </div>
    </WindowShell>
  );
}
