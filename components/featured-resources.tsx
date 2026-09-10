"use client";

import * as React from "react";
import { ChevronDown, Sparkles } from "lucide-react";

import type { Resource } from "@/data/schema";
import { ResourceCard } from "@/components/resource-card";
import { Button } from "@/components/ui/button";

const INITIAL_LIMIT = 12;
const BATCH_SIZE = 12;

interface FeaturedResourcesProps {
  resources: Resource[];
}

export function FeaturedResources({ resources }: FeaturedResourcesProps) {
  const [displayCount, setDisplayCount] = React.useState(INITIAL_LIMIT);

  const visibleResources = React.useMemo(() => {
    return resources.slice(0, displayCount);
  }, [resources, displayCount]);

  const hasMore = displayCount < resources.length;
  const remaining = resources.length - displayCount;

  const handleShowMore = () => {
    setDisplayCount((prev) => Math.min(prev + BATCH_SIZE, resources.length));
  };

  const handleShowAll = () => {
    setDisplayCount(resources.length);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {visibleResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/50 p-6 text-center">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>
              Showing{" "}
              <strong className="text-foreground">{visibleResources.length}</strong> of{" "}
              <strong className="text-foreground">{resources.length}</strong> featured resources
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleShowMore}
              className="gap-1.5 shadow-sm"
            >
              <ChevronDown className="h-4 w-4" />
              Load More ({Math.min(BATCH_SIZE, remaining)} more)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShowAll}
              className="text-xs"
            >
              Show All ({resources.length})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
