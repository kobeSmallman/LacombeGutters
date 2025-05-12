import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider font-bold relative overflow-hidden",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90 hover:shadow-lg border-2 border-transparent hover:border-white/10",
        secondary: "bg-secondary text-primary hover:bg-secondary/90 hover:shadow-lg border-2 border-transparent hover:border-primary/10",
        ghost: "hover:bg-neutral-light hover:text-primary border-2",
        outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary/10",
        constructionYellow: "bg-yellow-500 text-black border-2 border-black hover:bg-yellow-400",
        constructionGray: "bg-gray-800 text-white border-2 border-gray-900 hover:bg-gray-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-3 py-2 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-8 py-3 text-lg",
        xl: "h-14 px-10 py-4 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
