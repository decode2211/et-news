import apiClient from "./api";
import type { ChatMessage } from "@/types";

export async function sendMessage(message: string): Promise<ChatMessage> {
  const response = await apiClient.post<ChatMessage>("/api/chat", { message });
  return response.data;
}
