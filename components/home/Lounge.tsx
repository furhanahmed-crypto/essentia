import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Band } from "@/components/shared/editorial/Band";
import { Label } from "@/components/shared/editorial/Label";
import home from "@/constants/home/content.json";
import { emphasis, indexOf } from "@/utils/emphasis";

const NUMERALS = ["I", "II", "III", "IV"] as const;

// Why Essentia + visit journey — solid grounds only (no stretchy section backgrounds).
export function Lounge() {
  const { lounge } = home;

  return (
    <>
      <Band tone="ivory" ariaLabelledby="lounge-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Label index={5}>{lounge.label}</Label>
            <Reveal y={24}>
              <h2 id="lounge-title" className="mt-6 mb-0 type-title text-ink">
                {emphasis(lounge.title)}
              </h2>
            </Reveal>
            <figure className="mt-10 mb-0 max-w-sm">
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={lounge.image}
                  alt={lounge.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 360px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 type-label text-ink/55">{lounge.caption}</figcaption>
            </figure>
          </div>
          <ol className="m-0 grid gap-0 border-t border-ink/70 p-0 lg:col-span-7 lg:col-start-6">
            {lounge.principles.map((principle, index) => (
              <li key={principle.title} className="list-none border-b border-line py-8 md:py-10">
                <Reveal delay={index * 0.05}>
                  <div className="grid gap-3 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-8">
                    <span className="font-heading text-2xl text-em italic md:text-3xl">{NUMERALS[index]}</span>
                    <div>
                      <h3 className="m-0 font-heading text-[clamp(1.35rem,2vw,1.85rem)] leading-snug tracking-tight text-ink">
                        {principle.title}
                      </h3>
                      <p className="mt-3 mb-0 max-w-xl text-sm text-text md:text-base">{principle.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Band>

      <Band tone="mist" ariaLabelledby="visit-journey-title" space="tight">
        <p id="visit-journey-title" className="m-0 type-label text-ink/60">
          {lounge.visitLabel}
        </p>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:pb-0">
          {lounge.steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.06}
              className="w-[75vw] shrink-0 snap-center border border-line bg-background p-5 sm:w-[55vw] md:w-auto"
            >
              <span className="type-label text-em">{indexOf(index + 1)}</span>
              <h3 className="mt-3 mb-0 font-heading text-xl text-ink italic md:text-2xl">{step.title}</h3>
              <p className="mt-2 mb-0 text-sm text-text">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </Band>
    </>
  );
}
