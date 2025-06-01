import { cn } from "@/lib/utils";

interface ScrewCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export const ScrewCorner: React.FC<ScrewCornerProps> = ({ position, className }) => {
  const positionClasses = {
    'top-left': 'top-0 left-0 -rotate-45',
    'top-right': 'top-0 right-0 rotate-45',
    'bottom-left': 'bottom-0 left-0 -rotate-135',
    'bottom-right': 'bottom-0 right-0 rotate-135',
  };

  return (
    <div 
      className={cn(
        'absolute w-5 h-5 pointer-events-none',
        positionClasses[position],
        className
      )}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="text-primary w-full h-full"
      >
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <path 
          d="M12 2V22M12 2L15 5M12 2L9 5M12 22L9 19M12 22L15 19M2 12H22M2 12L5 9M2 12L5 15M22 12L19 9M22 12L19 15" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
