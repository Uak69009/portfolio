"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { registerVisemeCallback, unregisterVisemeCallback, VisemeState } from "@/lib/speech";

interface Avatar3DProps {
  isDark?: boolean;
  accentColor?: string;
  isSpeaking?: boolean;
}

export default function Avatar3DCanvas({
  isDark = true,
  accentColor = "#FACC15",
  isSpeaking = false,
}: Avatar3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visemeStateRef = useRef<VisemeState>({ volume: 0, visemeType: "closed" });

  useEffect(() => {
    registerVisemeCallback((state) => {
      visemeStateRef.current = state;
    });
    return () => unregisterVisemeCallback();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let height = container.clientHeight || 220;

    // ── 1. Three.js Scene Setup ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 2.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // ── 2. Lighting Setup ──
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(accentColor, 1.8);
    keyLight.position.set(1.5, 2, 2);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x3b82f6, 0.8);
    fillLight.position.set(-1.5, 0.5, 1.5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(accentColor, 1.5, 5);
    rimLight.position.set(0, 1.2, -1.5);
    scene.add(rimLight);

    // ── 3. High-Quality Procedural 3D Cyberpunk AI Avatar Group ──
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // Head Mesh
    const headGeo = new THREE.SphereGeometry(0.48, 64, 64);
    headGeo.scale(0.92, 1.15, 0.95);
    const headMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x171717 : 0xf8fafc,
      roughness: 0.35,
      metalness: 0.2,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.set(0, 0.2, 0);
    avatarGroup.add(headMesh);

    // Cyberpunk Visor / Glasses
    const visorGeo = new THREE.CylinderGeometry(0.45, 0.44, 0.16, 32, 1, false, -Math.PI / 2.8, Math.PI / 1.4);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor),
      emissive: new THREE.Color(accentColor),
      emissiveIntensity: isDark ? 0.6 : 0.3,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.4,
      transparent: true,
      opacity: 0.85,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.32, 0.12);
    visorMesh.rotation.x = 0.1;
    avatarGroup.add(visorMesh);

    // Eyes (behind visor)
    const eyeGeo = new THREE.SphereGeometry(0.065, 32, 32);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.16, 0.31, 0.36);
    avatarGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.16, 0.31, 0.36);
    avatarGroup.add(rightEye);

    // Pupils (Glowing Cyber Cyan / Gold)
    const pupilGeo = new THREE.SphereGeometry(0.035, 16, 16);
    const pupilMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.16, 0.31, 0.41);
    avatarGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0.16, 0.31, 0.41);
    avatarGroup.add(rightPupil);

    // Dynamic Lip-Sync Mouth Mesh
    const mouthGeo = new THREE.RingGeometry(0.02, 0.09, 32);
    const mouthMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      side: THREE.DoubleSide,
    });
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
    mouthMesh.position.set(0, 0.08, 0.42);
    avatarGroup.add(mouthMesh);

    // Shoulders & Cyber Collar
    const collarGeo = new THREE.CylinderGeometry(0.48, 0.65, 0.35, 32);
    const collarMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0a0a0a : 0xe2e8f0,
      roughness: 0.5,
      metalness: 0.5,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.set(0, -0.35, 0);
    avatarGroup.add(collarMesh);

    // Floating Cyber Ring Halo around Head
    const haloGeo = new THREE.TorusGeometry(0.68, 0.012, 16, 100);
    const haloMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accentColor) });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2.3;
    haloMesh.position.set(0, 0.25, 0);
    avatarGroup.add(haloMesh);

    // ── 4. Mouse Tracking & Mouse Pointer Event Listener ──
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ── 5. Idle Animation & Lip-Sync Render Loop ──
    let animId: number;
    let clock = new THREE.Clock();
    let blinkTimer = 0;
    let isBlinking = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // A. Idle Breathing Motion
      const breath = Math.sin(time * 2.2) * 0.02;
      avatarGroup.position.y = breath;
      collarMesh.position.y = -0.35 + breath * 0.5;

      // B. Head Sway & Mouse Pointer Tracking
      const targetRotX = mouse.y * 0.18;
      const targetRotY = mouse.x * 0.25;
      headMesh.rotation.x += (targetRotX - headMesh.rotation.x) * 0.05;
      headMesh.rotation.y += (targetRotY - headMesh.rotation.y) * 0.05;
      visorMesh.rotation.y = headMesh.rotation.y;
      visorMesh.rotation.x = 0.1 + headMesh.rotation.x;
      haloMesh.rotation.z = time * 0.3;

      // C. Pupil Eye Movement
      leftPupil.position.x = -0.16 + mouse.x * 0.02;
      leftPupil.position.y = 0.31 + mouse.y * 0.02;
      rightPupil.position.x = 0.16 + mouse.x * 0.02;
      rightPupil.position.y = 0.31 + mouse.y * 0.02;

      // D. Periodic Natural Eye Blinking
      blinkTimer += 0.016;
      if (blinkTimer > 3.5 + Math.random() * 2) {
        isBlinking = true;
        blinkTimer = 0;
      }
      if (isBlinking) {
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;
        setTimeout(() => {
          leftEye.scale.y = 1;
          rightEye.scale.y = 1;
          isBlinking = false;
        }, 120);
      }

      // E. Real-Time Lip-Sync & Viseme Morph Target Driver
      const currentViseme = visemeStateRef.current;
      const targetScaleY = currentViseme.volume > 0.05 ? 1 + currentViseme.volume * 2.5 : 0.2;
      const targetScaleX = currentViseme.volume > 0.05 ? 1 + currentViseme.volume * 1.2 : 1.0;

      mouthMesh.scale.y += (targetScaleY - mouthMesh.scale.y) * 0.3;
      mouthMesh.scale.x += (targetScaleX - mouthMesh.scale.x) * 0.3;

      // Pulse Halo intensity when speaking
      if (currentViseme.volume > 0.1) {
        haloMat.color.setHex(0xffffff);
      } else {
        haloMat.color.setStyle(accentColor);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── 6. Resize Handler ──
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDark, accentColor]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden"
    />
  );
}
