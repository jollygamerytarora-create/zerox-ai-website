import { useCallback, useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Khushv",
    handle: "@being_khush",
    rating: 4,
    maxRating: 5,
    review:
      "AI is really impressive and helpful. It gives quick and accurate responses. It's a great tool that anyone would enjoy using.",
    avatar: "K",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Gauran",
    handle: "@gauranv",
    rating: 5,
    maxRating: 5,
    review:
      "Bohot hi achha AI hai, accurate results deta hai aur easily system ke tasks automate kar deta hai. Worth buying!",
    avatar: "G",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Its_van",
    handle: "@its_van",
    rating: 10,
    maxRating: 10,
    review:
      "It works really well — I assure you this is gonna BLOW UP!!! Super convenient setup. Absolutely 9.9999/10. Oh I'm absolutely lovin' it!",
    avatar: "V",
    color: "from-orange-500 to-yellow-400",
  },
  {
    name: "Verified Customer",
    handle: "@user_104",
    rating: 5,
    maxRating: 5,
    review:
      "Zerox AI changed the way I work on my PC. The voice commands are accurate and the automation saves me hours every week.",
    avatar: "U",
    color: "from-green-500 to-teal-400",
  },
  {
    name: "Verified Customer",
    handle: "@user_87",
    rating: 5,
    maxRating: 5,
    review:
      "The free tools on JollyTech are incredibly useful — I use the typing test and word counter daily. Love this platform!",
    avatar: "J",
    color: "from-blue-500 to-indigo-500",
  },
];

function StarRating({
  rating,
  max,
}: {
  rating: number;
  max: number;
}) {
  const displayMax = Math.min(max, 5);
  const displayRating = Math.round((rating / max) * displayMax);
  const stars = ["★", "★", "★", "★", "★"].slice(0, displayMax);
  return (
    <div className="flex gap-0.5">
      {stars.map((star, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static star list
          key={i}
          className={i < displayRating ? "text-yellow-400" : "text-slate-600"}
          style={{ fontSize: "14px" }}
        >
          {star}
        </span>
      ))}
      <span className="text-xs text-slate-400 ml-1 font-mono">
        {rating}/{max}
      </span>
    </div>
  );
}

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (idx: number) => {
    setActive(idx);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  return (
    <section className="relative z-10 py-20 w-full">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/5 text-xs font-mono text-yellow-300 mb-4">
            <span className="text-yellow-400">★</span>
            100+ HAPPY CUSTOMERS
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold font-mono mb-3"
            style={{
              background:
                "linear-gradient(135deg, #fff 0%, #00d9ff 50%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            What Our Users Say
          </h2>
          <p className="text-slate-400 text-sm font-mono">
            Real feedback from real customers — unfiltered.
          </p>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {reviews.map((r) => (
              <div key={r.handle} className="min-w-full px-2 sm:px-8">
                <div
                  className="relative rounded-2xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-xl p-8 mx-auto max-w-2xl"
                  style={{
                    boxShadow:
                      "0 0 40px rgba(0,217,255,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Quote mark */}
                  <div
                    className="absolute top-4 right-6 text-6xl font-serif leading-none opacity-10 text-cyan-400"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    "
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                    >
                      {r.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100 font-mono">
                        {r.name}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        {r.handle}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={r.rating} max={r.maxRating} />
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-base italic">
                    &ldquo;{r.review}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((r, i) => (
            <button
              key={r.handle}
              type="button"
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 h-2.5 bg-cyan-400"
                  : "w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        {/* Customer count badge */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {[
            { value: "100+", label: "Happy Customers" },
            { value: "4.9★", label: "Average Rating" },
            { value: "24/7", label: "AI Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl font-black font-mono"
                style={{
                  background: "linear-gradient(90deg, #00d9ff, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 font-mono mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
