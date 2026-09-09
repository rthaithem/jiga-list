"use client";

import * as React from "react";
import type { Resource } from "@/data/schema";
import { resources } from "@/data/resources";
import { SITE_CONFIG } from "@/lib/site-config";

const FAVORITES_STORAGE_KEY = "jiga_favorites_ids";
const FAVORITES_EVENT = "jiga-favorites-updated";

export function getFavoriteIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFavoriteIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: ids }));
  } catch {
    /* storage quota exceeded or disabled */
  }
}

export function isFavorite(id: string): boolean {
  return getFavoriteIds().includes(id);
}

export function toggleFavorite(id: string): boolean {
  const current = getFavoriteIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter((item) => item !== id) : [...current, id];
  saveFavoriteIds(updated);
  return !exists;
}

export function addFavorite(id: string): void {
  const current = getFavoriteIds();
  if (!current.includes(id)) {
    saveFavoriteIds([...current, id]);
  }
}

export function removeFavorite(id: string): void {
  const current = getFavoriteIds();
  if (current.includes(id)) {
    saveFavoriteIds(current.filter((item) => item !== id));
  }
}

export function clearFavorites(): void {
  saveFavoriteIds([]);
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setFavoriteIds(getFavoriteIds());
    setIsLoaded(true);

    const handleUpdate = () => {
      setFavoriteIds(getFavoriteIds());
    };

    window.addEventListener(FAVORITES_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const favoriteResources = React.useMemo(() => {
    return resources.filter((r) => favoriteIds.includes(r.id));
  }, [favoriteIds]);

  return {
    favoriteIds,
    favoriteResources,
    isLoaded,
    isFavorite: (id: string) => favoriteIds.includes(id),
    toggleFavorite,
    removeFavorite,
    addFavorite,
    clearFavorites,
  };
}

/**
 * Exports resources to a clean Markdown (.md) document and initiates a file download.
 */
export function exportFavoritesToMarkdown(favorites: Resource[]): void {
  const dateStr = new Date().toISOString().split("T")[0];
  let md = `# Jiga List — Saved Favorites\n\n`;
  md += `> Exported on ${dateStr} · Total saved: ${favorites.length} resources\n\n`;
  md += `Directory: [${SITE_CONFIG.name}](${SITE_CONFIG.url}) · [GitHub](${SITE_CONFIG.githubUrl})\n\n`;
  md += `---\n\n`;

  if (favorites.length === 0) {
    md += `*No favorites saved yet.*\n`;
  } else {
    favorites.forEach((res, index) => {
      md += `### ${index + 1}. [${res.title}](${res.url})\n\n`;
      md += `**Description:** ${res.description}\n\n`;
      if (res.flags.length > 0) {
        md += `**Flags:** ${res.flags.map((f) => `\`${f}\``).join(", ")}\n\n`;
      }
      if (res.tags.length > 0) {
        md += `**Tags:** ${res.tags.map((t) => `#${t}`).join(" ")}\n\n`;
      }
      if (res.categories.length > 0) {
        md += `**Categories:** ${res.categories.join(", ")}\n\n`;
      }
      if (res.mirrors && res.mirrors.length > 0) {
        md += `**Mirrors:**\n`;
        res.mirrors.forEach((m) => {
          md += `- [${m.label}](${m.url})\n`;
        });
        md += `\n`;
      }
      md += `---\n\n`;
    });
  }

  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `jiga-list-favorites-${dateStr}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Parses Markdown content, extracts links [Title](URL) or resource titles/IDs,
 * matches them against the internal database and saves them to favorites.
 */
export function importFavoritesFromMarkdown(
  markdownText: string,
  allResources: Resource[]
): { addedCount: number; matchedResources: Resource[]; errors: string[] } {
  const errors: string[] = [];
  const foundIds = new Set<string>();

  // Regex to match markdown links: [Title](URL)
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(markdownText)) !== null) {
    const title = match[1].trim().toLowerCase();
    const url = match[2].trim().toLowerCase();

    // Match by URL or Title
    const found = allResources.find((r) => {
      const rUrl = r.url.toLowerCase().replace(/\/$/, "");
      const targetUrl = url.replace(/\/$/, "");
      return (
        rUrl === targetUrl ||
        r.title.toLowerCase() === title ||
        (r.mirrors && r.mirrors.some((m) => m.url.toLowerCase().replace(/\/$/, "") === targetUrl))
      );
    });

    if (found) {
      foundIds.add(found.id);
    }
  }

  // Also check direct text matches for titles if not formatted as links
  allResources.forEach((r) => {
    if (!foundIds.has(r.id)) {
      // Check if resource ID or Title is explicitly present in markdown lines
      const pattern = new RegExp(`\\b${r.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (pattern.test(markdownText)) {
        foundIds.add(r.id);
      }
    }
  });

  const matched = allResources.filter((r) => foundIds.has(r.id));
  if (matched.length === 0) {
    errors.push("No matching resources found in the provided Markdown file.");
    return { addedCount: 0, matchedResources: [], errors };
  }

  // Merge with existing favorites
  const current = getFavoriteIds();
  const mergedSet = new Set<string>(current);
  foundIds.forEach((id) => mergedSet.add(id));
  const merged: string[] = [];
  mergedSet.forEach((id) => merged.push(id));
  saveFavoriteIds(merged);

  const newlyAddedCount = merged.length - current.length;

  return {
    addedCount: newlyAddedCount,
    matchedResources: matched,
    errors,
  };
}
