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
import { Check, Copy, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PaymentSection() {
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const upiId = "divyamarora@fam";

  const handleCopyUPI = async () => {
    const success = await copyToClipboard(upiId);
    if (success) {
      setCopied(true);
      toast.success("UPI ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Failed to copy UPI ID");
    }
  };

  const handleVerifyPayment = () => {
    if (!transactionId.trim()) {
      toast.error("Please enter your transaction ID");
      return;
    }

    const message = `Hello, I have completed the payment for Zerox AI.\nThis is my transaction ID: ${transactionId}.\nPlease verify and provide access.`;
    const whatsappLink = createWhatsAppLink("917014270402", message);
    window.open(whatsappLink, "_blank");
  };

  return (
    <div id="payment-section" className="max-w-3xl mx-auto">
      <Card className="glass-card border-cyan-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Complete Your Payment</CardTitle>
          <CardDescription className="text-base">
            Pay via UPI and verify your transaction to get instant access
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* UPI QR Code */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-64 h-64 rounded-lg overflow-hidden border-2 border-cyan-500/30 bg-white p-2">
              <img
                src="/assets/Screenshot_2026-02-15-09-53-36-69_ba41e9a642e6e0e2b03656bfbbffd6e4.jpg"
                alt="UPI QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Scan to pay via any UPI app
            </p>
          </div>

          {/* UPI ID */}
          <div className="space-y-2">
            <Label htmlFor="upi-id" className="text-base">
              UPI ID
            </Label>
            <div className="flex gap-2">
              <Input
                id="upi-id"
                value={upiId}
                readOnly
                className="font-mono text-lg bg-muted/50"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyUPI}
                className="flex-shrink-0 border-cyan-500/50 hover:bg-cyan-500/10"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Transaction ID Input */}
          <div className="space-y-2">
            <Label htmlFor="transaction-id" className="text-base">
              Enter your Transaction ID
            </Label>
            <Input
              id="transaction-id"
              placeholder="e.g., 123456789012"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground">
              Enter the transaction ID from your payment app
            </p>
          </div>

          {/* Verify Button */}
          <Button
            className="w-full glow-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500"
            size="lg"
            onClick={handleVerifyPayment}
          >
            <Send className="w-5 h-5 mr-2" />
            Verify Payment
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            After clicking verify, you'll be redirected to WhatsApp to complete
            the verification process
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
