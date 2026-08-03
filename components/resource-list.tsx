"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

import type { Flag, Resource } from "@/data/schema";
import { ResourceCard } from "@/components/resource-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Filter = "all" | Flag;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "free", label: "Free" },
  { value: "no-ads", label: "No Ads" },
  { value: "open-source", label: "Open Source" },
  { value: "recommended", label: "Recommended" },
];

export function ResourceList({
  resources,
  initialFilter = "all",
}: {
  resources: Resource[];
  initialFilter?: Filter;
}) {
  const [filter, setFilter] = React.useState<Filter>(initialFilter);
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesFilter =
        filter === "all" || resource.flags.includes(filter);
      const matchesQuery =
        !q ||
        resource.title.toLowerCase().includes(q) ||
        resource.description.toLowerCase().includes(q) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [resources, filter, query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative">
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
