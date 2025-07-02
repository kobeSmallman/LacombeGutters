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
      // Specific legacy service page redirects
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
        source: '/service-page/carpentry',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/service-page/remodeling',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/service-page/electrical',
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
    ];
  },
  // Ensure proper headers for SEO
  async headers() {
    return [
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
