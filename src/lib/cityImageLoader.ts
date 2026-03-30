// City image loader utility - uses curated static images for priority cities, regional fallbacks for others

export const getCityImageUrl = (slug: string): string => {
  // Curated images for priority cities (stored in /public/images/ServiceAreaImages/)
  const curatedCityImages: Record<string, string> = {
    // All cities with custom curated images
    'edmonton': '/images/ServiceAreaImages/Edmonton.jpg',
    'red-deer': '/images/gallery/residential_front_patio_view.png',
    'lacombe': '/images/ServiceAreaImages/Lacombe.jpg',
    'st-albert': '/images/ServiceAreaImages/St_Albert_Alberta.jpg',
    'spruce-grove': '/images/ServiceAreaImages/Spruce_Grove.jpg',
    'leduc': '/images/gallery/Downspout.png',
    'wetaskiwin': '/images/ServiceAreaImages/Wetaskiwin.jpg',
    'airdrie': '/images/ServiceAreaImages/Airdrie.jpg',
    'calgary': '/images/ServiceAreaImages/Calgary.jpg',
    'blackfalds': '/images/ServiceAreaImages/Blackfalds.JPG',
    'sylvan-lake': '/images/gallery/09_gutter_install_two_workers.png',
    'ponoka': '/images/ServiceAreaImages/Ponoka.jpg',
    'stettler': '/images/ServiceAreaImages/Stettler.jpg',
    'camrose': '/images/gallery/commercial_side_installation.png',
    'penhold': '/images/ServiceAreaImages/Penhold.jpg',
    'olds': '/images/ServiceAreaImages/Olds.jpg',
    'innisfail': '/images/ServiceAreaImages/Downtown_Innisfail.png',
    'beaumont': '/images/ServiceAreaImages/Beaumont_Alberta.jpg'
  };

  // Regional fallback images for generic cities
  const getCityRegion = (citySlug: string) => {
    const northCities = ['edmonton', 'st-albert', 'spruce-grove', 'leduc', 'wetaskiwin', 'beaumont', 'stony-plain', 'morinville', 'millet', 'warburg', 'thorsby', 'calmar'];
    const southCities = ['airdrie', 'calgary', 'olds', 'penhold', 'innisfail', 'cochrane', 'crossfield', 'cremona', 'carstairs', 'beiseker', 'acme'];
    const eastCities = ['stettler', 'camrose', 'three-hills', 'trochu', 'hanna', 'castor', 'coronation', 'consort', 'mirror', 'killam', 'hardisty', 'sedgewick', 'provost', 'viking', 'mannville', 'vegreville', 'big-valley', 'meeting-creek', 'bashaw', 'forestburg', 'hughenden', 'lougheed', 'holden', 'veteran', 'cereal', 'delia', 'edberg'];
    const westCities = ['rocky-mountain-house', 'sundre', 'rimbey', 'bentley', 'eckville', 'caroline'];
    
    if (northCities.includes(citySlug)) return 'northern';
    if (southCities.includes(citySlug)) return 'southern';
    if (eastCities.includes(citySlug)) return 'central'; // East uses central image
    if (westCities.includes(citySlug)) return 'central'; // West uses central image
    return 'central'; // Default to central for Lacombe area
  };

  const regionalFallbackImages = {
    northern: '/images/ServiceAreaImages/northernPic.png',
    central: '/images/ServiceAreaImages/centralPic.png',
    southern: '/images/ServiceAreaImages/southernPic.png'
  };

  // First check if we have a curated image for this city
  if (curatedCityImages[slug]) {
    return curatedCityImages[slug];
  }

  // Fall back to appropriate regional image
  const region = getCityRegion(slug);
  return regionalFallbackImages[region];
};
