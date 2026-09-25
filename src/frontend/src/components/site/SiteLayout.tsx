import AuthGate, { PhoneStep } from "@/components/auth/AuthGate";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import Atmosphere from "@/components/fx/Atmosphere";
import PageTransition from "@/components/fx/PageTransition";
import PetalCursor from "@/components/fx/PetalCursor";
import Preloader from "@/components/fx/Preloader";
import ScrollProgress from "@/components/fx/ScrollProgress";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Magnetic from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useZeroxAuth } from "@/hooks/useZeroxAuth";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import BrandMark from "./BrandMark";

export default function SiteLayout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { status, user, signOut } = useZeroxAuth();

  // hide on scroll down, reveal on scroll up
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "Monthly", path: "/monthly-pricing" },
    { label: "Tools", path: "/tools" },
    { label: "Demo", path: "/demo" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => currentPath === path;

  const go = (path: string) => navigate({ to: path });

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full overflow-x-clip bg-background text-foreground">
        <Atmosphere />
        <Preloader />
        <ScrollProgress />
        <PageTransition />
        <PetalCursor />
        <AuthGate />
        <PhoneStep />

        {/* ============ Floating glass navbar ============ */}
        <motion.header
          className="fixed inset-x-3 top-3 z-[100] sm:inset-x-5"
          animate={{ y: hidden ? "-130%" : "0%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="zx-hairline mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl bg-[#0a0f1e]/70 px-4 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:h-[4.25rem] sm:px-5">
            <Magnetic strength={0.18}>
              <button
                type="button"
                onClick={() => go("/")}
                className="flex items-center"
                aria-label="JollyTech home"
              >
                <BrandMark />
              </button>
            </Magnetic>

            {/* Desktop nav — animated active indicator */}
            <nav className="hidden items-center gap-0.5 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => go(item.path)}
                  className={`zx-mono group relative rounded-lg px-3.5 py-2 text-[13px] tracking-wide transition-colors ${
                    isActive(item.path)
                      ? "text-fuchsia-200"
                      : "text-slate-300/80 hover:text-fuchsia-200"
                  }`}
                  data-ocid={`nav.${item.label
                    .toLowerCase()
                    .replace(" ", "_")}.link`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-px origin-left bg-gradient-to-r from-fuchsia-300 to-fuchsia-400 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                      isActive(item.path)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              ))}
            </nav>

            {/* Account chip — signed-in identity + sign out (desktop) */}
            {status === "signed-in" && user && (
              <div className="hidden items-center gap-2 md:flex">
                <div
                  className="zx-mono flex items-center gap-2.5 rounded-full border border-fuchsia-300/25 bg-fuchsia-400/[0.07] py-1.5 pl-1.5 pr-3.5"
                  title={user.email ?? user.phone ?? "Zerox member"}
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url as string}
                      alt=""
                      className="h-7 w-7 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">
                      {(
                        user.user_metadata?.name as string | undefined
                      )?.[0]?.toUpperCase() ??
                        (user.email ?? "Z")[0].toUpperCase()}
                    </span>
                  )}
                  <span className="max-w-[120px] truncate text-[11px] tracking-wide text-fuchsia-100/90">
                    {(user.user_metadata?.name as string | undefined) ??
                      user.email ??
                      user.phone}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Sign out"
                  title="Sign out"
                  className="border border-violet-500/30 text-slate-300 hover:border-fuchsia-400/60 hover:bg-violet-500/10 hover:text-fuchsia-300"
                  onClick={() => void signOut()}
                >
                  <LogOut className="h-4.5 w-4.5" />
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="border border-violet-500/30 text-slate-200 hover:border-fuchsia-400/60 hover:bg-violet-500/10 hover:text-fuchsia-300 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: -8, scale: 0.99 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: -8, scale: 0.99 }
                }
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="zx-hairline mx-auto mt-2 max-w-6xl rounded-2xl bg-[#0a0f1e]/95 p-2 backdrop-blur-2xl md:hidden"
              >
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.path}
                    type="button"
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, x: -10 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35 }}
                    className={`zx-mono flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm tracking-wide transition-colors ${
                      isActive(item.path)
                        ? "bg-violet-500/15 text-fuchsia-200"
                        : "text-slate-300/85 hover:bg-violet-500/10 hover:text-fuchsia-200"
                    }`}
                    onClick={() => {
                      go(item.path);
                      setMobileMenuOpen(false);
                    }}
                    data-ocid={`nav.${item.label
                      .toLowerCase()
                      .replace(" ", "_")}.link`}
                  >
                    {item.label}
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive(item.path)
                          ? "bg-fuchsia-300"
                          : "bg-transparent"
                      }`}
                    />
                  </motion.button>
                ))}

                {/* signed-in: sign out row (mobile) */}
                {status === "signed-in" && (
                  <button
                    type="button"
                    onClick={() => {
                      void signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="zx-mono mt-1 flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm tracking-wide text-slate-300/85 transition-colors hover:bg-violet-500/10 hover:text-fuchsia-200"
                  >
                    Sign out
                    <LogOut className="h-4 w-4" />
                  </button>
                )}
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ============ Main Content ============ */}
        {/* overflow-x: clip (not hidden!) — hidden would break position:sticky,
            which the landing page's scroll-driven feature stage depends on */}
        <main className="relative z-10 w-full overflow-x-clip pt-24">
          <Outlet />
        </main>

        {/* ============ Footer ============ */}
        <footer className="relative z-10 mt-16 w-full border-t border-violet-500/15 bg-[#070b16]/80 py-14 backdrop-blur-xl">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-10 grid gap-10 md:grid-cols-3">
              <div className="space-y-4">
                <BrandMark />
                <p className="zx-mono max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Next-generation AI intelligence for your desktop
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="zx-eyebrow zx-mono">Index</h3>
                <div className="flex flex-col items-start gap-2.5">
                  {navItems.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      className="zx-underline-draw text-sm text-muted-foreground transition-colors hover:text-fuchsia-300"
                      onClick={() => go(item.path)}
                    >
                      {item.label}
                    </button>
                  ))}
                  <a
                    href="https://thejollypodcast.wordpress.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zx-underline-draw text-sm text-muted-foreground transition-colors hover:text-fuchsia-300"
                  >
                    Podcast
                  </a>
                  <a
                    href="https://website.beacons.ai/divyamarora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zx-underline-draw text-sm text-muted-foreground transition-colors hover:text-fuchsia-300"
                  >
                    Beacons
                  </a>
                  <a
                    href="https://youtube.com/@jollygamerytog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zx-underline-draw text-sm text-muted-foreground transition-colors hover:text-fuchsia-300"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.instagram.com/divyyam_arora?igsh=bmx2emxhOGowa2tq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="zx-underline-draw text-sm text-muted-foreground transition-colors hover:text-fuchsia-300"
                  >
                    Instagram
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="zx-eyebrow zx-mono">Connect</h3>
                <div className="flex gap-3">
                  {[
                    {
                      href: "https://youtube.com/@jollygamerytog",
                      icon: SiYoutube,
                      label: "YouTube",
                    },
                    {
                      href: "https://www.instagram.com/divyyam_arora?igsh=bmx2emxhOGowa2tq",
                      icon: SiInstagram,
                      label: "Instagram",
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/20 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/60 hover:text-fuchsia-300"
                    >
                      <s.icon className="h-4.5 w-4.5" />
                    </a>
                  ))}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/20 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/60 hover:text-fuchsia-300"
                  >
                    <SiX className="h-4 w-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/20 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/60 hover:text-fuchsia-300"
                  >
                    <SiFacebook className="h-4.5 w-4.5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-500/20 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/60 hover:text-fuchsia-300"
                  >
                    <FaLinkedin className="h-4.5 w-4.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="zx-mono border-t border-violet-500/10 pt-8 text-center text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} Jolly Tech. Powered by{" "}
                <span className="zx-gradient-text font-semibold tracking-wider">
                  ZEROX AI
                </span>
              </p>
            </div>
          </div>
        </footer>

        {/* Chatbot Widget */}
        <ChatbotWidget />
      </div>
    </SmoothScroll>
  );
}
