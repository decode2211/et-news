"use client";

import { motion } from "framer-motion";
import type { NewsItem } from "@/types";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  item: NewsItem;
  onClick: (id: string) => void;
}

const sentimentConfig = {
  positive: { label: "Positive", color: "text-positive", bg: "bg-positive/10 border-positive/20", dot: "bg-positive shadow-[0_0_6px_rgba(16,185,129,0.6)]" },
  negative: { label: "Negative", color: "text-negative", bg: "bg-negative/10 border-negative/20", dot: "bg-negative shadow-[0_0_6px_rgba(239,68,68,0.6)]"  },
  neutral:  { label: "Neutral",  color: "text-accent",   bg: "bg-accent/10 border-accent/20",     dot: "bg-accent shadow-[0_0_6px_rgba(139,92,246,0.6)]"  },
};

const impactConfig = {
  high:   { label: "High",   color: "text-negative", bar: "bg-negative" },
  medium: { label: "Medium", color: "text-warning",  bar: "bg-warning"  },
  low:    { label: "Low",    color: "text-positive", bar: "bg-positive" },
};

export default function NewsCard({ item, onClick }: NewsCardProps) {
  const s = sentimentConfig[item.sentiment];
  const imp = impactConfig[item.impact];

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 40px rgba(139,92,246,0.12)" }}
      transition={{ duration: 0.15 }}
      onClick={() => onClick(item.id)}
      data-testid="news-card"
      className="glass rounded-2xl p-5 cursor-pointer hover:border-accent/20 transition-all duration-200"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-text-primary font-semibold text-sm leading-snug line-clamp-2 flex-1">
          {item.title}
        </h3>
        <span className={cn(
          "shrink-0 flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border",
          s.bg, s.color
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dot)} />
          {s.label}
        </span>
      </div>

      {/* Summary */}
      <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 mb-4">
        {item.summary}
      </p>

      {/* Metrics row */}
      <div className="flex items-center gap-5 mb-4">
        <div>
          <p className="text-[9px] font-bold tracking-widest text-text-muted uppercase mb-0.5">Category</p>
          <p className="text-text-secondary text-xs">{item.category}</p>
        </div>
        <div>
          <p className="text-[9px] font-bold tracking-widest text-text-muted uppercase mb-0.5">Impact</p>
          <p className={cn("text-xs font-semibold", imp.color)}>{imp.label}</p>
        </div>
        <div>
          <p className="text-[9px] font-bold tracking-widest text-text-muted uppercase mb-0.5">Entities</p>
          <p className="text-text-secondary text-xs truncate max-w-[100px]">
            {item.entities.slice(0, 2).join(", ") || "—"}
          </p>
        </div>
        {/* Impact bar */}
        <div className="ml-auto flex items-center gap-1.5">
          {["high", "medium", "low"].map((lvl) => (
            <div
              key={lvl}
              className={cn(
                "w-1 rounded-full transition-all",
                item.impact === "high"   && lvl === "high"   ? "h-5 bg-negative" :
                item.impact === "medium" && lvl !== "low"    ? "h-4 bg-warning"  :
                item.impact === "low"    && lvl === "low"    ? "h-3 bg-positive" :
                "h-2 bg-white/10"
              )}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {item.entities.slice(0, 3).map((e) => (
            <span key={e} className="text-[10px] bg-white/4 border border-border/50 text-text-secondary px-2 py-0.5 rounded-lg">
              {e}
            </span>
          ))}
        </div>
        <span className="text-accent text-xs font-medium opacity-70 hover:opacity-100 transition-opacity">
          Briefing →
        </span>
      </div>
    </motion.div>
  );
}
