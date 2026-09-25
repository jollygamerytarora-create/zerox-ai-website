import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

export type AuthStatus = "loading" | "signed-in" | "signed-out";

export type Profile = {
  id: string;
  email: string | null;
  phone: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

/**
 * Zerox auth — Google OAuth + email password sign-in/up.
 * Phone numbers are NOT verified (SMS OTP is paid); they are collected
 * after sign-in and stored on the user's profile row alongside their
 * account email.
 */
export function useZeroxAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const loadProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("id, email, phone, full_name, avatar_url")
      .eq("id", userId)
      .maybeSingle();
    setProfile((data as Profile | null) ?? null);
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session ?? null);
        setStatus(data.session ? "signed-in" : "signed-out");
        if (data.session) void loadProfile(data.session.user.id);
      })
      .catch(() => {
        // Supabase unreachable — fail OPEN so the site still works
        if (mounted) setStatus("signed-out");
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setStatus(newSession ? "signed-in" : "signed-out");
      if (newSession) void loadProfile(newSession.user.id);
      else setProfile(null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    setPending(true);
    try {
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: { prompt: "select_account" },
        },
      });
      if (err) setError(err.message);
    } finally {
      setPending(false);
    }
  }, []);

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      setError(null);
      setPending(true);
      try {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (err) setError(err.message);
        return !err;
      } finally {
        setPending(false);
      }
    },
    [],
  );

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setError(null);
      setPending(true);
      try {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) setError(err.message);
        return !err;
      } finally {
        setPending(false);
      }
    },
    [],
  );

  /**
   * Save the user's WhatsApp/phone number on their profile row,
   * tied to the email of the account they signed in with.
   */
  const savePhone = useCallback(async (phone: string) => {
    setError(null);
    setPending(true);
    try {
      const { data } = await supabase.auth.getSession();
      const u = data.session?.user;
      if (!u) {
        setError("You need to be signed in.");
        return false;
      }
      const row = {
        id: u.id,
        email: u.email ?? null,
        phone,
        full_name:
          (u.user_metadata?.full_name as string | undefined) ??
          (u.user_metadata?.name as string | undefined) ??
          null,
        avatar_url: (u.user_metadata?.avatar_url as string | undefined) ?? null,
      };
      const { error: err } = await supabase
        .from("profiles")
        .upsert(row, { onConflict: "id" });
      if (err) {
        setError(err.message);
        return false;
      }
      setProfile(row as Profile);
      return true;
    } finally {
      setPending(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const user: User | null = session?.user ?? null;

  return {
    session,
    user,
    profile,
    status,
    error,
    pending,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    savePhone,
    signOut,
  };
}
