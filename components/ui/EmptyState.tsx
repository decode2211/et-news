"use client";

interface EmptyStateProps {
  message: string;
  onRetry?: () => void;
}

export default function EmptyState({ message, onRetry }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
        <span className="text-text-secondary text-lg">◇</span>
      </div>
      <div>
        <p className="text-text-primary text-sm font-medium mb-1">{message}</p>
        <p className="text-text-secondary text-xs">We're learning your preferences</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-card border border-border text-text-primary text-sm rounded-lg hover:border-accent/40 transition-colors"
        >
          Refresh
        </button>
      )}
    </div>
  );
}
