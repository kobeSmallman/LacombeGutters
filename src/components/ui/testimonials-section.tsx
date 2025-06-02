'use client';

import dynamic from "next/dynamic";
import AnimateOnScroll from "./animate-on-scroll";

// Move the dynamic import to this client component
const TypingTestimonials = dynamic(() => import("./typing-testimonials"), {
  ssr: false, // Now it's safe in a client component
});

export default function TestimonialsSection() {
  return (
    <div className="container mx-auto px-4 py-20 relative">
      <div className="node-grid"></div>
      <div className="wave-layer-1"></div>
      <div className="wave-layer-2"></div>
      <div className="wave-layer-3"></div>
      <div className="wave-layer-4"></div>
      <AnimateOnScroll type="slideLeft" className="text-center mb-16 relative">
        {/* Tool icon - maintaining industrial theme */}
        <div className="absolute top-0 right-1/2 translate-x-60 md:translate-x-80">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white">What Our Clients Say</h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
          Our clients trust us with their homes for a reason
        </p>
      </AnimateOnScroll>
      
      <AnimateOnScroll type="slideRight" delay={0.2}>
        <div className="max-w-4xl mx-auto bg-white/90 p-10 rounded-lg shadow-2xl border border-yellow-400/20 relative backdrop-blur-sm">
          {/* Metal frame */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-yellow-600 via-yellow-400 to-yellow-600"></div>
          <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gradient-to-b from-yellow-600 via-yellow-400 to-yellow-600"></div>
          
          {/* Screws in corners */}
          <div className="screw-corner screw-top-left"></div>
          <div className="screw-corner screw-top-right"></div>
          <div className="screw-corner screw-bottom-left"></div>
          <div className="screw-corner screw-bottom-right"></div>
          
          <div className="text-lg md:text-xl leading-relaxed text-gray-800">
            <TypingTestimonials />
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
