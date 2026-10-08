"use client";

import type { Ref } from "react";
import type { ProjectId } from "@/lib/site";
import { BR1Window, type BR1Sim } from "./BR1";
import { CeshWindow, type CeshSim } from "./Cesh";
import { EvoSolarWindow, type EvoSolarSim } from "./EvoSolar";
import { FantasyWindow, type FantasySim } from "./Fantasy";
import { PecciWindow, type PecciSim } from "./Pecci";
import { ViviWindow, type ViviSim } from "./Vivi";
import { ZeloWindow, type ZeloSim } from "./Zelo";

export interface Sims {
  vivi: ViviSim;
  evosolar: EvoSolarSim;
  zelo: ZeloSim;
  fantasy: FantasySim;
  br1: BR1Sim;
  cesh: CeshSim;
  pecci: PecciSim;
}

/** The live app window for one shipped product. */
export function WindowFor({
  id,
  sims,
  sim,
  run,
  frameRef,
}: {
  id: ProjectId;
  sims: Sims;
  sim: string;
  run: boolean;
  frameRef: Ref<HTMLDivElement>;
}) {
  const props = { sim, run, frameRef };
  switch (id) {
    case "vivi":
      return <ViviWindow t={sims.vivi} {...props} />;
    case "evosolar":
      return <EvoSolarWindow t={sims.evosolar} {...props} />;
    case "zelo":
      return <ZeloWindow t={sims.zelo} {...props} />;
    case "fantasy":
      return <FantasyWindow t={sims.fantasy} {...props} />;
    case "br1":
      return <BR1Window t={sims.br1} {...props} />;
    case "cesh":
      return <CeshWindow t={sims.cesh} {...props} />;
    case "pecci":
      return <PecciWindow t={sims.pecci} {...props} />;
  }
}
