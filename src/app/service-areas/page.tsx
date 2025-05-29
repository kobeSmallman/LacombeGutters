import { SERVICE_AREA_BOUNDS } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "Service Areas | Lacombe Gutters Ltd",
  description: "Serving communities throughout Central Alberta including Red Deer, Lacombe, Blackfalds, Sylvan Lake and surrounding areas."
};

export default function ServiceAreasPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Service Areas</h1>
      <p className="text-xl mb-10 max-w-3xl">
        We proudly serve communities throughout central Alberta, providing high-quality gutter and eavestrough services.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Service Area</h2>
          <p className="mb-6">
            {SERVICE_AREA_BOUNDS.description}
          </p>
          
          <div className="bg-neutral-light p-6 rounded-lg mb-8">
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
                  <span className="font-bold">North:</span> {SERVICE_AREA_BOUNDS.north}
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
                  <span className="font-bold">South:</span> {SERVICE_AREA_BOUNDS.south}
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
                  <span className="font-bold">East:</span> {SERVICE_AREA_BOUNDS.east}
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
                  <span className="font-bold">West:</span> {SERVICE_AREA_BOUNDS.west}
                </div>
              </li>
            </ul>
          </div>
          
          <p className="mb-8">
            We also serve many communities in between, so if you&apos;re in central Alberta, chances are we can help! 
            <Link href="/contact" className="text-primary hover:underline ml-1 font-semibold">
              Contact us to confirm service at your location.
            </Link>
          </p>
          
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="font-bold mb-4">Why Travel Matters</h3>
            <p>
              By covering such a wide service area, we can provide reliable gutter and eavestrough services to more communities while maintaining consistent quality and competitive pricing. Our experienced team is familiar with the unique needs of properties throughout central Alberta.
            </p>
          </div>
        </div>
        
        <div>
          <div className="relative bg-white p-6 rounded-lg shadow-md mb-8 overflow-hidden">
            {/* Construction theme elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            <h3 className="text-xl font-bold mb-4 text-center">Service Map</h3>
            <div className="relative w-full h-64 md:h-80 lg:h-96 mb-4 rounded overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.8803986988144!2d-113.80997392390058!3d52.265711651458474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5374542947119299%3A0x500a9122c7a444f0!2s170%20112%20Queensgate%20Crescent%2C%20Red%20Deer%2C%20AB%20T4P%200R9%2C%20Canada!5e0!3m2!1sen!2sus!4v1683212345678!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Lacombe Gutters Service Area Map"
                className="rounded-lg"
              ></iframe>
            </div>
            <p className="text-sm text-center">
              Our service region covers Central Alberta including the areas shown above.
            </p>
          </div>
          
          <div className="relative bg-white p-6 rounded-lg shadow-md overflow-hidden">
            {/* Construction theme elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            <h3 className="text-xl font-bold mb-4">Find Your Location</h3>
            <p className="mb-4">
              Not sure if you&apos;re in our service area? Here are some of the communities we regularly serve:
            </p>
            <ul className="space-y-1 mb-4">
              <li>Lacombe</li>
              <li>Red Deer</li>
              <li>Sylvan Lake</li>
              <li>Blackfalds</li>
              <li>Innisfail</li>
              <li>Ponoka</li>
              <li>Rimbey</li>
              <li>Bentley</li>
              <li>Eckville</li>
              <li>And many more! <Link href="/contact" className="text-primary hover:underline">Contact us to see if we service your area.</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-secondary p-8 rounded-lg relative">
        {/* Construction theme elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
        <div className="screw-corner screw-top-left"></div>
        <div className="screw-corner screw-top-right"></div>
        <div className="screw-corner screw-bottom-left"></div>
        <div className="screw-corner screw-bottom-right"></div>
        
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">Need Gutters in Central Alberta?</h2>
        <p className="text-center max-w-2xl mx-auto mb-8 text-primary/80">
          Whether you&apos;re in {SERVICE_AREA_BOUNDS.north}, {SERVICE_AREA_BOUNDS.south}, {SERVICE_AREA_BOUNDS.east}, {SERVICE_AREA_BOUNDS.west}, or anywhere in between,
          we can help with all your gutter and eavestrough needs.
        </p>
        <div className="text-center">
          <Link href="/contact" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Request a Free Estimate
          </Link>
        </div>
      </div>
    </div>
  );
}
