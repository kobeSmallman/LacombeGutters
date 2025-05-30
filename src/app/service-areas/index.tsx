import Link from 'next/link';
import { cityData } from '@/data/cityData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gutter Service Areas | Lacombe Gutters Ltd',
  description: 'Serving communities throughout Central Alberta with 40+ years of combined gutter installation experience. Find your city from our service area list.',
};

export default function ServiceAreasIndex() {
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
        With 40+ years of combined experience, Lacombe Gutters proudly serves communities throughout central Alberta, providing high-quality gutter and eavestrough services.
      </p>

      <div className="relative bg-neutral-light p-8 rounded-lg mb-12 border-2 border-primary/20">
        {/* Construction theme elements: screws in corners */}
        <div className="screw-corner screw-top-left"></div>
        <div className="screw-corner screw-top-right"></div>
        <div className="screw-corner screw-bottom-left"></div>
        <div className="screw-corner screw-bottom-right"></div>
        
        <h2 className="text-2xl font-bold mb-8 text-center">Find Your City</h2>
        <p className="mb-8 text-center">
          Lacombe Gutters serves over two dozen Central Alberta communities with expert, honest gutter work.
          Select your city below for location-specific information.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedLetters.map(letter => (
            <div key={letter} className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-primary border-b pb-2">{letter}</h3>
              <ul className="space-y-2">
                {groupedCities[letter].map(city => (
                  <li key={city.slug}>
                    <Link 
                      href={`/${city.slug}`}
                      className="hover:text-primary transition-colors flex items-center"
                    >
                      <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Beyond Our Listed Areas</h2>
        <p className="mb-4">
          Don&apos;t see your community listed? We often travel beyond our primary service areas.
          Contact us directly to see if we can accommodate your location.
        </p>
        <div className="mt-6">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            Contact Us About Your Area
          </Link>
        </div>
      </div>
    </div>
  );
}
