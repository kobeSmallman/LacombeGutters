import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import ThemeToggle from '@/components/ThemeToggle'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'
import { Analytics } from '@vercel/analytics/react'

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
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Professional Eavestrough Services`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL('https://lacombeguttersltd.com'),
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
  openGraph: {
    title: `${SITE_NAME} | Professional Eavestrough Services`,
    description: SITE_DESCRIPTION,
    url: 'https://lacombeguttersltd.com',
    siteName: SITE_NAME,
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Professional Eavestrough Services`,
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
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
        <ThemeToggle />
        <Analytics />
      </body>
    </html>
  )
}
