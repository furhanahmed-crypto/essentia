import Image from "next/image";
import { Appear } from "@/components/motion/Appear";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { Band } from "@/components/shared/editorial/Band";
import { Label } from "@/components/shared/editorial/Label";
import content from "@/constants/about/content.json";
import { emphasis } from "@/utils/emphasis";

// The story as a magazine feature: a drop-capped opening paragraph, a pull quote breaking into the
// margin, and an arched collage of the real lounge with a product still life.
export function AboutStory() {
  const { story } = content;
  const [opening, ...rest] = story.body;
  return (
    <Band tone="ivory" ariaLabelledby="story-title">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Label index={1}>{story.label}</Label>
          <Appear y={24}>
            <h2 id="story-title" className="mt-6 mb-0 type-title text-ink">
              {emphasis(story.title)}
            </h2>
          </Appear>
          <Appear y={20} delay={0.1}>
            <p className="mt-12 mb-0 type-lede text-text first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-heading first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:text-ink">
              {opening}
            </p>
          </Appear>
          <blockquote className="my-12 border-l-2 border-primary pl-6 lg:-ml-8">
            <p className="m-0 font-heading text-2xl leading-snug text-ink italic sm:text-3xl">“{story.pullQuote}”</p>
          </blockquote>
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="m-0 type-lede text-text">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <MaskReveal className="arch aspect-[3/4] w-[78%] bg-mist">
            <Image src={story.image} alt={story.imageAlt} fill sizes="(max-width: 1024px) 70vw, 400px" className="object-cover" />
          </MaskReveal>
          <MaskReveal delay={0.3} className="absolute right-0 -bottom-10 aspect-square w-[48%] border-[6px] border-background bg-mist">
            <Image src={story.secondaryImage} alt={story.secondaryImageAlt} fill sizes="260px" className="object-cover" />
          </MaskReveal>
        </div>
      </div>
    </Band>
  );
}
