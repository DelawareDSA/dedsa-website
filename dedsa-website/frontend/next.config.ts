import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Allow 'unsafe-eval' in development for React Fast Refresh
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  env: { 
    WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
    NEXT_PUBLIC_EMAIL_DOMAIN: process.env.NEXT_PUBLIC_EMAIL_DOMAIN || 'delawardsa.org',
    NEXT_PUBLIC_SKIP_APOLLO_SSR: process.env.NEXT_PUBLIC_SKIP_APOLLO_SSR ?? 'false',
  },
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  output: 'standalone',

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingExcludes: {
    '/_not-found': [],
  },

  images: {
    domains: ['dedsa.org', 'cms.dedsa.org'],
    remotePatterns: [
      { protocol: 'https', hostname: 'dedsa.org', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'cms.dedsa.org', port: '', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  async redirects() {
    return [
      // Preserve existing blog → newsletter redirect
      {
        source: '/blog/:slug',
        destination: '/newsletter/:slug',
        permanent: true,
      },
      // Route legacy newsletter paths to new .html URLs
      {
        source: '/newsletter/:slug',
        destination: '/newsletters/:slug.html',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      // Example rewrite, update as needed
      {
        source: '/api/graphql',
        destination: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '',
      },
    ];
  },

  headers: async () => {
    const scriptSrc = `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`;
    const styleSrc = "style-src 'self' 'unsafe-inline'";

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptSrc,
              styleSrc,
              "img-src 'self' data: https: http:",
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-src 'self' https://calendar.google.com https://accounts.google.com",
              "child-src 'self' https://calendar.google.com https://accounts.google.com",
              'block-all-mixed-content',
            ].join('; '),
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptSrc,
              styleSrc,
              "img-src 'self' data: https: http:",
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'block-all-mixed-content',
            ].join('; '),
          },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default withAnalyzer(nextConfig);
