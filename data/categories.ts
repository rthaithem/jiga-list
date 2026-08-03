import { resources } from "./resources";
import type { Category } from "./schema";

export const categories: Category[] = [
  {
    slug: "movies",
    name: "Movies",
    shortName: "Movies",
    description: "Full-length films, streaming and download sources.",
    icon: "clapperboard",
    count: count("movies"),
  },
  {
    slug: "tv-shows",
    name: "TV Shows",
    shortName: "TV",
    description: "Series, seasonal content and box-set downloads.",
    icon: "monitor-play",
    count: count("tv-shows"),
  },
  {
    slug: "anime",
    name: "Anime",
    shortName: "Anime",
    description: "Animated series, films and subtitled/dubbed libraries.",
    icon: "sparkles",
    count: count("anime"),
  },
  {
    slug: "tools",
    name: "Tools",
    shortName: "Tools",
    description: "Utilities, editors and media software.",
    icon: "wrench",
    count: count("tools"),
  },
  {
    slug: "adblockers",
    name: "Adblockers",
    shortName: "Adblock",
    description: "Blockers, privacy add-ons and anti-tracking.",
    icon: "shield",
    count: count("adblockers"),
  },
  {
    slug: "android-apps",
    name: "Android Apps",
    shortName: "Android",
    description: "APKs, app mirrors and Play Store alternatives.",
    icon: "smartphone",
    count: count("android-apps"),
  },
];

function count(slug: string): number {
  return resources.filter((r) => r.categories.includes(slug)).length;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function resourcesForCategory(slug: string) {
  return resources.filter((r) => r.categories.includes(slug));
}
