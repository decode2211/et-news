"use client";

interface RightPanelProps {
  children?: React.ReactNode;
}

export default function RightPanel({ children }: RightPanelProps) {
  return (
    <aside className="w-80 shrink-0 bg-card border-l border-white/10 h-full overflow-y-auto p-4">
      {children}
    </aside>
  );
}
