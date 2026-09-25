import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import TiltCard from "@/components/motion/TiltCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyToClipboard } from "@/utils/clipboard";
import { createWhatsAppLink } from "@/utils/whatsapp";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Copy,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TierSessionData {
  id: string;
  label: string;
  price: number;
  whatsappMessage: string;
}

export default function SecurePaymentPage() {
  const params = useParams({ from: "/pay/$tier" });
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const [tierData, setTierData] = useState<TierSessionData | null>(null);

  useEffect(() => {
    // Retrieve tier data from sessionStorage
    const stored = sessionStorage.getItem("zerox_selected_tier");
    if (stored) {
      try {
        setTierData(JSON.parse(stored));
      } catch {
        // fallback
      }
    }
  }, []);

  // Fallback tier info from URL params
  const tierLabel =
    tierData?.label ||
    params.tier.charAt(0).toUpperCase() + params.tier.slice(1);
  const price = tierData?.price || 0;
  const upiId = "divyamarora@fam";
  const upiLink = `upi://pay?pa=${upiId}&pn=JollyTech&am=${price}&cu=INR&tn=ZeroxAI_${tierLabel}`;
  const whatsappMessage =
    tierData?.whatsappMessage ||
    `Hello! I want to subscribe to Zerox AI ${tierLabel} Plan (₹${price}). Please guide me through the process.`;

  const handleCopyUPI = async () => {
    const success = await copyToClipboard(upiId);
    if (success) {
      setCopied(true);
      toast.success("UPI ID copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUPIPay = () => {
    window.open(upiLink, "_blank");
  };

  const handleWhatsApp = () => {
    window.open(createWhatsAppLink("917014270402", whatsappMessage), "_blank");
  };

  const handleVerify = () => {
    if (!transactionId.trim()) {
      toast.error("Please enter your transaction ID");
      return;
    }
    const msg = `Hello, I completed payment for Zerox AI ${tierLabel} Plan (₹${price}).\nTransaction ID: ${transactionId}.\nPlease verify and activate my subscription.`;
    window.open(createWhatsAppLink("917014270402", msg), "_blank");
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden py-20">
      <div className="container relative z-10 mx-auto max-w-2xl px-4">
        <Reveal kind="fade">
          <Button
            variant="ghost"
            className="zx-mono mb-6 text-fuchsia-300 hover:bg-violet-500/10"
            onClick={() => navigate({ to: "/monthly-pricing" })}
            data-ocid="payment.back.button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Button>
        </Reveal>

        <Reveal kind="blur">
          <div className="mb-10 space-y-3 text-center">
            <div className="zx-eyebrow zx-mono justify-center">
              06 — Secure Payment
            </div>
            <h1 className="zx-display text-3xl font-bold sm:text-4xl">
              <SplitText
                text="Complete Your Subscription"
                by="word"
                stagger={0.045}
                className="zx-gradient-text"
              />
            </h1>
            <p className="zx-mono text-sm text-muted-foreground">
              {tierLabel} Plan{price > 0 ? ` — ₹${price}` : ""}
            </p>
          </div>
        </Reveal>

        <Reveal kind="rise">
          <TiltCard max={1.5}>
            <Card className="zx-card zx-card-lit zx-edge-top mb-6 border-violet-500/25">
              <CardHeader>
                <CardTitle className="zx-mono text-xl text-fuchsia-200">
                  Choose Payment Method
                </CardTitle>
                <CardDescription className="zx-mono text-xs">
                  Two ways to complete your payment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Option 1: UPI */}
                <div className="zx-card-lit space-y-3 rounded-xl border border-violet-500/25 bg-violet-500/[0.04] p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-400 text-xs font-bold text-black">
                      1
                    </div>
                    <span className="zx-mono text-sm font-semibold text-fuchsia-200">
                      Pay via UPI
                    </span>
                  </div>
                  {price > 0 && (
                    <p className="zx-mono text-sm text-muted-foreground">
                      Send ₹{price} directly to our UPI ID
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Input
                      value={upiId}
                      readOnly
                      className="zx-mono bg-muted/50 text-sm"
                      data-ocid="payment.upi_id.input"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyUPI}
                      className="flex-shrink-0 border-violet-500/50 hover:bg-violet-500/10"
                      data-ocid="payment.copy_upi.button"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <Magnetic strength={0.12} className="w-full">
                    <Button
                      className="zx-btn glow-button w-full bg-gradient-to-r from-violet-500 to-purple-600 font-mono text-sm"
                      onClick={handleUPIPay}
                      data-ocid="payment.pay_upi.button"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Open UPI App{price > 0 ? ` — Pay ₹${price}` : ""}
                    </Button>
                  </Magnetic>
                </div>

                {/* Option 2: WhatsApp */}
                <div className="zx-card-lit space-y-3 rounded-xl border border-green-500/25 bg-green-500/[0.04] p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-black">
                      2
                    </div>
                    <span className="zx-mono text-sm font-semibold text-green-300">
                      WhatsApp — Other Payment Methods
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Contact us on WhatsApp for bank transfer or other payment
                    options
                  </p>
                  <Magnetic strength={0.12} className="w-full">
                    <Button
                      className="zx-btn w-full bg-gradient-to-r from-green-500 to-green-600 font-mono text-sm hover:from-green-400 hover:to-green-500"
                      onClick={handleWhatsApp}
                      data-ocid="payment.whatsapp.button"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp Us
                    </Button>
                  </Magnetic>
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </Reveal>

        <Reveal kind="rise">
          <TiltCard max={1.5}>
            <Card className="zx-card zx-card-lit border-violet-500/20">
              <CardHeader>
                <CardTitle className="zx-mono text-lg text-fuchsia-200">
                  After Payment — Verify
                </CardTitle>
                <CardDescription className="zx-mono text-xs">
                  Enter your transaction ID to activate access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="zx-mono text-sm">Transaction ID</Label>
                  <Input
                    placeholder="Enter your UPI transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="zx-mono"
                    data-ocid="payment.transaction_id.input"
                  />
                </div>
                <Magnetic strength={0.12} className="w-full">
                  <Button
                    className="zx-btn glow-button w-full bg-gradient-to-r from-violet-500 to-purple-500 font-mono"
                    onClick={handleVerify}
                    data-ocid="payment.verify.button"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Verify Payment via WhatsApp
                  </Button>
                </Magnetic>
                <p className="zx-mono text-center text-xs text-muted-foreground">
                  You'll be redirected to WhatsApp to confirm your transaction
                </p>
              </CardContent>
            </Card>
          </TiltCard>
        </Reveal>
      </div>
    </div>
  );
}
