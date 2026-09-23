interface AnimalRankProps {
  score: number;
  type: "wpm" | "cpm" | "cps";
}

const WPM_RANKS = [
  {
    max: 20,
    emoji: "🐌",
    name: "Snail",
    msg: "Keep practicing — every expert started here!",
  },
  {
    max: 35,
    emoji: "🐢",
    name: "Turtle",
    msg: "Steady pace! You are building a solid foundation.",
  },
  {
    max: 50,
    emoji: "🐇",
    name: "Rabbit",
    msg: "Nice speed! You are comfortably above average.",
  },
  {
    max: 70,
    emoji: "🐎",
    name: "Horse",
    msg: "Great job! You type faster than most people.",
  },
  {
    max: 90,
    emoji: "🦅",
    name: "Falcon",
    msg: "Excellent! You are in the top tier of typists.",
  },
  {
    max: Number.POSITIVE_INFINITY,
    emoji: "🐆",
    name: "Cheetah",
    msg: "Incredible! You type at elite professional speed!",
  },
];

const CPM_RANKS = [
  {
    max: 120,
    emoji: "🐌",
    name: "Snail",
    msg: "Keep at it — speed comes with practice!",
  },
  {
    max: 200,
    emoji: "🐢",
    name: "Turtle",
    msg: "Good start! Keep building that rhythm.",
  },
  {
    max: 300,
    emoji: "🐇",
    name: "Rabbit",
    msg: "Above average! Nice typing speed.",
  },
  {
    max: 400,
    emoji: "🐎",
    name: "Horse",
    msg: "Fast typist! You are well above average.",
  },
  {
    max: 500,
    emoji: "🦅",
    name: "Falcon",
    msg: "Super fast! You are in elite territory.",
  },
  {
    max: Number.POSITIVE_INFINITY,
    emoji: "🐆",
    name: "Cheetah",
    msg: "Blazing speed! Truly exceptional performance!",
  },
];

const CPS_RANKS = [
  { max: 100, emoji: "🐌", name: "Snail", msg: "Warming up — keep clicking!" },
  {
    max: 200,
    emoji: "🐢",
    name: "Turtle",
    msg: "Decent pace! Try to beat your record.",
  },
  {
    max: 300,
    emoji: "🐇",
    name: "Rabbit",
    msg: "Quick fingers! Above average clicker.",
  },
  {
    max: 400,
    emoji: "🐎",
    name: "Horse",
    msg: "Fast clicker! Great hand speed.",
  },
  {
    max: 500,
    emoji: "🦅",
    name: "Falcon",
    msg: "Very impressive clicking speed!",
  },
  {
    max: Number.POSITIVE_INFINITY,
    emoji: "🐆",
    name: "Cheetah",
    msg: "Legendary! Are your fingers made of lightning?",
  },
];

export default function AnimalRank({ score, type }: AnimalRankProps) {
  const ranks =
    type === "wpm" ? WPM_RANKS : type === "cpm" ? CPM_RANKS : CPS_RANKS;
  const rank = ranks.find((r) => score <= r.max) ?? ranks[ranks.length - 1];
  const verb = type === "cps" ? "click" : "type";
  const label = type === "wpm" ? "WPM" : type === "cpm" ? "CPM" : "CPM";
  return (
    <div
      className="text-center py-6 px-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/5"
      style={{ animation: "animalReveal 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}
    >
      <style>
        {
          "@keyframes animalReveal { from { transform: scale(0.5) rotate(-10deg); opacity:0; } to { transform: scale(1) rotate(0deg); opacity:1; } }"
        }
      </style>
      <div className="text-6xl mb-2">{rank.emoji}</div>
      <p className="text-xl font-bold font-mono text-cyan-300">
        You {verb} like a {rank.name}!
      </p>
      <p className="text-sm text-slate-400 mt-1">{rank.msg}</p>
      <p className="text-3xl font-bold font-mono text-white mt-3">
        {score} <span className="text-sm text-slate-400">{label}</span>
      </p>
    </div>
  );
}
