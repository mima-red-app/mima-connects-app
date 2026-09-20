import type { User } from "@supabase/supabase-js";
import { useAuth } from "./useAuth";

export interface CurrentUser {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
  emailVerified?: boolean;
  createdAt?: string;
  raw: User | null;
}

export function useCurrentUser(): CurrentUser {
  const { user } = useAuth();
  const m = (user?.user_metadata ?? {}) as Record<string, unknown>;

  const firstName = (m.first_name as string | undefined) ?? "";
  const lastName = (m.last_name as string | undefined) ?? "";
  const fullName =
    (m.full_name as string | undefined) ??
    ([firstName, lastName].filter(Boolean).join(" ") ||
      (m.username as string | undefined) ||
      "");

  return {
    id: user?.id,
    email: user?.email,
    firstName,
    lastName,
    fullName: fullName || undefined,
    phone: (m.phone as string | undefined) ?? undefined,
    avatarUrl:
      (m.avatar_url as string | undefined) ??
      (m.avatarUrl as string | undefined),
    emailVerified:
      user?.email_confirmed_at != null || user?.confirmed_at != null,
    createdAt: user?.created_at
      ? new Date(user.created_at).toISOString()
      : undefined,
    raw: user,
  };
}
