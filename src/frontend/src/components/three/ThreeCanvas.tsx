import { useLowPowerMode } from "@/hooks/useLowPowerMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

interface ThreeCanvasProps {
  children: ReactNode;
  className?: string;
}

export default function ThreeCanvas({
  children,
  className = "",
}: ThreeCanvasProps) {
  const prefersReducedMotion = useReducedMotion();
  const isLowPower = useLowPowerMode();

  const dpr = isLowPower ? 1 : Math.min(window.devicePixelRatio, 2);

  return (
    <Canvas
      className={className}
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: !isLowPower, alpha: true }}
      performance={{ min: 0.5 }}
    >
      {!prefersReducedMotion && children}
    </Canvas>
  );
}
