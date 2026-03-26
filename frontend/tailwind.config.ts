import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060B14",
        sidebar:    "#080D18",
        card:       "#0D1424",
        border:     "#1A2540",
        accent:     "#8B5CF6",
        "accent-blue":  "#3B82F6",
        "accent-pink":  "#EC4899",
        "accent-cyan":  "#06B6D4",
        positive:   "#10B981",
        negative:   "#EF4444",
        warning:    "#F59E0B",
        "text-primary":   "#F1F5F9",
        "text-secondary": "#64748B",
        "text-muted":     "#334155",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":   "linear-gradient(135deg, #0F0C29, #302B63, #24243E)",
        "gradient-card":   "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.04))",
        "gradient-accent": "linear-gradient(135deg, #8B5CF6, #3B82F6)",
        "gradient-green":  "linear-gradient(135deg, #10B981, #06B6D4)",
        "gradient-pink":   "linear-gradient(135deg, #EC4899, #8B5CF6)",
      },
      boxShadow: {
        glow:        "0 0 24px rgba(139,92,246,0.2)",
        "glow-blue": "0 0 24px rgba(59,130,246,0.2)",
        "glow-green":"0 0 24px rgba(16,185,129,0.2)",
        card:        "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover":"0 8px 40px rgba(139,92,246,0.15)",
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};

export default config;
