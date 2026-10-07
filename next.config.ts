import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is served as static files from GitHub Pages.
  output: "export",
  images: { unoptimized: true },
  // Pin the root: a stray lockfile in a parent folder makes Turbopack resolve
  // modules (e.g. tailwindcss) from the wrong directory.
  turbopack: { root: __dirname },
};

export default nextConfig;
