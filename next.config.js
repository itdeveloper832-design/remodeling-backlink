/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration - 'standalone' for cPanel, 'export' for static hosts
  output: 'export',

  // Trailing slash ensures static export URLs match canonical tags
  // Apache serves /page/ (with slash) for index.html files, so canonicals must match
  trailingSlash: true,

  // Image Optimization - disable for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },

  // Compression
  compress: true,

  // Performance optimizations for Next.js 16+
  experimental: {
    optimizePackageImports: ['@/components/ui', '@/lib'],
  },

  // Production optimizations
  productionBrowserSourceMaps: false,


  // Page extensions
  pageExtensions: ['ts', 'tsx'],

  // TypeScript
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

module.exports = nextConfig;
