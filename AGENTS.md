# AGENTS.md

Welcome to **Jiga List**! This document provides guidelines, architectural details, and commands for AI agents and developers working on this codebase.

## Overview

Jiga List is a database-less, lightning-fast curated directory and wiki web application built with:
- **Framework**: Next.js 16 (App Router)
- **UI & Components**: React 19, Tailwind CSS, Shadcn/UI (`@radix-ui` primitives, `lucide-react`)
- **Search**: Fuse.js (client-side search & fuzzy matching)
- **Language**: TypeScript (Strict mode)

Everything is indexed at build time and served as static HTML (SSG).

---

## Directory Structure

```
├── app/          # Next.js App Router routes and pages
├── components/   # React components (UI elements, layout, search modal, category cards)
├── data/         # Static datasets and JSON/TS files for directory resources
├── lib/          # Helper utilities, Fuse.js search logic, metadata helpers
├── public/       # Static assets (images, icons, favicon)
```

---

## Development & Verification Commands

- **Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Static Export**: `npm run build:export`
- **Lint**: `npm run lint`

When modifying code, always ensure that `npm run lint` and `npm run build` pass without errors.

---

## Coding Conventions

- **TypeScript**: Use strict typing. Avoid `any` where possible.
- **Components**: Use functional components with standard React 19 / Next.js App Router patterns.
- **Styling**: Utility-first CSS using Tailwind CSS and `clsx`/`tailwind-merge` (`cn` helper in `lib/utils.ts`).
