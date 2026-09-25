import { useZeroxAuth } from "@/hooks/useZeroxAuth";
import {
  Check,
  KeyRound,
  Loader2,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type EmailFlow = "signin" | "signup";
/**
 * AuthGate — the "enter the site" login veil.
 * Hard gate (no guest mode): Google or email sign-in required.
 * After sign-in, we ask for the user's phone number (stored on their
 * profile row with their account email — SMS OTP verification is a
 * paid Supabase feature, so numbers are collected, not verified).
 */
export default function AuthGate() {
  const {
    status,
    error,
    pending,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
  } = useZeroxAuth();
  const [emailFlow, setEmailFlow] = useState<EmailFlow>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localNote, setLocalNote] = useState<string | null>(null);

  const submitEmail = async () => {
    setLocalNote(null);
    if (!email || !password) {
      setLocalNote("Enter your email and a password.");
      return;
    }
    const ok =
      emailFlow === "signup"
        ? await signUpWithEmail(email, password)
        : await signInWithEmail(email, password);
    if (ok && emailFlow === "signup") {
      setLocalNote("Account created — you're in!");
    }
  };

  const busy = pending;

  return (
    <AnimatePresence>
      {status !== "loading" && status === "signed-out" && (
        <motion.div
          className="fixed inset-0 z-[10050] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 80% at 50% 30%, rgba(30,10,55,0.88), rgba(8,5,15,0.94))",
              backdropFilter: "blur(10px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md"
          >
            <div
              className="relative overflow-hidden rounded-3xl p-px"
              style={{
                background:
                  "linear-gradient(160deg, rgba(168,85,247,0.5), rgba(232,121,249,0.25) 45%, rgba(168,85,247,0.1))",
              }}
            >
              <div className="rounded-3xl bg-[#0c0818]/95 p-8 sm:p-10">
                <div className="mb-7 text-center">
                  <div className="zx-mono mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/25 bg-fuchsia-400/[0.07] px-3.5 py-1 text-[10px] tracking-[0.3em] text-fuchsia-200/85">
                    <Sparkles className="h-3 w-3" />
                    WELCOME TO ZEROX
                  </div>
                  <h2 className="zx-display text-3xl font-extrabold text-mist">
                    Sign in to your{" "}
                    <span className="zx-gradient-text">core</span>
                  </h2>
                  <p className="zx-mono mt-2 text-xs tracking-wide text-muted-foreground">
                    Google or email — your assistant remembers you.
                  </p>
                </div>

                {/* Google */}
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  disabled={busy}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-3.5 text-sm font-semibold text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:bg-white/[0.09] disabled:opacity-60"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.96.75 12 .75 7.62.75 3.84 3.27 2.04 6.86l3.66 2.84C6.55 7.02 9.03 5.04 12 5.04z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.25 12.27c0-.79-.07-1.55-.21-2.27H12v4.51h6.34c-.27 1.48-1.11 2.73-2.37 3.57l3.62 2.81c2.12-1.96 3.66-4.85 3.66-8.62z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.71 14.3a7.06 7.06 0 0 1 0-4.6L2.04 6.86a11.26 11.26 0 0 0 0 10.28l3.67-2.84z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23.25c3.04 0 5.6-1 7.46-2.72l-3.62-2.81c-1 .68-2.29 1.08-3.84 1.08-2.97 0-5.45-1.98-6.3-4.66l-3.66 2.84C3.84 20.73 7.62 23.25 12 23.25z"
                    />
                  </svg>
                  {busy ? "Connecting…" : "Continue with Google"}
                </button>

                {/* divider */}
                <div className="my-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="zx-mono text-[9px] tracking-[0.3em] text-mist/40">
                    OR
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-3">
                  {/* flow switch */}
                  <div className="flex gap-4 text-xs">
                    {(["signin", "signup"] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => {
                          setEmailFlow(f);
                          setLocalNote(null);
                        }}
                        className={`zx-mono tracking-[0.15em] transition-colors ${
                          emailFlow === f
                            ? "text-fuchsia-300 underline underline-offset-4"
                            : "text-mist/45 hover:text-fuchsia-200"
                        }`}
                      >
                        {f === "signin"
                          ? "I HAVE AN ACCOUNT"
                          : "CREATE ACCOUNT"}
                      </button>
                    ))}
                  </div>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="zx-mono w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-mist placeholder:text-mist/35 focus:border-fuchsia-300/60 focus:outline-none focus:ring-1 focus:ring-fuchsia-300/30"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete={
                      emailFlow === "signup"
                        ? "new-password"
                        : "current-password"
                    }
                    onKeyDown={(e) => e.key === "Enter" && submitEmail()}
                    className="zx-mono w-full rounded-2xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-mist placeholder:text-mist/35 focus:border-fuchsia-300/60 focus:outline-none focus:ring-1 focus:ring-fuchsia-300/30"
                  />

                  <button
                    type="button"
                    onClick={submitEmail}
                    disabled={busy}
                    className="zx-mono flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-[12px] font-semibold tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_-10px_rgba(168,85,247,0.7)] disabled:opacity-60"
                  >
                    {busy ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <KeyRound className="h-4 w-4" />
                    )}
                    {emailFlow === "signup" ? "CREATE ACCOUNT" : "SIGN IN"}
                  </button>
                </div>

                {/* messages */}
                {(error || localNote) && (
                  <p className="zx-mono mt-4 text-center text-xs leading-relaxed text-fuchsia-200/80">
                    {error || localNote}
                  </p>
                )}

                <p className="zx-mono mt-6 flex items-center justify-center gap-2 text-center text-[9px] tracking-[0.2em] text-mist/35">
                  <ShieldCheck className="h-3 w-3" />
                  SECURED BY SUPABASE AUTH
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * PhoneStep — shown inside the signed-in UI (rendered by SiteLayout) until
 * the user adds their number. Skippable, remembered once saved.
 */
export function PhoneStep() {
  const { user, profile, pending, savePhone } = useZeroxAuth();
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [skip, setSkip] = useState(false);

  // Show whenever signed in and we don't have a number yet — the profile
  // row may not exist at all for first-time users (profile === null).
  // Hidden while loading or signed-out (user === null) so it never flashes.
  if (!user || profile?.phone || saved || skip) return null;

  const email = profile?.email ?? user?.email ?? "your account";

  const submit = async () => {
    setNote(null);
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setNote("Enter a valid 10-digit number.");
      return;
    }
    const formatted = phone.startsWith("+")
      ? phone.replace(/\s/g, "")
      : `+91${digits}`;
    if (await savePhone(formatted)) setSaved(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 z-[10040] w-[min(92vw,420px)] -translate-x-1/2"
    >
      <div
        className="overflow-hidden rounded-3xl p-px"
        style={{
          background:
            "linear-gradient(160deg, rgba(168,85,247,0.55), rgba(232,121,249,0.25) 50%, rgba(168,85,247,0.12))",
        }}
      >
        <div className="rounded-3xl bg-[#0c0818]/95 p-5">
          <div className="zx-mono mb-2 flex items-center gap-2 text-[10px] tracking-[0.3em] text-fuchsia-200/85">
            <Phone className="h-3.5 w-3.5" />
            ONE LAST THING
          </div>
          <p className="mb-4 text-sm leading-relaxed text-mist/80">
            Add your WhatsApp number so your Zerox assistant can reach you.
            Saved with your account email{" "}
            <span className="text-fuchsia-200">{email}</span>.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-white/12 bg-black/30 px-4">
              <span className="zx-mono text-sm text-mist/50">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="98765 43210"
                maxLength={10}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="zx-mono w-full bg-transparent py-3 text-sm text-mist placeholder:text-mist/35 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={submit}
              disabled={pending}
              className="zx-mono flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-[11px] font-semibold tracking-[0.2em] text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
            >
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              SAVE
            </button>
          </div>
          {note && (
            <p className="zx-mono mt-3 text-xs text-fuchsia-200/80">{note}</p>
          )}
          <button
            type="button"
            onClick={() => setSkip(true)}
            className="zx-mono mt-3 text-[10px] tracking-[0.2em] text-mist/40 transition-colors hover:text-fuchsia-200"
          >
            I'LL DO THIS LATER
          </button>
        </div>
      </div>
    </motion.div>
  );
}
