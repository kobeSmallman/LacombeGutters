'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface Leaf {
  id: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
  type: 'maple' | 'oak' | 'birch';
  color: string;
  falling: boolean;
  velocity: number;
  sway: number;
  opacity: number;
}

interface LeafPileProps {
  onLeafClick?: (event?: React.MouseEvent) => void;
  className?: string;
}

export default function LeafPile({ 
  onLeafClick = () => {},
  className = '' 
}: LeafPileProps) {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const leafCreationTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isCreatingLeaves = useRef(true);
  const isBlowingAway = useRef(false);
  const containerRectRef = useRef<DOMRect | null>(null);
  const isMounted = useRef(true);
  const leafCreationEndTime = useRef(0);
  const lastFrameTime = useRef(0);
  const navigationTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Leaf colors and types
  const colors = useMemo(() => (['#d97706', '#b45309', '#ea580c', '#dc2626', '#ca8a04', '#a16207', '#92400e', '#9a3412'] as const), []);
  const leafTypes = useMemo(() => (['maple', 'oak', 'birch'] as const), []);

  // Create a new leaf with random properties
  const createLeaf = useCallback((containerRect: DOMRect): Leaf => {
    const size = Math.random() * 60 + 60; // 60-120px
    const leafType = leafTypes[Math.floor(Math.random() * leafTypes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = 0.9 + Math.random() * 0.1; // 0.9-1.0 opacity
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * (containerRect?.width * 1.5) - (containerRect?.width * 0.25),
      y: -size - (Math.random() * 200),
      rotation: Math.random() * 360,
      size,
      type: leafType,
      color,
      falling: true,
      velocity: Math.random() * 30 + 15, // 15-45
      sway: Math.random() * 2 + 1,
      opacity,
    };
  }, [colors, leafTypes]);
  
  // Add a single leaf
  const addLeaf = useCallback(() => {
    if (!containerRef.current || !isCreatingLeaves.current || !isMounted.current) {
      console.log('Skipping leaf creation - container not ready or not creating leaves');
      return;
    }
    
    const containerRect = containerRef.current.getBoundingClientRect();
    console.log('Adding leaf, container rect:', containerRect);
    
    setLeaves(prevLeaves => {
      // Limit to 100 leaves max for performance
      const maxLeaves = 100;
      const newLeaf = createLeaf(containerRect);
      console.log('Created new leaf:', newLeaf);
      const newLeaves = [...prevLeaves, newLeaf];
      return newLeaves.slice(-maxLeaves);
    });
  }, [createLeaf]);
  
  // Function to schedule next leaf addition
  const scheduleNextLeaf = useCallback(() => {
    if (!isMounted.current || !isCreatingLeaves.current) return;
    
    // Clear any existing timeout
    if (leafCreationTimeoutId.current) {
      clearTimeout(leafCreationTimeoutId.current);
      leafCreationTimeoutId.current = null;
    }
    
    // Add 1-2 leaves at a time
    const leavesToAdd = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < leavesToAdd; i++) {
      addLeaf();
    }
    
    // Check if we should stop
    if (Date.now() < leafCreationEndTime.current) {
      // Random interval between 300-800ms for better visibility
      const nextInterval = 300 + Math.random() * 500;
      leafCreationTimeoutId.current = setTimeout(scheduleNextLeaf, nextInterval);
    } else {
      isCreatingLeaves.current = false;
    }
  }, [addLeaf]);

  // Handle blow away animation
  const handleBlowAway = useCallback(() => {
    if (isBlowingAway.current) return;
    
    isBlowingAway.current = true;
    
    // Stop creating new leaves
    isCreatingLeaves.current = false;
    
    // Clear any pending leaf creation
    if (leafCreationTimeoutId.current) {
      clearTimeout(leafCreationTimeoutId.current);
      leafCreationTimeoutId.current = null;
    }
    
    // Clear any pending navigation
    if (navigationTimeoutId.current) {
      clearTimeout(navigationTimeoutId.current);
      navigationTimeoutId.current = null;
    }
    
    // Animate leaves blowing away
    setLeaves(prevLeaves => 
      prevLeaves.map(leaf => ({
        ...leaf,
        velocity: -Math.random() * 10 - 5, // Upward velocity
        rotation: leaf.rotation + (Math.random() * 20 - 10), // Random spin
        opacity: leaf.opacity * 0.95 // Slight fade
      }))
    );
    
    // Navigate after animation completes
    navigationTimeoutId.current = setTimeout(() => {
      if (isMounted.current) {
        window.location.href = '/contact';
      }
    }, 700);
  }, []);

  // Handle window resize to update container dimensions
  const handleResize = useCallback(() => {
    if (containerRef.current) {
      containerRectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  // Handle global blow away event
  const handleGlobalBlowAway = useCallback(() => {
    handleBlowAway();
  }, [handleBlowAway]);
  
  // Animation loop effect
  useEffect(() => {
    if (!isMounted.current) {
      console.log('Animation: Component not mounted, skipping animation setup');
      return;
    }
    
    console.log('Setting up animation loop');
    
    const animate = (timestamp: number) => {
      if (!isMounted.current) {
        console.log('Animation: Component unmounted, stopping animation');
        return;
      }
      
      // Calculate delta time for smooth animation
      const deltaTime = timestamp - (lastFrameTime.current || timestamp);
      lastFrameTime.current = timestamp;
      
      setLeaves(prevLeaves => {
        if (prevLeaves.length === 0) {
          console.log('No leaves to animate');
          return prevLeaves;
        }
        
        const containerHeight = containerRectRef.current?.height || window.innerHeight;
        const containerWidth = containerRectRef.current?.width || window.innerWidth;
        
        if (!containerHeight || !containerWidth) {
          console.warn('Container dimensions not available:', { containerHeight, containerWidth });
          return prevLeaves;
        }
        
        const updatedLeaves = prevLeaves.map((leaf) => {
          if (!leaf.falling) return leaf;
          
          const timeFactor = deltaTime / 16; // Normalize to 60fps
          let newY = leaf.y + (leaf.velocity * 0.1 * timeFactor);
          let newX = leaf.x + (Math.sin(timestamp * 0.001 * leaf.sway) * 0.5 * timeFactor);
          
          // Check if leaf hits bottom of container
          if (newY > containerHeight - leaf.size) {
            newY = containerHeight - leaf.size;
            return { ...leaf, y: newY, falling: false };
          }
          
          // Check if leaf goes out of bounds horizontally
          if (newX < -leaf.size * 2) newX = containerWidth + leaf.size;
          if (newX > containerWidth + leaf.size) newX = -leaf.size;
          
          return { 
            ...leaf, 
            x: newY < 0 ? leaf.x : newX, // Only update X if leaf is in viewport
            y: newY, 
            rotation: leaf.rotation + (0.5 * timeFactor) 
          };
        });
        
        // Log first leaf position for debugging
        if (updatedLeaves.length > 0) {
          console.log('First leaf position:', { x: updatedLeaves[0].x, y: updatedLeaves[0].y });
        }
        
        return updatedLeaves;
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    console.log('Starting animation loop');
    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
      console.log('Cleaning up animation loop');
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, []);
  
  // Define type for extended HTML element with blowAwayLeaves method
  interface ExtendedDivElement extends HTMLDivElement {
    blowAwayLeaves?: () => void;
  }

  // Initialize container and start animation
  useEffect(() => {
    const container = containerRef.current as ExtendedDivElement | null;
    if (container) {
      containerRectRef.current = container.getBoundingClientRect();
      
      // Expose blowAway function for external use
      container.blowAwayLeaves = handleBlowAway;
      
      // Start with a few leaves
      const initialLeaves = Array.from({ length: 5 }, () => 
        createLeaf(containerRectRef.current!)
      );
      setLeaves(initialLeaves);
      
      // Start leaf generation
      scheduleNextLeaf();
    }
  }, [createLeaf, scheduleNextLeaf, handleBlowAway]);

  // Set up the leaf pile effect
  useEffect(() => {
    if (!containerRef.current) {
      console.error('Container ref is null');
      return;
    }
    
    // Set initial container dimensions
    containerRectRef.current = containerRef.current.getBoundingClientRect();
    console.log('LeafPile mounted, container rect:', containerRectRef.current);
    
    // Set end time for leaf generation (30 seconds from now)
    leafCreationEndTime.current = Date.now() + 30000;
    
    // Start with a few leaves
    const initialLeaves = Array.from({ length: 5 }, () => createLeaf(containerRectRef.current!));
    console.log('Initial leaves:', initialLeaves);
    setLeaves(initialLeaves);
    
    // Start the continuous leaf generation after a short delay
    const initialDelay = 500; // Start after 0.5s
    console.log('Scheduling next leaf in', initialDelay, 'ms');
    leafCreationTimeoutId.current = setTimeout(() => {
      console.log('Initial timeout fired, scheduling next leaf');
      scheduleNextLeaf();
    }, initialDelay);
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('blowAwayLeaves', handleGlobalBlowAway);
    
    // Cleanup function
    return () => {
      // Mark as unmounted to prevent state updates
      isMounted.current = false;
      
      // Clear any pending timeouts
      if (leafCreationTimeoutId.current) {
        clearTimeout(leafCreationTimeoutId.current);
        leafCreationTimeoutId.current = null;
      }
      
      // Clear navigation timeout
      if (navigationTimeoutId.current) {
        clearTimeout(navigationTimeoutId.current);
        navigationTimeoutId.current = null;
      }
      
      // Cancel any pending animation frame
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('blowAwayLeaves', handleGlobalBlowAway);
      
      // Reset state
      isCreatingLeaves.current = false;
      isBlowingAway.current = false;
      
      // Clear leaves array
      setLeaves([]);
    };
  }, [createLeaf, handleBlowAway, handleGlobalBlowAway, handleResize, scheduleNextLeaf]);
  
  // Handle leaf click from parent component
  const handleLeafClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    if (isBlowingAway.current) return;
    isBlowingAway.current = true;
    handleBlowAway();
    onLeafClick();
  }, [handleBlowAway, onLeafClick]);
  
  // Set up click event listener
  useEffect(() => {
    if (!onLeafClick) return;
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleLeafClick);
      return () => {
        container.removeEventListener('click', handleLeafClick);
      };
    }
  }, [handleLeafClick, onLeafClick]);

  // Render a single leaf - no external dependencies so no need for useCallback
  const renderLeaf = (leaf: Leaf) => {
    const style: React.CSSProperties = {
      left: `${leaf.x}px`,
      top: `${leaf.y}px`,
      transform: `rotate(${leaf.rotation}deg)`,
      width: `${leaf.size}px`,
      height: 'auto',
      opacity: leaf.opacity,
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 1, // Keep leaves in background
      transition: 'transform 0.2s ease-out, opacity 0.5s ease-out',
    };

    let leafSvg;
    switch(leaf.type) {
      case 'maple':
        leafSvg = (
          <svg viewBox="0 0 100 100" className="leaf-svg">
            <path d="M50 5 C60 15, 70 10, 75 20 C80 30, 85 25, 90 30 C95 35, 95 45, 85 55 C95 65, 95 75, 85 85 C75 95, 65 95, 50 80 C35 95, 25 95, 15 85 C5 75, 5 65, 15 55 C5 45, 5 35, 10 30 C15 25, 20 30, 25 20 C30 10, 40 15, 50 5 Z" 
                  fill={leaf.color} />
          </svg>
        );
        break;
      case 'oak':
        leafSvg = (
          <svg viewBox="0 0 100 100" className="leaf-svg">
            <path d="M50 5 C60 30, 90 20, 90 40 C90 60, 75 65, 75 85 C75 95, 60 95, 50 85 C40 95, 25 95, 25 85 C25 65, 10 60, 10 40 C10 20, 40 30, 50 5 Z" 
                  fill={leaf.color} />
          </svg>
        );
        break;
      default: // birch
        leafSvg = (
          <svg viewBox="0 0 100 100" className="leaf-svg">
            <path d="M50 5 C60 20, 80 15, 85 30 C90 45, 80 55, 75 70 C70 85, 60 90, 50 85 C40 90, 30 85, 25 70 C20 55, 10 45, 15 30 C20 15, 40 20, 50 5 Z" 
                  fill={leaf.color} />
          </svg>
        );
    }

    return (
      <div 
        key={leaf.id} 
        style={style}
        className="transition-all duration-200 hover:scale-110 hover:z-50"
      >
        {leafSvg}
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`leaf-pile-container fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        zIndex: 10,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 100%)',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        position: 'fixed' as const
      }}
    >
      {leaves.map(renderLeaf)}
    </div>
  );
}
