import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from '@/components/ui/animate-on-scroll';
import ContinuousHangerExplainer from '@/components/alurex/ContinuousHangerExplainer';
import AlurexSchema from '@/components/alurex/AlurexSchema';


import { ALUREX_SEO_KEYWORDS } from '@/lib/constants';
import '@/styles/cta-bg.css';

export const metadata: Metadata = {
  title: 'Alurex Gutter Systems & Installation | Lacombe Gutters Ltd',
  description: 'Professional Alurex continuous hanger & gutter guard installation in Lacombe, Alberta. DoublePro & T-Rex systems with lifetime warranty. Free estimates.',
  keywords: ALUREX_SEO_KEYWORDS.join(', '),
  openGraph: {
    title: 'Alurex Gutter Systems & Installation | Lacombe Gutters Ltd',
    description: 'Professional Alurex continuous hanger & gutter guard installation in Lacombe, Alberta. DoublePro & T-Rex systems with lifetime warranty.',
    url: 'https://www.lacombeguttersltd.com/alurex-gutter-systems',
    siteName: 'Lacombe Gutters Ltd',
    images: [
      {
        url: '/images/alurex/Alurex-DoublePro-D11500-WEB.png',
        width: 1200,
        height: 630,
        alt: 'Alurex DoublePro Continuous Hanger System'
      }
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alurex Gutter Systems & Installation | Lacombe Gutters Ltd',
    description: 'Professional Alurex continuous hanger & gutter guard installation in Lacombe, Alberta.',
    images: ['/images/alurex/Alurex-DoublePro-D11500-WEB.png'],
  },
  alternates: {
    canonical: 'https://www.lacombeguttersltd.com/alurex-gutter-systems',
  },
};

export default function AlurexGutterSystemsPage() {
  return (
    <main className="min-h-screen bg-white relative">
      <AlurexSchema />
      
      {/* Hero Section - Matching service page theme */}
      <section className="relative isolate overflow-hidden text-white bg-gradient-to-br from-slate-800 to-slate-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/Alurex/doublepro-protection-pine.jpg"
            alt="Alurex Gutter Systems"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        
        {/* Dotted overlay matching site theme */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#fbbe24 1.5px, transparent 1.6px)',
            backgroundSize: '28px 28px',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 py-24 md:py-32 px-6 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-start">
              <Link 
                href="/services" 
                className="inline-flex items-center text-white/80 hover:text-secondary mb-6 transition-colors font-medium"
              >
                ← Back to All Services
              </Link>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 drop-shadow-lg">
              Your Gutter Installation Expert
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/90">
              Gutters used to be installed with nails or invisible hangers at 24 inch intervals. 
              While these systems were relatively strong, they left long stretches of aluminum gutter, 
              causing weak spots on the gutters at each section. The Alu-Rex Continuous Hanger systems 
              reinforce the gutter along its entire length.
            </p>
          </div>
        </div>
      </section>

      {/* Continuous Hanger Explanation Section */}
      <div className="bg-white">
        <ContinuousHangerExplainer />
      </div>

      {/* DoublePro & T-Rex Full Width Staggered Layout */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <AnimateOnScroll type="fadeIn" delay={0.2}>
            {/* Section Header */}
            <div className="text-center mb-16 px-4">
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-primary">
                Gutter Hanger Systems
              </h2>
            </div>

            {/* Product Layout */}
            <div className="space-y-0">
              {/* DoublePro Section - Next-Gen Gutter System */}
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-white p-8 lg:p-16 order-2 lg:order-1">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Next-Gen Gutter System</h2>
                    <Image
                      src="/images/alurex/LogoBlack-DoublePro.png"
                      alt="DoublePro Logo"
                      width={200}
                      height={60}
                      className="object-contain"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mt-2">Microfiltration Continuous Hanger™</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border">
                      <div className="text-3xl font-bold text-primary mb-2">425 lb/ft</div>
                      <div className="text-lg text-gray-700">Load Capacity</div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-gray-600 text-lg leading-relaxed">
                        The DoublePro® combines the strength of the Continuous Hanger™ with the benefits of a microfiltration leaf guard, 
                        placing it at the forefront of the market by offering the most advanced technologies in gutter systems. Its unique design 
                        features two layers of ingeniously perforated industrial-grade aluminum, preventing even the finest debris from entering the 
                        gutter while ensuring rainwater flows away from your home.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Furthermore, its exceptional strength is ensured by its Continuous Hanger™, allowing it to support up to 425lb per 
                        linear foot along the entire length of the gutter.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed font-semibold">
                        We highly recommend that all our customers consider the advantages of this revolutionary Alu-Rex product before 
                        making a final decision on their gutter system.
                      </p>
                    </div>
                    
                    <a
                      href="https://vimeo.com/340465756"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white py-4 px-8 rounded-lg transition-colors text-lg font-semibold inline-block text-center"
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
                
                <div className="bg-white p-8 lg:p-16 order-1 lg:order-2">
                  <div className="relative aspect-square">
                    <Image
                      src="/images/alurex/Alurex-DoublePro-D11500-WEB.png"
                      alt="DoublePro® Microfiltration Continuous Hanger System"
                      fill
                      className="object-contain"
                      sizes="50vw"
                    />
                  </div>
                </div>
              </div>

              {/* T-Rex Section - Ultra-Durable Gutter System */}
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-white p-8 lg:p-16">
                  <div className="relative aspect-square">
                    <Image
                      src="/images/alurex/Alurex-Trex-M5200B95-WEB.png"
                      alt="T-Rex® Continuous Hanger System"
                      fill
                      className="object-contain"
                      sizes="50vw"
                    />
                  </div>
                </div>
                
                <div className="bg-white p-8 lg:p-16">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Ultra-Durable Gutter System</h2>
                    <Image
                      src="/images/Alurex/LogoBlack-Trex.png"
                      alt="T-Rex Logo"
                      width={160}
                      height={60}
                      className="object-contain"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mt-2">Continuous Hanger™</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border">
                      <div className="text-3xl font-bold text-primary mb-2">250 lb/ft</div>
                      <div className="text-lg text-gray-700">Load Capacity</div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Our gutter installation experts have made T-Rex® their standard for fastening gutters, thus 
                        establishing a high-quality standard. With a design featuring an integrated continuous 
                        hanger™, this product stands out for its ability to support up to 250lb per linear foot, ensuring 
                        optimal gutter stability along its entire length.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Its durability is guaranteed for life, providing our customers with absolute peace of mind 
                        regarding its unparalleled strength.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed font-semibold">
                        Opting for T-Rex means choosing a gutter solution that is not only reliable and resilient 
                        but also ensures peace of mind.
                      </p>
                    </div>
                    
                    <a
                      href="https://vimeo.com/alurex/trex-en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white py-4 px-8 rounded-lg transition-colors text-lg font-semibold inline-block text-center"
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>





      {/* Gutter Guard and Protection Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                  Gutter Guard and Protection
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                  If you&apos;ve ever had to clear eavestroughs clogged with decaying debris or hire a contractor to excavate your property and fill cracks in your foundation, you understand the importance of having an effective rainwater drainage system for your home. Overflow caused by clogged or cracked gutters increases the risk of water seeping under roofs or into basements.
                </p>
              </div>

              {/* Authorized Partner Section */}
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8">
                  Authorized Alurex Installation Partner
                </h3>
                <p className="text-lg text-gray-700 mb-12">
                  Lacombe Gutters is proud to be an authorized installer of premium Alurex products throughout Alberta.
                </p>
                
                {/* Product Logos */}
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-12">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/Alurex/LogoBlack-Alurex.png"
                      alt="Alurex Logo"
                      width={140}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/Alurex/LogoBlack-DoublePro.png"
                      alt="DoublePro Logo"
                      width={140}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/Alurex/LogoBlack-Trex.png"
                      alt="T-Rex Logo"
                      width={120}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/Alurex/LogoBlack-GutterClean.png"
                      alt="GutterClean Logo"
                      width={140}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
                  >
                    Get Free Installation Quote
                  </Button>
                </Link>
                <Link href="tel:+14035989137" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-600/10 px-8 py-4 text-lg font-semibold transition-all duration-300"
                  >
                    Call (403) 598-9137
                  </Button>
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

    </main>
  );
}
