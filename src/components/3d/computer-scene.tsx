"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Clone, OrbitControls, Preload, useGLTF } from "@react-three/drei";

function Computer() {
  const { scene } = useGLTF("/desktop_pc/scene.gltf");

  return (
    <Clone
      object={scene}
      scale={0.75}
      position={[1.1, -3.25, -1.5]}
      rotation={[-0.01, -0.2, -0.1]}
    />
  );
}

useGLTF.preload("/desktop_pc/scene.gltf");

export function ComputerScene() {
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [20, 3, 5], fov: 20 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <hemisphereLight intensity={0.4} groundColor="#050816" />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1.4} castShadow />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <Suspense fallback={null}>
        <Computer />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
