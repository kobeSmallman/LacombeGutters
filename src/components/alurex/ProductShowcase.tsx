"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AnimateOnScroll from '@/components/ui/animate-on-scroll';
import VideoModal from '@/components/alurex/VideoModal';


interface Product {
  id: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  strength: string;
  features: string[];
  specs: string[];
  image: string;
  videoId: string;
  videoProvider: 'vimeo' | 'youtube';
  videoTitle: string;
}

const products: Product[] = [
  {
    id: 'doublepro',
    name: 'DoublePro®',
    fullName: 'DoublePro® Microfiltration Continuous Hanger™',
    tagline: 'Next-Gen Gutter System',
    description: 'The DoublePro® combines the strength of the Continuous Hanger™ with the benefits of a microfiltration leaf guard, placing it at the forefront of the market by offering the most advanced technologies in gutter systems. Its unique design features two layers of ingeniously perforated industrial-grade aluminum, preventing even the finest debris from entering the gutter while ensuring rainwater flows away from your home. Furthermore, its exceptional strength is ensured by its Continuous Hanger™, allowing it to support up to 425lb per linear foot along the entire length of the gutter. We highly recommend that all our customers consider the advantages of this revolutionary Alu-Rex product before making a final decision on their gutter system.',
    strength: '425 lb per linear foot',
    features: ['Dual-layer perforated aluminum', 'Micro-filtration leaf guard', 'Continuous hanger support'],
    specs: ['425 lb/ft load capacity', 'Dual-layer aluminum construction', 'Micro-perforated filtration', 'Lifetime warranty'],
    image: '/images/alurex/Alurex-DoublePro-D11500-WEB.png',
    videoId: '340465756',
    videoProvider: 'vimeo',
    videoTitle: 'DoublePro® Microfiltration System Demo'
  },
  {
    id: 'trex',
    name: 'T-Rex®',
    fullName: 'T-Rex® Continuous Hanger™',
    tagline: 'Ultra-Durable Gutter System',
    description: 'Our gutter installation experts have made T-Rex® their standard for fastening gutters, thus establishing a high-quality standard. With a design featuring an integrated continuous hanger™, this product stands out for its ability to support up to 250 lb per linear foot, ensuring optimal gutter stability along its entire length. Its durability is guaranteed for life, providing our customers with absolute peace of mind regarding its unparalleled strength. Opting for T-Rex means choosing a gutter solution that is not only reliable and resilient but also ensures peace of mind.',
    strength: '250 lb per linear foot',
    features: ['Integrated continuous hanger', 'Lifetime durability', 'Professional installation'],
    specs: ['250 lb/ft load capacity', 'Integrated hanger design', 'Lifetime durability guarantee', 'Professional installation'],
    image: '/images/alurex/Alurex-Trex-M5200B95-WEB.png',
    videoId: '782629148',
    videoProvider: 'vimeo',
    videoTitle: 'T-Rex® Continuous Hanger System Features'
  }
];

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<string>('doublepro');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{id: string, provider: 'vimeo' | 'youtube', title: string} | null>(null);

  const currentProduct = products.find(p => p.id === selectedProduct);

  const handleVideoClick = (videoId: string, provider: 'vimeo' | 'youtube', title: string) => {
    setCurrentVideo({ id: videoId, provider, title });
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <>
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateOnScroll type="fadeIn" delay={0.2}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-primary">
                  Gutter Hanger Systems
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Choose from our premium Alurex continuous hanger systems, each designed for different needs and applications
                </p>
              </div>

              {/* Product Selection Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedProduct === product.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {product.name}
                  </button>
                ))}
              </div>

              {/* Product Display */}
              {currentProduct && (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Product Image */}
                    <div className="relative bg-gray-50 p-8 lg:p-12">
                      <div className="relative aspect-square max-w-md mx-auto">
                        <Image
                          src={currentProduct.image}
                          alt={`${currentProduct.name} continuous hanger system`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      
                      {/* Video Play Button */}
                      <div className="absolute bottom-8 right-8">
                        <button
                          onClick={() => handleVideoClick(currentProduct.videoId, currentProduct.videoProvider, currentProduct.videoTitle)}
                          className="group bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-110"
                        >
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-8 lg:p-12">
                      <div className="space-y-6">
                        <div>
                          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                            {currentProduct.tagline}
                          </div>
                          
                          {/* Product Logo */}
                          <div className="mb-4">
                            <Image
                              src={`/images/alurex/LogoBlack-${currentProduct.name.replace('®', '')}.png`}
                              alt={`${currentProduct.name} Logo`}
                              width={150}
                              height={50}
                              className="object-contain"
                            />
                          </div>
                          
                          <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            {currentProduct.fullName}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {currentProduct.description}
                          </p>
                        </div>

                        {/* Strength Highlight */}
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Load Capacity</div>
                              <div className="text-2xl font-bold text-primary">{currentProduct.strength}</div>
                            </div>
                          </div>
                        </div>

                        {/* Specifications */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Specifications</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentProduct.specs.map((spec, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                          <Link href="/contact" className="flex-1">
                            <Button 
                              size="lg" 
                              className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                              Request Installation Quote
                            </Button>
                          </Link>
                          <button
                            onClick={() => handleVideoClick(currentProduct.videoId, currentProduct.videoProvider, currentProduct.videoTitle)}
                            className="flex-1 group inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                          >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            Watch Demo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-16 text-center">
                <p className="text-lg text-gray-600 mb-6">
                  We highly recommend that all our customers consider the advantages of these revolutionary 
                  Alurex products before making a final decision on their gutter system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Compare All Systems
                    </Button>
                  </Link>
                  <Link href="tel:+14035989137">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg font-semibold transition-all duration-300"
                    >
                      Speak with Expert
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoId={currentVideo?.id || ''}
        provider={currentVideo?.provider || 'vimeo'}
        title={currentVideo?.title || ''}
      />
    </>
  );
}
