import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // HTTP to HTTPS redirects
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.lacombeguttersltd.com/:path*',
        permanent: true,
      },
      // Non-www to www redirect
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'lacombeguttersltd.com',
          },
        ],
        destination: 'https://www.lacombeguttersltd.com/:path*',
        permanent: true,
      },
      // Legacy URL redirects
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/service-page/:slug*',
        destination: '/services',
        permanent: true,
      },
      // Specific legacy service page redirects that are failing in GSC
      {
        source: '/service-page/electrical',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/service-page/remodeling', 
        destination: '/services',
        permanent: true,
      },
      {
        source: '/service-page/carpentry',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/service-page/windows',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/service-page/plumbing',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/book-online',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/page3',
        destination: '/',
        permanent: true,
      },
      // Block API endpoints from being accessed directly
      {
        source: '/_api/:path*',
        destination: '/404',
        permanent: true,
      },
      // Form map redirect (appears in GSC failures)
      {
        source: '/form__map',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // Add security headers and prevent indexing of API routes
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/_api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      // Ensure static assets have proper cache headers
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // PWA manifest headers
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Content-Type', 
            value: 'application/manifest+json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
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
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
