import { Ring, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type * as THREE from "three";
import ThreeCanvas from "./ThreeCanvas";

function CoreSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (sphereRef.current && !isDragging) {
      sphereRef.current.rotation.y += 0.002;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.5) * 0.1;
      ring1Ref.current.rotation.z = time * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 2 + Math.cos(time * 0.7) * 0.1;
      ring2Ref.current.rotation.z = -time * 0.4;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.3) * 0.1;
      ring3Ref.current.rotation.z = time * 0.2;
    }
  });

  const handlePointerDown = (e: any) => {
    setIsDragging(true);
    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMouse.current.x;
    const deltaY = e.clientY - previousMouse.current.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
    }));

    if (sphereRef.current) {
      sphereRef.current.rotation.x = rotation.x;
      sphereRef.current.rotation.y = rotation.y;
    }

    previousMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Core Sphere */}
      <Sphere ref={sphereRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>

      {/* Orbiting Rings */}
      <Ring ref={ring1Ref} args={[1.5, 1.6, 64]}>
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </Ring>

      <Ring ref={ring2Ref} args={[2, 2.1, 64]}>
        <meshStandardMaterial
          color="#0099ff"
          emissive="#0099ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </Ring>

      <Ring ref={ring3Ref} args={[2.5, 2.6, 64]}>
        <meshStandardMaterial
          color="#6600ff"
          emissive="#6600ff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
        />
      </Ring>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
    </group>
  );
}

export default function ZeroxCoreSphere() {
  return (
    <ThreeCanvas className="w-full h-full">
      <CoreSphere />
    </ThreeCanvas>
  );
}
