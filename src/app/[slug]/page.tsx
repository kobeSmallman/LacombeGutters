import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Import the client component with no SSR to avoid hydration issues
const CityPageClient = dynamic(
  () => import('./CityPageClient'),
  { ssr: false }
);

// City data with unique details for each location
const cityData = [
  {
    slug: 'lacombe',
    name: 'Lacombe',
    metaDescription: 'Expert gutter installation and repair services in Lacombe, AB - Protecting homes since 2010',
    intro: 'As Lacombe\'s premier gutter specialists, we understand the unique weather challenges in Central Alberta. Our locally-owned business takes pride in providing custom gutter solutions that stand up to harsh winters and heavy rainfall.',
    commitment: 'We back all our installations with a 10-year warranty and offer free, no-obligation estimates. Our team is fully insured and committed to 100% customer satisfaction.',
    serving: 'From historic downtown properties to new developments in the north end, we serve all of Lacombe with equal attention to detail and quality craftsmanship.',
    nearbyCities: ['Blackfalds (15 min)', 'Ponoka (30 min)', 'Bentley (25 min)'],
    features: {
      majorRoads: ['Hwy 12 (50th Ave)', 'Hwy 2A (50th St)', 'Wolf Creek Drive'],
      distanceFromLacombe: 'City Center',
      localLandmarks: ['Lacombe Memorial Centre', 'Lacombe Lake', 'Michener House Museum']
    },
    province: 'AB',
    specialNote: 'Ask about our seasonal maintenance plans to keep your gutters flowing year-round.'
  },
  {
    slug: 'red-deer',
    name: 'Red Deer',
    metaDescription: 'Red Deer\'s trusted gutter experts - Professional installation and repair services for residential and commercial properties',
    intro: 'Serving Red Deer since 2012, our team specializes in handling everything from downtown commercial properties to suburban homes. We understand the specific drainage challenges in the Red Deer River Valley area.',
    commitment: 'We offer same-day emergency repair services and free gutter inspections. Our work comes with a comprehensive 12-year warranty and 24-month labor guarantee.',
    serving: 'From Riverside Meadows to Vanier Woods, we cover all neighborhoods with the same dedication to excellence and customer service.',
    nearbyCities: ['Blackfalds (20 min)', 'Penhold (15 min)', 'Innisfail (30 min)'],
    features: {
      majorRoads: ['Hwy 2 (Gaetz Ave)', 'Hwy 11 (67th St)', 'Taylor Drive', '67th St'],
      distanceFromLacombe: '25 km (20 min)',
      localLandmarks: ['Bower Place Mall', 'Westerner Park', 'Bower Ponds', 'Red Deer College']
    },
    province: 'AB',
    specialNote: 'Specializing in seamless gutter installations that prevent leaks and reduce maintenance.'
  },
  {
    slug: 'blackfalds',
    name: 'Blackfalds',
    metaDescription: 'Blackfalds gutter specialists - Custom solutions for growing communities since 2015',
    intro: 'As Blackfalds continues to grow, proper drainage becomes increasingly important. We specialize in new construction installations and gutter upgrades for existing homes in developing areas.',
    commitment: 'We offer free consultations and competitive pricing for Blackfalds residents, with a focus on preventing basement flooding common in new developments.',
    serving: 'All neighborhoods including NorthRavine, SouthFork, and the new developments along Hwy 597.',
    nearbyCities: ['Lacombe (15 min)', 'Red Deer (20 min)', 'Alix (40 min)'],
    features: {
      majorRoads: ['Hwy 2A', 'Hwy 597', 'Broadway Ave'],
      distanceFromLacombe: '15 km (15 min)',
      localLandmarks: ['Abbey Centre', 'Blackfalds Multi-plex', 'Eagle Builders Centre']
    },
    province: 'AB',
    specialNote: 'Ask about our special rates for gutter guards in new construction projects.'
  },
  {
    slug: 'sylvan-lake',
    name: 'Sylvan Lake',
    metaDescription: 'Lakeside gutter solutions in Sylvan Lake - Protecting waterfront properties since 2014',
    intro: 'Waterfront properties in Sylvan Lake require specialized gutter solutions to handle heavy rainfall and snowmelt. Our team is experienced in addressing the unique challenges of lakeside homes.',
    commitment: 'We offer corrosion-resistant materials perfect for the lakeside climate and provide free wind damage assessments after major storms.',
    serving: 'From the downtown core to the scenic lakeside properties, we cover all of Sylvan Lake with specialized attention to waterfront drainage needs.',
    nearbyCities: ['Red Deer (25 min)', 'Bentley (15 min)', 'Eckville (20 min)'],
    features: {
      majorRoads: ['Lakeshore Drive', 'Hwy 20', 'Hwy 11'],
      distanceFromLacombe: '35 km (30 min)',
      localLandmarks: ['Sylvan Lake Pier', 'NexSource Centre', 'Jarvis Bay Provincial Park']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems that handle heavy snowfall and protect against ice damming.'
  },
  {
    slug: 'ponoka',
    name: 'Ponoka',
    metaDescription: 'Ponoka\'s trusted gutter experts - Serving the county with pride since 2013',
    intro: 'Serving Ponoka and the surrounding county, we understand the agricultural needs of rural properties. Our heavy-duty gutter systems are designed to handle farm and acreage requirements.',
    commitment: 'We offer flexible scheduling for farmers and ranchers, with emergency services available 24/7 during harvest season.',
    serving: 'From townhomes to sprawling acreages, we provide solutions for all property types in the Ponoka area.',
    nearbyCities: ['Wetaskiwin (40 min)', 'Lacombe (45 min)', 'Blackfalds (35 min)'],
    features: {
      majorRoads: ['Hwy 2A', 'Hwy 53', 'Hwy 2'],
      distanceFromLacombe: '45 km (35 min)',
      localLandmarks: ['Calgary International Airport', 'CrossIron Mills', 'Calgary Zoo']
    },
    province: 'AB',
    specialNote: 'Specializing in commercial gutter systems for agricultural buildings and storage facilities.'
  },
  {
    slug: 'bentley',
    name: 'Bentley',
    metaDescription: 'Bentley\'s gutter experts - Reliable service for rural and lakeside properties since 2016',
    intro: 'Nestled between Sylvan Lake and Gull Lake, Bentley requires gutter solutions that handle both heavy snowfall and spring runoff. Our team specializes in durable systems for the unique climate of this lakeside community.',
    commitment: 'We offer extended service hours during peak seasons and provide free estimates with no hidden fees. All work is backed by our industry-leading warranty.',
    serving: 'From the town center to rural acreages, we serve all of Bentley with the same commitment to quality and customer satisfaction.',
    nearbyCities: ['Sylvan Lake (15 min)', 'Rimbey (20 min)', 'Eckville (25 min)'],
    features: {
      majorRoads: ['Hwy 12', 'Hwy 20', 'Hwy 766'],
      distanceFromLacombe: '30 km (25 min)',
      localLandmarks: ['Bentley School', 'Bentley Agriplex', 'Bentley Museum']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter protection systems that handle pine needles and other debris common in the area.'
  },
  {
    slug: 'rimbey',
    name: 'Rimbey',
    metaDescription: 'Rimbey gutter specialists - Serving farm and ranch country with pride since 2014',
    intro: 'In the heart of oil and cattle country, we understand the importance of durable gutter systems that can handle Alberta\'s extreme weather. Our heavy-duty solutions are perfect for both town homes and rural properties.',
    commitment: 'We offer flexible scheduling for farmers and ranchers, with 24/7 emergency service for storm damage repairs.',
    serving: 'From Main Street to the surrounding county, we provide reliable gutter solutions for all of Rimbey.',
    nearbyCities: ['Ponoka (30 min)', 'Bentley (20 min)', 'Sylvan Lake (35 min)'],
    features: {
      majorRoads: ['Hwy 20', 'Hwy 53', 'Hwy 766'],
      distanceFromLacombe: '55 km (45 min)',
      localLandmarks: ['Rimbey Hospital', 'Peter Lougheed Community Centre', 'Rimbey Auction Market']
    },
    province: 'AB',
    specialNote: 'Ask about our commercial gutter systems for agricultural buildings and equipment shelters.'
  },
  {
    slug: 'eckville',
    name: 'Eckville',
    metaDescription: 'Eckville gutter installation and repair - Serving the crossroads of central Alberta since 2015',
    intro: 'At the intersection of Hwy 766 and Hwy 20, Eckville experiences unique weather patterns that demand reliable gutter systems. Our team is familiar with the specific drainage needs of this growing community.',
    commitment: 'We provide free gutter assessments and same-day estimates, with flexible scheduling for busy families and farmers.',
    serving: 'From townhomes to rural properties, we cover all of Eckville with professional gutter solutions.',
    nearbyCities: ['Sylvan Lake (20 min)', 'Bentley (15 min)', 'Rocky Mountain House (40 min)'],
    features: {
      majorRoads: ['Hwy 20', 'Hwy 766', 'Range Road 15'],
      distanceFromLacombe: '40 km (35 min)',
      localLandmarks: ['Eckville Community Centre', 'Eckville Arena', 'Eckville Museum']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems that handle heavy snow loads and ice buildup.'
  },
  {
    slug: 'alix',
    name: 'Alix',
    metaDescription: 'Alix gutter experts - Protecting historic homes and new builds since 2017',
    intro: 'With its mix of historic buildings and new developments, Alix requires gutter solutions that balance aesthetics with functionality. Our team is experienced in both preserving character homes and equipping new constructions.',
    commitment: 'We offer free consultations and detailed quotes, with special attention to preserving the architectural integrity of historic properties.',
    serving: 'From the shores of Buffalo Lake to the heart of downtown, we serve all of Alix with pride.',
    nearbyCities: ['Stettler (30 min)', 'Lacombe (40 min)', 'Ponoka (35 min)'],
    features: {
      majorRoads: ['Hwy 12', 'Hwy 21', 'Hwy 601'],
      distanceFromLacombe: '50 km (40 min)',
      localLandmarks: ['Alix Lake', 'Alix Wagon Museum', 'Alix MAC Arena']
    },
    province: 'AB',
    specialNote: 'Specializing in custom gutter solutions for heritage homes and historic renovations.'
  },
  {
    slug: 'clive',
    name: 'Clive',
    metaDescription: 'Clive gutter specialists - Small town service with professional results since 2016',
    intro: 'As a close-knit community between Lacombe and Bashaw, Clive deserves personalized gutter service that understands local needs. Our team provides the same attention to detail for small towns as we do for larger centers.',
    commitment: 'We offer same-day service for emergency repairs and free estimates for all Clive residents.',
    serving: 'From the village center to surrounding rural properties, we cover all of Clive with reliable service.',
    nearbyCities: ['Lacombe (20 min)', 'Alix (25 min)', 'Bashaw (30 min)'],
    features: {
      majorRoads: ['Hwy 12', 'Hwy 21', 'Range Road 14'],
      distanceFromLacombe: '30 km (25 min)',
      localLandmarks: ['Clive School', 'Clive Community Hall', 'Clive Athletic Park']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter solutions for both residential and small commercial properties.'
  },
  {
    slug: 'stettler',
    name: 'Stettler',
    metaDescription: 'Stettler gutter installation and repair - Serving the heart of Alberta since 2013',
    intro: 'At the crossroads of Highways 12 and 56, Stettler experiences diverse weather conditions that demand reliable gutter systems. Our team is equipped to handle everything from heritage homes to modern farmsteads.',
    commitment: 'We offer free gutter assessments and flexible scheduling for rural customers, with emergency services available 24/7.',
    serving: 'From Buffalo Lake to Big Valley, we cover Stettler and surrounding areas with professional service.',
    nearbyCities: ['Alix (30 min)', 'Bashaw (40 min)', 'Big Valley (45 min)'],
    features: {
      majorRoads: ['Hwy 12', 'Hwy 56', 'Hwy 601'],
      distanceFromLacombe: '75 km (1 hour)',
      localLandmarks: ['Stettler Recreation Centre', 'West Stettler Park', 'Stettler Mall']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems for both townhomes and large agricultural properties.'
  },
  {
    slug: 'didsbury',
    name: 'Didsbury',
    metaDescription: 'Didsbury gutter experts - Protecting homes in the Calgary-Edmonton corridor since 2014',
    intro: 'Situated along the Queen Elizabeth II Highway, Didsbury requires gutter systems that can handle both heavy snowfall and Chinook conditions. Our team is experienced in the unique weather patterns of this region.',
    commitment: 'We offer free consultations and detailed quotes, with special attention to preventing ice damming common in the area.',
    serving: 'From downtown Didsbury to surrounding rural properties, we provide comprehensive gutter solutions.',
    nearbyCities: ['Olds (15 min)', 'Carstairs (20 min)', 'Innisfail (30 min)'],
    features: {
      majorRoads: ['Hwy 2A', 'Hwy 582', 'Hwy 27'],
      distanceFromLacombe: '85 km (1 hour 10 min)',
      localLandmarks: ['Didsbury Aquatic Centre', 'Olds College', 'Didsbury Golf Course']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter guards that prevent clogs from cottonwood and other local debris.'
  },
  {
    slug: 'olds',
    name: 'Olds',
    metaDescription: 'Olds gutter specialists - College town expertise since 2013',
    intro: 'Home to Olds College, this vibrant community requires gutter solutions that combine academic charm with modern functionality. Our team is experienced in serving both the college campus and surrounding residential areas.',
    commitment: 'We offer student discounts and flexible scheduling to accommodate academic calendars, with free estimates for all Olds residents.',
    serving: 'From campus buildings to family homes, we provide comprehensive gutter solutions throughout Olds.',
    nearbyCities: ['Didsbury (15 min)', 'Carstairs (25 min)', 'Sundre (35 min)'],
    features: {
      majorRoads: ['Hwy 2A', 'Hwy 27', 'Hwy 806'],
      distanceFromLacombe: '95 km (1 hour 15 min)',
      localLandmarks: ['Olds College', 'Olds Aquatic Centre', 'Olds College Botanic Garden']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems for educational institutions and student housing.'
  },
  {
    slug: 'sundre',
    name: 'Sundre',
    metaDescription: 'Sundre gutter experts - Mountain-adjacent solutions since 2015',
    intro: 'Nestled near the foothills of the Rocky Mountains, Sundre experiences unique weather patterns that demand robust gutter systems. Our team is familiar with the challenges of mountain weather and heavy snowfall.',
    commitment: 'We provide free gutter assessments and emergency repair services, with special attention to preventing ice damming in winter.',
    serving: 'From the downtown core to rural acreages, we serve all of Sundre with reliable gutter solutions.',
    nearbyCities: ['Olds (35 min)', 'Didsbury (40 min)', 'Carstairs (45 min)'],
    features: {
      majorRoads: ['Hwy 27', 'Hwy 22', 'Hwy 54'],
      distanceFromLacombe: '110 km (1 hour 25 min)',
      localLandmarks: ['Sundre Hospital', 'Sundre Community Centre', 'Sundre Museum']
    },
    province: 'AB',
    specialNote: 'Specializing in heavy-duty gutter systems for mountain weather conditions.'
  },
  {
    slug: 'rocky-mountain-house',
    name: 'Rocky Mountain House',
    metaDescription: 'Rocky Mountain House gutter specialists - Serving the gateway to the Rockies since 2014',
    intro: 'As a gateway to the Rockies, this area experiences extreme weather conditions that demand durable gutter systems. Our team is experienced in handling everything from heavy snowfall to summer downpours.',
    commitment: 'We offer year-round service with emergency repairs available 24/7, backed by our comprehensive warranty.',
    serving: 'From the town center to remote rural properties, we cover all of Rocky Mountain House with reliable service.',
    nearbyCities: ['Sundre (40 min)', 'Eckville (45 min)', 'Sylvan Lake (50 min)'],
    features: {
      majorRoads: ['Hwy 11', 'Hwy 22', 'Hwy 11A'],
      distanceFromLacombe: '120 km (1 hour 30 min)',
      localLandmarks: ['Rocky Mountain House National Historic Site', 'Rocky Regional Recreation Centre', 'Rocky Municipal Airport']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems for extreme weather conditions and rural properties.'
  },
  {
    slug: 'innisfail',
    name: 'Innisfail',
    metaDescription: 'Innisfail gutter experts - Serving central Alberta since 2013',
    intro: 'Strategically located between Red Deer and Olds, Innisfail requires gutter systems that can handle diverse weather conditions. Our team is familiar with the specific needs of this growing community.',
    commitment: 'We offer free estimates and flexible scheduling, with special attention to preventing basement flooding common in the area.',
    serving: 'From historic downtown properties to new subdivisions, we serve all of Innisfail with professional gutter solutions.',
    nearbyCities: ['Red Deer (30 min)', 'Olds (25 min)', 'Penhold (35 min)'],
    features: {
      majorRoads: ['Hwy 2', 'Hwy 54', 'Hwy 590'],
      distanceFromLacombe: '50 km (40 min)',
      localLandmarks: ['Innisfail Aquatic Centre', 'Innisfail Arena', 'Discovery Wildlife Park']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems that handle both urban and rural drainage needs.'
  },
  {
    slug: 'penhold',
    name: 'Penhold',
    metaDescription: 'Penhold gutter specialists - Military community experts since 2015',
    intro: 'Home to CFB Penhold, this community has unique gutter needs for both military and civilian properties. Our team is experienced in handling the specific requirements of base housing and local residences.',
    commitment: 'We offer military discounts and flexible scheduling to accommodate shift work, with free estimates for all Penhold residents.',
    serving: 'From base housing to family homes, we provide comprehensive gutter solutions throughout Penhold.',
    nearbyCities: ['Red Deer (15 min)', 'Innisfail (20 min)', 'Blackfalds (25 min)'],
    features: {
      majorRoads: ['Hwy 2A', 'Hwy 42', 'Range Road 280'],
      distanceFromLacombe: '35 km (30 min)',
      localLandmarks: ['Penhold Crossing', 'Penhold Regional Multiplex', 'CFB Penhold']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems for military housing and institutional buildings.'
  },
  {
    slug: 'black-diamond',
    name: 'Black Diamond',
    metaDescription: 'Black Diamond gutter experts - Foothills specialists since 2016',
    intro: 'Nestled in the foothills of the Rocky Mountains, Black Diamond requires gutter systems that can handle heavy snowfall and rapid snowmelt. Our team is experienced in the unique challenges of foothills weather.',
    commitment: 'We offer free gutter assessments and emergency repair services, with special attention to preventing ice damming.',
    serving: 'From downtown Black Diamond to surrounding rural properties, we provide reliable gutter solutions.',
    nearbyCities: ['Turner Valley (5 min)', 'Okotoks (25 min)', 'High River (30 min)'],
    features: {
      majorRoads: ['Hwy 22', 'Hwy 7', 'Hwy 546'],
      distanceFromLacombe: '180 km (2 hours)',
      localLandmarks: ['Black Diamond Hotel', 'Black Diamond Museum', 'Sheep River Park']
    },
    province: 'AB',
    specialNote: 'Specializing in heavy-duty gutter systems for mountain weather conditions.'
  },
  {
    slug: 'okotoks',
    name: 'Okotoks',
    metaDescription: 'Okotoks gutter specialists - Calgary\'s neighbor with small-town charm since 2014',
    intro: 'As one of Alberta\'s fastest-growing communities, Okotoks requires gutter solutions that combine urban functionality with small-town charm. Our team is experienced in both new construction and historic home gutter systems.',
    commitment: 'We offer free estimates and flexible scheduling, with special attention to preventing basement flooding in newer developments.',
    serving: 'From the historic downtown to new subdivisions, we serve all of Okotoks with reliable gutter solutions.',
    nearbyCities: ['High River (15 min)', 'Black Diamond (25 min)', 'Calgary (30 min)'],
    features: {
      majorRoads: ['Hwy 2A', 'Hwy 7', 'Hwy 552'],
      distanceFromLacombe: '200 km (2 hours 15 min)',
      localLandmarks: ['Okotoks Erratic', 'Foothills Centennial Centre', 'Sheep River Park']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems for both historic homes and new construction.'
  },
  {
    slug: 'high-river',
    name: 'High River',
    metaDescription: 'High River gutter experts - Flood-resistant solutions since 2013',
    intro: 'After the devastating 2013 floods, High River understands the importance of proper drainage more than ever. Our team specializes in flood-resistant gutter systems that protect homes during extreme weather events.',
    commitment: 'We offer free flood-prevention assessments and emergency services, with special attention to proper water diversion.',
    serving: 'From the downtown core to surrounding rural properties, we provide comprehensive gutter solutions for High River.',
    nearbyCities: ['Okotoks (15 min)', 'Black Diamond (30 min)', 'Calgary (45 min)'],
    features: {
      majorRoads: ['Hwy 2A', 'Hwy 2', 'Hwy 23'],
      distanceFromLacombe: '190 km (2 hours 10 min)',
      localLandmarks: ['Museum of the Highwood', 'George Lane Park', 'Highwood Golf & Country Club']
    },
    province: 'AB',
    specialNote: 'Specializing in flood-resistant gutter systems and emergency flood response.'
  },
  {
    slug: 'strathmore',
    name: 'Strathmore',
    metaDescription: 'Strathmore gutter specialists - Prairies and agriculture experts since 2015',
    intro: 'In the heart of Alberta\'s prairies, Strathmore experiences wide temperature swings that can challenge gutter systems. Our team understands the specific needs of both town homes and agricultural properties.',
    commitment: 'We offer flexible scheduling for farmers and ranchers, with emergency services available during harvest season.',
    serving: 'From downtown Strathmore to surrounding rural properties, we provide reliable gutter solutions.',
    nearbyCities: ['Chestermere (25 min)', 'Calgary (40 min)', 'Drumheller (1 hour)'],
    features: {
      majorRoads: ['Hwy 1', 'Hwy 24', 'Hwy 817'],
      distanceFromLacombe: '170 km (1 hour 50 min)',
      localLandmarks: ['Strathmore Aquatic Centre', 'Strathmore Station', 'Kinsmen Park']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems for both residential and agricultural properties.'
  },
  {
    slug: 'cochrane',
    name: 'Cochrane',
    metaDescription: 'Cochrane gutter experts - Mountain town solutions since 2016',
    intro: 'With its stunning mountain views and growing population, Cochrane requires gutter systems that combine aesthetic appeal with rugged durability. Our team is experienced in handling the unique challenges of mountain weather.',
    commitment: 'We offer free estimates and flexible scheduling, with emergency services available for storm damage.',
    serving: 'From historic downtown Cochrane to new developments, we provide comprehensive gutter solutions.',
    nearbyCities: ['Calgary (30 min)', 'Airdrie (20 min)', 'Bragg Creek (35 min)'],
    features: {
      majorRoads: ['Hwy 1A', 'Hwy 22', 'Hwy 1'],
      distanceFromLacombe: '160 km (1 hour 40 min)',
      localLandmarks: ['Cochrane Ranche', 'Big Hill Springs Provincial Park', 'Cochrane Ranch House']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems that handle heavy snowfall and mountain weather conditions.'
  },
  {
    slug: 'airdrie',
    name: 'Airdrie',
    metaDescription: 'Airdrie gutter specialists - Calgary\'s northern neighbor since 2014',
    intro: 'As one of Canada\'s fastest-growing cities, Airdrie requires gutter solutions that keep pace with rapid development. Our team is experienced in both new construction and established neighborhood gutter needs.',
    commitment: 'We offer free estimates and flexible scheduling, with special attention to preventing water damage in newer subdivisions.',
    serving: 'From the historic downtown to new communities, we serve all of Airdrie with reliable gutter solutions.',
    nearbyCities: ['Calgary (20 min)', 'Cochrane (30 min)', 'CrossIron Mills (15 min)'],
    features: {
      majorRoads: ['Hwy 2', 'Hwy 566', 'Hwy 567'],
      distanceFromLacombe: '150 km (1 hour 35 min)',
      localLandmarks: ['Nose Creek Park', 'Genesis Place', 'Iron Horse Park']
    },
    province: 'AB',
    specialNote: 'Specializing in gutter systems for new construction and rapidly developing communities.'
  }
];

function getCityData(slug: string) {
  return cityData.find(city => city.slug === slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const city = getCityData(params.slug);
  
  if (!city) {
    return {
      title: 'Page Not Found',
      description: 'The requested city page does not exist.'
    };
  }
  
  return {
    title: `Gutter Installation in ${city.name}, AB | Lacombe Gutters`,
    description: city.metaDescription,
    openGraph: {
      title: `Gutter Installation in ${city.name}, AB`,
      description: city.metaDescription,
      type: 'website',
    }
  };
}

export function generateStaticParams() {
  return cityData.map(city => ({
    slug: city.slug
  }));
}

export default function CityPage({ params }: { params: { slug: string } }) {
  return <CityPageClient slug={params.slug} />;
}
