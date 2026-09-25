import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import { Button } from "@/components/ui/button";
import { ExternalLink, Headphones } from "lucide-react";
import AudioWave from "./AudioWave";

export default function PodcastSection() {
  const handlePodcastClick = () => {
    window.open("https://thejollypodcast.wordpress.com/", "_blank");
  };

  return (
    <div className="container mx-auto px-4">
      <Reveal kind="blur">
        <TiltCard max={2.5}>
          <div className="zx-card zx-card-lit zx-edge-top mx-auto max-w-4xl p-10 text-center sm:p-14">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/25 bg-fuchsia-400/[0.07] px-4 py-1.5">
                <Headphones className="h-4 w-4 text-fuchsia-300" />
                <span className="zx-mono text-[11px] tracking-[0.28em] text-fuchsia-200/85">
                  PODCAST
                </span>
              </div>

              <h2 className="zx-display text-4xl font-bold md:text-5xl">
                <span className="zx-gradient-text">
                  Listen to The Jolly Podcast
                </span>
              </h2>

              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Tune in to conversations about technology, innovation, and the
                future of AI. Join us on our journey through the world of tech.
              </p>

              <div className="py-8">
                <AudioWave />
              </div>

              <Magnetic>
                <Button
                  size="lg"
                  className="zx-btn glow-button bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-6 text-lg hover:from-fuchsia-400 hover:to-violet-500"
                  onClick={handlePodcastClick}
                  data-cursor="link"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Listen Now
                </Button>
              </Magnetic>
            </div>
          </div>
        </TiltCard>
      </Reveal>
    </div>
  );
}
