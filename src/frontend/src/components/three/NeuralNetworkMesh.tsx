import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import ThreeCanvas from "./ThreeCanvas";

function NeuralMesh() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, connections } = useMemo(() => {
    const nodeCount = 50;
    const positions = new Float32Array(nodeCount * 3);
    const connections: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Connect to nearby nodes
      for (let j = 0; j < i; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 5) {
          connections.push(i, j);
        }
      }
    }

    return { positions, connections };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.mouse.x * 2;
    const mouseY = state.mouse.y * 2;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05 + mouseX * 0.1;
      pointsRef.current.rotation.x = mouseY * 0.1;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.05 + mouseX * 0.1;
      linesRef.current.rotation.x = mouseY * 0.1;
    }
  });

  const linePositions = useMemo(() => {
    const linePos = new Float32Array(connections.length * 3);
    for (let i = 0; i < connections.length; i++) {
      const nodeIndex = connections[i];
      linePos[i * 3] = positions[nodeIndex * 3];
      linePos[i * 3 + 1] = positions[nodeIndex * 3 + 1];
      linePos[i * 3 + 2] = positions[nodeIndex * 3 + 2];
    }
    return linePos;
  }, [positions, connections]);

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [positions]);

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3),
    );
    return geometry;
  }, [linePositions]);

  return (
    <>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial size={0.1} color="#00ffff" transparent opacity={0.8} />
      </points>

      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.2} />
      </lineSegments>

      <ambientLight intensity={0.3} />
    </>
  );
}

export default function NeuralNetworkMesh() {
  return (
    <ThreeCanvas className="w-full h-full">
      <NeuralMesh />
    </ThreeCanvas>
  );
}
