import { useState } from "react";

function toSentenceCase(text: string) {
  return text
    .toLowerCase()
    .replace(
      /(^|[.!?]\s+)([a-z])/g,
      (_, prefix, char) => prefix + char.toUpperCase(),
    );
}

function toTitleCase(text: string) {
  return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function TextCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeCase, setActiveCase] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = (type: string) => {
    setActiveCase(type);
    switch (type) {
      case "upper":
        setOutput(input.toUpperCase());
        break;
      case "lower":
        setOutput(input.toLowerCase());
        break;
      case "sentence":
        setOutput(toSentenceCase(input));
        break;
      case "title":
        setOutput(toTitleCase(input));
        break;
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const caseButtons = [
    { id: "upper", label: "UPPERCASE" },
    { id: "lower", label: "lowercase" },
    { id: "sentence", label: "Sentence case" },
    { id: "title", label: "Capitalize Each Word" },
  ];

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 font-mono">
        Type or paste text, then choose a conversion.
      </p>
      <textarea
        className="w-full h-32 bg-slate-900/60 border border-cyan-500/20 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 font-mono resize-none focus:outline-none focus:border-cyan-400/60 transition-all"
        placeholder="Enter your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        data-ocid="textcase.textarea"
      />

      <div className="grid grid-cols-2 gap-2">
        {caseButtons.map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => convert(btn.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-mono border transition-all duration-200 ${
              activeCase === btn.id
                ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                : "bg-slate-900/60 border-cyan-500/20 text-slate-300 hover:border-cyan-400/40 hover:bg-cyan-500/10"
            }`}
            data-ocid={`textcase.${btn.id}.button`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {output && (
        <div className="relative">
          <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-4">
            <p className="text-sm text-slate-200 font-mono whitespace-pre-wrap break-words">
              {output}
            </p>
          </div>
          <button
            type="button"
            onClick={copy}
            className="absolute top-3 right-3 text-xs font-mono px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
            data-ocid="textcase.copy.button"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setInput("");
          setOutput("");
          setActiveCase("");
        }}
        className="text-xs font-mono text-slate-500 hover:text-red-400 transition-colors"
        data-ocid="textcase.delete_button"
      >
        ✕ Clear
      </button>
    </div>
  );
}
