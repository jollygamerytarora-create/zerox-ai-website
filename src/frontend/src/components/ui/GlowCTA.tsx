import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface GlowCTAProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
  dataOcid?: string;
}

/**
 * Zerox "god button" — the site-wide premium CTA.
 * solid: violet→fuchsia gradient pill with glow halo + sheen sweep.
 * outline: glass pill with a gradient hairline.
 */
export default function GlowCTA({
  children,
  onClick,
  variant = "solid",
  className = "",
  dataOcid,
}: GlowCTAProps) {
  const solid = variant === "solid";

  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={dataOcid}
      className={`group relative inline-flex shrink-0 items-center justify-center rounded-full outline-none transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-fuchsia-300/70 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
    >
      {/* glow halo */}
      {solid && (
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 opacity-45 blur-lg transition-opacity duration-500 group-hover:opacity-85"
        />
      )}

      {/* gradient hairline border */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full p-px"
        style={{
          background: solid
            ? "linear-gradient(90deg, rgba(196,181,253,0.85), rgba(240,171,252,0.9), rgba(251,207,232,0.85))"
            : "linear-gradient(90deg, rgba(168,85,247,0.55), rgba(232,121,249,0.65), rgba(168,85,247,0.55))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* fill */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full transition-transform duration-500 group-hover:scale-[1.015] ${
          solid
            ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-fuchsia-500"
            : "bg-[#0d0a1c]/80 backdrop-blur-xl"
        }`}
      />

      {/* sheen sweep */}
      <span
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-full"
      >
        <span className="absolute left-0 top-0 h-full w-1/3 origin-left -translate-x-full skew-x-[-18deg] bg-white/20 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[320%]" />
      </span>

      {/* label */}
      <span
        className={`relative z-10 flex items-center gap-2.5 px-8 py-4 text-base font-semibold tracking-wide sm:px-10 ${
          solid ? "text-white" : "text-fuchsia-100"
        }`}
        style={
          solid ? { textShadow: "0 1px 12px rgba(0,0,0,0.35)" } : undefined
        }
      >
        {children}
        <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </button>
  );
}
