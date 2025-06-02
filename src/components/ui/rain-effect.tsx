'use client';

import { useEffect, useRef } from 'react';

export default function RainEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const container = containerRef.current;
    if (!container) return;

    // Create rain container
    const rainContainer = document.createElement('div');
    rainContainer.style.position = 'absolute';
    rainContainer.style.top = '0';
    rainContainer.style.left = '0';
    rainContainer.style.width = '100%';
    rainContainer.style.height = '100%';
    rainContainer.style.overflow = 'hidden';
    rainContainer.style.pointerEvents = 'none';
    
    // Create rain layers
    const rainLayers = [
      { count: 80, speed: 1.5, opacity: 0.6 }, // Front layer - fast and visible
      { count: 50, speed: 1, opacity: 0.4 },   // Middle layer
      { count: 30, speed: 0.7, opacity: 0.3 }   // Back layer - slow and subtle
    ];

    // Create rain drops for each layer
    rainLayers.forEach((layer) => {
      const layerEl = document.createElement('div');
      layerEl.style.position = 'absolute';
      layerEl.style.top = '0';
      layerEl.style.left = '0';
      layerEl.style.width = '100%';
      layerEl.style.height = '100%';
      layerEl.style.pointerEvents = 'none';
      
      // Create drops for this layer
      for (let i = 0; i < layer.count; i++) {
        const drop = document.createElement('div');
        drop.style.position = 'absolute';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.top = `${-50}px`; // Start above the viewport
        drop.style.width = '1px';
        drop.style.height = `${20 + Math.random() * 20}px`;
        drop.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        drop.style.pointerEvents = 'none';
        drop.style.opacity = layer.opacity.toString();
        
        // Animation
        const duration = 0.5 + Math.random() * layer.speed;
        const delay = Math.random() * 5;
        drop.style.animation = `rain ${duration}s linear ${delay}s infinite`;
        
        layerEl.appendChild(drop);
      }
      
      rainContainer.appendChild(layerEl);
    });

    // Add rain container to the DOM
    container.appendChild(rainContainer);

    // Create splash effect
    const splash = document.createElement('div');
    splash.style.position = 'absolute';
    splash.style.bottom = '0';
    splash.style.left = '0';
    splash.style.width = '100%';
    splash.style.height = '20%';
    splash.style.background = 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 30%, transparent 70%)';
    splash.style.pointerEvents = 'none';
    splash.style.zIndex = '2';
    rainContainer.appendChild(splash);

    // Add keyframes for rain animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rain {
        0% {
          transform: translateY(-100%);
          opacity: 0;
        }
        10% {
          opacity: ${0.7};
        }
        90% {
          opacity: ${0.7};
        }
        100% {
          transform: translateY(100vh);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      if (container.contains(rainContainer)) {
        container.removeChild(rainContainer);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
}
