import { useState } from "react";

const SPEEDS = [
  { label: "Slow", wpm: 150 },
  { label: "Average", wpm: 200 },
  { label: "Fast", wpm: 300 },
];

export default function ReadingTimeCalculator() {
  const [text, setText] = useState("");
  const [speedWpm, setSpeedWpm] = useState(200);

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const totalSeconds = words > 0 ? Math.round((words / speedWpm) * 60) : 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const timeLabel =
    words === 0
      ? "—"
      : minutes === 0
        ? `${seconds}s`
        : seconds === 0
          ? `${minutes} min`
          : `${minutes} min ${seconds}s`;

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 font-mono">
        Paste your text and choose reading speed to estimate read time.
      </p>
      <textarea
        className="w-full h-32 bg-slate-900/60 border border-violet-500/20 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 font-mono resize-none focus:outline-none focus:border-fuchsia-400/60 transition-all"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-ocid="readtime.textarea"
      />

      <div>
        <p className="text-xs font-mono text-slate-400 mb-2">Reading Speed</p>
        <div className="flex gap-2">
          {SPEEDS.map((s) => (
            <button
              key={s.wpm}
              type="button"
              onClick={() => setSpeedWpm(s.wpm)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-mono border transition-all duration-200 ${
                speedWpm === s.wpm
                  ? "bg-violet-500/20 border-fuchsia-400/60 text-fuchsia-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  : "bg-slate-900/60 border-violet-500/20 text-slate-400 hover:border-fuchsia-400/40 hover:text-slate-200"
              }`}
              data-ocid={`readtime.${s.label.toLowerCase()}.button`}
            >
              {s.label}
              <span className="block text-xs opacity-60">{s.wpm} wpm</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/60 border border-violet-500/10 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold font-mono text-fuchsia-400">
            {words}
          </p>
          <p className="text-xs text-slate-500 mt-1 font-mono">Words</p>
        </div>
        <div className="bg-slate-900/60 border border-violet-500/10 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold font-mono text-green-400">
            {timeLabel}
          </p>
          <p className="text-xs text-slate-500 mt-1 font-mono">Reading Time</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setText("")}
        className="text-xs font-mono text-slate-500 hover:text-red-400 transition-colors"
        data-ocid="readtime.delete_button"
      >
        ✕ Clear
      </button>
    </div>
  );
}
