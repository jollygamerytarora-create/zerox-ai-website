import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import ThreeCanvas from "./ThreeCanvas";

function Cubes() {
  const groupRef = useRef<THREE.Group>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);

  const cubePositions = [
    { id: "c0", pos: [-3, 2, 0] as [number, number, number] },
    { id: "c1", pos: [0, 2, 0] as [number, number, number] },
    { id: "c2", pos: [3, 2, 0] as [number, number, number] },
    { id: "c3", pos: [-3, -1, 0] as [number, number, number] },
    { id: "c4", pos: [0, -1, 0] as [number, number, number] },
    { id: "c5", pos: [3, -1, 0] as [number, number, number] },
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY * 0.001;

    cubesRef.current.forEach((cube, i) => {
      if (cube) {
        cube.rotation.x = time * 0.3 + i * 0.5 + scrollY;
        cube.rotation.y = time * 0.2 + i * 0.3 + scrollY;
        cube.position.y = cubePositions[i].pos[1] + Math.sin(time + i) * 0.3;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {cubePositions.map(({ id, pos }, i) => (
        <Box
          key={id}
          ref={(el) => {
            if (el) cubesRef.current[i] = el;
          }}
          args={[0.8, 0.8, 0.8]}
          position={pos}
        >
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </Box>
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
    </group>
  );
}

export default function FloatingFeatureCubes() {
  return (
    <ThreeCanvas className="w-full h-full">
      <Cubes />
    </ThreeCanvas>
  );
}
