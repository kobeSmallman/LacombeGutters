import { SERVICE_AREA_BOUNDS } from "@/lib/constants";
import Link from "next/link";
import { cityData } from "@/data/cityData";

export const metadata = {
  title: "Service Areas | Lacombe Gutters Ltd",
  description: "Serving communities throughout Central Alberta including Red Deer, Lacombe, Blackfalds, Sylvan Lake and surrounding areas with 40+ years of combined experience."
};

export default function ServiceAreasPage() {
  // Group cities alphabetically
  const groupedCities = cityData.reduce((acc, city) => {
    const firstLetter = city.name.charAt(0);
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(city);
    return acc;
  }, {} as Record<string, typeof cityData>);

  // Sort the keys
  const sortedLetters = Object.keys(groupedCities).sort();
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Service Areas</h1>
      <p className="text-xl mb-10 max-w-3xl">
        We proudly serve communities throughout central Alberta, providing high-quality gutter and eavestrough services with 40+ years of combined experience.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Service Area</h2>
          <p className="mb-6">
            {SERVICE_AREA_BOUNDS.description}
          </p>
          
          <div className="relative bg-neutral-light p-6 rounded-lg mb-8">
            {/* Construction theme elements: screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            <h3 className="font-bold mb-4">Service Area Boundaries</h3>
            <p className="mb-4 text-sm italic">We service anywhere within and around these boundary areas:</p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <span className="font-medium">North:</span> {SERVICE_AREA_BOUNDS.north}
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <span className="font-medium">South:</span> {SERVICE_AREA_BOUNDS.south}
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <span className="font-medium">East:</span> {SERVICE_AREA_BOUNDS.east}
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <span className="font-medium">West:</span> {SERVICE_AREA_BOUNDS.west}
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <span className="font-medium">And many more!</span> <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to see if we service your area.
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4 text-center">Service Map</h3>
          <div className="relative w-full aspect-video mb-4 rounded overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.8803986988144!2d-113.80997392390058!3d52.265711651458474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5374542947119299%3A0x500a9122c7a444f0!2s170%20112%20Queensgate%20Crescent%2C%20Red%20Deer%2C%20AB%20T4P%200R9%2C%20Canada!5e0!3m2!1sen!2sus!4v1683212345678!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lacombe Gutters Service Area Map"
              className="absolute inset-0 w-full h-full rounded-lg"
            ></iframe>
          </div>
          
          <div className="relative bg-neutral-light p-6 rounded-lg mt-8">
            {/* Construction theme elements: screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            <h3 className="font-bold mb-4 text-center">Find Your City</h3>
            <p className="mb-6 text-center text-sm">
              We&apos;ve created dedicated pages for many communities we serve. Find yours below:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sortedLetters.map(letter => (
                <div key={letter} className="mb-4">
                  <h4 className="text-sm font-bold mb-2 text-primary border-b pb-1">{letter}</h4>
                  <ul className="space-y-1 text-sm">
                    {groupedCities[letter].map(city => (
                      <li key={city.slug}>
                        <Link 
                          href={`/${city.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom CTA - Construction themed */}
      <div className="relative bg-neutral-light p-8 rounded-lg border-t-4 border-primary text-center">
        {/* Construction theme elements: screws in corners */}
        <div className="screw-corner screw-top-left"></div>
        <div className="screw-corner screw-top-right"></div>
        <div className="screw-corner screw-bottom-left"></div>
        <div className="screw-corner screw-bottom-right"></div>
        
        <div className="metal-strip left-strip"></div>
        <div className="metal-strip right-strip"></div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for Quality Gutter Services?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Our experienced team is ready to help with all your gutter needs. We provide free estimates and serve the entire Central Alberta region.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
        >
          Request a Free Estimate
        </Link>
      </div>
    </div>
  );
}
