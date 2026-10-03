"use client";

import { search } from "@/lib/search";
import { resources } from "@/data/resources";
import { categories, resourcesForCategory } from "@/data/categories";
import {
  getFavoriteIds,
  addFavorite,
  removeFavorite,
  isFavorite,
} from "@/lib/favorites";

export interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (args: Record<string, unknown>) => unknown;
}

export const WEBMCP_TOOLS: WebMCPTool[] = [
  {
    name: "search_resources",
    description: "Search resources, tools, streaming portals, and apps in Jiga List directory.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
        limit: { type: "number", description: "Limit results count" },
        category: { type: "string", description: "Category slug filter" },
      },
      required: ["query"],
    },
    handler: (args) => {
      const query = String(args.query || "");
      const limit = Number(args.limit || 10);
      const categoryFilter = args.category ? String(args.category) : undefined;

      let results = search(query, Math.max(limit, 50));
      if (categoryFilter) {
        results = results.filter((item) => item.categorySlug === categoryFilter);
      }
      const sliced = results.slice(0, limit);

      const items = sliced.map((item) => {
        const fullRes = resources.find((r) => r.id === item.id);
        return {
          id: item.id,
          title: item.title,
          url: item.url || fullRes?.url,
          description: item.description,
          category: item.category,
          categorySlug: item.categorySlug,
          tags: item.tags,
          flags: fullRes?.flags || [],
          mirrors: fullRes?.mirrors || [],
          isFavorite: isFavorite(item.id),
        };
      });

      return {
        total_matches: results.length,
        returned_count: items.length,
        results: items,
      };
    },
  },
  {
    name: "list_categories",
    description: "List all categories in Jiga List directory.",
    inputSchema: {
      type: "object",
      properties: {},
    },
    handler: () => {
      return {
        total_categories: categories.length,
        categories: categories.map((c) => ({
          slug: c.slug,
          name: c.name,
          shortName: c.shortName,
          description: c.description,
          count: c.count,
        })),
      };
    },
  },
  {
    name: "get_resource",
    description: "Get resource by ID.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Resource ID" },
      },
      required: ["id"],
    },
    handler: (args) => {
      const id = String(args.id || "");
      const res = resources.find((r) => r.id === id);
      if (!res) {
        return { error: `Resource "${id}" not found.` };
      }
      return {
        ...res,
        isFavorite: isFavorite(res.id),
      };
    },
  },
  {
    name: "get_category_resources",
    description: "Get all resources listed under a category.",
    inputSchema: {
      type: "object",
      properties: {
        category_slug: { type: "string", description: "Category slug" },
      },
      required: ["category_slug"],
    },
    handler: (args) => {
      const slug = String(args.category_slug || "");
      const catResources = resourcesForCategory(slug);
      return {
        category_slug: slug,
        count: catResources.length,
        resources: catResources.map((r) => ({
          ...r,
          isFavorite: isFavorite(r.id),
        })),
      };
    },
  },
  {
    name: "manage_favorites",
    description: "View, add, or remove items from browser local favorites.",
    inputSchema: {
      type: "object",
      properties: {
        action: {
          type: "string",
          enum: ["list", "add", "remove"],
          description: "Action to perform on favorites",
        },
        resource_id: {
          type: "string",
          description: "Resource ID for add/remove actions",
        },
      },
      required: ["action"],
    },
    handler: (args) => {
      const action = String(args.action || "list");
      const resourceId = args.resource_id ? String(args.resource_id) : undefined;

      if (action === "add" && resourceId) {
        addFavorite(resourceId);
        return { success: true, message: `Added "${resourceId}" to favorites.` };
      }

      if (action === "remove" && resourceId) {
        removeFavorite(resourceId);
        return { success: true, message: `Removed "${resourceId}" from favorites.` };
      }

      const favIds = getFavoriteIds();
      const favResources = resources.filter((r) => favIds.includes(r.id));
      return {
        total_favorites: favResources.length,
        favorites: favResources,
      };
    },
  },
];

/**
 * Initializes client-side WebMCP provider on `window.webMcp` if running in browser.
 */
export function registerWebMCP(): void {
  if (typeof window === "undefined") return;

  const mcpProvider = {
    name: "Jiga List WebMCP",
    version: "1.0.0",
    description: "Client-side WebMCP provider for Jiga List.",
    tools: WEBMCP_TOOLS.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
    })),
    callTool: async (name: string, args: Record<string, unknown> = {}) => {
      const tool = WEBMCP_TOOLS.find((t) => t.name === name);
      if (!tool) {
        throw new Error(`Tool "${name}" not found in WebMCP provider.`);
      }
      return tool.handler(args);
    },
  };

  // Expose WebMCP provider globally
  (window as unknown as { webMcp?: typeof mcpProvider }).webMcp = mcpProvider;
  window.dispatchEvent(new CustomEvent("webmcp-registered", { detail: mcpProvider }));
}
