import { Appear } from "@/components/motion/Appear";
import { Band } from "@/components/shared/editorial/Band";
import { Label } from "@/components/shared/editorial/Label";
import content from "@/constants/about/content.json";
import { emphasis, indexOf } from "@/utils/emphasis";

// The promise on a night band: the tagline set as display type, three commitments beneath it in
// ruled columns.
export function AboutPromise() {
  const { mission } = content;
  return (
    <Band tone="night" ariaLabelledby="promise-title">
      <Label index={2}>{mission.label}</Label>
      <Appear y={28}>
        <h2 id="promise-title" className="mt-8 mb-0 max-w-5xl type-display text-night-ink">
          {emphasis(mission.title)}
        </h2>
      </Appear>
      <p className="mt-8 mb-0 max-w-lg type-lede text-night-muted">{mission.lead}</p>
      <ol className="mt-16 mb-0 grid border-t border-line p-0 md:grid-cols-3">
        {mission.points.map((point, index) => (
          <Appear
            as="li"
            key={point}
            delay={index * 0.1}
            className="list-none border-line py-8 max-md:border-b md:px-8 md:first:pl-0 md:[&:not(:last-child)]:border-r"
          >
            <span className="type-label text-em">{indexOf(index + 1)}</span>
            <p className="mt-4 mb-0 font-heading text-xl leading-snug text-night-ink">{point}</p>
          </Appear>
        ))}
      </ol>
    </Band>
  );
}
