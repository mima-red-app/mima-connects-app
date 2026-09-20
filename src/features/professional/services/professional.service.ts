import { api } from "@/util/api";
import type { ProfessionalProfile } from "@/types/models";

export async function getProfessionalProfiles(
  status?: string
): Promise<ProfessionalProfile[]> {
  const qs = status ? `?status=${status}` : "";
  return api.get<ProfessionalProfile[]>(`/professional-profiles${qs}`);
}

export async function getProfessionalProfileById(
  id: number
): Promise<ProfessionalProfile> {
  return api.get<ProfessionalProfile>(`/professional-profiles/${id}`);
}

export async function createProfessionalProfile(
  data: Omit<
    ProfessionalProfile,
    "id" | "status" | "created_at" | "updated_at"
  >
): Promise<ProfessionalProfile> {
  return api.post<ProfessionalProfile>("/professional-profiles", data);
}

export async function updateProfessionalProfile(
  id: number,
  data: Partial<
    Pick<
      ProfessionalProfile,
      "professional_name" | "description" | "location" | "whatsapp"
    >
  >
): Promise<ProfessionalProfile> {
  return api.patch<ProfessionalProfile>(`/professional-profiles/${id}`, data);
}
