export type WorkEmbedConfig = {
  /** URL of the running example to embed. */
  src: string;
  /** Accessible title for the embedded frame. */
  title: string;
  /** Tailwind aspect ratio class, e.g. "aspect-video". Defaults to "aspect-video". */
  aspect?: string;
};

export type WorkItem = {
  /** URL segment: /work/<slug> */
  slug: string;
  eyebrow: string;
  title: string;
  /** One-line blurb shown on the card. */
  subtitle: string;
  image: string;
  imageAlt: string;
  imageMode?: "cover" | "logo";
  /** Paragraphs of the description shown on the detail page. */
  body: string[];
  /** Leads the grid and gets the green glow treatment. */
  pinned?: boolean;
  /** Live, running example. Left undefined until an embed exists. */
  embed?: WorkEmbedConfig;
};

const PLACEHOLDER = "/work/placeholder.svg";
const COMING_SOON = "Coming soon.";

const ITEMS: WorkItem[] = [
  {
    slug: "solo-soloing",
    eyebrow: "Featured project",
    title: "solo-soloing",
    subtitle: COMING_SOON,
    image: PLACEHOLDER,
    imageAlt: "solo-soloing preview",
    pinned: true,
    body: ["Write-up coming soon."],
  },
  {
    slug: "analog-ekg",
    eyebrow: "Biomedical hardware",
    title: "analog EKG",
    subtitle: COMING_SOON,
    image: PLACEHOLDER,
    imageAlt: "analog EKG preview",
    body: ["Write-up coming soon."],
  },
  {
    slug: "space-racing",
    eyebrow: "Game",
    title: "SPACE-RACING",
    subtitle: COMING_SOON,
    image: PLACEHOLDER,
    imageAlt: "SPACE-RACING preview",
    body: ["Write-up coming soon."],
  },
  {
    slug: "escape-room-puzzle",
    eyebrow: "Embedded systems",
    title: "Escape room puzzle",
    subtitle: COMING_SOON,
    image: PLACEHOLDER,
    imageAlt: "Escape room puzzle preview",
    body: ["Write-up coming soon."],
  },
];

/** Pinned items lead the grid, so the pin can't drift if entries are reordered. */
export const WORK_ITEMS: WorkItem[] = [...ITEMS].sort(
  (a, b) => Number(b.pinned ?? false) - Number(a.pinned ?? false),
);

export function getWorkItem(slug: string): WorkItem | undefined {
  return WORK_ITEMS.find((item) => item.slug === slug);
}
