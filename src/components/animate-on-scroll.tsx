'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type AnimateOnScrollProps = {
  children: React.ReactNode;
  type?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoomIn';
  delay?: number;
  className?: string;
  duration?: number;
  threshold?: number;
};

export function AnimateOnScroll({
  children,
  type = 'fadeIn',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = '',
}: AnimateOnScrollProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: type === 'fadeIn' || type === 'zoomIn' ? 0 : 1,
      y: type === 'slideUp' ? 50 : type === 'slideDown' ? -50 : 0,
      x: type === 'slideLeft' ? 50 : type === 'slideRight' ? -50 : 0,
      scale: type === 'zoomIn' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
