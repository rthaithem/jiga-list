# Jiga List

A lightning-fast, database-less directory & wiki web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI**.

Every resource is indexed at build time and served as static HTML (SSG) — zero backend, zero database, zero tracking, zero server costs.

---

## Features & Recent Updates

### 1. Curated Directory & Wiki
- **Fast Categorization:** Browse high-quality streaming websites, Android apps, adblockers, and tools.
- **Status Flags:** Clear indicators for status (⭐ Recommended, 🌐 Mirror, ⚠️ Ads, 🚫 No Ads, 🧩 Open Source, 💸 Free, ☑ Verified).
- **Fast Search (`Ctrl + K` or `/`):** Fuzzy search across titles, descriptions, URLs, tags, and categories.
- **View Modes & Sorting:** Switch smoothly between **Detailed Grid** and **High-Density Compact** views; sort by Recommended, Name (A-Z), or Name (Z-A).

### 2. Favorites System with Markdown (`.md`) Support
- **One-Click Bookmarking:** Star any resource to save it in your private local favorites.
- **Export to Markdown (`.md`):** Download your saved favorites as an organized, shareable `.md` file.
- **Import from Markdown (`.md`):** Upload any `.md` file or paste raw Markdown text containing `[Title](url)` links to instantly restore your bookmarks into Jiga List.

### 3. Community Contributions via GitHub Issues
- **Submit a Site / App:** Interactive generator in `/docs` that structures the proposal (Title, URL, Category, Flags, Description) and generates a 1-click prefilled GitHub Issue link.
- **Suggest a New Category:** Propose entire new sections (e.g., Emulators, Podcasts, Audiobooks) with auto-slugification and initial website recommendations.
- **Report Broken Links & Incidents:** Flag dead links, deceptive domains, or malicious popups directly from any resource card or detail page (`/r/[id]`), generating an immediate, structured GitHub Issue.

### 4. Settings & Storage Management (`/settings`)
- **Accent Color Themes:** Choose from 6 palettes (Cyan, Emerald, Violet, Amber, Rose, Blue) applied across buttons, badges, and focus rings.
- **Theme Modes:** Dark mode, light mode, or system default.
- **Cache & Storage Control:** Inspect real-time browser storage metrics and selectively clear search cache, reset favorites, or restore default settings.

### 5. Mobile-Optimized Design
- **Responsive Navigation:** Collapsible desktop sidebar and clean mobile drawer navigation.
- **Streamlined Guides:** Horizontally scrollable, wrap-free tabs for documentation, contribution generators, and security guides on mobile screens.
- **Clean English Interface:** English-first UI with streamlined header controls.

---

## Tech Stack

| Layer       | Choice                                                      |
| ----------- | ----------------------------------------------------------- |
| Framework   | Next.js 14+ (App Router, SSG)                               |
| Language    | TypeScript (strict)                                         |
| Styling     | Tailwind CSS                                                |
| Components  | Shadcn/UI (Card, Badge, Button, Dialog, Command, Tabs, etc.)|
| Icons       | Lucide React                                                |
| Search      | Fuse.js                                                     |
| Storage     | Browser LocalStorage & Custom Events                        |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

```bash
npm run build   # type-checks, lints, and prerenders all pages
npm run start
```

The build output is fully static — every category and resource detail page is prerendered at build time (`generateStaticParams`).

To export static files for GitHub Pages or Cloudflare Pages:
Set `output: "export"` in `next.config.mjs` and run `npm run build`. Static assets will be generated in `./out`.

---

## Project Structure

```
├── app/
│   ├── category/[slug]/page.tsx   # Category view with filters & view toggles
│   ├── docs/page.tsx              # Docs, GitHub Issue generators & user guides
│   ├── favorites/page.tsx         # Favorites manager with Markdown import/export
│   ├── globals.css                # Tailwind & theme variables
│   ├── layout.tsx                 # Root layout, fonts, and metadata
│   ├── r/[id]/page.tsx            # Resource detail view with mirrors and actions
│   ├── settings/page.tsx          # Accent color customizer & cache manager
│   └── shell.tsx                  # App shell, sidebar & hotkey listeners
├── components/
│   ├── favorite-button.tsx        # Interactive star bookmark button
│   ├── header.tsx                 # Global top header (search, favs, docs, settings)
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
    ├── settings.ts                # Accent colors & cache storage helpers
    └── utils.ts                   # Class name merger
```

---

## How to Contribute

1. **Submit a Resource:** Go to `/docs` → **Submit a Site** or open a GitHub Issue with the tag `[New Resource]`.
2. **Suggest a Category:** Go to `/docs` → **Suggest Category** or open a GitHub Issue with the tag `[Category Proposal]`.
3. **Report a Dead Link:** Click **Report** on any card or go to `/docs` → **Report Broken Link** to submit an incident issue.

---

## License

MIT — Community-curated index. Always verify external links before downloading files.
