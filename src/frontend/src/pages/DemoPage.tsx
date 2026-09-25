import { useSeo } from "@/lib/seo";
import { SEO } from "@/lib/seoPages";
import Magnetic from "@/components/motion/Magnetic";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
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
import { createWhatsAppLink } from "@/utils/whatsapp";
import { MessageCircle } from "lucide-react";

export default function DemoPage() {
  useSeo(SEO["/demo"]);
  const handleGetDemo = () => {
    const whatsappLink = createWhatsAppLink(
      "917014270402",
      "Hey! I want A Free Demo For Zerox.",
    );
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="relative z-10 container mx-auto max-w-full px-4 py-20">
        <RevealGroup className="mb-12 space-y-4 px-4 text-center">
          <RevealItem>
            <div className="zx-eyebrow zx-mono justify-center">05 — Demo</div>
          </RevealItem>
          <RevealItem>
            <h1 className="zx-display text-4xl font-bold sm:text-5xl md:text-6xl">
              <SplitText
                text="Experience Zerox AI"
                by="word"
                stagger={0.05}
                className="zx-gradient-text"
              />
            </h1>
          </RevealItem>
          <RevealItem kind="blur">
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              See the future of AI assistance in action. Get your personalized
              demo today.
            </p>
          </RevealItem>
        </RevealGroup>

        <Reveal kind="blur" className="mx-auto w-full max-w-3xl">
          <TiltCard max={2}>
            <Card className="zx-card zx-card-lit zx-edge-top w-full border-violet-500/25 shadow-glow-cyan">
              <CardHeader className="space-y-4 text-center">
                <div className="shadow-glow-cyan relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-500">
                  {/* Signal ping rings */}
                  <div className="absolute inset-0 animate-signal-ping rounded-full bg-violet-500/30" />
                  <div
                    className="absolute inset-0 animate-signal-ping rounded-full bg-violet-500/20"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <MessageCircle className="relative z-10 h-10 w-10 text-white" />
                </div>
                <CardTitle className="zx-display text-2xl font-bold text-fuchsia-200 sm:text-3xl">
                  Get Your Free Demo
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Connect with us on WhatsApp and discover how Zerox AI can
                  transform your workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 text-center">
                  <p className="zx-mono text-sm text-foreground/80">
                    Our team will guide you through:
                  </p>
                  <ul className="mx-auto max-w-md space-y-2 text-left">
                    {[
                      "All 27 powerful AI features",
                      "Personalized setup assistance",
                      "Best practices and tips",
                      "Answers to all your questions",
                    ].map((point, i) => (
                      <RevealItem key={point} kind="slide-left">
                        <li className="flex items-start gap-2">
                          <span className="zx-mono mt-1 text-fuchsia-300">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      </RevealItem>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center pt-4">
                  <Magnetic>
                    <Button
                      size="lg"
                      onClick={handleGetDemo}
                      className="zx-btn animate-warp-pulse bg-gradient-to-r from-violet-500 to-purple-500 px-8 py-6 text-base font-semibold text-white shadow-glow-cyan hover:from-violet-600 hover:to-purple-600 sm:text-lg"
                      data-ocid="demo.get_demo.primary_button"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Get Free Demo
                    </Button>
                  </Magnetic>
                </div>

                <p className="zx-mono pt-4 text-center text-sm text-muted-foreground">
                  Click the button above to start a WhatsApp conversation with
                  our team
                </p>
              </CardContent>
            </Card>
          </TiltCard>
        </Reveal>
      </div>
    </div>
  );
}
