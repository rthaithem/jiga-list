# Jiga List

A lightning-fast, database-less directory & wiki web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI**.

Every resource is indexed at build time and served as static HTML (SSG) — zero backend, zero database, zero tracking, zero server costs.

- 🌐 **Live Website:** [https://jiga-list.vercel.app/](https://jiga-list.vercel.app/)
- 💻 **Developer Community & Documentation:** [https://jiga-list.vercel.app/docs?tab=developers](https://jiga-list.vercel.app/docs?tab=developers)
- 🐙 **Official Repository:** [https://github.com/rthaithem/jiga-list](https://github.com/rthaithem/jiga-list)

---

## Quick Navigation

- [Live Website & Links](#live-website--links)
- [How to Connect Your Fork to GitHub Issues (دليل ربط المشروع بـ GitHub Issues)](#how-to-connect-your-fork-to-github-issues-دليل-ربط-المشروع-بـ-github-issues)
- [Developer Community & Technical Architecture (مجتمع البرمجة)](#developer-community--technical-architecture-مجتمع-البرمجة)
- [Features & System Highlights](#features--system-highlights)
- [Tech Stack](#tech-stack)
- [Getting Started & Local Dev](#getting-started--local-dev)
- [Data Schema & Contributing via Pull Request](#data-schema--contributing-via-pull-request)
- [Production Build & SSG Deployment](#production-build--ssg-deployment)
- [Project Structure](#project-structure)
- [License](#license)

---

## Live Website & Links

| Service | URL |
| :--- | :--- |
| **Official Production Deployment** | [https://jiga-list.vercel.app/](https://jiga-list.vercel.app/) |
| **Developer Documentation Hub** | [https://jiga-list.vercel.app/docs?tab=developers](https://jiga-list.vercel.app/docs?tab=developers) |
| **Community Submissions & Issues** | [https://jiga-list.vercel.app/docs?tab=contribute](https://jiga-list.vercel.app/docs?tab=contribute) |
| **Safety & Adblocking Guide** | [https://jiga-list.vercel.app/docs?tab=security](https://jiga-list.vercel.app/docs?tab=security) |
| **GitHub Repository** | [https://github.com/rthaithem/jiga-list](https://github.com/rthaithem/jiga-list) |

---

## How to Connect Your Fork to GitHub Issues (دليل ربط المشروع بـ GitHub Issues)

إذا قمت بتحميل المشروع (Clone) أو عمل Fork له على حسابك في GitHub، وتريد أن ترتبط جميع أزرار التبليغ، إضافة المواقع، اقتراح الأقسام، وإحصائيات المساهمين بحسابك الخاص ومستودعك الجديد، إليك الشرح المفصل والشامل للربط:

### 1. الملف المركزي لجميع الإعدادات (`/lib/site-config.ts`)

تم تجميع كل روابط الـ GitHub والـ API في ملف إعدادات واحد مركزي في المشروع. لا تحتاج لتعديل عشرات الملفات؛ فقط افتح:

```bash
lib/site-config.ts
```

وقم بتغيير اسم الحساب والمستودع إلى اسم مستودعك الخاص:

```typescript
// lib/site-config.ts
export const SITE_CONFIG = {
  name: "Jiga List",
  description: "A lightning-fast, database-less directory & wiki for high-quality resources.",
  url: "https://your-domain.vercel.app", // أو https://jiga-list.vercel.app
  author: "your-github-username",         // اسم حسابك على GitHub
  githubRepo: "your-username/your-repo",  // مسار المستودع الخاص بك
  githubUrl: "https://github.com/your-username/your-repo",
  githubIssuesUrl: "https://github.com/your-username/your-repo/issues/new",
  githubContributorsApi: "https://api.github.com/repos/your-username/your-repo/contributors",
  githubContributorsGraph: "https://github.com/your-username/your-repo/graphs/contributors",
} as const;
```

### 2. كيف يعمل ربط GitHub Issues برمجياً؟

يقوم المشروع بتوليد استمارات تلقائية من المتصفح مباشرة، ويقوم بتشفير البيانات في رابط URL قياسي لفتح تذكرة جديدة على GitHub بدون الحاجة لأي خادم وسيط (Zero-Backend):

1. **إضافة موقع جديد (Submit Resource):**
   - عندما يملأ المستخدم البيانات في صفحة التوثيق (`/docs?tab=contribute`)، يتم إنشاء Markdown منسق ثم يفتح الرابط:
   ```
   https://github.com/<your-username>/<your-repo>/issues/new?title=[New Resource]: <Title>&body=<EncodedMarkdown>
   ```
2. **اقتراح قسم جديد (Suggest Category):**
   - ينشئ قالباً يحتوي على اسم القسم، الـ slug المقترح، الأيقونة، وروابط أولية مقترحة مع الوسم:
   ```
   [Category Proposal]: <Category Name>
   ```
3. **التبليغ عن رابط معطل (Report Broken Link):**
   - في كل بطاقة موقع (`ResourceCard`) أو في صفحة تفاصيل الموقع (`/r/[id]`)، يوجد زر **Report**.
   - عند الضغط واختيار سبب المشكلة (رابط لا يعمل، برمجيات ضارة، جدار دفع)، يقوم المتصفح فوراً بتجهيز تقرير كامل بالـ ID والـ URL، ويفتح Issue مباشرة في مستودعك.

### 3. إحصائيات المساهمين الحقيقية (Real Contributors Metric)

- في الصفحة الرئيسية، يتم جلب عدد المساهمين الحقيقي تلقائياً وبشكل فوري عبر **GitHub REST API**:
  `https://api.github.com/repos/<your-username>/<your-repo>/contributors`
- بمجرد تغيير `githubRepo` في `lib/site-config.ts`، سيعكس العداد تلقائياً عدد المساهمين الفعليين في مستودعك مع رابط مباشر لصفحة المساهمين.

### 4. تهيئة التصنيفات والتسميات (GitHub Issue Labels) في مستودعك

لتنظيم التذاكر القادمة في مستودعك، يُستحسن إنشاء التصنيفات (Labels) التالية على GitHub (`Issues -> Labels`):
- `new-resource`: للمواقع المقترحة الجديدة.
- `category-proposal`: لاقتراحات إضافة أقسام وتصنيفات جديدة.
- `broken-link`: للبلاغات عن الروابط التالفة والمعطلة.
- `help-wanted`: للمهام البرمجية المفتوحة للمجتمع.

---

## Developer Community & Technical Architecture (مجتمع البرمجة)

> 💡 **صفحة مجتمع المطورين والتوثيق الحي:**
> قم بزيارة التوثيق التفاعلي للبرمجة مباشرة على:  
> 👉 **[https://jiga-list.vercel.app/docs?tab=developers](https://jiga-list.vercel.app/docs?tab=developers)**

تم تصميم المشروع ليكون مرجعاً مفتوح المصدر بتصميم فائق السرعة وبدون خوادم خلفية:

1. **Next.js 14 App Router (Zero-Backend SSG):**
   - كل صفحة، تصنيف، وتفاصيل رابط يتم توليدها مسبقاً كملف HTML ثابت عند البناء (`generateStaticParams`).
   - سرعة التحميل الأولية للموقع في المتصفح فائقة السرعة (`<50ms`).
2. **محرك بحث في الذاكرة (Client-Side Fuzzy Search):**
   - يتم فهرسة جميع الروابط بواسطة **Fuse.js** داخل متصفح المستخدم للبحث الفوري عند الضغط على `Ctrl + K` أو `/`.
3. **نظام المفضلة المحلي والتوافق مع Markdown:**
   - تخزين محلي خاص تماماً في `localStorage` مع دعم كامل لتصدير واستيراد ملفات `.md` ومزامنتها لحظياً عبر Custom Events.
4. **نظام الثيمات وتخصيص الألوان:**
   - 6 ألوان تمييزية (Cyan, Emerald, Violet, Amber, Rose, Blue) مع التبديل بين الوضع الداكن والفاتح.

---

## Data Schema & Contributing via Pull Request

إذا أردت المساهمة بإضافة موقع جديد برمجياً عبر Pull Request:

### 1. بنية البيانات (`data/schema.ts`)

```typescript
export interface Resource {
  id: string;            // معرف مميز (مثال: "movies-braflix")
  title: string;         // اسم الموقع أو التطبيق
  url: string;           // الرابط الرسمي
  category: string;      // تصنيف الموقع (movies, anime, software...)
  description: string;   // وصف مختصر ودقيق
  flags: Flag[];         // وسوم الحالة: recommended | mirror | ads | no-ads | foss | free | verified
  mirrors?: string[];    // روابط بديلة إن وجدت
}
```

### 2. إضافة موقع إلى `data/resources.ts`

افتح الملف `data/resources.ts` وأضف العنصر الجديد:

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

### 3. فحص البناء والتحقق

```bash
npm run lint    # فحص الكود والتأكد من خلوه من الأخطاء
npm run build   # التأكد من نجاح توليد الصفحات الثابتة SSG
```

ثم قم بفتح Pull Request إلى المستودع الرسمي [rthaithem/jiga-list](https://github.com/rthaithem/jiga-list).

---

## Features & System Highlights

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

---

## Tech Stack

| Layer | Choice |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router, SSG Static Pre-rendering) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS |
| **Components** | Shadcn/UI (Card, Badge, Button, Dialog, Command, Tabs) |
| **Icons** | Lucide React |
| **Search Engine** | Fuse.js (Client-side in-memory fuzzy index) |
| **Persistence** | Browser LocalStorage & Custom Sync Events |

---

## Getting Started & Local Dev

```bash
# 1. Clone the repository
git clone https://github.com/rthaithem/jiga-list.git
cd jiga-list

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build & SSG Deployment

```bash
# Type-check, lint, and prerender all pages
npm run build

# Start production server
npm run start
```

### 1-Click Deployment to Vercel
1. Import the repository into your [Vercel Dashboard](https://vercel.com).
2. Framework Preset: **Next.js**.
3. Build Command: `npm run build`.
4. Output Directory: `.next`.
5. No Environment Variables required!

### Exporting Static Files (GitHub Pages / Cloudflare Pages)
Set `output: "export"` in `next.config.mjs` and run:
```bash
npm run build
```
Static assets will be output to `./out`.

---

## Project Structure

```
├── app/
│   ├── category/[slug]/page.tsx   # Category view with filters & view toggles
│   ├── docs/page.tsx              # Docs, Developer Wiki & GitHub Issue generators
│   ├── favorites/page.tsx         # Favorites manager with Markdown import/export
│   ├── globals.css                # Tailwind & theme variables
│   ├── layout.tsx                 # Root layout, fonts, and metadata
│   ├── r/[id]/page.tsx            # Resource detail view with mirrors and actions
│   ├── settings/page.tsx          # Accent color customizer & cache manager
│   └── shell.tsx                  # App shell, sidebar & hotkey listeners
├── components/
│   ├── favorite-button.tsx        # Interactive star bookmark button
│   ├── header.tsx                 # Global top header (search, favs, docs, settings)
│   ├── home-stats.tsx             # Real-time stats (GitHub API contributors, SSG load)
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
    ├── site-config.ts             # Central GitHub and site URLs configuration
    └── utils.ts                   # Class name merger
```

---

## License

MIT License — Community-curated index. Always verify external links before downloading files.
Distributed freely under the MIT License by [rthaithem](https://github.com/rthaithem).
