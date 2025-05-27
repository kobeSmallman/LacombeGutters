import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TEAM_MEMBERS } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export const metadata = {
  title: "About Lacombe Gutters | Our Story & Team",
  description: "Learn about Lacombe Gutters' 40+ years of combined experience in professional eavestrough services in Central Alberta. Meet our skilled team dedicated to quality workmanship.",
  keywords: [
    'Lacombe gutters about',
    'our story',
    'gutter specialists',
    'eavestrough experts',
    'Central Alberta',
    'gutter installation team',
    'gutter repair professionals',
    'residential commercial gutters',
    'Lacombe gutter contractors',
    'gutter service company'
  ],
  openGraph: {
    title: 'About Lacombe Gutters | Our Story & Team',
    description: "With over 40 years of combined experience, Lacombe Gutters provides professional eavestrough services across Central Alberta. Learn about our team and commitment to quality.",
    url: 'https://lacombeguttersltd.com/about',
    type: 'website',
    images: [
      {
        url: '/images/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Lacombe Gutters Team - Professional Eavestrough Specialists',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Lacombe Gutters | Our Story & Team',
    description: "40+ years of combined experience in professional eavestrough services across Central Alberta. Meet our skilled team.",
    images: ['/images/og-about.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <AnimateOnScroll type="fadeIn" duration={0.9}>
          <div className="bg-gray-100 p-8 rounded-lg shadow-md mb-12 relative">
            {/* Metal strips at top and bottom */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
            
            {/* Tool icon instead of screws */}
            <div className="absolute top-4 right-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <AnimateOnScroll type="slideRight" duration={0.9} className="md:w-1/3 relative">
                <Image 
                  src="/images/logos/logo.png" 
                  alt="Lacombe Gutters Logo" 
                  width={300} 
                  height={300}
                  className="mx-auto"
                />
              </AnimateOnScroll>
              <AnimateOnScroll type="slideLeft" duration={0.9} className="md:w-2/3">
                <h1 className="text-3xl md:text-4xl font-bold font-heading mb-6">Our Story</h1>
                <p className="mb-4 text-lg">
                  Founded in 2009, Lacombe Gutters has grown to become central Alberta&apos;s trusted name in eavestrough and gutter services. 
                  What started as a small operation has expanded into a full-service company with multiple crews serving residential and commercial clients.
                </p>
                <p className="mb-4 text-lg">
                  With 40+ years of combined experience in the industry, our team brings unmatched expertise to every project. 
                  We pride ourselves on quality craftsmanship, using only premium materials, and providing exceptional customer service.
                </p>
                <p className="text-lg">
                  Our commitment to excellence has made us the go-to gutter specialists in central Alberta, 
                  serving communities from Airdrie to Leduc, Nordegg to Stettler, and surrounding areas.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </AnimateOnScroll>
        
        {/* Team Section */}
        <AnimateOnScroll type="fadeIn" duration={0.9}>
          <h2 className="text-3xl font-bold font-heading mb-6 text-center relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
            <span className="bg-neutral-light px-4">Our Team</span>
          </h2>
        </AnimateOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {TEAM_MEMBERS.map((member, index) => (
            <AnimateOnScroll 
              key={index} 
              type={index % 2 === 0 ? "slideRight" : "slideLeft"}
              delay={index * 0.1}
              duration={0.9}
            >
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                {/* Construction screws in corners */}
                <div className="screw-corner screw-top-left"></div>
                <div className="screw-corner screw-top-right"></div>
                <div className="screw-corner screw-bottom-left"></div>
                <div className="screw-corner screw-bottom-right"></div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative w-40 h-40 overflow-hidden rounded-lg shrink-0 mx-auto md:mx-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        
        {/* Service Area Section */}
        <AnimateOnScroll type="zoomIn" duration={0.9}>
          <div className="bg-primary text-white p-4 md:p-8 rounded-lg shadow-md mb-8 md:mb-12 relative">
            {/* Construction screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center">Our Service Area</h2>
            <p className="text-center mb-4 md:mb-6 text-sm md:text-base">
              We proudly serve communities throughout central Alberta from Airdrie to Leduc, Nordegg to Stettler, and surrounding areas.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
              <AnimateOnScroll type="slideUp" delay={0.1} duration={0.9}>
                <div className="bg-white/10 p-2 md:p-3 rounded text-center">
                  <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">North</h3>
                  <p className="text-sm md:text-base">Leduc</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll type="slideUp" delay={0.2} duration={0.9}>
                <div className="bg-white/10 p-2 md:p-3 rounded text-center">
                  <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">South</h3>
                  <p className="text-sm md:text-base">Airdrie</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll type="slideUp" delay={0.3} duration={0.9}>
                <div className="bg-white/10 p-2 md:p-3 rounded text-center">
                  <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">West</h3>
                  <p className="text-sm md:text-base">Nordegg</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll type="slideUp" delay={0.4} duration={0.9}>
                <div className="bg-white/10 p-2 md:p-3 rounded text-center">
                  <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">East</h3>
                  <p className="text-sm md:text-base">Stettler</p>
                </div>
              </AnimateOnScroll>
            </div>
            
            <AnimateOnScroll type="fadeIn" delay={0.3} duration={0.9}>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
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
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>
        
        <AnimateOnScroll type="slideUp" duration={0.9} className="text-center">
          <Link href="/contact">
            <Button variant="primary" size="lg" className="btn-construction">
              Contact Us Today
            </Button>
          </Link>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
