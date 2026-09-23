import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setOutput("Encoding error");
    }
  };
  const decode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
    } catch {
      setOutput("Invalid Base64 string");
    }
  };
  const copy = () => navigator.clipboard?.writeText(output);

  return (
    <div className="space-y-5 font-mono">
      <p className="text-xs text-slate-400">Encode or decode Base64 text.</p>
      <div>
        <span className="text-xs text-cyan-400 mb-1 block">Input</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text or Base64 here..."
          rows={4}
          className="w-full bg-slate-900 border border-cyan-500/20 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60 resize-none"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={encode}
          className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm hover:bg-cyan-500/20 transition-all"
        >
          Encode
        </button>
        <button
          type="button"
          onClick={decode}
          className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm hover:bg-purple-500/20 transition-all"
        >
          Decode
        </button>
        <button
          type="button"
          onClick={() => {
            setInput("");
            setOutput("");
          }}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2"
        >
          Reset
        </button>
      </div>
      {output && (
        <div>
          <span className="text-xs text-cyan-400 mb-1 block">Output</span>
          <div className="flex items-start gap-2">
            <pre className="flex-1 bg-slate-800 rounded-xl px-4 py-3 text-sm text-green-400 whitespace-pre-wrap break-all">
              {output}
            </pre>
            <button
              type="button"
              onClick={copy}
              className="text-xs text-slate-500 hover:text-cyan-300 px-2 pt-2"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
