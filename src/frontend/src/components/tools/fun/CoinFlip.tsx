import { useState } from "react";

export default function CoinFlip() {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [count, setCount] = useState({ heads: 0, tails: 0 });

  function flip() {
    setFlipping(true);
    setResult(null);
    setTimeout(() => {
      const r = Math.random() < 0.5 ? "heads" : "tails";
      setResult(r);
      setCount((c) => ({ ...c, [r]: c[r] + 1 }));
      setFlipping(false);
    }, 700);
  }

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div
          className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl border-4 select-none ${
            flipping
              ? "animate-spin border-cyan-400 bg-cyan-500/20"
              : result === "heads"
                ? "border-yellow-400 bg-yellow-500/10"
                : result === "tails"
                  ? "border-purple-400 bg-purple-500/10"
                  : "border-slate-700 bg-slate-800/60"
          }`}
          style={{ transition: flipping ? "none" : "all 0.4s" }}
        >
          {flipping
            ? "🪙"
            : result === "heads"
              ? "👑"
              : result === "tails"
                ? "🦅"
                : "🪙"}
        </div>
      </div>
      {result && !flipping && (
        <p className="text-2xl font-bold font-mono text-cyan-200 capitalize">
          {result}!
        </p>
      )}
      <button
        type="button"
        onClick={flip}
        disabled={flipping}
        className="px-8 py-3 rounded-xl font-mono font-bold text-sm bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all disabled:opacity-50"
        data-ocid="coin_flip.submit_button"
      >
        {flipping ? "Flipping..." : "Flip Coin"}
      </button>
      {(count.heads > 0 || count.tails > 0) && (
        <div className="flex justify-center gap-6 text-xs font-mono text-slate-400">
          <span>
            👑 Heads:{" "}
            <span className="text-cyan-300 font-bold">{count.heads}</span>
          </span>
          <span>
            🦅 Tails:{" "}
            <span className="text-purple-300 font-bold">{count.tails}</span>
          </span>
        </div>
      )}
    </div>
  );
}
