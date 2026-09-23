import { useState } from "react";

const FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export default function DiceRoller() {
  const [count, setCount] = useState(1);
  const [rolls, setRolls] = useState<{ val: number; id: number }[]>([]);
  const [rolling, setRolling] = useState(false);

  function roll() {
    setRolling(true);
    setTimeout(() => {
      setRolls(
        Array.from({ length: count }, (_, i) => ({
          val: Math.floor(Math.random() * 6) + 1,
          id: i,
        })),
      );
      setRolling(false);
    }, 500);
  }

  const total = rolls.reduce((a, b) => a + b.val, 0);

  return (
    <div className="space-y-5">
      <label
        htmlFor="dice-count"
        className="block text-xs font-mono text-slate-400 mb-1"
      >
        Number of dice: {count}
      </label>
      <input
        id="dice-count"
        type="range"
        min={1}
        max={6}
        value={count}
        onChange={(e) => setCount(+e.target.value)}
        className="w-full accent-cyan-400"
        data-ocid="dice_roller.count.input"
      />
      <button
        type="button"
        onClick={roll}
        disabled={rolling}
        className="w-full py-3 rounded-xl font-mono font-bold text-sm bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all disabled:opacity-50"
        data-ocid="dice_roller.submit_button"
      >
        {rolling ? "Rolling..." : "🎲 Roll Dice"}
      </button>
      {rolls.length > 0 && !rolling && (
        <div className="space-y-3">
          <div className="flex flex-wrap justify-center gap-3">
            {rolls.map((r) => (
              <span
                key={r.id}
                className="text-5xl select-none"
                style={{ animation: "dice-in 0.4s ease-out" }}
              >
                {FACES[r.val - 1]}
              </span>
            ))}
          </div>
          {count > 1 && (
            <p className="text-center font-mono text-lg text-cyan-200">
              Total: <span className="font-bold text-cyan-300">{total}</span>
            </p>
          )}
        </div>
      )}
      <style>
        {
          "@keyframes dice-in { from { transform: scale(0) rotate(-180deg); opacity: 0; } to { transform: scale(1) rotate(0); opacity: 1; } }"
        }
      </style>
    </div>
  );
}
