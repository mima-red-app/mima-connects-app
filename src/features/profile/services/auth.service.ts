import { supabase } from "@/util/supabase";

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp(
  email: string,
  password: string,
  profile: { first_name: string; last_name: string; phone?: string }
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone ?? null,
        allow_contact: true,
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function updateProfile(data: Record<string, unknown>) {
  const { data: updated, error } = await supabase.auth.updateUser({ data });
  if (error) throw error;
  return updated;
}
