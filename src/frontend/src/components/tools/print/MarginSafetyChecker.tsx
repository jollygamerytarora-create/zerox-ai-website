import { useRef, useState } from "react";

export default function MarginSafetyChecker() {
  const [margin, setMargin] = useState(15);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImgSrc(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  const pct = (margin / 297) * 100;

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 font-mono">
        Upload an image and visualise safe print margins.
      </p>
      <div>
        <label
          htmlFor="margin-size"
          className="block text-xs font-mono text-slate-400 mb-1"
        >
          Margin Size: {margin}mm
        </label>
        <input
          id="margin-size"
          type="range"
          min={5}
          max={40}
          value={margin}
          onChange={(e) => setMargin(+e.target.value)}
          className="w-full accent-cyan-400"
          data-ocid="margin_checker.margin.input"
        />
      </div>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="w-full py-3 rounded-xl font-mono text-sm border border-dashed border-cyan-500/40 text-slate-400 hover:border-cyan-400/70 hover:text-cyan-300 transition-all"
        data-ocid="margin_checker.upload_button"
      >
        📁 Upload Image
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {imgSrc && (
        <div className="relative rounded-xl overflow-hidden border border-cyan-500/20">
          <img
            src={imgSrc}
            alt="preview"
            className="w-full object-contain max-h-64"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: `inset 0 0 0 ${pct}% rgba(239,68,68,0.25)`,
              border: `${pct * 2}px solid rgba(239,68,68,0.5)`,
            }}
          />
          <div className="absolute top-2 left-2 text-xs font-mono bg-red-500/80 text-white px-2 py-1 rounded">
            ⚠ Danger zone: {margin}mm margin
          </div>
        </div>
      )}
      {imgSrc && (
        <p className="text-xs text-slate-400 font-mono">
          Red overlay shows the unsafe print margin area. Keep important content
          inside the safe zone.
        </p>
      )}
    </div>
  );
}
