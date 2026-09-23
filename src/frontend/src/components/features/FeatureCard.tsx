import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ZeroxFeature } from "@/content/zeroxFeatures";

interface FeatureCardProps {
  feature: ZeroxFeature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <Card className="glass-card border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-glow group">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <CardTitle className="text-xl group-hover:text-cyan-400 transition-colors">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  );
}
