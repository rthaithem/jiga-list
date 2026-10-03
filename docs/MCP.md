# Model Context Protocol (MCP) & WebMCP Specification — Jiga List

Jiga List provides native support for both **Server-side MCP (HTTP JSON-RPC 2.0)** and **Client-side WebMCP (Browser Native)**.

This enables AI assistants (such as Claude Desktop, Cursor, ChatGPT, Copilot, and autonomous AI agents) to query, search, and navigate Jiga List's curated index of tools, streaming portals, adblockers, and software resources.

---

## 🚀 Architecture & Overview

Jiga List operates as a zero-database, ultra-fast static application. Our MCP implementation directly exposes the in-memory typed TypeScript data store (`data/resources.ts`, `data/categories.ts`) and the client-side Fuse.js fuzzy search engine without adding external database overhead.

```
+-----------------------------------------------------------------------+
|                              AI ASSISTANT                             |
|          (Claude Desktop / Cursor / Web Browser AI Extension)         |
+-----------------------------------------------------------------------+
                                   |
         +-------------------------+-------------------------+
         |                                                   |
         v (HTTP / JSON-RPC 2.0)                             v (Client-side)
+-----------------------------------+               +-----------------------------------+
|       Server MCP Endpoint         |               |       WebMCP Client Provider      |
|           `/api/mcp`              |               |         `window.webMcp`           |
+-----------------------------------+               +-----------------------------------+
         |                                                   |
         +-------------------------+-------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                  In-Memory Fast Typed Search Index                    |
|                (`resources.ts` / `Fuse.js` / `localStorage`)          |
+-----------------------------------------------------------------------+
```

---

## 🛠️ Exposed MCP Tools

The following tools are implemented across both Server MCP and Client WebMCP:

| Tool Name | Input Parameters | Description |
| :--- | :--- | :--- |
| `search_resources` | `query` (string, required)<br>`limit` (number, default: 10)<br>`category` (string, optional) | Fuzzy search resources, tools, streaming sites, and applications in Jiga List directory. |
| `list_categories` | *None* | List all category slugs, names, descriptions, and resource counts. |
| `get_resource` | `id` (string, required) | Retrieve complete details for a specific resource ID (includes mirrors, status flags, tags, and category info). |
| `get_category_resources` | `category_slug` (string, required) | Retrieve all resources indexed under a specific category. |
| `get_stats` | *None* | Retrieve overall directory metrics (total resources, total categories, status flags). |
| `manage_favorites` *(WebMCP)* | `action` ("list" \| "add" \| "remove")<br>`resource_id` (string, optional) | View or manage local offline favorites in the browser (`localStorage`). |

---

## 💻 1. Server MCP Setup Guide (Claude Desktop & Cursor)

### Claude Desktop Integration

Add Jiga List as an MCP server in your Claude Desktop configuration file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "jiga-list": {
      "url": "https://jigalist.pages.dev/api/mcp",
      "transport": "http"
    }
  }
}
```

### Cursor / VSCode AI Extension Setup

In Cursor settings under **MCP Servers**:

1. Click **Add New MCP Server**.
2. Set **Name** to `Jiga List`.
3. Set **Type** to `http` (or `sse`).
4. Set **URL** to `https://jigalist.pages.dev/api/mcp`.

---

## 🌐 2. WebMCP Client-Side Integration Guide

WebMCP is automatically initialized in the web browser upon loading the App Shell.

### Accessing via JavaScript Console / Extension

AI browser extensions or page scripts can invoke WebMCP tools directly:

```javascript
// Check WebMCP availability
if (window.webMcp) {
  // Execute a fuzzy search tool
  const searchResults = await window.webMcp.callTool("search_resources", {
    query: "open source adblocker",
    limit: 5
  });
  console.log("Jiga List Search Results:", searchResults);
}
```

### Listening to Registration Event

```javascript
window.addEventListener("webmcp-registered", (event) => {
  console.log("WebMCP provider registered:", event.detail);
});
```

---

## 🧪 JSON-RPC 2.0 Protocol Examples

### Search Query Request (`POST /api/mcp`)

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "search_resources",
    "arguments": {
      "query": "uBlock Origin",
      "limit": 1
    }
  }
}
```

### Search Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\n  \"total_matches\": 1,\n  \"returned_count\": 1,\n  \"results\": [\n    {\n      \"id\": \"privacy-ublock-origin\",\n      \"title\": \"uBlock Origin\",\n      \"url\": \"https://ublockorigin.com\",\n      \"description\": \"An efficient, open-source content blocker for content filtering and ad blocking.\",\n      \"category\": \"Adblocking & Privacy\",\n      \"tags\": [\"adblock\", \"privacy\", \"open-source\"],\n      \"flags\": [\"recommended\", \"foss\", \"no-ads\"]\n    }\n  ]\n}"
      }
    ]
  }
}
```

---

## 🔒 Security & Performance

- **Zero DB Overhead:** Reads typed data directly from memory. Responses are processed in `<1ms`.
- **Read-Only Server:** The server endpoint (`/api/mcp`) is completely read-only, ensuring security and preventing unauthorized state mutation.
- **Client Side Isolation:** The `manage_favorites` tool executes strictly within the user's browser `localStorage`.
