// Main FAQ Content - SSR compatible for SEO

import { FAQConfig, getFAQCategories } from "@/content/faq";
// import AnimateOnScroll from "@/components/ui/animate-on-scroll"; // Disabled for SSR
import { 
  MessageCircle, 
  Wrench, 
  HardHat, 
  DollarSign, 
  Home,
  Building,
  HelpCircle,
  ArrowRight,
  Phone
} from "lucide-react";
import Link from "next/link";
import FAQSection from "@/components/faq/FAQSection";
// import FAQJsonLd from "@/components/faq/FAQJsonLd"; // REMOVED: Duplicate schema (already in layout)
import ClientFAQSearchWrapper from '@/components/faq/ClientFAQSearchWrapper';

// Helper function to get icon based on category
const getCategoryIcon = (category: string) => {
  switch(category) {
    case "Technical & Performance":
      return <Wrench className="h-7 w-7 text-primary" />;
    case "Installation":
      return <HardHat className="h-7 w-7 text-primary" />;
    case "Pricing & Value":
      return <DollarSign className="h-7 w-7 text-primary" />;
    case "Residential":
      return <Home className="h-7 w-7 text-primary" />;
    case "Commercial":
      return <Building className="h-7 w-7 text-primary" />;
    case "General":
      return <HelpCircle className="h-7 w-7 text-primary" />;
    default:
      return <MessageCircle className="h-7 w-7 text-primary" />;
  }
};

export default function FAQContent() {
  const categories = getFAQCategories();
  const { faq } = FAQConfig;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Removed styled-jsx global styles for SSR compatibility - animations handled by Tailwind CSS */}
      
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden text-white bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] min-h-[50vh] md:min-h-[55vh] flex items-center">
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
          className="absolute -top-24 -right-32 w-[150%] h-[180%] bg-slate-700/30"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        
        <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <MessageCircle className="h-16 w-16 md:h-20 md:w-20 text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">Frequently Asked Questions</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our services, installation process, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQJsonLd removed - already provided by FAQSchema in layout.tsx to avoid duplicate schema */}
      
      {/* FAQ Content */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100">
        {/* Light Mode: Wood Texture */}
        <div className="absolute inset-0 bg-[url('/images/textures/wood-texture-light.jpg')] opacity-30 bg-cover bg-center"></div>
        
        {/* Dark Mode: Construction Grid */}

        
        {/* Screw Accents in Corners */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full"></div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-amber-400 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-amber-400 rounded-full"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-amber-100/50"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Search Box with Construction Theme */}
          <div className="relative mb-16">
            <ClientFAQSearchWrapper />
          </div>
        
          {/* FAQ Categories as Collapsible Sections */}
          <div className="space-y-10">
            {categories.map((category) => (
              <div key={category}>
                <FAQSection
                  category={category}
                  icon={getCategoryIcon(category)}
                  questions={faq.filter(q => q.category === category)} 
                  collapsible={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Enhanced */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(251, 190, 36, 0.3) 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>
        
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-blue-900/10"
          style={{
            animation: 'gradientShift 15s ease infinite',
            backgroundSize: '200% 200%'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative max-w-5xl mx-auto">
            <div className="relative bg-white/5 backdrop-blur-sm p-12 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl"></div>
              
              {/* Corner accents */}
              <div className="absolute top-6 left-6 w-3 h-3 bg-amber-400 rounded-full"></div>
              <div className="absolute top-6 right-6 w-3 h-3 bg-amber-400 rounded-full"></div>
              <div className="absolute bottom-6 left-6 w-3 h-3 bg-amber-400 rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-3 h-3 bg-amber-400 rounded-full"></div>
              
              <div className="text-center space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Still have questions about our services?
                </h2>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link 
                    href="/contact" 
                    className="px-8 py-4 text-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 rounded-lg font-semibold flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/20"
                  >
                    Contact Us <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  
                  <span className="text-gray-300 text-lg">or</span>
                  
                  <a 
                    href="tel:4035989137" 
                    className="px-8 py-4 text-lg bg-gray-700/50 hover:bg-gray-600/70 text-white rounded-lg font-semibold flex items-center transition-all duration-300 border-2 border-gray-600/50 hover:border-amber-400/30"
                  >
                    <Phone className="h-5 w-5 mr-3" /> (403) 598-9137
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
