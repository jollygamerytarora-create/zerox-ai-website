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

const VALID_CODES = ["zerox100", "jolly", "jollytech", "free100"];
const WHATSAPP_NUMBER = "917014270402";
const WHATSAPP_MESSAGE =
  "Hello! I have redeemed a Zerox free access code. Please provide me access to Zerox AI.";

export default function PricingPlans() {
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemError, setRedeemError] = useState("");
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const plans = [
    {
      id: "student",
      name: "Zerox AI – Student Lifetime Plan",
      price: "₹399",
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
      price: "₹599",
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
    const normalized = redeemCode.trim().toLowerCase();
    if (VALID_CODES.includes(normalized)) {
      setRedeemError("");
      setRedeemSuccess(true);
      const encoded = encodeURIComponent(WHATSAPP_MESSAGE);
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
      setTimeout(() => {
        window.open(url, "_blank");
      }, 600);
    } else {
      setRedeemError("Invalid code. Please check and try again.");
      setRedeemSuccess(false);
    }
  };

  return (
    <>
      {/* Redeem Code Section */}
      <div className="max-w-xl mx-auto mb-16">
        <div className="glass-card border border-purple-400/40 rounded-2xl p-8 text-center space-y-6 relative overflow-hidden">
          {/* decorative glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none rounded-2xl" />

          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-purple-500/30 bg-purple-500/10 mb-2">
              <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">
                [ FREE ACCESS ]
              </span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Have a Code?
            </h3>
            <p className="text-sm text-muted-foreground font-mono">
              Enter your exclusive access code below to unlock Zerox AI for
              free.
            </p>
          </div>

          <div className="relative z-10 space-y-3">
            <input
              type="text"
              value={redeemCode}
              onChange={(e) => {
                setRedeemCode(e.target.value);
                setRedeemError("");
                setRedeemSuccess(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleRedeem()}
              placeholder="Enter redeem code..."
              className="w-full bg-black/30 border border-purple-400/40 rounded-lg px-4 py-3 text-white placeholder-muted-foreground font-mono text-sm focus:outline-none focus:border-purple-400/80 focus:ring-1 focus:ring-purple-400/40 transition-all"
              data-ocid="pricing.redeem.input"
            />

            {redeemError && (
              <p
                className="text-sm text-red-400 font-mono"
                data-ocid="pricing.redeem.error_state"
              >
                {redeemError}
              </p>
            )}

            {redeemSuccess && (
              <p
                className="text-sm text-green-400 font-mono"
                data-ocid="pricing.redeem.success_state"
              >
                Code accepted! Connecting you now...
              </p>
            )}

            <Button
              className="w-full glow-button bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 font-mono tracking-wide"
              size="lg"
              onClick={handleRedeem}
              data-ocid="pricing.redeem.submit_button"
            >
              Redeem Code
            </Button>
          </div>
        </div>
      </div>

      {/* Paid Plans */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`glass-card relative ${
              plan.popular
                ? "border-cyan-400/50 shadow-glow"
                : "border-cyan-500/30"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
              <CardDescription className="text-base">
                {plan.description}
              </CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {plan.price}
                </span>
                <span className="text-muted-foreground ml-2">one-time</span>
              </div>
              {plan.note && (
                <p className="text-sm text-yellow-400 mt-2">* {plan.note}</p>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </CardContent>

            <CardFooter>
              <Button
                className="w-full glow-button bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
                size="lg"
                onClick={scrollToPayment}
                data-ocid="pricing.buy_now.primary_button"
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
