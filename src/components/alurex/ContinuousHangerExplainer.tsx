"use client";

import AnimateOnScroll from '@/components/ui/animate-on-scroll';

export default function ContinuousHangerExplainer() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="w-full">
        <AnimateOnScroll type="fadeIn" delay={0.2}>
          <div className="w-full">
            <div className="text-center mb-16 px-4">
              <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-primary">
                Continuous Hanger™: Explained
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-0 items-center mb-16">
              {/* YouTube Video - Full Width */}
              <div className="relative p-8 lg:p-16">
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/qR8Ok5MEnzo?rel=0&modestbranding=1&showinfo=0"
                    title="Continuous Hanger System Installation"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
              
              {/* Content Section - Full Width */}
              <div className="bg-white p-8 lg:p-16 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-600 font-bold text-lg">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">The Problem</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Rain gutters are commonly installed with spaced hangers that cause weak spots 
                        on the gutter between each hanger.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-yellow-600 font-bold text-lg">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditional Solution</h3>
                      <p className="text-gray-600 leading-relaxed">
                        To avoid weak spots, <em>hundreds</em> of hangers would need to be added &ndash; 
                        an inefficient practice that&apos;s costly and time-consuming.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 font-bold text-lg">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Alurex Solution</h3>
                      <p className="text-gray-600 leading-relaxed">
                        With a <strong>Continuous Hanger</strong>, the rain gutters are reinforced 
                        along their entire length, eliminating weak spots completely.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                  <h4 className="text-lg font-semibold text-primary mb-3">
                    Why Choose Continuous Hanger Systems?
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Eliminates weak spots along the entire gutter length</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Supports significantly more weight than traditional hangers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Reduces maintenance and prevents sagging over time</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Professional installation with lifetime warranty</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
