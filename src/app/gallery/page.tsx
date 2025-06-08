import GalleryClient from "@/components/GalleryClient";
import { galleryItems } from "@/data/gallery";

export const metadata = {
  title: "Gallery",
  description: "View our portfolio of completed gutter, eavestrough, soffit, and fascia installations across central Alberta.",
};

export default function GalleryPage() {
  return (
    <GalleryClient galleryItems={galleryItems} />
  );
}
