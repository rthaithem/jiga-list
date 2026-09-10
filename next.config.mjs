/** @type {import('next').NextConfig} */
const isExport =
  process.env.NEXT_OUTPUT === "export" ||
  Boolean(process.env.CF_PAGES) ||
  Boolean(process.env.GITHUB_ACTIONS);

// Safely normalize basePath for GitHub Pages subpaths (e.g. /<repo-name>)
let rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
if (rawBasePath === "/") {
  rawBasePath = "";
}
if (rawBasePath && !rawBasePath.startsWith("/")) {
  rawBasePath = `/${rawBasePath}`;
}
if (rawBasePath.endsWith("/")) {
  rawBasePath = rawBasePath.slice(0, -1);
}

const nextConfig = {
  reactStrictMode: true,
  ...(isExport ? { output: "export" } : {}),
  trailingSlash: isExport,
  ...(rawBasePath ? { basePath: rawBasePath } : {}),
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;


