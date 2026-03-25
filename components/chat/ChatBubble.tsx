import type { ChatMessage } from "@/types";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
      data-testid="chat-bubble"
      data-role={message.role}
    >
      <div
        className={cn(
          "max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm",
          isUser
            ? "bg-accent text-white rounded-br-none"
            : "bg-card text-text-primary rounded-bl-none border border-white/10"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
