import Image from "next/image";
import { cn } from "cn";
import { Appear } from "@/components/motion/Appear";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Band, type BandTone } from "@/components/shared/editorial/Band";
import { Label } from "@/components/shared/editorial/Label";
import { splitInclusion } from "@/constants/packages";
import type { SalonPackage } from "@/types/services";

const TIER_NUMERALS = ["I", "II", "III"] as const;

interface OccasionRitualProps {
  pkg: SalonPackage;
  index: number;
  tone: BandTone;
  image: { src: string; alt: string; position: string };
  /** Put the photograph on the right instead of the left. */
  flip?: boolean;
}

// One tiered journey (pre-bridal or groom): an arched portrait pinned beside tier columns. Each
// inclusion is split into its category (small label) and detail, so tiers compare at a glance.
export function OccasionRitual({ pkg, index, tone, image, flip = false }: OccasionRitualProps) {
  const tiers = pkg.tiers ?? [];
  const muted = tone === "night" ? "text-night-muted" : "text-text";
  const ink = tone === "night" ? "text-night-ink" : "text-ink";
  return (
    <Band tone={tone} id={pkg.id} ariaLabelledby={`${pkg.id}-title`} className="scroll-mt-20">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className={cn("lg:col-span-4", flip && "lg:order-2 lg:col-start-9")}>
          <div className="lg:sticky lg:top-32">
            <MaskReveal className="arch aspect-[3/4] w-full max-w-[380px] bg-white/5">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 80vw, 380px" className="object-cover" style={{ objectPosition: image.position }} />
            </MaskReveal>
          </div>
        </div>

        <div className={cn("lg:col-span-8", flip ? "lg:order-1" : "lg:pl-6")}>
          <Label index={index}>{pkg.category}</Label>
          <h2 id={`${pkg.id}-title`} className={cn("mt-6 mb-0 type-title", ink)}>
            {pkg.name}
          </h2>
          <p className={cn("mt-5 mb-0 max-w-lg", muted)}>{pkg.summary}</p>

          <div className={cn("mt-14 grid gap-y-12 border-t border-current/60", tiers.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
            {tiers.map((tier, tierIndex) => (
              <Appear
                key={tier.name}
                delay={tierIndex * 0.1}
                className="border-line pt-6 md:px-6 md:first:pl-0 md:last:pr-0 md:[&:not(:last-child)]:border-r"
              >
                <p className="m-0 type-label text-em">Tier {TIER_NUMERALS[tierIndex]}</p>
                <h3 className={cn("mt-2 mb-0 font-heading text-3xl italic", ink)}>{tier.name}</h3>
                <ul className="mt-6 mb-0 p-0">
                  {tier.includes.map((line) => {
                    const { category, detail } = splitInclusion(line);
                    return (
                      <li key={line} className="list-none border-b border-line py-3">
                        <span className={cn("block type-label", muted)}>{category}</span>
                        {detail ? <span className="mt-1 block text-sm">{detail}</span> : null}
                      </li>
                    );
                  })}
                </ul>
              </Appear>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
