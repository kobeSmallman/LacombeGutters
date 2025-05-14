import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Why Choose Us",
  description: "Discover why Lacombe Gutters is the trusted choice for eavestrough services in central Alberta, with 40+ years of combined experience, quality workmanship, and excellent customer service.",
};

const reasons = [
  {
    title: "40+ Years Combined Experience",
    description: "Our co-owners bring over four decades of combined experience to every project, ensuring expert knowledge and skilled craftsmanship.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Quality Materials",
    description: "We use only premium-grade materials that stand up to Alberta's harsh weather conditions, from extreme cold to summer hailstorms.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Expert Installation",
    description: "Our experienced installers follow industry best practices and pay meticulous attention to detail on every job, large or small.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: "Comprehensive Warranty",
    description: "We stand behind our work with a comprehensive warranty on both materials and labor, giving you peace of mind.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Fully Insured",
    description: "For your protection and ours, we maintain comprehensive liability insurance and WCB coverage on all our work.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Free, No-Obligation Estimates",
    description: "We provide detailed, transparent quotes with no hidden costs or surprises, allowing you to make an informed decision.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  }
];

export default function WhyUsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Title section with light grey background and tool icon */}
        <div className="text-center mb-12 relative">
          <div className="bg-gray-100 py-8 px-4 rounded-lg relative">
            {/* Tool icon instead of screws */}
            <div className="absolute top-4 right-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold font-heading mb-4 text-center">Why Choose Lacombe Gutters</h1>
            <p className="text-xl text-center mb-4 max-w-3xl mx-auto">
              Discover what sets us apart and why we&apos;re the trusted choice for eavestrough services across central Alberta.
            </p>
          </div>
        </div>
        
        {/* Reasons grid with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow relative">
              {/* Small screws in top corners of each card */}
              <div className="screw-corner screw-top-left" style={{ width: "8px", height: "8px" }}></div>
              <div className="screw-corner screw-top-right" style={{ width: "8px", height: "8px" }}></div>
              
              {/* Metal strip at top */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-300"></div>
              
              {/* Icon centered at top with circular background */}
              <div className="flex justify-center mb-4 -mt-10">
                <div className="bg-white p-3 rounded-full shadow-md border-2 border-secondary relative overflow-hidden">
                  {/* Keep the icon inside the circle */}
                  <div className="relative z-10">
                    {reason.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-center">{reason.title}</h3>
              <p className="text-center">{reason.description}</p>
            </div>
          ))}
        </div>
        
        {/* Two-column section with construction theme */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left column with importance of gutters */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 relative">
            {/* Construction screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            {/* Metal strip at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/10"></div>
            
            <div className="flex items-center mb-6">
              <div className="bg-primary rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">The Importance of Quality Gutters</h2>
            </div>
            
            <p className="mb-4">
              Your gutter system is a critical component of your home&apos;s infrastructure. When properly installed and maintained, 
              gutters protect your:
            </p>
            <ul className="list-none pl-0 mb-6 space-y-3">
              {[
                "Foundation from water damage and shifting",
                "Basement from flooding and moisture issues",
                "Siding from staining and premature deterioration",
                "Landscaping from erosion",
                "Roof structure from water infiltration"
              ].map((item, index) => (
                <li key={index} className="flex items-center bg-gray-50 p-3 rounded-lg border-l-4 border-primary text-black font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mb-4">
              Investing in a quality gutter system from Lacombe Gutters means protecting your home from potentially expensive 
              repairs down the road.
            </p>
          </div>
          
          {/* Right column with process */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-md border border-gray-200 relative">
            {/* Construction screws in corners */}
            <div className="screw-corner screw-top-left"></div>
            <div className="screw-corner screw-top-right"></div>
            <div className="screw-corner screw-bottom-left"></div>
            <div className="screw-corner screw-bottom-right"></div>
            
            {/* Metal strip at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/10"></div>
            
            <div className="flex items-center mb-6">
              <div className="bg-primary rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Our Process</h2>
            </div>
            
            <ol className="space-y-4 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 ml-3.5"></div>
              
              {[
                {
                  title: "Initial Consultation",
                  desc: "We discuss your needs and schedule a convenient time for a site visit."
                },
                {
                  title: "On-Site Assessment",
                  desc: "We evaluate your property, take measurements, and identify any potential challenges."
                },
                {
                  title: "Detailed Quote",
                  desc: "We provide a comprehensive quote with clear pricing and timelines."
                },
                {
                  title: "Professional Installation",
                  desc: "Our expert team completes the installation with minimal disruption to your property."
                },
                {
                  title: "Final Inspection",
                  desc: "We conduct a thorough inspection and walkthrough to ensure your complete satisfaction."
                }
              ].map((step, index) => (
                <li key={index} className="flex items-start relative z-10">
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center mr-4 font-bold border-2 border-white">
                    {index + 1}
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-grow">
                    <h3 className="font-bold mb-1 text-primary">{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        {/* Yellow banner CTA - exactly matching the services page */}
        <div className="bg-secondary p-8 rounded-lg text-center relative mb-8">
          {/* Simple screw elements in corners */}
          <div className="screw-corner screw-top-left"></div>
          <div className="screw-corner screw-top-right"></div>
          <div className="screw-corner screw-bottom-left"></div>
          <div className="screw-corner screw-bottom-right"></div>
          
          {/* Metal strips at top and bottom */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-700"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700"></div>
          
          <h2 className="text-2xl font-bold mb-4 text-primary">Not sure which service you need?</h2>
          <p className="mb-6 text-primary/80">
            Contact us today for a free consultation. Our experts will assess your needs and recommend the best solution.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">GET A FREE ESTIMATE</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
