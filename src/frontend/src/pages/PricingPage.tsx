import { useSeo } from "@/lib/seo";
import { SEO } from "@/lib/seoPages";
import Magnetic from "@/components/motion/Magnetic";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import PaymentSection from "@/components/pricing/PaymentSection";
import PricingPlans from "@/components/pricing/PricingPlans";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, Ticket } from "lucide-react";

export default function PricingPage() {
  useSeo(SEO["/pricing"]);
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden py-20">
      {/* Corner bracket decorations (kept) */}
      <div className="pointer-events-none fixed left-4 top-24 z-0 h-10 w-10 border-l-2 border-t-2 border-violet-500/50" />
      <div className="pointer-events-none fixed right-4 top-24 z-0 h-10 w-10 border-r-2 border-t-2 border-violet-500/50" />
      <div className="pointer-events-none fixed bottom-8 left-4 z-0 h-10 w-10 border-b-2 border-l-2 border-purple-500/50" />
      <div className="pointer-events-none fixed bottom-8 right-4 z-0 h-10 w-10 border-b-2 border-r-2 border-purple-500/50" />

      <div className="container relative z-10 mx-auto max-w-full px-4">
        <RevealGroup className="mb-16 space-y-4 px-4 text-center">
          <RevealItem>
            <div className="zx-eyebrow zx-mono justify-center">
              02 — Pricing
            </div>
          </RevealItem>
          <RevealItem>
            <h1 className="zx-display text-4xl font-bold sm:text-5xl md:text-6xl">
              <SplitText
                text="Choose Your Plan"
                by="word"
                stagger={0.06}
                className="zx-gradient-text"
              />
            </h1>
          </RevealItem>
          <RevealItem kind="blur">
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              Get lifetime access to Zerox AI with our affordable pricing
              options
            </p>
          </RevealItem>
        </RevealGroup>

        <PricingPlans />

        <PaymentSection />

        {/* below the prices: subscription + free-code routes */}
        <div className="mt-14 flex flex-col items-center gap-4 pb-4 sm:flex-row sm:justify-center sm:gap-5">
          <Magnetic>
            <button
              type="button"
              onClick={() => navigate({ to: "/monthly-pricing" })}
              data-ocid="pricing.monthly.from_below"
              className="group flex items-center gap-2.5 rounded-full border border-fuchsia-300/35 bg-[#0d0a1c]/70 px-7 py-3.5 text-sm font-semibold text-fuchsia-100 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/70 hover:bg-violet-500/10"
            >
              <CalendarDays className="h-4.5 w-4.5 text-fuchsia-300 transition-transform duration-300 group-hover:rotate-6" />
              or buy a subscription
            </button>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={() => {
                navigate({ to: "/pricing" });
                setTimeout(() => {
                  document
                    .getElementById("redeem-code")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 120);
              }}
              data-ocid="pricing.redeem.from_below"
              className="group flex items-center gap-2.5 rounded-full border border-violet-300/35 bg-[#0d0a1c]/70 px-7 py-3.5 text-sm font-semibold text-violet-100 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/70 hover:bg-violet-500/10"
            >
              <Ticket className="h-4.5 w-4.5 text-violet-300 transition-transform duration-300 group-hover:-rotate-6" />
              have a code
            </button>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
