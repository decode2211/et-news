"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useUserStore from "@/store/userStore";
import type { UserType } from "@/types";

const userTypes: { value: UserType; label: string; desc: string; grad: string }[] = [
  { value: "investor", label: "Investor",  desc: "Market insights & financial signals",  grad: "from-positive/20 to-accent-cyan/10"  },
  { value: "founder",  label: "Founder",   desc: "Startup trends & opportunities",        grad: "from-accent/20 to-accent-blue/10"    },
  { value: "student",  label: "Student",   desc: "Learning & broad topic coverage",       grad: "from-accent-pink/20 to-accent/10"    },
];

export default function LoginPage() {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const [selected, setSelected] = useState<UserType | null>(null);
  const [interests, setInterests] = useState("");

  const handleContinue = () => {
    if (!selected) return;
    setUser({ type: selected, interests: interests.split(",").map((s) => s.trim()).filter(Boolean) });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-blue/6 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-accent shadow-glow mb-4">
            <span className="text-white text-2xl font-bold">N</span>
          </div>
          <h1 className="text-2xl font-semibold text-text-primary">NewsUI</h1>
          <p className="text-text-secondary text-sm mt-1">AI-powered news intelligence</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-text-primary font-semibold text-sm mb-0.5">Select your profile</h2>
          <p className="text-text-secondary text-xs mb-5">Personalise your intelligence feed</p>

          <div className="flex flex-col gap-2 mb-5">
            {userTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => setSelected(t.value)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 bg-gradient-to-br ${t.grad} ${
                  selected === t.value
                    ? "border-accent/50 shadow-glow"
                    : "border-border/50 hover:border-white/15"
                }`}
              >
                <div className="flex-1">
                  <p className="text-text-primary text-sm font-medium">{t.label}</p>
                  <p className="text-text-secondary text-xs mt-0.5">{t.desc}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                  selected === t.value ? "border-accent bg-accent" : "border-border"
                }`} />
              </button>
            ))}
          </div>

          <div className="mb-5">
            <label className="text-text-secondary text-xs mb-1.5 block">
              Interests <span className="opacity-40">(optional)</span>
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="AI, crypto, climate, biotech…"
              className="w-full bg-white/4 border border-border/50 rounded-xl px-3 py-2.5 text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          <button
            onClick={handleContinue}
            disabled={!selected}
            className="w-full py-2.5 bg-gradient-accent text-white rounded-xl font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shadow-glow"
          >
            Get started →
          </button>
        </div>

        <p className="text-center text-text-secondary/30 text-xs mt-4">
          No account needed · API-ready · Open source
        </p>
      </motion.div>
    </div>
  );
}
