"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { isValidElement, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { CanvasTexture, Quaternion, SRGBColorSpace, Vector3, type Group, type Mesh, type MeshStandardMaterial, type Texture } from "three";
import type { IconType } from "react-icons";
import { techLogos } from "@/components/skills/tech-logos";

function ballPositions(count: number): [number, number, number][] {
  const cols = 4;
  const points: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    points.push([(col - (cols - 1) / 2) * 2.15, (1 - row) * 1.85, 0]);
  }
  return points;
}

function attrName(key: string) {
  if (key === "viewBox" || key === "preserveAspectRatio") return key;
  if (key === "className") return "class";
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function nodeToSvg(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToSvg).join("");
  if (!isValidElement(node)) return "";

  if (typeof node.type === "function") {
    const rendered = (node.type as (props: unknown) => ReactNode)(node.props);
    return nodeToSvg(rendered);
  }

  if (typeof node.type !== "string") {
    const child = (node.props as { children?: unknown }).children;
    if (typeof child === "function") return nodeToSvg(child({}));
    return "";
  }

  const props = node.props as Record<string, unknown>;
  const attrs = Object.entries(props)
    .filter(
      ([key, value]) =>
        key !== "children" &&
        key !== "style" &&
        value != null &&
        typeof value !== "object" &&
        typeof value !== "function"
    )
    .map(([key, value]) => {
      const text = String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      return `${attrName(key)}="${text}"`;
    })
    .join(" ");

  return `<${node.type}${attrs ? ` ${attrs}` : ""}>${nodeToSvg(props.children as ReactNode)}</${node.type}>`;
}

const textures = new Map<string, Texture>();

function iconTexture(name: string, Icon: IconType, color: string, onLoad: () => void) {
  const key = `${name}-plain`;
  const cached = textures.get(key);
  if (cached) return cached;

  const svg = nodeToSvg(Icon({ size: 256, color })).replaceAll("currentColor", color);
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  textures.set(key, texture);

  const image = new Image();
  image.onload = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);
    const pad = 28;
    ctx.drawImage(image, pad, pad, size - pad * 2, size - pad * 2);
    texture.needsUpdate = true;
    onLoad();
  };
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  return texture;
}

function Ball({
  name,
  Icon,
  color,
  position,
  spin,
}: {
  name: string;
  Icon: IconType;
  color: string;
  position: [number, number, number];
  spin: boolean;
}) {
  const group = useRef<Group>(null);
  const ball = useRef<Mesh>(null);
  const material = useRef<MeshStandardMaterial>(null);
  const hovered = useRef(false);
  const [active, setActive] = useState(false);
  const invalidate = useThree((state) => state.invalidate);
  const texture = useMemo(() => iconTexture(name, Icon, color, invalidate), [name, Icon, color, invalidate]);
  const camera = useThree((state) => state.camera);
  const [x, y, z] = position;
  // Face the icon toward the camera so perspective doesn't shift it off-center on outer balls.
  const iconPlacement = useMemo(() => {
    const dir = new Vector3(camera.position.x - x, camera.position.y - y, camera.position.z - z).normalize();
    return {
      position: dir.clone().multiplyScalar(0.74),
      quaternion: new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), dir),
    };
  }, [camera, x, y, z]);

  useFrame((_, delta) => {
    if (!spin || !hovered.current || !ball.current) return;
    ball.current.rotation.y += delta * 0.35;
  });

  return (
    <Float
      speed={active && spin ? 1.4 : 0}
      rotationIntensity={active && spin ? 0.2 : 0}
      floatIntensity={active && spin ? 0.45 : 0}
    >
      <group
        ref={group}
        position={position}
        onPointerOver={(event) => {
          event.stopPropagation();
          hovered.current = true;
          setActive(true);
          group.current?.scale.setScalar(1.08);
          material.current?.color.set("#efe7ff");
          invalidate();
        }}
        onPointerOut={() => {
          hovered.current = false;
          setActive(false);
          group.current?.scale.setScalar(1);
          material.current?.color.set("#fff8eb");
          invalidate();
        }}
      >
        <mesh ref={ball}>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshStandardMaterial ref={material} color="#fff8eb" flatShading roughness={0.45} />
          <mesh position={iconPlacement.position} quaternion={iconPlacement.quaternion}>
            <planeGeometry args={[0.56, 0.56]} />
            <meshBasicMaterial map={texture} transparent alphaTest={0.2} toneMapped={false} depthWrite={false} />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
}

export function TechFieldScene({ spin }: { spin: boolean }) {
  const positions = useMemo(() => ballPositions(techLogos.length), []);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidate();
  }, [invalidate]);

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.05} />
      {techLogos.map((logo, index) => (
        <Ball
          key={logo.name}
          name={logo.name}
          Icon={logo.Icon}
          color={logo.color}
          position={positions[index]}
          spin={spin}
        />
      ))}
    </>
  );
}

export function TechFieldCanvas({ spin }: { spin: boolean }) {
  return (
    <Canvas
      frameloop={spin ? "always" : "demand"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <TechFieldScene spin={spin} />
    </Canvas>
  );
}
