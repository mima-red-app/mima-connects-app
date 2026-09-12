import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/util/supabase";
import {
  signIn,
  signOut,
  signUp,
} from "@/features/auth/services/auth.service";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fallback = setTimeout(() => {
      if (!active) return;
      console.warn("[useAuth] session restore timed out, continuing logged out");
      setSession(null);
      setUser(null);
      setIsLoading(false);
    }, 10000);

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!active) return;
        clearTimeout(fallback);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!active) return;
        clearTimeout(fallback);
        console.warn("[useAuth] getSession failed:", error);
        setSession(null);
        setUser(null);
        setIsLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!active) return;
      clearTimeout(fallback);
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      active = false;
      clearTimeout(fallback);
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
}