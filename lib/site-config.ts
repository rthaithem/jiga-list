export const SITE_CONFIG = {
  name: "Jiga List",
  description: "A lightning-fast, database-less directory & wiki for high-quality streaming websites, Android apps, and adblockers.",
  url: "https://jiga-list.vercel.app",
  author: "rthaithem",
  githubRepo: "rthaithem/jiga-list",
  githubUrl: "https://github.com/rthaithem/jiga-list",
  githubIssuesUrl: "https://github.com/rthaithem/jiga-list/issues/new",
  githubContributorsApi: "https://api.github.com/repos/rthaithem/jiga-list/contributors",
  githubContributorsGraph: "https://github.com/rthaithem/jiga-list/graphs/contributors",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
