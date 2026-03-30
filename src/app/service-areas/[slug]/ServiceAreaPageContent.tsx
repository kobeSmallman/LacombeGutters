import { ServiceLocation } from '@/lib/locations';
import { MapPin, CheckCircle, Phone, Shield, Clock, Award, ChevronRight } from 'lucide-react';
// Icons used: MapPin (neighborhoods, pricing), CheckCircle (trust + fallback), Phone (CTAs),
// Shield (trust), Clock (trust), Award (trust), ChevronRight (service cards)
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getCityImageUrl } from '@/lib/cityImageLoader';
import Breadcrumbs from '@/components/Breadcrumbs';
import CityFAQSection from '@/components/CityFAQSection';
import AnimateOnScroll from '@/components/ui/animate-on-scroll';

interface Props {
  location: ServiceLocation;
  isPriority: boolean;
}

// Service links mapping to actual service pages
const SERVICE_PAGES: Record<string, { slug: string; name: string; excerpt: string }> = {
  '5-inch': { slug: '5-inch-gutters', name: '5" Gutters', excerpt: 'Standard residential gutters for most homes, available in aluminum and steel with 30+ colour options.' },
  '6-inch': { slug: '6-inch-gutters', name: '6" Gutters', excerpt: 'Larger capacity gutters handling 40% more water — ideal for steep roofs, large roof areas, or heavy rainfall.' },
  'soffit-fascia': { slug: 'soffit-fascia', name: 'Soffit & Fascia', excerpt: 'Protection, ventilation, and finishing for your roofline. Repair or full replacement with colour-matched materials.' },
  'gutter-cleaning': { slug: 'gutter-cleaning', name: 'Gutter Cleaning', excerpt: 'Complete debris removal, downspout flushing, and inspection to keep your gutters flowing freely.' },
  'downspouts': { slug: 'downspouts', name: 'Downspouts', excerpt: 'Strategic placement and installation to direct water safely away from your foundation.' },
  'industrial': { slug: 'industrial-eavestrough', name: 'Industrial Eavestrough', excerpt: 'Heavy-duty solutions for commercial buildings, warehouses, and large-scale properties.' },
};

