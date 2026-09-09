"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Github,
  Globe,
  HelpCircle,
  KeyRound,
  Layers,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Zap,
} from "lucide-react";

import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function DocsPage() {
  // Submission Form State
  const [subTitle, setSubTitle] = React.useState("");
  const [subUrl, setSubUrl] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("movies");
  const [subDesc, setSubDesc] = React.useState("");
  const [subFlags, setSubFlags] = React.useState("free, no-ads");
  const [copiedTemplate, setCopiedTemplate] = React.useState(false);

  const issueMarkdown = React.useMemo(() => {
    return `### [New Resource Proposal] ${subTitle || "<Resource Name>"}

- **Title:** ${subTitle || "Example Name"}
- **URL:** ${subUrl || "https://example.com"}
- **Category:** ${subCategory}
- **Description:** ${subDesc || "Short description of what this site/app offers."}
- **Flags:** ${subFlags || "free, no-ads"}
- **Reason for inclusion:** High quality, safe, tested with adblockers.`;
  }, [subTitle, subUrl, subCategory, subDesc, subFlags]);

  const githubIssueUrl = React.useMemo(() => {
    const titleParam = encodeURIComponent(`[New Resource]: ${subTitle || "New Submission"}`);
    const bodyParam = encodeURIComponent(issueMarkdown);
    return `https://github.com/rthaithem/jiga-list/issues/new?title=${titleParam}&body=${bodyParam}`;
  }, [subTitle, issueMarkdown]);

  const copyTemplate = () => {
    navigator.clipboard.writeText(issueMarkdown);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Documentation &amp; Guides</h1>
              <Badge variant="info">Wiki &amp; Community</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Learn how to navigate Jiga List, use power-features, protect your browsing, and contribute new sites through GitHub Issues.
            </p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="contribute" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-flex">
          <TabsTrigger value="contribute" className="gap-1.5 text-xs">
            <Github className="h-3.5 w-3.5" />
            Submit a Site (GitHub Issue)
          </TabsTrigger>
          <TabsTrigger value="usage" className="gap-1.5 text-xs">
            <Zap className="h-3.5 w-3.5" />
            How to Use
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5 text-xs">
            <Shield className="h-3.5 w-3.5" />
            Security &amp; Adblocking
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: How to Submit / Add a Site via GitHub Issues */}
        <TabsContent value="contribute" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">
                  How to Add a Site or App to Jiga List / كيفية إضافة موقع أو تطبيق
                </CardTitle>
              </div>
              <CardDescription>
                Jiga List is open source and community-curated. Adding a new website, tool, or Android app is done by <strong>opening an Issue on GitHub</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step by Step Flow */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    1
                  </div>
                  <h3 className="mt-2 text-sm font-semibold">Verify Site Quality</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Ensure the site is active, accessible without malicious paywalls or malware, and compatible with adblockers.
                  </p>
                </div>

                <div className="rounded-lg border bg-card p-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    2
                  </div>
                  <h3 className="mt-2 text-sm font-semibold">Open a GitHub Issue</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Visit the official GitHub repository and click on <strong>New Issue</strong>, or use the quick submission generator below.
                  </p>
                </div>

                <div className="rounded-lg border bg-card p-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    3
                  </div>
                  <h3 className="mt-2 text-sm font-semibold">Review &amp; Inclusion</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Maintainers test the link, add flags (e.g., No Ads, Open Source), and merge it into the static dataset.
                  </p>
                </div>
              </div>

              {/* Interactive Issue Generator */}
              <div className="rounded-lg border border-primary/30 bg-card p-5">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Interactive GitHub Issue Generator / مولّد طلب الإضافة
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Fill in the details below to generate a pre-formatted GitHub Issue link ready to submit with one click.
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit gap-1 text-xs">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Auto-formatted
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium">Resource Title / اسم الموقع</label>
                    <Input
                      placeholder="e.g. Braflix or Revanced"
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">URL / رابط الموقع أو التطبيق</label>
                    <Input
                      placeholder="https://example.com"
                      value={subUrl}
                      onChange={(e) => setSubUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Category / التصنيف</label>
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name} ({c.slug})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Flags / الخصائص</label>
                    <Input
                      placeholder="free, no-ads, open-source, verified"
                      value={subFlags}
                      onChange={(e) => setSubFlags(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium">Description / وصف مختصر</label>
                    <Input
                      placeholder="What does this resource offer? Why is it useful?"
                      value={subDesc}
                      onChange={(e) => setSubDesc(e.target.value)}
                    />
                  </div>
                </div>

                {/* Markdown Preview Box */}
                <div className="mt-4 rounded-md border bg-muted/30 p-3 font-mono text-xs">
                  <div className="mb-2 flex items-center justify-between text-muted-foreground">
                    <span>Generated Issue Markdown:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 gap-1 px-2 text-[10px]"
                      onClick={copyTemplate}
                    >
                      {copiedTemplate ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      {copiedTemplate ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap">{issueMarkdown}</pre>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button asChild className="gap-1.5 text-xs">
                    <a href={githubIssueUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Open Issue on GitHub (فتح Issue مباشرة)
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyTemplate} className="gap-1.5 text-xs">
                    <Copy className="h-3.5 w-3.5" />
                    Copy Markdown Template
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="text-xs">
                    <a
                      href="https://github.com/rthaithem/jiga-list/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Browse existing issues <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: How to Use Jiga List */}
        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">User Guide / دليل استعمال الموقع</CardTitle>
              </div>
              <CardDescription>
                Essential tips and keyboard shortcuts to make the most of Jiga List.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Search & Shortcuts */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Search className="h-4 w-4 text-primary" />
                    Instant Search (Ctrl + K)
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Press <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">Ctrl + K</kbd> or press <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">/</kbd> anywhere to open the fuzzy search palette and find any resource, category, or tag in milliseconds.
                  </p>
                </div>

                {/* Favorites & Export */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Star className="h-4 w-4 text-amber-500" />
                    Favorites &amp; Markdown (.md)
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Click the star icon on any card to bookmark it. In the <strong>Favorites</strong> page, you can export your bookmarks to a Markdown (<code>.md</code>) file or restore them anytime.
                  </p>
                </div>

                {/* View Modes */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Layers className="h-4 w-4 text-primary" />
                    Grid vs. Compact View
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Toggle between the detailed Grid view and the streamlined Compact view at the top of any resource listing for power-browsing.
                  </p>
                </div>

                {/* Mirrors */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Globe className="h-4 w-4 text-primary" />
                    Alternate Mirrors &amp; Domains
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Many popular streaming links maintain backup mirror domains. Click <strong>Mirrors</strong> or view the resource details page to access active backups.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Security & Adblocker Guide */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <CardTitle className="text-base">Safety &amp; Adblocking Starter Pack</CardTitle>
              </div>
              <CardDescription>
                Free streaming websites frequently display intrusive popups and redirects. Protect your device with these recommended tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <Shield className="h-4 w-4 text-emerald-500" />
                      1. uBlock Origin (Essential)
                    </div>
                    <Badge variant="success">Must Have</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    The single most effective content blocker available for Firefox, Chrome, and Edge. Blocks video ads, overlay popups, and crypto-miners automatically.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 h-7 gap-1 text-xs" asChild>
                    <a href="https://ublockorigin.com" target="_blank" rel="noopener noreferrer">
                      Install uBlock Origin <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <Globe className="h-4 w-4 text-primary" />
                      2. Encrypted DNS (Bypass ISP Blocks)
                    </div>
                    <Badge variant="outline">Unblock Links</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    If an address shows &quot;Site cannot be reached&quot;, your local ISP may have DNS-blocked it. Change your browser or router DNS to:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono">
                    <span className="rounded bg-muted px-2 py-1">Cloudflare: 1.1.1.1</span>
                    <span className="rounded bg-muted px-2 py-1">AdGuard DNS: 94.140.14.14</span>
                    <span className="rounded bg-muted px-2 py-1">Quad9: 9.9.9.9</span>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    3. Safe Streaming Rules
                  </div>
                  <ul className="mt-2 list-disc pl-5 text-xs space-y-1 text-muted-foreground">
                    <li>Never download or run <code>.exe</code> or unexpected APK files from streaming sites.</li>
                    <li>Ignore fake &quot;Update Flash Player&quot; or &quot;Your device has a virus&quot; alerts.</li>
                    <li>Always use official links listed on Jiga List or their verified mirrors.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
