import { useState } from "react";

const sizes: Record<string, { w: number; h: number }> = {
  A4: { w: 210, h: 297 },
  A3: { w: 297, h: 420 },
  A5: { w: 148, h: 210 },
  Letter: { w: 215.9, h: 279.4 },
  Legal: { w: 215.9, h: 355.6 },
};

export default function PageSizeConverter() {
  const [from, setFrom] = useState("A4");
  const [to, setTo] = useState("Letter");

  const f = sizes[from];
  const t = sizes[to];

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 font-mono">
        Compare page dimensions in mm and inches.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="size-from"
            className="block text-xs font-mono text-slate-400 mb-1"
          >
            From Size
          </label>
          <select
            id="size-from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-slate-800/60 border border-cyan-500/20 text-slate-200 font-mono text-sm focus:outline-none focus:border-cyan-400/60"
            data-ocid="page_size.from.select"
          >
            {Object.keys(sizes).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="size-to"
            className="block text-xs font-mono text-slate-400 mb-1"
          >
            To Size
          </label>
          <select
            id="size-to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-slate-800/60 border border-cyan-500/20 text-slate-200 font-mono text-sm focus:outline-none focus:border-cyan-400/60"
            data-ocid="page_size.to.select"
          >
            {Object.keys(sizes).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: from, sz: f },
          { label: to, sz: t },
        ].map(({ label, sz }) => (
          <div
            key={label}
            className="rounded-xl p-4 bg-cyan-500/5 border border-cyan-500/20"
          >
            <p className="text-lg font-bold font-mono text-cyan-300 mb-1">
              {label}
            </p>
            <p className="text-sm font-mono text-slate-300">
              {sz.w} × {sz.h} mm
            </p>
            <p className="text-xs font-mono text-slate-500 mt-1">
              {(sz.w / 25.4).toFixed(1)}" × {(sz.h / 25.4).toFixed(1)}"
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-xl p-4 bg-slate-800/40 border border-slate-700/50 font-mono text-sm">
        <p className="text-slate-400 mb-1">Scale factor</p>
        <p className="text-cyan-300 font-bold">
          {(t.w / f.w).toFixed(3)} × width · {(t.h / f.h).toFixed(3)} × height
        </p>
      </div>
    </div>
  );
}
