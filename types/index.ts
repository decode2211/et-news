export type Sentiment = "positive" | "negative" | "neutral";
export type Impact = "low" | "medium" | "high";
export type UserType = "investor" | "student" | "founder";
export type MessageRole = "user" | "assistant";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  sentiment: Sentiment;
  impact: Impact;
  entities: string[];
  category: string;
}

export interface Briefing {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  impactAnalysis: string;
}

export interface UserProfile {
  type: UserType;
  interests: string[];
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ApiError {
  status: number;
  message: string;
}

export type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: ApiError }
  | { status: "empty" }
  | { status: "success"; data: T };
