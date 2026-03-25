import type { Briefing } from "@/types";

interface BriefingViewProps {
  briefing: Briefing;
}

export default function BriefingView({ briefing }: BriefingViewProps) {
  return (
    <article className="px-6 py-6 max-w-2xl" data-testid="briefing-view">
      {/* Header */}
      <div className="mb-6 pb-5 border-b border-border">
        <p className="text-[10px] font-semibold tracking-widest text-text-secondary/50 uppercase mb-2">
          AI Briefing
        </p>
        <h1 className="text-xl font-semibold text-text-primary leading-snug">
          {briefing.title}
        </h1>
      </div>

      {/* Summary highlight box */}
      <div className="bg-accent/8 border border-accent/20 rounded-xl p-4 mb-6">
        <p className="text-[10px] font-semibold tracking-widest text-accent/70 uppercase mb-2">Summary</p>
        <p className="text-text-primary/90 text-sm leading-relaxed">{briefing.summary}</p>
      </div>

      {/* Key points */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold tracking-widest text-text-secondary/50 uppercase mb-3">
          Key Points
        </p>
        <div className="flex flex-col gap-2">
          {briefing.keyPoints.map((point, i) => (
            <div key={i} className="flex gap-3 bg-card border border-border rounded-lg px-4 py-3">
              <span className="text-accent text-xs mt-0.5 shrink-0">◈</span>
              <p className="text-text-secondary text-sm leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact analysis */}
      <div>
        <p className="text-[10px] font-semibold tracking-widest text-text-secondary/50 uppercase mb-3">
          Impact Analysis
        </p>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-text-secondary text-sm leading-relaxed">{briefing.impactAnalysis}</p>
        </div>
      </div>
    </article>
  );
}
