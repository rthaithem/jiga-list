# Jiga List

A lightning-fast, database-less directory & wiki web application (FMHY clone) built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI**.

Every resource is indexed at **build time** and served as **static HTML (SSG)** — zero backend, zero database, zero server costs.

## What is Jiga List?

Jiga List is a community-curated **link index and wiki** for finding the best streaming sites, download sources, tools, adblockers and Android apps — all in one place.

**What it does for visitors:**

- **Discovers** the best free resources across Movies, TV Shows, Anime, Tools, Adblockers and Android apps.
- **Searches instantly** — press `Ctrl K` / `Cmd K` (or `/`) anywhere to fuzzy-search the entire index and jump straight to a result.
- **Filters quickly** — every category has filter chips (`All`, `Free`, `No Ads`, `Open Source`, `Recommended`) plus an inline text filter to narrow hundreds of links to a handful in one keystroke.
- **Verifies status** — each card carries status badges (⭐ Recommended, 🌐 Mirror, ⚠️ Ads, ☑ Verified, 🧩 Open Source, …) so you know what you are getting before you click.
- **Saves time** — one-click **Copy URL**, a **Mirrors** dialog with alternate domains, and a **Report Broken Link** flow to keep the index healthy.

**What it does for maintainers:**

- **Zero infrastructure** — content is plain typed data in `data/resources.ts`. No CMS, no database, no server. Deploy to any static host for free.
- **Type-safe** — every entry is validated by the TypeScript schema at build time; a typo breaks the build, not the site.
- **Instant updates** — edit a resource, push, and the whole index regenerates in seconds.
- **Statically generated** — every category and detail page is prerendered at build time for near-instant first paint anywhere in the world.

## Features

- **Instant Global Search (Cmd+K / Ctrl+K / `/`)** — Shadcn `Command` palette with Fuse.js fuzzy search across all categories, tags, titles, and descriptions. Instant redirection on select.
- **Responsive layout** — collapsible sidebar navigation tree with per-category icons and live resource counts; drawer navigation on mobile.
- **High-density Resource Cards** — tags, status flags (⭐ Recommended, 🌐 Mirror, ⚠️ Ads, ☑ Verified, …), one-click **Copy URL**, **View Mirrors**, and **Report Broken Link**.
- **Filter chips** per category — `All`, `Free`, `No Ads`, `Open Source`, `Recommended` plus an inline text filter.
- **Dark mode default** — deep zinc palette with a cyan accent, light-mode toggle, and a language switcher.
- **Database-less** — content lives in typed `data/resources.ts`; validated by the TypeScript schema at build time.

## Tech Stack

| Layer       | Choice                                          |
| ----------- | ----------------------------------------------- |
| Framework   | Next.js 14+ (App Router, SSG)                   |
| Language    | TypeScript (strict)                             |
| Styling     | Tailwind CSS                                    |
| Components  | Shadcn/UI (Card, Badge, Button, Dialog, Command, Tabs, Tooltip, ScrollArea, DropdownMenu) |
| Icons       | Lucide React                                    |
| Search      | Fuse.js                                         |
| Theming     | next-themes                                     |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build   # type-checks, lints, and prerenders all pages
npm run start
```

The build output is fully static — every category and resource page is generated at build time (`generateStaticParams`).

To produce a pure HTML export for static hosts (GitHub Pages, Cloudflare Pages, S3, nginx, …), set `output: "export"` in `next.config.mjs` and run `npm run build` — the site lands in `./out`. See the [Deployment](#deployment) section.

## Project Structure

```
├─ app/
│  ├─ layout.tsx                 # metadata, fonts, ThemeProvider, AppShell
│  ├─ shell.tsx                  # client shell (Sidebar + Header + palette + keyboard shortcuts)
│  ├─ page.tsx                   # home: stats, category grid, editor's picks
│  ├─ globals.css                # design tokens, dark theme, scrollbars
│  ├─ loading.tsx / not-found.tsx
│  ├─ category/[slug]/page.tsx   # SSG category pages
│  └─ r/[id]/page.tsx            # SSG resource detail pages
├─ components/
│  ├─ sidebar.tsx / mobile-nav.tsx / header.tsx
│  ├─ search-palette.tsx         # Cmd+K fuzzy search
│  ├─ resource-card.tsx          # Visit / Copy / Mirrors / Report actions
│  ├─ resource-list.tsx          # filter chips + inline search
│  ├─ theme-provider.tsx / theme-toggle.tsx / category-icon.tsx
│  └─ ui/                        # Shadcn/UI primitives
├─ data/
│  ├─ schema.ts                  # Resource / Category / Flag types
│  ├─ categories.ts              # category metadata + counts
│  └─ resources.ts               # the resource index (add/edit links here)
└─ lib/
   ├─ search.ts                  # Fuse.js index and query helper
   └─ utils.ts                   # cn() helper
