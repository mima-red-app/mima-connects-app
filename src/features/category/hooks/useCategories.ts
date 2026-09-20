import { useQuery } from "@tanstack/react-query";
import type { CategoryUI } from "../types";
import { toCategoryUI } from "../types";
import { getCategories } from "../services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<CategoryUI[]> => {
      const cats = await getCategories();
      return cats.map(toCategoryUI);
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
