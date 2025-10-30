import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  env: {
    NEXT_PUBLIC_API_BASE_URL: "http://127.0.0.1:8000",
  },
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

