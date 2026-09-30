import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Disable build errors for sandbox preview
  typescript: {
    ignoreBuildErrors: true,
  },
  // Rebrand (Sep 2026): the site is a sustainability-information hub, not a shop.
  // Shop and Best-of product guides are retired; both redirect to brand search.
  // /product/{slug} is handled by a catch-all route handler that 301-redirects
  // to the owning brand page (old links keep resolving, DB lookup in
  // src/app/product/[[...slug]]/route.ts).
  async redirects() {
    return [
      { source: '/shop', destination: '/search', permanent: true },
      { source: '/shop/:path*', destination: '/search', permanent: true },
      { source: '/best-of', destination: '/search', permanent: true },
      { source: '/best-of/:path*', destination: '/search', permanent: true },
    ];
  },
};

export default nextConfig;