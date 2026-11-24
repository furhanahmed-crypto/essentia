import Image from "next/image";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { cn } from "cn";
import { Icon } from "@/components/shared/Icon";
import { BRAND } from "@/constants/brand";
import { WA } from "@/constants/whatsapp";
import type { JourneyStep as Step } from "@/types/home/content";
import { indexOf } from "@/utils/emphasis";

// Each movement gets its own frame: a tall portrait, an arch (the lounge mirror), a glowing circle.
const FRAME = [
  "",
  "aspect-[3/4] w-[min(100%,20rem)]",
  "aspect-[3/4] w-[min(100%,19rem)] rounded-t-full",
  "aspect-square w-[min(100%,20rem)] rounded-full ring-[14px] ring-background/70 shadow-[0_0_80px_10px_rgba(121,167,151,0.45)]",
] as const;

function StepText({ step, position }: { step: Step; position: number }) {
  return (
    <div className="max-w-xs">
      <span className="font-heading text-6xl leading-none text-accent-deep/40 lg:text-7xl">{indexOf(position + 1)}</span>
      <h3 className="mt-3 mb-3 font-heading text-3xl text-ink lg:text-4xl">{step.title}</h3>
      <p className="m-0 text-sm leading-relaxed text-ink/75">{step.text}</p>
    </div>
  );
}

/** One movement of the visit. The first is pure type and contact; the rest pair text with a shaped photo. */
export function JourneyStep({ step, position }: { step: Step; position: number }) {
  if (!step.image) {
    return (
      <div className="journey-step flex flex-col justify-center gap-8">
        <StepText step={step} position={position} />
        <div className="flex flex-col gap-3">
          <a href={BRAND.phoneHref} className="font-heading text-3xl text-ink hover:text-accent-deep lg:text-5xl">
            {BRAND.phone}
          </a>
          <a
            href={WA.contact}
            target="_blank"
            rel="noopener"
            className="inline-flex w-fit items-center gap-2.5 rounded-full bg-ink px-5 py-3 type-kicker tracking-[0.12em] text-background uppercase transition-colors hover:bg-accent-deep"
          >
            <Icon icon={faWhatsapp} className="text-base" /> WhatsApp the lounge
          </a>
        </div>
      </div>
    );
  }

  const reversed = position === 2;
  return (
    <div className={cn("journey-step flex flex-col gap-8 lg:items-center", reversed ? "lg:flex-col-reverse" : "lg:flex-row lg:gap-12")}>
      <div className={cn("relative shrink-0 overflow-hidden bg-mist", FRAME[position])}>
        <Image src={step.image} alt={step.imageAlt ?? ""} fill sizes="320px" className="object-cover" />
      </div>
      <StepText step={step} position={position} />
    </div>
  );
}
