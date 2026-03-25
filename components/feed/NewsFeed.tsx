"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { getNews } from "@/services/newsService";
import FeedSkeleton from "./FeedSkeleton";
import NewsCard from "./NewsCard";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

export default function NewsFeed() {
  const fetcher = useCallback(() => getNews(), []);
  const { state, retry } = useFetch(fetcher);
  const router = useRouter();

  const handleCardClick = (id: string) => router.push(`/briefing/${id}`);

  if (state.status === "loading") return <FeedSkeleton />;
  if (state.status === "error")
    return <ErrorState message="Failed to fetch data" onRetry={retry} />;
  if (state.status === "empty")
    return <EmptyState message="No news available yet" onRetry={retry} />;
  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-3">
        {state.data.map((item) => (
          <NewsCard key={item.id} item={item} onClick={handleCardClick} />
        ))}
      </div>
    );
  }
  return null;
}
