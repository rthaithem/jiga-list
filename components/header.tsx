"use client";

import * as React from "react";
import Link from "next/link";
import {
  Clapperboard,
  Github,
  Languages,
  Menu,
  Search,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNav } from "@/components/mobile-nav";

interface HeaderProps {
  onSearchClick: () => void;
}

const LANGS = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "hi", label: "हिन्दी" },
  { code: "ja", label: "日本語" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "zh", label: "中文" },
];

export function Header({ onSearchClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

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

        <Link href="/" className="flex items-center gap-2 lg:hidden">
          <Clapperboard className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold tracking-tight">
            Jiga List <span className="text-primary">Docs</span>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Language">
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-72 w-40">
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {LANGS.map((lang) => (
                <DropdownMenuItem key={lang.code}>
                  <span className="mr-2 w-6 font-mono text-xs text-muted-foreground">
                    {lang.code}
                  </span>
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" asChild aria-label="GitHub">
            <Link href="https://github.com/rthaithem/jiga-list" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Telegram">
            <Link href="https://t.me" target="_blank" rel="noreferrer">
              <Send className="h-4 w-4" />
            </Link>
          </Button>

          <ThemeToggle />
        </div>
      </header>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
