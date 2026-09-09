import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { AppShell } from "@/app/shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Jiga List",
    template: "%s — Jiga List",
  },
  description:
    "A lightning-fast, database-less directory of streaming sites, tools, adblockers and Android apps. Community-curated and always free.",
  keywords: [
    "movies",
    "streaming",
    "anime",
    "directory",
    "free",
    "tools",
    "adblockers",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="jiga-accent-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var a=localStorage.getItem("jiga_accent_theme");if(a&&["cyan","emerald","violet","amber","rose","blue"].indexOf(a)!==-1){document.documentElement.setAttribute("data-accent",a);}else{document.documentElement.setAttribute("data-accent","cyan");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
