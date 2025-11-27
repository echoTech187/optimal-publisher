import type { NextConfig } from "next";
import path from "path";

// A good starting point for a Content-Security-Policy.
// It might need to be adjusted based on the specific needs of the application (e.g., external scripts, fonts, or images).
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://code.jquery.com https://cdn.datatables.net;
  style-src 'self' 'unsafe-inline'  https://cdn.datatables.net;
  connect-src 'self' http://127.0.0.1:8000 https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com;
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  env: {
    NEXT_PUBLIC_API_BASE_URL: "http://127.0.0.1:8000",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: true
  },
  turbopack: {
    root: path.join(__dirname, './'),
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy,
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Enable this header if your site is served over HTTPS
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=63072000; includeSubDomains; preload',
          // },
        ],
      },
    ];
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);

