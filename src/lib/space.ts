/**
 * Shared ground truth between the DOM chapters and the WebGL workspace.
 * Chapters declare `data-cam="<key>"`; the scene measures them and moves the
 * camera between the matching frames as the page scrolls.
 */
import type { ProjectId } from "./site";

export type CamKey =
  | "hero"
  | "vivi"
  | "evosolar"
  | "zelo"
  | "fantasy"
  | "more"
  | "build"
  | "contact";

export type V3 = [number, number, number];

export interface WindowDef {
  id: ProjectId;
  pos: V3;
  /** Yaw in radians; windows turn a little toward the room's centre. */
  yaw: number;
  /** Authored size in CSS px; 400 px make one world unit. */
  w: number;
  h: number;
}

export const PX_PER_UNIT = 400;

/** Solved from screen targets (see the hero and "more" camera frames):
 *  Vivi largest in front, Zelo's phone overlapping its right edge, EvoSolar and
 *  Fantasy above and behind; the three older products cascade off to the right,
 *  out of the hero's frame until their chapter turns the camera to them. */
export const WINDOWS: readonly WindowDef[] = [
  { id: "vivi", pos: [3.44, 1.51, 1.84], yaw: -0.19, w: 1240, h: 800 },
  { id: "evosolar", pos: [6.03, 3.54, -0.37], yaw: -0.28, w: 1240, h: 800 },
  { id: "zelo", pos: [4.56, 0.83, 3.56], yaw: -0.39, w: 430, h: 900 },
  { id: "fantasy", pos: [3.85, 4.18, -3.26], yaw: -0.14, w: 1160, h: 760 },
  { id: "br1", pos: [18.52, 4.29, -5.03], yaw: -0.22, w: 1100, h: 720 },
  { id: "cesh", pos: [19.38, 2.97, -3.8], yaw: -0.31, w: 1100, h: 720 },
  { id: "pecci", pos: [20.06, 1.77, -3.1], yaw: -0.38, w: 1100, h: 720 },
] as const;

/** Live values the DOM writes and the render loop reads (no re-renders). */
export const spaceState = {
  /** The product windows the current chapter is about, null in wide shots. */
  focus: null as readonly ProjectId[] | null,
};
