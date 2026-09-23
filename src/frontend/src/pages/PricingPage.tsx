import PaymentSection from "@/components/pricing/PaymentSection";
import PricingPlans from "@/components/pricing/PricingPlans";
import Motion from "@/components/site/Motion";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen py-20 w-full overflow-x-hidden hex-bg scanline-overlay">
      {/* Corner bracket decorations */}
      <div className="fixed top-24 left-4 w-10 h-10 border-l-2 border-t-2 border-cyan-500/50 pointer-events-none z-0" />
      <div className="fixed top-24 right-4 w-10 h-10 border-r-2 border-t-2 border-cyan-500/50 pointer-events-none z-0" />
      <div className="fixed bottom-8 left-4 w-10 h-10 border-l-2 border-b-2 border-purple-500/50 pointer-events-none z-0" />
      <div className="fixed bottom-8 right-4 w-10 h-10 border-r-2 border-b-2 border-purple-500/50 pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-full relative z-10">
        <Motion type="fade-up">
          <div className="text-center mb-16 space-y-4 px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-500/5 mb-4">
              <span className="font-mono text-xs text-cyan-400/80 tracking-widest uppercase">
                [ SYSTEM::PRICING ]
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent break-words">
              Choose Your Plan
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-mono">
              Get lifetime access to Zerox AI with our affordable pricing
              options
            </p>
          </div>
        </Motion>

        <Motion type="fade-up" delay={0.2}>
          <PricingPlans />
        </Motion>

        <Motion type="fade-up" delay={0.4}>
          <PaymentSection />
        </Motion>
      </div>
    </div>
  );
}
