import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Plus } from "lucide-react";
import { Appear } from "@/components/motion/Appear";
import { Band } from "@/components/shared/editorial/Band";
import { Cta } from "@/components/shared/editorial/Cta";
import { Icon } from "@/components/shared/Icon";
import { Label } from "@/components/shared/editorial/Label";
import home from "@/constants/home/content.json";
import { WA } from "@/constants/whatsapp";
import { emphasis, indexOf } from "@/utils/emphasis";

// FAQ: heading and a contact prompt on the left; native <details> rows on the right, ruled with
// hairlines. No script needed, keyboard and screen-reader friendly out of the box.
export function Questions() {
  const { faq } = home;
  return (
    <Band tone="cream" ariaLabelledby="faq-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Label index={7}>{faq.label}</Label>
          <Appear y={24}>
            <h2 id="faq-title" className="mt-6 mb-0 type-title text-ink">
              {emphasis(faq.title)}
            </h2>
          </Appear>
          <p className="mt-8 mb-0 max-w-xs text-sm text-text">{faq.prompt}</p>
          <div className="mt-6">
            <Cta href={WA.home} variant="line" external icon={<Icon icon={faWhatsapp} className="text-base" />}>
              Ask on WhatsApp
            </Cta>
          </div>
        </div>

        <div className="border-t border-ink/80 lg:col-span-7 lg:col-start-6">
          {faq.items.map((item, index) => (
            <details key={item.q} name="faq" className="group border-b border-line" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-baseline gap-5 py-7 [&::-webkit-details-marker]:hidden">
                <span className="type-label text-em tabular-nums">{indexOf(index + 1)}</span>
                <span className="flex-1 font-heading text-xl leading-snug text-ink sm:text-2xl">{item.q}</span>
                <Plus
                  aria-hidden
                  strokeWidth={1.25}
                  className="size-5 shrink-0 self-center text-ink transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="m-0 max-w-xl pb-8 pl-10 text-text">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Band>
  );
}
