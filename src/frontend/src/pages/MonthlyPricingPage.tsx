import { useSeo } from "@/lib/seo";
import { SEO } from "@/lib/seoPages";
import Magnetic from "@/components/motion/Magnetic";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import TiltCard from "@/components/motion/TiltCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Check, ExternalLink, Sparkles, Zap } from "lucide-react";

interface TierData {
  id: string;
  label: string;
  price: number;
  period: string;
  description: string;
  badge: string | null;
  features: string[];
  whatsappMessage: string;
  gradient: string;
  borderColor: string;
}

const monthlyTiers: TierData[] = [
  {
    id: "weekly",
    label: "Weekly",
    price: 59,
    period: "/week",
    description: "Try Zerox AI risk-free",
    badge: null,
    features: [
      "Voice-controlled AI interaction",
      "Natural AI conversation engine",
      "Desktop automation engine",
      "Web search integration",
    ],
    whatsappMessage:
      "Hello! I want to subscribe to Zerox AI Weekly Plan (₹59/week). Please guide me through the process.",
    gradient: "from-violet-500 to-violet-500",
    borderColor: "border-violet-500/30",
  },
  {
    id: "monthly",
    label: "Monthly",
    price: 199,
    period: "/month",
    description: "Most popular choice",
    badge: "Most Bought",
    features: [
      "Voice-controlled AI interaction",
      "Natural AI conversation engine",
      "Real-time speech-to-text",
      "Desktop automation engine",
      "Web search integration",
    ],
    whatsappMessage:
      "Hello! I want to subscribe to Zerox AI Monthly Plan (₹199/month). Please guide me through the process.",
    gradient: "from-violet-500 to-purple-600",
    borderColor: "border-fuchsia-400/60",
  },
  {
    id: "quarterly",
    label: "Quarterly",
    price: 599,
    period: "/quarter",
    description: "Best value for 3 months",
    badge: null,
    features: [
      "All Monthly features",
      "Computer vision via OpenCV",
      "Image understanding & analysis",
      "Plugin-based expandable system",
      "Priority support",
    ],
    whatsappMessage:
      "Hello! I want to subscribe to Zerox AI Quarterly Plan (₹599/quarter). Please guide me through the process.",
    gradient: "from-violet-500 to-purple-600",
    borderColor: "border-violet-500/30",
  },
  {
    id: "yearly",
    label: "Yearly",
    price: 999,
    period: "/year",
    description: "Maximum savings",
    badge: "Best Value",
    features: [
      "All Quarterly features",
      "AI-powered image generation",
      "Live camera feed assistance",
      "Full system automation control",
      "Open-source customizable core",
    ],
    whatsappMessage:
      "Hello! I want to subscribe to Zerox AI Yearly Plan (₹999/year). Please guide me through the process.",
    gradient: "from-purple-500 to-pink-600",
    borderColor: "border-purple-500/30",
  },
];

export default function MonthlyPricingPage() {
  useSeo(SEO["/monthly-pricing"]);
  const navigate = useNavigate();

  const handleSelectTier = (tier: TierData) => {
    // Store tier data in sessionStorage before navigating
    sessionStorage.setItem(
      "zerox_selected_tier",
      JSON.stringify({
        id: tier.id,
        label: tier.label,
        price: tier.price,
        whatsappMessage: tier.whatsappMessage,
      }),
    );
    navigate({ to: "/pay/$tier", params: { tier: tier.id } });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden py-20">
      {/* Corner bracket decorations (kept) */}
      <div className="pointer-events-none fixed left-4 top-24 z-0 h-8 w-8 border-l-2 border-t-2 border-violet-500/40" />
      <div className="pointer-events-none fixed right-4 top-24 z-0 h-8 w-8 border-r-2 border-t-2 border-violet-500/40" />

      <div className="container relative z-10 mx-auto max-w-full px-4">
        <RevealGroup className="mb-16 space-y-4 px-4 text-center">
          <RevealItem>
            <div className="zx-eyebrow zx-mono justify-center">
              03 — Subscriptions
            </div>
          </RevealItem>
          <RevealItem>
            <h1 className="zx-display text-4xl font-bold sm:text-5xl md:text-6xl">
              <SplitText
                text="Monthly Pricing"
                by="word"
                stagger={0.06}
                className="zx-gradient-text"
              />
            </h1>
          </RevealItem>
          <RevealItem kind="blur">
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              Flexible subscription plans. Cancel anytime.
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mx-auto mb-12 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {monthlyTiers.map((tier) => (
            <RevealItem key={tier.id} kind="rise" className="h-full">
              <TiltCard max={4} className="h-full">
                <Card
                  className={`zx-card zx-card-lit zx-edge-top relative flex h-full flex-col ${tier.borderColor} hover:border-fuchsia-300/60 hover:shadow-glow`}
                  data-ocid={`monthly.tier.${monthlyTiers.indexOf(tier) + 1}`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                      <Badge
                        className={`bg-gradient-to-r ${tier.gradient} whitespace-nowrap px-3 py-0.5 text-xs text-white`}
                      >
                        <Sparkles className="mr-1 h-3 w-3" />
                        {tier.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4 pt-6 text-center">
                    <div className="mb-3 flex items-center justify-center gap-1">
                      <div className="h-px w-8 bg-violet-500/50" />
                      <span className="zx-mono text-xs tracking-widest text-fuchsia-300/70">
                        {tier.label.toUpperCase()}
                      </span>
                      <div className="h-px w-8 bg-violet-500/50" />
                    </div>
                    <div
                      className={`zx-display bg-gradient-to-r text-4xl font-bold ${tier.gradient} bg-clip-text text-transparent`}
                    >
                      ₹{tier.price}
                    </div>
                    <div className="zx-mono mt-1 text-xs text-muted-foreground">
                      {tier.period}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {tier.description}
                    </p>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-2 px-4">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm bg-fuchsia-400/15">
                          <Check className="h-2.5 w-2.5 text-fuchsia-300" />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {f}
                        </span>
                      </div>
                    ))}
                    <Button
                      variant="link"
                      size="sm"
                      className="zx-underline-draw mt-2 h-auto p-0 font-mono text-xs text-fuchsia-300"
                      onClick={() => navigate({ to: "/features" })}
                      data-ocid={`monthly.view_features.${
                        monthlyTiers.indexOf(tier) + 1
                      }.button`}
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      View All Features
                    </Button>
                  </CardContent>

                  <CardFooter className="flex flex-col gap-2 px-4 pb-5 pt-4">
                    <Magnetic strength={0.15} className="w-full">
                      <Button
                        className={`zx-btn glow-button w-full bg-gradient-to-r ${tier.gradient} font-mono text-sm font-semibold text-white`}
                        onClick={() => handleSelectTier(tier)}
                        data-ocid={`monthly.buy.${
                          monthlyTiers.indexOf(tier) + 1
                        }.button`}
                      >
                        <Zap className="mr-1 h-4 w-4" />
                        Get {tier.label}
                      </Button>
                    </Magnetic>
                  </CardFooter>
                </Card>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Note */}
        <RevealGroup>
          <RevealItem kind="fade">
            <p className="zx-mono pb-8 text-center text-sm text-muted-foreground">
              All plans include secure payment via UPI. Activation within 24
              hours.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </div>
  );
}
