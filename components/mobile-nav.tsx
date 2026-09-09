"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Settings, Star, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { getCategoryIcon } from "@/components/category-icon";
import { useFavorites } from "@/lib/favorites";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();
  const { favoriteIds } = useFavorites();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-0 translate-y-0 gap-0 rounded-b-xl rounded-t-none border-x-0 border-t-0 p-0 sm:max-w-none">
        <DialogHeader className="flex flex-row items-center justify-between border-b p-4">
          <DialogTitle className="text-sm font-semibold">
            Navigation &amp; Categories
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="flex max-h-[80vh] flex-col gap-1 overflow-y-auto p-2">
          <MobileLink
            href="/"
            label="Home"
            icon={<Home className="h-4 w-4" />}
            active={pathname === "/"}
            onNavigate={() => onOpenChange(false)}
          />
          <MobileLink
            href="/favorites"
            label="Favorites"
            icon={<Star className="h-4 w-4" />}
            count={favoriteIds.length}
            active={pathname === "/favorites"}
            onNavigate={() => onOpenChange(false)}
          />

          <div className="my-1 border-t px-3 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </div>

          {categories.map((category) => {
            const Icon = getCategoryIcon(category.icon);
            const active =
              pathname === `/category/${category.slug}` ||
              pathname.startsWith(`/category/${category.slug}/`);
            return (
              <MobileLink
                key={category.slug}
                href={`/category/${category.slug}`}
                label={category.name}
                count={category.count}
                icon={<Icon className="h-4 w-4" />}
                active={active}
                onNavigate={() => onOpenChange(false)}
              />
            );
          })}

          <div className="my-1 border-t px-3 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            General
          </div>

          <MobileLink
            href="/docs"
            label="Docs & Guides"
            icon={<BookOpen className="h-4 w-4" />}
            active={pathname === "/docs"}
            onNavigate={() => onOpenChange(false)}
          />
          <MobileLink
            href="/settings"
            label="Settings"
            icon={<Settings className="h-4 w-4" />}
            active={pathname === "/settings"}
            onNavigate={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface MobileLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  active?: boolean;
  onNavigate: () => void;
}

function MobileLink({
  href,
  label,
  icon,
  count,
  active,
  onNavigate,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {typeof count === "number" && (
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-muted-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
