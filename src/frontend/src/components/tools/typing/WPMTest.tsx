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

function WordDisplay({
  text,
  typed,
  containerRef,
}: {
  text: string;
  typed: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const words = text.split(" ");
  const typedWords = typed.split(" ");
  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto whitespace-nowrap rounded-xl bg-slate-900/70 border border-cyan-500/20 p-4 text-lg leading-relaxed"
      style={{ scrollbarWidth: "none" }}
    >
      {words.map((word, wi) => {
        const typedWord = typedWords[wi] ?? "";
        const isCurrentWord = wi === typedWords.length - 1;
        const isDone = wi < typedWords.length - 1;
        const wordKey = `w${wi}-${word}`;
        return (
          <span
            key={wordKey}
            data-word={wi}
            className={`inline-block mr-2 px-0.5 rounded ${isCurrentWord ? "border-b-2 border-cyan-400" : ""}`}
          >
            {word.split("").map((char, ci) => {
              let color = "text-slate-500";
              if (isDone || isCurrentWord) {
                if (ci < typedWord.length) {
                  color =
                    typedWord[ci] === char ? "text-green-400" : "text-red-400";
                }
              }
              const charKey = `${wordKey}-c${ci}`;
              return (
                <span key={charKey} className={color}>
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}

export default function WPMTest() {
  const [duration, setDuration] = useState(60);
  const [customDur, setCustomDur] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState(() => getRandomParagraph());
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [finalStats, setFinalStats] = useState<{
    wpm: number;
    accuracy: number;
    mistakes: number;
  } | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef("");
  const textRef = useRef(text);

  const calcStats = useCallback((typedStr: string, elapsed: number) => {
    const wordCount = typedStr.trim().split(/\s+/).filter(Boolean).length;
    const mins = elapsed / 60;
    const w = mins > 0 ? Math.round(wordCount / mins) : 0;
    let correct = 0;
    const src = textRef.current;
    for (let i = 0; i < typedStr.length; i++) {
      if (typedStr[i] === src[i]) correct++;
    }
    const acc =
      typedStr.length > 0 ? Math.round((correct / typedStr.length) * 100) : 100;
    return { wpm: w, accuracy: acc, mistakes: typedStr.length - correct };
  }, []);

  const startTest = () => {
    const newText = getRandomParagraph(text);
    const d = customDur ? Number.parseInt(customDur) || 60 : duration;
    setText(newText);
    textRef.current = newText;
    typedRef.current = "";
    setTyped("");
    setTimeLeft(d);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setFinalStats(null);
    setPhase("running");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (phase !== "running") return;
    const d = customDur ? Number.parseInt(customDur) || 60 : duration;
    const start = Date.now();
    const iv = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, d - elapsed);
      setTimeLeft(Math.ceil(remaining));
      const stats = calcStats(typedRef.current, elapsed);
      setWpm(stats.wpm);
      setAccuracy(stats.accuracy);
      setMistakes(stats.mistakes);
      if (remaining <= 0) {
        const fs = calcStats(typedRef.current, d);
        setFinalStats(fs);
        clearInterval(iv);
        setPhase("done");
      }
    }, 200);
    return () => clearInterval(iv);
  }, [phase, duration, customDur, calcStats]);

  useEffect(() => {
    if (phase !== "running" || !containerRef.current) return;
    const typedWords = typed.split(" ");
    const currentWordIdx = typedWords.length - 1;
    const wordEls = containerRef.current.querySelectorAll("[data-word]");
    if (wordEls[currentWordIdx]) {
      (wordEls[currentWordIdx] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [typed, phase]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (phase !== "running") return;
    typedRef.current = e.target.value;
    setTyped(e.target.value);
  };

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
            Choose test duration and press Start.
          </p>
          <div className="flex flex-wrap gap-2">
            {[30, 60, 120].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDuration(d);
                  setCustomDur("");
                }}
                className={`px-4 py-2 rounded-lg text-sm border font-mono transition-all ${
                  duration === d && !customDur
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
          <button
            type="button"
            onClick={startTest}
            className="px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
            data-ocid="typing.wpm.primary_button"
          >
            Start Test ▶
          </button>
        </div>
      )}

      {phase === "running" && (
        <div className="space-y-4">
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-slate-500">WPM </span>
              <span className="text-cyan-400 font-bold">{wpm}</span>
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
          <WordDisplay text={text} typed={typed} containerRef={containerRef} />
          <textarea
            ref={inputRef}
            value={typed}
            onChange={handleInput}
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
            data-ocid="typing.wpm.enter_button"
          >
            ↵ ENTER (Next Word)
          </button>
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-4">
          <AnimalRank score={finalStats?.wpm ?? 0} type="wpm" />
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
              <p className="text-slate-500">Final WPM</p>
              <p className="text-cyan-400 font-bold text-xl">
                {finalStats?.wpm ?? 0}
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
            data-ocid="typing.wpm.secondary_button"
          >
            Try Again ↺
          </button>
        </div>
      )}
    </div>
  );
}
