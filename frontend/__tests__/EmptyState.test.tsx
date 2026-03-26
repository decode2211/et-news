import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmptyState from "@/components/ui/EmptyState";

describe("EmptyState", () => {
  it("renders the message", () => {
    render(<EmptyState message="No news available" />);
    expect(screen.getByText("No news available")).toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    render(<EmptyState message="Empty" onRetry={() => {}} />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(<EmptyState message="Empty" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    const onRetry = vi.fn();
    render(<EmptyState message="Empty" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
