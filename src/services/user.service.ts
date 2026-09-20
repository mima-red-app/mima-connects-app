import { api } from "@/util/api";
import type { User } from "@/types/models";

export async function getUsers(status?: string): Promise<User[]> {
  const qs = status ? `?status=${status}` : "";
  return api.get<User[]>(`/users${qs}`);
}

export async function getUserById(id: number): Promise<User> {
  return api.get<User>(`/users/${id}`);
}

export async function updateUser(
  id: number,
  data: Partial<Pick<User, "first_name" | "last_name" | "phone" | "allow_contact">>
): Promise<User> {
  return api.patch<User>(`/users/${id}`, data);
}
