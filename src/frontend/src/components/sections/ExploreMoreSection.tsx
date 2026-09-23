import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Sparkles } from "lucide-react";

export default function ExploreMoreSection() {
  const handleExploreClick = () => {
    window.open("https://website.beacons.ai/divyamarora", "_blank");
  };

  return (
    <div className="container mx-auto px-4">
      <Card className="glass-card border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-pink-500/5 max-w-4xl mx-auto">
        <CardContent className="p-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">
              Discover More
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Explore More from Jolly Tech
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete portfolio of projects, content, and
            innovations. Visit our Beacons page to explore everything we're
            building.
          </p>

          <Button
            size="lg"
            className="glow-button bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-lg px-8 py-6"
            onClick={handleExploreClick}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Visit Beacons Page
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
