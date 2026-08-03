import Link from "next/link";
import {
  ArrowRight,
  Clapperboard,
  BookOpen,
  Search,
  Users,
  Zap,
} from "lucide-react";

import { categories } from "@/data/categories";
import { resources } from "@/data/resources";
import { getCategoryIcon } from "@/components/category-icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ResourceCard } from "@/components/resource-card";

const STATS = [
  { icon: Clapperboard, label: "Resources", value: resources.length },
  { icon: BookOpen, label: "Categories", value: categories.length },
  { icon: Zap, label: "Build time", value: "<1s" },
  { icon: Users, label: "Contributors", value: "42" },
];

export default function HomePage() {
  const featured = resources.filter((r) =>
    r.flags.includes("recommended")
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="info" className="gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Database-less · Static · SSG
          </Badge>
          <Badge variant="success" className="gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Always free
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          The best links for movies, shows, anime &amp; tools
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Jiga List is a community-curated directory of streaming sites,
          download sources, adblockers and utilities. Every link is indexed at
          build time and served statically — no backend, no database, no cost.
          Press{" "}
          <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
            Ctrl K
          </kbd>{" "}
          to search instantly.
        </p>
      </section>

      <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="p-4">
            <CardContent className="flex items-center gap-3 p-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-lg font-semibold tabular-nums">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Browse categories
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.icon);
            return (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <Card className="group h-full p-5 transition-colors hover:border-primary/40 hover:bg-accent/30">
                  <CardContent className="flex items-start gap-3 p-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold">{category.name}</h3>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {category.description}
                      </p>
                      <p className="mt-2 text-xs font-medium text-primary">
                        {category.count} resources
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Editor&apos;s picks
          </h2>
          <Link
            href="/category/movies"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {featured.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
}
