"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Clapperboard, Home } from "lucide-react";

import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import { getCategoryIcon } from "@/components/category-icon";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-border bg-background/80 backdrop-blur transition-[width] duration-200 lg:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex h-14 shrink-0 items-center gap-2 border-b border-border px-4",
          collapsed && "justify-center px-0"
        )}
      >
        <Clapperboard className="h-5 w-5 shrink-0 text-primary" />
        {!collapsed && (
          <span className="truncate text-sm font-semibold tracking-tight">
            Jiga List <span className="text-primary">Docs</span>
          </span>
        )}
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          <SidebarLink
            href="/"
            label="Home"
            icon={Home}
            collapsed={collapsed}
            active={pathname === "/"}
          />

          <p
            className={cn(
              "px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
              collapsed && "text-center px-0"
            )}
          >
            {collapsed ? "…" : "Categories"}
          </p>

          {categories.map((category) => {
            const Icon = getCategoryIcon(category.icon);
            const active =
              pathname === `/category/${category.slug}` ||
              pathname.startsWith(`/category/${category.slug}/`);
            return (
              <SidebarLink
                key={category.slug}
                href={`/category/${category.slug}`}
                label={category.name}
                icon={Icon}
                collapsed={collapsed}
                count={category.count}
                active={active}
              />
            );
          })}
        </nav>
      </ScrollArea>

      <div
        className={cn(
          "flex items-center border-t border-border p-2",
          collapsed && "justify-center"
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              className={cn("w-full", collapsed && "w-9")}
              onClick={() => setCollapsed((c) => !c)}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Collapse
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {collapsed ? "Expand sidebar" : "Collapse sidebar"}
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  collapsed: boolean;
  active?: boolean;
  count?: number;
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  collapsed,
  active,
  count,
}: SidebarLinkProps) {
  const content = (
    <Link
      href={href}
      className={cn(
        "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        collapsed && "justify-center px-0"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {typeof count === "number" && (
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-muted-foreground">
              {count}
            </span>
          )}
        </>
      )}
    </Link>
  );

  if (!collapsed) return content;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
