import gsap from "gsap";
import { slotOf, slotPose } from "@/components/home/hero/heroSlots";

/**
 * Re-stack choreography. One continuous, interruptible GSAP timeline per click, animating the
 * CSS custom properties that `.hero-slot` reads (`--slot-*` for the resting pose, `--nudge-*` for
 * the temporary step-aside). GSAP always tweens from the current on-screen values, so a click that
 * lands mid-swap simply retargets every print from wherever it is — nothing is ever locked.
 *
 *  0     ─ 0.5   the prints in front of the chosen one ease aside, away from it; the chosen print
 *                lifts and begins drifting in (slow-in, so it stays tucked behind while they part)
 *  0.32          stacking changes while nothing overlaps the chosen print
 *  0.32  ─ 1.2   every print glides to its new slot on one shared curve; the ones that stepped
 *                aside sweep back in behind the new front print
 */

/** Shared, gentle in-out curve (≈ cubic-bezier(0.65, 0, 0.35, 1)) for the long glides. */
const GLIDE = "power2.inOut";
/** Quick, soft deceleration for the step-aside. */
const PART = "power2.out";

const TIMING = {
  part: 0.5,
  restack: 0.32,
  glide: 0.88,
  chosen: 1.2,
  liftHold: 0.55,
} as const;

/** How far the prints in the way step aside, in frame widths. */
const STEP_ASIDE = { x: 0.55, y: -0.03, rotate: 5, scale: 0.94 } as const;
/** The chosen print's lift while it comes forward. */
const LIFT = { y: -0.06, rotate: 2, scale: 1.04 } as const;

export interface SwapTargets {
  /** `.hero-slot` element per frame index (pose + nudge vars). */
  slots: HTMLElement[];
  /** `figure.hero-frame` element per frame index (stacking order). */
  figures: HTMLElement[];
}

const poseVars = (slot: number) => {
  const pose = slotPose(slot);
  return {
    "--slot-x": pose.x,
    "--slot-y": pose.y,
    "--slot-r": `${pose.rotate}deg`,
    "--slot-s": pose.scale,
  };
};

const restNudge = { "--nudge-x": 0, "--nudge-y": 0, "--nudge-r": "0deg", "--nudge-s": 1 };

/** Snap every print to its slot in `order` (reduced motion, or no animation wanted). */
export function placeInstantly({ slots, figures }: SwapTargets, order: number[]): void {
  slots.forEach((slot, frame) => {
    const at = slotOf(order, frame);
    gsap.set(slot, { ...poseVars(at), ...restNudge });
    gsap.set(figures[frame], { zIndex: slotPose(at).z });
  });
}

/**
 * Build the swap from `from` to `to`, bringing `chosen` (a frame index) to the front. The caller
 * kills any previous swap first; this one starts from wherever the prints currently are.
 */
export function buildSwap({ slots, figures }: SwapTargets, from: number[], to: number[], chosen: number): gsap.core.Timeline {
  const chosenSlot = slotOf(from, chosen);
  const away = -Math.sign(chosenSlot);
  const tl = gsap.timeline();

  slots.forEach((slot, frame) => {
    const before = slotOf(from, frame);
    const after = slotOf(to, frame);
    const isChosen = frame === chosen;
    const inTheWay = !isChosen && Math.abs(before) < Math.abs(chosenSlot);

    if (isChosen) {
      tl.to(slot, { ...poseVars(after), duration: TIMING.chosen, ease: GLIDE }, 0)
        .to(
          slot,
          { "--nudge-y": LIFT.y, "--nudge-r": `${-Math.sign(chosenSlot) * LIFT.rotate}deg`, "--nudge-s": LIFT.scale, duration: TIMING.part, ease: PART },
          0,
        )
        .to(slot, { ...restNudge, duration: TIMING.chosen - TIMING.liftHold, ease: GLIDE }, TIMING.liftHold);
    } else {
      if (inTheWay) {
        tl.to(
          slot,
          {
            "--nudge-x": away * STEP_ASIDE.x,
            "--nudge-y": STEP_ASIDE.y,
            "--nudge-r": `${away * STEP_ASIDE.rotate}deg`,
            "--nudge-s": STEP_ASIDE.scale,
            duration: TIMING.part,
            ease: PART,
          },
          0,
        ).to(slot, { ...restNudge, duration: TIMING.glide, ease: GLIDE }, TIMING.part);
      } else {
        tl.to(slot, { ...restNudge, duration: TIMING.part, ease: GLIDE }, 0);
      }
      tl.to(slot, { ...poseVars(after), duration: TIMING.glide, ease: GLIDE }, TIMING.restack);
    }

    // Stacking switches in one frame, once the prints in the way have parted.
    tl.set(figures[frame], { zIndex: isChosen ? slotPose(0).z + 5 : slotPose(after).z }, TIMING.restack);
  });

  // Hand the chosen print its regular front z once it has landed.
  tl.set(figures[chosen], { zIndex: slotPose(0).z });
  return tl;
}
