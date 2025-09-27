/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
    // Enhanced image optimization settings for performance
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable modern image optimization
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  // Add headers for debugging and caching
  async headers() {
    return [
      {
        // Security headers for all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'production' 
              ? "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://core.sanity-cdn.com https://www.youtube.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self' https:; connect-src 'self' https://vitals.vercel-insights.com https://api.spotify.com https://accounts.spotify.com https://*.sanity.io https://*.api.sanity.io;"
              : "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' 'unsafe-inline' https:; img-src 'self' data: https: blob:; media-src 'self' https:; connect-src 'self' https:;",
          },
        ],
      },
      {
        // Apply headers to API routes with rate limiting info
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'X-Environment',
            value: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
          },
          {
            key: 'X-Rate-Limit',
            value: 'Please respect our API limits',
          },
        ],
      },
      {
        // Cache static assets
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache favicons
        source: '/(favicon.ico|.*\\.png|.*\\.svg)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // External packages for server components
  serverExternalPackages: [],
  // Production optimizations
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  // Enhanced build configuration with SWC
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Modern browser targeting with SWC
    styledComponents: true,
    // Remove React DevTools in production
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$'] } : false,
  },
  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'iconsax-react', '@tanstack/react-query'],
  },
  // Enhanced Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // Production-only optimizations
    if (!dev) {
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // Optimize bundle splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        maxSize: 200000, // 200KB chunks
        cacheGroups: {
          default: false,
          vendors: false,
          // React and framework chunks
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Large third-party libraries
          vendor: {
            test: /[\\/]node_modules[\\/](?!(react|react-dom|scheduler|prop-types|use-subscription|framer-motion|@tanstack)).*[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 30,
          },
          // Framer Motion separate chunk
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            priority: 35,
          },
          // React Query separate chunk
          query: {
            test: /[\\/]node_modules[\\/]@tanstack[\\/]react-query[\\/]/,
            name: 'react-query',
            chunks: 'all',
            priority: 35,
          },
          // Common code across pages
          common: {
            name: 'common',
            minChunks: 2,
            priority: 20,
            chunks: 'all',
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
