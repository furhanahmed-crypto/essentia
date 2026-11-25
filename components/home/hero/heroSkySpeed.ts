import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Scroll speed (px/s) that adds one extra multiple of the idle star flow. */
const PX_PER_RATE = 320;
/** Bounds on the flow rate: fast scrolling multiplies it, scrolling back briefly reverses it. */
const RATE = { min: -5, max: 8 } as const;
/** Seconds to catch up with the scroll, then to ease back to the idle flow once it stops. */
const CATCH_UP = 0.25;
const SETTLE = 1.6;

/**
 * Ties the star flow (`.hero-sky-flow`, CSS animations) to scroll speed. The animations keep
 * running on the compositor; only their `playbackRate` changes, so position stays continuous and
 * no transform is written from JS. Idle rate is 1 (the stars always drift); scrolling down speeds
 * the rise up with velocity, scrolling up runs it backwards, and it eases back to idle afterwards.
 * Returns a cleanup that restores the idle rate.
 */
export function bindSkySpeed(section: HTMLElement): () => void {
  const flows = Array.from(section.querySelectorAll<HTMLElement>(".hero-sky-flow"));
  const speed = { rate: 1 };
  const apply = () => {
    for (const flow of flows) for (const animation of flow.getAnimations()) animation.playbackRate = speed.rate;
  };

  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      const target = gsap.utils.clamp(RATE.min, RATE.max, 1 + self.getVelocity() / PX_PER_RATE);
      // `overwrite` drops the previous catch-up and settle, so the newest reading always wins.
      gsap.to(speed, { rate: target, duration: CATCH_UP, ease: "power2.out", overwrite: true, onUpdate: apply });
      gsap.to(speed, { rate: 1, duration: SETTLE, delay: CATCH_UP, ease: "power2.inOut", onUpdate: apply });
    },
  });

  return () => {
    trigger.kill();
    gsap.killTweensOf(speed);
    speed.rate = 1;
    apply();
  };
}
