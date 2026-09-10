import Link from "next/link";
import { ArrowRight, BookOpen, Compass, ShieldCheck } from "lucide-react";

import { categories } from "@/data/categories";
import { resources } from "@/data/resources";
import { getCategoryIcon } from "@/components/category-icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FeaturedResources } from "@/components/featured-resources";
import { HomeStats } from "@/components/home-stats";

export default function HomePage() {
  const featured = resources.filter((r) =>
    r.flags.includes("recommended")
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="info" className="gap-1 text-xs">
            <BookOpen className="h-3 w-3 text-cyan-400" />
            Open Wiki &amp; Megathread
          </Badge>
          <Badge variant="success" className="gap-1 text-xs">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            100% Free · Verified Links
          </Badge>
          <Badge variant="outline" className="gap-1 text-xs text-muted-foreground">
            Zero Tracking · Static SSG
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
          The Free Community Wiki &amp; Master Directory
        </h1>
        <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Jiga List is an open, community-curated digital wiki and curated index of verified free tools,
          artificial intelligence services, privacy &amp; adblockers, gaming emulators, open books, and
          operating system utilities. Every resource is verified, indexed at build time, and delivered
          statically with zero tracking, zero ads, and zero server costs. Press{" "}
          <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-foreground">
            Ctrl K
          </kbd>{" "}
          to search across all 16 categories instantly.
        </p>
      </section>

      {/* Real connected metrics */}
      <HomeStats
        resourcesCount={resources.length}
        categoriesCount={categories.length}
      />

      <section id="categories" className="mb-10 scroll-mt-20">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Compass className="h-4 w-4 text-primary" />
            Explore 16 Verified Categories
          </h2>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Fast, zero-latency static navigation
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.icon);
            return (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <Card className="group h-full p-4 transition-all duration-150 hover:border-primary/50 hover:bg-accent/40 hover:shadow-sm">
                  <CardContent className="flex items-start gap-3 p-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-sm font-semibold text-foreground truncate">
                          {category.name}
                        </h3>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {category.description}
                      </p>
                      <p className="mt-2 text-[11px] font-medium text-primary">
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

      <section id="featured-resources" className="scroll-mt-20">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Featured Community Recommendations
          </h2>
          <Link
            href="/category/wiki"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Explore Wiki Resources <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <FeaturedResources resources={featured} />
      </section>
    </div>
  );
}
