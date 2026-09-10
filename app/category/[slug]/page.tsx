import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import {
  categories,
  getCategory,
  resourcesForCategory,
} from "@/data/categories";
import { getCategoryIcon } from "@/components/category-icon";
import { ResourceList } from "@/components/resource-list";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

interface CategoryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({
  params,
}: CategoryPageProps): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};

  const siteUrl = SITE_CONFIG.url.replace(/\/$/, "");
  const pageUrl = `${siteUrl}/category/${category.slug}`;
  const title = `${category.name} — Free Tools, Links & Wiki`;
  const description = `Curated list of verified ${category.name} resources: ${category.description}. 100% free, zero tracking, updated directory.`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      siteName: "Jiga List",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export const dynamicParams = false;

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const resources = resourcesForCategory(category.slug);
  const Icon = getCategoryIcon(category.icon);
  const siteUrl = SITE_CONFIG.url.replace(/\/$/, "");

  // Structured Data for GEO & AI Search engines
  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} — Jiga List`,
    description: category.description,
    url: `${siteUrl}/category/${category.slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: category.name,
          item: `${siteUrl}/category/${category.slug}`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: resources.map((res, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: res.title,
        url: `${siteUrl}/r/${res.id}`,
        description: res.description,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />

      {/* Breadcrumbs for UX and SEO */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
          <Home className="h-3 w-3" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-foreground">{category.name}</span>
      </nav>

      <header className="mb-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {category.name}
              </h1>
              <Badge variant="secondary" className="tabular-nums text-xs">
                {category.count} verified resources
              </Badge>
              <Badge variant="outline" className="text-xs text-emerald-600 dark:text-emerald-400">
                100% Free
              </Badge>
            </div>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
      </header>

      <ResourceList resources={resources} />
    </div>
  );
}
