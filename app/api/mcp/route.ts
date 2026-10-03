import { NextResponse } from "next/server";
import { resources } from "@/data/resources";
import { categories, resourcesForCategory } from "@/data/categories";
import { search } from "@/lib/search";

export const dynamic = "force-static";

// MCP Tools definitions
const TOOLS = [
  {
    name: "search_resources",
    description: "Fuzzy search indexed resources, tools, streaming sites, and apps in Jiga List directory.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query string (e.g., 'adblocker', 'anime', 'open source', 'braflix').",
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return (default: 10).",
        },
        category: {
          type: "string",
          description: "Optional category slug filter (e.g., 'movies-tv-anime', 'adblocking-privacy').",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "list_categories",
    description: "List all categories in Jiga List directory with descriptions and resource counts.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_resource",
    description: "Get full details of a specific resource by its ID, including mirrors, status flags, and tags.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique resource ID (e.g. 'media-braflix', 'privacy-ublock-origin').",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "get_category_resources",
    description: "Get all resources listed within a specific category.",
    inputSchema: {
      type: "object",
      properties: {
        category_slug: {
          type: "string",
          description: "Category slug identifier (e.g., 'movies-tv-anime').",
        },
      },
      required: ["category_slug"],
    },
  },
  {
    name: "get_stats",
    description: "Get overall Jiga List directory metrics (total indexed resources, category count, status flags).",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

// Helper to execute tools
function callTool(name: string, args: Record<string, unknown> = {}) {
  switch (name) {
    case "search_resources": {
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
        };
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                total_matches: results.length,
                returned_count: items.length,
                results: items,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "list_categories": {
      const cats = categories.map((c) => ({
        slug: c.slug,
        name: c.name,
        shortName: c.shortName,
        description: c.description,
        count: c.count,
        url: `/category/${c.slug}`,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                total_categories: cats.length,
                categories: cats,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_resource": {
      const id = String(args.id || "");
      const res = resources.find((r) => r.id === id);
      if (!res) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Resource with ID "${id}" was not found in Jiga List directory.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(res, null, 2),
          },
        ],
      };
    }

    case "get_category_resources": {
      const slug = String(args.category_slug || "");
      const catResources = resourcesForCategory(slug);
      const catInfo = categories.find((c) => c.slug === slug);

      if (!catInfo && catResources.length === 0) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Category "${slug}" not found in Jiga List.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                category: catInfo?.name || slug,
                slug,
                description: catInfo?.description,
                count: catResources.length,
                resources: catResources,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_stats": {
      const allFlags = Array.from(
        new Set(resources.flatMap((r) => r.flags))
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                directory: "Jiga List",
                version: "1.0.0",
                total_resources: resources.length,
                total_categories: categories.length,
                available_flags: allFlags,
                architecture: "Fast In-Memory SSG Directory",
                mcp_status: "Active",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    default:
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Unknown tool requested: "${name}"`,
          },
        ],
      };
  }
}

// GET handler for status check & discovery
export async function GET() {
  return NextResponse.json({
    name: "Jiga List MCP Server",
    version: "1.0.0",
    protocolVersion: "2024-11-05",
    description: "Model Context Protocol (MCP) server for Jiga List directory.",
    endpoint: "/api/mcp",
    tools: TOOLS,
    capabilities: {
      tools: {},
    },
  });
}

// POST handler for JSON-RPC 2.0 MCP messages
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jsonrpc, id, method, params } = body || {};

    if (jsonrpc !== "2.0") {
      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id: id ?? null,
          error: { code: -32600, message: "Invalid Request: jsonrpc must be '2.0'" },
        },
        { status: 400 }
      );
    }

    switch (method) {
      case "initialize":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: {},
            },
            serverInfo: {
              name: "jiga-list-mcp",
              version: "1.0.0",
            },
          },
        });

      case "notifications/initialized":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {},
        });

      case "ping":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {},
        });

      case "tools/list":
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            tools: TOOLS,
          },
        });

      case "tools/call": {
        const { name, arguments: toolArgs } = params || {};
        if (!name) {
          return NextResponse.json({
            jsonrpc: "2.0",
            id,
            error: { code: -32602, message: "Missing required parameter: 'name'" },
          });
        }

        const result = callTool(name, toolArgs || {});
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result,
        });
      }

      default:
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: `Method not found: '${method}'`,
          },
        });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32603, message },
      },
      { status: 500 }
    );
  }
}
