import { useState } from "react";

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => {
    setUuids(Array.from({ length: Math.min(count, 10) }, generateUUID));
  };
  const copy = (val: string) => {
    navigator.clipboard?.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 1500);
  };
  const copyAll = () => {
    navigator.clipboard?.writeText(uuids.join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-5 font-mono">
      <p className="text-xs text-slate-400">Generate random UUIDs (v4).</p>
      <div className="flex items-center gap-3">
        <span className="text-xs text-cyan-400">Count:</span>
        <input
          type="number"
          min={1}
          max={10}
          value={count}
          onChange={(e) =>
            setCount(Math.max(1, Math.min(10, Number(e.target.value))))
          }
          className="w-20 bg-slate-900 border border-cyan-500/20 rounded-xl px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60"
        />
        <button
          type="button"
          onClick={generate}
          className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm hover:bg-cyan-500/20 transition-all"
        >
          Generate
        </button>
        {uuids.length > 1 && (
          <button
            type="button"
            onClick={copyAll}
            className="text-xs text-slate-400 hover:text-cyan-300 border border-slate-700 px-3 py-1.5 rounded-xl"
          >
            {copied === "all" ? "Copied!" : "Copy All"}
          </button>
        )}
      </div>
      <div className="space-y-2">
        {uuids.map((u) => (
          <div key={u} className="flex items-center gap-2">
            <code className="flex-1 bg-slate-800 rounded-xl px-4 py-2 text-sm text-green-400 break-all">
              {u}
            </code>
            <button
              type="button"
              onClick={() => copy(u)}
              className="text-xs text-slate-500 hover:text-cyan-300 px-2"
            >
              {copied === u ? "✓" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
