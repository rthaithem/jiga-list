/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig = {
  reactStrictMode: true,
  output: isExport ? "export" : "standalone",
  ...(process.env.NEXT_PUBLIC_BASE_PATH
    ? { basePath: process.env.NEXT_PUBLIC_BASE_PATH }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

