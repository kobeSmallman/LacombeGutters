import { ServiceLocation } from '@/lib/locations';
import { MapPin, CheckCircle, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getCityImageUrl } from '@/lib/cityImageLoader';

interface Props {
  location: ServiceLocation;
  isPriority: boolean;
}

// Custom content for priority cities
const CUSTOM_CONTENT: Record<string, {
  hero: string;
  description: string;
  localInfo: string;
  services: string[];
  neighborhoods?: string[];
}> = {
  'edmonton': {
    hero: "Edmonton's Trusted Gutter Specialists Since 1980",
    description: "From the North Saskatchewan River Valley to the glass pyramids of the Muttart Conservatory, we know every Edmonton neighbourhood like the back of our hand. Whether you're on Whyte Ave in Old Strathcona or heading downtown along Jasper toward Rogers Place, we've been protecting Edmonton homes since 1980.",
    localInfo: "From the river valley trails to the Ice District towers, Edmonton's diverse landscape creates unique gutter challenges. Century homes in Glenora need heritage-sensitive solutions, while new condos in Oliver require modern systems. We've weathered every Edmonton storm - the 1987 tornado, the 2004 floods, and countless chinooks.",
    services: [
      "Heritage home gutter restoration (Strathcona, Glenora)",
      "Commercial high-rise gutter systems",
      "Ice dam prevention for Edmonton winters",
      "Hail damage assessment and insurance claims",
      "River valley home specialized drainage",
      "24/7 emergency storm response"
    ],
    neighborhoods: ["Downtown Edmonton", "Old Strathcona", "Westmount", "Glenora", "Riverbend", "Summerside"]
  },
  'st-albert': {
    hero: "St. Albert Gutter Installation & Maintenance Experts",
    description: "We follow the Sturgeon River along the Red Willow Trail system into every St. Albert neighbourhood. Find us Saturdays at the St. Albert Farmers' Market or any day from Mission Park to Erin Ridge.",
    localInfo: "St. Albert's tree-lined streets and family-focused community deserve the personal touch. From heritage homes near the grain elevators to new builds in Riverside, we know every crescent and cul-de-sac by heart.",
    services: [
      "Family home gutter installations",
      "Seasonal maintenance programs",
      "Gutter repair and upgrades",
      "Downspout extensions and drainage",
      "Color-matched gutter systems",
      "Professional consultations"
    ]
  },
  'spruce-grove': {
    hero: "Spruce Grove Professional Gutter Services",
    description: "From the forested paths of Heritage Grove to the TransAlta Tri Leisure Centre on Jennifer Heil Way, we know Spruce Grove's routes by heart. New builds, crescents, and family cul-de-sacs - consider them handled.",
    localInfo: "Spruce Grove's mix of mature trees and new developments creates unique drainage challenges. From established areas near the old grain elevator to new neighbourhoods off Highway 16A, we've adapted our systems for every lot.",
    services: [
      "New construction gutter installation",
      "Established home gutter upgrades",
      "Seamless eavestrough systems",
      "Maintenance and cleaning services",
      "Custom gutter solutions",
      "Local professional service"
    ]
  },
  'blackfalds': {
    hero: "Blackfalds Gutter Installation & Repair Specialists",
    description: "Serving Blackfalds with professional gutter services. As your Central Alberta specialists, we understand what Blackfalds homes need to stay protected from the elements.",
    localInfo: "Blackfalds' location in Central Alberta means dealing with diverse weather conditions. Our gutter systems are designed to handle everything from spring runoff to winter freeze-thaw cycles.",
    services: [
      "Complete residential gutter systems",
      "Repair and maintenance services",
      "Eavestrough cleaning and inspection",
      "Downspout installation and repair",
      "Emergency repair services",
      "Free estimates for residents"
    ]
  },
  'red-deer': {
    hero: "Red Deer's Original Gutter Company - 40+ Years Strong",
    description: "From skating at Bower Ponds to hiking the Waskasoo Park trails, from downtown heritage blocks to the slopes of Canyon Ski - Red Deer is our backyard. East side, west side, or anywhere along Gaetz Avenue, we've been Central Alberta's gutter experts since day one.",
    localInfo: "Whether you're in historic Riverside or new Clearview Ridge, we know Red Deer's unique challenges. The Red Deer River valley creates microclimates, chinook winds test every system, and our famous hailstorms keep us busy. We've weathered them all with this city.",
    services: [
      "5\" and 6\" seamless gutter installation",
      "Soffit and fascia repair and replacement", 
      "Downspout installation and extensions",
      "Gutter cleaning and maintenance",
      "Ice dam prevention systems",
      "Emergency gutter repairs"
    ],
    neighborhoods: ["Riverside Meadows", "Kentwood", "Vanier Woods", "Morrisroe", "Highland Green", "Johnstone Crossing"]
  },
  'lacombe': {
    hero: "Lacombe's Local Gutter Experts - Right in Your Backyard",
    description: "From the Guinness-certified 'World's Largest Fishing Lure' at Len Thompson Pond to the heritage downtown blocks along 50th Avenue, Lacombe is our easy catch. Need us lakeside or on the next street over? We're already there.",
    localInfo: "A lifetime in Lacombe means we know every street from Woodland Park to Michener Hill. When the chinooks roll off the Rockies or spring runoff tests the storm drains, we're the neighbors you call. Same-day service? That's just how we do business in our hometown.",
    services: [
      "Residential gutter installation",
      "Commercial eavestrough systems",
      "Gutter guard installation", 
      "Seasonal maintenance programs",
      "Emergency storm damage repairs",
      "Free estimates for Lacombe residents"
    ],
    neighborhoods: ["Downtown Lacombe", "Woodland Park", "Michener Hill", "Valley View", "Lacombe Lake area"]
  },
  'calgary': {
    hero: "Calgary Gutter Services - From the Peace Bridge to the Foothills",
    description: "From the Peace Bridge over the Bow River to a stroll down Stephen Avenue, we cover Calgary's core and beyond. Mission to Mahogany, Beltline to Bowness - when Calgary's famous hailstorms hit, we're ready with quick response.",
    localInfo: "Calgary's chinook winds and sudden hailstorms are legendary - we've seen golf ball-sized hail shred gutters in Kensington and watched chinooks melt snow so fast it overwhelms drainage in Hillhurst. We know this city's weather like locals because we are locals.",
    services: [
      "Hail damage gutter replacement",
      "Wind-resistant gutter systems",
      "Large home and estate gutters",
      "Commercial building gutters",
      "Insurance claim assistance",
      "Emergency repair services"
    ],
    neighborhoods: ["Kensington", "Hillhurst", "Eau Claire", "Mission", "Inglewood", "Bridgeland"]
  },
  'airdrie': {
    hero: "Airdrie Gutter Installation & Maintenance Experts",
    description: "From Nose Creek Park - home of the Festival of Lights - to fast-growing communities off the QEII, we're wired into Airdrie. Bayside to Kings Heights to Sagewood, we're already in your neighbourhood.",
    localInfo: "Airdrie's explosive growth from prairie town to Calgary's northern gateway creates unique challenges. New subdivisions need modern systems, while established areas near the old downtown require different solutions. We know them all.",
    services: [
      "New construction gutter installation",
      "Gutter upgrades for older homes",
      "Seamless eavestrough systems",
      "Maintenance and cleaning",
      "Downspout extensions",
      "Color-matched gutter systems"
    ]
  },
  'leduc': {
    hero: "Leduc Gutter Services - Professional Installation & Repair",
    description: "Service around Telford Lake is a walk on the boardwalk for us. From Wm. F. Lede Park to the Multi-Way trail connections, we're in your backyard - literally.",
    localInfo: "Leduc's lakeside charm and proximity to Edmonton creates the best of both worlds - small-town feel with big-city weather challenges. From heritage homes near the old downtown to new developments around the lake, we've got you covered.",
    services: [
      "Residential gutter installation",
      "Gutter repair and maintenance",
      "Eavestrough cleaning services",
      "Ice dam prevention",
      "Custom gutter solutions",
      "Free estimates"
    ]
  },
  'penhold': {
    hero: "Penhold Gutter Installation & Repair Services",
    description: "Serving the Penhold community with reliable gutter solutions. As your local Central Alberta specialists, we understand what Penhold homes need to stay protected.",
    localInfo: "Penhold's rural setting requires durable gutter systems that can handle everything from spring runoff to winter conditions. We provide solutions built for country living.",
    services: [
      "Rural property gutter systems",
      "Agricultural building gutters",
      "Residential installations",
      "Maintenance and repairs",
      "Custom downspout solutions",
      "Local service guarantee"
    ]
  },
  'stettler': {
    hero: "Stettler Gutter Installation & Maintenance",
    description: "Bringing professional gutter services to Stettler and the surrounding area. With decades of experience in Central Alberta, we provide reliable solutions for your home.",
    localInfo: "Stettler's location in the heart of Alberta means dealing with diverse weather conditions. Our gutter systems are designed to handle it all.",
    services: [
      "Complete gutter installations",
      "Repair and maintenance",
      "Eavestrough cleaning",
      "Downspout services",
      "Emergency repairs",
      "Professional consultations"
    ]
  },
  'camrose': {
    hero: "Camrose Professional Gutter Services",
    description: "Serving Camrose with expert gutter installation, repair, and maintenance. Our team brings Central Alberta expertise to protect your Camrose home.",
    localInfo: "Camrose's established neighborhoods and new developments both benefit from our comprehensive gutter services tailored to local conditions.",
    services: [
      "Gutter installation and repair",
      "Soffit and fascia work",
      "Eavestrough maintenance",
      "Custom color matching",
      "Insurance work",
      "Free estimates"
    ]
  },
  'wetaskiwin': {
    hero: "Wetaskiwin Gutter Installation & Repair",
    description: "From the Reynolds-Alberta Museum's vintage engines to quiet laps around By-the-Lake Park, we keep Wetaskiwin running smoothly. North end, south end, or out by the trail loop - just give us a call.",
    localInfo: "Wetaskiwin's historic character and lakeside setting create unique challenges. From century homes downtown to newer builds near the lake, we've mastered the art of protecting this community's diverse architecture.",
    services: [
      "Heritage home gutter restoration",
      "Modern gutter installations",
      "Maintenance programs",
      "Emergency repairs",
      "Custom solutions",
      "Local service"
    ]
  },
  'olds': {
    hero: "Olds Gutter Installation & Maintenance Services",
    description: "Serving Olds with reliable gutter solutions. Our Central Alberta team provides professional installation and repair services for your home.",
    localInfo: "Olds' community values align with our commitment to quality workmanship and reliable service for every homeowner.",
    services: [
      "Residential gutter systems",
      "Repair and maintenance",
      "Gutter cleaning services",
      "Downspout installation",
      "Custom solutions",
      "Professional service"
    ]
  },
  'ponoka': {
    hero: "Ponoka Gutter Services - Installation & Repair",
    description: "Professional gutter services for Ponoka residents. We provide reliable eavestrough solutions backed by decades of Central Alberta experience.",
    localInfo: "Ponoka's location requires gutter systems that can handle Central Alberta's variable weather. We provide proven solutions.",
    services: [
      "Complete gutter installations",
      "Repair services",
      "Maintenance programs",
      "Emergency repairs",
      "Custom work",
      "Local expertise"
    ]
  },
  'sylvan-lake': {
    hero: "Sylvan Lake Gutter Installation & Repair",
    description: "Serving the Sylvan Lake community with professional gutter services. From lakefront properties to residential areas, we protect your investment.",
    localInfo: "Sylvan Lake's unique lakefront environment requires specialized gutter solutions. Our team understands these specific needs.",
    services: [
      "Lakefront property gutters",
      "Residential installations",
      "Seasonal maintenance",
      "Storm damage repairs",
      "Custom solutions",
      "Local service"
    ]
  },
  'nordegg': {
    hero: "Nordegg Gutter Services - Mountain Community Specialists",
    description: "Bringing professional gutter services to Nordegg and the mountain communities. We understand the unique challenges of mountain weather.",
    localInfo: "Nordegg's mountain location means dealing with heavy snow loads and rapid weather changes. Our systems are built for these conditions.",
    services: [
      "Heavy-duty gutter systems",
      "Snow load resistant installation",
      "Mountain weather solutions",
      "Emergency repairs",
      "Custom mountain gutters",
      "Specialized service"
    ]
  },
  'innisfail': {
    hero: "Innisfail Gutter Installation & Repair Services",
    description: "Professional gutter services for Innisfail homeowners. Our Central Alberta team provides reliable eavestrough solutions for your home.",
    localInfo: "Innisfail's established community deserves reliable gutter services. We provide quality workmanship with local understanding.",
    services: [
      "Residential gutter systems",
      "Commercial installations",
      "Repair and maintenance",
      "Gutter cleaning",
      "Custom solutions",
      "Community service"
    ]
  },
  'beaumont': {
    hero: "Beaumont Gutter Installation & Maintenance Services",
    description: "We serve the hill around historic St. Vital Church and right through Four Seasons Park. Francophone roots, modern pace - count on us for both heritage charm and contemporary needs.",
    localInfo: "Beaumont's unique blend of French-Canadian heritage and modern suburban growth creates interesting architectural challenges. From heritage properties near the old church to new family developments, we respect both the history and the future.",
    services: [
      "Suburban home gutter installation",
      "Family-focused service",
      "Maintenance programs",
      "Repair services",
      "Custom residential solutions",
      "Professional consultations"
    ]
  }
};

