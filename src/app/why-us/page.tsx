import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import { Phone } from 'lucide-react';
import RainEffect from '@/components/ui/rain-effect';

export const metadata = {
  title: "Why Choose Us",
  description: "Discover why Lacombe Gutters is the trusted choice for eavestrough services in central Alberta, with 40+ years of combined experience, quality workmanship, and excellent customer service.",
};

// Cloud animation component
const CloudEffect = ({ count = 3, baseDelay = 0 }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(count)].map((_, i) => {
      const size = 120 + Math.random() * 80;
      const delay = baseDelay + i * 0.5;
      return (
        <div 
          key={i}
          className="absolute bg-white/10 rounded-full filter blur-lg"
          style={{
            width: `${size}px`,
            height: `${size * 0.6}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            animation: `float ${8 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            opacity: 0.6 + Math.random() * 0.4
          }}
        />
      );
    })}
  </div>
);

// Sun rays effect
const SunEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-300/20 rounded-full filter blur-xl"></div>
    {[...Array(12)].map((_, i) => (
      <div 
        key={i}
        className="absolute top-1/4 left-1/2 h-1 w-24 bg-yellow-300/30 origin-left"
        style={{
          transform: `rotate(${i * 30}deg) translateX(100px)`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`
        }}
      />
    ))}
  </div>
);

export default function WhyUsPage() {
  return (
    <div className="relative">
      {/* Rainy - Problem Statement with new background */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-blue-900 text-white min-h-[80vh] flex items-center">
        {/* Rain Effect - Full viewport */}
        <div className="absolute inset-0 z-0">
          <RainEffect />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll type="fadeIn" duration={1}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-blue-900/30 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-blue-400/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="font-bold text-blue-100">Protection Against the Elements</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Weather Doesn&apos;t Stand a Chance</h1>
              <p className="text-xl md:text-2xl text-blue-50 font-medium max-w-3xl mx-auto mb-8">
                Alberta&apos;s unpredictable weather is no match for our expertly installed gutter systems.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  { 
                    title: "40+ Years Combined Experience", 
                    desc: "Our co-owners bring over four decades of combined experience to every project, ensuring expert knowledge and skilled craftsmanship.",
                    icon: "👨‍🔧"
                  },
                  { 
                    title: "Quality Materials", 
                    desc: "We use only premium-grade materials that stand up to Alberta's harsh weather conditions, from extreme cold to summer hailstorms.",
                    icon: "🏗️"
                  },
                  { 
                    title: "Expert Installation", 
                    desc: "Our experienced installers follow industry best practices and pay meticulous attention to detail on every job, large or small.",
                    icon: "🔧"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-xl font-extrabold mb-2 text-white">{item.title}</h3>
                    <p className="text-blue-50 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 2: Cloudy - Transition to Solutions */}
      <section className="relative py-32 bg-slate-600 text-white min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-500 z-0"></div>
        <CloudEffect count={5} baseDelay={0.5} />
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll type="fadeIn" duration={1}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Expert Solutions</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
                We don&apos;t just install gutters - we provide complete water management solutions tailored to Alberta&apos;s climate.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Comprehensive Warranty",
                    description: "We stand behind our work with a comprehensive warranty on both materials and labor, giving you peace of mind.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    title: "Fully Insured",
                    description: "For your protection and ours, we maintain comprehensive liability insurance and WCB coverage on all our work.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )
                  },
                  {
                    title: "Free, No-Obligation Estimates",
                    description: "We provide detailed, transparent quotes with no hidden costs or surprises, allowing you to make an informed decision.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    )
                  },
                  {
                    title: "The Importance of Quality Gutters",
                    description: "Your gutter system is a critical component of your home's infrastructure. When properly installed and maintained, gutters protect your foundation, basement, siding, landscaping, and roof structure from water damage and other issues.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="flex items-start">
                      <div className="bg-white/20 p-3 rounded-lg mr-4 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold mb-2 text-white">{item.title}</h3>
                        <p className="text-blue-50 font-medium">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 3: Sunny - Benefits and CTA */}
      <section className="relative py-32 bg-yellow-100 text-slate-800 min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-yellow-100 z-0"></div>
        <SunEffect />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimateOnScroll type="fadeIn" duration={1}>
              <div className="inline-flex items-center bg-yellow-400/30 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-yellow-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="font-bold text-yellow-900">Peace of Mind</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Enjoy the Sunshine</h2>
              <p className="text-xl text-slate-800 font-medium max-w-3xl mx-auto mb-12">
                With Lacombe Gutters, you can relax knowing your home is protected, rain or shine.
              </p>
              
              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-xl border border-white/30 mb-12">
                <h3 className="text-2xl font-extrabold mb-6 text-slate-900 text-center">Our Process</h3>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-yellow-400 ml-1"></div>
                  
                  {[
                    {
                      step: "1",
                      title: "Initial Consultation",
                      description: "We discuss your needs and schedule a convenient time for a site visit."
                    },
                    {
                      step: "2",
                      title: "On-Site Assessment",
                      description: "We evaluate your property, take measurements, and identify any potential challenges."
                    },
                    {
                      step: "3",
                      title: "Detailed Quote",
                      description: "We provide a comprehensive quote with clear pricing and timelines."
                    },
                    {
                      step: "4",
                      title: "Professional Installation",
                      description: "Our expert team completes the installation with minimal disruption to your property."
                    },
                    {
                      step: "5",
                      title: "Final Inspection",
                      description: "We conduct a thorough inspection and walkthrough to ensure your complete satisfaction."
                    }
                  ].map((item, i) => (
                    <div key={i} className="relative pl-16 pb-8 group">
                      <div className="absolute left-0 w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-slate-900 font-bold text-lg z-10 group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-700">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link href="/contact">
                <Button variant="primary" size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  Get Your Free Estimate Today
                </Button>
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
      

      {/* Service Area Section - Modern Theme */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(251, 190, 36, 0.3) 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>
        
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-blue-900/10"
          style={{
            animation: 'gradientShift 15s ease infinite',
            backgroundSize: '200% 200%'
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-yellow-400 bg-yellow-400/10 rounded-full mb-4">
              Service Coverage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Service Area
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              With over 40 years of experience, we&apos;ve been proudly serving Central Alberta with top-quality gutter solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* North Card */}
            <div className="group relative bg-gray-800/90 p-8 rounded-xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10 hover:-translate-y-1">
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">N</div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 pb-3 border-b border-gray-700/50">North</h3>
              <ul className="space-y-2">
                {['Leduc', 'Beaumont', 'Devon', 'Stony Plain'].map((city, i) => (
                  <li key={i} className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2.5"></span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* South Card */}
            <div className="group relative bg-gray-800/80 p-6 rounded-lg border border-gray-700/50 hover:border-yellow-400/50 transition-colors">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm shadow-lg">S</div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 pb-3 border-b border-gray-700/50">South</h3>
              <ul className="space-y-2">
                {['Airdrie', 'Cochrane', 'Okotoks', 'High River'].map((city, i) => (
                  <li key={i} className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2.5"></span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* East Card */}
            <div className="group relative bg-gray-800/80 p-6 rounded-lg border border-gray-700/50 hover:border-yellow-400/50 transition-colors">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm shadow-lg">E</div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 pb-3 border-b border-gray-700/50">East</h3>
              <ul className="space-y-2">
                {['Stettler', 'Three Hills', 'Hanna', 'Coronation'].map((city, i) => (
                  <li key={i} className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2.5"></span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* West Card */}
            <div className="group relative bg-gray-800/80 p-6 rounded-lg border border-gray-700/50 hover:border-yellow-400/50 transition-colors">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm shadow-lg">W</div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-4 pb-3 border-b border-gray-700/50">West</h3>
              <ul className="space-y-2">
                {['Nordegg', 'Rocky Mountain House', 'Sundre', 'Carstairs'].map((city, i) => (
                  <li key={i} className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2.5"></span>
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-800">
            <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
              
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-amber-400 rounded-full"></div>
              
              <div className="text-center">
                <p className="text-xl font-medium text-white mb-6">
                  Not sure if we service your area?
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/service-areas" 
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-lg font-medium flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/20"
                  >
                    View Service Area Map
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
