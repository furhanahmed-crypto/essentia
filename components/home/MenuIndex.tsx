import { Appear } from "@/components/motion/Appear";
import { Band } from "@/components/shared/editorial/Band";
import { Cta } from "@/components/shared/editorial/Cta";
import { Label } from "@/components/shared/editorial/Label";
import { MenuIndexList } from "@/components/home/MenuIndexList";
import home from "@/constants/home/content.json";
import { SERVICES, treatmentCount } from "@/constants/services";
import { emphasis } from "@/utils/emphasis";

// "The Menu": the six service families as large numbered rows. The heading column stays pinned
// while the list scrolls; hovering or focusing a row brings up that discipline's photograph.
export function MenuIndex() {
  const { menu } = home;
  const rows = SERVICES.map((service) => ({
    slug: service.slug,
    name: service.name,
    summary: service.summary,
    image: service.image,
    imageAlt: service.imageAlt,
    count: treatmentCount(service),
  }));

  return (
    <Band tone="cream" ariaLabelledby="menu-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Label index={2}>{menu.label}</Label>
            <Appear y={24}>
              <h2 id="menu-title" className="mt-6 mb-0 type-title text-ink">
                {emphasis(menu.title)}
              </h2>
              <p className="mt-6 mb-0 max-w-sm text-text">{menu.lede}</p>
            </Appear>
            <div className="mt-10">
              <Cta href={menu.cta.href} variant="outline">
                {menu.cta.label}
              </Cta>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <MenuIndexList rows={rows} />
        </div>
      </div>
    </Band>
  );
}
