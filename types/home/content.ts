export type LookbookWeight = "feature" | "tall" | "small";

export type LookbookItem = {
  image: string;
  video?: string;
  alt: string;
  caption: string;
  service: string;
  weight: LookbookWeight;
};

export type StoryFrame = {
  line: string;
  image: string;
  imageAlt: string;
};

export type Fact = {
  value: string;
  label: string;
};

export type OccasionSide = {
  packageId: string;
  word: string;
  image: string;
  imageAlt: string;
  message: string;
};

export type Principle = {
  word: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  /** Where the bento tile leads (a service, packages or about). */
  href: string;
};

export type JourneyStep = {
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
};

export type GuestNote = {
  quote: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};
