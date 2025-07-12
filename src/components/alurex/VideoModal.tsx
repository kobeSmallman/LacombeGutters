"use client";

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  provider: 'vimeo' | 'youtube';
  title: string;
}

export default function VideoModal({ isOpen, onClose, videoId, provider, title }: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getVideoEmbedUrl = () => {
    if (provider === 'vimeo') {
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&color=215e7d&title=0&byline=0&portrait=0`;
    } else {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={getVideoEmbedUrl()}
            title={title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            Interested in this system? 
            <Link href="/contact" className="text-primary hover:underline ml-1">
              Contact us for a free installation quote
            </Link>
          </p>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}
