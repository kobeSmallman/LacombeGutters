"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dialog = ({ children, open, onOpenChange }: DialogProps) => {
  const [isOpen, setIsOpen] = React.useState(open || false);
  
  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (state: boolean) => {
    setIsOpen(state);
    onOpenChange?.(state);
  };

  return (
    <React.Fragment>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{
            isOpen?: boolean;
            onOpenChange?: (open: boolean) => void;
          }>, {
            isOpen,
            onOpenChange: handleOpenChange
          });
        }
        return child;
      })}
    </React.Fragment>
  );
};

const DialogTrigger = ({ 
  children, 
  asChild, 
  isOpen, 
  onOpenChange 
}: { 
  children: React.ReactNode; 
  asChild?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenChange?.(!isOpen);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{
      onClick?: (e: React.MouseEvent) => void;
    }>, {
      onClick: handleClick
    });
  }

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
};

const DialogContent = ({ 
  children, 
  className, 
  isOpen, 
  onOpenChange,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { 
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onOpenChange?.(false);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" 
      onClick={handleBackdropClick}
    >
      <div 
        className={cn(
          "relative bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-6 shadow-lg",
          className
        )}
        onClick={handleContentClick}
        {...props}
      >
        <button 
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none" 
          onClick={() => onOpenChange?.(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
};

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);

const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn(
      "text-sm text-gray-500 dark:text-gray-400",
      className
    )}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
};
