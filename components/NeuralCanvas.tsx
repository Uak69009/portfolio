"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export default function NeuralCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── Scene Setup ──────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Node Geometry ─────────────────────────────────────────
    const NODE_COUNT = 80;
    const CONNECT_DISTANCE = 7;

    const nodes: Node[] = [];
    const positions = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.008
      );
      nodes.push({ position: pos, velocity: vel });
      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
    }

    // Point cloud
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pointMat = new THREE.PointsMaterial({
      color: 0x4F46E5,
      size: 0.24,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointGeo, pointMat);
    scene.add(points);

    // Lines
    const lineGeo = new THREE.BufferGeometry();
    const maxLines = NODE_COUNT * NODE_COUNT;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
      })
    );
    scene.add(lineMat);

    // ── Helpers ───────────────────────────────────────────────
    const cyanColor = new THREE.Color(0x0284C7);
    const indigoColor = new THREE.Color(0x4F46E5);
    const violetColor = new THREE.Color(0x7C3AED);

    function lerpColor(a: THREE.Color, b: THREE.Color, t: number) {
      return new THREE.Color().lerpColors(a, b, t);
    }

    // ── Animation Loop ────────────────────────────────────────
    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.005;

      // Mouse influence
      const mx = mouseRef.current.x * 0.004;
      const my = mouseRef.current.y * 0.004;

      // Update node positions
      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];
        node.position.add(node.velocity);

        // Gentle mouse attraction
        node.position.x += mx * 0.05;
        node.position.y -= my * 0.05;

        // Boundary bounce
        if (Math.abs(node.position.x) > 22) node.velocity.x *= -1;
        if (Math.abs(node.position.y) > 14) node.velocity.y *= -1;
        if (Math.abs(node.position.z) > 12) node.velocity.z *= -1;

        positions[i * 3] = node.position.x;
        positions[i * 3 + 1] = node.position.y;
        positions[i * 3 + 2] = node.position.z;
      }

      pointGeo.attributes.position.needsUpdate = true;

      // Build edges
      let lineIdx = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < CONNECT_DISTANCE) {
            const t = 1 - dist / CONNECT_DISTANCE;
            const col = lerpColor(indigoColor, cyanColor, t);

            linePositions[lineIdx * 6] = nodes[i].position.x;
            linePositions[lineIdx * 6 + 1] = nodes[i].position.y;
            linePositions[lineIdx * 6 + 2] = nodes[i].position.z;
            linePositions[lineIdx * 6 + 3] = nodes[j].position.x;
            linePositions[lineIdx * 6 + 4] = nodes[j].position.y;
            linePositions[lineIdx * 6 + 5] = nodes[j].position.z;

            const edgeCol = lerpColor(col, violetColor, Math.sin(time) * 0.5 + 0.5);
            for (let k = 0; k < 2; k++) {
              lineColors[(lineIdx * 2 + k) * 3] = edgeCol.r;
              lineColors[(lineIdx * 2 + k) * 3 + 1] = edgeCol.g;
              lineColors[(lineIdx * 2 + k) * 3 + 2] = edgeCol.b;
            }

            lineIdx++;
            if (lineIdx >= maxLines) break;
          }
        }
        if (lineIdx >= maxLines) break;
      }

      lineGeo.setDrawRange(0, lineIdx * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      // Slow camera rotation
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.y = Math.cos(time * 0.08) * 1.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // ── Mouse Tracking ────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX - window.innerWidth / 2;
      mouseRef.current.y = e.clientY - window.innerHeight / 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize Handler ────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      pointGeo.dispose();
      lineGeo.dispose();
      pointMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
