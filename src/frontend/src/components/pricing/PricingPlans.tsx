import Magnetic from "@/components/motion/Magnetic";
import TiltCard from "@/components/motion/TiltCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

const VALID_CODES: Record<string, number> = {
  zerox100: 100,
  get50: 50,
};
const WHATSAPP_NUMBER = "917014270402";

/** Eligible plans for code redemption — yearly + both lifetime cards */
const REDEEM_PLANS = [
  { name: "Yearly Plan", price: "₹999/year" },
  { name: "Lifetime Access", price: "₹2999 one-time" },
  { name: "Student Lifetime Plan", price: "₹2599 one-time" },
];

export default function PricingPlans() {
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemError, setRedeemError] = useState("");
  const [redeemed, setRedeemed] = useState<{ code: string; percent: number } | null>(null);

  const plans = [
    {
      id: "student",
      name: "Zerox AI – Student Lifetime Plan",
      price: "₹2599",
      description: "Special pricing for students",
      features: [
        "Lifetime updates",
        "All core features",
        "Voice control & automation",
        "Computer vision capabilities",
        "AI-powered assistance",
        "AI-powered image generation",
        "Plugin system access",
        "Student support",
      ],
      popular: false,
      note: "Student verification required",
    },
    {
      id: "lifetime",
      name: "Zerox AI – Lifetime Access",
      price: "₹2999",
      description: "Full lifetime access to Zerox AI",
      features: [
        "Lifetime updates",
        "All core features",
        "Voice control & automation",
        "Computer vision capabilities",
        "AI-powered assistance",
        "AI-powered image generation",
        "Plugin system access",
        "Priority support",
      ],
      popular: true,
    },
  ];

  const scrollToPayment = () => {
    const paymentSection = document.getElementById("payment-section");
    if (paymentSection) {
      paymentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRedeem = () => {
    // case-insensitive: normalize both sides before comparing
    const normalized = redeemCode.trim().toLowerCase();
    const percent = VALID_CODES[normalized];
    if (percent) {
      setRedeemError("");
      setRedeemed({ code: normalized, percent });
    } else {
      setRedeemError("Invalid code. Please check and try again.");
      setRedeemed(null);
    }
  };

  const openWhatsAppFor = (planName: string) => {
    if (!redeemed) return;
    const message = `hey i have redeemed ${redeemed.percent}% for ${planName} with ${redeemed.code} please provide me the access`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Redeem Code Section */}
      <div id="redeem-code" className="mx-auto mb-20 max-w-xl scroll-mt-32">
        <TiltCard max={2}>
          <div className="zx-card zx-card-lit zx-edge-top relative space-y-6 overflow-hidden border-violet-300/25 p-8 text-center">
            {/* decorative glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/[0.06] via-transparent to-violet-500/[0.06]" />

            <div className="relative z-10 space-y-2">
              <div className="zx-eyebrow zx-mono justify-center !text-violet-200/80">
                Free Access
              </div>
              <h3 className="zx-display text-2xl font-bold">
                <span className="bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">
                  Have a Code?
                </span>
              </h3>
              <p className="zx-mono text-sm text-muted-foreground">
                Enter your code below — codes apply to the Yearly and Lifetime
                plans.
              </p>
            </div>

            <div className="relative z-10 space-y-3">
              <input
                type="text"
                value={redeemCode}
                onChange={(e) => {
                  setRedeemCode(e.target.value);
                  setRedeemError("");
                  setRedeemed(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleRedeem()}
                placeholder="Enter redeem code..."
                className="zx-mono w-full rounded-xl border border-violet-300/30 bg-black/30 px-4 py-3 text-sm text-white placeholder-muted-foreground transition-all focus:border-violet-300/70 focus:outline-none focus:ring-1 focus:ring-violet-300/40"
                data-ocid="pricing.redeem.input"
              />

              {redeemError && (
                <p
                  className="zx-mono text-sm text-red-400"
                  data-ocid="pricing.redeem.error_state"
                >
                  {redeemError}
                </p>
              )}

              {redeemed && (
                <div
                  className="space-y-2 rounded-2xl border border-fuchsia-300/30 bg-fuchsia-400/[0.06] p-4 text-left"
                  data-ocid="pricing.redeem.success_panel"
                >
                  <p className="zx-mono text-sm text-green-400">
                    Code accepted — {redeemed.percent}% off!
                  </p>
                  <p className="zx-mono text-xs leading-relaxed text-mist/75">
                    You can get {redeemed.percent}% off on the Yearly plan or
                    either Lifetime card. Pick one to continue on WhatsApp:
                  </p>
                  <div className="space-y-2 pt-1">
                    {REDEEM_PLANS.map((plan) => (
                      <button
                        key={plan.name}
                        type="button"
                        onClick={() => openWhatsAppFor(plan.name)}
                        data-ocid={`pricing.redeem.plan_${plan.name.toLowerCase().replace(/\s+/g, "_")}`}
                        className="flex w-full items-center justify-between gap-3 rounded-xl border border-violet-300/25 bg-black/30 px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-fuchsia-300/60 hover:bg-fuchsia-400/[0.08]"
                      >
                        <span className="text-sm text-mist">
                          {plan.name}
                          <span className="zx-mono ml-2 text-xs text-muted-foreground">
                            {plan.price}
                          </span>
                        </span>
                        <span className="zx-mono text-[10px] tracking-[0.2em] text-fuchsia-300">
                          -{redeemed.percent}%
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Magnetic strength={0.2}>
                <Button
                  className="zx-btn glow-button w-full bg-gradient-to-r from-purple-500 to-pink-600 font-mono tracking-wide hover:from-purple-400 hover:to-pink-500"
                  size="lg"
                  onClick={handleRedeem}
                  data-ocid="pricing.redeem.submit_button"
                >
                  Redeem Code
                </Button>
              </Magnetic>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Paid Plans */}
      <div className="mx-auto mb-20 grid max-w-4xl gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <TiltCard key={plan.id} max={3}>
            <Card
              className={`zx-card zx-card-lit zx-edge-top relative h-full ${
                plan.popular
                  ? "border-fuchsia-300/45 shadow-glow"
                  : "border-violet-500/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-1 text-white">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-8 text-center">
                <CardTitle className="zx-display mb-2 text-2xl">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="zx-display zx-gradient-text text-5xl font-bold">
                    {plan.price}
                  </span>
                  <span className="zx-mono ml-2 text-muted-foreground">
                    one-time
                  </span>
                </div>
                {plan.note && (
                  <p className="zx-mono mt-2 text-sm text-amber-300/90">
                    * {plan.note}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-400/15">
                      <Check className="h-3 w-3 text-fuchsia-300" />
                    </div>
                    <span className="text-sm text-mist/85">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Magnetic strength={0.15} className="w-full">
                  <Button
                    className="zx-btn glow-button w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-fuchsia-400 hover:to-violet-500"
                    size="lg"
                    onClick={scrollToPayment}
                    data-ocid="pricing.buy_now.primary_button"
                  >
                    Buy Now
                  </Button>
                </Magnetic>
              </CardFooter>
            </Card>
          </TiltCard>
        ))}
      </div>
    </>
  );
}
