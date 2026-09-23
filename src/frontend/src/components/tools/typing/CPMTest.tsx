import { useCallback, useEffect, useRef, useState } from "react";
import AnimalRank from "./AnimalRank";
import { paragraphs } from "./paragraphs";

function getRandomParagraph(exclude?: string) {
  let p: string;
  do {
    p = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  } while (p === exclude && paragraphs.length > 1);
  return p;
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

export default function CPMTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState(() => getRandomParagraph());
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [finalStats, setFinalStats] = useState<{
    cpm: number;
    accuracy: number;
    mistakes: number;
  } | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typedRef = useRef("");
  const textRef = useRef(text);

  const calcStats = useCallback((typedStr: string, elapsed: number) => {
    const mins = elapsed / 60;
    const c = mins > 0 ? Math.round(typedStr.length / mins) : 0;
    let correct = 0;
    const src = textRef.current;
    for (let i = 0; i < typedStr.length; i++)
      if (typedStr[i] === src[i]) correct++;
    const acc =
      typedStr.length > 0 ? Math.round((correct / typedStr.length) * 100) : 100;
    return { cpm: c, accuracy: acc, mistakes: typedStr.length - correct };
  }, []);

  const startTest = () => {
    const newText = getRandomParagraph(text);
    setText(newText);
    textRef.current = newText;
    typedRef.current = "";
    setTyped("");
    setTimeLeft(60);
    setCpm(0);
    setAccuracy(100);
    setMistakes(0);
    setFinalStats(null);
    setPhase("running");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (phase !== "running") return;
    const start = Date.now();
    const iv = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, 60 - elapsed);
      setTimeLeft(Math.ceil(remaining));
      const stats = calcStats(typedRef.current, elapsed);
      setCpm(stats.cpm);
      setAccuracy(stats.accuracy);
      setMistakes(stats.mistakes);
      if (remaining <= 0) {
        const fs = calcStats(typedRef.current, 60);
        setFinalStats(fs);
        clearInterval(iv);
        setPhase("done");
      }
    }, 200);
    return () => clearInterval(iv);
  }, [phase, calcStats]);

  const handleEnterButton = () => {
    if (phase !== "running") return;
    const newVal = `${typedRef.current.trimEnd()} `;
    typedRef.current = newVal;
    setTyped(newVal);
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-5 font-mono">
      {phase === "idle" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            60-second Characters Per Minute test. Type as accurately and quickly
            as possible.
          </p>
          <button
            type="button"
            onClick={startTest}
            className="px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
            data-ocid="typing.cpm.primary_button"
          >
            Start CPM Test ▶
          </button>
        </div>
      )}
      {phase === "running" && (
        <div className="space-y-4">
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-slate-500">CPM </span>
              <span className="text-cyan-400 font-bold">{cpm}</span>
            </div>
            <div>
              <span className="text-slate-500">ACC </span>
              <span className="text-green-400 font-bold">{accuracy}%</span>
            </div>
            <div>
              <span className="text-slate-500">ERR </span>
              <span className="text-red-400 font-bold">{mistakes}</span>
            </div>
            <div className="ml-auto">
              <span className="text-slate-500">⏱ </span>
              <span className="text-yellow-400 font-bold">{timeLeft}s</span>
            </div>
          </div>
          <CharDisplay source={text} typed={typed} />
          <textarea
            ref={inputRef}
            value={typed}
            onChange={(e) => {
              typedRef.current = e.target.value;
              setTyped(e.target.value);
            }}
            className="w-full rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-200 p-3 text-sm resize-none focus:outline-none focus:border-cyan-400"
            rows={2}
            placeholder="Start typing here..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={handleEnterButton}
            className="w-full py-3 rounded-xl bg-slate-800/80 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all text-sm tracking-widest font-bold"
            data-ocid="typing.cpm.enter_button"
          >
            ↵ ENTER (Next Word)
          </button>
        </div>
      )}
      {phase === "done" && (
        <div className="space-y-4">
          <AnimalRank score={finalStats?.cpm ?? 0} type="cpm" />
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
              <p className="text-slate-500">Final CPM</p>
              <p className="text-cyan-400 font-bold text-xl">
                {finalStats?.cpm ?? 0}
              </p>
            </div>
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
              <p className="text-slate-500">Accuracy</p>
              <p className="text-green-400 font-bold text-xl">
                {finalStats?.accuracy ?? 100}%
              </p>
            </div>
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
              <p className="text-slate-500">Mistakes</p>
              <p className="text-red-400 font-bold text-xl">
                {finalStats?.mistakes ?? 0}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={startTest}
            className="w-full py-3 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all"
            data-ocid="typing.cpm.secondary_button"
          >
            Try Again ↺
          </button>
        </div>
      )}
    </div>
  );
}
