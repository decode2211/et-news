"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

const data = [
  { hour: "6am",  count: 12 },
  { hour: "8am",  count: 28 },
  { hour: "10am", count: 45 },
  { hour: "12pm", count: 67 },
  { hour: "2pm",  count: 52 },
  { hour: "4pm",  count: 71 },
  { hour: "6pm",  count: 83 },
  { hour: "8pm",  count: 59 },
  { hour: "10pm", count: 34 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs">
      <p className="text-text-secondary mb-0.5">{label}</p>
      <p className="text-accent font-medium">{payload[0].value} stories</p>
    </div>
  );
};

export default function VolumeBarChart() {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barSize={14}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="hour" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(139,92,246,0.05)" }} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.count === max ? "#8B5CF6" : "rgba(139,92,246,0.35)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
