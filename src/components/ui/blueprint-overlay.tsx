import React from 'react';

interface BlueprintOverlayProps {
  className?: string;
  opacity?: number;
}

export const BlueprintOverlay: React.FC<BlueprintOverlayProps> = ({
  className = '',
  opacity = 0.03,
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
      aria-hidden="true"
    />
  );
};
