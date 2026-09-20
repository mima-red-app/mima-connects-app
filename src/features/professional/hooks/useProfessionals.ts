import { useQuery } from "@tanstack/react-query";
import { fetchProfessionalsUI } from "../services/queries";

export function useProfessionals() {
  return useQuery({
    queryKey: ["professionals"],
    queryFn: fetchProfessionalsUI,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
