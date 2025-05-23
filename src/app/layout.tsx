import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import ThemeToggle from '@/components/ThemeToggle'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'

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

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Professional Eavestrough Services`,
  },
  description: SITE_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-body bg-neutral-light text-neutral-dark min-h-screen flex flex-col transition-colors duration-300">
        {/* SEO Schema Data - invisible to users */}
        <LocalBusinessSchema />
        
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ThemeToggle />
      </body>
    </html>
  )
}
