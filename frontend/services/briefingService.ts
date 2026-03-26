import apiClient from "./api";
import type { Briefing } from "@/types";

export async function getBriefing(id: string): Promise<Briefing> {
  const response = await apiClient.get<Briefing>(`/api/briefing/${id}`);
  return response.data;
}
