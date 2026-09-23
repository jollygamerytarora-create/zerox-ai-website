import { useState } from "react";

export default function PrintingCostCalculator() {
  const [pages, setPages] = useState(1);
  const [color, setColor] = useState<"bw" | "color">("bw");
  const [sides, setSides] = useState<"single" | "double">("single");
  const [result, setResult] = useState<number | null>(null);

  const BW_PRICE = 1.5;
  const COLOR_PRICE = 8;

  function calculate() {
    const pricePerPage = color === "bw" ? BW_PRICE : COLOR_PRICE;
    const sheets = sides === "double" ? Math.ceil(pages / 2) : pages;
    setResult(sheets * pricePerPage);
  }

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 font-mono">
        Estimated cost based on standard Indian printing rates.
      </p>
      <div>
        <label
          htmlFor="pages-input"
          className="block text-xs font-mono text-slate-400 mb-1"
        >
          Number of Pages
        </label>
        <input
          id="pages-input"
          type="number"
          min={1}
          value={pages}
          onChange={(e) => setPages(Math.max(1, +e.target.value))}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-cyan-500/20 text-slate-200 font-mono text-sm focus:outline-none focus:border-cyan-400/60"
          data-ocid="print_cost.pages.input"
        />
      </div>
      <div>
        <p className="text-xs font-mono text-slate-400 mb-1">Print Type</p>
        <div className="flex gap-2">
          {(["bw", "color"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setColor(t)}
              className={`flex-1 py-2 rounded-lg font-mono text-xs border transition-all ${
                color === t
                  ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-300"
                  : "bg-slate-800/40 border-slate-700 text-slate-400 hover:border-cyan-500/40"
              }`}
              data-ocid={`print_cost.${t}.toggle`}
            >
              {t === "bw" ? "⬛ Black & White" : "🌈 Color"}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-mono text-slate-400 mb-1">Sided</p>
        <div className="flex gap-2">
          {(["single", "double"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSides(s)}
              className={`flex-1 py-2 rounded-lg font-mono text-xs border transition-all ${
                sides === s
                  ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-300"
                  : "bg-slate-800/40 border-slate-700 text-slate-400 hover:border-cyan-500/40"
              }`}
              data-ocid={`print_cost.${s}.toggle`}
            >
              {s === "single" ? "Single Sided" : "Double Sided"}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={calculate}
        className="w-full py-3 rounded-xl font-mono font-bold text-sm bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all"
        data-ocid="print_cost.submit_button"
      >
        Calculate Cost
      </button>
      {result !== null && (
        <div className="rounded-xl p-5 bg-cyan-500/5 border border-cyan-500/30 text-center">
          <p className="text-xs font-mono text-slate-400 mb-1">
            Estimated Cost
          </p>
          <p className="text-3xl font-bold font-mono text-cyan-300">
            ₹{result.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            {pages} page{pages > 1 ? "s" : ""} ·{" "}
            {color === "bw" ? "B&W" : "Color"} · {sides}-sided
          </p>
          <button
            type="button"
            onClick={() => setResult(null)}
            className="mt-3 text-xs font-mono text-slate-500 hover:text-slate-300"
            data-ocid="print_cost.cancel_button"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
