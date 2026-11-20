import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Appear } from "@/components/motion/Appear";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Band } from "@/components/shared/editorial/Band";
import { Cta } from "@/components/shared/editorial/Cta";
import { Label } from "@/components/shared/editorial/Label";
import home from "@/constants/home/content.json";
import { PACKAGES, packageShape } from "@/constants/packages";
import { ROUTES } from "@/constants/routes";
import { emphasis } from "@/utils/emphasis";

// Packages teaser: an arched bridal photograph beside a ledger of the four collections, each row
// showing who it is for and its shape (tiers or number of sets). No prices, by design.
export function Rituals() {
  const { rituals } = home;
  return (
    <Band tone="ivory" ariaLabelledby="rituals-title">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <MaskReveal className="arch aspect-[4/5] w-full max-w-[480px] bg-mist">
            <Image src={rituals.image} alt={rituals.imageAlt} fill sizes="(max-width: 1024px) 90vw, 480px" className="object-cover object-[50%_30%]" />
          </MaskReveal>
          <p className="absolute -right-2 bottom-10 m-0 hidden bg-background px-5 py-4 font-heading text-lg text-ink italic lg:block">
            Pre-bridal &amp; groom journeys
          </p>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <Label index={4}>{rituals.label}</Label>
          <Appear y={24}>
            <h2 id="rituals-title" className="mt-6 mb-0 type-title text-ink">
              {emphasis(rituals.title)}
            </h2>
            <p className="mt-6 mb-0 max-w-lg text-text">{rituals.lede}</p>
          </Appear>

          <ul className="mt-12 mb-0 border-t border-ink/80 p-0">
            {PACKAGES.map((pkg, index) => (
              <Appear as="li" key={pkg.id} delay={index * 0.08} className="list-none border-b border-line">
                <Link
                  href={`${ROUTES.packages}#${pkg.id}`}
                  className="group grid grid-cols-[5.5rem_minmax(0,1fr)_auto] items-baseline gap-4 py-5 sm:grid-cols-[7rem_minmax(0,1fr)_auto]"
                >
                  <span className="type-label text-em">{pkg.audience}</span>
                  <span>
                    <span className="block font-heading text-xl text-ink transition-colors group-hover:text-accent-deep sm:text-2xl">
                      {pkg.name}
                    </span>
                    <span className="mt-1 block text-sm text-text">{packageShape(pkg)}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.25}
                    className="size-5 text-ink/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  />
                </Link>
              </Appear>
            ))}
          </ul>
          <div className="mt-10">
            <Cta href={rituals.cta.href}>{rituals.cta.label}</Cta>
          </div>
        </div>
      </div>
    </Band>
  );
}
