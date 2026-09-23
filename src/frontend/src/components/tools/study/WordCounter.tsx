import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const sentences =
    text.trim() === "" ? 0 : (text.match(/[.!?]+/g) || []).length;
  const paragraphs =
    text.trim() === "" ? 0 : text.split(/\n\n+/).filter((p) => p.trim()).length;
  const readingTime = words > 0 ? Math.ceil(words / 200) : 0;

  const stats = [
    { label: "Words", value: words, color: "text-cyan-400" },
    { label: "Characters", value: characters, color: "text-blue-400" },
    { label: "Sentences", value: sentences, color: "text-purple-400" },
    { label: "Paragraphs", value: paragraphs, color: "text-green-400" },
    {
      label: "Read Time",
      value: readingTime === 0 ? "0 min" : `${readingTime} min`,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 font-mono">
        Paste or type your text below to see live statistics.
      </p>
      <textarea
        className="w-full h-40 bg-slate-900/60 border border-cyan-500/20 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 font-mono resize-none focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(0,217,255,0.1)] transition-all"
        placeholder="Start typing or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-ocid="wordcounter.textarea"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900/60 border border-cyan-500/10 rounded-xl p-4 text-center"
          >
            <p className={`text-2xl font-bold font-mono ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setText("")}
        className="text-xs font-mono text-slate-500 hover:text-red-400 transition-colors"
        data-ocid="wordcounter.delete_button"
      >
        ✕ Clear text
      </button>
    </div>
  );
}
