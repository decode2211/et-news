import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import ErrorState from "@/components/ui/ErrorState";

describe("ErrorState", () => {
  it("renders the error message", () => {
    render(<ErrorState message="Failed to fetch data" onRetry={() => {}} />);
    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });

  it("renders a retry button", () => {
    render(<ErrorState message="Error" onRetry={() => {}} />);
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    const onRetry = vi.fn();
    render(<ErrorState message="Error" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