// Custom content for priority cities — each with a distinct core angle
const CUSTOM_CONTENT: Record<string, {
  hero: string;
  subtitle: string;
  description: string;
  problemsTitle: string;
  problems: string[];
  services: string[];
  neighborhoods: string[];
  faqs: { question: string; answer: string }[];
}> = {
  'red-deer': {
    hero: "Red Deer Eavestrough & Gutter Services",
    subtitle: "Installation, Cleaning & Repair — Central Alberta's Full-Service Gutter Headquarters",
    description: "As our home base, Red Deer gets the fastest response times and the broadest service range we offer. Every service we provide — from seamless 5\" and 6\" installations to emergency storm repairs — is available here with priority scheduling.",
    problemsTitle: "What Red Deer Homeowners Deal With",
    problems: [
      "Chinook winds create rapid freeze-thaw cycles that crack seals and loosen hangers — gutters that were fine yesterday can be leaking tomorrow.",
      "Red Deer sits in Alberta's hail corridor. Severe hailstorms dent aluminum gutters and crack fascia boards, often requiring full section replacement.",
      "The Red Deer River valley creates localized microclimates — homes near the river face heavier frost and moisture buildup than those on higher ground.",
      "Spring snowmelt off complex roof lines overwhelms undersized 5\" systems, causing overflow and foundation erosion if downspouts aren't routed correctly."
    ],
    services: ['5-inch', '6-inch', 'gutter-cleaning', 'soffit-fascia', 'downspouts', 'industrial'],
    neighborhoods: ["Riverside Meadows", "Kentwood", "Vanier Woods", "Morrisroe", "Highland Green", "Johnstone Crossing", "Anders", "Clearview Ridge", "Eastview Estates", "Deer Park"],
    faqs: [
      { question: "How do you prevent ice dams on Red Deer homes?", answer: "Proper attic insulation, clean gutters, and — where needed — mechanical snow guards or heat-trace systems. Red Deer's chinook cycles make clean gutters especially important since meltwater refreezes fast." },
      { question: "How soon can you install after I approve the quote?", answer: "Lead time is usually 1–3 weeks depending on season and workload. As our home base, Red Deer jobs often get priority scheduling." },
      { question: "Will hail dent my aluminum gutters?", answer: "Small hail usually isn't a problem. Severe hail can dent aluminum; 26-gauge steel resists dents but may chip paint. We can coordinate quotes for insurance claims." },
      { question: "How often should gutters be cleaned in Red Deer?", answer: "At least once a year in late fall. Homes near the river valley or under heavy tree cover benefit from a spring clean as well." },
      { question: "What warranty do you offer?", answer: "Five-year workmanship warranty on labour, 25-year manufacturer finish warranties on materials, and lifetime clog-free warranty on Alu-Rex gutter guard products — provided gutters are maintained with regular cleanings." },
      { question: "Is the estimate really free?", answer: "Yes — no trip fees, no design charges, and no obligation. Call 403-598-9137 or click any Free Estimate button." },
    ],
  },
  'edmonton': {
    hero: "Edmonton Eavestrough Installation, Cleaning & Repair",
    subtitle: "Specialized Systems for Heritage Homes and Extreme Winter Conditions",
    description: "Edmonton's century-old neighbourhoods and extreme winter cold demand gutter systems that most companies aren't equipped to handle. From heritage-sensitive installations in Glenora to multi-storey solutions in new developments, we bring the specialized expertise Edmonton homes require.",
    problemsTitle: "Edmonton's Unique Gutter Challenges",
    problems: [
      "Winters regularly hit -30°C and below. Standard sealants fail at these temperatures — we use tripolymer sealant rated for Alberta's full temperature range and pause installs below -20°C to ensure proper curing.",
      "Heritage homes in Strathcona, Glenora, and Westmount have non-standard rooflines, decorative fascia, and century-old framing that requires careful assessment before any gutter work.",
      "Heavy snowfall accumulation on multi-storey homes creates enormous ice dam pressure. Undersized gutters and poor attic insulation turn this into a recurring damage cycle.",
      "Edmonton's urban tree canopy — especially in mature neighbourhoods — drops massive amounts of leaf and seed debris every fall, clogging gutters within weeks of cleaning."
    ],
    services: ['5-inch', '6-inch', 'soffit-fascia', 'gutter-cleaning', 'downspouts', 'industrial'],
    neighborhoods: ["Downtown Edmonton", "Old Strathcona", "Westmount", "Glenora", "Riverbend", "Summerside", "Windermere", "Terwillegar", "Mill Woods", "Sherwood Park area"],
    faqs: [
      { question: "Can you work on heritage homes with non-standard rooflines?", answer: "Yes. We assess fascia condition, framing dimensions, and existing trim before recommending a system. Heritage homes often need custom bracket placement to avoid damaging decorative elements." },
      { question: "Do you install gutters in Edmonton's winter?", answer: "We work year-round, but pause when daytime highs drop below -20°C because sealant won't cure properly. We'll schedule around cold snaps." },
      { question: "What's the biggest gutter threat in Edmonton?", answer: "Freeze-thaw cycles turning minor clogs into ice dams that back up under shingles. Keeping gutters clean before winter is the single best prevention." },
      { question: "What gauge aluminum do you use?", answer: "We use 0.027\" aluminum — thicker than most big-box stock — for extra durability. For Edmonton's harsh winters, this thickness holds up significantly better." },
      { question: "Can gutters be installed on multi-storey homes?", answer: "Yes. Multi-storey homes are a large part of our Edmonton work. These jobs may take 2+ days depending on height and roof complexity." },
    ],
  },
  'calgary': {
    hero: "Calgary Gutter Services — Hail Damage Repair & Installation",
    subtitle: "Alberta's Hail Capital Needs Gutters Built to Take a Hit",
    description: "Calgary sees more severe hailstorms than almost anywhere in Canada. When golf-ball-sized hail shreds your gutters and cracks your fascia, you need a crew that knows the insurance process and can get your home protected again fast. We handle the repair and coordinate with your adjuster.",
    problemsTitle: "Why Calgary Is the Hardest City on Gutters",
    problems: [
      "Calgary is Canada's hail capital. Severe storms regularly produce hail large enough to dent steel, destroy aluminum gutters, and crack fascia boards in minutes.",
      "Chinook winds can swing temperatures 20-30°C in hours. This rapid expansion and contraction loosens hangers, breaks seals, and warps poorly installed systems.",
      "High-end inner-city homes in Kensington, Mission, and Hillhurst have complex multi-level rooflines that require precise downspout routing to avoid foundation damage.",
      "Rapid snowmelt during chinook events overwhelms drainage — water volume that would normally spread over weeks hits your gutters in days."
    ],
    services: ['5-inch', '6-inch', 'soffit-fascia', 'downspouts', 'gutter-cleaning', 'industrial'],
    neighborhoods: ["Kensington", "Hillhurst", "Eau Claire", "Mission", "Inglewood", "Bridgeland", "Bowness", "Tuscany", "Panorama Hills", "Varsity"],
    faqs: [
      { question: "Is hail damage covered under warranty?", answer: "Impact from hail is treated as an insurance event, not a workmanship issue. We can coordinate quotes and documentation for your insurance claim." },
      { question: "What material resists hail best?", answer: "26-gauge steel is stronger and resists dents better than aluminum. We'll recommend the best option for your roof and budget based on Calgary's hail risk." },
      { question: "How fast can you respond after a hailstorm?", answer: "We prioritize emergency repairs after major storms. Response time depends on demand, but we'll get to you as soon as possible — call 403-598-9137." },
      { question: "Do you help with insurance claims?", answer: "We provide detailed quotes and damage documentation that your adjuster needs. We've worked with all major Alberta insurers." },
      { question: "What gutter guards hold up best against hail?", answer: "Alu-Rex T-Rex and DoublePro continuous hanger systems support up to 425 lb per linear foot. The aluminum construction handles hail impact well." },
    ],
  },
  'airdrie': {
    hero: "Airdrie Gutter Installation — New Builds & Home Upgrades",
    subtitle: "Modern Gutter Systems for One of Canada's Fastest-Growing Cities",
    description: "Airdrie's rapid growth means new subdivisions going up constantly — and every one of them needs gutters. Whether you're a builder coordinating installs on a new development or a homeowner upgrading an older system in an established area, we handle both ends of the spectrum.",
    problemsTitle: "What Airdrie's Growth Means for Your Gutters",
    problems: [
      "New subdivisions often have minimal landscaping and grading that hasn't fully settled. Poor drainage routing at this stage means water pools against foundations — getting downspout placement right from day one matters.",
      "Established areas like Williamstown and Airdrie Meadows have aging gutters from the original builds. Many are undersized 4\" systems that don't meet current capacity needs.",
      "Airdrie's position on the open prairie north of Calgary means full exposure to wind-driven rain and hail with no shelter from surrounding terrain.",
      "Builder-grade gutter installations on newer homes often use minimal fastening. We see a lot of homes 5-10 years old where hangers have pulled loose because they were spaced too far apart."
    ],
    services: ['5-inch', '6-inch', 'downspouts', 'soffit-fascia', 'gutter-cleaning', 'industrial'],
    neighborhoods: ["Bayside", "Kings Heights", "Sagewood", "Coopers Crossing", "Reunion", "Chinook Gate", "Ravenswood", "Williamstown", "Sierra Springs", "Airdrie Meadows"],
    faqs: [
      { question: "Do you work with builders on new construction?", answer: "Yes — we work with local builders and can integrate into your construction schedule. We coordinate timing so gutters go on after siding and before final grading." },
      { question: "What colours are available for new builds?", answer: "More than 30 baked-enamel colours in both aluminum and matching steel. We bring physical swatches to every estimate so you can match your home's exterior exactly." },
      { question: "Should I upgrade my builder-grade gutters?", answer: "If your hangers are pulling loose, your gutters overflow in moderate rain, or you have 4\" gutters on a home with a large roof area — yes. We'll assess and quote it for free." },
      { question: "What's the difference between 5\" and 6\" gutters?", answer: "Six-inch gutters handle roughly 40% more water — ideal for large, steep, or complex roofs. Five-inch suits most standard pitches." },
      { question: "Do I need to be home during installation?", answer: "Not necessarily — just ensure exterior access and power are available. We'll text progress photos if you're away." },
    ],
  },
  'leduc': {
    hero: "Leduc Gutter Services — Foundation Protection & Drainage",
    subtitle: "Proper Downspout Routing and Drainage Solutions for Leduc Properties",
    description: "Leduc's flat terrain and clay-heavy soil mean water doesn't move away from your foundation on its own. If your gutters dump water too close to the house, you're looking at basement moisture, foundation cracks, and soil erosion. We design gutter systems with drainage routing as the priority.",
    problemsTitle: "Why Drainage Matters More in Leduc",
    problems: [
      "Flat lots with clay soil don't drain naturally. Water from improperly routed downspouts sits against foundations for days, creating hydrostatic pressure and basement moisture problems.",
      "Homes near Telford Lake and low-lying areas face elevated groundwater during spring melt. Combined with gutter overflow, this doubles the moisture load on foundations.",
      "Established homes near downtown Leduc often have aging gutter systems with downspouts that terminate right at the foundation wall — the minimum 5-foot extension rule wasn't standard when they were built.",
      "Freeze-thaw cycles are especially damaging in Leduc because standing water around foundations expands and contracts against concrete, accelerating crack formation."
    ],
    services: ['downspouts', '5-inch', '6-inch', 'gutter-cleaning', 'soffit-fascia', 'industrial'],
    neighborhoods: ["Bridgeport", "Meadowview", "Corinthia", "Suntree", "South Creek", "Linsford Park", "Telford Lake area", "West Haven", "Robinson", "Stone Creek"],
    faqs: [
      { question: "How far should water be directed from my foundation?", answer: "At least 5 feet. We can install elbow extensions or hinged flip-ups to achieve that. For severe drainage situations, we can connect to underground weeping tile." },
      { question: "Can downspouts be tied into underground drains?", answer: "Yes — we can connect to existing weeping tile or add extensions. This is especially useful on flat Leduc lots where surface drainage is poor." },
      { question: "What size downspout do I need?", answer: "Standard profiles are 2 5/8\", 3\" × 3\", and 3\" × 4\". For Leduc's flat lots where drainage is critical, we often recommend 3\" × 4\" for maximum flow capacity." },
      { question: "Can clogged gutters damage my foundation?", answer: "Yes — overflow erodes soil at the foundation, and standing water creates hydrostatic pressure that leads to cracks and basement moisture. This is especially common on Leduc's clay soil." },
      { question: "Do you offer seasonal maintenance programs?", answer: "We offer gutter cleaning services and can set up recurring visits. One late-fall clean is the minimum; homes with heavy tree cover benefit from a second in spring." },
    ],
  },
  'lacombe': {
    hero: "Lacombe Eavestrough & Gutter Services — Your Local Experts",
    subtitle: "Same-Day Availability, Hometown Reputation, Personal Service",
    description: "We're based right here in Lacombe. That means faster response times, same-day availability when schedules allow, and a reputation we've built by doing right by our neighbours. When you hire us, you're hiring the crew down the street — not a company that's driving in from two hours away.",
    problemsTitle: "Lacombe Weather and Your Gutters",
    problems: [
      "Chinook winds rolling off the Rockies create dramatic temperature swings that stress gutter seals and hangers. Systems installed with proper tripolymer sealant and tight hanger spacing handle this; cheap installations don't.",
      "Spring runoff hits hard in Lacombe — snowmelt from large lots and agricultural surroundings pushes water volume that overwhelms standard residential gutters.",
      "Lacombe's mix of heritage downtown buildings and newer residential developments means two very different gutter requirements. Century-old fascia needs assessment before mounting; new builds need proper spec from the start.",
      "Cottonwood and poplar debris clogs gutters faster than most homeowners expect. Without gutter guards or regular cleaning, one heavy fall can block an entire system."
    ],
    services: ['5-inch', '6-inch', 'gutter-cleaning', 'soffit-fascia', 'downspouts', 'industrial'],
    neighborhoods: ["Downtown Lacombe", "Woodland Park", "Michener Hill", "Valley View", "Lacombe Lake area", "Elizabeth", "Wolf Creek", "Terrace Heights", "Kentwood Park"],
    faqs: [
      { question: "Can I get same-day service in Lacombe?", answer: "When schedules allow, yes — we're based right here. For emergencies, call 403-598-9137 and we'll do our best to accommodate you the same day." },
      { question: "Do you offer free estimates?", answer: "Absolutely. Call 403-598-9137 or click any Free Estimate button and we'll schedule a no-obligation visit — typically within two business days." },
      { question: "What services do you provide?", answer: "We install 5\" and 6\" continuous aluminum or steel eavestrough, downspouts, soffit and fascia, gutter guards, snow-stop accessories, and we offer seasonal gutter cleaning." },
      { question: "Do you subcontract the work?", answer: "No. All projects are completed by our in-house crew so workmanship and warranty stay consistent." },
      { question: "What warranty do you offer?", answer: "Five-year workmanship warranty on labour, 25-year manufacturer finish warranties on materials, and lifetime clog-free warranty on Alu-Rex gutter guard products." },
    ],
  },
  'sylvan-lake': {
    hero: "Sylvan Lake Gutter Services — Lakefront & Residential",
    subtitle: "Gutter Solutions Built for Lakeside Moisture and Seasonal Demand",
    description: "Lakefront properties deal with conditions that inland homes don't — constant moisture exposure, wind-driven rain off the water, and seasonal freeze-thaw cycles amplified by proximity to the lake. We build gutter systems that account for these conditions, not just standard residential installs dropped onto a lakefront lot.",
    problemsTitle: "What Lakeside Living Does to Your Gutters",
    problems: [
      "Proximity to Sylvan Lake means higher ambient moisture year-round. Fascia boards and soffit deteriorate faster when humidity stays elevated — catching rot early prevents expensive structural repair.",
      "Wind off the lake drives rain sideways. Standard gutter profiles can miss wind-driven water entirely. Proper overhang assessment and gutter sizing prevents this.",
      "Many Sylvan Lake properties started as seasonal cottages and were converted to year-round homes. Original gutter systems — if they exist — were never spec'd for 12-month use.",
      "Summer tourist season means every contractor in the area is booked solid. Booking gutter work in spring or early fall avoids the seasonal crunch and gets you faster service."
    ],
    services: ['5-inch', '6-inch', 'soffit-fascia', 'gutter-cleaning', 'downspouts', 'industrial'],
    neighborhoods: ["Lakefront area", "Lakeshore Drive", "Downtown Sylvan Lake", "Hewlett Park", "Memorial Park area", "Birchwood", "Jarvis Bay area", "Lighthouse Point"],
    faqs: [
      { question: "Do lakefront properties need different gutter systems?", answer: "Not a different product, but different sizing and placement. Wind-driven rain and higher moisture mean we pay extra attention to overhang coverage and fascia condition." },
      { question: "When is the best time to book gutter work in Sylvan Lake?", answer: "Spring and fall offer mild temperatures for optimal sealant curing, and you avoid the summer contractor rush. We install year-round when weather permits." },
      { question: "Can you repair rotted fascia before installing gutters?", answer: "Yes — if fascia board replacement is needed, we handle it. We won't mount gutters on compromised wood." },
      { question: "Will gutter guards help with lakefront debris?", answer: "Yes. Alu-Rex gutter guards prevent leaves and debris from entering the trough while still allowing water flow. They greatly reduce maintenance frequency — especially useful for seasonal properties." },
      { question: "What if my fascia is rotted from moisture damage?", answer: "We inspect fascia condition before every install. If rot is present, we replace the affected sections first. We won't mount gutters on compromised wood." },
    ],
  },
  'camrose': {
    hero: "Camrose Gutter Installation, Cleaning & Repair",
    subtitle: "Upgrading Aging Systems and Maintaining Established Homes",
    description: "Camrose is an established community with a housing stock that ranges from heritage homes downtown to newer builds on the edges. Many older properties are running original gutter systems that are past their service life — sagging, leaking, or undersized for today's rainfall patterns. We assess what you have and recommend whether repair or replacement makes more sense.",
    problemsTitle: "Common Gutter Issues in Camrose",
    problems: [
      "Established neighbourhoods have 20-30 year old gutter systems that were never designed for current weather patterns. Increased rainfall intensity means these systems overflow during heavy storms.",
      "University-area rental properties often have deferred maintenance. Years of skipped gutter cleanings lead to packed debris, sagging troughs, and fascia rot that tenants don't report until it's visible from the ground.",
      "Camrose's eastern Alberta location means harsher winter conditions than communities closer to the Rockies — more sustained cold, less chinook relief, and heavier spring melt volumes.",
      "Many older Camrose homes have mismatched gutter sections from piecemeal repairs over the decades. A complete system replacement often costs less than ongoing patch repairs and performs dramatically better."
    ],
    services: ['5-inch', '6-inch', 'gutter-cleaning', 'soffit-fascia', 'downspouts', 'industrial'],
    neighborhoods: ["Downtown Camrose", "Duggan", "Mirror Lake area", "Valleyview", "South Camrose", "East Parkland", "Mountview", "Camrose County"],
    faqs: [
      { question: "How do I know if my gutters need replacing vs. repair?", answer: "If gutters are sagging, have multiple leaking seams, or are pulling away from the fascia, replacement is usually more cost-effective than ongoing repairs. We'll assess and give you an honest recommendation." },
      { question: "Do you remove old gutters?", answer: "Yes — old eavestrough is detached, hauled away, and recycled when possible. Removal, disposal, and site clean-up are included." },
      { question: "Can you colour-match my soffit and fascia?", answer: "Yes — our supplier carries matching coil stock for a cohesive exterior look. We bring physical swatches to every estimate." },
      { question: "Is it worth replacing gutters on an older home or just repairing?", answer: "If you're patching the same system repeatedly, full replacement is usually cheaper long-term and performs far better. We'll give you an honest comparison of both options." },
      { question: "Do you match competitor quotes?", answer: "Show us a recent written quote with comparable specs and we'll do our best to match or beat it." },
    ],
  },
  'wetaskiwin': {
    hero: "Wetaskiwin Eavestrough & Gutter Services",
    subtitle: "Reliable Gutter Solutions for Wetaskiwin Homes and Businesses",
    description: "Wetaskiwin's established neighbourhoods and surrounding rural properties need gutter systems that handle Central Alberta's weather extremes. From heritage homes along the downtown corridor to newer builds on the city's edges, we deliver proper drainage solutions that protect your investment.",
    problemsTitle: "What Wetaskiwin Homeowners Deal With",
    problems: [
      "Wetaskiwin sits in a transition zone between Edmonton's urban sprawl and open farmland — wind exposure is significant, and wind-driven rain can bypass poorly sized gutters entirely.",
      "Many homes in established areas like Willowbrook and the downtown core have original gutter systems well past their service life — sagging, leaking at seams, and pulling away from deteriorating fascia.",
      "Heavy spring snowmelt from surrounding agricultural land increases moisture levels around foundations. Without proper downspout routing, water pools against basement walls and causes long-term damage.",
      "Cottonwood and poplar are common throughout Wetaskiwin — the seed and leaf debris clogs gutters fast, especially in fall. Without gutter guards or regular cleaning, blockages lead to overflow and fascia rot."
    ],
    services: ['5-inch', '6-inch', 'gutter-cleaning', 'soffit-fascia', 'downspouts', 'industrial'],
    neighborhoods: ["Downtown Wetaskiwin", "Willowbrook", "West Wetaskiwin", "Powers area", "Parkdale", "Heritage Estates", "South Wetaskiwin", "Wetaskiwin County"],
    faqs: [
      { question: "How far is Wetaskiwin from your shop?", answer: "Wetaskiwin is within our standard service range — no distance surcharges. We serve Wetaskiwin regularly and can typically schedule estimates within a few business days." },
      { question: "Do you work on older homes in Wetaskiwin?", answer: "Yes. We inspect fascia condition before every install. If rot or damage is present, we replace the affected sections before mounting new gutters." },
      { question: "What's the best time of year to replace gutters?", answer: "Spring through fall offers the best conditions for sealant curing. We install year-round when weather permits, but avoid days below -20°C." },
      { question: "Can you add gutter guards to my existing system?", answer: "In most cases, yes — Alu-Rex gutter guards can be retrofitted to existing 5\" and 6\" eavestrough. We'll assess compatibility during your free estimate." },
      { question: "Do you offer free estimates in Wetaskiwin?", answer: "Absolutely. No trip fees, no obligation. Call 403-598-9137 or use any Free Estimate button on our site." },
    ],
  },
};

