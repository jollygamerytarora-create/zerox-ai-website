import { useSeo } from "@/lib/seo";
import { SEO } from "@/lib/seoPages";
import FeatureCard from "@/components/features/FeatureCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import FloatingFeatureCubes from "@/components/three/FloatingFeatureCubes";
import { Card } from "@/components/ui/card";
import { zeroxFeatures } from "@/content/zeroxFeatures";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export default function FeaturesPage() {
  useSeo(SEO["/features"]);
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden py-20">
      {/* 3D Background (legacy, kept) */}
      <div className="fixed inset-0 z-0 opacity-[0.16]">
        <FloatingFeatureCubes />
      </div>

      {/* Scanning horizontal line animation (legacy, kept) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 top-0 z-0 overflow-hidden">
        <div
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent animate-data-stream"
          style={{ animationDuration: "3s" }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-full px-4">
        {/* Instagram Reel Embed */}
        <RevealGroup className="mx-auto mb-20 w-full max-w-2xl">
          <RevealItem kind="clip-up">
            <Card className="zx-card zx-card-lit zx-edge-top overflow-hidden">
              <div className="relative mx-auto aspect-[9/16] max-h-[600px] bg-black/20">
                <iframe
                  src="https://www.instagram.com/reel/DUN0e0vCE37/embed"
                  className="h-full w-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media"
                  title="Instagram Reel"
                  onError={(e) => {
                    const target = e.target as HTMLIFrameElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div
                  className="absolute inset-0 hidden flex-col items-center justify-center gap-4 p-8 text-center"
                  style={{ display: "none" }}
                >
                  <ExternalLink className="h-12 w-12 text-fuchsia-400" />
                  <p className="text-lg text-muted-foreground">
                    Unable to load Instagram reel
                  </p>
                  <a
                    href="https://www.instagram.com/reel/DUN0e0vCE37/?igsh=dTF1MGl3ZGFmOTJz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-fuchsia-400 hover:underline"
                  >
                    View on Instagram <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Card>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mb-20 space-y-5 px-4 text-center">
          <RevealItem>
            <div className="zx-eyebrow zx-mono justify-center">
              01 — Core Capabilities
            </div>
          </RevealItem>

          <RevealItem>
            <h1 className="zx-display text-4xl font-bold sm:text-5xl md:text-6xl">
              <SplitText
                text="Core Capabilities"
                by="word"
                stagger={0.06}
                className="zx-gradient-text"
              />
            </h1>
          </RevealItem>

          <RevealItem kind="blur">
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              Discover the powerful features that make Zerox AI your ultimate
              desktop intelligence companion
            </p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {zeroxFeatures.map((feature) => (
            <RevealItem key={feature.title} kind="rise">
              <FeatureCard feature={feature} />
            </RevealItem>
          ))}
        </RevealGroup>

        <motion.div
          className="zx-mono mt-16 text-center text-[10px] tracking-[0.4em] text-mist/25"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {zeroxFeatures.length} MODULES · ONE SYSTEM
        </motion.div>
      </div>
    </div>
  );
}
