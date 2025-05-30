import { CityData } from '../types/city';

// Nearby cities for cross-linking (will be filtered for each city)
const ALL_CITIES = [
  'Red Deer',
  'Airdrie',
  'Leduc',
  'Sylvan Lake',
  'Olds',
  'Innisfail',
  'Blackfalds',
  'Lacombe',
  'Ponoka',
  'Stettler',
  'Rimbey',
  'Rocky Mountain House',
  'Wetaskiwin',
  'Camrose',
  'Penhold',
  'Carstairs',
  'Crossfield',
  'Didsbury',
  'Eckville',
  'Delburne',
  'Bentley',
  'Bashaw',
  'Clive',
  'Alix',
  'Nordegg'
];

// City coordinates for maps [lat, lng]
const CITY_COORDINATES: Record<string, [number, number]> = {
  'Red Deer': [52.2681, -113.8113],
  'Airdrie': [51.2917, -114.0144],
  'Leduc': [53.2619, -113.5491],
  'Sylvan Lake': [52.3078, -114.0958],
  // Add other cities with their coordinates
};

// Get 3-5 nearby cities (excluding the current city)
const getNearbyCities = (city: string, count: number = 4): string[] => {
  return ALL_CITIES
    .filter(c => c !== city)
    .sort(() => 0.5 - Math.random()) // Randomize
    .slice(0, count);
};

// Unique introduction paragraphs for each city
const CITY_INTROS: Record<string, string> = {
  'Red Deer': `Nestled along the Queen Elizabeth II Highway, Red Deer's diverse neighborhoods each present unique gutter challenges. From the mature trees of Mountview to the new developments in Timberlands, we understand how Red Deer's weather patterns affect your home's drainage.`,
  'Airdrie': `As one of Canada's fastest-growing cities, Airdrie's mix of new construction and established communities requires specialized gutter solutions. Whether you're in the historic Airdrie East or the newer communities of Sagewood, we've got your gutter needs covered.`,
  'Leduc': `Serving as the gateway to Alberta's capital region, Leduc's unique position means dealing with both urban and rural gutter challenges. From the historic downtown core to the growing areas near the international airport, we provide tailored gutter solutions.`,
  'Sylvan Lake': `With its lakeside location and heavy tourist traffic, Sylvan Lake homes face unique weather challenges. The lake effect can accelerate gutter wear, making proper maintenance essential for protecting your property.`,
  'Olds': `Located at the crossroads of Highways 2 and 27, Olds experiences weather patterns that can be tough on gutters. Our local expertise helps protect your home from the heavy snowmelt and summer storms common in this area.`
  // Add more cities with unique intros
};

// Unique commitment paragraphs for each city
const CITY_COMMITMENTS: Record<string, string> = {
  'Red Deer': `Red Deer's unique position in the parkland region means dealing with everything from heavy snowfall to summer hailstorms. We're committed to providing gutter solutions that stand up to these challenges, using materials and techniques specifically chosen for Central Alberta's climate.`,
  'Airdrie': `Airdrie's rapid growth means many homeowners are dealing with new construction that may not account for our region's weather extremes. We're committed to ensuring your home has the proper gutter protection from day one.`,
  'Leduc': `Leduc's proximity to the airport and major highways means your home faces unique challenges from wind-driven rain and debris. We're committed to gutter solutions that handle these specific conditions.`,
  'Sylvan Lake': `The lake effect in Sylvan Lake can lead to unique moisture challenges for your home. We're committed to gutter solutions that protect your property from both the beautiful lakeside setting and the weather it brings.`,
  'Olds': `Olds' agricultural surroundings mean dealing with extra debris and exposure. We're committed to providing gutter solutions that handle everything from falling leaves to heavy snow loads.`
  // Add more cities with unique commitments
};

// Unique serving paragraphs for each city
const CITY_SERVING: Record<string, string> = {
  'Red Deer': `From the bustling downtown core to the peaceful Riverbend area, we're proud to serve all of Red Deer and the surrounding region. Our mobile team can quickly respond to your gutter needs, whether you're near the Collicutt Centre or in the newer communities of Clearview.`,
  'Airdrie': `Covering every corner of Airdrie from the historic downtown to the new communities in the city's northeast, we bring our expertise directly to your door. Our local team understands the specific needs of Airdrie homes.`,
  'Leduc': `From the heritage homes of Old Town to the modern developments near the airport, we provide comprehensive gutter services throughout Leduc. Our team is familiar with the city's unique architectural styles and weather patterns.`,
  'Sylvan Lake': `Serving the entire Sylvan Lake area, from the bustling lakeshore to the quiet streets of the north end, we understand how the lake affects your home's drainage needs.`,
  'Olds': `From the historic downtown to the growing neighborhoods on the city's edges, we're proud to serve Olds and the surrounding rural communities with reliable gutter solutions.`
  // Add more cities with unique serving info
};

// Generate the full city data
export const generateCityData = (): CityData[] => {
  return ALL_CITIES.map(city => ({
    slug: `${city.toLowerCase().replace(/\s+/g, '-')}-gutters`,
    name: city,
    province: 'Alberta',
    coordinates: CITY_COORDINATES[city] || [0, 0], // Fallback coordinates
    metaDescription: `Professional gutter installation, repair, and maintenance in ${city}, Alberta. Local experts with 40+ years experience. Free estimates. Call today!`,
    intro: CITY_INTROS[city] || `Professional gutter services in ${city}, Alberta. Local experts with 40+ years of combined experience serving Central Alberta.`,
    commitment: CITY_COMMITMENTS[city] || `We're committed to providing the highest quality gutter services in ${city}, using materials and techniques specifically chosen for Alberta's climate.`,
    serving: CITY_SERVING[city] || `Serving ${city} and the surrounding Central Alberta region with pride. Our local team understands the unique challenges of your area.`,
    nearbyCities: getNearbyCities(city),
    // Add any city-specific features or landmarks
    features: {
      majorRoads: ['Queen Elizabeth II Highway', 'Highway 2A'], // Example, customize per city
      distanceFromLacombe: '45 minutes', // Example, customize per city
      localLandmarks: [] // Add local landmarks if relevant
    }
  }));
};

export const cityData = generateCityData();

// Helper to get data for a specific city
export const getCityData = (citySlug: string): CityData | undefined => {
  return cityData.find(city => city.slug === citySlug);
};
