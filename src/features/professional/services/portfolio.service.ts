import { api } from "@/util/api";
import type { PortfolioItem } from "@/types/models";

export async function getPortfolioByProfessional(
  professionalId: number
): Promise<PortfolioItem[]> {
  return api.get<PortfolioItem[]>(`/portfolio/${professionalId}`);
}

export async function addPortfolioItem(
  professionalId: number,
  data: { image_url: string; description?: string }
): Promise<PortfolioItem> {
  return api.post<PortfolioItem>(`/portfolio/${professionalId}`, data);
}

export async function deletePortfolioItem(
  professionalId: number,
  itemId: number
): Promise<void> {
  return api.delete<void>(`/portfolio/${professionalId}/${itemId}`);
}
