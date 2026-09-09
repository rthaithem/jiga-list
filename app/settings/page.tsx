"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Check,
  HardDrive,
  Moon,
  Palette,
  RefreshCw,
  RotateCcw,
  Settings as SettingsIcon,
  Sun,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

import {
  useAccent,
  ACCENT_OPTIONS,
  getStorageUsage,
  clearSiteCache,
  type AccentColor,
} from "@/lib/settings";
import { useFavorites } from "@/lib/favorites";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const { accent, changeAccent } = useAccent();
  const { theme, setTheme } = useTheme();
  const { favoriteIds } = useFavorites();

  const [storageInfo, setStorageInfo] = React.useState<{
    bytes: number;
    formatted: string;
    keysCount: number;
  }>({ bytes: 0, formatted: "0 KB", keysCount: 0 });

  const [clearDialogOpen, setClearDialogOpen] = React.useState(false);
  const [clearedSuccess, setClearedSuccess] = React.useState(false);

  const refreshStorage = React.useCallback(() => {
    setStorageInfo(getStorageUsage());
  }, []);

  React.useEffect(() => {
    refreshStorage();
  }, [refreshStorage, favoriteIds]);

  const handleClearCache = (clearFavs: boolean) => {
    clearSiteCache({
      clearFavorites: clearFavs,
      clearThemeSettings: false,
    });
    refreshStorage();
    setClearDialogOpen(false);
    setClearedSuccess(true);
    setTimeout(() => setClearedSuccess(false), 3000);
  };

  const handleResetEverything = () => {
    clearSiteCache({
      clearFavorites: true,
      clearThemeSettings: true,
    });
    changeAccent("cyan");
    setTheme("dark");
    refreshStorage();
    setClearDialogOpen(false);
    setClearedSuccess(true);
    setTimeout(() => setClearedSuccess(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <SettingsIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings &amp; Preferences</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Customize appearance accent colors, manage local cache, and configure storage.
            </p>
          </div>
        </div>
      </header>

      {clearedSuccess && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Cache and local data cleared successfully!</span>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {/* Appearance & Accent Color Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Accent Color / تخصيص الألوان</CardTitle>
            </div>
            <CardDescription>
              Choose an accent highlight color for buttons, badges, and focus rings across the interface.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ACCENT_OPTIONS.map((opt) => {
                const isActive = accent === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => changeAccent(opt.id)}
                    className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                      isActive
                        ? "border-primary bg-primary/10 ring-1 ring-primary"
                        : "border-border hover:border-primary/40 hover:bg-muted/40"
                    }`}
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full shadow-sm"
                      style={{ backgroundColor: opt.hex }}
                    >
                      {isActive && <Check className="h-3.5 w-3.5 text-white" />}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold">{opt.name}</p>
                      <p className="truncate text-[10px] text-muted-foreground">{opt.nameAr}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dark / Light Theme selector */}
            <div className="border-t pt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Base Theme Mode
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="gap-2 text-xs"
                >
                  <Moon className="h-3.5 w-3.5" />
                  Dark Mode
                </Button>
                <Button
                  size="sm"
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="gap-2 text-xs"
                >
                  <Sun className="h-3.5 w-3.5" />
                  Light Mode
                </Button>
                <Button
                  size="sm"
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className="text-xs"
                >
                  System Default
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cache & Data Management Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Storage &amp; Cache / إدارة الكاش والبيانات</CardTitle>
            </div>
            <CardDescription>
              Jiga List runs completely in your browser without tracking or remote databases. All preferences and favorites are stored locally.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/20 p-4">
              <div>
                <p className="text-xs text-muted-foreground">Local storage occupied</p>
                <p className="text-lg font-bold tabular-nums text-foreground">
                  {storageInfo.formatted}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    ({storageInfo.keysCount} keys, {favoriteIds.length} saved favorites)
                  </span>
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshStorage}
                className="gap-1.5 text-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
              <div>
                <h4 className="text-sm font-semibold">Clear Application Cache</h4>
                <p className="text-xs text-muted-foreground">
                  Purge cached session states, temporary searches, or reset saved bookmarks.
                </p>
              </div>

              <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="gap-1.5 text-xs">
                    <Trash2 className="h-3.5 w-3.5" />
                    Clear Cache &amp; Data
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Clear Storage &amp; Cache</DialogTitle>
                    <DialogDescription>
                      Select what you want to clear from your browser.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-2 py-3">
                    <Button
                      variant="outline"
                      className="justify-start gap-2 text-left"
                      onClick={() => handleClearCache(false)}
                    >
                      <HardDrive className="h-4 w-4 text-amber-500" />
                      <div>
                        <div className="text-xs font-semibold">Clear Search &amp; Temp Cache only</div>
                        <div className="text-[10px] text-muted-foreground">
                          Keeps your saved favorites and accent color intact
                        </div>
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      className="justify-start gap-2 text-left"
                      onClick={() => handleClearCache(true)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <div>
                        <div className="text-xs font-semibold">Clear Saved Favorites</div>
                        <div className="text-[10px] text-muted-foreground">
                          Deletes all {favoriteIds.length} bookmarks stored locally
                        </div>
                      </div>
                    </Button>

                    <Button
                      variant="destructive"
                      className="justify-start gap-2 text-left"
                      onClick={handleResetEverything}
                    >
                      <RotateCcw className="h-4 w-4" />
                      <div>
                        <div className="text-xs font-semibold">Factory Reset (All Data)</div>
                        <div className="text-[10px] text-destructive-foreground/80">
                          Resets favorites, custom theme, and all local storage
                        </div>
                      </div>
                    </Button>
                  </div>

                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setClearDialogOpen(false)}>
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Community & Documentation Link Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-semibold">Need Help or Want to Add a Site?</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                Read the usage guide, security recommendations, or submit a new site via GitHub Issues.
              </p>
            </div>
            <Button asChild size="sm" className="gap-1.5 text-xs">
              <Link href="/docs">
                View Documentation &amp; Contribute
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
