/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // This is needed for the app to work properly in development
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
