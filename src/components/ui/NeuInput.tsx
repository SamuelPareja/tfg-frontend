import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface NeuInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const NeuInput = forwardRef<HTMLInputElement, NeuInputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-xs font-display font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'neu-inset w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
NeuInput.displayName = "NeuInput";

export { NeuInput };
