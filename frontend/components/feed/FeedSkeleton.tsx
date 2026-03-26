export default function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-3" data-testid="feed-skeleton">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse" data-testid="skeleton-card">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="h-4 bg-white/8 rounded w-2/3" />
            <div className="h-6 bg-white/8 rounded-full w-20 shrink-0" />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="h-3 bg-white/8 rounded w-16" />
            <div className="h-3 bg-white/8 rounded w-16" />
            <div className="h-3 bg-white/8 rounded w-24" />
          </div>
          <div className="h-3 bg-white/8 rounded w-full mb-2" />
          <div className="h-3 bg-white/8 rounded w-4/5 mb-4" />
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="h-5 bg-white/8 rounded w-14" />
              <div className="h-5 bg-white/8 rounded w-14" />
            </div>
            <div className="h-4 bg-white/8 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
