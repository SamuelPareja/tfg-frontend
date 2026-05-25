import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface NeuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const NeuButton = forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const base = variant === 'primary' ? 'neu-button-primary' : variant === 'ghost' ? '' : 'neu-button';
    const sizeClass = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
    }[size];

    return (
      <button
        ref={ref}
        className={cn(
          base,
          sizeClass,
          'font-display font-semibold tracking-wide transition-all duration-200 cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variant === 'ghost' && 'text-muted-foreground hover:text-foreground',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
NeuButton.displayName = "NeuButton";

export { NeuButton };
