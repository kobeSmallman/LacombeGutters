import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import styles from './wood-texture.module.css';

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
    <div className="min-h-screen bg-amber-50 dark:bg-amber-950/50 relative">
      {/* Full Page Background with Construction Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Base Wood Grain */}
        <div className={styles.woodGrain}></div>
        
        {/* Dotted-node overlay (yellow construction pin-holes) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#fbbe24 1.5px, transparent 1.6px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Subtle angled plate for depth */}
        <div
          className="absolute -top-32 -right-44 w-[150%] h-[180%] bg-slate-700/30"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        
        {/* Animated Construction Symbols */}
        <div className="absolute inset-0 opacity-5 dark:opacity-[0.03] overflow-hidden">
          {/* Gutter Symbol */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-30 animate-float-slow">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M3 4h18v3h-1v8h1v3h-6v-2h-2v2H8v-2H6v2H3v-3h1V7H3V4z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>
          {/* Roof Symbol */}
          <div className="absolute top-1/3 right-1/4 w-40 h-40 opacity-20 animate-float-medium">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M12 3l-10 9h20l-10-9z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>
          {/* Screw Symbol */}
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 opacity-20 animate-float-slower">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>
          {/* Ladder Symbol */}
          <div className="absolute top-1/2 right-1/3 w-36 h-36 opacity-15 animate-float-slow">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M10 5v11h4V5h-4zm-1 11H5V5h4v11zm-4 2h4v3H5v-3zm10 0h4v3h-4v-3z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-4">
          {/* About Section */}
          <AnimateOnScroll type="fadeIn" duration={0.9}>
            <div className="relative overflow-hidden rounded-lg shadow-lg mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-amber-200/30 dark:border-amber-800/30">
              {/* Metal strips at top and bottom */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-300 dark:from-amber-600 dark:to-amber-400 z-10"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-300 dark:from-amber-600 dark:to-amber-400 z-10"></div>
            
              {/* Construction screws in corners */}
              <div className="screw-corner screw-top-left"></div>
              <div className="screw-corner screw-top-right"></div>
              <div className="screw-corner screw-bottom-left"></div>
              <div className="screw-corner screw-bottom-right"></div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center p-8">
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
          
          {/* Team Section with construction theme */}
          <AnimateOnScroll type="fadeIn" duration={0.9} className="relative py-20 bg-amber-50/50 dark:bg-amber-950/30 overflow-hidden rounded-lg border border-amber-200/30 dark:border-amber-800/30 mb-12">
            <div className="absolute inset-0">
              <div className={styles.woodGrain}></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white">
                  Meet Our Team
                </h2>
                <div className="w-24 h-1 bg-amber-500 dark:bg-amber-400 mx-auto mt-6"></div>
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
                    />
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
      
      <section className="py-16 md:py-24 relative overflow-hidden bg-gray-900">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}></div>
        </div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl"></div>
        
        {/* Section corner lines */}
        <div className="absolute top-4 left-4 w-12 h-px bg-amber-400"></div>
        <div className="absolute top-4 left-4 w-px h-12 bg-amber-400"></div>
        
        <div className="absolute top-4 right-4 w-12 h-px bg-amber-400"></div>
        <div className="absolute top-4 right-4 w-px h-12 bg-amber-400"></div>
        
        <div className="absolute bottom-4 left-4 w-12 h-px bg-amber-400"></div>
        <div className="absolute bottom-4 left-4 w-px h-12 bg-amber-400"></div>
        
        <div className="absolute bottom-4 right-4 w-12 h-px bg-amber-400"></div>
        <div className="absolute bottom-4 right-4 w-px h-12 bg-amber-400"></div>
        
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto pt-8 border-t border-gray-800">
            <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
              
              <div className="text-center">
                <p className="text-xl font-medium text-white mb-6">
                  Not sure if we service your area?
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/contact" 
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-lg font-medium flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/20"
                  >
                    Get a Free Estimate <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  
                  <span className="text-gray-300 text-sm">or</span>
                  
                  <a 
                    href="tel:4035989137" 
                    className="px-6 py-2.5 bg-gray-700/50 hover:bg-gray-600/70 text-white rounded-lg font-medium flex items-center transition-all duration-300 border border-gray-600/50 hover:border-amber-400/30"
                  >
                    <Phone className="h-4 w-4 mr-2" /> (403) 598-9137
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
