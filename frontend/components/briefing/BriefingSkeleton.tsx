export default function BriefingSkeleton() {
  return (
    <div className="p-6 animate-pulse" data-testid="briefing-skeleton">
      <div className="h-8 bg-white/10 rounded w-2/3 mb-4" />
      <div className="h-4 bg-white/10 rounded w-full mb-2" />
      <div className="h-4 bg-white/10 rounded w-5/6 mb-2" />
      <div className="h-4 bg-white/10 rounded w-4/5 mb-6" />
      <div className="h-5 bg-white/10 rounded w-32 mb-3" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-4 bg-white/10 rounded w-full mb-2" />
      ))}
      <div className="h-5 bg-white/10 rounded w-40 mt-6 mb-3" />
      <div className="h-4 bg-white/10 rounded w-full mb-2" />
      <div className="h-4 bg-white/10 rounded w-3/4" />
    </div>
  );
}
