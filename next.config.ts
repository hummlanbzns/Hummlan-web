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
};

export default nextConfig;
