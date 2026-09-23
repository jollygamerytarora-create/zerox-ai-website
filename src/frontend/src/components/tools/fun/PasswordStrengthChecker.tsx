import { useState } from "react";

export default function PasswordStrengthChecker() {
  const [pw, setPw] = useState("");

  const checks = [
    { label: "At least 8 characters", pass: pw.length >= 8 },
    { label: "Contains uppercase", pass: /[A-Z]/.test(pw) },
    { label: "Contains number", pass: /[0-9]/.test(pw) },
    { label: "Contains symbol", pass: /[^a-zA-Z0-9]/.test(pw) },
    { label: "12+ characters", pass: pw.length >= 12 },
  ];
  const score = checks.filter((c) => c.pass).length;
  const strength = score <= 1 ? "Weak" : score <= 3 ? "Medium" : "Strong";
  const color = score <= 1 ? "#ef4444" : score <= 3 ? "#eab308" : "#22c55e";

  return (
    <div className="space-y-5">
      <input
        type="password"
        placeholder="Enter a password to check..."
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-cyan-500/20 text-slate-200 font-mono text-sm focus:outline-none focus:border-cyan-400/60"
        data-ocid="pw_strength.input"
      />
      {pw && (
        <>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(score / 5) * 100}%`, background: color }}
              />
            </div>
            <span className="font-mono font-bold text-sm" style={{ color }}>
              {strength}
            </span>
          </div>
          <div className="space-y-2">
            {checks.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 text-xs font-mono"
              >
                <span className={c.pass ? "text-green-400" : "text-slate-600"}>
                  {c.pass ? "✓" : "○"}
                </span>
                <span className={c.pass ? "text-slate-300" : "text-slate-600"}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
