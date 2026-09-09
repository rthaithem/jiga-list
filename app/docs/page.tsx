"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Cloud,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  FileCode2,
  Flag,
  FolderPlus,
  GitBranch,
  Github,
  Globe,
  HelpCircle,
  Layers,
  Rocket,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Users,
  Zap,
} from "lucide-react";

import { categories } from "@/data/categories";
import { resources } from "@/data/resources";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SITE_CONFIG } from "@/lib/site-config";

const REPORT_REASONS: Record<string, string> = {
  dead: "Dead / Offline Link (Domain expired, seized, or constant 404/502)",
  malware: "Malicious popups / Deceptive download buttons / Redirects",
  paywall: "Enforced paid paywall or subscription requirement",
  copyright: "DMCA or Rights Holder takedown request",
  outdated: "Outdated software / No longer maintained",
  other: "Other issue",
};

export default function DocsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          Loading documentation…
        </div>
      }
    >
      <DocsContent />
    </React.Suspense>
  );
}

type MainSection = "contribute" | "guide" | "security" | "developers";
type ContributeType = "site" | "category" | "report";

function DocsContent() {
  const searchParams = useSearchParams();

  // Parse initial section and contribution sub-type from URL parameters
  const initialTab = searchParams.get("tab") || "contribute";
  const prefillResourceId = searchParams.get("resource") || "";

  const [activeSection, setActiveSection] = React.useState<MainSection>(() => {
    if (initialTab === "usage" || initialTab === "guide") return "guide";
    if (initialTab === "security") return "security";
    if (initialTab === "developers" || initialTab === "dev" || initialTab === "code") return "developers";
    return "contribute";
  });

  const [contributeType, setContributeType] = React.useState<ContributeType>(() => {
    if (initialTab === "suggest-category") return "category";
    if (initialTab === "report-issue" || prefillResourceId) return "report";
    return "site";
  });

  // Sync state if query params change
  React.useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "usage" || tabParam === "guide") {
      setActiveSection("guide");
    } else if (tabParam === "security") {
      setActiveSection("security");
    } else if (tabParam === "developers" || tabParam === "dev" || tabParam === "code") {
      setActiveSection("developers");
    } else if (tabParam === "suggest-category") {
      setActiveSection("contribute");
      setContributeType("category");
    } else if (tabParam === "report-issue" || searchParams.get("resource")) {
      setActiveSection("contribute");
      setContributeType("report");
    } else if (tabParam === "submit-site") {
      setActiveSection("contribute");
      setContributeType("site");
    }
  }, [searchParams]);

  // Form 1: Submit Site
  const [siteTitle, setSiteTitle] = React.useState("");
  const [siteUrl, setSiteUrl] = React.useState("");
  const [siteCategory, setSiteCategory] = React.useState("movies");
  const [siteDescription, setSiteDescription] = React.useState("");
  const [siteFlags, setSiteFlags] = React.useState("Free, No Ads");
  const [copiedSite, setCopiedSite] = React.useState(false);

  const siteIssueMarkdown = React.useMemo(() => {
    return `### [New Resource Proposal] ${siteTitle || "<Resource Name>"}

- **Title:** ${siteTitle || "Example Site"}
- **URL:** ${siteUrl || "https://example.com"}
- **Category:** ${siteCategory}
- **Description:** ${siteDescription || "Brief explanation of the service and content offered."}
- **Flags:** ${siteFlags || "Free, No Ads"}
- **Verification:** Active domain, verified functional and safe with adblocking.`;
  }, [siteTitle, siteUrl, siteCategory, siteDescription, siteFlags]);

  const siteGithubUrl = React.useMemo(() => {
    const title = encodeURIComponent(`[New Resource]: ${siteTitle || "New Submission"}`);
    const body = encodeURIComponent(siteIssueMarkdown);
    return `${SITE_CONFIG.githubIssuesUrl}?title=${title}&body=${body}`;
  }, [siteTitle, siteIssueMarkdown]);

  // Form 2: Suggest Category
  const [catName, setCatName] = React.useState("");
  const [catSlug, setCatSlug] = React.useState("");
  const [catIcon, setCatIcon] = React.useState("Folder");
  const [catDesc, setCatDesc] = React.useState("");
  const [catExamples, setCatExamples] = React.useState("");
  const [copiedCat, setCopiedCat] = React.useState(false);

  const handleCategoryNameChange = (val: string) => {
    setCatName(val);
    setCatSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
  };

  const catIssueMarkdown = React.useMemo(() => {
    return `### [Category Proposal] ${catName || "<Category Name>"}

- **Category Name:** ${catName || "Example Category"}
- **Slug:** ${catSlug || "example-category"}
- **Suggested Icon:** ${catIcon || "Folder"}
- **Description:** ${catDesc || "What kind of resources belong in this category?"}
- **Initial Recommended Sites / Apps:**
${catExamples || "- Example Resource 1 (https://...)\n- Example Resource 2 (https://...)"}
- **Reason:** Broadens the directory with useful community-requested resources.`;
  }, [catName, catSlug, catIcon, catDesc, catExamples]);

  const catGithubUrl = React.useMemo(() => {
    const title = encodeURIComponent(`[Category Proposal]: ${catName || "New Category"}`);
    const body = encodeURIComponent(catIssueMarkdown);
    return `${SITE_CONFIG.githubIssuesUrl}?title=${title}&body=${body}`;
  }, [catName, catIssueMarkdown]);

  // Form 3: Report Issue
  const prefillResource = React.useMemo(() => {
    return resources.find((r) => r.id === prefillResourceId);
  }, [prefillResourceId]);

  const [repTitle, setRepTitle] = React.useState(prefillResource ? prefillResource.title : "");
  const [repUrl, setRepUrl] = React.useState(prefillResource ? prefillResource.url : "");
  const [repReason, setRepReason] = React.useState("dead");
  const [repNotes, setRepNotes] = React.useState("");
  const [copiedReport, setCopiedReport] = React.useState(false);

  React.useEffect(() => {
    if (prefillResource) {
      setRepTitle(prefillResource.title);
      setRepUrl(prefillResource.url);
      setContributeType("report");
      setActiveSection("contribute");
    }
  }, [prefillResource]);

  const reportIssueMarkdown = React.useMemo(() => {
    return `### [Broken Link / Incident Report] ${repTitle || "<Resource Name>"}

- **Resource:** ${repTitle || "Resource Name"}
- **URL:** ${repUrl || "https://example.com"}
- **Reason:** ${REPORT_REASONS[repReason] || repReason}
- **Details:** ${repNotes || "Link fails to resolve or serves deceptive advertising."}
- **Reported via:** Jiga List Documentation Portal`;
  }, [repTitle, repUrl, repReason, repNotes]);

  const reportGithubUrl = React.useMemo(() => {
    const title = encodeURIComponent(`[Broken Link Report]: ${repTitle || "Dead Link"}`);
    const body = encodeURIComponent(reportIssueMarkdown);
    return `${SITE_CONFIG.githubIssuesUrl}?title=${title}&body=${body}`;
  }, [repTitle, reportIssueMarkdown]);

  // Developer tab helper states
  const [copiedDevSnippet, setCopiedDevSnippet] = React.useState(false);
  const [copiedConfigSnippet, setCopiedConfigSnippet] = React.useState(false);
  const [copiedCloudflareSnippet, setCopiedCloudflareSnippet] = React.useState(false);
  const [copiedGhPagesWorkflow, setCopiedGhPagesWorkflow] = React.useState(false);
  const [deployPlatformTab, setDeployPlatformTab] = React.useState<"vercel" | "cloudflare" | "github">("vercel");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Documentation &amp; Community
            </h1>
            <Badge variant="outline" className="hidden sm:inline-flex border-primary/40 text-primary">
              v1.0
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Guides, developer resources, GitHub integrations, and community contribution tools for Jiga List.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2 sm:pt-0">
          <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3.5 w-3.5" />
              Repository
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </a>
          </Button>

          <Button variant="default" size="sm" asChild className="gap-1.5 text-xs">
            <a
              href={SITE_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-3.5 w-3.5" />
              Live Site
            </a>
          </Button>
        </div>
      </div>

      {/* Main Section Navigation Bar */}
      <div className="mb-8 grid grid-cols-2 gap-2 rounded-xl bg-muted/60 p-1.5 sm:grid-cols-4 sm:gap-2">
        <button
          type="button"
          onClick={() => setActiveSection("contribute")}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
            activeSection === "contribute"
              ? "bg-background text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Github className="h-4 w-4 text-primary shrink-0" />
          <span className="truncate">GitHub Issues</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("developers")}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
            activeSection === "developers"
              ? "bg-background text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Code2 className="h-4 w-4 text-primary shrink-0" />
          <span className="truncate">Developers</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("guide")}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
            activeSection === "guide"
              ? "bg-background text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-4 w-4 text-primary shrink-0" />
          <span className="truncate">User Guide</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("security")}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
            activeSection === "security"
              ? "bg-background text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          <span className="truncate">Adblock &amp; Safety</span>
        </button>
      </div>

      {/* SECTION 1: COMMUNITY CONTRIBUTIONS (GITHUB ISSUES) */}
      {activeSection === "contribute" && (
        <div className="space-y-6">
          {/* Sub-Type Selector Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Community Contribution Hub
              </h2>
              <p className="text-xs text-muted-foreground">
                All submissions, category proposals, and incident reports are handled via GitHub Issues.
              </p>
            </div>

            <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setContributeType("site")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  contributeType === "site"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe className="h-3.5 w-3.5 text-primary" />
                Submit Site
              </button>

              <button
                type="button"
                onClick={() => setContributeType("category")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  contributeType === "category"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FolderPlus className="h-3.5 w-3.5 text-primary" />
                Suggest Category
              </button>

              <button
                type="button"
                onClick={() => setContributeType("report")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  contributeType === "report"
                    ? "bg-background text-destructive shadow-sm"
                    : "text-muted-foreground hover:text-destructive"
                }`}
              >
                <Flag className="h-3.5 w-3.5" />
                Report Broken Link
              </button>
            </div>
          </div>

          {/* Form 1: Submit a Site */}
          {contributeType === "site" && (
            <div className="space-y-5 rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Submit a Website, Tool, or Android App
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Fill in the details below. We format the proposal and launch a ready-to-submit GitHub Issue.
                  </p>
                </div>
                <Badge variant="outline" className="w-fit text-xs gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Auto-formatted Issue
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Resource Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Stremio, Braflix, or Revanced"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Official URL <span className="text-primary">*</span>
                  </label>
                  <Input
                    placeholder="https://example.com"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Category <span className="text-primary">*</span>
                  </label>
                  <select
                    value={siteCategory}
                    onChange={(e) => setSiteCategory(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name} ({cat.slug})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Flags / Tags
                  </label>
                  <Input
                    placeholder="Free, No Ads, Open Source, Verified"
                    value={siteFlags}
                    onChange={(e) => setSiteFlags(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Description &amp; Why It Should Be Added
                  </label>
                  <Input
                    placeholder="Brief description of features, quality, and ad levels..."
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Generated Markdown Preview Box */}
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>GitHub Issue Preview:</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(siteIssueMarkdown);
                      setCopiedSite(true);
                      setTimeout(() => setCopiedSite(false), 2000);
                    }}
                    className="flex items-center gap-1 text-[11px] hover:text-foreground"
                  >
                    {copiedSite ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy text
                      </>
                    )}
                  </button>
                </div>
                <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap font-mono text-xs text-foreground/90">
                  {siteIssueMarkdown}
                </pre>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <Button asChild className="gap-2">
                  <a href={siteGithubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Open Issue on GitHub
                  </a>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(siteIssueMarkdown);
                    setCopiedSite(true);
                    setTimeout(() => setCopiedSite(false), 2000);
                  }}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copiedSite ? "Template Copied!" : "Copy Markdown Template"}
                </Button>
              </div>
            </div>
          )}

          {/* Form 2: Suggest Category */}
          {contributeType === "category" && (
            <div className="space-y-5 rounded-xl border border-border bg-card p-5 sm:p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Suggest a New Section or Category
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Propose a topic not yet covered in Jiga List (e.g. Podcasts, Emulators, Educational).
                  </p>
                </div>
                <Badge variant="outline" className="w-fit text-xs gap-1">
                  <FolderPlus className="h-3 w-3 text-primary" />
                  Category Request
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Category Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Emulation &amp; ROMs, Podcasts, Audiobooks"
                    value={catName}
                    onChange={(e) => handleCategoryNameChange(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Suggested Slug
                  </label>
                  <Input
                    placeholder="e.g. emulation"
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Suggested Icon Name
                  </label>
                  <Input
                    placeholder="e.g. Gamepad2, Radio, Headphones, Book"
                    value={catIcon}
                    onChange={(e) => setCatIcon(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Category Description
                  </label>
                  <Input
                    placeholder="What kind of resources belong in this category?"
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Starting Recommended Sites (2 to 3 quality links)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full rounded-md border border-input bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="- Site 1 (https://example1.com) - Short summary&#10;- Site 2 (https://example2.com) - Short summary"
                    value={catExamples}
                    onChange={(e) => setCatExamples(e.target.value)}
                  />
                </div>
              </div>

              {/* Generated Markdown Preview Box */}
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>GitHub Issue Preview:</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(catIssueMarkdown);
                      setCopiedCat(true);
                      setTimeout(() => setCopiedCat(false), 2000);
                    }}
                    className="flex items-center gap-1 text-[11px] hover:text-foreground"
                  >
                    {copiedCat ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy text
                      </>
                    )}
                  </button>
                </div>
                <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap font-mono text-xs text-foreground/90">
                  {catIssueMarkdown}
                </pre>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <Button asChild className="gap-2">
                  <a href={catGithubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Propose Category on GitHub
                  </a>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(catIssueMarkdown);
                    setCopiedCat(true);
                    setTimeout(() => setCopiedCat(false), 2000);
                  }}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copiedCat ? "Template Copied!" : "Copy Markdown Template"}
                </Button>
              </div>
            </div>
          )}

          {/* Form 3: Report Broken Link */}
          {contributeType === "report" && (
            <div className="space-y-5 rounded-xl border border-destructive/30 bg-card p-5 sm:p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Report a Broken Link or Problem
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Notice a dead website, suspicious redirect, or malware? Report it to help keep Jiga List clean.
                  </p>
                </div>
                <Badge variant="destructive" className="w-fit text-xs gap-1">
                  <Flag className="h-3 w-3" />
                  Triage Report
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Resource Title
                  </label>
                  <Input
                    placeholder="e.g. Resource Name"
                    value={repTitle}
                    onChange={(e) => setRepTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    URL Address
                  </label>
                  <Input
                    placeholder="https://broken-site.com"
                    value={repUrl}
                    onChange={(e) => setRepUrl(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Issue Reason
                  </label>
                  <select
                    value={repReason}
                    onChange={(e) => setRepReason(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="dead">Dead / Offline Link (Server down, 404/502)</option>
                    <option value="malware">Malicious popups / Fake download buttons</option>
                    <option value="paywall">Enforced paid paywall or subscription</option>
                    <option value="copyright">DMCA or Rights Holder takedown</option>
                    <option value="outdated">Outdated / No longer functioning</option>
                    <option value="other">Other issue</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Details / Error Description
                  </label>
                  <Input
                    placeholder="e.g. Domain returns 502 or domain parked"
                    value={repNotes}
                    onChange={(e) => setRepNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Generated Markdown Preview Box */}
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>GitHub Issue Preview:</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(reportIssueMarkdown);
                      setCopiedReport(true);
                      setTimeout(() => setCopiedReport(false), 2000);
                    }}
                    className="flex items-center gap-1 text-[11px] hover:text-foreground"
                  >
                    {copiedReport ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy text
                      </>
                    )}
                  </button>
                </div>
                <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap font-mono text-xs text-foreground/90">
                  {reportIssueMarkdown}
                </pre>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <Button asChild variant="destructive" className="gap-2">
                  <a href={reportGithubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Submit Report on GitHub
                  </a>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(reportIssueMarkdown);
                    setCopiedReport(true);
                    setTimeout(() => setCopiedReport(false), 2000);
                  }}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copiedReport ? "Template Copied!" : "Copy Report Markdown"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: DEVELOPER & PROGRAMMING COMMUNITY (مجتمع البرمجة) */}
      {activeSection === "developers" && (
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">
                Developer Community &amp; Architecture Wiki
              </h2>
              <Badge variant="outline" className="border-primary/40 text-primary text-[11px]">
                Open Source
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Technical architecture, TypeScript schemas, GitHub Issues linking instructions, and PR guidelines.
            </p>
          </div>

          {/* Deployment Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Official Production Deployment</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Hosted with high availability and instant global CDN edge distribution.
              </p>
            </div>
            <Button size="sm" asChild className="gap-1.5 shrink-0 text-xs">
              <a href={SITE_CONFIG.url} target="_blank" rel="noopener noreferrer">
                {SITE_CONFIG.url}
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>

          {/* Step 1: Connecting your Fork to GitHub Issues */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GitBranch className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    1. Connecting your Fork to GitHub Issues
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    How someone downloading or forking this project can link all buttons to their own repo.
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px]">Zero-Hassle</Badge>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              All GitHub interactions (Submit Site, Propose Category, Report Broken Link, Repository Links, and Contributor statistics) are centrally managed in a single file: <code className="font-mono rounded bg-muted px-1.5 py-0.5 text-foreground">/lib/site-config.ts</code>.
            </p>

            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>/lib/site-config.ts</span>
                <button
                  type="button"
                  onClick={() => {
                    const snip = `export const SITE_CONFIG = {
  name: "Jiga List",
  url: "https://your-domain.vercel.app",
  author: "your-username",
  githubRepo: "your-username/your-repo",
  githubUrl: "https://github.com/your-username/your-repo",
  githubIssuesUrl: "https://github.com/your-username/your-repo/issues/new",
  githubContributorsApi: "https://api.github.com/repos/your-username/your-repo/contributors",
  githubContributorsGraph: "https://github.com/your-username/your-repo/graphs/contributors",
};`;
                    navigator.clipboard.writeText(snip);
                    setCopiedConfigSnippet(true);
                    setTimeout(() => setCopiedConfigSnippet(false), 2000);
                  }}
                  className="flex items-center gap-1 text-[11px] hover:text-foreground"
                >
                  {copiedConfigSnippet ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy config
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto whitespace-pre font-mono text-xs text-foreground/90">
{`export const SITE_CONFIG = {
  name: "Jiga List",
  url: "${SITE_CONFIG.url}",
  author: "${SITE_CONFIG.author}",
  githubRepo: "${SITE_CONFIG.githubRepo}",
  githubUrl: "${SITE_CONFIG.githubUrl}",
  githubIssuesUrl: "${SITE_CONFIG.githubIssuesUrl}",
  githubContributorsApi: "${SITE_CONFIG.githubContributorsApi}",
  githubContributorsGraph: "${SITE_CONFIG.githubContributorsGraph}",
};`}
              </pre>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground list-disc pl-5">
              <li>
                <strong className="text-foreground">Automated Query Parameters:</strong> All issue generators format the title and markdown body, then encode them into <code className="font-mono text-[11px]">?title=...&amp;body=...</code> query strings passed to GitHub.
              </li>
              <li>
                <strong className="text-foreground">Dynamic Contributors Metric:</strong> The home page requests your repository&apos;s contributors list in real time via the public GitHub REST API.
              </li>
            </div>
          </div>

          {/* Step 2: Data Schema & Adding Resources */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileCode2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  2. TypeScript Schema &amp; Adding Resources via PR
                </h3>
                <p className="text-xs text-muted-foreground">
                  The data layer lives in typed TypeScript arrays in <code className="font-mono text-[11px]">/data/resources.ts</code>.
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              To add a new site, open <code className="font-mono rounded bg-muted px-1.5 py-0.5 text-foreground">data/resources.ts</code> and append a new object adhering to the <code className="font-mono rounded bg-muted px-1.5 py-0.5 text-foreground">Resource</code> type:
            </p>

            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>Example Resource Object</span>
                <button
                  type="button"
                  onClick={() => {
                    const snip = `{
  id: "movies-braflix",
  title: "Braflix",
  url: "https://braflix.gd",
  category: "movies",
  description: "Clean streaming interface with multi-server auto-failover and subbed/dubbed audio tracks.",
  flags: ["recommended", "free", "no-ads", "verified"],
  mirrors: ["https://braflix.st"],
},`;
                    navigator.clipboard.writeText(snip);
                    setCopiedDevSnippet(true);
                    setTimeout(() => setCopiedDevSnippet(false), 2000);
                  }}
                  className="flex items-center gap-1 text-[11px] hover:text-foreground"
                >
                  {copiedDevSnippet ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy snippet
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto whitespace-pre font-mono text-xs text-foreground/90">
{`{
  id: "movies-braflix",
  title: "Braflix",
  url: "https://braflix.gd",
  category: "movies",
  description: "Clean streaming interface with multi-server auto-failover and subbed/dubbed audio tracks.",
  flags: ["recommended", "free", "no-ads", "verified"],
  mirrors: ["https://braflix.st"],
}`}
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="rounded-lg border bg-muted/20 p-3">
                <span className="font-semibold text-foreground">Available Flags:</span>
                <p className="mt-1 text-muted-foreground text-[11px] leading-relaxed">
                  <code className="font-mono">recommended</code>, <code className="font-mono">mirror</code>, <code className="font-mono">ads</code>, <code className="font-mono">no-ads</code>, <code className="font-mono">foss</code>, <code className="font-mono">free</code>, <code className="font-mono">verified</code>
                </p>
              </div>
              <div className="rounded-lg border bg-muted/20 p-3">
                <span className="font-semibold text-foreground">Static Pre-rendering:</span>
                <p className="mt-1 text-muted-foreground text-[11px] leading-relaxed">
                  Every resource automatically receives its own static page at <code className="font-mono">/r/[id]</code> with OpenGraph cards and mirror switcher.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Local Development & Build Workflow */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  3. Development Commands &amp; Static Export
                </h3>
                <p className="text-xs text-muted-foreground">
                  Run locally with zero environment variables or database setup.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 font-mono text-xs sm:grid-cols-2">
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="text-muted-foreground text-[11px] font-sans">1. Start development server</div>
                <div className="mt-1 font-semibold text-foreground">npm run dev</div>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="text-muted-foreground text-[11px] font-sans">2. Run strict ESLint checks</div>
                <div className="mt-1 font-semibold text-foreground">npm run lint</div>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="text-muted-foreground text-[11px] font-sans">3. Build production SSG HTML</div>
                <div className="mt-1 font-semibold text-foreground">npm run build</div>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <div className="text-muted-foreground text-[11px] font-sans">4. Run static export build</div>
                <div className="mt-1 font-semibold text-foreground">NEXT_OUTPUT=export npm run build</div>
              </div>
            </div>
          </div>

          {/* Step 4: Free Hosting & Deployment (Vercel, Cloudflare, GitHub Pages) */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Rocket className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  4. Free Hosting &amp; Deployment Guides
                </h3>
                <p className="text-xs text-muted-foreground">
                  Host Jiga List with 100% free edge distribution on Vercel, Cloudflare Pages, or GitHub Pages.
                </p>
              </div>
            </div>

            {/* Platform Selector Buttons */}
            <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
              <button
                type="button"
                onClick={() => setDeployPlatformTab("vercel")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  deployPlatformTab === "vercel"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                Vercel (1-Click)
              </button>

              <button
                type="button"
                onClick={() => setDeployPlatformTab("cloudflare")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  deployPlatformTab === "cloudflare"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Cloud className="h-3.5 w-3.5" />
                Cloudflare Pages
              </button>

              <button
                type="button"
                onClick={() => setDeployPlatformTab("github")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  deployPlatformTab === "github"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Github className="h-3.5 w-3.5" />
                GitHub Pages
              </button>
            </div>

            {/* Tab A: Vercel */}
            {deployPlatformTab === "vercel" && (
              <div className="space-y-3.5 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3.5">
                  <div>
                    <span className="text-xs font-semibold text-foreground">One-Click Automatic Deployment</span>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      Vercel automatically handles type-checking, image optimization, and global edge CDN caching.
                    </p>
                  </div>
                  <Button asChild size="sm" className="gap-2 shrink-0 text-xs">
                    <a
                      href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frthaithem%2Fjiga-list"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Zap className="h-3.5 w-3.5 fill-current" />
                      Deploy with Vercel
                    </a>
                  </Button>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground list-decimal pl-5">
                  <li>Click <strong>Deploy with Vercel</strong> or import your forked repository.</li>
                  <li>Framework preset will automatically be set to <strong>Next.js</strong>.</li>
                  <li>Leave all environment variables empty — no database or secret keys needed!</li>
                  <li>Click <strong>Deploy</strong> to go live in under 60 seconds.</li>
                </div>
              </div>
            )}

            {/* Tab B: Cloudflare Pages */}
            {deployPlatformTab === "cloudflare" && (
              <div className="space-y-3.5 pt-1">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cloudflare Pages serves your static HTML directly from 300+ data centers worldwide with zero bandwidth charges.
                </p>

                <div className="rounded-lg border bg-muted/30 p-3.5 space-y-2">
                  <span className="text-xs font-semibold text-foreground">Cloudflare Dashboard Build Settings:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs pt-1">
                    <div className="rounded border bg-background/80 p-2">
                      <div className="text-[10px] font-sans text-muted-foreground">Framework Preset</div>
                      <div className="font-semibold text-foreground">None</div>
                    </div>
                    <div className="rounded border bg-background/80 p-2">
                      <div className="text-[10px] font-sans text-muted-foreground">Build Command</div>
                      <div className="font-semibold text-foreground">npm run build</div>
                    </div>
                    <div className="rounded border bg-background/80 p-2">
                      <div className="text-[10px] font-sans text-muted-foreground">Output Directory</div>
                      <div className="font-semibold text-foreground">out</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Environment Variable: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">NEXT_OUTPUT = export</code>
                  </div>
                </div>

                {/* CLI Command */}
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>Deploy via Wrangler CLI:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const cmd = "NEXT_OUTPUT=export npm run build && npx wrangler pages deploy out --project-name=jiga-list";
                        navigator.clipboard.writeText(cmd);
                        setCopiedCloudflareSnippet(true);
                        setTimeout(() => setCopiedCloudflareSnippet(false), 2000);
                      }}
                      className="flex items-center gap-1 text-[11px] hover:text-foreground"
                    >
                      {copiedCloudflareSnippet ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy CLI Command
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre font-mono text-xs text-foreground/90">
                    NEXT_OUTPUT=export npm run build &amp;&amp; npx wrangler pages deploy out --project-name=jiga-list
                  </pre>
                </div>
              </div>
            )}

            {/* Tab C: GitHub Pages */}
            {deployPlatformTab === "github" && (
              <div className="space-y-3.5 pt-1">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Deploy directly from your repository on GitHub using GitHub Actions. The workflow file <code className="font-mono rounded bg-muted px-1.5 py-0.5 text-foreground">.github/workflows/deploy-pages.yml</code> is already included in this repository.
                </p>

                <div className="space-y-1.5 text-xs text-muted-foreground list-decimal pl-5">
                  <li>In your GitHub repo, go to <strong>Settings</strong> &gt; <strong>Pages</strong>.</li>
                  <li>Under <strong>Build and deployment</strong> &gt; <strong>Source</strong>, choose <strong>GitHub Actions</strong>.</li>
                  <li>
                    <em>(Subpath note)</em>: If hosting at <code className="font-mono text-[11px]">https://&lt;user&gt;.github.io/&lt;repo&gt;/</code>, add repository variable <code className="font-mono text-[11px]">NEXT_PUBLIC_BASE_PATH = /&lt;repo&gt;</code> in Settings &gt; Secrets and variables &gt; Actions.
                  </li>
                  <li>Push a commit or trigger the workflow under the <strong>Actions</strong> tab to deploy automatically!</li>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>.github/workflows/deploy-pages.yml</span>
                    <button
                      type="button"
                      onClick={() => {
                        const workflow = `name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - uses: actions/configure-pages@v5
      - run: npm install
      - env:
          NEXT_OUTPUT: export
        run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4`;
                        navigator.clipboard.writeText(workflow);
                        setCopiedGhPagesWorkflow(true);
                        setTimeout(() => setCopiedGhPagesWorkflow(false), 2000);
                      }}
                      className="flex items-center gap-1 text-[11px] hover:text-foreground"
                    >
                      {copiedGhPagesWorkflow ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy Workflow
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="max-h-48 overflow-y-auto whitespace-pre font-mono text-[11px] text-foreground/90">
{`name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - uses: actions/configure-pages@v5
      - run: npm install
      - env:
          NEXT_OUTPUT: export
        run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: USER GUIDE */}
      {activeSection === "guide" && (
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-base font-semibold text-foreground">How to Use Jiga List</h2>
            <p className="text-xs text-muted-foreground">
              Master search hotkeys, organize offline favorites, and toggle browsing views.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Feature 1 */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Global Fast Search</h3>
                  <p className="text-xs text-muted-foreground">Keyboard-driven fuzzy lookup</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Press <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">Ctrl + K</kbd> or press <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">/</kbd> anywhere to open the modal search dialog. Searches across titles, descriptions, categories, and tags in real time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Favorites &amp; Markdown (.md)</h3>
                  <p className="text-xs text-muted-foreground">Private offline bookmarking</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Click the Star icon on any card to save it to your device. On the <strong>Favorites</strong> page, you can export your collection as a standard <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">.md</code> file or import an existing list to restore your links.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Grid vs. Compact Views</h3>
                  <p className="text-xs text-muted-foreground">Dense browsing experience</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Use the layout toggle at the top of category lists to switch between rich cards (with descriptions and tags) and high-density single-line compact rows for power browsing.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Mirrors &amp; Backups</h3>
                  <p className="text-xs text-muted-foreground">Resilient streaming domains</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Websites with alternate domains feature a <strong>Mirrors</strong> button. If your primary link is blocked by an ISP or undergoing server maintenance, switch to one of the verified mirror links.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SAFETY & ADBLOCKING */}
      {activeSection === "security" && (
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <h2 className="text-base font-semibold text-foreground">Safety &amp; Adblocking Starter Pack</h2>
            <p className="text-xs text-muted-foreground">
              Recommended tools and configurations to browse streaming websites securely without deceptive popups or malware.
            </p>
          </div>

          <div className="space-y-4">
            {/* Recommendation 1 */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                  <h3 className="text-sm font-semibold text-foreground">
                    1. uBlock Origin (Essential)
                  </h3>
                </div>
                <Badge variant="outline" className="w-fit border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs">
                  Highest Recommendation
                </Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                The most lightweight, open-source content blocker for Firefox, Chrome, Edge, and Android (via Firefox Mobile). Automatically filters popups, video ads, transparent click-overlays, and malicious redirects.
              </p>
              <div className="mt-3">
                <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
                  <a href="https://ublockorigin.com" target="_blank" rel="noopener noreferrer">
                    Install uBlock Origin
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Recommendation 2 */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Globe className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="text-sm font-semibold text-foreground">
                    2. Encrypted DNS (Bypass ISP Censorship)
                  </h3>
                </div>
                <Badge variant="outline" className="w-fit text-xs">
                  Unblock Websites
                </Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Many streaming domains are not down—they are blocked at the ISP DNS resolver level. Switching your device or browser DNS to encrypted DNS (DNS-over-HTTPS) restores access immediately:
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 font-mono text-xs">
                <div className="rounded-lg border bg-muted/40 p-2.5">
                  <div className="font-semibold text-foreground">Cloudflare DNS</div>
                  <div className="text-muted-foreground text-[11px]">1.1.1.1 / 1.0.0.1</div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-2.5">
                  <div className="font-semibold text-foreground">Quad9 (Malware Block)</div>
                  <div className="text-muted-foreground text-[11px]">9.9.9.9 / 149.112.112.112</div>
                </div>
                <div className="rounded-lg border bg-muted/40 p-2.5">
                  <div className="font-semibold text-foreground">AdGuard DNS</div>
                  <div className="text-muted-foreground text-[11px]">94.140.14.14</div>
                </div>
              </div>
            </div>

            {/* Recommendation 3 */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                <h3 className="text-sm font-semibold text-foreground">
                  3. Safe Streaming Rules
                </h3>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground list-disc pl-5">
                <li>
                  <strong className="text-foreground">Never run downloaded executable files:</strong> Video streams play in your web browser. If a site downloads an <code className="font-mono text-[11px]">.exe</code>, <code className="font-mono text-[11px]">.bat</code>, or unknown file, cancel it immediately.
                </li>
                <li>
                  <strong className="text-foreground">Ignore fake browser alerts:</strong> Notices like &ldquo;Your Flash Player is out of date&rdquo; or &ldquo;System infected with virus&rdquo; are deceptive ads. Close the tab.
                </li>
                <li>
                  <strong className="text-foreground">Use verified community links:</strong> Prefer the official domains listed in Jiga List or official backup mirrors.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
