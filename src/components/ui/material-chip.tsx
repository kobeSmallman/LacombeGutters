import React from 'react';

interface MaterialChipProps {
  material: string;
  className?: string;
}

export const MaterialChip: React.FC<MaterialChipProps> = ({ 
  material, 
  className = '' 
}) => {
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 border border-amber-200 ${className}`}
    >
      {material}
    </span>
  );
};
