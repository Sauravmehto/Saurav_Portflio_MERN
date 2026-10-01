"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, Preload, useGLTF, Clone } from "@react-three/drei";
import type { Group, Points as PointsType } from "three";

function starPositions(count: number, radius: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const i3 = i * 3;
    arr[i3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function Stars({ spin }: { spin: boolean }) {
  const ref = useRef<PointsType>(null);
  const positions = useMemo(() => starPositions(1400, 8), []);

  useFrame((_, delta) => {
    if (!spin || !ref.current) return;
    ref.current.rotation.y -= delta / 18;
    ref.current.rotation.x -= delta / 28;
  });

  return (
    <group rotation={[0, 0, Math.PI / 5]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c4b5fd"
          size={0.012}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function Earth({ spin }: { spin: boolean }) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF("/planet/scene.gltf");

  useFrame((_, delta) => {
    if (!spin || !ref.current) return;
    ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={ref} position={[0, -0.15, 0]}>
      <Clone object={scene} scale={2.05} />
    </group>
  );
}

useGLTF.preload("/planet/scene.gltf");

export function ContactScene({ spin }: { spin: boolean }) {
  return (
    <Canvas
      frameloop={spin ? "always" : "demand"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 200 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y", pointerEvents: "none" }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 3, 5]} intensity={1.3} />
      <Stars spin={spin} />
      <Suspense fallback={null}>
        <Earth spin={spin} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
