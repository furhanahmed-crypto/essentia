import { Appear } from "@/components/motion/Appear";
import { Band } from "@/components/shared/editorial/Band";
import { Label } from "@/components/shared/editorial/Label";
import content from "@/constants/packages/content.json";
import { EVERYDAY_SETS, setDetail } from "@/constants/packages";
import { emphasis, indexOf } from "@/utils/emphasis";

// Everyday grooming sets as a two-column ledger, her sets beside his. Each row names the set and
// spells out what it joins together. No prices, by design.
export function EverydaySets() {
  const { everyday } = content;
  return (
    <Band tone="ivory" ariaLabelledby="everyday-title">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Label index={1}>{everyday.label}</Label>
          <h2 id="everyday-title" className="mt-6 mb-0 type-title text-ink">
            {emphasis(everyday.title)}
          </h2>
        </div>
        <p className="m-0 max-w-sm text-text md:col-span-4 md:col-start-9 md:justify-self-end">{everyday.lede}</p>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-0">
        {EVERYDAY_SETS.map((pkg, column) => (
          <section
            key={pkg.id}
            id={pkg.id}
            aria-labelledby={`${pkg.id}-title`}
            className="scroll-mt-28 border-line lg:px-10 lg:first:border-r lg:first:pl-0 lg:last:pr-0"
          >
            <p className="m-0 type-label text-em">For {pkg.audience === "Female" ? "her" : "him"}</p>
            <h3 id={`${pkg.id}-title`} className="mt-3 mb-0 type-heading text-ink">
              {pkg.name}
            </h3>
            <p className="mt-2 mb-0 text-sm text-text">{pkg.summary}</p>
            <ol className="mt-8 mb-0 border-t border-ink/70 p-0">
              {pkg.items?.map((item, index) => (
                <Appear
                  as="li"
                  key={item.name}
                  delay={column * 0.1 + index * 0.05}
                  className="grid list-none grid-cols-[2.5rem_minmax(0,1fr)] border-b border-line py-5"
                >
                  <span className="pt-1 type-label text-ink/45">{indexOf(index + 1)}</span>
                  <span>
                    <span className="block font-heading text-lg text-ink">{item.name}</span>
                    <span className="mt-1.5 block text-sm text-text">{setDetail(item)}</span>
                  </span>
                </Appear>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </Band>
  );
}
