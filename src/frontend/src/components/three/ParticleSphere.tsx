import { useLowPowerMode } from "@/hooks/useLowPowerMode";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Pre-compute letter positions for "ZEROX"
function getZeroxTextPositions(): THREE.Vector3[] {
  const letters: [number, number][][] = [
    // Z
    [
      [0, 3],
      [1, 3],
      [2, 3],
      [2, 2],
      [1, 1],
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    // E
    [
      [4, 3],
      [5, 3],
      [6, 3],
      [4, 2],
      [5, 2],
      [4, 1],
      [4, 0],
      [5, 0],
      [6, 0],
    ],
    // R
    [
      [8, 3],
      [9, 3],
      [10, 3],
      [8, 2],
      [9, 2],
      [10, 1],
      [8, 1],
      [8, 0],
    ],
    // O
    [
      [12, 3],
      [13, 3],
      [14, 3],
      [12, 2],
      [14, 2],
      [12, 1],
      [14, 1],
      [12, 0],
      [13, 0],
      [14, 0],
    ],
    // X
    [
      [16, 3],
      [18, 3],
      [17, 2],
      [16, 1],
      [18, 1],
      [16, 0],
      [18, 0],
    ],
  ];

  const positions: THREE.Vector3[] = [];
  for (const letter of letters) {
    for (const [x, y] of letter) {
      positions.push(new THREE.Vector3((x - 9) * 0.2, (y - 1.5) * 0.2, 0));
    }
  }
  return positions;
}

const PARTICLE_COUNT = 800;

// Shared ref that the canvas wrapper sets; the inner component reads it.
interface PressRef {
  pressed: boolean;
}

function ParticleSphereInner({ pressRef }: { pressRef: PressRef }) {
  const pointsRef = useRef<THREE.Points>(null);
  const morphProgress = useRef(0);
  const autoRotationTime = useRef(0);

  const spherePositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
      arr[i * 3] = Math.cos(theta) * Math.sin(phi) * 1.5;
      arr[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * 1.5;
      arr[i * 3 + 2] = Math.cos(phi) * 1.5;
    }
    return arr;
  }, []);

  const textPositions = useMemo(() => {
    const basePositions = getZeroxTextPositions();
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const base = basePositions[i % basePositions.length];
      const jitter = 0.05;
      arr[i * 3] = base.x + (Math.random() - 0.5) * jitter;
      arr[i * 3 + 1] = base.y + (Math.random() - 0.5) * jitter;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(spherePositions.slice(), 3),
    );
    return geo;
  }, [spherePositions]);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;

    const morphSpeed = 0.08;

    if (pressRef.pressed) {
      morphProgress.current = Math.min(morphProgress.current + morphSpeed, 1);
    } else {
      morphProgress.current = Math.max(morphProgress.current - morphSpeed, 0);
    }

    const t = morphProgress.current;
    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] =
        spherePositions[i * 3] * (1 - t) + textPositions[i * 3] * t;
      positions[i * 3 + 1] =
        spherePositions[i * 3 + 1] * (1 - t) + textPositions[i * 3 + 1] * t;
      positions[i * 3 + 2] =
        spherePositions[i * 3 + 2] * (1 - t) + textPositions[i * 3 + 2] * t;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    if (!pressRef.pressed) {
      autoRotationTime.current += delta;
      pointsRef.current.rotation.y = autoRotationTime.current * 0.3;
      pointsRef.current.rotation.x =
        Math.sin(autoRotationTime.current * 0.2) * 0.1;
    } else {
      pointsRef.current.rotation.y += (0 - pointsRef.current.rotation.y) * 0.08;
      pointsRef.current.rotation.x += (0 - pointsRef.current.rotation.x) * 0.08;
    }
  });

  return (
    <group>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.05}
          color="#a855f7"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#e879f9" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#7700ff" />
    </group>
  );
}

export default function ParticleSphere() {
  const isLowPower = useLowPowerMode();
  const dpr = isLowPower ? 1 : Math.min(window.devicePixelRatio, 2);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Shared mutable press state — plain object so no re-renders needed.
  const pressRef = useRef<PressRef>({ pressed: false });

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const press = () => {
      pressRef.current.pressed = true;
    };
    const release = () => {
      pressRef.current.pressed = false;
    };

    // Pointer events cover both mouse and touch reliably.
    el.addEventListener("pointerdown", press, { passive: true });
    el.addEventListener("pointerup", release, { passive: true });
    el.addEventListener("pointerleave", release, { passive: true });
    el.addEventListener("pointercancel", release, { passive: true });

    return () => {
      el.removeEventListener("pointerdown", press);
      el.removeEventListener("pointerup", release);
      el.removeEventListener("pointerleave", release);
      el.removeEventListener("pointercancel", release);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full"
      style={{ touchAction: "none", cursor: "pointer" }}
    >
      <Canvas
        className="w-full h-full"
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: !isLowPower, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <ParticleSphereInner pressRef={pressRef.current} />
      </Canvas>
    </div>
  );
}
