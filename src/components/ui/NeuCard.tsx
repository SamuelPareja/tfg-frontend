import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface NeuCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'small' | 'inset';
  glow?: 'none' | 'primary' | 'success' | 'accent';
}

const NeuCard = forwardRef<HTMLDivElement, NeuCardProps>(
  ({ className, variant = 'default', glow = 'none', children, ...props }, ref) => {
    const variantClass = {
      default: 'neu-card',
      small: 'neu-card-sm',
      inset: 'neu-inset',
    }[variant];

    const glowClass = {
      none: '',
      primary: 'glow-primary',
      success: 'glow-success',
      accent: 'glow-accent',
    }[glow];

    return (
      <div ref={ref} className={cn(variantClass, glowClass, 'p-5', className)} {...props}>
        {children}
      </div>
    );
  }
);
NeuCard.displayName = "NeuCard";

export { NeuCard };
