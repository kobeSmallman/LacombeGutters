import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";

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
    description: "With over 40+ years of combined experience, Lacombe Gutters provides professional eavestrough services across Central Alberta. Learn about our team and commitment to quality.",
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

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Rob",
    role: "President & Founder",
    bio: "Founder and visionary behind Lacombe Gutters with decades of industry expertise. As President and Operations Manager, Rob oversees all aspects of the business while maintaining the company's commitment to quality craftsmanship.",
    image: "/images/gallery/Rob.png"
  },
  {
    name: "Ryan",
    role: "Co-Owner & Crew Manager",
    bio: "As Co-Owner and Team Lead, Ryan brings exceptional leadership to every project. His hands-on approach to crew management ensures that Lacombe Gutters consistently delivers superior installations that stand the test of time.",
    image: "/images/gallery/Ryan.png"
  }
];

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <AnimateOnScroll type="fadeIn" duration={0.9}>
          <div className="relative overflow-hidden rounded-lg shadow-md mb-12">
            {/* Brushed metal background */}
            <div className="absolute inset-0 bg-plate section-veil"></div>
            
            {/* Metal strips at top and bottom */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 z-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700 z-10"></div>
            
            {/* Construction screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
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
        
        {/* Team Section with metal blue in day mode, dark in night mode */}
        <AnimateOnScroll type="fadeIn" duration={0.9} className="relative py-20 bg-blue-900 dark:bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-nodes-lg section-veil"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
                Meet Our Team
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {TEAM_MEMBERS.map((member, index) => (
                <AnimateOnScroll 
                  key={member.name} 
                  type={index % 2 === 0 ? "slideRight" : "slideLeft"}
                  delay={index * 0.1}
                  duration={0.9}
                >
                  <div className="relative group w-full h-full min-h-[600px] bg-white dark:bg-gray-800 border-4 border-gray-700 dark:border-gray-400 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {/* Standard screws in corners */}
                    <div className="screw-corner screw-top-left"></div>
                    <div className="screw-corner screw-top-right"></div>
                    <div className="screw-corner screw-bottom-left"></div>
                    <div className="screw-corner screw-bottom-right"></div>
                    
                    {/* Image Container */}
                    <div className="relative w-full h-80 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center p-1">
                        <div className="relative w-full h-full">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ 
                              objectFit: 'contain',
                              objectPosition: 'center top'
                            }}
                            className="transition-transform duration-500 group-hover:scale-105"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-8 flex flex-col bg-white dark:bg-gray-800">
                      <div className="mb-6">
                        <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                          {member.name}
                        </h3>
                        <div className="w-24 h-1 bg-primary mb-4"></div>
                        <p className="text-primary font-semibold text-xl">
                          {member.role}
                        </p>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
        
        {/* Service Area Section */}
        <AnimateOnScroll type="zoomIn" duration={0.9}>
          <div className="relative overflow-hidden rounded-lg shadow-md mb-8 md:mb-12 bg-primary text-white">
            <div className="absolute inset-0 bg-mesh section-veil mix-blend-overlay"></div>
            <div className="relative z-10 p-4 md:p-8">
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
