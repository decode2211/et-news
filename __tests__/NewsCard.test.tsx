import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import * as fc from "fast-check";
import NewsCard from "@/components/feed/NewsCard";
import type { NewsItem } from "@/types";

const makeNewsItem = (overrides: Partial<NewsItem> = {}): NewsItem => ({
  id: "1",
  title: "Test Title",
  summary: "Test summary",
  sentiment: "positive",
  impact: "high",
  entities: ["Entity1"],
  category: "Technology",
  ...overrides,
});

describe("NewsCard", () => {
  it("renders title, summary, sentiment, impact, and category", () => {
    const item = makeNewsItem();
    render(<NewsCard item={item} onClick={() => {}} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test summary")).toBeInTheDocument();
    expect(screen.getByText("positive")).toBeInTheDocument();
    expect(screen.getByText(/high impact/i)).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });

  it("calls onClick with the item id when clicked", () => {
    const onClick = vi.fn();
    const item = makeNewsItem({ id: "abc123" });
    render(<NewsCard item={item} onClick={onClick} />);
    fireEvent.click(screen.getByTestId("news-card"));
    expect(onClick).toHaveBeenCalledWith("abc123");
  });

  // Feature: backend-agnostic-news-ui, Property 4: NewsCard renders all required fields
  // Validates: Requirements 5.5
  it("Property 4: renders all required fields for any valid NewsItem", () => {
    const sentiments = ["positive", "negative", "neutral"] as const;
    const impacts = ["low", "medium", "high"] as const;

    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          title: fc.string({ minLength: 1 }),
          summary: fc.string({ minLength: 1 }),
          sentiment: fc.constantFrom(...sentiments),
          impact: fc.constantFrom(...impacts),
          entities: fc.array(fc.string()),
          category: fc.string({ minLength: 1 }),
        }),
        (item: NewsItem) => {
          const { unmount } = render(<NewsCard item={item} onClick={() => {}} />);
          const card = screen.getByTestId("news-card");
          expect(card.textContent).toContain(item.title);
          expect(card.textContent).toContain(item.summary);
          expect(card.textContent).toContain(item.sentiment);
          expect(card.textContent).toContain(item.impact);
          expect(card.textContent).toContain(item.category);
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
