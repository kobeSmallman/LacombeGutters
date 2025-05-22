// Define types for our locations
export interface ServiceLocation {
  name: string;
  slug: string;
  region: 'North' | 'Central' | 'South' | 'East' | 'West';
  priority: number; // 1-3, where 1 is highest priority (main service areas)
}

// All the service locations we cover
export const serviceLocations: ServiceLocation[] = [
  // Primary service areas (highest priority)
  { name: "Red Deer", slug: "red-deer", region: "Central", priority: 1 },
  { name: "Lacombe", slug: "lacombe", region: "Central", priority: 1 },
  { name: "Blackfalds", slug: "blackfalds", region: "Central", priority: 1 },
  { name: "Sylvan Lake", slug: "sylvan-lake", region: "Central", priority: 1 },
  { name: "Spruce Grove", slug: "spruce-grove", region: "North", priority: 1 },
  
  // Secondary service areas
  { name: "Leduc", slug: "leduc", region: "North", priority: 2 },
  { name: "Beaumont", slug: "beaumont", region: "North", priority: 2 },
  { name: "Camrose", slug: "camrose", region: "East", priority: 2 },
  { name: "Stony Plain", slug: "stony-plain", region: "North", priority: 2 },
  { name: "Canmore", slug: "canmore", region: "South", priority: 2 },
  { name: "Strathmore", slug: "strathmore", region: "South", priority: 2 },
  { name: "High River", slug: "high-river", region: "South", priority: 2 },
  { name: "Wetaskiwin", slug: "wetaskiwin", region: "North", priority: 2 },
  { name: "Morinville", slug: "morinville", region: "North", priority: 2 },
  { name: "Drumheller", slug: "drumheller", region: "East", priority: 2 },
  
  // Tertiary service areas
  { name: "Innisfail", slug: "innisfail", region: "Central", priority: 3 },
  { name: "Olds", slug: "olds", region: "Central", priority: 3 },
  { name: "Rocky Mountain House", slug: "rocky-mountain-house", region: "West", priority: 3 },
  { name: "Ponoka", slug: "ponoka", region: "Central", priority: 3 },
  { name: "Didsbury", slug: "didsbury", region: "Central", priority: 3 },
  { name: "Sundre", slug: "sundre", region: "West", priority: 3 },
  { name: "Stettler", slug: "stettler", region: "East", priority: 3 },
  { name: "Three Hills", slug: "three-hills", region: "East", priority: 3 },
  { name: "Trochu", slug: "trochu", region: "East", priority: 3 },
  { name: "Rimbey", slug: "rimbey", region: "West", priority: 3 },
  { name: "Bentley", slug: "bentley", region: "West", priority: 3 },
  { name: "Eckville", slug: "eckville", region: "West", priority: 3 },
  { name: "Penhold", slug: "penhold", region: "Central", priority: 3 },
  { name: "Hanna", slug: "hanna", region: "East", priority: 3 },
  { name: "Castor", slug: "castor", region: "East", priority: 3 },
  { name: "Coronation", slug: "coronation", region: "East", priority: 3 },
  { name: "Consort", slug: "consort", region: "East", priority: 3 },
  { name: "Millet", slug: "millet", region: "North", priority: 3 },
  { name: "Mirror", slug: "mirror", region: "East", priority: 3 },
  { name: "Killam", slug: "killam", region: "East", priority: 3 },
  { name: "Hardisty", slug: "hardisty", region: "East", priority: 3 },
  { name: "Sedgewick", slug: "sedgewick", region: "East", priority: 3 },
  { name: "Oyen", slug: "oyen", region: "East", priority: 3 },
  { name: "Provost", slug: "provost", region: "East", priority: 3 },
  { name: "Two Hills", slug: "two-hills", region: "East", priority: 3 },
  { name: "Viking", slug: "viking", region: "East", priority: 3 },
  { name: "Mannville", slug: "mannville", region: "East", priority: 3 },
  { name: "Vegreville", slug: "vegreville", region: "East", priority: 3 },
  { name: "Vilna", slug: "vilna", region: "North", priority: 3 },
  { name: "Smoky Lake", slug: "smoky-lake", region: "North", priority: 3 },
  { name: "St. Paul", slug: "st-paul", region: "North", priority: 3 },
  { name: "Bowden", slug: "bowden", region: "Central", priority: 3 },
  { name: "Caroline", slug: "caroline", region: "West", priority: 3 },
  { name: "Delburne", slug: "delburne", region: "Central", priority: 3 },
  { name: "Elnora", slug: "elnora", region: "Central", priority: 3 },
  { name: "Hay Lakes", slug: "hay-lakes", region: "North", priority: 3 },
  { name: "Hussar", slug: "hussar", region: "South", priority: 3 },
  { name: "Linden", slug: "linden", region: "South", priority: 3 },
  { name: "Lomond", slug: "lomond", region: "South", priority: 3 },
  { name: "Warburg", slug: "warburg", region: "North", priority: 3 },
  { name: "Thorsby", slug: "thorsby", region: "North", priority: 3 },
  { name: "Calmar", slug: "calmar", region: "North", priority: 3 },
  { name: "Bruderheim", slug: "bruderheim", region: "North", priority: 3 },
  { name: "Lamont", slug: "lamont", region: "North", priority: 3 },
  { name: "Andrew", slug: "andrew", region: "North", priority: 3 },
  { name: "Ryley", slug: "ryley", region: "North", priority: 3 },
  { name: "Bonnyville", slug: "bonnyville", region: "North", priority: 3 },
  { name: "Cold Lake", slug: "cold-lake", region: "North", priority: 3 },
  { name: "Lac la Biche", slug: "lac-la-biche", region: "North", priority: 3 },
  { name: "Barrhead", slug: "barrhead", region: "North", priority: 3 },
  { name: "Westlock", slug: "westlock", region: "North", priority: 3 },
  { name: "Athabasca", slug: "athabasca", region: "North", priority: 3 },
  { name: "Boyle", slug: "boyle", region: "North", priority: 3 },
  { name: "Whitecourt", slug: "whitecourt", region: "North", priority: 3 },
  { name: "Mayerthorpe", slug: "mayerthorpe", region: "North", priority: 3 },
  { name: "Onoway", slug: "onoway", region: "North", priority: 3 },
  { name: "Fox Creek", slug: "fox-creek", region: "North", priority: 3 },
  { name: "Edson", slug: "edson", region: "West", priority: 3 },
  { name: "Hinton", slug: "hinton", region: "West", priority: 3 },
  { name: "Jasper", slug: "jasper", region: "West", priority: 3 },
  { name: "Drayton Valley", slug: "drayton-valley", region: "West", priority: 3 },
  { name: "Valleyview", slug: "valleyview", region: "North", priority: 3 },
  { name: "Cochrane", slug: "cochrane", region: "South", priority: 3 },
  { name: "Crossfield", slug: "crossfield", region: "South", priority: 3 },
  { name: "Cremona", slug: "cremona", region: "South", priority: 3 },
  { name: "Carstairs", slug: "carstairs", region: "South", priority: 3 },
  { name: "Beiseker", slug: "beiseker", region: "South", priority: 3 },
  { name: "Acme", slug: "acme", region: "South", priority: 3 },
  { name: "Arrowwood", slug: "arrowwood", region: "South", priority: 3 },
  { name: "Big Valley", slug: "big-valley", region: "East", priority: 3 },
  { name: "Meeting Creek", slug: "meeting-creek", region: "East", priority: 3 },
  { name: "Clive", slug: "clive", region: "Central", priority: 3 },
  { name: "Bashaw", slug: "bashaw", region: "East", priority: 3 },
  { name: "Forestburg", slug: "forestburg", region: "East", priority: 3 },
  { name: "Hughenden", slug: "hughenden", region: "East", priority: 3 },
  { name: "Lougheed", slug: "lougheed", region: "East", priority: 3 },
  { name: "Holden", slug: "holden", region: "East", priority: 3 },
  { name: "Milo", slug: "milo", region: "South", priority: 3 },
  { name: "Rockyford", slug: "rockyford", region: "South", priority: 3 },
  { name: "Rosemary", slug: "rosemary", region: "South", priority: 3 },
  { name: "Empress", slug: "empress", region: "East", priority: 3 },
  { name: "Veteran", slug: "veteran", region: "East", priority: 3 },
  { name: "Cereal", slug: "cereal", region: "East", priority: 3 },
  { name: "Delia", slug: "delia", region: "East", priority: 3 },
  { name: "Edberg", slug: "edberg", region: "East", priority: 3 }
];

// Utility functions for working with locations
export const getLocationsByRegion = (region: string) => {
  return serviceLocations.filter(location => location.region === region);
};

export const getPriorityLocations = (priority: number) => {
  return serviceLocations.filter(location => location.priority === priority);
};

export const getAllLocations = () => {
  return serviceLocations;
};
