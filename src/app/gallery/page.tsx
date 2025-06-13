import GalleryClient from "@/components/GalleryClient";
import { galleryItems } from "@/data/gallery";

export const metadata = {
  title: "Project Gallery | Lacombe Gutters Ltd",
  description: "View our portfolio of completed gutter, eavestrough, soffit, and fascia installations across central Alberta.",
  keywords: ["gutter installation", "eavestrough projects", "soffit installation", "fascia replacement", "central alberta gutters", "residential gutter systems"],
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: "Project Gallery | Lacombe Gutters Ltd",
    description: "Browse our gallery of completed gutter & eavestrough installations throughout central Alberta.",
    url: '/gallery',
    type: 'website',
    images: [
      {
        url: '/images/og/gallery-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Lacombe Gutters Project Gallery',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Project Gallery | Lacombe Gutters Ltd",
    description: "Browse our gallery of completed gutter & eavestrough installations throughout central Alberta.",
    images: ['/images/og/gallery-og.jpg'],
  },
};

export default function GalleryPage() {
  return (
    <GalleryClient galleryItems={galleryItems} />
  );
}
