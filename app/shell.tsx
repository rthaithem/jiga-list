"use client";

import * as React from "react";

import dynamic from "next/dynamic";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { applyAccentToDocument } from "@/lib/settings";

const SearchPalette = dynamic(
  () => import("@/components/search-palette").then((mod) => mod.SearchPalette),
  { ssr: false }
);

export function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    applyAccentToDocument();
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (event.key === "/" && !searchOpen) {
        const target = event.target as HTMLElement;
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          !target.isContentEditable
        ) {
          event.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header onSearchClick={() => setSearchOpen(true)} />
          <main className="flex-1">{children}</main>
        </div>
        {searchOpen && (
          <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
        )}
      </div>
    </TooltipProvider>
  );
}
