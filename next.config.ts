import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    // Optimized device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for smaller viewports and thumbnails
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize layout shift with proper sizing - 30 days cache
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
