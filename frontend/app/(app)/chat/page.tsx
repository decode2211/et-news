"use client";

import { motion } from "framer-motion";
import ChatPanel from "@/components/chat/ChatPanel";

export default function ChatPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="h-screen flex flex-col"
    >
      <div className="px-6 pt-6 pb-4 border-b border-border shrink-0">
        <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Assistant</p>
        <h1 className="text-xl font-semibold text-text-primary">AI Chat</h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatPanel />
      </div>
    </motion.div>
  );
}
