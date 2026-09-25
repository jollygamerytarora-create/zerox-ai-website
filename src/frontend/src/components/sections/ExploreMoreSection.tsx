import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";

export default function ExploreMoreSection() {
  const handleExploreClick = () => {
    window.open("https://website.beacons.ai/divyamarora", "_blank");
  };

  return (
    <div className="container mx-auto px-4">
      <Reveal kind="blur">
        <TiltCard max={2.5}>
          <div className="zx-card zx-card-lit zx-edge-top mx-auto max-w-4xl p-10 text-center sm:p-14">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-400/[0.07] px-4 py-1.5">
                <Sparkles className="h-4 w-4 text-violet-300" />
                <span className="zx-mono text-[11px] tracking-[0.28em] text-violet-200/85">
                  DISCOVER MORE
                </span>
              </div>

              <h2 className="zx-display text-4xl font-bold md:text-5xl">
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-pink-300 bg-clip-text text-transparent">
                  Explore More from Jolly Tech
                </span>
              </h2>

              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Discover our complete portfolio of projects, content, and
                innovations. Visit our Beacons page to explore everything we're
                building.
              </p>

              <Magnetic>
                <Button
                  size="lg"
                  className="zx-btn glow-button bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-6 text-lg hover:from-purple-400 hover:to-pink-500"
                  onClick={handleExploreClick}
                  data-cursor="link"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Visit Beacons Page
                </Button>
              </Magnetic>
            </div>
          </div>
        </TiltCard>
      </Reveal>
    </div>
  );
}
