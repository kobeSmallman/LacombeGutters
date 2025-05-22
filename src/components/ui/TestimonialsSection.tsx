'use client';

import dynamic from "next/dynamic";
import AnimateOnScroll from "./AnimateOnScroll";

// Move the dynamic import to this client component
const TypingTestimonials = dynamic(() => import("./TypingTestimonials"), {
  ssr: false, // Now it's safe in a client component
});

export default function TestimonialsSection() {
  return (
    <div className="container mx-auto px-4">
      <AnimateOnScroll type="slideLeft" className="text-center mb-12 relative">
        {/* Tool icon instead of screws - maintaining industrial theme - moved slightly left */}
        <div className="absolute top-0 right-1/2 translate-x-60 md:translate-x-72">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What Our Clients Say</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our clients trust us with their homes for a reason
        </p>
      </AnimateOnScroll>
      
      <AnimateOnScroll type="slideRight" delay={0.2}>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-100 relative">
          {/* Horizontal metal strips at top and bottom - construction theme */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"></div>
          
          {/* Vertical metal strips at left and right - construction theme */}
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300"></div>
          <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300"></div>
          
          {/* Using the exact same screw-corner classes as other sections */}
          <div className="screw-corner screw-top-left"></div>
          <div className="screw-corner screw-top-right"></div>
          <div className="screw-corner screw-bottom-left"></div>
          <div className="screw-corner screw-bottom-right"></div>
          
          <TypingTestimonials />
        </div>
      </AnimateOnScroll>
    </div>
  );
}
