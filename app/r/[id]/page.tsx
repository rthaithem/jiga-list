import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Flag, Globe, Home, ChevronRight } from "lucide-react";

import { resources } from "@/data/resources";
import { categories } from "@/data/categories";
import type { Resource } from "@/data/schema";
import { ResourceCard, FlagBadge } from "@/components/resource-card";
import { FavoriteButton } from "@/components/favorite-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

interface ResourcePageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return resources.map((resource) => ({ id: resource.id }));
}

export function generateMetadata({
  params,
}: ResourcePageProps): Metadata {
  const resource = findResource(params.id);
  if (!resource) return {};

  const siteUrl = SITE_CONFIG.url.replace(/\/$/, "");
  const pageUrl = `${siteUrl}/r/${resource.id}`;
  const title = `${resource.title} — Free Online Tool & Verified Resource`;
  const description = `${resource.title}: ${resource.description} Tags: ${resource.tags.join(", ")}.`;

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

function findResource(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export default function ResourcePage({ params }: ResourcePageProps) {
  const resource = findResource(params.id);
  if (!resource) notFound();

  const siteUrl = SITE_CONFIG.url.replace(/\/$/, "");
  const primaryCategorySlug = resource.categories[0];
  const primaryCategory = categories.find((c) => c.slug === primaryCategorySlug);

  const related = resources.filter(
    (r) =>
      r.id !== resource.id &&
      r.categories.some((c) => resource.categories.includes(c))
  );

  const resourceJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: resource.title,
    url: resource.url,
    description: resource.description,
    applicationCategory: primaryCategory?.name ?? "Utility",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Jiga List",
      url: siteUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      ...(primaryCategory
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: primaryCategory.name,
              item: `${siteUrl}/category/${primaryCategory.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: primaryCategory ? 3 : 2,
        name: resource.title,
        item: `${siteUrl}/r/${resource.id}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resourceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
          <Home className="h-3 w-3" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3 w-3" />
        {primaryCategory && (
          <>
            <Link href={`/category/${primaryCategory.slug}`} className="hover:text-foreground transition-colors">
              {primaryCategory.name}
            </Link>
            <ChevronRight className="h-3 w-3" />
          </>
        )}
        <span className="font-medium text-foreground truncate max-w-[200px]">{resource.title}</span>
      </nav>

      <Button variant="ghost" size="sm" asChild className="mb-6 gap-1.5 pl-2 text-muted-foreground">
        <Link href={primaryCategory ? `/category/${primaryCategory.slug}` : "/"}>
          <ArrowLeft className="h-4 w-4" />
          Back to {primaryCategory ? primaryCategory.name : "all"}
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <CardContent className="flex flex-col gap-4 p-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    {resource.title}
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
                    <Globe className="h-3.5 w-3.5" />
                    <span className="font-mono">{hostname(resource.url)}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <FavoriteButton resourceId={resource.id} />
                  <Button asChild className="gap-1.5">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit site
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    size="sm"
                    className="gap-1.5 text-muted-foreground hover:text-destructive"
                  >
                    <Link href={`/docs?tab=report-issue&resource=${resource.id}`}>
                      <Flag className="h-3.5 w-3.5" />
                      Report
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {resource.flags.map((flag) => (
                  <FlagBadge key={flag} flag={flag} />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tags
                </span>
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-muted-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Categories
                </span>
                {resource.categories.map((slug) => {
                  const category = categories.find((c) => c.slug === slug);
                  if (!category) return null;
                  return (
                    <Button
                      key={slug}
                      variant="secondary"
                      size="sm"
                      asChild
                      className="h-6 gap-1 text-xs"
                    >
                      <Link href={`/category/${slug}`}>{category.name}</Link>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {resource.mirrors && resource.mirrors.length > 0 && (
            <Card className="mt-4 p-6">
              <CardContent className="p-0">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Verified Alternative Mirrors
                </h2>
                <div className="flex flex-col gap-2">
                  {resource.mirrors.map((mirror) => (
                    <div
                      key={mirror.url}
                      className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2"
                    >
                      <span className="text-sm font-medium">
                        {mirror.label}
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={mirror.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-1.5"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Open
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <aside className="lg:col-span-1">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Related resources
          </h2>
          <div className="flex flex-col gap-3">
            {related.slice(0, 5).map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
