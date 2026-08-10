"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ChatAvatarProps {
  isHovered?: boolean;
  isSpeaking?: boolean;
  accentColor?: string;
  isDark?: boolean;
  reducedMotion?: boolean;
}

/** Fallback Futuristic AI Assistant Procedural Robot Orb */
function ProceduralAIAssistant({
  isHovered,
  isSpeaking,
  accentColor = "#FACC15",
  isDark = true,
  reducedMotion = false,
}: ChatAvatarProps) {
  const meshGroup = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const haloRingRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  const { pointer } = useThree();
  const themeColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((state, delta) => {
    if (!meshGroup.current) return;

    // 1. Continuous gentle float & idle rotation
    if (!reducedMotion) {
      const floatY = Math.sin(state.clock.elapsedTime * 2) * 0.08;
      meshGroup.current.position.y = floatY;

      if (outerRingRef.current) {
        outerRingRef.current.rotation.z += delta * 0.8;
        outerRingRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
      }
      if (haloRingRef.current) {
        haloRingRef.current.rotation.y += delta * 1.2;
      }
    }

    // 2. Mouse cursor lerp tracking
    const targetRotY = pointer.x * 0.45;
    const targetRotX = -pointer.y * 0.35;
    meshGroup.current.rotation.y = THREE.MathUtils.lerp(
      meshGroup.current.rotation.y,
      targetRotY,
      0.08
    );
    meshGroup.current.rotation.x = THREE.MathUtils.lerp(
      meshGroup.current.rotation.x,
      targetRotX,
      0.08
    );

    // 3. Hover scale & glow interpolation
    const targetScale = isHovered ? 1.15 : 1.0;
    meshGroup.current.scale.setScalar(
      THREE.MathUtils.lerp(meshGroup.current.scale.x, targetScale, 0.1)
    );

    // 4. Speaking audio viseme pulse
    if (isSpeaking && innerCoreRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 20) * 0.15 + 1.0;
      innerCoreRef.current.scale.setScalar(pulse);
    } else if (innerCoreRef.current) {
      innerCoreRef.current.scale.setScalar(1.0);
    }
  });

  return (
    <group ref={meshGroup} position={[0, 0, 0]}>
      {/* Metallic Core Body Sphere */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial
          color={isDark ? "#121212" : "#F8FAFC"}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
          emissive={themeColor}
          emissiveIntensity={isHovered ? 0.3 : 0.12}
        />
      </mesh>

      {/* Cyber Visor / Face Display Band */}
      <mesh position={[0, 0.1, 0.15]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.52, 0.51, 0.22, 32, 1, true, -Math.PI / 2.5, Math.PI / 1.25]} />
        <meshPhysicalMaterial
          color={themeColor}
          emissive={themeColor}
          emissiveIntensity={isHovered ? 0.9 : 0.6}
          transparent
          opacity={0.88}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Glowing Cyber Eyes */}
      <mesh ref={leftEyeRef} position={[-0.18, 0.12, 0.48]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.18, 0.12, 0.48]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Futuristic Orbiting Torus Energy Ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.82, 0.022, 16, 100]} />
        <meshStandardMaterial
          color={themeColor}
          emissive={themeColor}
          emissiveIntensity={isHovered ? 1.2 : 0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Holographic Energy Halo */}
      <mesh ref={haloRingRef} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[1.05, 0.012, 16, 100]} />
        <meshBasicMaterial color={themeColor} transparent opacity={isHovered ? 0.6 : 0.35} />
      </mesh>

      {/* Orbiting Satellite Tech Spheres */}
      <mesh position={[0.95, 0.4, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={themeColor} emissive={themeColor} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-0.95, -0.4, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={themeColor} emissive={themeColor} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

/** GLTF / GLB Loader Component with Procedural Fallback */
function GLTFModel({ url, ...props }: ChatAvatarProps & { url: string }) {
  try {
    const { scene } = useGLTF(url);
    const modelGroup = useRef<THREE.Group>(null);
    const { pointer } = useThree();

    useFrame((state, delta) => {
      if (!modelGroup.current) return;
      if (!props.reducedMotion) {
        modelGroup.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.08;
      }
      modelGroup.current.rotation.y = THREE.MathUtils.lerp(
        modelGroup.current.rotation.y,
        pointer.x * 0.45,
        0.08
      );
      modelGroup.current.rotation.x = THREE.MathUtils.lerp(
        modelGroup.current.rotation.x,
        -pointer.y * 0.35,
        0.08
      );
    });

    return (
      <group ref={modelGroup}>
        <primitive object={scene} scale={1.2} />
      </group>
    );
  } catch (e) {
    // If GLTF fails to load, gracefully return the procedural AI Assistant
    return <ProceduralAIAssistant {...props} />;
  }
}

export default function ChatAvatar(props: ChatAvatarProps) {
  // If user places /models/ai-assistant.glb in public/ directory, it will load GLTFModel.
  // Otherwise it renders the futuristic procedural AI assistant!
  const hasCustomModel = false; // Toggle or auto-detect

  if (hasCustomModel) {
    return <GLTFModel url="/models/ai-assistant.glb" {...props} />;
  }

  return <ProceduralAIAssistant {...props} />;
}
