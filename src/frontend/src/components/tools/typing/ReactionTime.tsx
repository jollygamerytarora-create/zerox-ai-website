import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "waiting" | "go" | "done" | "early";

export default function ReactionTime() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const goTime = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startWaiting = () => {
    setPhase("waiting");
    const delay = 1500 + Math.random() * 3500;
    timerRef.current = setTimeout(() => {
      goTime.current = Date.now();
      setPhase("go");
    }, delay);
  };

  const handleAction = () => {
    if (phase === "idle") {
      startWaiting();
      return;
    }
    if (phase === "waiting") {
      clearTimeout(timerRef.current!);
      setPhase("early");
      return;
    }
    if (phase === "go") {
      const ms = Date.now() - goTime.current;
      setReactionMs(ms);
      setHistory((h) => [...h, ms]);
      setBest((b) => (b === null || ms < b ? ms : b));
      setPhase("done");
    }
    if (phase === "done" || phase === "early") {
      startWaiting();
    }
  };

  useEffect(() => () => clearTimeout(timerRef.current!), []);

  const bgColor = phase === "go" ? "#166534" : "#0f172a";
  const borderColor = phase === "go" ? "#4ade80" : "#334155";

  return (
    <div className="space-y-4 font-mono">
      <p className="text-xs text-slate-400">
        Press the button when it turns green. Click too early and it resets!
      </p>
      <button
        type="button"
        onClick={handleAction}
        className="w-full h-44 rounded-2xl text-xl font-bold transition-all duration-150 active:scale-95 border-2"
        style={{ background: bgColor, borderColor }}
        data-ocid="typing.reaction.primary_button"
      >
        {phase === "idle" && (
          <span className="text-slate-400">Click to Start</span>
        )}
        {phase === "waiting" && (
          <span className="text-slate-500 animate-pulse">
            Wait for green...
          </span>
        )}
        {phase === "go" && (
          <span className="text-green-300">CLICK NOW! ⚡</span>
        )}
        {phase === "done" && (
          <span className="text-cyan-300">{reactionMs}ms — Click to retry</span>
        )}
        {phase === "early" && (
          <span className="text-red-400">Too early! Click to try again</span>
        )}
      </button>
      {best !== null && (
        <div className="flex gap-4 text-sm">
          <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3 flex-1">
            <p className="text-slate-500">Best</p>
            <p className="text-green-400 font-bold text-lg">{best}ms</p>
          </div>
          <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3 flex-1">
            <p className="text-slate-500">Attempts</p>
            <p className="text-cyan-400 font-bold text-lg">{history.length}</p>
          </div>
          {history.length > 1 && (
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3 flex-1">
              <p className="text-slate-500">Average</p>
              <p className="text-purple-400 font-bold text-lg">
                {Math.round(
                  history.reduce((a, b) => a + b, 0) / history.length,
                )}
                ms
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
