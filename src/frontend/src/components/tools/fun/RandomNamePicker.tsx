import { useState } from "react";

export default function RandomNamePicker() {
  const [input, setInput] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const names = input
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean);

  function pick() {
    if (names.length === 0) return;
    setAnimating(true);
    setPicked(null);
    let count = 0;
    const interval = setInterval(() => {
      setPicked(names[Math.floor(Math.random() * names.length)]);
      count++;
      if (count >= 15) {
        clearInterval(interval);
        setAnimating(false);
      }
    }, 80);
  }

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="name-input"
          className="block text-xs font-mono text-slate-400 mb-1"
        >
          Enter names (one per line)
        </label>
        <textarea
          id="name-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder={"Alice\nBob\nCharlie\nDiana"}
          className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-cyan-500/20 text-slate-200 font-mono text-sm focus:outline-none focus:border-cyan-400/60 resize-none"
          data-ocid="name_picker.textarea"
        />
        <p className="text-xs text-slate-500 font-mono mt-1">
          {names.length} name{names.length !== 1 ? "s" : ""} entered
        </p>
      </div>
      <button
        type="button"
        onClick={pick}
        disabled={names.length < 2}
        className="w-full py-3 rounded-xl font-mono font-bold text-sm bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all disabled:opacity-40"
        data-ocid="name_picker.submit_button"
      >
        🎲 Pick a Name
      </button>
      {picked && (
        <div
          className={`rounded-xl p-6 bg-cyan-500/5 border border-cyan-500/30 text-center ${
            animating ? "scale-95" : "scale-100"
          }`}
          style={{ transition: "transform 0.1s" }}
        >
          <p className="text-xs font-mono text-slate-400 mb-2">
            {animating ? "Picking..." : "🎉 Selected"}
          </p>
          <p className="text-3xl font-bold font-mono text-cyan-200">{picked}</p>
        </div>
      )}
    </div>
  );
}
