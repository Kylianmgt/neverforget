import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
