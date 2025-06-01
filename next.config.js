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
    domains: ['maps.googleapis.com'],
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
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'lacombe-gutters.vercel.app' }],
        destination: 'https://lacombeguttersltd.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
