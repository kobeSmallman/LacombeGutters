export interface GalleryItem {
  id: number;
  category: string;
  title: string;
  location?: string;  // Made optional with '?'
  description: string;
  image: string;
  materials: string[];
  year: string;
}
