import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is served as static files from GitHub Pages.
  output: "export",
  images: { unoptimized: true },
  // Pin the root: a stray lockfile in a parent folder makes Turbopack resolve
  // modules (e.g. tailwindcss) from the wrong directory.
  turbopack: { root: __dirname },
  // ponytail: dev-only. drei's <Html> renders each window into its own React
  // root; StrictMode's double effects make the deferred unmount of the first
  // root wipe the second, so windows render empty in dev. Production never
  // double-invokes effects. Re-enable once drei's Html survives StrictMode.
  reactStrictMode: false,
  // The build month, for the "now" marker on the track-record timeline.
  env: { BUILD_MONTH: new Date().toISOString().slice(0, 7) },
};

export default nextConfig;
