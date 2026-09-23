import { useState } from "react";
import { paragraphs } from "./paragraphs";

function getRandomParagraph() {
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

type Phase = "idle" | "running" | "done";

function CharDisplay({ source, typed }: { source: string; typed: string }) {
  return (
    <div className="rounded-xl bg-slate-900/70 border border-cyan-500/20 p-4 text-sm leading-relaxed break-words">
      {source.split("").map((char, i) => {
        let color = "text-slate-500";
        if (i < typed.length)
          color = typed[i] === char ? "text-green-400" : "text-red-400";
        const key = `${i}-${char}`;
        return (
          <span key={key} className={color}>
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default function AccuracyTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");

  const start = () => {
    setText(getRandomParagraph());
    setTyped("");
    setPhase("running");
  };

  const submit = () => setPhase("done");

  const getStats = () => {
    let correct = 0;
    for (let i = 0; i < typed.length; i++) if (typed[i] === text[i]) correct++;
    const accuracy =
      typed.length > 0 ? Math.round((correct / typed.length) * 100) : 0;
    const errors = typed.length - correct;
    return { accuracy, errors, typed: typed.length };
  };

  const stats = phase === "done" ? getStats() : null;

  return (
    <div className="space-y-5 font-mono">
      <p className="text-xs text-slate-400">
        Focus on accuracy over speed. Type the paragraph, then submit to see
        your score.
      </p>

      {phase === "idle" && (
        <button
          type="button"
          onClick={start}
          className="px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
          data-ocid="typing.accuracy.primary_button"
        >
          Start Accuracy Test ▶
        </button>
      )}

      {phase === "running" && (
        <div className="space-y-4">
          <CharDisplay source={text} typed={typed} />
          <textarea
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            className="w-full rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-200 p-3 text-sm resize-none focus:outline-none focus:border-cyan-400"
            rows={3}
            placeholder="Type the paragraph above..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={submit}
            className="px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
            data-ocid="typing.accuracy.submit_button"
          >
            Submit &amp; Score ✓
          </button>
        </div>
      )}

      {phase === "done" && stats && (
        <div className="space-y-4">
          <div className="text-center py-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/5">
            <p
              className="text-5xl font-bold"
              style={{
                color:
                  stats.accuracy >= 90
                    ? "#4ade80"
                    : stats.accuracy >= 70
                      ? "#facc15"
                      : "#f87171",
              }}
            >
              {stats.accuracy}%
            </p>
            <p className="text-slate-400 mt-1 text-sm">Accuracy Score</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
              <p className="text-slate-500">Errors</p>
              <p className="text-red-400 font-bold text-xl">{stats.errors}</p>
            </div>
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
              <p className="text-slate-500">Chars Typed</p>
              <p className="text-cyan-400 font-bold text-xl">{stats.typed}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={start}
            className="w-full py-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all"
            data-ocid="typing.accuracy.secondary_button"
          >
            Try Again ↺
          </button>
        </div>
      )}
    </div>
  );
}
