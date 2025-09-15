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
        // HTML pages should have shorter cache
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=86400, stale-while-revalidate=59',
          },
        ],
      },
      {
        // Static assets can have longer cache
        source: '/_next/static/:path*',
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
      // Non-www to www redirect (must come first to avoid chains)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'lacombeguttersltd.com' }],
        destination: 'https://www.lacombeguttersltd.com/:path*',
        permanent: true,
      },
      // HTTP to HTTPS redirect for www domain
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'www.lacombeguttersltd.com' },
          { type: 'header', key: 'x-forwarded-proto', value: 'http' }
        ],
        destination: 'https://www.lacombeguttersltd.com/:path*',
        permanent: true,
      },
      // Domain redirect (existing)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'lacombe-gutters.vercel.app' }],
        destination: 'https://www.lacombeguttersltd.com/:path*',
        permanent: true,
      },
      // CRITICAL: Legacy URL redirects from Google Search Console failures
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      
      // COMPREHENSIVE SERVICE-RELATED REDIRECTS
      {
        source: '/service-page/:slug*',
        destination: '/services/:slug*',
        permanent: true,
      },
      {
        source: '/service-page/carpentry',
        destination: '/services/soffit-fascia', // Carpentry work = soffit-fascia
        permanent: true,
      },
      {
        source: '/service-page/gutters',
        destination: '/services/5-inch-gutters',
        permanent: true,
      },
      {
        source: '/service-page/cleaning',
        destination: '/services/gutter-cleaning',
        permanent: true,
      },
      {
        source: '/service-page/installation',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/service-page/repair',
        destination: '/services',
        permanent: true,
      },
      
      // CATCH-ALL LEGACY PATTERNS
      {
        source: '/services-page/:slug*',
        destination: '/services/:slug*',
        permanent: true,
      },
      {
        source: '/service/:slug*',
        destination: '/services/:slug*',
        permanent: true,
      },
      {
        source: '/gutter-services/:slug*',
        destination: '/services/:slug*',
        permanent: true,
      },
      
      // CONTACT & BOOKING REDIRECTS
      {
        source: '/book-online',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/booking',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/quote',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/estimate',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/get-quote',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/free-estimate',
        destination: '/contact',
        permanent: true,
      },
      
      // AREA/LOCATION REDIRECTS
      {
        source: '/areas',
        destination: '/service-areas',
        permanent: true,
      },
      {
        source: '/locations',
        destination: '/service-areas',
        permanent: true,
      },
      {
        source: '/coverage',
        destination: '/service-areas',
        permanent: true,
      },
      {
        source: '/service-area',
        destination: '/service-areas',
        permanent: true,
      },
      
      // COMPANY INFO REDIRECTS
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/company',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/staff',
        destination: '/about',
        permanent: true,
      },
      
      // PORTFOLIO/WORK REDIRECTS
      {
        source: '/portfolio',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/photos',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/images',
        destination: '/gallery',
        permanent: true,
      },
      
      // LEGACY WIX/OLD SITE REDIRECTS
      {
        source: '/reviews',
        destination: '/',  // Reviews are now integrated on homepage
        permanent: true,
      },
      {
        source: '/testimonials',
        destination: '/',  // Testimonials on homepage
        permanent: true,
      },
      {
        source: '/page1',
        destination: '/',
        permanent: true,
      },
      {
        source: '/page2',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/page3',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/page4',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/page5',
        destination: '/gallery',
        permanent: true,
      },
      
      // PRODUCT/SPECIALTY REDIRECTS
      {
        source: '/alurex',
        destination: '/alurex-gutter-systems',
        permanent: true,
      },
      {
        source: '/alu-rex',
        destination: '/alurex-gutter-systems',
        permanent: true,
      },
      {
        source: '/gutter-guards',
        destination: '/alurex-gutter-systems',
        permanent: true,
      },
      {
        source: '/gutter-protection',
        destination: '/alurex-gutter-systems',
        permanent: true,
      },
      
      // FAQ & HELP REDIRECTS
      {
        source: '/help',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/questions',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/support',
        destination: '/faq',
        permanent: true,
      },
      
      // CATCH-ALL FOR UNKNOWN LEGACY PATTERNS
      {
        source: '/old-site/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wix/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/temp/:slug*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
