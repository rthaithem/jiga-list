import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/app/shell";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: true,
});

const siteUrl = SITE_CONFIG.url.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jiga List — Free Curated Wiki & Master Directory of Open Tools, AI, Media & Privacy",
    template: "%s — Jiga List",
  },
  description:
    "The ultimate community-curated wiki & open directory of verified free tools, artificial intelligence, adblocking, media streaming, gaming emulators, books, and operating system utilities. 100% free, static, and zero tracking.",
  applicationName: "Jiga List",
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.githubUrl }],
  creator: SITE_CONFIG.author,
  publisher: "Jiga List Community",
  keywords: [
    "jiga list",
    "free wiki",
    "curated directory",
    "free media heck yeah",
    "fmhy alternative",
    "artificial intelligence tools",
    "adblocking privacy",
    "streaming movies tv anime",
    "free music radio",
    "gaming emulators",
    "open library books manga",
    "download managers",
    "torrenting clients",
    "free educational courses",
    "android open source apps",
    "ios sideloading",
    "linux tools",
    "macos utilities",
    "open source software",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Jiga List",
    title: "Jiga List — Free Curated Wiki & Master Directory",
    description:
      "Community-curated wiki and verified index of free tools, AI, adblockers, streaming, gaming emulators, books, and operating system utilities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiga List — Free Curated Wiki & Master Directory",
    description:
      "Community-curated wiki and verified index of free tools, AI, adblockers, streaming, gaming emulators, books, and operating system utilities.",
    creator: `@${SITE_CONFIG.author}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Jiga List",
      description:
        "The ultimate community-curated wiki & open directory of verified free tools, AI, adblockers, streaming, educational courses, and open-source software.",
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Jiga List Community",
      url: siteUrl,
      sameAs: [SITE_CONFIG.githubUrl],
    },
    {
      "@type": "DataCatalog",
      name: "Jiga List Curated Knowledge Index",
      description:
        "Comprehensive open index across 16 categories including AI, Adblocking, Streaming, Emulation, Books, and Software.",
      url: siteUrl,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Jiga List?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jiga List is an open-source, community-curated wiki and curated directory indexing verified free tools, artificial intelligence services, adblocking & privacy guides, media streaming, gaming emulators, open digital libraries, and operating system utilities.",
          },
        },
        {
          "@type": "Question",
          name: "Is Jiga List completely free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Jiga List is 100% free with zero fees, zero subscription barriers, and zero user tracking. All pages are statically generated for high privacy and speed.",
          },
        },
        {
          "@type": "Question",
          name: "What categories are covered in Jiga List?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jiga List covers 16 core categories: Wiki, Adblocking / Privacy, Artificial Intelligence, Movies / TV / Anime, Music / Podcasts / Radio, Gaming / Emulation, Books / Comics / Manga, Downloading, Torrenting, Educational, Android, iOS, Linux, macOS, Non-English, and Miscellaneous.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <script
          id="jiga-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}var a=localStorage.getItem("jiga_accent_theme");if(a&&["cyan","emerald","violet","amber","rose","blue"].indexOf(a)!==-1){document.documentElement.setAttribute("data-accent",a);}else{document.documentElement.setAttribute("data-accent","cyan");}}catch(e){document.documentElement.classList.add("dark");}})();`,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
