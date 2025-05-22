/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
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
