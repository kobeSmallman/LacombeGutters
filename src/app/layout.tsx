import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'

import ScrollToTop from '@/components/ui/scroll-to-top'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'
import { Analytics } from '@vercel/analytics/react'
import ClientWidgets from '@/components/ClientWidgets'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap'
})

export const viewport = {
  themeColor: '#215e7d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover', // Enable safe area support for iPhone X and newer
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Professional Eavestrough Services in Lacombe, AB`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Lacombe gutters',
    'eavestrough installation', 
    'gutter repair',
    'soffit and fascia',
    'gutter cleaning',
    'rainwater management',
    'Central Alberta gutters',
    'residential gutters',
    'commercial gutters',
    'gutter guards',
    'gutter maintenance'
  ],
  metadataBase: new URL('https://www.lacombeguttersltd.com'),
  alternates: {
    canonical: 'https://www.lacombeguttersltd.com/',
  },
  openGraph: {
    title: `${SITE_NAME} | Professional Eavestrough Services in Lacombe, AB`,
    description: SITE_DESCRIPTION,
    url: 'https://www.lacombeguttersltd.com',
    siteName: SITE_NAME,
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lacombe Gutters - Professional Eavestrough Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Professional Eavestrough Services`,
    description: SITE_DESCRIPTION,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // ONLY ADD these missing pieces for Google Search Console
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'geo.region': 'CA-AB',
    'geo.placename': 'Lacombe, Alberta',
    'geo.position': '52.4667;-113.7333',
    'ICBM': '52.4667, -113.7333',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#215e7d" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-body bg-neutral-light text-neutral-dark min-h-screen flex flex-col transition-colors duration-300">
        {/* SEO Schema Data - invisible to users */}
        <LocalBusinessSchema />
        
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />

        <ClientWidgets />
        <Analytics />
      </body>
    </html>
  )
}
