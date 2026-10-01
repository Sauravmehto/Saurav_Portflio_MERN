"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";

/**
 * Signature "wow" element for the hero: a glossy, slowly-morphing distort
 * blob that reacts a little to the mouse. Built with R3F + Drei's
 * MeshDistortMaterial (no raw shader code) per the guide's recommended combo.
 */
function DistortBlob() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 4) * 0.3;
    meshRef.current.rotation.y = t * 0.15;

    // gentle drift toward mouse position
    const { x, y } = state.pointer;
    meshRef.current.position.x += (x * 0.4 - meshRef.current.position.x) * 0.02;
    meshRef.current.position.y += (y * 0.3 - meshRef.current.position.y) * 0.02;
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 128, 128]}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.45}
        speed={1.4}
        roughness={0.15}
        metalness={0.4}
      />
    </Sphere>
  );
}

export function HeroSceneInner() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.2} />
      <Suspense fallback={null}>
        <DistortBlob />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
