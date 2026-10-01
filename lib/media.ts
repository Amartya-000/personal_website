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
    title:
      "This week in science: Sunscreen from fish, art and aging, and a sustainable marimba",
    subtitle:
      "Short Wave covers my search for a cheaper, more sustainable alternative to Honduran rosewood marimba bars.",
    href: "https://www.npr.org/2026/05/14/nx-s1-5815265/this-week-in-science-sunscreen-from-fish-art-and-aging-and-a-sustainable-marimba",
    image: "/logo-shortwave.png",
    imageAlt: "NPR Short Wave logo",
    imageMode: "logo",
  },
  {
    id: "npr-atc",
    eyebrow: "NPR · All Things Considered",
    title: "All Things Considered for May 14, 2026",
    subtitle:
      "The Short Wave science roundup aired on NPR's evening news magazine.",
    href: "https://www.npr.org/programs/all-things-considered/2026/05/14/all-things-considered-for-may-14-2026",
    image: "/logo-atc.png",
    imageAlt: "NPR All Things Considered logo",
    imageMode: "logo",
  },
  {
    id: "lecture",
    eyebrow: "Lecture",
    title: "Coming soon",
    subtitle: "A talk on machine learning and audio.",
    href: "#",
    image: PLACEHOLDER,
    imageAlt: "Lecture cover",
  },
  {
    id: "bioengineer",
    eyebrow: "Bioengineer.org",
    title: "Coming soon",
    subtitle: "A profile in Bioengineer.org.",
    href: "https://bioengineer.org",
    image: PLACEHOLDER,
    imageAlt: "Bioengineer.org cover",
  },
  {
    id: "eureka",
    eyebrow: "Eureka",
    title: "Coming soon",
    subtitle: "An article in Eureka.",
    href: "#",
    image: PLACEHOLDER,
    imageAlt: "Eureka article cover",
  },
];
