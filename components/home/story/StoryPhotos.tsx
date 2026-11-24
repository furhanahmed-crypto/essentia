import Image from "next/image";
import { cn } from "cn";
import type { StoryFrame } from "@/types/home/content";

// Desktop: each frame floats at its own corner of the stage. Mobile: a small overlapping row.
const PLACEMENT = [
  "w-[44%] aspect-[4/3] lg:absolute lg:top-[9%] lg:left-[5%] lg:w-[15rem]",
  "w-[30%] aspect-[3/4] -ml-[6%] mt-10 lg:absolute lg:top-[14%] lg:right-[7%] lg:m-0 lg:w-[11rem]",
  "w-[36%] aspect-[4/5] -ml-[6%] lg:absolute lg:right-[17%] lg:bottom-[8%] lg:m-0 lg:w-[13rem]",
] as const;

export function StoryPhotos({ frames }: { frames: StoryFrame[] }) {
  return (
    <div className="relative mt-14 flex items-start justify-center lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0">
      {frames.map((frame, index) => (
        <div
          key={frame.image}
          className={cn("story-photo relative overflow-hidden bg-mist shadow-[0_30px_60px_-34px_rgba(52,51,48,0.55)]", PLACEMENT[index])}
        >
          <Image src={frame.image} alt={frame.imageAlt} fill sizes="(max-width: 1024px) 40vw, 240px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
