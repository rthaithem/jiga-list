"use client";

import * as React from "react";
import {
  ArrowUpDown,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import type { Flag, Resource } from "@/data/schema";
import { ResourceCard } from "@/components/resource-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Filter = "all" | Flag;
type SortOrder = "recommended" | "az" | "za";
type ViewMode = "grid" | "compact";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "no-ads", label: "No Ads" },
  { value: "open-source", label: "Open Source" },
  { value: "recommended", label: "Recommended" },
  { value: "verified", label: "Verified" },
];

export function ResourceList({
  resources,
  initialFilter = "all",
  initialView = "grid",
}: {
  resources: Resource[];
  initialFilter?: Filter;
  initialView?: ViewMode;
}) {
  const [filter, setFilter] = React.useState<Filter>(initialFilter);
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortOrder>("recommended");
  const [viewMode, setViewMode] = React.useState<ViewMode>(initialView);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = resources.filter((resource) => {
      const matchesFilter =
        filter === "all" || resource.flags.includes(filter);
      const matchesQuery =
        !q ||
        resource.title.toLowerCase().includes(q) ||
        resource.description.toLowerCase().includes(q) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sort === "az") {
        return a.title.localeCompare(b.title);
      }
      if (sort === "za") {
        return b.title.localeCompare(a.title);
      }
      // default: recommended first, then alphabetic
      const aRec = a.flags.includes("recommended") ? 1 : 0;
      const bRec = b.flags.includes("recommended") ? 1 : 0;
      if (aRec !== bRec) return bRec - aRec;
      return a.title.localeCompare(b.title);
    });
  }, [resources, filter, query, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Filter ${resources.length} resources…`}
              className="pl-9"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setQuery("")}
                aria-label="Clear filter"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1.5 px-2.5 text-xs">
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {sort === "az" ? "Name (A-Z)" : sort === "za" ? "Name (Z-A)" : "Recommended"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Sort Resources</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSort("recommended")}>
                Featured / Recommended
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("az")}>
                Alphabetical (A to Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("za")}>
                Alphabetical (Z to A)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-md border border-border bg-muted/40 p-0.5">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon-sm"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewMode === "compact" ? "secondary" : "ghost"}
              size="icon-sm"
              className="h-8 w-8"
              onClick={() => setViewMode("compact")}
              aria-label="Compact List View"
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map(({ value, label }) => (
            <Button
              key={value}
              size="sm"
              variant={filter === value ? "default" : "outline"}
              className={cn(
                "h-7 gap-1.5 text-xs",
                filter !== value && "text-muted-foreground"
              )}
              onClick={() => setFilter(value)}
            >
              {label}
              <span className="rounded-full bg-muted px-1.5 text-[10px] tabular-nums">
                {value === "all"
                  ? resources.length
                  : resources.filter((r) => r.flags.includes(value)).length}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-16 text-center">
          <Search className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm font-medium">No resources match</p>
          <p className="text-xs text-muted-foreground">
            Try clearing the search or switching filters.
          </p>
        </div>
      ) : viewMode === "compact" ? (
        <div className="flex flex-col gap-2">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} compact />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 2xl:grid-cols-3">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
        <span>
          Showing{" "}
          <span className="font-medium text-foreground tabular-nums">
            {filtered.length}
          </span>{" "}
          of {resources.length} resources
        </span>
        <Badge variant="outline" className="gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live index
        </Badge>
      </div>
    </div>
  );
}
