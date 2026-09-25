import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/motion/SectionHeading";
import TiltCard from "@/components/motion/TiltCard";
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
    color: "from-violet-500 to-violet-500",
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
    color: "from-fuchsia-500 to-pink-400",
  },
  {
    name: "Verified Customer",
    handle: "@user_87",
    rating: 5,
    maxRating: 5,
    review:
      "The free tools on JollyTech are incredibly useful — I use the typing test and word counter daily. Love this platform!",
    avatar: "J",
    color: "from-violet-500 to-fuchsia-500",
  },
];

function StarRating({ rating, max }: { rating: number; max: number }) {
  const displayMax = Math.min(max, 5);
  const displayRating = Math.round((rating / max) * displayMax);
  const stars = ["★", "★", "★", "★", "★"].slice(0, displayMax);
  return (
    <div className="flex gap-0.5">
      {stars.map((star, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static star list
          key={i}
          className={i < displayRating ? "text-amber-400" : "text-slate-600"}
          style={{ fontSize: "14px" }}
        >
          {star}
        </span>
      ))}
      <span className="zx-mono ml-1 text-xs text-slate-400">
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
    <section className="relative z-10 w-full py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading
          index="01"
          eyebrow="FIELD NOTES"
          title="What Our Users Say"
          lead="Real feedback from real customers — unfiltered."
        />

        {/* Slider */}
        <RevealGroup>
          <div className="relative">
            <div
              className="flex transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {reviews.map((r) => (
                <div key={r.handle} className="min-w-full px-2 sm:px-10">
                  <RevealItem kind="scale">
                    <TiltCard max={3}>
                      <div className="zx-card zx-card-lit zx-edge-top relative mx-auto max-w-2xl p-8 sm:p-10">
                        {/* oversized editorial quote */}
                        <div
                          className="pointer-events-none absolute -top-5 right-6 select-none font-serif text-[7rem] leading-none text-fuchsia-300/10"
                          style={{ fontFamily: "Georgia, serif" }}
                          aria-hidden="true"
                        >
                          "
                        </div>

                        <div className="mb-6 flex items-center gap-4">
                          <div
                            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${r.color} font-display text-lg font-bold text-white`}
                          >
                            {r.avatar}
                          </div>
                          <div>
                            <p className="zx-mono font-semibold text-mist">
                              {r.name}
                            </p>
                            <p className="zx-mono text-xs text-slate-500">
                              {r.handle}
                            </p>
                          </div>
                          <div className="ml-auto">
                            <StarRating rating={r.rating} max={r.maxRating} />
                          </div>
                        </div>

                        <p className="text-lg leading-relaxed text-mist/85">
                          &ldquo;{r.review}&rdquo;
                        </p>
                      </div>
                    </TiltCard>
                  </RevealItem>
                </div>
              ))}
            </div>
          </div>
        </RevealGroup>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {reviews.map((r, i) => (
            <button
              key={r.handle}
              type="button"
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                i === active
                  ? "w-8 bg-fuchsia-400"
                  : "w-2.5 bg-slate-600 hover:bg-slate-400"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        {/* Stats rail */}
        <RevealGroup className="mt-16 flex flex-wrap justify-center gap-12 sm:gap-20">
          {[
            { value: "1500+", label: "Happy Customers" },
            { value: "4.9★", label: "Average Rating" },
            { value: "24/7", label: "AI Support" },
          ].map((stat) => (
            <RevealItem key={stat.label} className="text-center">
              <p className="zx-display zx-gradient-text text-4xl font-black">
                {stat.value}
              </p>
              <p className="zx-mono mt-2 text-xs tracking-wider text-slate-500">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
