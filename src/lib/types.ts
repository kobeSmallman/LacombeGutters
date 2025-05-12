export interface Service {
  slug: string;
  name: string;
  excerpt: string;
  body: string;
  hero: string;
}

export interface Testimonial {
  name: string;
  quote: string;
  location: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Area {
  city: string;
  lat: number;
  lng: number;
}
