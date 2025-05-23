import { Metadata } from "next";
import { Suspense } from "react";
import { FAQConfig, getFAQCategories } from "@/content/faq";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { 
  MessageCircleQuestion, 
  Wrench, 
  HardHat, 
  DollarSign, 
  Home,
  Building,
  HelpCircle
} from "lucide-react";
import FAQSection from "@/components/faq/FAQSection";
import FAQSearch from "@/components/faq/FAQSearch";
import FAQJsonLd from "@/components/faq/FAQJsonLd";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Lacombe Gutters",
  description: "Find answers to common questions about gutters, services, installation, and maintenance. Lacombe Gutters provides expert eavestrough solutions across Central Alberta.",
};

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
      return <MessageCircleQuestion className="h-7 w-7 text-primary" />;
  }
};

export default function FAQPage() {
  const categories = getFAQCategories();
  const { faq } = FAQConfig;

  return (
    <div className="py-12">
      <FAQJsonLd faqItems={faq.slice(0, 25)} />
      
      {/* Header Section */}
      <AnimateOnScroll type="fadeIn" duration={0.9}>
        <div className="container mx-auto px-4 text-center mb-12">
          <div className="flex justify-center mb-6">
            <MessageCircleQuestion className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our services, installation process, and more.
          </p>
        </div>
      </AnimateOnScroll>
      
      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Box with Construction Theme */}
        <AnimateOnScroll type="fadeIn" duration={0.7} delay={0.3}>
          <div className="relative mb-16">
            <Suspense fallback={
              <div className="h-[120px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            }>
              <FAQSearch />
            </Suspense>
          </div>
        </AnimateOnScroll>
        
        {/* FAQ Categories as Collapsible Sections */}
        <div className="space-y-10">
          {categories.map((category, index) => (
            <AnimateOnScroll 
              key={category} 
              type="fadeIn" 
              duration={0.7} 
              delay={0.1 * (index + 1)}
            >
              <FAQSection
                category={category}
                icon={getCategoryIcon(category)}
                questions={faq.filter(q => q.category === category)} 
                collapsible={true}
              />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
      
      {/* Bottom CTA Section */}
      <AnimateOnScroll type="fadeIn" duration={0.9}>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-primary/10 dark:bg-primary/20 p-8 md:p-10 rounded-lg shadow-md relative max-w-4xl mx-auto">
            {/* Proper screw corners using div implementation */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            {/* Metal strip at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/10"></div>
            
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Still have questions?</h2>
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Contact our team for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href={`tel:${FAQConfig.businessPhone}`} className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-lg font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {FAQConfig.businessPhone}
              </a>
              <a href={`mailto:${FAQConfig.businessEmail}`} className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-black rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
