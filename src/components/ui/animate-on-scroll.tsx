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

export default function AnimateOnScroll({
  children,
  type = 'fadeIn',
  delay = 0,
  duration = 0.6,
  className = ''
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { 
    margin: '0px 0px -10% 0px', 
    once: true 
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={animationVariants[type]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ 
        duration, 
        delay, 
        ease: 'easeOut' 
      }}
    >
      {children}
    </motion.div>
  );
}