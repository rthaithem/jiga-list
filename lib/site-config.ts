export const SITE_CONFIG = {
  name: "Jiga List",
  description: "The ultimate community-curated wiki & open directory of verified free tools, AI, adblockers, streaming, educational courses, and open-source software.",
  url: "https://jigalist.pages.dev",
  author: "rthaithem",
  githubRepo: "rthaithem/jiga-list",
  githubUrl: "https://github.com/rthaithem/jiga-list",
  githubIssuesUrl: "https://github.com/rthaithem/jiga-list/issues/new",
  githubContributorsApi: "https://api.github.com/repos/rthaithem/jiga-list/contributors",
  githubContributorsGraph: "https://github.com/rthaithem/jiga-list/graphs/contributors",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
