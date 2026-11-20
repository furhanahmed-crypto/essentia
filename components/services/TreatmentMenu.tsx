import { Appear } from "@/components/motion/Appear";
import { Band } from "@/components/shared/editorial/Band";
import { Label } from "@/components/shared/editorial/Label";
import type { ServiceGroup } from "@/types/services";
import { emphasis, indexOf } from "@/utils/emphasis";

interface TreatmentMenuProps {
  groups: ServiceGroup[];
  label: string;
  title: string;
  note: string;
}

const anchor = (title: string) =>
  `menu-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

// The treatments laid out like a printed salon menu: a pinned index of collections on the left,
// and each collection on the right with its items flowing in two ruled columns. Never prices.
export function TreatmentMenu({ groups, label, title, note }: TreatmentMenuProps) {
  const showIndex = groups.length > 1;
  return (
    <Band tone="cream" ariaLabelledby="menu-list-title" className="mt-12">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Label index={2}>{label}</Label>
          <h2 id="menu-list-title" className="mt-6 mb-0 type-title text-ink">
            {emphasis(title)}
          </h2>
        </div>
        <p className="m-0 max-w-sm text-sm text-text md:col-span-4 md:col-start-9 md:justify-self-end">{note}</p>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
        {showIndex ? (
          <nav aria-label="Collections" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-32 m-0 border-t border-line p-0">
              {groups.map((group, index) => (
                <li key={group.title} className="list-none border-b border-line">
                  <a href={`#${anchor(group.title)}`} className="flex gap-4 py-3 text-sm text-ink/70 transition-colors hover:text-ink">
                    <span className="type-label text-em">{indexOf(index + 1)}</span>
                    {group.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className={showIndex ? "lg:col-span-9" : "lg:col-span-12"}>
          {groups.map((group, index) => (
            <Appear
              as="section"
              key={group.title}
              id={anchor(group.title)}
              aria-labelledby={`${anchor(group.title)}-title`}
              className="scroll-mt-28 border-t border-ink/70 pt-6 pb-14 last:pb-0"
            >
              <header className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="type-label text-em">{indexOf(index + 1)}</span>
                <h3 id={`${anchor(group.title)}-title`} className="m-0 type-heading text-ink italic">
                  {group.title}
                </h3>
                <span className="ml-auto type-label text-ink/50">{group.items.length} treatments</span>
              </header>
              {group.note ? <p className="mt-2 mb-0 pl-10 text-sm text-text">{group.note}</p> : null}
              <ul className="mt-6 mb-0 gap-x-12 p-0 sm:columns-2 sm:pl-10">
                {group.items.map((item) => (
                  <li key={item} className="list-none break-inside-avoid border-b border-line py-3 text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Appear>
          ))}
        </div>
      </div>
    </Band>
  );
}
