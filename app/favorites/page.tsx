"use client";

import * as React from "react";
import Link from "next/link";
import {
  Download,
  FileText,
  FolderUp,
  Heart,
  Sparkles,
  Star,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { useFavorites, exportFavoritesToMarkdown, importFavoritesFromMarkdown } from "@/lib/favorites";
import { resources } from "@/data/resources";
import { ResourceList } from "@/components/resource-list";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FavoritesPage() {
  const { favoriteResources, isLoaded, clearFavorites } = useFavorites();
  const [importModalOpen, setImportModalOpen] = React.useState(false);
  const [clearModalOpen, setClearModalOpen] = React.useState(false);
  const [markdownInput, setMarkdownInput] = React.useState("");
  const [importStatus, setImportStatus] = React.useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        processMarkdownImport(content);
      }
    };
    reader.readAsText(file);
    // reset input
    e.target.value = "";
  };

  const processMarkdownImport = (text: string) => {
    const result = importFavoritesFromMarkdown(text, resources);
    if (result.matchedResources.length > 0) {
      setImportStatus({
        success: true,
        message: `Successfully matched and imported ${result.matchedResources.length} resources (${result.addedCount} new added)!`,
      });
      setTimeout(() => {
        setImportModalOpen(false);
        setImportStatus(null);
        setMarkdownInput("");
      }, 1500);
    } else {
      setImportStatus({
        success: false,
        message: "No matching resources could be found in the provided Markdown text.",
      });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Star className="h-6 w-6 fill-amber-500" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Saved Favorites
              </h1>
              <Badge variant="secondary" className="tabular-nums">
                {favoriteResources.length} saved
              </Badge>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Your locally saved links and bookmarks. Export or import them as a Markdown (<code>.md</code>) file at any time.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Export Markdown */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportFavoritesToMarkdown(favoriteResources)}
            disabled={!isLoaded || favoriteResources.length === 0}
            className="gap-1.5 text-xs"
          >
            <Download className="h-3.5 w-3.5" />
            Export (.md)
          </Button>

          {/* Import Markdown Dialog */}
          <Dialog open={importModalOpen} onOpenChange={setImportModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Upload className="h-3.5 w-3.5" />
                Import (.md)
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Import Favorites from Markdown</DialogTitle>
                <DialogDescription>
                  Upload a <code>.md</code> file or paste markdown containing resource links <code>[Title](url)</code>.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3 py-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".md,.txt,.markdown"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2 border-dashed py-6"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FolderUp className="h-4 w-4" />
                  Choose a .md file from your computer
                </Button>

                <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  <span>Or paste markdown</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <textarea
                  value={markdownInput}
                  onChange={(e) => setMarkdownInput(e.target.value)}
                  placeholder={`# My Favorites\n- [Braflix](https://braflix.gd) - Streaming\n- [uBlock Origin](https://ublockorigin.com)`}
                  rows={5}
                  className="w-full rounded-md border border-input bg-background p-2.5 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                />

                {importStatus && (
                  <div
                    className={`flex items-center gap-2 rounded-md p-2.5 text-xs ${
                      importStatus.success
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {importStatus.success ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    )}
                    <span>{importStatus.message}</span>
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setImportModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={!markdownInput.trim()}
                  onClick={() => processMarkdownImport(markdownInput)}
                >
                  Import Markdown
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Clear all favorites */}
          {favoriteResources.length > 0 && (
            <Dialog open={clearModalOpen} onOpenChange={setClearModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear All
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Clear all saved favorites?</DialogTitle>
                  <DialogDescription>
                    This will remove all {favoriteResources.length} saved resources from your local bookmarks. You can export them to a <code>.md</code> file first to keep a backup.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setClearModalOpen(false)}
                  >
                    Keep Favorites
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      clearFavorites();
                      setClearModalOpen(false);
                    }}
                  >
                    Yes, Clear All
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </header>

      {/* Content */}
      {favoriteResources.length === 0 ? (
        <Card className="border-dashed p-10 text-center">
          <CardContent className="flex flex-col items-center gap-3 p-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Star className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold">No favorites saved yet</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Click the star icon (<Star className="inline h-3.5 w-3.5 fill-amber-500 text-amber-500" />) on any resource card to save it here, or import your bookmarks from a Markdown (<code>.md</code>) file.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link href="/">Explore Resources</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setImportModalOpen(true)}
              >
                Import Markdown (.md)
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ResourceList resources={favoriteResources} />
      )}
    </div>
  );
}
