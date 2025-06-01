export interface CityData {
  slug: string;
  name: string;
  metaDescription: string;
  intro: string;
  commitment: string;
  serving: string;
  nearbyCities: string[];
  features: {
    majorRoads: string[];
    distanceFromLacombe: string;
    localLandmarks: string[];
  };
  province: string;
  specialNote?: string;
}

export const cities: CityData[] = [
  {
    slug: 'lacombe',
    name: 'Lacombe',
    metaDescription: 'Professional gutter installation and repair services in Lacombe, AB',
    intro: 'Serving the Lacombe community since 2013, we specialize in high-quality gutter solutions for both residential and commercial properties.',
    commitment: 'Our team is committed to providing exceptional service and workmanship to protect your home from water damage.',
    serving: 'We serve all of Lacombe and surrounding areas, including Blackfalds and Bentley.',
    nearbyCities: ['Blackfalds (15 min)', 'Bentley (30 min)', 'Red Deer (25 min)'],
    features: {
      majorRoads: ['Hwy 2A', 'Hwy 12', 'Hwy 20'],
      distanceFromLacombe: '0 km',
      localLandmarks: ['Lacombe Memorial Centre', 'Lacombe Golf & Country Club', 'Lacombe Lake']
    },
    province: 'AB',
    specialNote: 'Free estimates available for all Lacombe residents.'
  },
  // Add other cities here as needed
];
