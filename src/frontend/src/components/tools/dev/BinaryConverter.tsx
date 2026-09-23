import { useState } from "react";

export default function BinaryConverter() {
  const [decInput, setDecInput] = useState("");
  const [binInput, setBinInput] = useState("");
  const [decResult, setDecResult] = useState("");
  const [binResult, setBinResult] = useState("");

  const toBinary = () => {
    const n = Number.parseInt(decInput, 10);
    if (Number.isNaN(n)) {
      setBinResult("Invalid number");
      return;
    }
    setBinResult(n.toString(2));
  };
  const toDecimal = () => {
    if (!/^[01]+$/.test(binInput)) {
      setDecResult("Invalid binary");
      return;
    }
    setDecResult(Number.parseInt(binInput, 2).toString());
  };
  const copy = (val: string) => navigator.clipboard?.writeText(val);

  return (
    <div className="space-y-6 font-mono">
      <p className="text-xs text-slate-400">
        Convert numbers between decimal and binary.
      </p>
      <div className="space-y-3">
        <span className="text-xs text-cyan-400">Decimal → Binary</span>
        <div className="flex gap-2">
          <input
            id="dec-input"
            value={decInput}
            onChange={(e) => setDecInput(e.target.value)}
            placeholder="Enter decimal number"
            className="flex-1 bg-slate-900 border border-cyan-500/20 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60"
          />
          <button
            type="button"
            onClick={toBinary}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm hover:bg-cyan-500/20 transition-all"
          >
            Convert
          </button>
        </div>
        {binResult && (
          <div className="flex items-center gap-2">
            <span className="flex-1 bg-slate-800 rounded-xl px-4 py-2 text-sm text-green-400">
              {binResult}
            </span>
            <button
              type="button"
              onClick={() => copy(binResult)}
              className="text-xs text-slate-500 hover:text-cyan-300 px-2"
            >
              Copy
            </button>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <span className="text-xs text-cyan-400">Binary → Decimal</span>
        <div className="flex gap-2">
          <input
            id="bin-input"
            value={binInput}
            onChange={(e) => setBinInput(e.target.value)}
            placeholder="Enter binary (e.g. 1010)"
            className="flex-1 bg-slate-900 border border-cyan-500/20 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60"
          />
          <button
            type="button"
            onClick={toDecimal}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm hover:bg-cyan-500/20 transition-all"
          >
            Convert
          </button>
        </div>
        {decResult && (
          <div className="flex items-center gap-2">
            <span className="flex-1 bg-slate-800 rounded-xl px-4 py-2 text-sm text-green-400">
              {decResult}
            </span>
            <button
              type="button"
              onClick={() => copy(decResult)}
              className="text-xs text-slate-500 hover:text-cyan-300 px-2"
            >
              Copy
            </button>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          setDecInput("");
          setBinInput("");
          setDecResult("");
          setBinResult("");
        }}
        className="text-xs text-slate-500 hover:text-red-400 transition-colors"
      >
        Reset
      </button>
    </div>
  );
}
