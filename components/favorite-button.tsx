"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  resourceId,
  variant = "outline",
  size = "sm",
  showLabel = true,
}: {
  resourceId: string;
  variant?: "outline" | "default" | "ghost" | "secondary";
  size?: "sm" | "default" | "icon" | "icon-sm";
  showLabel?: boolean;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(resourceId);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => toggleFavorite(resourceId)}
      className={cn("gap-1.5", favorited && "text-amber-500")}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Star
        className={cn(
          "h-4 w-4 transition-transform",
          favorited ? "fill-amber-500 text-amber-500" : "text-muted-foreground"
        )}
      />
      {showLabel && (
        <span className="text-xs">
          {favorited ? "Saved in Favorites" : "Add to Favorites"}
        </span>
      )}
    </Button>
  );
}
