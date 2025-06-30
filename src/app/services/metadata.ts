import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gutter & Eavestrough Services | Lacombe Gutters Ltd",
  description: "Professional gutter installation, soffit & fascia replacement, and eavestrough maintenance services across Central Alberta with 40+ years of combined experience.",
  keywords: ["gutter installation", "eavestrough services", "soffit and fascia", "gutter cleaning", "downspout installation", "commercial eavestrough", "Central Alberta gutters"],
  alternates: {
    canonical: 'https://www.lacombeguttersltd.com/services',
  },
  openGraph: {
    title: "Gutter & Eavestrough Services | Lacombe Gutters Ltd",
    description: "Professional gutter installation and maintenance services for residential and commercial properties throughout Central Alberta.",
    url: '/services',
    type: 'website',
    images: [
      {
        url: '/images/og/services-og.jpg', 
        width: 1200,
        height: 630,
        alt: 'Lacombe Gutters Professional Services',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gutter & Eavestrough Services | Lacombe Gutters Ltd",
    description: "Professional gutter installation and maintenance services for residential and commercial properties throughout Central Alberta.",
    images: ['/images/og/services-og.jpg'],
  },
};
