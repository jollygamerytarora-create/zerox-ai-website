import Motion from "@/components/site/Motion";
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
    price: 9,
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
      "Hello! I want to subscribe to Zerox AI Weekly Plan (₹9/week). Please guide me through the process.",
    gradient: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/30",
  },
  {
    id: "monthly",
    label: "Monthly",
    price: 29,
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
      "Hello! I want to subscribe to Zerox AI Monthly Plan (₹29/month). Please guide me through the process.",
    gradient: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-400/60",
  },
  {
    id: "quarterly",
    label: "Quarterly",
    price: 99,
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
      "Hello! I want to subscribe to Zerox AI Quarterly Plan (₹99/quarter). Please guide me through the process.",
    gradient: "from-violet-500 to-purple-600",
    borderColor: "border-violet-500/30",
  },
  {
    id: "yearly",
    label: "Yearly",
    price: 299,
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
      "Hello! I want to subscribe to Zerox AI Yearly Plan (₹299/year). Please guide me through the process.",
    gradient: "from-purple-500 to-pink-600",
    borderColor: "border-purple-500/30",
  },
];

export default function MonthlyPricingPage() {
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
    <div className="relative min-h-screen py-20 w-full overflow-x-hidden hex-bg scanline-overlay">
      {/* Data stream decorative lines */}
      <div className="fixed left-0 top-0 bottom-0 w-px overflow-hidden pointer-events-none z-0">
        <div className="w-full h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-data-stream" />
      </div>
      <div className="fixed right-0 top-0 bottom-0 w-px overflow-hidden pointer-events-none z-0">
        <div
          className="w-full h-32 bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-data-stream"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Corner bracket decorations */}
      <div className="fixed top-24 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/40 pointer-events-none z-0" />
      <div className="fixed top-24 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-500/40 pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10 max-w-full">
        <Motion type="fade-up">
          <div className="text-center mb-16 space-y-4 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded border border-cyan-500/40 bg-cyan-500/5 mb-4">
              <span className="font-mono text-xs text-cyan-400 tracking-widest terminal-cursor">
                MONTHLY_PLANS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent break-words">
              Monthly Pricing
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-mono">
              Flexible subscription plans. Cancel anytime.
            </p>
          </div>
        </Motion>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {monthlyTiers.map((tier, index) => (
            <Motion key={tier.id} type="fade-up" delay={0.1 * index}>
              <Card
                className={`glass-card relative ${tier.borderColor} hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 hover:shadow-glow h-full flex flex-col ${
                  tier.badge === "Most Bought" ? "shadow-glow" : ""
                }`}
                data-ocid={`monthly.tier.${index + 1}`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge
                      className={`bg-gradient-to-r ${tier.gradient} text-white px-3 py-0.5 text-xs whitespace-nowrap`}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4 pt-6">
                  {/* Robotic accent */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <div className="h-px w-8 bg-cyan-500/50" />
                    <span className="font-mono text-xs text-cyan-400/70 tracking-widest">
                      {tier.label.toUpperCase()}
                    </span>
                    <div className="h-px w-8 bg-cyan-500/50" />
                  </div>
                  <div
                    className={`text-4xl font-bold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}
                  >
                    ₹{tier.price}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">
                    {tier.period}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {tier.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-2 flex-1 px-4">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-sm bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-cyan-400" />
                      </div>
                      <span className="text-xs text-muted-foreground">{f}</span>
                    </div>
                  ))}
                  <Button
                    variant="link"
                    size="sm"
                    className="text-cyan-400 p-0 h-auto font-mono text-xs mt-2"
                    onClick={() => navigate({ to: "/features" })}
                    data-ocid={`monthly.view_features.${index + 1}.button`}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View All Features
                  </Button>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 pt-4 pb-5 px-4">
                  <Button
                    className={`w-full glow-button bg-gradient-to-r ${tier.gradient} text-white font-semibold font-mono text-sm`}
                    onClick={() => handleSelectTier(tier)}
                    data-ocid={`monthly.buy.${index + 1}.button`}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Get {tier.label}
                  </Button>
                </CardFooter>
              </Card>
            </Motion>
          ))}
        </div>

        {/* Note */}
        <Motion type="fade-up" delay={0.5}>
          <p className="text-center text-sm text-muted-foreground font-mono pb-8">
            All plans include secure payment via UPI. Activation within 24
            hours.
          </p>
        </Motion>
      </div>
    </div>
  );
}
