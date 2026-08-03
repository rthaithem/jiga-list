"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, ExternalLink, FolderTree } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { getCategoryIcon } from "@/components/category-icon";
import { search, SEARCH_INDEX, type SearchEntry } from "@/lib/search";
import { FLAG_LABELS } from "@/data/schema";

interface SearchPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchPalette({ open, onOpenChange }: SearchPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => search(query, 20), [query]);

  const handleVisit = React.useCallback(
    (entry: SearchEntry) => {
      onOpenChange(false);
      setQuery("");
      router.push(entry.href);
    },
    [onOpenChange, router]
  );

  const handleDirect = React.useCallback(
    (entry: SearchEntry) => {
      if (entry.url) window.open(entry.url, "_blank", "noopener,noreferrer");
    },
    []
  );

  const resourceResults = results.filter((r) => r.type === "resource");
  const categoryResults = results.filter((r) => r.type === "category");

  return (
    <CommandDialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setQuery("");
      }}
    >
      <CommandInput
        placeholder="Search movies, shows, anime, tools…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {categoryResults.length > 0 && (
          <CommandGroup heading="Categories">
            {categoryResults.map((category) => {
              const Icon = getCategoryIcon(category.categorySlug);
              return (
                <CommandItem
                  key={category.id}
                  value={`cat-${category.id}`}
                  onSelect={() => handleVisit(category)}
                >
                  <Icon className="mr-2 h-4 w-4 text-primary" />
                  {category.title}
                  <CommandShortcut>
                    <FolderTree className="h-3.5 w-3.5" />
                  </CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {categoryResults.length > 0 && resourceResults.length > 0 && (
          <CommandSeparator />
        )}

        {resourceResults.length > 0 && (
          <CommandGroup heading="Resources">
            {resourceResults.map((resource) => {
              const Icon = getCategoryIcon(resource.categorySlug);
              return (
                <CommandItem
                  key={resource.id}
                  value={`res-${resource.id}`}
                  onSelect={() => handleVisit(resource)}
                >
                  <Icon className="mr-2 h-4 w-4 shrink-0 text-primary" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium">
                      {resource.title}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {resource.description}
                    </span>
                  </div>
                  {resource.tags
                    .filter((t) => t in FLAG_LABELS)
                    .slice(0, 1)
                    .map((flag) => (
                      <Badge
                        key={flag}
                        variant="success"
                        className="ml-2 hidden shrink-0 sm:inline-flex"
                      >
                        {FLAG_LABELS[flag as keyof typeof FLAG_LABELS]}
                      </Badge>
                    ))}
                  <CommandShortcut>
                    <CornerDownLeft className="h-3.5 w-3.5" />
                  </CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {!query.trim() && (
          <CommandGroup heading="Trending">
            {SEARCH_INDEX.filter((r) => r.type === "resource")
              .slice(0, 6)
              .map((resource) => (
                <CommandItem
                  key={resource.id}
                  value={`trend-${resource.id}`}
                  onSelect={() => handleVisit(resource)}
                >
                  <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
                  {resource.title}
                  <CommandShortcut>Visit</CommandShortcut>
                </CommandItem>
              ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
