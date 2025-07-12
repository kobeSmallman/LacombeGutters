'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


const products = [
  {
    id: 'doublepro',
    name: 'DoublePro™ System',
    description: 'Pine needle protection with continuous hanger',
    image: '/images/Alurex/doublepro-protection-pine.jpg',
    active: true
  },
  {
    id: 'trex',
    name: 'T-Rex® System', 
    description: 'Heavy-duty continuous hanger for extreme conditions',
    image: '/images/alurex/Alurex-Trex-M5200B95-WEB.png',
    active: false
  },
  {
    id: 'hanger',
    name: 'Continuous Hanger',
    description: 'Structural reinforcement along entire gutter length', 
    image: '/images/alurex/Alurex-DoublePro-D11500-WEB.png',
    active: false
  }
];

export default function InteractiveProductShowcase() {
  const [activeProduct, setActiveProduct] = useState('doublepro');
  const currentProduct = products.find(p => p.id === activeProduct) || products[0];

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Interactive Image Display */}
      <div className="relative">
        <div className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden">
          <Image
            src={currentProduct.image}
            alt="Alurex Product Showcase"
            fill
            className="object-cover transition-all duration-500"
            sizes="50vw"
          />
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Discover Our Systems</h3>
        
        {/* Product Buttons */}
        <div className="space-y-4">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveProduct(product.id)}
              className={`w-full text-left p-4 bg-white border-2 rounded-lg hover:bg-blue-50 hover:border-blue-600 transition-all duration-300 group ${
                activeProduct === product.id 
                  ? 'border-blue-600' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
                <svg 
                  className={`w-5 h-5 ${
                    activeProduct === product.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Ready to upgrade your gutters?</h4>
          <p className="text-gray-600 mb-4">Get a free consultation and quote for professional Alurex installation.</p>
          <Link href="/contact">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Get Free Quote
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
