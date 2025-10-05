import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: true
  },
  turbopack: {
    root: path.join(__dirname, './'),
  },
};

export default nextConfig;
