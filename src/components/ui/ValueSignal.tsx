import { cn } from "@/lib/utils";

interface ValueSignalProps {
  level: 'high' | 'medium' | 'low' | 'none';
  showLabel?: boolean;
}

export function ValueSignal({ level, showLabel = true }: ValueSignalProps) {
  const config = {
    high: { color: 'bg-success', glow: 'shadow-[0_0_8px_hsl(150_60%_50%/0.4)]', label: 'Alto valor' },
    medium: { color: 'bg-accent', glow: 'shadow-[0_0_8px_hsl(40_80%_55%/0.3)]', label: 'Valor medio' },
    low: { color: 'bg-primary', glow: '', label: 'Bajo valor' },
    none: { color: 'bg-muted-foreground/30', glow: '', label: 'Sin señal' },
  }[level];

  return (
    <div className="flex items-center gap-2">
      <div className={cn('w-2.5 h-2.5 rounded-full', config.color, config.glow)} />
      {showLabel && <span className="text-xs text-muted-foreground">{config.label}</span>}
    </div>
  );
}
