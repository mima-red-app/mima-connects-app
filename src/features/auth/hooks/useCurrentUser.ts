import type { User } from "@supabase/supabase-js";
import { useAuth } from "@/features/auth/hooks/useAuth";

export interface CurrentUser {
  id?: string;
  email?: string;
  username?: string;
  fullName?: string;
  avatarUrl?: string;
  emailVerified?: boolean;
  createdAt?: string;
  raw: User | null;
}

export function useCurrentUser(): CurrentUser {
  const { user } = useAuth();
  const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;

  return {
    id: user?.id,
    email: user?.email,
    username: (metadata.username as string | undefined) ?? (metadata.full_name as string | undefined),
    fullName: (metadata.full_name as string | undefined) ?? (metadata.fullName as string | undefined),
    avatarUrl: (metadata.avatar_url as string | undefined) ?? (metadata.avatarUrl as string | undefined),
    emailVerified:
      user?.email_confirmed_at != null || user?.confirmed_at != null,
    createdAt: user?.created_at ? new Date(user.created_at).toISOString() : undefined,
    raw: user,
  };
}