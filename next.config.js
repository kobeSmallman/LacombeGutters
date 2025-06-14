/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },

  images: {
    unoptimized: true,
    domains: ['maps.googleapis.com', 'picsum.photos'],
  },

  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    // Fix for Lucide icons
    if (!isServer) {
      config.resolve.alias['lucide-react'] = path.resolve(
        __dirname,
        'node_modules/lucide-react/dist/esm/lucide-react.js'
      );
    }

    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Domain redirect (existing)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'lacombe-gutters.vercel.app' }],
        destination: 'https://lacombeguttersltd.com/:path*',
        permanent: true,
      },
      // Legacy Wix URL redirects - Based on sitemap comparison
      {
        source: '/reviews',
        destination: '/',  // Reviews are now integrated on homepage
        permanent: true,
      },
      // Add more redirects here if URL structures change
      // These are prepared but commented out since the routes appear to match
      // Uncomment and modify as needed after testing
      // {
      //   source: '/about',
      //   destination: '/about',
      //   permanent: true,
      // },
      // Add any other redirects if old URLs don't match new structure
    ];
  },
};

module.exports = nextConfig;
