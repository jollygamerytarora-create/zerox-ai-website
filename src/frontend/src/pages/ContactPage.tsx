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
import { Globe, Mail, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function ContactPage() {
  useSeo(SEO["/contact"]);
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/917014270402", "_blank");
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <RevealGroup className="mb-16 space-y-4 px-4 text-center">
          <RevealItem>
            <div className="zx-eyebrow zx-mono justify-center">
              04 — Contact
            </div>
          </RevealItem>
          <RevealItem>
            <h1 className="zx-display text-4xl font-bold sm:text-5xl md:text-6xl">
              <SplitText
                text="Get in Touch"
                by="word"
                stagger={0.06}
                className="zx-gradient-text"
              />
            </h1>
          </RevealItem>
          <RevealItem kind="blur">
            <p className="text-lg text-muted-foreground sm:text-xl">
              Have questions? We're here to help you get started with Zerox AI
            </p>
          </RevealItem>
        </RevealGroup>

        <Reveal kind="blur">
          <TiltCard max={2}>
            <Card className="zx-card zx-card-lit zx-edge-top w-full border-violet-500/25">
              <CardHeader className="text-center">
                <CardTitle className="zx-display text-2xl sm:text-3xl">
                  Contact Support
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Reach out to us directly via WhatsApp for instant assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col items-center gap-6 py-8">
                  {/* WhatsApp icon with signal ping rings */}
                  <div className="relative h-20 w-20">
                    <div className="absolute inset-0 animate-signal-ping rounded-full bg-green-500/30" />
                    <div
                      className="absolute inset-0 animate-signal-ping rounded-full bg-green-500/20"
                      style={{ animationDelay: "0.7s" }}
                    />
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600">
                      <SiWhatsapp className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2 text-center">
                    <h3 className="zx-display text-xl font-semibold sm:text-2xl">
                      WhatsApp Support
                    </h3>
                    <p className="text-sm text-muted-foreground sm:text-base">
                      Chat with us directly for quick responses
                    </p>
                    <p className="zx-mono break-all text-lg text-fuchsia-300 sm:text-xl">
                      +91 7014270402
                    </p>
                  </div>

                  <Magnetic>
                    <Button
                      size="lg"
                      className="zx-btn glow-button w-full bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-base hover:from-green-400 hover:to-green-500 sm:w-auto sm:text-lg"
                      onClick={handleWhatsAppClick}
                      data-ocid="contact.whatsapp.primary_button"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Open WhatsApp
                    </Button>
                  </Magnetic>
                </div>

                <div className="grid gap-4 border-t border-border pt-8 md:grid-cols-3">
                  {[
                    {
                      icon: Mail,
                      title: "Email",
                      desc: "Quick response time",
                    },
                    {
                      icon: MessageCircle,
                      title: "Live Chat",
                      desc: "Available 24/7",
                    },
                    {
                      icon: Globe,
                      title: "Resources",
                      desc: "Guides & tutorials",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="zx-card-lit space-y-2 rounded-xl border border-violet-500/15 bg-violet-500/[0.04] p-4 text-center"
                    >
                      <item.icon className="mx-auto h-8 w-8 text-fuchsia-300" />
                      <h4 className="zx-mono text-sm font-semibold">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </Reveal>
      </div>
    </div>
  );
}
