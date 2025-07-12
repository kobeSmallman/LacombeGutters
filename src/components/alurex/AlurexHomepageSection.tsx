"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";

interface ProductOption {
  id: string;
  name: string;
  label: string;
  image: string;
  category: "new" | "existing";
}

const productOptions: ProductOption[] = [
  {
    id: "doublepro",
    name: "DoublePro",
    label: "double⚫pro™",
    image: "/images/alurex/Alurex-DoublePro-D11500-WEB.png",
    category: "new"
  },
  {
    id: "trex",
    name: "T-Rex",
    label: "t⚫rex™",
    image: "/images/alurex/Alurex-Trex-M5200B95-WEB.png",
    category: "new"
  },
  {
    id: "gutterclean",
    name: "GutterClean",
    label: "gutter⚫clean™",
    image: "/images/alurex/Alurex-GutterClean-M5300B95-WEB.png",
    category: "existing"
  }
];

export default function AlurexHomepageSection() {
  const [selectedProduct, setSelectedProduct] = useState<string>("doublepro");

  const currentProduct = productOptions.find(p => p.id === selectedProduct);

  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Seamless connection with services section above */}

      <div className="container mx-auto px-4">
        <AnimateOnScroll type="fadeIn" delay={0.2}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Product Display Area */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200">
                  {/* Interactive Product Selector */}
                  <div className="bg-yellow-400 p-6 text-center">
                    <div className="space-y-4">
                      {/* Need New Gutters Section */}
                      <div>
                        <h3 className="text-lg font-bold text-black mb-3">NEED NEW GUTTERS?</h3>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <button
                            onClick={() => setSelectedProduct("doublepro")}
                            className={`px-6 py-2 rounded border-2 transition-all ${
                              selectedProduct === "doublepro"
                                ? "bg-white text-black border-gray-400 shadow-md"
                                : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                            }`}
                          >
                            double⚫pro™
                          </button>
                          <button
                            onClick={() => setSelectedProduct("trex")}
                            className={`px-6 py-2 rounded border-2 transition-all ${
                              selectedProduct === "trex"
                                ? "bg-white text-black border-gray-400 shadow-md"
                                : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                            }`}
                          >
                            t⚫rex™
                          </button>
                        </div>
                      </div>

                      {/* Existing Clogged Gutters Section */}
                      <div>
                        <h3 className="text-lg font-bold text-black mb-3">EXISTING CLOGGED GUTTERS?</h3>
                        <button
                          onClick={() => setSelectedProduct("gutterclean")}
                          className={`px-6 py-2 rounded border-2 transition-all ${
                            selectedProduct === "gutterclean"
                              ? "bg-white text-black border-gray-400 shadow-md"
                              : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                          }`}
                        >
                          gutter⚫clean™
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Image Display */}
                  <div className="aspect-square bg-gray-100 p-8 flex items-center justify-center">
                    {currentProduct && (
                      <div className="relative w-full h-full">
                        <Image
                          src={currentProduct.image}
                          alt={`${currentProduct.name} continuous hanger system`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Alu-Rex Continuous Hanger™
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The Alu-Rex Continuous Hanger™ strengthens gutters from end to end, prevents sagging, 
                    supports heavy loads, and eliminates spikes for a cleaner, long-lasting, maintenance-free system.
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    *Alurex is our trusted partner providing premium gutter materials. Lacombe Gutters provides professional installation services.
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Lifetime Warranty</h4>
                      <p className="text-gray-600">Guaranteed durability for complete peace of mind</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Supports up to 450 lb per linear foot</h4>
                      <p className="text-gray-600">Exceptional strength along the entire gutter length</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Built-in leaf guard</h4>
                      <p className="text-gray-600">Prevents debris while maintaining optimal water flow</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link href="/alurex-gutter-systems">
                    <Button 
                      className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Learn More About Alurex Systems
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
