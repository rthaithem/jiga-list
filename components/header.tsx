"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  Github,
  Menu,
  Search,
  Settings,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useFavorites } from "@/lib/favorites";
import { MobileNav } from "@/components/mobile-nav";
import { SITE_CONFIG } from "@/lib/site-config";

interface HeaderProps {
  onSearchClick: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { favoriteIds } = useFavorites();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        <Link href="/" className="flex items-center lg:hidden">
          <span className="whitespace-nowrap text-base font-bold tracking-tight text-foreground transition-colors hover:text-primary">
            Jiga List
          </span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Directory &amp; Wiki
          </span>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="outline"
            className="hidden w-64 justify-between text-muted-foreground sm:flex md:w-80"
            onClick={onSearchClick}
          >
            <span className="inline-flex items-center gap-2 text-sm">
              <Search className="h-4 w-4" />
              Search resources…
            </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              Ctrl K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Search"
            onClick={onSearchClick}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Favorites link */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="Favorites"
            className="relative"
          >
            <Link href="/favorites">
              <Star className="h-4 w-4" />
              {favoriteIds.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-black">
                  {favoriteIds.length}
                </span>
              )}
            </Link>
          </Button>

          {/* Docs link */}
          <Button variant="ghost" size="icon" asChild aria-label="Documentation">
            <Link href="/docs">
              <BookOpen className="h-4 w-4" />
            </Link>
          </Button>

          {/* Settings link */}
          <Button variant="ghost" size="icon" asChild aria-label="Settings">
            <Link href="/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild aria-label="GitHub">
            <Link href={SITE_CONFIG.githubUrl} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
            </Link>
          </Button>

          <ThemeToggle />
        </div>
      </header>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
