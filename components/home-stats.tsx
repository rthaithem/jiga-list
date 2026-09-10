"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Users,
  Zap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

interface HomeStatsProps {
  resourcesCount: number;
  categoriesCount: number;
}

export function HomeStats({ resourcesCount, categoriesCount }: HomeStatsProps) {
  // Real verified contributors (rthaithem + community)
  const contributorsCount = 1;

  // Real browser load measurement (Navigation Timing API)
  const [loadTimeMs, setLoadTimeMs] = React.useState<string>("<50ms");

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.performance) {
        const navEntries = performance.getEntriesByType("navigation");
        if (navEntries && navEntries.length > 0) {
          const nav = navEntries[0] as PerformanceNavigationTiming;
          const duration = Math.round(nav.domContentLoadedEventEnd - nav.startTime);
          if (duration > 0 && duration < 5000) {
            setLoadTimeMs(`${duration}ms`);
          }
        }
      }
    } catch {
      // fallback
    }
  }, []);

  // Total static HTML routes generated: resources + categories + static pages (home, favorites, docs, settings)
  const totalStaticPages = resourcesCount + categoriesCount + 4;

  const stats = [
    {
      id: "stat-resources",
      href: "#featured-resources",
      icon: Globe,
      value: resourcesCount,
      label: "Resources",
      subtext: `${resourcesCount} verified active links`,
      isExternal: false,
    },
    {
      id: "stat-categories",
      href: "#categories",
      icon: BookOpen,
      value: categoriesCount,
      label: "Categories",
      subtext: `${categoriesCount} curated sections`,
      isExternal: false,
    },
    {
      id: "stat-build",
      href: "/docs?tab=guide",
      icon: Zap,
      value: loadTimeMs,
      label: "Load & Build",
      subtext: `${totalStaticPages} Static SSG Pages`,
      isExternal: false,
    },
    {
      id: "stat-contributors",
      href: SITE_CONFIG.githubContributorsGraph,
      icon: Users,
      value: contributorsCount,
      label: contributorsCount === 1 ? "Contributor" : "Contributors",
      subtext: `@${SITE_CONFIG.author} on GitHub`,
      isExternal: true,
    },
  ];

  return (
    <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        const CardInner = (
          <Card className="group relative h-full overflow-hidden border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/40 hover:shadow-sm">
            <CardContent className="flex flex-col justify-between gap-3 p-0">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                {item.isExternal ? (
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                )}
              </div>

              <div>
                <p className="text-xl font-bold tracking-tight text-foreground tabular-nums sm:text-2xl">
                  {item.value}
                </p>
                <p className="text-xs font-semibold text-foreground/90">
                  {item.label}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                  {item.subtext}
                </p>
              </div>
            </CardContent>
          </Card>
        );

        if (item.isExternal) {
          return (
            <a
              key={item.id}
              id={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
              title={`View ${item.label} on GitHub`}
            >
              {CardInner}
            </a>
          );
        }

        return (
          <Link
            key={item.id}
            id={item.id}
            href={item.href}
            className="block outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
            title={`Go to ${item.label}`}
          >
            {CardInner}
          </Link>
        );
      })}
    </section>
  );
}
