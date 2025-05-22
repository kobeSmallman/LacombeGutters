import { Variants } from 'framer-motion';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoomIn';

export const animationConfig = {
  // Default animation variants
  variants: {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    },
    slideUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 40 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: -40 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.8,
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
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    }
  } as Record<AnimationType, Variants>,
  
  // Stagger children animations
  staggerContainer: (staggerChildren = 0.1, delayChildren = 0.1): Variants => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }),
  
  // Default viewport settings
  viewport: {
    once: true,
    amount: 0.1,
  },
};
