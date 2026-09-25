import { useLowPowerMode } from "@/hooks/useLowPowerMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Fixed atmosphere that sits behind every page:
 * aurora blobs (CSS drift), engineering grid, a slow scanline,
 * vignette and film grain. Pure CSS — near-zero runtime cost.
 * Warm amber counter-light keeps it out of "AI blue" territory.
 */
export default function Atmosphere() {
  const isLowPower = useLowPowerMode();
  const prefersReducedMotion = useReducedMotion();

  const still = isLowPower || prefersReducedMotion;

  return (
    <>
      <div
        className="zx-atmosphere"
        aria-hidden="true"
        style={still ? { animation: "none" } : undefined}
      >
        <div
          className="zx-grid"
          style={still ? { animation: "none" } : undefined}
        />

        {/* THREE full-screen 90px-blur layers repaint every frame on the
            compositor — collapsed into ONE pre-blurred layer. */}
        {!isLowPower && (
          <div
            className="zx-atmo-blob zx-atmo-a"
            style={still ? { animation: "none" } : undefined}
          />
        )}
        {!still && (
          <div
            className="absolute inset-x-0 top-0 h-full overflow-hidden"
          >
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(232,121,249,0.14), transparent)",
                animation: "zx-scan 9s linear infinite",
              }}
            />
          </div>
        )}
      </div>

      <div className="zx-vignette" aria-hidden="true" />
      {!isLowPower && <div className="zx-grain" aria-hidden="true" />}
    </>
  );
}
