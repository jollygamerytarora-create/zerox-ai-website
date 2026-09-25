import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * Lazy-loaded Spline scene with a lightweight loader fallback.
 * The chunk (and the heavy Spline runtime) is only fetched when
 * the component actually mounts.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader" aria-label="Loading 3D scene" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

export default SplineScene;
