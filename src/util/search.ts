import type { ProfessionalUI } from "@/features/professional/types";

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterProfessionals(
  list: ProfessionalUI[],
  query: string
): ProfessionalUI[] {
  const q = normalizeText(query.trim());
  if (!q) return list;
  return list.filter((p) =>
    [p.name, p.profession, p.location].some((f) =>
      normalizeText(f).includes(q)
    )
  );
}
