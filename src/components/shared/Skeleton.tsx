const SkeletonCard = () => (
  <div className="rounded-2xl border border-border bg-card p-5 space-y-3 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <div className="h-3 w-20 bg-muted rounded" />
        <div className="h-7 w-16 bg-muted rounded" />
      </div>
      <div className="w-11 h-11 rounded-xl bg-muted" />
    </div>
  </div>
);

const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-4 border-b border-border last:border-0 animate-pulse">
    <div className="h-4 w-12 bg-muted rounded" />
    <div className="h-4 w-28 bg-muted rounded" />
    <div className="h-4 w-20 bg-muted rounded flex-1" />
    <div className="h-6 w-16 bg-muted rounded-full" />
  </div>
);

const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="rounded-2xl border border-border bg-card overflow-hidden">
    <div className="bg-muted/40 p-4 flex gap-4 animate-pulse">
      <div className="h-3 w-12 bg-muted rounded" />
      <div className="h-3 w-20 bg-muted rounded" />
      <div className="h-3 w-16 bg-muted rounded" />
      <div className="h-3 w-14 bg-muted rounded" />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <SkeletonRow key={i} />
    ))}
  </div>
);

export { SkeletonCard, SkeletonRow, SkeletonTable };
