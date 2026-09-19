import { supabase } from "@/util/supabase";

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
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

export async function updateProfile(data: {
  full_name?: string;
  username?: string;
  phone?: string;
  avatar_url?: string;
  profession?: string;
  location?: string;
  bio?: string;
}) {
  const { data: updated, error } = await supabase.auth.updateUser({ data });
  if (error) throw error;
  return updated;
}