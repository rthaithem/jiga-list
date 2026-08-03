import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  categories,
  getCategory,
  resourcesForCategory,
} from "@/data/categories";
import { getCategoryIcon } from "@/components/category-icon";
import { ResourceList } from "@/components/resource-list";
import { Badge } from "@/components/ui/badge";

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
  return {
    title: category.name,
    description: category.description,
  };
}

export const dynamicParams = false;

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const resources = resourcesForCategory(category.slug);
  const Icon = getCategoryIcon(category.icon);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {category.name}
              </h1>
              <Badge variant="secondary" className="tabular-nums">
                {category.count} resources
              </Badge>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
      </header>

      <ResourceList resources={resources} />
    </div>
  );
}
