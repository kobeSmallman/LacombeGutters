// Define types for our locations
export interface ServiceLocation {
  name: string;
  slug: string;
  region: 'North' | 'Central' | 'South' | 'East' | 'West';
  priority: number; // 1-3, where 1 is highest priority (main service areas)
}

// All the service locations we cover (within actual service boundary)
export const serviceLocations: ServiceLocation[] = [
  // Priority 1 - Main service areas with direct links
  { name: "Edmonton", slug: "edmonton", region: "North", priority: 1 },
  { name: "Red Deer", slug: "red-deer", region: "Central", priority: 1 },
  { name: "Lacombe", slug: "lacombe", region: "Central", priority: 1 },
  { name: "St. Albert", slug: "st-albert", region: "North", priority: 1 },
  { name: "Spruce Grove", slug: "spruce-grove", region: "North", priority: 1 },
  { name: "Leduc", slug: "leduc", region: "North", priority: 1 },
  { name: "Wetaskiwin", slug: "wetaskiwin", region: "North", priority: 1 },
  { name: "Airdrie", slug: "airdrie", region: "South", priority: 1 },
  { name: "Calgary", slug: "calgary", region: "South", priority: 1 },
  { name: "Blackfalds", slug: "blackfalds", region: "Central", priority: 1 },
  { name: "Sylvan Lake", slug: "sylvan-lake", region: "Central", priority: 1 },
  { name: "Ponoka", slug: "ponoka", region: "Central", priority: 1 },
  { name: "Stettler", slug: "stettler", region: "East", priority: 1 },
  { name: "Camrose", slug: "camrose", region: "East", priority: 1 },
  { name: "Penhold", slug: "penhold", region: "Central", priority: 1 },
  { name: "Olds", slug: "olds", region: "Central", priority: 1 },
  { name: "Innisfail", slug: "innisfail", region: "Central", priority: 1 },
  
  // Priority 2 - Secondary service areas
  { name: "Beaumont", slug: "beaumont", region: "North", priority: 2 },
  { name: "Stony Plain", slug: "stony-plain", region: "North", priority: 2 },
  { name: "Morinville", slug: "morinville", region: "North", priority: 2 },
  
  // Priority 3 - Tertiary service areas (within boundary only)
  { name: "Didsbury", slug: "didsbury", region: "Central", priority: 3 },
  { name: "Rocky Mountain House", slug: "rocky-mountain-house", region: "West", priority: 3 },
  { name: "Sundre", slug: "sundre", region: "West", priority: 3 },
  { name: "Three Hills", slug: "three-hills", region: "East", priority: 3 },
  { name: "Trochu", slug: "trochu", region: "East", priority: 3 },
  { name: "Rimbey", slug: "rimbey", region: "West", priority: 3 },
  { name: "Bentley", slug: "bentley", region: "West", priority: 3 },
  { name: "Eckville", slug: "eckville", region: "West", priority: 3 },
  { name: "Hanna", slug: "hanna", region: "East", priority: 3 },
  { name: "Castor", slug: "castor", region: "East", priority: 3 },
  { name: "Coronation", slug: "coronation", region: "East", priority: 3 },
  { name: "Consort", slug: "consort", region: "East", priority: 3 },
  { name: "Millet", slug: "millet", region: "North", priority: 3 },
  { name: "Mirror", slug: "mirror", region: "East", priority: 3 },
  { name: "Killam", slug: "killam", region: "East", priority: 3 },
  { name: "Carstairs", slug: "carstairs", region: "Central", priority: 3 },
  { name: "Bowden", slug: "bowden", region: "Central", priority: 3 },
  { name: "Delburne", slug: "delburne", region: "Central", priority: 3 },
  { name: "Hardisty", slug: "hardisty", region: "East", priority: 3 },
  { name: "Sedgewick", slug: "sedgewick", region: "East", priority: 3 },
  { name: "Provost", slug: "provost", region: "East", priority: 3 },
  { name: "Viking", slug: "viking", region: "East", priority: 3 },
  { name: "Mannville", slug: "mannville", region: "East", priority: 3 },
  { name: "Vegreville", slug: "vegreville", region: "East", priority: 3 },
  { name: "Caroline", slug: "caroline", region: "West", priority: 3 },
  { name: "Elnora", slug: "elnora", region: "Central", priority: 3 },
  { name: "Warburg", slug: "warburg", region: "North", priority: 3 },
  { name: "Thorsby", slug: "thorsby", region: "North", priority: 3 },
  { name: "Calmar", slug: "calmar", region: "North", priority: 3 },
  { name: "Cochrane", slug: "cochrane", region: "South", priority: 3 },
  { name: "Crossfield", slug: "crossfield", region: "South", priority: 3 },
  { name: "Cremona", slug: "cremona", region: "South", priority: 3 },
  { name: "Beiseker", slug: "beiseker", region: "South", priority: 3 },
  { name: "Acme", slug: "acme", region: "South", priority: 3 },
  { name: "Big Valley", slug: "big-valley", region: "East", priority: 3 },
  { name: "Meeting Creek", slug: "meeting-creek", region: "East", priority: 3 },
  { name: "Clive", slug: "clive", region: "Central", priority: 3 },
  { name: "Alix", slug: "alix", region: "Central", priority: 3 },
  { name: "Deer Meadow", slug: "deer-meadow", region: "Central", priority: 3 },
  { name: "Lousana", slug: "lousana", region: "Central", priority: 3 },
  { name: "Gull Lake", slug: "gull-lake", region: "Central", priority: 3 },
  { name: "Bashaw", slug: "bashaw", region: "East", priority: 3 },
  { name: "Forestburg", slug: "forestburg", region: "East", priority: 3 },
  { name: "Hughenden", slug: "hughenden", region: "East", priority: 3 },
  { name: "Lougheed", slug: "lougheed", region: "East", priority: 3 },
  { name: "Holden", slug: "holden", region: "East", priority: 3 },
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
