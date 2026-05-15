export type MediaItem = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  imageAlt: string;
  imageMode?: "cover" | "logo";
};

const PLACEHOLDER = "/media/placeholder.svg";

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: "npr-shortwave",
    eyebrow: "NPR · Short Wave",
    title: "Untitled segment",
    subtitle: "Featured on NPR's daily science podcast.",
    href: "https://www.npr.org/podcasts/510351/short-wave",
    image: "/logo-shortwave.png",
    imageAlt: "NPR Short Wave logo",
    imageMode: "logo",
  },
  {
    id: "npr-atc",
    eyebrow: "NPR · All Things Considered",
    title: "Untitled segment",
    subtitle: "Featured on NPR's evening news magazine.",
    href: "https://www.npr.org/programs/all-things-considered",
    image: "/logo-atc.png",
    imageAlt: "NPR All Things Considered logo",
    imageMode: "logo",
  },
  {
    id: "lecture",
    eyebrow: "Lecture",
    title: "Untitled lecture",
    subtitle: "A talk on machine learning and audio.",
    href: "#",
    image: PLACEHOLDER,
    imageAlt: "Lecture cover",
  },
  {
    id: "bioengineer",
    eyebrow: "Bioengineer.org",
    title: "Untitled segment",
    subtitle: "A profile in Bioengineer.org.",
    href: "https://bioengineer.org",
    image: PLACEHOLDER,
    imageAlt: "Bioengineer.org cover",
  },
  {
    id: "eureka",
    eyebrow: "Eureka",
    title: "Untitled article",
    subtitle: "An article in Eureka.",
    href: "#",
    image: PLACEHOLDER,
    imageAlt: "Eureka article cover",
  },
];
