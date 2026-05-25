export function SkeletonCard() {
  return (
    <div className="neu-card p-5 animate-pulse space-y-3">
      <div className="h-4 bg-muted rounded w-2/3" />
      <div className="h-3 bg-muted rounded w-1/2" />
      <div className="h-8 bg-muted rounded w-1/3" />
    </div>
  );
}
