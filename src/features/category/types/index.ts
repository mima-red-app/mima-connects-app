import type { Category } from "@/types/models";

export interface CategoryUI {
  title: string;
  icon: string;
  query: string;
}

export function toCategoryUI(cat: Category): CategoryUI {
  return {
    title: cat.name,
    icon: cat.icon ?? "🔧",
    query: cat.name.toLowerCase(),
  };
}
