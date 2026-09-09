# Jiga List ⚡

A modern, lightning-fast, and database-less curated directory & wiki web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI**.

Every resource is indexed at build time and served as static HTML (SSG) — **zero backend, zero database, zero tracking, and zero server costs**.

---

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frthaithem%2Fjiga-list">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" height="38" />
  </a>
  &nbsp;&nbsp;
  <a href="https://github.com/rthaithem/jiga-list/fork">
    <img src="https://img.shields.io/badge/Fork%20on%20GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Fork on GitHub" height="38" />
  </a>
  &nbsp;&nbsp;
  <a href="https://jiga-list.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-jiga--list.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" height="38" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14%2B%20App%20Router-black?style=flat-square&logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Search-Fuse.js-orange?style=flat-square" alt="Fuse.js" />
  <img src="https://img.shields.io/badge/License-MIT-emerald?style=flat-square" alt="License MIT" />
</p>

---

## 📑 Table of Contents

- [Live Links](#-live-links)
- [1-Click Deployment to Vercel](#-1-click-deployment-to-vercel)
- [How to Connect Your Fork to GitHub Issues](#-how-to-connect-your-fork-to-github-issues)
- [Developer Community & Architecture](#-developer-community--architecture)
- [Features & System Highlights](#-features--system-highlights)
- [Getting Started & Local Development](#-getting-started--local-development)
- [Data Schema & Contributing via Pull Request](#-data-schema--contributing-via-pull-request)
- [Project Structure](#-project-structure)
- [License](#-license)

---

## 🌐 Live Links

| Resource | Description | URL |
| :--- | :--- | :--- |
| **Official Production Deployment** | Live web application running on Vercel Edge CDN | [https://jiga-list.vercel.app/](https://jiga-list.vercel.app/) |
| **Developer Documentation Hub** | Architecture, schemas, and contributor guide | [https://jiga-list.vercel.app/docs?tab=developers](https://jiga-list.vercel.app/docs?tab=developers) |
| **Community Contribution Portal** | Pre-formatted GitHub Issue generators | [https://jiga-list.vercel.app/docs?tab=contribute](https://jiga-list.vercel.app/docs?tab=contribute) |
| **Safety & Adblocking Guide** | Safe browsing best practices & recommended filters | [https://jiga-list.vercel.app/docs?tab=security](https://jiga-list.vercel.app/docs?tab=security) |
| **Official GitHub Repository** | Source code, issue tracker, and discussions | [https://github.com/rthaithem/jiga-list](https://github.com/rthaithem/jiga-list) |

---

## 🚀 1-Click Deployment to Vercel

You can deploy your own instance of Jiga List to Vercel in seconds with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frthaithem%2Fjiga-list)

### Deployment Steps:
1. Click the **Deploy with Vercel** button above (or [Fork this repository](https://github.com/rthaithem/jiga-list/fork)).
2. Select your GitHub account and repository name.
3. Click **Create** — Vercel will automatically run `npm run build` and publish your site with global edge caching.
4. **No Environment Variables or Database setup required!**

---

## 🔗 How to Connect Your Fork to GitHub Issues

When you download, clone, or fork this repository, you can link all interactive buttons (**Submit Site**, **Suggest Category**, **Report Broken Link**, and the **Live Contributors Counter**) to your own GitHub repository by updating just **one single file**:

### 1. Update the Central Configuration File (`lib/site-config.ts`)

Open `lib/site-config.ts` and change the repository and author name to your own GitHub handle:

```typescript
// lib/site-config.ts
export const SITE_CONFIG = {
  name: "Jiga List",
  description: "A lightning-fast, database-less directory & wiki for high-quality streaming websites, Android apps, and adblockers.",
  url: "https://your-domain.vercel.app",        // Your production or custom domain
  author: "your-github-username",                // Your GitHub username
  githubRepo: "your-username/your-repo",         // Your GitHub repository path
  githubUrl: "https://github.com/your-username/your-repo",
  githubIssuesUrl: "https://github.com/your-username/your-repo/issues/new",
  githubContributorsApi: "https://api.github.com/repos/your-username/your-repo/contributors",
  githubContributorsGraph: "https://github.com/your-username/your-repo/graphs/contributors",
} as const;
```

### 2. How the Automated GitHub Issues Integration Works

All community interactions in Jiga List are client-driven and require zero backend servers:

- **Submit a Resource:** The interactive form in `/docs?tab=contribute` validates input (title, URL, category, flags, description) and generates a pre-formatted GitHub Issue link:
  ```
  https://github.com/<your-username>/<your-repo>/issues/new?title=[New Resource]: <Title>&body=<MarkdownTemplate>
  ```
- **Suggest a Category:** Automatically slugifies the category name, formats icon suggestions, and attaches initial links into a structured proposal.
- **Report Broken Links:** Every resource card has a **Report** button. Clicking it lets users choose an issue reason (Offline, Deceptive ads, Paywall, Outdated), and automatically pre-populates a GitHub incident ticket targeting your repository.
- **Real-Time Contributors Counter:** The homepage automatically queries your repository's public GitHub REST API (`/contributors`) to display the live number of contributors.

### 3. Recommended GitHub Issue Labels

To organize incoming community tickets on your repository, create the following labels under `Issues -> Labels`:

| Label | Color | Description |
| :--- | :--- | :--- |
| `new-resource` | `#0e8a16` | Community submissions for new websites or tools |
| `category-proposal` | `#1d76db` | Suggestions for new sections or topics |
| `broken-link` | `#d93f0b` | Incident reports for offline or deceptive links |
| `enhancement` | `#a2eeef` | New features or UI improvements |

---

## 💻 Developer Community & Architecture

> 📖 **Interactive Developer Hub:**  
> Access the live technical documentation directly at [https://jiga-list.vercel.app/docs?tab=developers](https://jiga-list.vercel.app/docs?tab=developers).

### Core Architectural Principles:

1. **Zero-Backend Static Site Generation (SSG):**
   - Every category and resource page is prerendered into pure static HTML at build time using Next.js `generateStaticParams`.
   - Initial page loads are instant (`<50ms`) with zero database latency and zero cold starts.
2. **Client-Side In-Memory Search:**
   - Powered by **Fuse.js**. Searches titles, descriptions, categories, and tags entirely in browser memory.
   - Accessible from anywhere via <kbd>Ctrl + K</kbd> or <kbd>/</kbd>.
3. **Private Local Favorites with Markdown (.md) Support:**
   - Saved locally in browser `localStorage`.
   - Full **Export to Markdown** and **Import from Markdown** capabilities with cross-tab event synchronization.
4. **Theme Customizer:**
   - 6 accent color palettes (Cyan, Emerald, Violet, Amber, Rose, Blue) paired with Dark, Light, and System modes.

---

## ✨ Features & System Highlights

- **Curated Directory & Wiki:** Clean catalog of top-tier streaming services, Android applications, adblockers, and tools.
- **Status Flags:** Instant indicators for quality and safety:
  - ⭐ `Recommended` · 🌐 `Mirror` · 🚫 `No Ads` · ⚠️ `Ads` · 🧩 `Open Source` · 💸 `Free` · ☑ `Verified`
- **Dual Browsing Modes:** Switch between **Detailed Grid View** (rich summaries and badges) and **High-Density Compact View** (condensed one-line rows).
- **Domain Mirror Switcher:** Alternate verified mirror links for sites experiencing ISP DNS blocks or server downtime.
- **Mobile-First Design:** Fully responsive sidebar navigation, mobile drawer menu, and touch-friendly controls.

---

## 🛠️ Getting Started & Local Development

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm, pnpm, or bun

### Local Setup:

```bash
# 1. Clone your repository
git clone https://github.com/rthaithem/jiga-list.git
cd jiga-list

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Checks & Production Build:

```bash
# Run strict ESLint verification
npm run lint

# Build production static bundle (SSG prerendering)
npm run build

# Start production server
npm run start
```

### Static HTML Export (GitHub Pages / Cloudflare Pages)

To export pure static files without a Node.js runtime, set `output: "export"` in `next.config.mjs` and execute:

```bash
npm run build
```

The static HTML and assets will be generated in `./out`.

---

## 📦 Data Schema & Contributing via Pull Request

All resources and categories live in typed TypeScript files under `/data`. You can contribute directly via Pull Request:

### 1. Resource Interface (`data/schema.ts`)

```typescript
export interface Resource {
  id: string;            // Unique identifier (e.g. "movies-braflix")
  title: string;         // Name of the site or tool
  url: string;           // Canonical official URL
  category: string;      // Category slug (movies, anime, software, etc.)
  description: string;   // Concise summary of features and quality
  flags: Flag[];         // Status flags: recommended | mirror | ads | no-ads | foss | free | verified
  mirrors?: string[];    // Optional backup domains
}
```

### 2. Adding a Resource (`data/resources.ts`)

To add a new site, append an entry to the `resources` array:

```typescript
{
  id: "movies-braflix",
  title: "Braflix",
  url: "https://braflix.gd",
  category: "movies",
  description: "Clean streaming interface with multi-server auto-failover and subbed/dubbed audio tracks.",
  flags: ["recommended", "free", "no-ads", "verified"],
  mirrors: ["https://braflix.st"],
},
```

### 3. Verification & Pull Request:

```bash
npm run lint
npm run build
```

Push your branch and open a Pull Request to [rthaithem/jiga-list](https://github.com/rthaithem/jiga-list).

---

## 📁 Project Structure

```
├── app/
│   ├── category/[slug]/page.tsx   # Category view with filters & view toggles
│   ├── docs/page.tsx              # Documentation, Developer Wiki & Issue generators
│   ├── favorites/page.tsx         # Favorites manager with Markdown import/export
│   ├── globals.css                # Tailwind & theme variables
│   ├── layout.tsx                 # Root layout, fonts, and metadata
│   ├── r/[id]/page.tsx            # Resource detail view with mirrors and actions
│   ├── settings/page.tsx          # Accent color customizer & storage manager
│   └── shell.tsx                  # App shell, sidebar & hotkey listeners
├── components/
│   ├── favorite-button.tsx        # Interactive star bookmark button
│   ├── header.tsx                 # Global top header (search, favs, docs, settings)
│   ├── home-stats.tsx             # Live stats (GitHub API contributors, SSG load time)
│   ├── mobile-nav.tsx             # Responsive mobile drawer
│   ├── resource-card.tsx          # Resource card (Grid, Compact, Mirrors, Report)
│   ├── resource-list.tsx          # Filtering, sorting, and view toggle
│   ├── search-palette.tsx         # Ctrl+K modal fuzzy search
│   ├── sidebar.tsx                # Collapsible category & navigation sidebar
│   └── ui/                        # Accessible UI component primitives
├── data/
│   ├── categories.ts              # Category definitions
│   ├── resources.ts               # Core database of all indexed links
│   └── schema.ts                  # TypeScript schema and flag definitions
└── lib/
    ├── favorites.ts               # Markdown parser/generator and favorites storage
    ├── search.ts                  # Fuse.js search indexing
    ├── settings.ts                # Accent colors & storage helpers
    ├── site-config.ts             # Central GitHub and site configuration
    └── utils.ts                   # Class name merger
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Maintained and curated by [rthaithem](https://github.com/rthaithem). Community contributions are welcome!
