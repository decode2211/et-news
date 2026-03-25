"use client";

import {
  ResponsiveContainer, XAxis, YAxis,
  Tooltip, CartesianGrid, Area, AreaChart,
} from "recharts";

const data = [
  { day: "Mon", positive: 62, negative: 28, neutral: 45 },
  { day: "Tue", positive: 71, negative: 22, neutral: 38 },
  { day: "Wed", positive: 58, negative: 35, neutral: 52 },
  { day: "Thu", positive: 80, negative: 18, neutral: 41 },
  { day: "Fri", positive: 74, negative: 24, neutral: 36 },
  { day: "Sat", positive: 68, negative: 30, neutral: 48 },
  { day: "Sun", positive: 85, negative: 15, neutral: 33 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs">
      <p className="text-text-secondary mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  );
};

export default function SentimentLineChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradPos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#10B981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradNeg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradNeu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#8B5CF6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="day" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={2} fill="url(#gradPos)" dot={false} name="Positive" />
        <Area type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={2} fill="url(#gradNeg)" dot={false} name="Negative" />
        <Area type="monotone" dataKey="neutral"  stroke="#8B5CF6" strokeWidth={2} fill="url(#gradNeu)" dot={false} name="Neutral" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
