"use client";

import { useEffect, useRef } from "react";

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface NeuralNode {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  layer: number;
  radius: number;
  pulseOffset: number;
}

interface CodeParticle {
  x: number;
  y: number;
  speedY: number;
  text: string;
  opacity: number;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isHover: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initNeuralNodes();
    };
    window.addEventListener("resize", handleResize);

    // ── Neural Architecture Layers ──
    let nodes: NeuralNode[] = [];
    let connections: Array<{ from: number; to: number; weight: number }> = [];
    let pulses: Pulse[] = [];
    let codeParticles: CodeParticle[] = [];

    const codeTokens = [
      "import torch",
      "ResNeXt()",
      "RAG()",
      "LoRA",
      "FastAPI",
      "W·X+b",
      "attn",
      "0.998",
      "YOLO",
      "Docker",
    ];

    const initNeuralNodes = () => {
      nodes = [];
      connections = [];
      pulses = [];

      const layerCount = 4;
      const nodesPerLayer = [4, 5, 5, 4];

      // Position nodes towards the right half & ambient background to avoid obscuring left hero text
      const startX = width < 768 ? width * 0.15 : width * 0.45;
      const availableW = width - startX - width * 0.08;
      const stepX = availableW / (layerCount - 1);

      nodesPerLayer.forEach((count, lIdx) => {
        const x = startX + lIdx * stepX;
        const totalH = Math.min(height * 0.5, 340);
        const startY = height * 0.4 - totalH / 2;
        const stepY = totalH / (count - 1 || 1);

        for (let nIdx = 0; nIdx < count; nIdx++) {
          const y = startY + nIdx * stepY;
          nodes.push({
            x,
            y,
            targetX: x,
            targetY: y,
            layer: lIdx,
            radius: lIdx === 0 || lIdx === 3 ? 8 : 6,
            pulseOffset: Math.random() * Math.PI * 2,
          });
        }
      });

      // Build connections between consecutive layers
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].layer === nodes[i].layer + 1) {
            if (Math.random() < 0.6) {
              connections.push({
                from: i,
                to: j,
                weight: 0.3 + Math.random() * 0.7,
              });
            }
          }
        }
      }

      // Initialize ambient code particles on the right side
      codeParticles = Array.from({ length: 10 }, () => ({
        x: width * 0.4 + Math.random() * (width * 0.55),
        y: height + Math.random() * 80,
        speedY: 0.3 + Math.random() * 0.5,
        text: codeTokens[Math.floor(Math.random() * codeTokens.length)],
        opacity: 0.15 + Math.random() * 0.25,
      }));
    };

    initNeuralNodes();

    // Spawn pulses along connections
    const spawnPulse = () => {
      if (connections.length === 0) return;
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const colors = ["#0369A1", "#4F46E5", "#7C3AED"];
      pulses.push({
        fromNode: conn.from,
        toNode: conn.to,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    let pulseTimer = 0;
    let time = 0;

    // ── Render Loop ──
    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.015;
      pulseTimer++;

      if (pulseTimer % 22 === 0) {
        spawnPulse();
      }

      ctx.clearRect(0, 0, width, height);

      // ── Draw Laptop & Keyboard Graphic Base (Right Side Ambient Perspective) ──
      const laptopW = Math.min(width * 0.35, 320);
      const laptopH = laptopW * 0.42;
      const laptopX = width * 0.65 - laptopW / 2;
      const laptopY = height * 0.8;

      // Keyboard Base Chassis (Soft Ambient Geometry)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(laptopX + 20, laptopY);
      ctx.lineTo(laptopX + laptopW - 20, laptopY);
      ctx.lineTo(laptopX + laptopW + 20, laptopY + laptopH);
      ctx.lineTo(laptopX - 20, laptopY + laptopH);
      ctx.closePath();
      ctx.fillStyle = "rgba(248, 250, 252, 0.6)";
      ctx.strokeStyle = "rgba(79, 70, 229, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Subtle Key Grid Lines
      ctx.strokeStyle = "rgba(79, 70, 229, 0.07)";
      ctx.lineWidth = 1;
      for (let r = 1; r < 4; r++) {
        const ry = laptopY + (laptopH / 4) * r;
        const rRatio = r / 4;
        ctx.beginPath();
        ctx.moveTo(laptopX + 20 - 40 * rRatio, ry);
        ctx.lineTo(laptopX + laptopW - 20 + 40 * rRatio, ry);
        ctx.stroke();
      }

      // Illuminated Laptop Screen Frame
      const screenW = laptopW * 0.72;
      const screenH = screenW * 0.48;
      const screenX = width * 0.65 - screenW / 2;
      const screenY = laptopY - screenH - 4;

      ctx.beginPath();
      ctx.roundRect(screenX, screenY, screenW, screenH, 6);
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.strokeStyle = "rgba(3, 105, 161, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Screen Terminal Code Lines
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(56, 189, 248, 0.8)";
      ctx.fillText("> model.train()", screenX + 12, screenY + 24);
      ctx.fillStyle = "rgba(165, 180, 252, 0.8)";
      ctx.fillText("Loss: 0.0012 [OK]", screenX + 12, screenY + 40);

      ctx.restore();

      // ── Draw Ambient Code Streams ──
      ctx.save();
      ctx.font = "10px monospace";
      codeParticles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < height * 0.1) {
          p.y = height * 0.85 + Math.random() * 40;
          p.x = width * 0.4 + Math.random() * (width * 0.55);
        }
        ctx.fillStyle = `rgba(3, 105, 161, ${p.opacity * 0.5})`;
        ctx.fillText(p.text, p.x, p.y);
      });
      ctx.restore();

      // ── Draw Synaptic Connection Edges ──
      ctx.save();
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        if (!fromNode || !toNode) return;

        const dx = mouseRef.current.x - (fromNode.x + toNode.x) / 2;
        const dy = mouseRef.current.y - (fromNode.y + toNode.y) / 2;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        const isHovered = mouseDist < 120;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);

        const cpX = (fromNode.x + toNode.x) / 2;
        const cpY = (fromNode.y + toNode.y) / 2 + Math.sin(time + conn.from) * 12;
        ctx.quadraticCurveTo(cpX, cpY, toNode.x, toNode.y);

        if (isHovered) {
          ctx.strokeStyle = "rgba(79, 70, 229, 0.35)";
          ctx.lineWidth = 1.8;
        } else {
          ctx.strokeStyle = `rgba(79, 70, 229, ${0.08 * conn.weight})`;
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      });
      ctx.restore();

      // ── Draw Signal Pulses ──
      ctx.save();
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        const fromNode = nodes[p.fromNode];
        const toNode = nodes[p.toNode];

        if (!fromNode || !toNode || p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
        const py = fromNode.y + (toNode.y - fromNode.y) * p.progress + Math.sin(p.progress * Math.PI) * 8;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      ctx.restore();

      // ── Draw Neural Nodes ──
      ctx.save();
      nodes.forEach((n) => {
        n.y = n.targetY + Math.sin(time * 2 + n.pulseOffset) * 3;

        const dx = mouseRef.current.x - n.x;
        const dy = mouseRef.current.y - n.y;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        const isHovered = mouseDist < 70;

        if (mouseDist < 100) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(3, 105, 161, ${0.25 * (1 - mouseDist / 100)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Outer Ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? n.radius + 4 : n.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = isHovered
          ? "rgba(3, 105, 161, 0.2)"
          : n.layer === 0
          ? "rgba(3, 105, 161, 0.08)"
          : n.layer === 3
          ? "rgba(124, 58, 237, 0.1)"
          : "rgba(79, 70, 229, 0.08)";
        ctx.fill();

        // Node Circle Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? n.radius + 1 : n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.layer === 0 ? "#0369A1" : n.layer === 3 ? "#7C3AED" : "#4F46E5";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
      ctx.restore();
    };

    render();

    // ── Mouse Listeners ──
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isHover = true;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.isHover = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      aria-hidden="true"
    />
  );
}
