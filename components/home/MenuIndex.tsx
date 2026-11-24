import { Reveal } from "@/components/motion/Reveal";
import { Band } from "@/components/shared/editorial/Band";
import { Cta } from "@/components/shared/editorial/Cta";
import { Label } from "@/components/shared/editorial/Label";
import { MenuIndexList } from "@/components/home/MenuIndexList";
import home from "@/constants/home/content.json";
import { SERVICES, treatmentCount } from "@/constants/services";
import { emphasis } from "@/utils/emphasis";

export type MenuRow = {
  slug: string;
  name: string;
  summary: string;
  image: string;
  imageAlt: string;
  count: number;
};

// The Menu as expanding image panels — discovery first, list second.
export function MenuIndex() {
  const { menu } = home;
  const rows: MenuRow[] = SERVICES.map((service) => ({
    slug: service.slug,
    name: service.name,
    summary: service.summary,
    image: service.image,
    imageAlt: service.imageAlt,
    count: treatmentCount(service),
  }));

  return (
    <Band tone="cream" ariaLabelledby="menu-title" contained={false} className="overflow-hidden">
      <div className="shell mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <Label index={2}>{menu.label}</Label>
          <Reveal y={28}>
            <h2 id="menu-title" className="mt-6 mb-0 type-title text-ink">
              {emphasis(menu.title)}
            </h2>
            <p className="mt-5 mb-0 max-w-md text-text">{menu.lede}</p>
          </Reveal>
        </div>
        <Cta href={menu.cta.href} variant="outline">
          {menu.cta.label}
        </Cta>
      </div>
      <div className="shell">
        <MenuIndexList rows={rows} />
      </div>
    </Band>
  );
}
