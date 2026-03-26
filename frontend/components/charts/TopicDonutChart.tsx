"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "AI & Tech",   value: 34, color: "#8B5CF6" },
  { name: "Markets",     value: 26, color: "#3B82F6" },
  { name: "Startups",    value: 18, color: "#06B6D4" },
  { name: "Climate",     value: 12, color: "#10B981" },
  { name: "Geopolitics", value: 10, color: "#EC4899" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs">
      <p style={{ color: payload[0].payload.color }} className="font-medium">
        {payload[0].name}: {payload[0].value}%
      </p>
    </div>
  );
};

export default function TopicDonutChart() {
  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width={120} height={120}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={55}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-1.5 flex-1">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
              <span className="text-text-secondary text-xs">{d.name}</span>
            </div>
            <span className="text-text-primary text-xs font-medium">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
