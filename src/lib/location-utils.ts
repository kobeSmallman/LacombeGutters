import locationData from '@/data/locations.json';

export interface LocationData {
  name: string;
  slug: string;
  region: 'North' | 'Central' | 'South' | 'East' | 'West';
  priority: number;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Type assertion for the imported JSON data
const typedLocationData = locationData as LocationData[];

/**
 * Get all location slugs for static generation
 */
export function getAllLocationSlugs(): string[] {
  return typedLocationData.map((location) => location.slug);
}

/**
 * Get location data by slug
 */
export function getLocationData(slug: string): LocationData | null {
  const location = typedLocationData.find((loc) => loc.slug === slug);
  return location || null;
}

/**
 * Get all locations
 */
export function getAllLocations(): LocationData[] {
  return typedLocationData;
}

/**
 * Get locations by region
 */
export function getLocationsByRegion(region: string): LocationData[] {
  return typedLocationData.filter((location) => location.region === region);
}

/**
 * Get locations by priority
 */
export function getLocationsByPriority(priority: number): LocationData[] {
  return typedLocationData.filter((location) => location.priority === priority);
}
