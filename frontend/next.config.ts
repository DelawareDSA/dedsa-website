// next.config.ts

import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // remove the X-Powered-By header
  poweredByHeader: false,

  // Exclude specific routes from output file tracing
  outputFileTracingExcludes: {
    '/_not-found': [],
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'delawardsa.org', pathname: '/**' },
      {
        protocol: isDev ? 'http' : 'https',
        hostname: isDev
          ? 'delaware-dsa-backend.local'
          : process.env.WORDPRESS_HOST || 'delawardsa.org',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },

  redirects: async () => [
    {
      source: '/blog/:slug',
      destination: '/newsletter/:slug',
      permanent: true,
    },
  ],

  headers: async () => {
    const scriptSrc = `script-src 'self'${isDev ? " 'unsafe-inline' 'unsafe-eval'" : ''}`;
    const styleSrc = `style-src 'self'${isDev ? " 'unsafe-inline'" : ''}`;

    return [
      // 1) Calendar embed exception
      {
        source: '/(.*)',
        headers: [
          // Allow the page to be framed by itself
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },

          // Permit iframes from Google Calendar & Google Accounts for OAuth redirects
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
              // Allow embedding of Google Calendar & account login
              "frame-src 'self' https://calendar.google.com https://accounts.google.com",
              // Deprecated alias for older browsers
              "child-src 'self' https://calendar.google.com https://accounts.google.com",
              'block-all-mixed-content',
            ].join('; '),
          },
        ],
      },

      // 2) Static assets caching policy
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // 3) Global security headers for all other routes
      {
        source: '/(.*)',
        headers: [
          // From your JS config
          { key: 'Referrer-Policy', value: 'no-referrer' },

          // From your TS config
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
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
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  env: {
    NEXT_PUBLIC_EMAIL_DOMAIN:
      process.env.NEXT_PUBLIC_EMAIL_DOMAIN || 'delawardsa.org',
    NEXT_PUBLIC_SKIP_APOLLO_SSR:
      process.env.NEXT_PUBLIC_SKIP_APOLLO_SSR ?? 'false',
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default withAnalyzer(nextConfig);
