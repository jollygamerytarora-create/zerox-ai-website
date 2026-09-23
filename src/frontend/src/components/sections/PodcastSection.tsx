import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Headphones } from "lucide-react";
import AudioWave from "./AudioWave";

export default function PodcastSection() {
  const handlePodcastClick = () => {
    window.open("https://thejollypodcast.wordpress.com/", "_blank");
  };

  return (
    <div className="container mx-auto px-4">
      <Card className="glass-card border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 max-w-4xl mx-auto">
        <CardContent className="p-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <Headphones className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">Podcast</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Listen to The Jolly Podcast
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tune in to conversations about technology, innovation, and the
            future of AI. Join us on our journey through the world of tech.
          </p>

          <div className="py-8">
            <AudioWave />
          </div>

          <Button
            size="lg"
            className="glow-button bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-lg px-8 py-6"
            onClick={handlePodcastClick}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Listen Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
