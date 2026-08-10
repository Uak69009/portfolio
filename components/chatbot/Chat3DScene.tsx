"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import ChatAvatar from "./ChatAvatar";
import { useAccent } from "@/hooks/useTheme";

interface Chat3DSceneProps {
  isHovered?: boolean;
  isSpeaking?: boolean;
  className?: string;
}

export default function Chat3DScene({
  isHovered = false,
  isSpeaking = false,
  className = "w-full h-full",
}: Chat3DSceneProps) {
  const { isDark, accent } = useAccent();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  return (
    <div className={`relative ${className} pointer-events-auto`}>
      <Canvas
        camera={{ position: [0, 0, 2.7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={isDark ? 0.9 : 1.2} />
        <directionalLight position={[2, 2, 3]} intensity={1.8} color={accent} />
        <pointLight position={[-2, -1, 1]} intensity={0.8} color={isDark ? "#38bdf8" : "#3b82f6"} />
        <spotLight position={[0, 3, -1]} intensity={1.5} color={accent} angle={0.6} />

        <ChatAvatar
          isHovered={isHovered}
          isSpeaking={isSpeaking}
          accentColor={accent}
          isDark={isDark}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
