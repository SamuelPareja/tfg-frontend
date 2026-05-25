import { cn } from "@/lib/utils";

interface ConfidenceMeterProps {
  value: number;
  size?: 'sm' | 'md';
}

export function ConfidenceMeter({ value, size = 'md' }: ConfidenceMeterProps) {
  const color = value >= 70 ? 'bg-success' : value >= 50 ? 'bg-accent' : 'bg-primary';
  const h = size === 'sm' ? 'h-1.5' : 'h-2';

  return (
    <div className="flex items-center gap-2">
      <div className={cn('flex-1 rounded-full overflow-hidden neu-inset', h)}>
        <div className={cn('h-full rounded-full transition-all duration-500', color)} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-display font-semibold text-muted-foreground">{value}%</span>
    </div>
  );
}
