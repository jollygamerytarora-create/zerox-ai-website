import { useState } from "react";

export default function EssayLengthChecker() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const paragraphs =
    text.trim() === "" ? 0 : text.split(/\n\n+/).filter((p) => p.trim()).length;
  const pages = Number.parseFloat((words / 250).toFixed(1));

  let category = { label: "", color: "", hint: "" };
  if (words === 0) {
    category = {
      label: "No text",
      color: "text-slate-500",
      hint: "Start writing to see analysis.",
    };
  } else if (words < 500) {
    category = {
      label: "Short Essay",
      color: "text-amber-400",
      hint: "Under 500 words. Great for quick responses, reflections, or summaries.",
    };
  } else if (words <= 1500) {
    category = {
      label: "Standard Essay",
      color: "text-fuchsia-400",
      hint: "500–1500 words. Suitable for academic assignments and blog articles.",
    };
  } else {
    category = {
      label: "Long Essay",
      color: "text-purple-400",
      hint: "1500+ words. Research papers, detailed analyses, and dissertations.",
    };
  }

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 font-mono">
        Paste your essay to check length and get academic recommendations.
      </p>
      <textarea
        className="w-full h-36 bg-slate-900/60 border border-violet-500/20 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 font-mono resize-none focus:outline-none focus:border-fuchsia-400/60 transition-all"
        placeholder="Paste your essay here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-ocid="essay.textarea"
      />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Words", value: words, color: "text-fuchsia-400" },
          { label: "Paragraphs", value: paragraphs, color: "text-purple-400" },
          { label: "Pages (~250w)", value: pages, color: "text-blue-400" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-slate-900/60 border border-violet-500/10 rounded-xl p-4 text-center"
          >
            <p className={`text-2xl font-bold font-mono ${s.color}`}>
              {s.value}
            </p>
            <p className="text-xs text-slate-500 mt-1 font-mono">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-violet-500/20 bg-slate-900/40 p-4">
        <p className={`text-sm font-bold font-mono ${category.color}`}>
          {category.label}
        </p>
        <p className="text-xs text-slate-400 mt-1">{category.hint}</p>
      </div>

      <button
        type="button"
        onClick={() => setText("")}
        className="text-xs font-mono text-slate-500 hover:text-red-400 transition-colors"
        data-ocid="essay.delete_button"
      >
        ✕ Clear
      </button>
    </div>
  );
}
