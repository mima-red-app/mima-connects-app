import { api } from "@/util/api";
import type { Review } from "@/types/models";

export async function getReviews(): Promise<Review[]> {
  return api.get<Review[]>("/reviews");
}

export async function getReviewById(id: number): Promise<Review> {
  return api.get<Review>(`/reviews/${id}`);
}

export async function createReview(data: {
  professional_id: number;
  rating: number;
  comment?: string;
}): Promise<Review> {
  return api.post<Review>("/reviews", data);
}

export async function updateReview(
  id: number,
  data: { rating?: number; comment?: string }
): Promise<Review> {
  return api.patch<Review>(`/reviews/${id}`, data);
}

export async function deleteReview(id: number): Promise<void> {
  return api.delete<void>(`/reviews/${id}`);
}
