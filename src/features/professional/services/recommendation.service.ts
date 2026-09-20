import { api } from "@/util/api";
import type { Recommendation } from "@/types/models";

export async function getRecommendations(): Promise<Recommendation[]> {
  return api.get<Recommendation[]>("/recommendations");
}

export async function createRecommendation(data: {
  professional_id: number;
  service_id: number;
  rating: number;
  comment?: string;
}): Promise<Recommendation> {
  return api.post<Recommendation>("/recommendations", data);
}
