import { Fragment } from "react";
import Image from "next/image";
import { Appear } from "@/components/motion/Appear";
import { Band } from "@/components/shared/editorial/Band";
import { Cta } from "@/components/shared/editorial/Cta";
import { Label } from "@/components/shared/editorial/Label";
import home from "@/constants/home/content.json";
import { emphasis } from "@/utils/emphasis";

// Manifesto: one long sentence set large across the page, with small arched photographs sitting
// inline beside the words they illustrate. Three facts follow, divided by vertical hairlines.
export function Statement() {
  const { statement } = home;
  return (
    <Band tone="ivory" ariaLabelledby="statement-title" className="border-t border-line">
      <div className="grid gap-10 lg:grid-cols-12">
        <Label index={1} className="lg:col-span-2 lg:pt-4">
          {statement.label}
        </Label>
        <Appear y={28} className="lg:col-span-10">
          <h2 id="statement-title" className="m-0 type-title text-ink">
            {statement.before}{" "}
            {statement.chips.map((chip) => (
              <Fragment key={chip.word}>
                <span className="whitespace-nowrap">
                  <span
                    aria-hidden
                    className="arch relative mx-[0.12em] inline-block h-[0.82em] w-[0.62em] translate-y-[0.08em] align-baseline"
                  >
                    <Image src={chip.image} alt="" fill sizes="64px" className="object-cover" />
                  </span>
                  {chip.word}
                </span>{" "}
              </Fragment>
            ))}
            {emphasis(statement.after)}
          </h2>
        </Appear>
      </div>

      <dl className="mt-20 grid border-t border-line sm:grid-cols-3 lg:ml-[16.66%]">
        {statement.facts.map((fact, index) => (
          <Appear
            key={fact.label}
            delay={index * 0.1}
            className="border-line py-8 max-sm:border-b sm:px-8 sm:first:pl-0 sm:[&:not(:last-child)]:border-r"
          >
            <dt className="m-0 font-heading text-4xl tracking-tight text-ink md:text-5xl">{fact.value}</dt>
            <dd className="mt-3 mb-0 max-w-[16rem] text-sm text-text">{fact.label}</dd>
          </Appear>
        ))}
      </dl>
      <div className="mt-10 lg:ml-[16.66%]">
        <Cta href={statement.cta.href} variant="line">
          {statement.cta.label}
        </Cta>
      </div>
    </Band>
  );
}
