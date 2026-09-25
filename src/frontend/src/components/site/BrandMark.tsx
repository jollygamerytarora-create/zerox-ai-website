import { useState } from "react";

export default function BrandMark() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Asset is served by the deploy pipeline (assets/uploads); fall back to a wordmark.
    return (
      <div className="flex items-center gap-2 select-none">
        <span
          className="font-display text-xl font-extrabold tracking-[0.22em] text-fuchsia-300"
          style={{ textShadow: "0 0 12px rgba(168,85,247,0.45)" }}
        >
          JOLLYTECH
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 select-none">
      <img
        src="/assets/uploads/screenshot_2026-03-28-14-23-46-70_96b26121e545231a3c569311a54cda96-019d3405-249b-72dd-917f-b339377aed5c-1.jpg"
        alt="JollyTech Logo"
        className="h-12 w-auto object-contain"
        style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,0.4))" }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
