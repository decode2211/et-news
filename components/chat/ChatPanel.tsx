"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "@/types";
import { sendMessage } from "@/services/chatService";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setError(null);

    try {
      const response = await sendMessage(trimmed);
      setMessages((prev) => [...prev, response]);
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = input.trim() === "" || isTyping;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        {error && (
          <p className="text-negative text-sm text-center" data-testid="chat-error">
            {error}
          </p>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-white/10 p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-card border border-white/10 rounded-md px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
          data-testid="chat-input"
        />
        <button
          onClick={handleSend}
          disabled={isDisabled}
          className="px-4 py-2 bg-accent text-white rounded-md text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent/80 transition-colors"
          data-testid="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}
