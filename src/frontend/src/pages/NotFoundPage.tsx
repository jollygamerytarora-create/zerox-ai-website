import { useSeo } from "@/lib/seo";
import { SEO } from "@/lib/seoPages";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Compass, Home, Sparkles } from "lucide-react";

const LINKS = [
  { label: "Home", path: "/", desc: "Back to the surface" },
  { label: "Features", path: "/features", desc: "All 27 capabilities" },
  { label: "Pricing", path: "/pricing", desc: "Get Zerox AI" },
  { label: "Contact", path: "/contact", desc: "We reply fast" },
];

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[70svh] w-full flex-col items-center justify-center px-4 py-24 text-center">
      <div className="zx-mono mb-4 flex items-center gap-2 text-[10px] tracking-[0.35em] text-fuchsia-200/80">
        <Sparkles className="h-3.5 w-3.5" />
        ERROR 404 — PAGE NOT FOUND
      </div>

      <h1 className="zx-display text-[22vw] font-extrabold leading-none sm:text-[9rem]">
        <span className="zx-gradient-text">404</span>
      </h1>

      <p className="zx-serif mt-2 text-2xl italic text-mist/90 sm:text-3xl">
        This page drifted off the grid.
      </p>
      <p className="zx-mono mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        The link may be broken or the page may have moved. Let's get you back to
        something useful.
      </p>

      <div className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        {LINKS.map((l) => (
          <button
            key={l.path}
            type="button"
            onClick={() => navigate({ to: l.path })}
            className="group rounded-2xl border border-violet-300/25 bg-white/[0.04] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-fuchsia-300/60 hover:bg-fuchsia-400/[0.08]"
          >
            <div className="zx-mono text-sm font-semibold text-mist group-hover:text-fuchsia-200">
              {l.label}
            </div>
            <div className="zx-mono mt-1 text-[10px] text-muted-foreground">
              {l.desc}
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => window.history.back()}
        className="zx-mono mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-fuchsia-200/70 transition-colors hover:text-fuchsia-200"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        GO BACK
      </button>
    </div>
  );
}
