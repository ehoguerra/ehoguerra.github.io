import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is served as static files from GitHub Pages.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
