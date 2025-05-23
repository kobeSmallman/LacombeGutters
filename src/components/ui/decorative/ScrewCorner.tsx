import React from 'react';

type ScrewCornerProps = {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

export const ScrewCorner: React.FC<ScrewCornerProps> = ({ position }) => {
  const positionClasses = {
    'top-left': 'top-0 left-0 -rotate-45',
    'top-right': 'top-0 right-0 rotate-45',
    'bottom-left': 'bottom-0 left-0 -rotate-135',
    'bottom-right': 'bottom-0 right-0 rotate-135',
  };

  return (
    <div className={`absolute ${positionClasses[position]} w-5 h-5 pointer-events-none`}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary w-full h-full"
      >
        {/* Circular screw head only - removed all lines */}
        <circle 
          cx="12" 
          cy="12" 
          r="4" 
          fill="currentColor" 
        />
        <path 
          d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z" 
          fill="#888888" 
        />
      </svg>
    </div>
  );
};
