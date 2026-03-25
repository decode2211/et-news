import apiClient from "./api";
import type { NewsItem } from "@/types";

export async function getNews(): Promise<NewsItem[]> {
  const response = await apiClient.get<NewsItem[]>("/api/news");
  return response.data;
}
