import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Band } from "@/components/shared/editorial/Band";
import { Cta } from "@/components/shared/editorial/Cta";
import { Label } from "@/components/shared/editorial/Label";
import home from "@/constants/home/content.json";
import { emphasis } from "@/utils/emphasis";

type Fact = {
  value: string;
  label: string;
  countTo?: number;
  pad?: number;
  suffix?: string;
};

// Lounge intro: shorter manifesto beside a photo mosaic; facts count up on scroll.
export function Statement() {
  const { statement } = home;
  const [a, b, c] = statement.chips;
  const facts = statement.facts as Fact[];

  return (
    <Band tone="ivory" ariaLabelledby="statement-title" className="overflow-hidden">
      <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Label index={1}>{statement.label}</Label>
          <Reveal y={28}>
            <h2 id="statement-title" className="mt-6 mb-0 max-w-md type-title text-ink">
              {statement.before}{" "}
              <em className="text-em italic">{a.word.replace(",", "")}</em>
              {", "}
              <em className="text-em italic">{b.word.replace(",", "")}</em>
              {", "}
              <em className="text-em italic">{c.word}</em>{" "}
              {emphasis(statement.after)}
            </h2>
          </Reveal>
          <div className="mt-8">
            <Cta href={statement.cta.href} variant="line">
              {statement.cta.label}
            </Cta>
          </div>
        </div>

        <div className="relative grid grid-cols-12 gap-3 sm:gap-4 lg:col-span-7 lg:min-h-[28rem]">
          <Reveal className="relative col-span-7 aspect-[3/4] overflow-hidden bg-mist sm:col-span-6 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[48%]" delay={0.05}>
            <Image src={a.image} alt="" fill sizes="(max-width: 1024px) 55vw, 300px" className="object-cover" />
          </Reveal>
          <Reveal className="relative col-span-5 aspect-[3/4] self-end overflow-hidden bg-mist sm:col-span-5 sm:col-start-8 lg:absolute lg:top-[8%] lg:right-0 lg:aspect-auto lg:h-[55%] lg:w-[42%]" delay={0.15}>
            <Image src={b.image} alt="" fill sizes="(max-width: 1024px) 40vw, 240px" className="object-cover" />
          </Reveal>
          <Reveal className="relative col-span-8 col-start-5 -mt-8 aspect-[5/3] overflow-hidden bg-mist sm:col-span-6 sm:col-start-4 lg:absolute lg:right-[18%] lg:bottom-0 lg:mt-0 lg:aspect-auto lg:h-[36%] lg:w-[46%]" delay={0.25}>
            <Image src={c.image} alt="" fill sizes="(max-width: 1024px) 60vw, 280px" className="object-cover" />
          </Reveal>
        </div>
      </div>

      <dl className="mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-3 sm:gap-0">
        {facts.map((fact, index) => (
          <Reveal
            key={fact.label}
            delay={index * 0.08}
            className="sm:border-line sm:px-8 sm:first:pl-0 sm:[&:not(:last-child)]:border-r"
          >
            <dt className="m-0 font-heading text-[clamp(2.25rem,4vw,3.25rem)] leading-none tracking-tight text-ink">
              {typeof fact.countTo === "number" ? (
                <CountUp to={fact.countTo} pad={fact.pad} suffix={fact.suffix} />
              ) : (
                fact.value
              )}
            </dt>
            <dd className="mt-3 mb-0 max-w-[14rem] text-sm text-text">{fact.label}</dd>
          </Reveal>
        ))}
      </dl>
    </Band>
  );
}
