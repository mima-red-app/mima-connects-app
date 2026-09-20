import { useQuery } from "@tanstack/react-query";
import { fetchMyReviewsUI } from "../services/queries";

export function useMyReviews(userEmail: string | undefined) {
  return useQuery({
    queryKey: ["my-reviews", userEmail],
    queryFn: () => fetchMyReviewsUI(userEmail!),
    enabled: !!userEmail,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
