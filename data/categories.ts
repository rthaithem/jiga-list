import { resources } from "./resources";
import type { Category } from "./schema";

export const categories: Category[] = [
  {
    slug: "wiki",
    name: "Wiki",
    shortName: "Wiki",
    description: "Community encyclopedias, megathreads, cheat-sheets, and curated digital knowledge bases.",
    icon: "book-open",
    count: count("wiki"),
  },
  {
    slug: "adblocking-privacy",
    name: "Adblocking / Privacy",
    shortName: "Privacy",
    description: "Advanced adblockers, DNS filtering, tracker defense, private VPNs, and cybersecurity guides.",
    icon: "shield-check",
    count: count("adblocking-privacy"),
  },
  {
    slug: "ai",
    name: "Artificial Intelligence",
    shortName: "AI",
    description: "Large language models, local LLM runtimes, AI image & code tools, and open-source models.",
    icon: "bot",
    count: count("ai"),
  },
  {
    slug: "movies-tv-anime",
    name: "Movies / TV / Anime",
    shortName: "Movies & TV",
    description: "Clean HD streaming services, anime simulcasts, media scrapers, and subtitle aggregators.",
    icon: "film",
    count: count("movies-tv-anime"),
  },
  {
    slug: "music-podcasts-radio",
    name: "Music / Podcasts / Radio",
    shortName: "Music & Audio",
    description: "Ad-free music streaming, worldwide live radio stations, open podcast players, and lossless audio.",
    icon: "headphones",
    count: count("music-podcasts-radio"),
  },
  {
    slug: "gaming-emulation",
    name: "Gaming / Emulation",
    shortName: "Gaming",
    description: "Multi-system video game emulators, open-source game engines, ROM hubs, and indie archives.",
    icon: "gamepad-2",
    count: count("gaming-emulation"),
  },
  {
    slug: "books-comics-manga",
    name: "Books / Comics / Manga",
    shortName: "Books & Manga",
    description: "Public domain libraries, scholarly open-access repositories, digital comics, and manga readers.",
    icon: "book",
    count: count("books-comics-manga"),
  },
  {
    slug: "downloading",
    name: "Downloading",
    shortName: "Downloading",
    description: "High-speed multi-connection download managers, media extractors, cloud mirrors, and yt-dlp frontends.",
    icon: "download",
    count: count("downloading"),
  },
  {
    slug: "torrenting",
    name: "Torrenting",
    shortName: "Torrenting",
    description: "Open-source BitTorrent clients, public DHT search engines, verified trackers, and seeding safety.",
    icon: "zap",
    count: count("torrenting"),
  },
  {
    slug: "educational",
    name: "Educational",
    shortName: "Educational",
    description: "Interactive coding portals, university courseware, peer-reviewed textbooks, and STEM learning hubs.",
    icon: "graduation-cap",
    count: count("educational"),
  },
  {
    slug: "android",
    name: "Android",
    shortName: "Android",
    description: "F-Droid repositories, open-source apps, safe developer APK mirrors, and debloat utilities.",
    icon: "smartphone",
    count: count("android"),
  },
  {
    slug: "ios",
    name: "iOS",
    shortName: "iOS",
    description: "Sideloading tools, open-source IPA managers, jailbreak resources, and privacy apps for iPhone & iPad.",
    icon: "tablet-smartphone",
    count: count("ios"),
  },
  {
    slug: "linux",
    name: "Linux",
    shortName: "Linux",
    description: "Popular distributions, Flatpak/AppImage app stores, sysadmin documentation, and command line tools.",
    icon: "terminal",
    count: count("linux"),
  },
  {
    slug: "macos",
    name: "macOS",
    shortName: "macOS",
    description: "Homebrew formulas, open-source Mac utilities, window management tools, and native software.",
    icon: "laptop",
    count: count("macos"),
  },
  {
    slug: "non-english",
    name: "Non-English",
    shortName: "Non-English",
    description: "International communities, Arabic, French, Spanish, and multi-language streaming & software portals.",
    icon: "globe",
    count: count("non-english"),
  },
  {
    slug: "miscellaneous",
    name: "Miscellaneous",
    shortName: "Miscellaneous",
    description: "Essential online tools, disposable temporary inboxes, file converters, speed tests, and privacy checkers.",
    icon: "box",
    count: count("miscellaneous"),
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
