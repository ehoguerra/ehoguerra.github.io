/**
 * Shared ground truth between the DOM chapters and the WebGL line.
 * Sections declare `data-cam="<key>"`; the scene reads their positions and
 * flies the camera between the matching keyframes as the page scrolls.
 */

/** Station x positions along the conveyor, in build order. */
export const STATION_X = [0, 7, 14, 21, 28, 35, 42] as const;

export const BELT_START = -9;
export const BELT_END = 46;
export const PALLET_X = 50;
/** The dispatch pallet sits beside the end of the line, off the camera axis. */
export const PALLET_Z = -4.4;

export type CamKey =
  | "hero"
  | "line"
  | "s0"
  | "s1"
  | "s2"
  | "s3"
  | "s4"
  | "s5"
  | "s6"
  | "shipped"
  | "rest"
  | "contact";

/** Live values the DOM writes and the render loop reads (no re-renders). */
export const lineState = {
  /** Index of the shipped product whose label is centred, -1 when none. */
  product: -1,
};
