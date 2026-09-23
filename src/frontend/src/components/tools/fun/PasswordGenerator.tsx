import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [nums, setNums] = useState(true);
  const [syms, setSyms] = useState(true);
  const [upper, setUpper] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (nums) chars += "0123456789";
    if (syms) chars += "!@#$%^&*()-_=+[]{}|;:,.<>?";
    let pw = "";
    for (let i = 0; i < length; i++)
      pw += chars[Math.floor(Math.random() * chars.length)];
    setPassword(pw);
    setCopied(false);
  }

  function copy() {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const strength =
    password.length === 0
      ? 0
      : password.length < 8
        ? 1
        : password.length < 14
          ? 2
          : 3;
  const strengthLabel = ["", "Weak", "Medium", "Strong"];
  const strengthColor = [
    "",
    "text-red-400",
    "text-yellow-400",
    "text-green-400",
  ];

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="pw-length"
          className="block text-xs font-mono text-slate-400 mb-1"
        >
          Length: {length}
        </label>
        <input
          id="pw-length"
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(+e.target.value)}
          className="w-full accent-cyan-400"
          data-ocid="password_gen.length.input"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Numbers", val: nums, set: setNums, id: "nums" },
          { label: "Symbols", val: syms, set: setSyms, id: "syms" },
          { label: "Uppercase", val: upper, set: setUpper, id: "upper" },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => opt.set(!opt.val)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-all ${
              opt.val
                ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-300"
                : "bg-slate-800/40 border-slate-700 text-slate-400"
            }`}
            data-ocid={`password_gen.${opt.id}.toggle`}
          >
            {opt.val ? "✓" : "○"} {opt.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={generate}
        className="w-full py-3 rounded-xl font-mono font-bold text-sm bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all"
        data-ocid="password_gen.submit_button"
      >
        Generate Password
      </button>
      {password && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-xl px-4 py-3 bg-slate-800/60 border border-cyan-500/20">
            <code className="flex-1 text-sm text-cyan-200 font-mono break-all">
              {password}
            </code>
            <button
              type="button"
              onClick={copy}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 transition-all flex-shrink-0"
              data-ocid="password_gen.secondary_button"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className={`text-xs font-mono ${strengthColor[strength]}`}>
            Strength: {strengthLabel[strength]}
          </p>
        </div>
      )}
    </div>
  );
}
