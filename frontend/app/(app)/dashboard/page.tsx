"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import useUserStore from "@/store/userStore";
import NewsFeed from "@/components/feed/NewsFeed";

const SentimentLineChart = dynamic(() => import("@/components/charts/SentimentLineChart"), { ssr: false });
const TopicDonutChart    = dynamic(() => import("@/components/charts/TopicDonutChart"),    { ssr: false });
const VolumeBarChart     = dynamic(() => import("@/components/charts/VolumeBarChart"),     { ssr: false });

const stats = [
  { label: "Stories Today",   value: "—",  change: null,  icon: "◈", grad: "from-accent/20 to-accent-blue/10",  glow: "hover:shadow-glow"       },
  { label: "Positive Signals",value: "—",  change: null,  icon: "↑", grad: "from-positive/20 to-accent-cyan/10",glow: "hover:shadow-glow-green" },
  { label: "Topics Tracked",  value: "—",  change: null,  icon: "⬡", grad: "from-accent-pink/20 to-accent/10",  glow: "hover:shadow-glow"       },
  { label: "AI Briefings",    value: "—",  change: null,  icon: "◎", grad: "from-accent-blue/20 to-accent/10",  glow: "hover:shadow-glow-blue"  },
];

function StatCard({ label, value, change, icon, grad, glow }: typeof stats[0]) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      className={`glass rounded-2xl p-5 bg-gradient-to-br ${grad} ${glow} transition-all duration-200 cursor-default`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl opacity-80">{icon}</span>
        {change !== null && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            (change as number) >= 0 ? "bg-positive/15 text-positive" : "bg-negative/15 text-negative"
          }`}>
            {(change as number) >= 0 ? "↑" : "↓"} {Math.abs(change as number)}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-text-primary mb-1">{value}</p>
      <p className="text-text-secondary text-xs">{label}</p>
    </motion.div>
  );
}

export default function DashboardPage() {
  const userProfile = useUserStore((s) => s.userProfile);

  return (
    <div className="relative z-10 min-h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-border/50">
        <p className="text-text-secondary text-xs uppercase tracking-widest mb-1">
          {userProfile ? `${userProfile.type} · personalized` : "Overview"}
        </p>
        <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Sentiment trend — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2 glass rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-text-primary text-sm font-semibold">Sentiment Trends</p>
                <p className="text-text-secondary text-xs mt-0.5">7-day rolling · positive / negative / neutral</p>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-positive"><span className="w-2 h-2 rounded-full bg-positive" />Pos</span>
                <span className="flex items-center gap-1.5 text-negative"><span className="w-2 h-2 rounded-full bg-negative" />Neg</span>
                <span className="flex items-center gap-1.5 text-accent"><span className="w-2 h-2 rounded-full bg-accent" />Neu</span>
              </div>
            </div>
            <SentimentLineChart />
          </motion.div>

          {/* Topic distribution */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-5"
          >
            <p className="text-text-primary text-sm font-semibold mb-1">Topic Distribution</p>
            <p className="text-text-secondary text-xs mb-4">Coverage by category</p>
            <TopicDonutChart />
          </motion.div>
        </div>

        {/* Volume + feed row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* News volume */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass rounded-2xl p-5"
          >
            <p className="text-text-primary text-sm font-semibold mb-1">News Volume</p>
            <p className="text-text-secondary text-xs mb-4">Stories published today by hour</p>
            <VolumeBarChart />
          </motion.div>

          {/* Market mood */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="glass rounded-2xl p-5"
          >
            <p className="text-text-primary text-sm font-semibold mb-1">Market Mood</p>
            <p className="text-text-secondary text-xs mb-4">Aggregated signal strength</p>
            <div className="flex flex-col gap-3 mt-2">
              {[
                { label: "Bullish signals",  pct: 68, color: "bg-positive" },
                { label: "Bearish signals",  pct: 22, color: "bg-negative" },
                { label: "Neutral signals",  pct: 10, color: "bg-accent"   },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary">{row.label}</span>
                    <span className="text-text-primary font-medium">{row.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Personalized insights */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.41 }}
            className="glass rounded-2xl p-5 bg-gradient-to-br from-accent/10 to-accent-blue/5"
          >
            <p className="text-text-primary text-sm font-semibold mb-1">Personalized Insights</p>
            <p className="text-text-secondary text-xs mb-4">
              Based on your {userProfile?.type ?? "profile"}
            </p>
            <div className="flex flex-col gap-2">
              {[
                { icon: "◈", text: "AI sector up 12% in coverage this week" },
                { icon: "▲", text: "3 high-impact stories match your interests" },
                { icon: "◎", text: "Market sentiment shifted positive today" },
              ].map((item, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <span className="text-accent text-xs mt-0.5 shrink-0">{item.icon}</span>
                  <p className="text-text-secondary text-xs leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Latest news */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44 }}
        >
          <p className="text-[11px] font-semibold tracking-widest text-text-secondary/40 uppercase mb-4">
            Latest Intelligence
          </p>
          <NewsFeed />
        </motion.div>
      </div>
    </div>
  );
}
