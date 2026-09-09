"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Check,
  Copy,
  ExternalLink,
  Flag as FlagIcon,
  GitFork,
  Link2,
  Star,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Ban,
  CircleDollarSign,
  ArrowDownToLine,
  Loader2,
} from "lucide-react";

import type { Flag, Resource } from "@/data/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/lib/favorites";

const FLAG_META: Record<
  Flag,
  { label: string; icon: React.ReactNode; variant: "success" | "warning" | "info" | "secondary" | "destructive" }
> = {
  recommended: {
    label: "Recommended",
    icon: <Star className="h-3 w-3 fill-current" />,
    variant: "success",
  },
  mirror: { label: "Mirror", icon: <GitFork className="h-3 w-3" />, variant: "secondary" },
  ads: { label: "Ads", icon: <AlertTriangle className="h-3 w-3" />, variant: "warning" },
  nsfw: { label: "NSFW", icon: <ShieldAlert className="h-3 w-3" />, variant: "destructive" },
  "open-source": { label: "Open Source", icon: <Sparkles className="h-3 w-3" />, variant: "info" },
  "no-ads": { label: "No Ads", icon: <Ban className="h-3 w-3" />, variant: "success" },
  free: { label: "Free", icon: <ArrowDownToLine className="h-3 w-3" />, variant: "secondary" },
  premium: { label: "Premium", icon: <CircleDollarSign className="h-3 w-3" />, variant: "warning" },
  verified: { label: "Verified", icon: <ShieldCheck className="h-3 w-3" />, variant: "info" },
  down: { label: "Down", icon: <AlertTriangle className="h-3 w-3" />, variant: "destructive" },
  legal: { label: "Legal", icon: <ShieldCheck className="h-3 w-3" />, variant: "success" },
};

export function ResourceCard({
  resource,
  compact = false,
}: {
  resource: Resource;
  compact?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(resource.id);

  const copyUrl = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resource.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [resource.url]);

  if (compact) {
    return (
      <div className="group flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-accent/30">
        <div className="flex min-w-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => toggleFavorite(resource.id)}
            className="h-7 w-7 shrink-0 text-muted-foreground hover:text-amber-500"
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              className={cn(
                "h-3.5 w-3.5",
                favorited ? "fill-amber-500 text-amber-500" : "text-muted-foreground"
              )}
            />
          </Button>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-medium text-foreground hover:text-primary"
          >
            {resource.title}
          </a>
          <span className="hidden truncate text-xs text-muted-foreground md:inline">
            — {resource.description}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {resource.flags.slice(0, 2).map((flag) => {
            const meta = FLAG_META[flag];
            return (
              <Badge key={flag} variant={meta.variant} className="hidden h-5 px-1.5 text-[10px] sm:inline-flex">
                {meta.label}
              </Badge>
            );
          })}
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" asChild>
            <Link href={`/r/${resource.id}`}>Info</Link>
          </Button>
          <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1" onClick={copyUrl}>
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          </Button>
          <Button size="sm" className="h-7 px-2 text-xs gap-1" asChild>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
              Visit
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-sm font-semibold text-foreground hover:text-primary"
            >
              {resource.title}
            </a>
            <Link
              href={`/r/${resource.id}`}
              className="text-xs text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
            >
              details
            </Link>
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {resource.description}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => toggleFavorite(resource.id)}
          className="h-8 w-8 shrink-0 text-muted-foreground hover:text-amber-500"
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Star
            className={cn(
              "h-4 w-4 transition-transform",
              favorited ? "fill-amber-500 text-amber-500" : "text-muted-foreground"
            )}
          />
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {resource.flags.map((flag) => {
          const meta = FLAG_META[flag];
          return (
            <Tooltip key={flag}>
              <TooltipTrigger asChild>
                <Badge variant={meta.variant} className="gap-1">
                  {meta.icon}
                  {meta.label}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Status: {meta.label}</TooltipContent>
            </Tooltip>
          );
        })}
        {resource.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="text-muted-foreground">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
        <Button size="sm" asChild>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gap-1.5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Visit
          </a>
        </Button>
        <Button size="sm" variant="outline" onClick={copyUrl} className="gap-1.5">
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy URL"}
        </Button>
        {resource.mirrors && resource.mirrors.length > 0 && (
          <MirrorsDialog resource={resource} />
        )}
        <div className="ml-auto">
          <ReportDialog resource={resource} />
        </div>
      </div>
    </div>
  );
}

function MirrorsDialog({ resource }: { resource: Resource }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 text-muted-foreground"
        >
          <GitFork className="h-3.5 w-3.5" />
          Mirrors
          <span className="rounded-full bg-muted px-1.5 text-[10px] tabular-nums">
            {resource.mirrors?.length}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{resource.title} — Mirrors</DialogTitle>
          <DialogDescription>
            Alternate domains for this resource. Mirrors may have different
            uptime, ads or geo-restrictions.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {resource.mirrors?.map((mirror) => (
            <div
              key={mirror.url}
              className="flex items-center justify-between gap-2 rounded-md border bg-muted/30 px-3 py-2"
            >
              <div className="flex min-w-0 flex-col">
                <span className="text-sm font-medium">{mirror.label}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {new URL(mirror.url).hostname}
                </span>
              </div>
              <Button size="sm" variant="outline" asChild>
                <a
                  href={mirror.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-1.5"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  Open
                </a>
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter className="gap-2">
          <Button size="sm" asChild>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-1.5"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Main site
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ReportDialog({ resource }: { resource: Resource }) {
  const [state, setState] = React.useState<"idle" | "sending" | "done">("idle");

  const report = React.useCallback(() => {
    setState("sending");
    const subject = encodeURIComponent(`[Broken Link] ${resource.title}`);
    const body = encodeURIComponent(
      `Resource: ${resource.title}\nURL: ${resource.url}\n\nIssue:`
    );
    window.setTimeout(() => {
      window.location.href = `mailto:reports@jigalist.example?subject=${subject}&body=${body}`;
      setState("done");
      window.setTimeout(() => setState("idle"), 2000);
    }, 300);
  }, [resource]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="gap-1.5 text-muted-foreground hover:text-destructive"
        >
          <FlagIcon className="h-3.5 w-3.5" />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report broken link</DialogTitle>
          <DialogDescription>
            Help the community by reporting a dead, geo-blocked or unsafe link
            for <span className="font-medium text-foreground">{resource.title}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          {resource.url}
        </div>
        <DialogFooter>
          <Button onClick={report} disabled={state !== "idle"} className="gap-1.5">
            {state === "sending" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : state === "done" ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <FlagIcon className="h-3.5 w-3.5" />
            )}
            {state === "done" ? "Submitted" : "Submit report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const FlagBadge = React.forwardRef<
  HTMLDivElement,
  {
    flag: Flag;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ flag, className, ...props }, ref) => {
  const meta = FLAG_META[flag];
  return (
    <Badge
      ref={ref}
      variant={meta.variant}
      className={cn("gap-1", className)}
      {...props}
    >
      {meta.icon}
      {meta.label}
    </Badge>
  );
});
FlagBadge.displayName = "FlagBadge";
