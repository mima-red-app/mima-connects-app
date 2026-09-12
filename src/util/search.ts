import type { Professional } from "@/features/professional/types/professional-types";

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterProfessionals(
  list: Professional[],
  query: string
): Professional[] {
  const q = normalizeText(query.trim());
  if (!q) {
    return list;
  }
  return list.filter((professional) =>
    [professional.name, professional.profession, professional.location].some(
      (field) => normalizeText(field).includes(q)
    )
  );
}
