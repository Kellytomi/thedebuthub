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
        hostname: 'p.scdn.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add headers for debugging and caching
  async headers() {
    return [
      {
        // Apply headers to API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=60', // 5 min cache
          },
          {
            key: 'X-Environment',
            value: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
          },
        ],
      },
    ];
  },
  // External packages for server components
  serverExternalPackages: [],
  // Production optimizations
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
};

export default nextConfig;
