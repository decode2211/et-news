"use client";

import useUserStore from "@/store/userStore";

export default function TopBar() {
  const userProfile = useUserStore((s) => s.userProfile);

  return (
    <header className="sticky top-0 z-10 glass-strong border-b border-border/30 px-6 py-3 flex items-center gap-4">
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-xs">⌕</span>
          <input
            type="text"
            placeholder="Search stories, topics, entities…"
            className="w-full bg-white/4 border border-border/50 rounded-xl pl-8 pr-4 py-2 text-text-primary text-xs placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Date */}
        <span className="hidden md:block text-text-secondary text-xs">
          {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
        </span>

        {/* Profile pill */}
        {userProfile && (
          <div className="flex items-center gap-2 bg-white/4 border border-border/50 rounded-xl px-3 py-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-accent flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">
                {userProfile.type[0].toUpperCase()}
              </span>
            </div>
            <span className="text-text-primary text-xs font-medium capitalize hidden md:block">
              {userProfile.type}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
