import { describe, it, expect } from "vitest";
import type {
  NewsItem,
  Briefing,
  UserProfile,
  ChatMessage,
  ApiError,
  FetchState,
  Sentiment,
  Impact,
  UserType,
  MessageRole,
} from "@/types";

describe("TypeScript type definitions", () => {
  it("NewsItem interface has all required fields", () => {
    const item: NewsItem = {
      id: "1",
      title: "Test Title",
      summary: "Test summary",
      sentiment: "positive",
      impact: "high",
      entities: ["Entity1"],
      category: "Technology",
    };
    expect(item.id).toBe("1");
    expect(item.sentiment).toBe("positive");
    expect(item.impact).toBe("high");
    expect(Array.isArray(item.entities)).toBe(true);
  });

  it("Briefing interface has all required fields", () => {
    const briefing: Briefing = {
      id: "b1",
      title: "Briefing Title",
      summary: "Briefing summary",
      keyPoints: ["Point 1", "Point 2"],
      impactAnalysis: "Impact analysis text",
    };
    expect(briefing.keyPoints).toHaveLength(2);
  });

  it("UserProfile interface has all required fields", () => {
    const profile: UserProfile = {
      type: "investor",
      interests: ["tech", "finance"],
    };
    expect(profile.type).toBe("investor");
  });

  it("ChatMessage interface has all required fields", () => {
    const msg: ChatMessage = {
      id: "m1",
      role: "user",
      content: "Hello",
      timestamp: Date.now(),
    };
    expect(msg.role).toBe("user");
  });

  it("FetchState discriminated union covers all states", () => {
    const loading: FetchState<string> = { status: "loading" };
    const error: FetchState<string> = { status: "error", error: { status: 500, message: "err" } };
    const empty: FetchState<string> = { status: "empty" };
    const success: FetchState<string> = { status: "success", data: "data" };
    const idle: FetchState<string> = { status: "idle" };

    expect(loading.status).toBe("loading");
    expect(error.status).toBe("error");
    expect(empty.status).toBe("empty");
    expect(success.status).toBe("success");
    expect(idle.status).toBe("idle");
  });
});
