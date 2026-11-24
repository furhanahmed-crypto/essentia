import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Band } from "@/components/shared/editorial/Band";
import { Cta } from "@/components/shared/editorial/Cta";
import { Label } from "@/components/shared/editorial/Label";
import home from "@/constants/home/content.json";
import { PACKAGES, packageShape } from "@/constants/packages";
import { ROUTES } from "@/constants/routes";
import type { SalonPackage } from "@/types/services";
import { emphasis } from "@/utils/emphasis";

// Dual-world packages: bridal/groom cinema strip + her/him ledgers.
export function Rituals() {
  const { rituals } = home;
  const female = PACKAGES.filter((pkg) => pkg.audience === "Female");
  const male = PACKAGES.filter((pkg) => pkg.audience === "Male");

  return (
    <Band tone="night" ariaLabelledby="rituals-title" contained={false}>
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Label index={4}>{rituals.label}</Label>
            <Reveal y={28}>
              <h2 id="rituals-title" className="mt-6 mb-0 type-title text-night-ink">
                {emphasis(rituals.title)}
              </h2>
              <p className="mt-5 mb-0 max-w-lg text-night-muted">{rituals.lede}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:justify-self-end">
            <Cta href={rituals.cta.href} className="bg-cream text-ink hover:bg-mist dark:bg-night-ink dark:text-night">
              {rituals.cta.label}
            </Cta>
          </div>
        </div>
      </div>

      <Reveal className="relative mt-12 grid w-full overflow-hidden md:mt-16 md:grid-cols-2">
        <div className="relative aspect-[16/10] md:aspect-[4/5] lg:aspect-auto lg:min-h-[28rem]">
          <Image
            src={rituals.image}
            alt={rituals.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[50%_28%]"
          />
          <p className="absolute bottom-6 left-6 m-0 bg-cream px-5 py-3 font-heading text-base text-ink italic md:text-lg">
            Pre-bridal journeys
          </p>
        </div>
        <div className="relative hidden aspect-[4/5] md:block lg:aspect-auto lg:min-h-[28rem]">
          <Image
            src="/images/rituals/groom.jpg"
            alt="Groom in an ivory sherwani"
            fill
            sizes="50vw"
            className="object-cover object-[50%_20%]"
          />
          <p className="absolute bottom-6 left-6 m-0 bg-cream px-5 py-3 font-heading text-base text-ink italic md:text-lg">
            Groom journeys
          </p>
        </div>
      </Reveal>

      <div className="shell mt-14 grid gap-12 md:mt-20 lg:grid-cols-2 lg:gap-16">
        <PackageColumn title="For her" packages={female} />
        <PackageColumn title="For him" packages={male} />
      </div>
    </Band>
  );
}

function PackageColumn({ title, packages }: { title: string; packages: SalonPackage[] }) {
  return (
    <div>
      <p className="m-0 type-label text-em">{title}</p>
      <ul className="mt-6 mb-0 border-t border-line p-0">
        {packages.map((pkg, index) => (
          <li key={pkg.id} className="list-none border-b border-line">
            <Reveal delay={index * 0.06}>
              <Link
                href={`${ROUTES.packages}#${pkg.id}`}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-5"
              >
                <span>
                  <span className="block font-heading text-xl text-night-ink transition-colors group-hover:text-em sm:text-2xl">
                    {pkg.name}
                  </span>
                  <span className="mt-1 block text-sm text-night-muted">{packageShape(pkg)}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.25}
                  className="size-5 text-night-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-night-ink"
                />
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
