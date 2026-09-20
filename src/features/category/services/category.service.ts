import { api } from "@/util/api";
import type { Category } from "@/types/models";

export async function getCategories(): Promise<Category[]> {
  return api.get<Category[]>("/categories");
}

export async function getCategoryById(id: number): Promise<Category> {
  return api.get<Category>(`/categories/${id}`);
}
