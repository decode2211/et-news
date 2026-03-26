"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/feed",      label: "Feed",       icon: "◈" },
  { href: "/chat",      label: "AI Chat",    icon: "◎" },
];

const secondary = [
  { href: "/briefing",  label: "Briefings",  icon: "▤" },
  { href: "/saved",     label: "Saved",      icon: "◇" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <aside className="fixed left-0 top-0 h-full w-14 md:w-56 glass-strong border-r border-border/40 flex flex-col z-20">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 py-4 border-b border-border/30">
        <div className="w-8 h-8 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0 shadow-glow">
          <span className="text-white text-sm font-bold">N</span>
        </div>
        <div className="hidden md:block">
          <p className="text-text-primary text-sm font-semibold">NewsUI</p>
          <p className="text-text-secondary text-[10px]">AI Intelligence</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
        <p className="hidden md:block text-[9px] font-bold tracking-widest text-text-muted uppercase px-2 mb-2">
          Main
        </p>
        {nav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm transition-all duration-150 group relative",
                active
                  ? "bg-accent/15 text-accent"
                  : "text-text-secondary hover:bg-white/4 hover:text-text-primary"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
              )}
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span className="hidden md:block font-medium">{item.label}</span>
            </Link>
          );
        })}

        <p className="hidden md:block text-[9px] font-bold tracking-widest text-text-muted uppercase px-2 mt-4 mb-2">
          Monitoring
        </p>
        {secondary.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm transition-all duration-150",
                active
                  ? "bg-accent/15 text-accent"
                  : "text-text-secondary hover:bg-white/4 hover:text-text-primary"
              )}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span className="hidden md:block">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="px-2 pb-4 border-t border-border/30 pt-3">
        <Link
          href="/login"
          className="flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-white/4 hover:text-text-primary transition-all"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-accent flex items-center justify-center shrink-0">
            <span className="text-white text-[9px] font-bold">U</span>
          </div>
          <span className="hidden md:block">Profile</span>
        </Link>
      </div>
    </aside>
  );
}