```

## Adding Content

### Add a resource

Open `data/resources.ts` and append an entry:

```ts
{
  id: "movies-example",
  title: "ExampleStream",
  url: "https://example.com",
  description: "Short, accurate description of what this site offers.",
  tags: ["streaming", "hd"],
  flags: ["recommended", "no-ads"],
  mirrors: [{ label: "Mirror 1", url: "https://mirror.example" }],
  categories: ["movies", "tv-shows"],
}
```

Available flags (`data/schema.ts`): `recommended`, `mirror`, `ads`, `nsfw`, `open-source`, `no-ads`, `free`, `premium`, `verified`, `down`, `legal`.

### Add a category

1. Add the category object to `data/categories.ts` (the `count` is computed automatically).
2. Register a matching icon in `components/category-icon.tsx`.

## Deployment

The site is fully static, so it runs for free on any static host. Three options are covered below.

### 1. Vercel (recommended, easiest)

Vercel auto-detects Next.js — no configuration needed.

**Via Git (no CLI):**
1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository.
3. Framework preset: **Next.js** (auto-detected). Keep all defaults.
4. Click **Deploy**. Done — every push redeploys automatically.

**Via CLI:**

```bash
npm i -g vercel
vercel          # first deploy (dev preview)
vercel --prod   # production deploy
```

No environment variables are required. The site builds with the standard `next build`.

### 2. GitHub Pages

GitHub Pages only serves static files, so the app must be exported to a plain HTML folder.

**Step 1 — enable static export**

Edit `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",     // exports to ./out as pure static HTML
  trailingSlash: true,  // GitHub Pages likes clean .html paths
  images: { unoptimized: true }, // this project uses plain <a> tags, kept for safety
};

export default nextConfig;
```

Then build and verify:

```bash
npm run build   # produces ./out
```

**Step 2 — push the repo to GitHub** (repo name becomes part of the URL, e.g. `https://<user>.github.io/<repo>/`).

**Step 3 — add a GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Step 4 — enable Pages in repo settings**

1. Repo → **Settings → Pages**.
2. **Source:** `GitHub Actions` (not a branch).
3. Push a commit to `main` and the workflow builds and publishes `./out`.

### 3. Cloudflare Pages

Cloudflare Pages can build the Next.js project directly, or serve the exported `./out` folder.

**Option A — build on Cloudflare (Next.js preset, recommended)**

1. Push the repo to GitHub.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repo and use these build settings:
   - **Framework preset:** `Next.js`
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
   - **Node version:** `20` (or the latest available)
4. Click **Save and Deploy**.

**Option B — serve a fully static export**

If you prefer pure static output (no Node runtime on the edge):

1. Set `output: "export"` in `next.config.mjs` (same as the GitHub Pages step above).
2. In the Cloudflare Pages build settings use:
   - **Framework preset:** `Next.js (Static HTML Export)` *(if listed)* or leave it blank
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
3. Deploy. The whole site is served as plain static files from the Cloudflare edge.

Both options give you **free hosting**, **free HTTPS**, and global edge delivery. The GitHub Pages and Cloudflare static-export routes produce identical `./out` output, so you can even deploy the same export to both.

## Status Flags

| Flag          | Meaning            |
| ------------- | ------------------ |
| ⭐ Recommended | Top pick            |
| 🌐 Mirror      | Has alternate URLs  |
| ⚠️ Ads         | Shows advertisements |
| ☑ Verified    | Developer-signed / community-verified |
| 🧩 Open Source | Source code available |
| 🚫 No Ads      | Ad-free experience  |
| 💸 Free        | No cost to use      |
| 💳 Premium     | Paid tier required  |
| ⚖️ Legal       | Fully licensed content |

## License

MIT — content links are community-curated; verify before relying on any third-party site.
