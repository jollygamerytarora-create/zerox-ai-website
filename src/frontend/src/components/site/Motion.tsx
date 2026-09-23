import { useReducedMotion } from "@/hooks/useReducedMotion";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface MotionProps {
  children: ReactNode;
  type?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale";
  delay?: number;
  className?: string;
}

export default function Motion({
  children,
  type = "fade-up",
  delay = 0,
  className = "",
}: MotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getMotionClass = () => {
    if (prefersReducedMotion) return "opacity-100";
    if (!isVisible) {
      switch (type) {
        case "fade-up":
          return "opacity-0 translate-y-8";
        case "fade-in":
          return "opacity-0";
        case "slide-left":
          return "opacity-0 -translate-x-8";
        case "slide-right":
          return "opacity-0 translate-x-8";
        case "scale":
          return "opacity-0 scale-95";
        default:
          return "opacity-0";
      }
    }
    return "opacity-100 translate-y-0 translate-x-0 scale-100";
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getMotionClass()} ${className}`}
    >
      {children}
    </div>
  );
}
