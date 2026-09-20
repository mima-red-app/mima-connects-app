import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfessionalDetailUI } from "../services/queries";
import { createReview, updateReview } from "../services/review.service";

export function useProfessional(id: string | number | undefined) {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  const enabled = numericId != null && !isNaN(numericId);

  return useQuery({
    queryKey: ["professional", numericId],
    queryFn: () => fetchProfessionalDetailUI(numericId!),
    enabled,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useCreateReview(professionalId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { rating: number; comment: string }) =>
      createReview({ professional_id: professionalId, ...data }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["professional", professionalId] });
      qc.invalidateQueries({ queryKey: ["professionals"] });
    },
  });
}

export function useUpdateReview(reviewId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { rating: number; comment: string }) =>
      updateReview(reviewId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["professional"] });
      qc.invalidateQueries({ queryKey: ["professionals"] });
    },
  });
}
