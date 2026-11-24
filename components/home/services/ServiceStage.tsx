"use client";

import Image from "next/image";
import Link from "next/link";
import { ServiceDetail } from "@/components/home/services/ServiceDetail";
import { ServiceTabs } from "@/components/home/services/ServiceTabs";
import home from "@/constants/home/content.json";
import { SERVICES } from "@/constants/services";
import { useStageIndex } from "@/hooks/useStageIndex";

/**
 * Night stage: a vertical index of the five families beside one large photograph. Choosing a family
 * wipes its photo in over the last and re-sets the details. Mobile swaps the index for a photo row.
 */
export function ServiceStage() {
  const { menu } = home;
  const { active, select, layerState } = useStageIndex();
  const service = SERVICES[active];

  return (
    <section aria-labelledby="services-title" className="band-night overflow-hidden py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-10 lg:col-span-5 lg:justify-between">
          <div>
            <h2 id="services-title" className="m-0 max-w-md type-stage text-night-ink">
              {menu.title}
            </h2>
            <p className="mt-5 mb-0 max-w-sm text-sm leading-relaxed text-night-ink/65">{menu.lede}</p>
          </div>

          <div className="hidden lg:block">
            <ServiceTabs services={SERVICES} active={active} onSelect={select} variant="list" panelId="stage-panel" />
          </div>
          <div className="lg:hidden">
            <ServiceTabs services={SERVICES} active={active} onSelect={select} variant="tiles" panelId="tiles-panel" />
          </div>

          <Link href={menu.cta.href} className="link-draw hidden w-fit pb-1 type-kicker tracking-[0.16em] text-night-ink/80 uppercase lg:inline-block">
            {menu.cta.label} →
          </Link>
        </div>

        <div className="relative hidden h-[min(80svh,48rem)] overflow-hidden lg:col-span-7 lg:block">
          {SERVICES.map((item, index) => (
            <div key={item.slug} data-state={layerState(index)} className="stage-layer absolute inset-0">
              <div className="absolute inset-0">
                <Image src={item.image} alt={item.imageAlt} fill sizes="58vw" className="object-cover" priority={index === 0} />
              </div>
            </div>
          ))}
          <div aria-hidden className="absolute inset-0 z-[3] scrim-night" />
          <div
            id="stage-panel"
            role="tabpanel"
            aria-labelledby={`stage-panel-tab-${active}`}
            aria-live="polite"
            className="absolute inset-x-0 bottom-0 z-[4] p-10"
          >
            <ServiceDetail key={service.slug} service={service} />
          </div>
        </div>

        <div id="tiles-panel" role="tabpanel" aria-labelledby={`tiles-panel-tab-${active}`} aria-live="polite" className="lg:hidden">
          <ServiceDetail key={service.slug} service={service} />
        </div>
      </div>
    </section>
  );
}
