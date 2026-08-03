import Fuse, { type IFuseOptions } from "fuse.js";

import { categories } from "@/data/categories";
import { resources } from "@/data/resources";

export type SearchEntry = {
  type: "resource" | "category";
  id: string;
  title: string;
  description: string;
  href: string;
  tags: string[];
  category: string;
  categorySlug: string;
  url?: string;
};

export function buildSearchIndex(): SearchEntry[] {
  const categoryEntries: SearchEntry[] = categories.map((category) => ({
    type: "category",
    id: category.slug,
    title: category.name,
    description: category.description,
    href: `/category/${category.slug}`,
    tags: [category.shortName, "category"],
    category: category.name,
    categorySlug: category.slug,
  }));

  const resourceEntries: SearchEntry[] = resources.map((resource) => {
    const categoryName =
      categories.find((c) => c.slug === resource.categories[0])?.name ??
      "General";
    return {
      type: "resource",
      id: resource.id,
      title: resource.title,
      description: resource.description,
      href: `/r/${resource.id}`,
      tags: [...resource.tags, ...resource.flags],
      category: categoryName,
      categorySlug: resource.categories[0],
      url: resource.url,
    };
  });

  return [...resourceEntries, ...categoryEntries];
}

export const SEARCH_INDEX = buildSearchIndex();

const options: IFuseOptions<SearchEntry> = {
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 3 },
    { name: "tags", weight: 2 },
    { name: "description", weight: 1 },
    { name: "category", weight: 1.5 },
  ],
};

export const fuse = new Fuse(SEARCH_INDEX, options);

export function search(query: string, limit = 12): SearchEntry[] {
  if (!query.trim()) {
    return SEARCH_INDEX.slice(0, limit);
  }
  return fuse
    .search(query, { limit })
    .map((result) => result.item);
}
