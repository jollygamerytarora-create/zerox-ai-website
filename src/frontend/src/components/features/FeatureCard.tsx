import TiltCard from "@/components/motion/TiltCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ZeroxFeature } from "@/content/zeroxFeatures";

interface FeatureCardProps {
  feature: ZeroxFeature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <TiltCard max={5} className="h-full">
      <Card className="zx-card zx-card-lit zx-edge-top group h-full">
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-400/15 to-purple-600/10 transition-all duration-500 group-hover:border-fuchsia-300/40 group-hover:from-fuchsia-400/25 group-hover:to-purple-600/20">
            <Icon className="h-6 w-6 text-fuchsia-300 transition-transform duration-500 group-hover:scale-110" />
          </div>
          <CardTitle className="zx-display text-xl transition-colors duration-300 group-hover:text-fuchsia-200">
            {feature.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        </CardContent>
      </Card>
    </TiltCard>
  );
}
