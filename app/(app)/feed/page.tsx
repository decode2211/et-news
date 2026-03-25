"use client";

import { motion } from "framer-motion";
import NewsFeed from "@/components/feed/NewsFeed";

export default function FeedPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-full"
    >
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Intelligence</p>
        <h1 className="text-xl font-semibold text-text-primary">News Feed</h1>
      </div>
      <div className="px-6 py-5">
        <NewsFeed />
      </div>
    </motion.div>
  );
}
