import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createWhatsAppLink } from "@/utils/whatsapp";
import { MessageCircle, Phone } from "lucide-react";

interface FreeTierModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FreeTierModal({
  open,
  onOpenChange,
}: FreeTierModalProps) {
  const phoneNumber = "917014270402";
  const whatsappMessage = "I want The Zerox Free Version";
  const whatsappLink = createWhatsAppLink(phoneNumber, whatsappMessage);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-purple-400/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get Zerox AI Free Trial
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Choose how you'd like to get started with your 3-day free trial
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-3">
            <Button
              className="w-full h-auto py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 glow-button"
              onClick={() => {
                window.open(whatsappLink, "_blank");
                onOpenChange(false);
              }}
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold text-base">
                    Get it by WhatsApp
                  </div>
                  <div className="text-xs opacity-90">
                    Quick setup via WhatsApp
                  </div>
                </div>
              </div>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted-foreground/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-auto py-4 px-6 border-violet-500/50 hover:bg-violet-500/10"
              onClick={() => {
                window.open(`tel:${phoneNumber}`, "_self");
              }}
            >
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-fuchsia-400" />
                <div className="text-left">
                  <div className="font-semibold text-base">
                    Contact Our Team
                  </div>
                  <div className="text-xs text-muted-foreground">
                    +91 7014270402
                  </div>
                </div>
              </div>
            </Button>
          </div>

          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
            <p className="text-sm text-center text-muted-foreground">
              Our team will help you get started with your free 3-day trial of
              Zerox AI
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
