import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import { Button } from "@/components/ui/button";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";
import BrandMark from "./BrandMark";

export default function SiteLayout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/30 w-full"
        style={{
          background: "rgba(5, 8, 22, 0.97)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="container mx-auto px-4 max-w-full">
          <div className="flex items-center justify-between h-20">
            <BrandMark />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`font-mono text-sm tracking-wide transition-all px-4 py-2 rounded ${
                    isActive(item.path)
                      ? "text-cyan-300 border border-cyan-400/60 bg-cyan-500/15 font-bold"
                      : "text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30"
                  }`}
                  onClick={() => navigate({ to: item.path })}
                  data-ocid={`nav.${item.label.toLowerCase().replace(" ", "_")}.link`}
                >
                  {isActive(item.path) ? `[${item.label}]` : item.label}
                </Button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-200 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 hover:bg-cyan-500/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav
              className="md:hidden py-4 space-y-1 border-t border-cyan-500/20"
              style={{ background: "rgba(5, 8, 22, 0.99)" }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start font-mono text-sm tracking-wide rounded ${
                    isActive(item.path)
                      ? "text-cyan-300 bg-cyan-500/15 border border-cyan-400/50 font-bold"
                      : "text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10"
                  }`}
                  onClick={() => {
                    navigate({ to: item.path });
                    setMobileMenuOpen(false);
                  }}
                  data-ocid={`nav.${item.label.toLowerCase().replace(" ", "_")}.link`}
                >
                  {isActive(item.path) ? `[${item.label}]` : item.label}
                </Button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-panel border-t border-cyan-500/20 py-12 mt-20 w-full">
        <div className="container mx-auto px-4 max-w-full">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <BrandMark />
              <p className="text-sm text-muted-foreground font-mono">
                Next-generation AI intelligence for your desktop
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400 font-mono tracking-wider">
                Quick Links
              </h3>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="link"
                    className="justify-start p-0 h-auto text-muted-foreground hover:text-cyan-400 font-mono text-sm"
                    onClick={() => navigate({ to: item.path })}
                  >
                    {item.label}
                  </Button>
                ))}
                <a
                  href="https://thejollypodcast.wordpress.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors text-left font-mono"
                >
                  Podcast
                </a>
                <a
                  href="https://website.beacons.ai/divyamarora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors text-left font-mono"
                >
                  Beacons
                </a>
                <a
                  href="https://youtube.com/@jollygamerytog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors text-left font-mono"
                >
                  YouTube
                </a>
                <a
                  href="https://www.instagram.com/divyyam_arora?igsh=bmx2emxhOGowa2tq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-cyan-400 text-sm transition-colors text-left font-mono"
                >
                  Instagram
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400 font-mono tracking-wider">
                Connect
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://youtube.com/@jollygamerytog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  <SiYoutube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/divyyam_arora?igsh=bmx2emxhOGowa2tq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  <SiInstagram className="w-5 h-5" />
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-cyan-400 h-auto p-0"
                >
                  <SiX className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-cyan-400 h-auto p-0"
                >
                  <SiFacebook className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-cyan-400 h-auto p-0"
                >
                  <SiLinkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-cyan-500/20 text-center text-sm text-muted-foreground font-mono">
            <p>
              © {new Date().getFullYear()} Jolly Tech. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined"
                    ? window.location.hostname
                    : "zerox-ai",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
