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
  output: isExport ? "export" : "standalone",
  trailingSlash: isExport,
  ...(rawBasePath ? { basePath: rawBasePath } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;


