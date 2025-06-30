import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Lacombe Gutters",
  description: "Answers to common gutter, soffit & fascia questions for Central Alberta homeowners.",
  keywords: ["gutter FAQ", "eavestrough questions", "soffit fascia installation", "gutter maintenance", "Alberta home gutters", "gutter repair FAQ"],
  alternates: {
    canonical: 'https://www.lacombeguttersltd.com/faq',
  },
  openGraph: {
    title: "FAQ | Lacombe Gutters Ltd",
    description: "Answers to common gutter, soffit & fascia questions for Central Alberta homeowners.",
    url: '/faq',
    type: 'website',
    images: [
      {
        url: '/images/og/faq-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Lacombe Gutters FAQ',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "FAQ | Lacombe Gutters Ltd",
    description: "Answers to common gutter, soffit & fascia questions for Central Alberta homeowners.",
    images: ['/images/og/faq-og.jpg'],
  },
};

export const dynamic = 'force-dynamic';

// This file doesn't contain the actual schema.org JSON-LD data
// The FAQSchema component is inserted in layout.tsx to properly render in <head>
