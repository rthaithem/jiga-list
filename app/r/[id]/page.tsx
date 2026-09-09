import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Globe } from "lucide-react";

import { resources } from "@/data/resources";
import { categories } from "@/data/categories";
import type { Resource } from "@/data/schema";
import { ResourceCard, FlagBadge } from "@/components/resource-card";
import { FavoriteButton } from "@/components/favorite-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  return {
    title: resource.title,
    description: resource.description,
  };
}

export const dynamicParams = false;

function findResource(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export default function ResourcePage({ params }: ResourcePageProps) {
  const resource = findResource(params.id);
  if (!resource) notFound();

  const related = resources.filter(
    (r) =>
      r.id !== resource.id &&
      r.categories.some((c) => resource.categories.includes(c))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Button variant="ghost" size="sm" asChild className="mb-6 gap-1.5 pl-2 text-muted-foreground">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <CardContent className="flex flex-col gap-4 p-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
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
                  Mirrors
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