export default function ServiceAreaPageContent({ location, isPriority }: Props) {
  const customContent = isPriority ? CUSTOM_CONTENT[location.slug] : null;
  const cityName = location.name;
  


  return (
    <div className="min-h-screen bg-white">
      {/* Mobile: Image Only Hero */}
      <section className="md:hidden relative h-64 overflow-hidden">
        {/* City Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getCityImageUrl(location.slug)}
            alt={`${cityName} Alberta cityscape - Professional gutter installation and repair services`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Light overlay for mobile */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Back Button Only on Mobile */}
        <div className="relative z-10 h-full flex flex-col justify-start">
          <div className="container mx-auto px-4 pt-6">
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link href="/service-areas" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Service Areas
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile: Content Below Image */}
      <section className="md:hidden bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {customContent?.hero || `${cityName} Gutter Services`}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {customContent?.description || `Professional gutter installation and repair services in ${cityName}, Alberta.`}
            </p>
            <div className="flex flex-col gap-4">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/contact">Get Free Estimate</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                <a href="tel:4035989137">(403) 598-9137</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop: Traditional Hero with Overlay */}
      <section className="hidden md:block relative h-96 overflow-hidden">
        {/* City Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getCityImageUrl(location.slug)}
            alt={`${cityName} Alberta cityscape - Professional gutter installation and repair services`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 50vw"
          />
          {/* Faded overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <div className="mb-6">
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Link href="/service-areas" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Service Areas
                </Link>
              </Button>
            </div>
            
            {/* Hero Content */}
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {customContent?.hero || `${cityName} Gutter Services`}
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                {customContent?.description || `Professional gutter installation and repair services in ${cityName}, Alberta.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/contact">Get Free Estimate</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                  <a href="tel:4035989137">(403) 598-9137</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Choose Lacombe Gutters in {cityName}?
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  {customContent?.localInfo || `We proudly serve ${cityName} and understand the unique weather challenges facing homeowners in this area. Our gutter systems are designed specifically for Alberta's climate conditions.`}
                </p>
                {/* Only show generic features for non-custom pages */}
                {!customContent && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">40+ years serving Central Alberta</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Free estimates and consultations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Licensed and insured professionals</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Quality materials and workmanship</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative h-80 w-full">
                <Image
                  src={getCityImageUrl(location.slug)}
                  alt={`Professional gutter installation and repair services in ${cityName}, Alberta - Lacombe Gutters serving Central Alberta with quality eavestrough solutions`}
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Our {cityName} Gutter Services
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {(customContent?.services || [
                "Professional gutter installation",
                "Gutter repair and maintenance", 
                "Eavestrough cleaning services",
                "Soffit and fascia work",
                "Downspout installation",
                "Emergency repair services"
              ]).map((service, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Star className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">{service}</span>
                </div>
              ))}
            </div>
            
            {/* Distance Charge Notice */}
            <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Service Area Information</h3>
                  <p className="text-blue-800">
                    <strong>Within 50km radius:</strong> No distance charges applied to your service.
                  </p>
                  <p className="text-blue-800 mt-1">
                    <strong>Beyond 50km:</strong> Distance charges may apply for travel to your location.
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    Contact us for specific pricing details for your area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section (for priority cities with neighborhoods) */}
      {customContent?.neighborhoods && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Areas We Serve in {cityName}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {customContent.neighborhoods.map((neighborhood, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <MapPin className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                    <span className="text-gray-700">{neighborhood}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}


    </div>
  );
}
