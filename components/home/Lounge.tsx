import Image from "next/image";
import { Appear } from "@/components/motion/Appear";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Band } from "@/components/shared/editorial/Band";
import { Label } from "@/components/shared/editorial/Label";
import home from "@/constants/home/content.json";
import { emphasis, indexOf } from "@/utils/emphasis";

const NUMERALS = ["I", "II", "III", "IV"] as const;

// The night band: the real Essentia lounge photograph, four principles set in a ruled two-by-two,
// and the visit told as four short movements along a single hairline.
export function Lounge() {
  const { lounge } = home;
  return (
    <Band tone="night" ariaLabelledby="lounge-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Label index={5}>{lounge.label}</Label>
          <Appear y={24}>
            <h2 id="lounge-title" className="mt-6 mb-0 type-title text-night-ink">
              {emphasis(lounge.title)}
            </h2>
          </Appear>
          <figure className="mt-12 mb-0">
            <MaskReveal className="aspect-[16/9] w-full bg-white/5">
              <Image src={lounge.image} alt={lounge.imageAlt} fill sizes="(max-width: 1024px) 90vw, 520px" className="object-cover" />
            </MaskReveal>
            <figcaption className="mt-4 type-label text-night-muted">{lounge.caption}</figcaption>
          </figure>
        </div>

        <ol className="m-0 grid self-end border-t border-line p-0 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {lounge.principles.map((principle, index) => (
            <Appear
              as="li"
              key={principle.title}
              delay={index * 0.08}
              className="list-none border-b border-line py-10 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
            >
              <span className="font-heading text-sm text-em italic">{NUMERALS[index]}.</span>
              <h3 className="mt-5 mb-0 type-heading text-night-ink">{principle.title}</h3>
              <p className="mt-3 mb-0 text-sm leading-relaxed text-night-muted">{principle.text}</p>
            </Appear>
          ))}
        </ol>
      </div>

      <div className="mt-24 md:mt-32">
        <p className="m-0 type-label text-night-muted">{lounge.visitLabel}</p>
        <ol className="mt-8 mb-0 grid gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {lounge.steps.map((step, index) => (
            <Appear as="li" key={step.title} delay={index * 0.1} className="relative list-none border-t border-line pt-8 pr-6">
              <span aria-hidden className="absolute -top-[5px] left-0 size-[9px] rounded-full bg-primary" />
              <span className="type-label text-em">{indexOf(index + 1)}</span>
              <h3 className="mt-3 mb-0 font-heading text-2xl text-night-ink italic">{step.title}</h3>
              <p className="mt-3 mb-0 max-w-[16rem] text-sm text-night-muted">{step.text}</p>
            </Appear>
          ))}
        </ol>
      </div>
    </Band>
  );
}
