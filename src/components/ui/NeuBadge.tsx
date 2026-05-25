import { cn } from "@/lib/utils";

interface NeuBadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  default: 'bg-secondary text-secondary-foreground',
  success: 'bg-success/15 text-success border-success/20',
  warning: 'bg-accent/15 text-accent border-accent/20',
  danger: 'bg-destructive/15 text-destructive border-destructive/20',
  info: 'bg-primary/15 text-primary border-primary/20',
};

export function NeuBadge({ variant = 'default', children, className }: NeuBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border',
      variantStyles[variant],
      className
    )}>
      {children}
    </span>
  );
}