export default function ServiceAreaPageContent({ location, isPriority }: Props) {
  const customContent = isPriority ? CUSTOM_CONTENT[location.slug] : null;
  const cityName = location.name;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Breadcrumbs */}
      <div className="container mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Service Areas', href: '/service-areas' },
            { label: cityName },
          ]}
        />
      </div>

      {/* === SECTION 1: Hero + Trust Bar === */}
      <section className="relative py-12 sm:py-16 md:py-28 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={getCityImageUrl(location.slug)}
            alt={`${cityName} Alberta — Professional gutter installation and repair services`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <AnimateOnScroll type="slideLeft" duration={1.5} delay={0.2}>
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-4 sm:mb-6 leading-tight">
                {customContent?.hero || `${cityName} Gutter Services`}
              </h1>
              {customContent?.subtitle && (
                <p className="text-base sm:text-xl md:text-2xl text-secondary font-semibold mb-6 sm:mb-8">
                  {customContent.subtitle}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
                <Link href="/contact" className="group">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105">
                    GET A FREE ESTIMATE
                  </Button>
                </Link>
                <a href="tel:4035989137" className="group">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 font-semibold transition-all duration-300 transform hover:scale-105">
                    <Phone className="h-4 w-4 mr-2" />
                    Call or Text
                  </Button>
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Trust indicators — integrated into hero */}
          <AnimateOnScroll type="fadeIn" delay={0.6}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {[
                { icon: Award, value: '40+', label: 'Years Combined Experience' },
                { icon: Shield, value: '✓', label: 'Fully Insured & WCB' },
                { icon: CheckCircle, value: '5yr', label: 'Workmanship Warranty' },
                { icon: Clock, value: 'Free', label: 'Estimates' },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 text-center transition-all duration-300 hover:bg-white/20 hover:border-secondary/50">
                  <div className="text-xl sm:text-2xl font-bold text-secondary mb-1 font-heading">{item.value}</div>
                  <div className="text-[10px] sm:text-xs font-medium text-gray-200 uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* === SECTION 3: Services Grid === */}
      <section className="relative pt-10 pb-20 overflow-hidden bg-white bg-[url('/images/textures/paper-fiber.png')] bg-white/95">
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll type="fadeIn" className="text-center mb-14">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="h-1 w-12 bg-secondary mr-3" />
              <span className="text-sm font-semibold tracking-wider text-primary uppercase">Our Services</span>
              <span className="h-1 w-12 bg-secondary ml-3" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-primary">
              Our {cityName} Gutter Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every service backed by our 5-year workmanship warranty and 25-year manufacturer material warranties.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(customContent?.services || ['5-inch', '6-inch', 'soffit-fascia', 'gutter-cleaning', 'downspouts', 'industrial']).map((serviceKey, index) => {
              const service = SERVICE_PAGES[serviceKey];
              if (!service) return null;
              return (
                <AnimateOnScroll key={serviceKey} type="zoomIn" delay={0.15 + index * 0.1} className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-700" />
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <div className="bg-blue-600/10 p-2 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 leading-relaxed flex-1">{service.excerpt}</p>
                      <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        Learn more
                        <svg className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* === SECTION 4: How It Works === */}
      <section className="relative py-20 bg-neutral-light">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
        <div className="container mx-auto px-4">
          <AnimateOnScroll type="fadeIn" className="text-center mb-14">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="h-1 w-12 bg-secondary mr-3" />
              <span className="text-sm font-semibold tracking-wider text-primary uppercase">The Process</span>
              <span className="h-1 w-12 bg-secondary ml-3" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary">
              How It Works
            </h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Contact Us', desc: "Call, text, or fill out our form. We'll get back to you within two business days to set up your free estimate." },
              { step: '2', title: 'Quote', desc: "We assess your property — often by photos you send us, or on-site if needed — and provide a clear quote." },
              { step: '3', title: 'Installation & Cleanup', desc: "Our in-house crew completes the work — typically in one day. We clean the site and haul away all debris." },
            ].map((item, index) => (
              <AnimateOnScroll key={index} type="zoomIn" delay={0.15 + index * 0.15}>
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 text-center h-full">
                  <div className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full w-12 mx-auto mb-6" />
                  <div className="w-14 h-14 bg-secondary text-primary rounded-full flex items-center justify-center text-2xl font-bold font-heading mx-auto mb-5">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 5: City-Specific Problems === */}
      {customContent?.problems && (
        <section className="relative py-20 overflow-hidden bg-white bg-[url('/images/textures/paper-fiber.png')] bg-white/95">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-neutral-light to-transparent z-[1]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <AnimateOnScroll type="slideLeft" duration={1}>
                  <div>
                    <div className="inline-flex items-center justify-center mb-4">
                      <span className="h-1 w-12 bg-secondary mr-3" />
                      <span className="text-sm font-semibold tracking-wider text-primary uppercase">Local Knowledge</span>
                      <span className="h-1 w-12 bg-secondary ml-3" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-primary">
                      {customContent.problemsTitle}
                    </h2>
                    <div className="space-y-5">
                      {customContent.problems.map((problem, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{problem}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll type="fadeIn" delay={0.3}>
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={getCityImageUrl(location.slug)}
                      alt={`Professional gutter services in ${cityName}, Alberta`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === SECTION 6: Pricing Transparency === */}
      <section className="relative py-20 bg-neutral-light">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimateOnScroll type="fadeIn" className="text-center mb-14">
              <div className="inline-flex items-center justify-center mb-4">
                <span className="h-1 w-12 bg-secondary mr-3" />
                <span className="text-sm font-semibold tracking-wider text-primary uppercase">Transparent Pricing</span>
                <span className="h-1 w-12 bg-secondary ml-3" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-primary">
                What Affects Your Price
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Every property is different. Here&apos;s what we assess during your free estimate.
              </p>
            </AnimateOnScroll>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Linear Footage', desc: 'Total length of gutter needed around your roofline.' },
                { title: 'Number of Storeys', desc: 'Height affects access requirements and installation time.' },
                { title: 'Material Choice', desc: "Aluminum is budget-friendly; 26-gauge steel handles hail better." },
                { title: 'Gutter Size', desc: '5" for standard roofs, 6" for steep or large roof areas.' },
                { title: 'Downspout Routing', desc: 'Number of downspouts and how far water needs to be directed.' },
                { title: 'Gutter Guards', desc: 'Optional Alu-Rex systems add upfront cost but reduce long-term maintenance.' },
              ].map((factor, index) => (
                <AnimateOnScroll key={index} type="zoomIn" delay={0.1 + index * 0.08}>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="h-1.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-4 w-12" />
                    <h3 className="font-bold font-heading text-gray-900 mb-2">{factor.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{factor.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
            <AnimateOnScroll type="fadeIn" delay={0.4}>
              <div className="mt-10 bg-white rounded-xl shadow-lg p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/10 p-2.5 rounded-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Service Area Travel</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Within 50 km of our shop: no distance charges. Beyond 50 km: a modest per-kilometre fee shown on your quote.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* === SECTION 7: FAQ Section === */}
      {customContent?.faqs && (
        <CityFAQSection faqs={customContent.faqs} cityName={cityName} />
      )}

      {/* === SECTION 8: Neighborhoods === */}
      {customContent?.neighborhoods && (
        <section className="relative py-20 overflow-hidden bg-neutral-light">
          <div className="container mx-auto px-4 relative z-10">
            <AnimateOnScroll type="fadeIn" className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <span className="h-1 w-12 bg-secondary mr-3" />
                <span className="text-sm font-semibold tracking-wider text-primary uppercase">Coverage</span>
                <span className="h-1 w-12 bg-secondary ml-3" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-10 text-primary">
                Areas We Serve in {cityName}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {customContent.neighborhoods.map((neighborhood, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <MapPin className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                    <span className="text-gray-800 text-sm font-medium">{neighborhood}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-6">
                And surrounding areas within our service region. Not sure if we cover your neighbourhood? Give us a call.
              </p>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* === SECTION 9: Final CTA === */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 to-blue-900 text-white flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll type="fadeIn" delay={0.2} className="text-center">
            <div className="relative max-w-4xl mx-auto bg-white/20 backdrop-blur-sm rounded-xl border-2 border-white/30 shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-primary opacity-80" />
              <div className="relative z-10 p-8 lg:p-12">
                <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6 leading-tight">
                  Ready to Protect Your {cityName} Home?
                </h2>
                <p className="text-xl md:text-2xl text-gray-100 mb-6 max-w-3xl mx-auto leading-relaxed">
                  Get a free, no-obligation estimate. Call, text, or fill out our form — we&apos;ll get back to you within two business days.
                </p>
                <p className="text-lg text-white font-medium mb-8">
                  Free estimates &amp; guaranteed workmanship
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-4">
                  <Link href="/contact" className="group w-full sm:w-auto text-center">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      GET YOUR FREE ESTIMATE
                    </Button>
                  </Link>
                  <a href="tel:4035989137" className="group w-full sm:w-auto">
                    <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                      <Phone className="w-5 h-5 mr-2" />
                      Call or Text
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Non-priority fallback (for pages without custom content) */}
      {!customContent && (
        <section className="relative py-20 overflow-hidden bg-white bg-[url('/images/textures/paper-fiber.png')] bg-white/95">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <AnimateOnScroll type="fadeIn" className="text-center mb-12">
                <h2 className="text-4xl font-bold font-heading text-primary">
                  Why Choose Lacombe Gutters in {cityName}?
                </h2>
              </AnimateOnScroll>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  {['40+ years serving Central Alberta', 'Free estimates and consultations', 'Licensed and insured professionals', 'Quality materials and workmanship'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={getCityImageUrl(location.slug)}
                    alt={`Professional gutter services in ${cityName}, Alberta`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
