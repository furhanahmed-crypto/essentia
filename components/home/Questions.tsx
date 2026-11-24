import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Reveal } from "@/components/motion/Reveal";
import { Band } from "@/components/shared/editorial/Band";
import { Cta } from "@/components/shared/editorial/Cta";
import { Icon } from "@/components/shared/Icon";
import { Label } from "@/components/shared/editorial/Label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import home from "@/constants/home/content.json";
import { WA } from "@/constants/whatsapp";
import { emphasis, indexOf } from "@/utils/emphasis";

// Centered FAQ ledger — quieter, more editorial than a two-column prompt.
export function Questions() {
  const { faq } = home;
  return (
    <Band tone="cream" ariaLabelledby="faq-title">
      <div className="mx-auto max-w-3xl text-center">
        <Label index={7} className="justify-center">
          {faq.label}
        </Label>
        <Reveal y={24}>
          <h2 id="faq-title" className="mt-6 mb-0 type-title text-ink">
            {emphasis(faq.title)}
          </h2>
        </Reveal>
        <p className="mx-auto mt-6 mb-0 max-w-md text-sm text-text">{faq.prompt}</p>
        <div className="mt-6 flex justify-center">
          <Cta href={WA.home} variant="line" external icon={<Icon icon={faWhatsapp} className="text-base" />}>
            Ask on WhatsApp
          </Cta>
        </div>
      </div>

      <Accordion defaultValue={[faq.items[0].q]} className="mx-auto mt-14 max-w-3xl border-t border-ink/80">
        {faq.items.map((item, index) => (
          <AccordionItem key={item.q} value={item.q} className="border-b border-line">
            <AccordionTrigger className="gap-5 py-7 text-left">
              <span className="type-label text-em tabular-nums">{indexOf(index + 1)}</span>
              <span className="flex-1 font-heading text-xl leading-snug text-ink sm:text-2xl">{item.q}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-8 pl-12 text-left">
              <p className="m-0 max-w-xl text-text">{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Band>
  );
}
