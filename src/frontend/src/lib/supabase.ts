import { createClient } from "@supabase/supabase-js";

/**
 * Zerox AI auth backend (Supabase).
 *
 * Only PUBLISHABLE keys live here — they are designed to be embedded in
 * client apps and grant no admin access. The publishable key can be
 * overridden with VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.
 */
const SUPABASE_URL =
  (import.meta.env?.VITE_SUPABASE_URL as string | undefined) ??
  "https://oeeqcqgvyknwcuxqhftt.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  (import.meta.env?.VITE_SUPABASE_ANON_KEY as string | undefined) ??
  "sb_publishable_OBujGQ8l9cEFnn6CtGiquw_p7jQJ50P";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
