import { useSeo } from "@/lib/seo";
import { SEO } from "@/lib/seoPages";
import Magnetic from "@/components/motion/Magnetic";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import DecryptedText from "@/components/reactbits/DecryptedText";
import GlitchText from "@/components/reactbits/GlitchText";
import GradientText from "@/components/reactbits/GradientText";
import ParticleText from "@/components/reactbits/ParticleText";
import ShinyText from "@/components/reactbits/ShinyText";

import CursorMesh from "@/components/fx/CursorMesh";
import MaskedVideoHeading from "@/components/reactbits/MaskedVideoHeading";
import SplineSceneBase from "@/components/reactbits/SplineScene";
import SplitFlapText from "@/components/reactbits/SplitFlapText";
import { Spotlight, SpotlightStyles } from "@/components/reactbits/Spotlight";
import StrokeText from "@/components/reactbits/StrokeText";
import TextLoop from "@/components/reactbits/TextLoop";
import GlowCTA from "@/components/ui/GlowCTA";
import { Button } from "@/components/ui/button";
import { zeroxFeatures } from "@/content/zeroxFeatures";
import { useLowPowerMode } from "@/hooks/useLowPowerMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Zap } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

const WarpText = lazy(() => import("@/components/reactbits/WarpText"));

/* ------------------------------------------------------------------
   ZEROX — LANDING  ·  editorial film
   Scene 1  hero          : split layout — Syne display + serif italics,
                            interactive ZeroxSphere right
   Scene 2  marquee       : TextLoop capability band
   Scene 3  manifesto     : MaskedHeading — words filled with photography
   Scene 4  showcase card : Spotlight + lazy Spline 3D scene
   Scene 5  photo strip   : parallax editorial images (the "human" layer)
   Scene 6  feature slides: sticky stage — one capability at a time, each
                            wearing its own React-Bits text effect
   Scene 7  full index    : all 27 capabilities
   Scene 8  social proof  : reviews / beacons / podcast (handlers untouched)
------------------------------------------------------------------- */

/* each headline capability gets its own signature text effect.
   Seven scenes — seven different typographic machines. */
const FEATURE_SLIDES = [
  {
    title: "Voice Control",
    desc: "Speak naturally — Zerox executes. Files, apps, messages and system commands, all hands-free.",
    icon: "🎙️",
    kicker: "SPEAK — IT OBEYS",
    effect: "particle" as const,
  },
  {
    title: "Desktop Automation",
    desc: "Repetitive workflows run themselves. Keyboard, mouse and system-level actions on command.",
    icon: "⚙️",
    kicker: "SET IT — FORGET IT",
    effect: "flap" as const,
  },
  {
    title: "Computer Vision",
    desc: "Zerox sees your screen and camera feed — understanding, analyzing, describing in real time.",
    icon: "👁️",
    kicker: "IT SEES WHAT YOU SEE",
    effect: "warp" as const,
  },
  {
    title: "AI Image Generation",
    desc: "Describe anything and watch it render. Advanced models built right into your desktop.",
    icon: "🎨",
    kicker: "DESCRIBE — IT RENDERS",
    effect: "stroke" as const,
  },
  {
    title: "Natural Dialogue",
    desc: "Fluid, context-aware conversation powered by Gemini — it remembers, it reasons, it answers like a person.",
    icon: "💬",
    kicker: "POWERED BY GEMINI",
    effect: "gradient" as const,
  },
  {
    title: "Sealed & Secure",
    desc: "API keys live in an encrypted vault. Automation executes locally — your machine stays yours.",
    icon: "🔐",
    kicker: "YOUR KEYS, ENCRYPTED",
    effect: "decrypt" as const,
  },
  {
    title: "Plugin Universe",
    desc: "A plugin architecture that grows with you — bolt on new skills without ever touching the core.",
    icon: "🧩",
    kicker: "EXPAND EVERYTHING",
    effect: "glitch" as const,
  },
];

const SLIDE_COUNT = FEATURE_SLIDES.length;

/* editorial photography — Unsplash (free CDN, art-directed picks) */
const PHOTOS = {
  aurora:
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80",
  auroraMobile:
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=70",
};

