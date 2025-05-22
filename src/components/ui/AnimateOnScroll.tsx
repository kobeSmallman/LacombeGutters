"use client"

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoomIn';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: "easeOut"
      }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }
};

function AnimateOnScroll({
  children,
  type = 'fadeIn',
  delay = 0,
  duration = 0.9,
  className = '',
  threshold = 0.1,
  once = true
}: AnimateOnScrollProps) {
  const controls = useRef<HTMLDivElement>(null);
  const isInView = useInView(controls, { 
    amount: threshold,
    once: once
  });

  const baseVariants = animationVariants[type];
  
  const customVariants: Variants = {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(baseVariants.visible as { transition?: Record<string, unknown> }).transition,
        delay,
        duration
      }
    }
  };

  return (
    <motion.div
      ref={controls}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimateOnScroll;