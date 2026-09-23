import { useEffect, useRef, useState } from "react";
import AnimalRank from "./AnimalRank";

type Phase = "idle" | "running" | "done";

export default function ClicksPerMinute() {
  const [selectedDur, setSelectedDur] = useState(10);
  const [customDur, setCustomDur] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [cpm, setCpm] = useState(0);
  const [finalStats, setFinalStats] = useState<{
    cpm: number;
    clicks: number;
  } | null>(null);
  const startRef = useRef<number>(0);
  const clicksRef = useRef(0);
  const durRef = useRef(10);

  const getD = () =>
    customDur ? Number.parseInt(customDur) || 10 : selectedDur;

  const handleClick = () => {
    if (phase === "idle") {
      const d = getD();
      durRef.current = d;
      clicksRef.current = 1;
      setClicks(1);
      setTimeLeft(d);
      setPhase("running");
      startRef.current = Date.now();
      return;
    }
    if (phase === "running") {
      clicksRef.current += 1;
      setClicks(clicksRef.current);
    }
  };

  useEffect(() => {
    if (phase !== "running") return;
    const d = durRef.current;
    const iv = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      const remaining = Math.max(0, d - elapsed);
      setTimeLeft(Math.ceil(remaining));
      const mins = elapsed / 60;
      setCpm(mins > 0 ? Math.round(clicksRef.current / mins) : 0);
      if (remaining <= 0) {
        const finalCpm = Math.round(clicksRef.current / (d / 60));
        setFinalStats({ cpm: finalCpm, clicks: clicksRef.current });
        clearInterval(iv);
        setPhase("done");
      }
    }, 100);
    return () => clearInterval(iv);
  }, [phase]);

  const reset = () => {
    const d = getD();
    clicksRef.current = 0;
    setFinalStats(null);
    setPhase("idle");
    setClicks(0);
    setTimeLeft(d);
    setCpm(0);
  };

  return (
    <div className="space-y-5 font-mono">
      {phase === "idle" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Choose duration and click the big button to start!
          </p>
          <div className="flex flex-wrap gap-2">
            {[5, 10, 30].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setSelectedDur(d);
                  setCustomDur("");
                }}
                className={`px-4 py-2 rounded-lg text-sm border font-mono transition-all ${
                  selectedDur === d && !customDur
                    ? "border-cyan-400 bg-cyan-500/20 text-cyan-300"
                    : "border-slate-600 bg-slate-800/50 text-slate-400 hover:border-cyan-500/50"
                }`}
              >
                {d}s
              </button>
            ))}
            <input
              type="number"
              placeholder="Custom (s)"
              value={customDur}
              onChange={(e) => setCustomDur(e.target.value)}
              className="w-28 px-3 py-2 rounded-lg text-sm border border-slate-600 bg-slate-800/50 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      )}

      {phase !== "done" && (
        <div className="space-y-4">
          {phase === "running" && (
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-slate-500">Clicks </span>
                <span className="text-cyan-400 font-bold">{clicks}</span>
              </div>
              <div>
                <span className="text-slate-500">CPM </span>
                <span className="text-purple-400 font-bold">{cpm}</span>
              </div>
              <div className="ml-auto">
                <span className="text-slate-500">⏱ </span>
                <span className="text-yellow-400 font-bold">{timeLeft}s</span>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleClick}
            className="w-full h-40 rounded-2xl border-2 border-cyan-500/50 bg-cyan-500/10 text-cyan-200 text-2xl font-bold hover:bg-cyan-500/25 hover:border-cyan-400 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,217,255,0.15)]"
            data-ocid="typing.cpm_click.primary_button"
          >
            {phase === "idle" ? "Click Here to Start!" : `CLICK! (${clicks})`}
          </button>
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-4">
          <AnimalRank score={finalStats?.cpm ?? 0} type="cps" />
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
              <p className="text-slate-500">Total Clicks</p>
              <p className="text-cyan-400 font-bold text-xl">
                {finalStats?.clicks ?? 0}
              </p>
            </div>
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
              <p className="text-slate-500">Clicks/min</p>
              <p className="text-purple-400 font-bold text-xl">
                {finalStats?.cpm ?? 0}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={reset}
            className="w-full py-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all"
            data-ocid="typing.cpm_click.secondary_button"
          >
            Try Again ↺
          </button>
        </div>
      )}
    </div>
  );
}