export default function HomePage() {
  useSeo(SEO["/"]);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  // Phones/low-power devices get the static build: no Spline runtime,
  // no WebGL text effects, no per-frame layout — same content, zero jank.
  const isMobile = useLowPowerMode();

  const slidesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: slidesRef,
    offset: ["start start", "end end"],
  });

  const SLIDE_SPAN = 0.86 / SLIDE_COUNT;
  const STAGE_START = 0.07;

  // feature stage: current slide index derived from scroll progress
  const stage = useTransform(
    scrollYProgress,
    [STAGE_START, 0.93],
    [0, SLIDE_COUNT - 1],
  );
  void stage; // reserved for scene-tinting in a follow-up pass

  return (
    <div className="relative min-h-screen w-full">
      {/* interactive mesh backdrop — compresses wherever the cursor goes */}
      <CursorMesh theme="page" fixed className="z-0" />

      {/* ================= SCENE 1 — HERO (the face + centered type) ================= */}
      <section className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:px-8">
        {/* the Zerox robot — the Spline bot, watching the cursor behind the type */}
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.07 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="relative h-[82svh] max-h-[820px] w-full max-w-[900px]">
            {isMobile ? (
              /* static violet core — the Spline runtime (multi-MB + WebGL
                 worker) is the single heaviest thing on the page; phones
                 get this lightweight stand-in instead */
              <div
                aria-hidden="true"
                className="absolute inset-0 m-auto h-[44svh] w-[88vw] max-w-[540px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 42%, rgba(192,132,252,0.30) 0%, rgba(139,68,224,0.13) 38%, rgba(8,5,15,0) 72%)",
                }}
              />
            ) : (
              <SplineSceneBase
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="!absolute inset-0 h-full w-full"
              />
            )}
          </div>
        </motion.div>

        {/* vignette keeps the type legible over the face */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(52% 44% at 50% 54%, rgba(8,5,15,0.42) 0%, rgba(8,5,15,0.16) 58%, transparent 76%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="inline-flex items-center gap-3 rounded-full border border-fuchsia-300/25 bg-fuchsia-400/[0.07] px-4 py-1.5 backdrop-blur-sm"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-300 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
            </span>
            <span className="zx-mono text-[11px] tracking-[0.3em] text-fuchsia-200/85">
              NEXT-GEN AI TECHNOLOGY
            </span>
          </motion.div>

          <motion.h1
            className="zx-display mt-6 text-[13vw] font-extrabold leading-[0.95] sm:text-6xl lg:text-[4.6rem]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="text-mist">Your desktop,</span>
            <br />
            <span className="zx-serif text-fuchsia-200">alive</span>
            <span className="text-mist"> with</span>
            <br />
            <span className="zx-gradient-text">intelligence.</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 1.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            A voice-controlled intelligence that lives on your desktop —
            automation, vision and natural conversation, woven into one system.{" "}
            <ShinyText
              text="Your personal intelligence engine."
              speed={5}
              className="font-medium"
            />
          </motion.p>

          <motion.div
            className="mt-9"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 1.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Magnetic>
              <GlowCTA
                onClick={() => navigate({ to: "/features" })}
                dataOcid="home.explore.primary_button"
              >
                Explore Zerox
              </GlowCTA>
            </Magnetic>
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="zx-mono text-[9px] tracking-[0.35em] text-mist/40">
              SCROLL
            </span>
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-mist/20 p-1">
              <span className="zx-scroll-dot h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-mist/30" />
          </div>
        </motion.div>
      </section>

      {/* ================= SCENE 2 — TEXTLOOP MARQUEE ================= */}
      <section className="relative z-10 w-full py-6">
        <TextLoop
          text="Voice Control ✦ Automation ✦ Computer Vision ✦ Gemini AI ✦ Image Generation ✦ Plugin System"
          shape="wave"
          speed={70}
          curviness={70}
          fontSize={40}
          fontWeight={700}
          letterSpacing={3}
          color="#fdf4ff"
          ribbon
          ribbonColor="#2a1548"
          ribbonWidth={72}
          className="opacity-90"
        />
      </section>

      {/* ================= SCENE 3 — PHOTO MANIFESTO ================= */}
      <section className="relative z-10 w-full px-4 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="zx-eyebrow zx-mono justify-center">
            01 — Manifesto
          </div>
          <MaskedHeading
            text="Designed like a film. Built like a machine."
            tag="h2"
            src={isMobile ? PHOTOS.auroraMobile : PHOTOS.aurora}
            reveal="rise"
            trigger="view"
            fillScale={1.35}
            parallax={30}
            drift={14}
            brightness={1.15}
            saturation={1.35}
            textScale={0.082}
            align="center"
          />
          <Reveal kind="fade" className="mx-auto mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Zerox isn't a chat window bolted onto a desktop. It's a{" "}
              <em className="zx-serif text-fuchsia-200 not-italic">presence</em>{" "}
              — one intelligence that hears you, sees your screen, and moves
              your machine while you keep thinking.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= SCENE 5 — MASKED VIDEO BREAK ================= */}
      <section className="relative z-10 w-full overflow-x-clip py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          {isMobile ? (
            <h2 className="zx-display text-[13vw] font-extrabold leading-[0.95] tracking-[-0.02em] sm:hidden">
              <span className="zx-gradient-text">SCROLL TO SEE</span>
              <br />
              <span className="zx-gradient-text">FEATURES</span>
            </h2>
          ) : (
            <MaskedVideoHeading
              lines={["SCROLL TO SEE", "FEATURES"]}
              src="https://videos.pexels.com/video-files/1918465/1918465-sd_960_540_24fps.mp4"
            />
          )}
          <Reveal kind="fade" className="mt-8 text-center">
            <p className="zx-mono text-[10px] tracking-[0.45em] text-fuchsia-200/50">
              VOICE · AUTOMATION · VISION · GENERATION — SEVEN SCENES BELOW
            </p>
          </Reveal>
        </div>
      </section>

      {/* GET ZEROX — above the capabilities */}
      <section className="relative z-10 flex justify-center px-4 pb-4 sm:px-8">
        <Reveal kind="rise">
          <Magnetic>
            <GlowCTA
              onClick={() => navigate({ to: "/pricing" })}
              dataOcid="home.get_zerox.above_features"
            >
              Get Zerox
            </GlowCTA>
          </Magnetic>
        </Reveal>
      </section>

      {/* ================= SCENE 6 — FEATURE SLIDES (scroll-driven, sticky) ================= */}
      <section ref={slidesRef} className="relative z-10 w-full">
        <div className="mx-auto max-w-5xl px-4 pb-14 text-center sm:px-8">
          <div className="zx-eyebrow zx-mono justify-center">
            02 — Capabilities
          </div>
          <h2 className="zx-display mt-5 text-4xl font-bold sm:text-5xl">
            <span className="zx-gradient-text">
              One system. Every superpower.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Keep scrolling — each capability introduces itself in its own way.
          </p>
        </div>

        {/* sticky stage: one slide pinned, crossfading as you scroll.
            85svh per slide keeps the pacing tight without dead scroll. */}
        <div className="relative" style={{ height: `${SLIDE_COUNT * 85}svh` }}>
          <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
            {/* progress rail */}
            <div className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex">
              {FEATURE_SLIDES.map((slide, i) => {
                const start = STAGE_START + (i / SLIDE_COUNT) * 0.86;
                const end = start + SLIDE_SPAN;
                return (
                  <SlideDot
                    key={slide.title}
                    progress={scrollYProgress}
                    range={[start, end]}
                    index={i}
                  />
                );
              })}
              <div className="mt-2 h-16 w-px bg-gradient-to-b from-fuchsia-300/50 to-transparent" />
            </div>

            {FEATURE_SLIDES.map((slide, i) => {
              const start = STAGE_START + (i / SLIDE_COUNT) * 0.86;
              const mid = start + SLIDE_SPAN * 0.5;
              const end = start + SLIDE_SPAN;
              return (
                <Slide
                  key={slide.title}
                  slide={slide}
                  index={i}
                  progress={scrollYProgress}
                  range={[start, mid, end]}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* GET ZEROX — below the capabilities */}
      <section className="relative z-10 flex justify-center px-4 py-10 sm:px-8">
        <Reveal kind="rise">
          <Magnetic>
            <GlowCTA
              onClick={() => navigate({ to: "/pricing" })}
              dataOcid="home.get_zerox.below_features"
            >
              Get Zerox
            </GlowCTA>
          </Magnetic>
        </Reveal>
      </section>

      {/* ================= SCENE 7 — FULL CAPABILITY INDEX ================= */}
      <section className="relative z-10 w-full px-4 pb-24 pt-10 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="zx-eyebrow zx-mono justify-center">
              03 — Full Index
            </div>
            <h2 className="zx-display mt-5 text-3xl font-bold sm:text-4xl">
              <span className="zx-gradient-text">
                All {zeroxFeatures.length} capabilities
              </span>
            </h2>
          </div>

          <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {zeroxFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <RevealItem key={feature.title} kind="rise">
                  <div className="zx-card zx-card-lit group flex h-full items-start gap-3 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-fuchsia-300/20 bg-fuchsia-400/10 transition-all duration-500 group-hover:border-fuchsia-300/45">
                      <Icon className="h-5 w-5 text-fuchsia-300" />
                    </div>
                    <div>
                      <p className="zx-display font-semibold leading-snug text-mist">
                        {feature.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal kind="fade" className="mt-14 text-center">
            <Magnetic>
              <Button
                size="lg"
                className="zx-btn glow-button bg-gradient-to-r from-violet-500 to-fuchsia-600 px-8 py-6 text-lg hover:from-violet-400 hover:to-fuchsia-500"
                onClick={() => navigate({ to: "/features" })}
                data-ocid="home.explore_all.button"
              >
                <Zap className="mr-2 h-5 w-5" />
                Explore All Features
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ================= SCENE 8 — SOCIAL PROOF (unchanged sections) ================= */}
      <ReviewsSection />

      <section className="relative z-10 py-10 sm:py-16">
        <ExploreMoreSection />
      </section>

      <section className="relative z-10 py-10 pb-24 sm:py-16">
        <PodcastSection />
      </section>

      {/* ================= INTERNAL LINKS — crawlable paths to every page.
          Real anchors here are the strongest signal Google uses to pick
          the sitelinks shown beneath the main result. ================= */}
      <section
        className="relative z-10 w-full px-4 pb-20 sm:px-8"
        aria-label="Explore Zerox AI"
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="zx-eyebrow zx-mono justify-center">
            04 — Explore
          </div>
          <h2 className="zx-display mt-5 text-2xl font-bold sm:text-3xl">
            <span className="zx-gradient-text">Explore Zerox AI</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Everything JollyTech's personal AI assistant can do — pick where
            to go next.
          </p>
          <nav className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            {[
              {
                to: "/features",
                label: "Zerox AI Features",
                desc: "All 27 capabilities",
              },
              {
                to: "/pricing",
                label: "Pricing & Lifetime Plans",
                desc: "From ₹2599",
              },
              {
                to: "/monthly-pricing",
                label: "Subscriptions",
                desc: "Weekly to yearly",
              },
              {
                to: "/demo",
                label: "Book a Live Demo",
                desc: "See it run your desktop",
              },
              {
                to: "/tools",
                label: "Free Online Tools",
                desc: "QR, AI images & more",
              },
              {
                to: "/contact",
                label: "Contact JollyTech",
                desc: "Support & sales",
              },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="zx-card zx-card-lit group rounded-xl px-4 py-3 text-left transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="zx-display block text-sm font-semibold text-mist group-hover:text-fuchsia-200">
                  {l.label}
                </span>
                <span className="zx-mono block text-[10px] tracking-wide text-muted-foreground">
                  {l.desc}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="relative z-10 pb-28 pt-4 text-center">
        <Reveal kind="blur">
          <p className="zx-mono text-[10px] tracking-[0.5em] text-mist/30">
            ZEROX — BY JOLLY TECH
          </p>
        </Reveal>
      </section>
    </div>
  );
}

/* ---------------- slide: one capability, one signature effect ---------------- */

function Slide({
  slide,
  index,
  progress,
  range,
}: {
  slide: (typeof FEATURE_SLIDES)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number, number];
}) {
  const [start, mid, end] = range;
  const isMobile = useLowPowerMode();
  const opacity = useTransform(
    progress,
    [start - 0.05, start + 0.03, mid, end - 0.03, end],
    [0, 1, 1, 1, 0],
  );
  const y = useTransform(progress, [start - 0.05, end], [60, -60]);
  const scale = useTransform(
    progress,
    [start - 0.05, mid, end],
    [0.94, 1, 0.96],
  );

  // visibility gate: when the slide owns the stage, its signature
  // effect re-runs from scratch (ParticleText/StrokeText replay)
  const [active, setActive] = useState(index === 0);
  useMotionValueEvent(progress, "change", (v) => {
    const isActive = v >= start - 0.04 && v <= end + 0.04;
    setActive((prev) => (isActive !== prev ? isActive : prev));
  });

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4"
      style={{ opacity, y, scale }}
    >
      <div className="w-full max-w-4xl text-center">
        <div className="zx-mono mb-4 text-[9px] tracking-[0.4em] text-fuchsia-200/50 sm:text-[10px]">
          CAPABILITY {String(index + 1).padStart(2, "0")} /{" "}
          {String(SLIDE_COUNT).padStart(2, "0")}
        </div>
        <div className="mb-5 text-4xl sm:mb-6 sm:text-5xl">{slide.icon}</div>
        <p className="zx-mono mb-3 text-[9px] tracking-[0.35em] text-fuchsia-300/60 sm:text-[10px]">
          {slide.kicker}
        </p>

        {/* each feature wears a different typographic machine.
            `active` remounts the effect so it replays on every entry. */}
        {/* mobile: canvas/WebGL text machines are the jank source inside
            the sticky stage — render the same words as plain type */}
        {active && isMobile && (
          <h3 className="zx-display text-[2rem] font-extrabold leading-[1.05] sm:text-[3.4rem]">
            <span className="zx-gradient-text">{slide.title}</span>
          </h3>
        )}

        {!isMobile && active && slide.effect === "particle" && (
          <div className="mx-auto h-[110px] w-full sm:h-[190px]">
            <ParticleText
              text={slide.title}
              particleSize={2.4}
              density={4}
              color="#fdf4ff"
              highlightColor="#e879f9"
              scatter={220}
              gatherDuration={1500}
              stagger={380}
              pointerRepel={48}
              repelRadius={130}
              idleDrift={0.8}
              trigger="mount"
              glow
            />
          </div>
        )}

        {!isMobile && active && slide.effect === "flap" && (
          <div className="flex justify-center overflow-x-auto pb-2">
            <SplitFlapText
              words={[slide.title.toUpperCase()]}
              flipDuration={0.12}
              stagger={0.05}
              cycleDelay={3600}
              charset="alphanumeric"
              flipsPerChar={9}
              tileColor="#1c1030"
              textColor="#fdf4ff"
              tileRadius={10}
              gap={6}
              fontSize="clamp(1.15rem, 3.4vw, 2.75rem)"
              loop
              padTo={slide.title.length}
            />
          </div>
        )}

        {!isMobile && active && slide.effect === "warp" && (
          <div className="mx-auto h-[110px] w-full sm:h-[190px]">
            <Suspense fallback={null}>
              <WarpText
                text={slide.title}
                color="#fdf4ff"
                warpStrength={0.1}
                warpScale={1.7}
                speed={0.55}
                pointerInfluence={0.42}
                pointerStrength={0.4}
                refraction={0.02}
                ripple
                fontSize="clamp(2rem, 7vw, 5.2rem)"
                fontWeight={800}
              />
            </Suspense>
          </div>
        )}

        {!isMobile && active && slide.effect === "stroke" && (
          <div className="zx-display overflow-x-auto">
            <StrokeText
              text={slide.title}
              strokeColor="#e879f9"
              fillColor="#fdf4ff"
              strokeWidth={1.4}
              drawDuration={1.5}
              fillDelay={0.2}
              stagger={0.045}
              trigger="mount"
              fillMode="wipe"
              fontSize="clamp(1.8rem, 6.5vw, 4.6rem)"
              fontWeight={800}
              letterSpacing="-0.03em"
            />
          </div>
        )}

        {active && slide.effect === "gradient" && (
          <h3 className="zx-display text-[2rem] font-extrabold leading-[1.05] sm:text-[3.4rem]">
            <GradientText
              colors={["#a855f7", "#e879f9", "#f0abfc", "#c4b5fd"]}
              speed={5}
            >
              {slide.title}
            </GradientText>
          </h3>
        )}

        {active && slide.effect === "decrypt" && (
          <div className="zx-display text-[1.7rem] font-extrabold leading-[1.05] sm:text-[3rem]">
            <DecryptedText
              text={slide.title}
              speed={34}
              revealDirection="center"
              color="#fdf4ff"
              scrambleColor="#e879f9"
            />
          </div>
        )}

        {active && slide.effect === "glitch" && (
          <h3 className="zx-display text-[1.9rem] font-extrabold leading-[1.05] sm:text-[3.3rem]">
            <GlitchText text={slide.title} speed={2.6} />
          </h3>
        )}

        <p className="mx-auto mt-6 max-w-xl px-2 text-sm leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg">
          {slide.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------- progress rail dot ---------------- */

function SlideDot({
  progress,
  range,
  index,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  index: number;
}) {
  const [start, end] = range;
  const opacity = useTransform(
    progress,
    [start - 0.02, start + 0.01, end - 0.01, end],
    [0.25, 1, 1, 0.25],
  );
  const scale = useTransform(
    progress,
    [start - 0.02, start + 0.01, end - 0.01, end],
    [1, 1.5, 1.5, 1],
  );

  return (
    <motion.span
      className="zx-mono flex h-6 w-6 items-center justify-center text-[9px] text-fuchsia-200"
      style={{ opacity, scale }}
    >
      {String(index + 1).padStart(2, "0")}
    </motion.span>
  );
}

/* ---------------- social-proof sections (unchanged) ---------------- */

import MaskedHeading from "@/components/reactbits/MaskedHeading";
import ExploreMoreSection from "@/components/sections/ExploreMoreSection";
import PodcastSection from "@/components/sections/PodcastSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
