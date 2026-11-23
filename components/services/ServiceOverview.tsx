import Image from "next/image";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Appear } from "@/components/motion/Appear";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Band } from "@/components/shared/editorial/Band";
import { Cta } from "@/components/shared/editorial/Cta";
import { Icon } from "@/components/shared/Icon";
import { Label } from "@/components/shared/editorial/Label";
import { treatmentCount } from "@/constants/services";
import { whatsappLink } from "@/constants/whatsapp";
import type { ServiceCategory } from "@/types/services";

interface ServiceOverviewProps {
  service: ServiceCategory;
  label: string;
}

// Chapter opening: the long description set large on the left with two facts and the enquiry
// actions; a two-photograph collage on the right (a tall frame with an arched inset over it).
export function ServiceOverview({ service, label }: ServiceOverviewProps) {
  const facts = [
    { value: String(treatmentCount(service)), label: "Treatments listed" },
    { value: String(service.groups.length).padStart(2, "0"), label: service.groups.length === 1 ? "Collection" : "Collections" },
  ];
  return (
    <Band tone="ivory" className="pt-10 md:pt-16">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Label index={1} as="h2">{label}</Label>
          <Appear y={24}>
            <p className="mt-8 mb-0 font-heading text-2xl leading-[1.45] font-normal tracking-tight text-ink sm:text-[2rem]">
              {service.about}
            </p>
          </Appear>
          <dl className="mt-12 grid max-w-md grid-cols-2 border-t border-line">
            {facts.map((fact) => (
              <div key={fact.label} className="border-line pt-6 pr-6 [&:first-child]:border-r">
                <dt className="font-heading text-5xl tracking-tight text-ink">{fact.value}</dt>
                <dd className="mt-2 mb-0 type-label text-ink/60">{fact.label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Cta
              href={whatsappLink(`Hi, I'd like to know more about ${service.name} at Essentia.`)}
              external
              icon={<Icon icon={faWhatsapp} className="text-base" />}
            >
              Enquire about {service.short}
            </Cta>
          </div>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <MaskReveal className="aspect-[4/5] w-[82%] bg-mist">
            <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 1024px) 75vw, 440px" className="object-cover" />
          </MaskReveal>
          <MaskReveal
            delay={0.35}
            className="arch absolute right-0 -bottom-12 aspect-[3/4] w-[46%] border-[6px] border-background bg-mist"
          >
            <Image src={service.image_secondary} alt={service.imageSecondaryAlt} fill sizes="260px" className="object-cover" />
          </MaskReveal>
        </div>
      </div>
    </Band>
  );
}
