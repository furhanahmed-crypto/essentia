/**
 * Geometry of the hero's print stack. Frames sit in "slots" counted from the centre: 0 is the
 * front print, ±1 the pair tucked behind it, ±2 the outer pair. Offsets are in frame widths, so the
 * whole fan scales with `--frame-w`; CSS multiplies x by `--spread` per breakpoint (tighter on
 * phones). Shared by the server render (first paint) and the client (re-stacking).
 */
export interface SlotPose {
  /** Horizontal offset, in frame widths (before `--spread`). */
  x: number;
  /** Vertical offset, in frame widths. */
  y: number;
  /** Tilt in degrees. */
  rotate: number;
  scale: number;
  /** Stacking order: the front print is highest. */
  z: number;
  /** Darkening veil over the photograph, 0–1, so depth reads at a glance. */
  dim: number;
}

const POSES: Record<0 | 1 | 2, SlotPose> = {
  0: { x: 0, y: 0, rotate: 0, scale: 1, z: 50, dim: 0 },
  1: { x: 0.62, y: 0.03, rotate: 6, scale: 0.9, z: 40, dim: 0.22 },
  2: { x: 1.12, y: 0.09, rotate: 12, scale: 0.8, z: 30, dim: 0.42 },
};

/** Pose for a slot; negative slots mirror the positive ones to the left. */
export function slotPose(slot: number): SlotPose {
  const pose = POSES[Math.min(Math.abs(slot), 2) as 0 | 1 | 2];
  const side = Math.sign(slot);
  return { ...pose, x: pose.x * side, rotate: pose.rotate * side };
}

/** The starting order: frames in content order, the middle one in front. */
export const initialOrder = (count: number): number[] => Array.from({ length: count }, (_, index) => index);

/** Slot of a frame within an order (array of frame indexes, left to right). */
export function slotOf(order: number[], frame: number): number {
  return order.indexOf(frame) - Math.floor(order.length / 2);
}

/**
 * Brings `frame` to the centre by rotating the order like a carousel, so the frames keep their
 * relative sequence and the ones it passes slide round to the other side.
 */
export function bringToFront(order: number[], frame: number): number[] {
  const shift = slotOf(order, frame);
  if (shift === 0) return order;
  const n = order.length;
  return order.map((_, position) => order[(((position + shift) % n) + n) % n]);
}
