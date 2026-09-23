import { useState } from "react";
import { paragraphs } from "./paragraphs";

function getShortText() {
  const p = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  return p.split(" ").slice(0, 12).join(" ");
}

type Phase = "idle" | "memorize" | "typing" | "done";

export default function MemoryTyping() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(3);

  const start = () => {
    const t = getShortText();
    setText(t);
    setTyped("");
    setPhase("memorize");
    setCountdown(3);
    let c = 3;
    const iv = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(iv);
        setPhase("typing");
      }
    }, 1000);
  };

  const submit = () => {
    const targetWords = text.toLowerCase().split(" ");
    const typedWords = typed.toLowerCase().split(" ");
    let correct = 0;
    for (const [i, w] of targetWords.entries()) {
      if (typedWords[i] === w) correct++;
    }
    setScore(Math.round((correct / targetWords.length) * 100));
    setPhase("done");
  };

  return (
    <div className="space-y-5 font-mono">
      <p className="text-xs text-slate-400">
        A short phrase will appear for 3 seconds. Memorize it, then type it from
        memory!
      </p>

      {phase === "idle" && (
        <button
          type="button"
          onClick={start}
          className="px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
          data-ocid="typing.memory.primary_button"
        >
          Start Memory Test ▶
        </button>
      )}

      {phase === "memorize" && (
        <div className="rounded-xl bg-slate-900/70 border border-yellow-500/30 p-5 text-center">
          <p className="text-xs text-yellow-500 mb-2">
            MEMORIZE THIS — disappears in {countdown}s
          </p>
          <p className="text-lg text-slate-100 leading-relaxed">{text}</p>
        </div>
      )}

      {phase === "typing" && (
        <div className="space-y-4">
          <p className="text-xs text-cyan-400">Now type what you remember!</p>
          <textarea
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            className="w-full rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-200 p-3 text-sm resize-none focus:outline-none focus:border-cyan-400"
            rows={3}
            placeholder="Type from memory..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={submit}
            className="px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
            data-ocid="typing.memory.submit_button"
          >
            Submit ✓
          </button>
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-4">
          <div className="text-center py-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/5">
            <p className="text-5xl font-bold text-cyan-300">{score}%</p>
            <p className="text-slate-400 mt-1 text-sm">
              {score >= 80
                ? "Great memory! 🧠"
                : score >= 50
                  ? "Not bad! Keep practicing."
                  : "Try again — focus hard!"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
            <p className="text-xs text-slate-500 mb-1">
              The original text was:
            </p>
            <p className="text-slate-300 text-sm">{text}</p>
          </div>
          <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
            <p className="text-xs text-slate-500 mb-1">You typed:</p>
            <p className="text-slate-300 text-sm">{typed}</p>
          </div>
          <button
            type="button"
            onClick={start}
            className="w-full py-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all"
            data-ocid="typing.memory.secondary_button"
          >
            Try Again ↺
          </button>
        </div>
      )}
    </div>
  );
}
