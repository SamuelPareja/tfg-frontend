import { cn } from "@/lib/utils";

interface FormResultProps {
  results: string[];
}

const resultColor: Record<string, string> = {
  W: 'bg-success text-success-foreground',
  D: 'bg-accent text-accent-foreground',
  L: 'bg-destructive text-destructive-foreground',
};

export function FormResult({ results }: FormResultProps) {
  return (
    <div className="flex gap-1">
      {results.map((r, i) => (
        <span key={i} className={cn('w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold', resultColor[r] || 'bg-muted text-muted-foreground')}>
          {r}
        </span>
      ))}
    </div>
  );
}
