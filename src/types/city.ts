export interface CityFeatures {
  majorRoads: string[];
  distanceFromLacombe: string;
  localLandmarks: string[];
  // Add any other city-specific features here
}

export interface CityData {
  slug: string;
  name: string;
  province: string;
  coordinates: [number, number]; // [latitude, longitude]
  metaDescription: string;
  intro: string;
  commitment: string;
  serving: string;
  nearbyCities: string[];
  features: CityFeatures;
  // Add any other city-specific properties here
}

export interface CityPageProps {
  cityData: CityData;
  // Add any other page-specific props here
}
