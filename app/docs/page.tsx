"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Flag,
  FolderPlus,
  Github,
  Globe,
  Layers,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

import { categories } from "@/data/categories";
import { resources } from "@/data/resources";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function DocsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Loading documentation…</div>}>
      <DocsContent />
    </React.Suspense>
  );
}

function DocsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "submit-site";
  const prefillResourceId = searchParams.get("resource") || "";

  const [activeTab, setActiveTab] = React.useState(initialTab);

  // Sync tab if url param changes
  React.useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // 1. Submit Site Form State
  const [subTitle, setSubTitle] = React.useState("");
  const [subUrl, setSubUrl] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("movies");
  const [subDesc, setSubDesc] = React.useState("");
  const [subFlags, setSubFlags] = React.useState("free, no-ads");
  const [copiedSiteTemplate, setCopiedSiteTemplate] = React.useState(false);

  const siteIssueMarkdown = React.useMemo(() => {
    return `### [New Resource Proposal] ${subTitle || "<Resource Name>"}

- **Title:** ${subTitle || "Example Name"}
- **URL:** ${subUrl || "https://example.com"}
- **Category:** ${subCategory}
- **Description:** ${subDesc || "Short description of what this site or app offers."}
- **Flags:** ${subFlags || "free, no-ads"}
- **Reason for inclusion:** High quality, active, tested with adblockers.`;
  }, [subTitle, subUrl, subCategory, subDesc, subFlags]);

  const githubSiteIssueUrl = React.useMemo(() => {
    const titleParam = encodeURIComponent(`[New Resource]: ${subTitle || "New Submission"}`);
    const bodyParam = encodeURIComponent(siteIssueMarkdown);
    return `https://github.com/rthaithem/jiga-list/issues/new?title=${titleParam}&body=${bodyParam}`;
  }, [subTitle, siteIssueMarkdown]);

  // 2. Suggest Category Form State
  const [catName, setCatName] = React.useState("");
  const [catSlug, setCatSlug] = React.useState("");
  const [catIcon, setCatIcon] = React.useState("folder");
  const [catDesc, setCatDesc] = React.useState("");
  const [catExamples, setCatExamples] = React.useState("");
  const [copiedCatTemplate, setCopiedCatTemplate] = React.useState(false);

  const handleCatNameChange = (val: string) => {
    setCatName(val);
    setCatSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
  };

  const catIssueMarkdown = React.useMemo(() => {
    return `### [New Category Proposal] ${catName || "<Category Name>"}

- **Category Name:** ${catName || "Example Category"}
- **Suggested Slug:** ${catSlug || "example-slug"}
- **Suggested Icon:** ${catIcon || "folder"}
- **Description:** ${catDesc || "What kind of resources belong in this category?"}
- **Starting Resources / Examples:**
${catExamples || "- Example Site 1 (https://example1.com)\n- Example Site 2 (https://example2.com)"}
- **Why this category should be added:** Adds great value for community members exploring this topic.`;
  }, [catName, catSlug, catIcon, catDesc, catExamples]);

  const githubCatIssueUrl = React.useMemo(() => {
    const titleParam = encodeURIComponent(`[Category Proposal]: ${catName || "New Category"}`);
    const bodyParam = encodeURIComponent(catIssueMarkdown);
    return `https://github.com/rthaithem/jiga-list/issues/new?title=${titleParam}&body=${bodyParam}`;
  }, [catName, catIssueMarkdown]);

  // 3. Report Broken Link Form State
  const prefilledRes = React.useMemo(() => {
    return resources.find((r) => r.id === prefillResourceId);
  }, [prefillResourceId]);

  const [reportTitle, setReportTitle] = React.useState(prefilledRes ? prefilledRes.title : "");
  const [reportUrl, setReportUrl] = React.useState(prefilledRes ? prefilledRes.url : "");
  const [reportReason, setReportReason] = React.useState("broken");
  const [reportDetails, setReportDetails] = React.useState("");
  const [copiedReportTemplate, setCopiedReportTemplate] = React.useState(false);

  React.useEffect(() => {
    if (prefilledRes) {
      setReportTitle(prefilledRes.title);
      setReportUrl(prefilledRes.url);
      setActiveTab("report-issue");
    }
  }, [prefilledRes]);

  const reportIssueMarkdown = React.useMemo(() => {
    const reasonLabels: Record<string, string> = {
      broken: "Dead / Offline Link (Server down or domain seized)",
      malware: "Malicious redirects / Popups / Deceptive downloads",
      paywall: "Introduced paid paywall / No longer free",
      copyright: "DMCA or Copyright infringement request",
      outdated: "Outdated software / No longer maintained",
      other: "Other issue",
    };

    return `### [Issue Report] ${reportTitle || "<Resource Name>"}

- **Resource:** ${reportTitle || "Example Name"}
- **URL:** ${reportUrl || "https://example.com"}
- **Issue Type:** ${reasonLabels[reportReason] || reportReason}
- **Details & Description:** ${reportDetails || "Link fails to resolve or gives 404/502 error."}
- **Device & Browser:** Tested on desktop & mobile with standard browser.`;
  }, [reportTitle, reportUrl, reportReason, reportDetails]);

  const githubReportIssueUrl = React.useMemo(() => {
    const titleParam = encodeURIComponent(`[Broken Link Report]: ${reportTitle || "Dead Link"}`);
    const bodyParam = encodeURIComponent(reportIssueMarkdown);
    return `https://github.com/rthaithem/jiga-list/issues/new?title=${titleParam}&body=${bodyParam}`;
  }, [reportTitle, reportIssueMarkdown]);

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
              <Badge variant="info">Community Curated</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Learn how to use Jiga List, submit new sites, suggest categories, report broken links, and protect your privacy.
            </p>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* Responsive, neatly formatted horizontal scrollbar tabs for mobile & desktop */}
        <div className="border-b pb-2">
          <div className="no-scrollbar flex w-full overflow-x-auto">
            <TabsList className="inline-flex h-auto w-auto min-w-full justify-start gap-1.5 bg-muted/50 p-1.5 sm:min-w-0 sm:justify-start">
              <TabsTrigger
                value="submit-site"
                className="shrink-0 gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-medium"
              >
                <Globe className="h-3.5 w-3.5 text-primary" />
                Submit a Site
              </TabsTrigger>
              <TabsTrigger
                value="suggest-category"
                className="shrink-0 gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-medium"
              >
                <FolderPlus className="h-3.5 w-3.5 text-primary" />
                Suggest Category
              </TabsTrigger>
              <TabsTrigger
                value="report-issue"
                className="shrink-0 gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-medium text-destructive data-[state=active]:text-foreground"
              >
                <Flag className="h-3.5 w-3.5 text-destructive" />
                Report Broken Link
              </TabsTrigger>
              <TabsTrigger
                value="usage"
                className="shrink-0 gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-medium"
              >
                <Zap className="h-3.5 w-3.5" />
                How to Use
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="shrink-0 gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-medium"
              >
                <Shield className="h-3.5 w-3.5" />
                Security &amp; Adblocking
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab 1: Submit a Site */}
        <TabsContent value="submit-site" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Submit a New Website or App</CardTitle>
              </div>
              <CardDescription>
                Jiga List is open source and community-curated. Proposing a new link or tool is done by opening a GitHub Issue on the repository.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    1
                  </div>
                  <h3 className="mt-2 text-sm font-semibold">Verify Site Quality</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Ensure the site is active, accessible without forced paywalls, and free from malware.
                  </p>
                </div>

                <div className="rounded-lg border bg-card p-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    2
                  </div>
                  <h3 className="mt-2 text-sm font-semibold">Generate Issue</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Fill in the form below to auto-format your submission and open it on GitHub with one click.
                  </p>
                </div>

                <div className="rounded-lg border bg-card p-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    3
                  </div>
                  <h3 className="mt-2 text-sm font-semibold">Review &amp; Inclusion</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Maintainers verify the link, assign tags and flags (Free, No Ads), and merge it into the index.
                  </p>
                </div>
              </div>

              {/* Interactive Form */}
              <div className="rounded-lg border border-primary/20 bg-card p-5">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">Interactive Resource Submission Generator</h3>
                    <p className="text-xs text-muted-foreground">
                      Prepare your proposal and launch the prefilled GitHub Issue immediately.
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit gap-1 text-xs">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Auto-formatted
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium">Resource Title</label>
                    <Input
                      placeholder="e.g. Braflix, Stremio, or Revanced"
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">URL</label>
                    <Input
                      placeholder="https://example.com"
                      value={subUrl}
                      onChange={(e) => setSubUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Category</label>
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
                    <label className="mb-1 block text-xs font-medium">Flags</label>
                    <Input
                      placeholder="free, no-ads, open-source, verified"
                      value={subFlags}
                      onChange={(e) => setSubFlags(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium">Short Description</label>
                    <Input
                      placeholder="What does this resource offer? Why is it useful?"
                      value={subDesc}
                      onChange={(e) => setSubDesc(e.target.value)}
                    />
                  </div>
                </div>

                {/* Markdown Preview */}
                <div className="mt-4 rounded-md border bg-muted/30 p-3 font-mono text-xs">
                  <div className="mb-2 flex items-center justify-between text-muted-foreground">
                    <span>Generated Issue Markdown:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 gap-1 px-2 text-[10px]"
                      onClick={() => {
                        navigator.clipboard.writeText(siteIssueMarkdown);
                        setCopiedSiteTemplate(true);
                        setTimeout(() => setCopiedSiteTemplate(false), 2000);
                      }}
                    >
                      {copiedSiteTemplate ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      {copiedSiteTemplate ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap">{siteIssueMarkdown}</pre>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button asChild className="gap-1.5 text-xs">
                    <a href={githubSiteIssueUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Open Issue on GitHub
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => {
                      navigator.clipboard.writeText(siteIssueMarkdown);
                      setCopiedSiteTemplate(true);
                      setTimeout(() => setCopiedSiteTemplate(false), 2000);
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy Markdown Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Suggest Category */}
        <TabsContent value="suggest-category" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Suggest a New Category</CardTitle>
              </div>
              <CardDescription>
                Have an idea for a whole new category (e.g. Podcasts, Emulators, Educational, Audiobooks)? Propose it through GitHub Issues.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-primary/20 bg-card p-5">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">Category Proposal Generator</h3>
                    <p className="text-xs text-muted-foreground">
                      Propose new sections with starting link recommendations.
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit gap-1 text-xs">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Community Growth
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium">Category Name</label>
                    <Input
                      placeholder="e.g. Retro Emulation or Podcasts"
                      value={catName}
                      onChange={(e) => handleCatNameChange(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Suggested Slug</label>
                    <Input
                      placeholder="e.g. emulation"
                      value={catSlug}
                      onChange={(e) => setCatSlug(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Suggested Icon Name</label>
                    <Input
                      placeholder="e.g. Gamepad2, Radio, Headphones, Book"
                      value={catIcon}
                      onChange={(e) => setCatIcon(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Category Purpose</label>
                    <Input
                      placeholder="What kind of resources should be indexed here?"
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium">
                      Initial Recommended Websites / Apps (2-3 examples)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                      placeholder="- Website 1 (https://...)\n- Website 2 (https://...)"
                      value={catExamples}
                      onChange={(e) => setCatExamples(e.target.value)}
                    />
                  </div>
                </div>

                {/* Markdown Preview */}
                <div className="mt-4 rounded-md border bg-muted/30 p-3 font-mono text-xs">
                  <div className="mb-2 flex items-center justify-between text-muted-foreground">
                    <span>Generated Category Markdown:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 gap-1 px-2 text-[10px]"
                      onClick={() => {
                        navigator.clipboard.writeText(catIssueMarkdown);
                        setCopiedCatTemplate(true);
                        setTimeout(() => setCopiedCatTemplate(false), 2000);
                      }}
                    >
                      {copiedCatTemplate ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      {copiedCatTemplate ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap">{catIssueMarkdown}</pre>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button asChild className="gap-1.5 text-xs">
                    <a href={githubCatIssueUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Submit Category on GitHub
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => {
                      navigator.clipboard.writeText(catIssueMarkdown);
                      setCopiedCatTemplate(true);
                      setTimeout(() => setCopiedCatTemplate(false), 2000);
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy Markdown Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Report Broken Link */}
        <TabsContent value="report-issue" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-destructive" />
                <CardTitle className="text-base">Report a Broken Link or Problem</CardTitle>
              </div>
              <CardDescription>
                Help keep the directory fresh by flagging offline sites, deceptive domains, or malicious redirects directly on GitHub.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-destructive">
                      Report Incident / Broken Link
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Submitting a report automatically creates an issue reviewed by the maintenance team.
                    </p>
                  </div>
                  <Badge variant="destructive" className="w-fit gap-1 text-xs">
                    <AlertTriangle className="h-3 w-3" />
                    Live Review
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium">Resource Name</label>
                    <Input
                      placeholder="e.g. MovieSite or AppName"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">URL</label>
                    <Input
                      placeholder="https://broken-site.com"
                      value={reportUrl}
                      onChange={(e) => setReportUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Report Reason</label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      <option value="broken">Dead / Offline Link (Server down or domain seized)</option>
                      <option value="malware">Malicious redirects / Popups / Deceptive downloads</option>
                      <option value="paywall">Introduced paid paywall / No longer free</option>
                      <option value="copyright">DMCA or Copyright infringement</option>
                      <option value="outdated">Outdated software / No longer maintained</option>
                      <option value="other">Other issue</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Additional Details</label>
                    <Input
                      placeholder="e.g. 502 Bad Gateway or redirects to scam"
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                    />
                  </div>
                </div>

                {/* Markdown Preview */}
                <div className="mt-4 rounded-md border bg-muted/30 p-3 font-mono text-xs">
                  <div className="mb-2 flex items-center justify-between text-muted-foreground">
                    <span>Generated Report Markdown:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 gap-1 px-2 text-[10px]"
                      onClick={() => {
                        navigator.clipboard.writeText(reportIssueMarkdown);
                        setCopiedReportTemplate(true);
                        setTimeout(() => setCopiedReportTemplate(false), 2000);
                      }}
                    >
                      {copiedReportTemplate ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      {copiedReportTemplate ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap">{reportIssueMarkdown}</pre>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button asChild variant="destructive" className="gap-1.5 text-xs">
                    <a href={githubReportIssueUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Submit Report on GitHub (Open Issue)
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => {
                      navigator.clipboard.writeText(reportIssueMarkdown);
                      setCopiedReportTemplate(true);
                      setTimeout(() => setCopiedReportTemplate(false), 2000);
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy Report Markdown
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: How to Use */}
        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">User Guide</CardTitle>
              </div>
              <CardDescription>
                Essential tips, shortcuts, and capabilities to make the most of Jiga List.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Search className="h-4 w-4 text-primary" />
                    Instant Search (Ctrl + K)
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Press <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">Ctrl + K</kbd> or press <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">/</kbd> anywhere to open the search palette and find any resource, category, or tag in milliseconds.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Star className="h-4 w-4 text-amber-500" />
                    Favorites &amp; Markdown (.md)
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Click the star icon on any card to bookmark it. In the <strong>Favorites</strong> page, you can export your bookmarks to a Markdown (<code>.md</code>) file or restore them anytime.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Layers className="h-4 w-4 text-primary" />
                    Grid vs. Compact View
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Toggle between the detailed Grid view and the streamlined Compact list view at the top of any resource listing for power browsing.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Globe className="h-4 w-4 text-primary" />
                    Alternate Mirrors &amp; Domains
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Many popular streaming links maintain backup mirror domains. Click <strong>Mirrors</strong> on cards with alternate links to view and access active backups.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Security & Adblocking */}
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
                    <li>Never download or run executable (.exe) or unexpected APK files from streaming sites.</li>
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
