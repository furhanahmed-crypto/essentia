import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "@/components/shared/Icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import home from "@/constants/home/content.json";
import { WA } from "@/constants/whatsapp";
import { indexOf } from "@/utils/emphasis";

/** A large title that stays put on desktop while the questions open beside it as soft sage panels. */
export function Faq() {
  const { faq } = home;
  return (
    <section aria-labelledby="faq-title" className="bg-card py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <p className="m-0 type-kicker tracking-[0.18em] text-accent-deep uppercase">{faq.label}</p>
            <h2 id="faq-title" className="mt-5 mb-0 type-poster text-ink">
              {faq.title}
            </h2>
            <p className="mt-6 mb-0 max-w-sm text-sm leading-relaxed text-muted-foreground">{faq.prompt}</p>
            <a
              href={WA.home}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 type-kicker tracking-[0.12em] text-background uppercase transition-colors hover:bg-accent-deep"
            >
              <Icon icon={faWhatsapp} className="text-base" /> Ask on WhatsApp
            </a>
          </div>
        </div>

        <Accordion defaultValue={[faq.items[0].q]} className="gap-3 lg:col-span-7">
          {faq.items.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={item.q}
              className="rounded-3xl border border-ink/10 transition-colors duration-500 data-[open]:border-transparent data-[open]:bg-background"
            >
              <AccordionTrigger className="gap-5 px-6 py-6 sm:px-8">
                <span className="w-7 shrink-0 font-heading text-lg text-accent-deep tabular-nums">{indexOf(index + 1)}</span>
                <span className="flex-1 font-heading text-xl leading-snug text-ink sm:text-2xl">{item.q}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-7 pl-[4.5rem] sm:px-8 sm:pl-[5rem]">
                <p className="m-0 max-w-lg text-[0.95rem] leading-relaxed text-ink/80">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
