'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { GalleryItem } from '@/types/gallery';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  item: GalleryItem | null;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function Lightbox({ isOpen, onClose, item, onNext, onPrev, hasNext, hasPrev }: LightboxProps) {
  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-xl bg-gray-900"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation arrows */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Main image */}
          <div className="relative w-full h-[70vh]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Info panel */}
          <div className="p-6 bg-gray-900 border-t border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                <div className="flex items-center mt-1 text-gray-300">
                  <span>{item.location}</span>
                  <span className="mx-2">•</span>
                  <span>{item.year}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.materials.map((material, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-gray-800 text-gray-200"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-gray-300">{item.description}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
