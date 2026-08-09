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
  label: string;
  subLabel?: string;
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
      "model = ResNeXt()",
      "pipeline = RAG()",
      "LoRA.fit()",
      "FastAPI.serve()",
      "W · X + b",
      "q_k_v_attn",
      "0.998",
      "yolo.detect()",
      "loss: 0.0012",
      "Docker.run()",
      "agent.act()",
    ];

    const initNeuralNodes = () => {
      nodes = [];
      connections = [];
      pulses = [];

      const layerCount = 4;
      const layerNames = [
        ["Input Code", "Audio Stream", "Vision Frames", "Text Prompt"],
        ["Multi-Head Attn", "ResNeXt Conv Block", "LoRA Adapter", "Dense Synapse"],
        ["Latent Space", "Transformer Weights", "Tensor Core", "Embeddings"],
        ["Zari.AI", "Deepfake Shield", "RAG Pipeline", "Agentic Output"],
      ];

      const marginX = width * 0.15;
      const startX = width < 768 ? width * 0.1 : marginX;
      const availableW = width - startX * 2;
      const stepX = availableW / (layerCount - 1);

      layerNames.forEach((layerLabels, lIdx) => {
        const x = startX + lIdx * stepX;
        const count = layerLabels.length;
        const totalH = Math.min(height * 0.55, 360);
        const startY = height * 0.42 - totalH / 2;
        const stepY = totalH / (count - 1 || 1);

        layerLabels.forEach((label, nIdx) => {
          const y = startY + nIdx * stepY;
          nodes.push({
            x,
            y,
            targetX: x,
            targetY: y,
            layer: lIdx,
            label,
            radius: lIdx === 0 || lIdx === 3 ? 12 : 9,
            pulseOffset: Math.random() * Math.PI * 2,
          });
        });
      });

      // Build connections between consecutive layers
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].layer === nodes[i].layer + 1) {
            // Connect 60% of layer pairs
            if (Math.random() < 0.65) {
              connections.push({
                from: i,
                to: j,
                weight: 0.3 + Math.random() * 0.7,
              });
            }
          }
        }
      }

      // Initialize floating code particles
      codeParticles = Array.from({ length: 14 }, () => ({
        x: Math.random() * width,
        y: height + Math.random() * 100,
        speedY: 0.4 + Math.random() * 0.6,
        text: codeTokens[Math.floor(Math.random() * codeTokens.length)],
        opacity: 0.2 + Math.random() * 0.4,
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

      if (pulseTimer % 18 === 0) {
        spawnPulse();
      }

      ctx.clearRect(0, 0, width, height);

      // ── Draw Laptop & Keyboard Graphic Base ──
      const laptopW = Math.min(width * 0.48, 420);
      const laptopH = laptopW * 0.42;
      const laptopX = width / 2 - laptopW / 2;
      const laptopY = height * 0.78;

      // Laptop Shadow
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(width / 2, laptopY + laptopH * 0.55, laptopW * 0.55, 20, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(79, 70, 229, 0.06)";
      ctx.fill();
      ctx.restore();

      // Keyboard Base Chassis (Isometric Polygon)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(laptopX + 30, laptopY);
      ctx.lineTo(laptopX + laptopW - 30, laptopY);
      ctx.lineTo(laptopX + laptopW + 30, laptopY + laptopH);
      ctx.lineTo(laptopX - 30, laptopY + laptopH);
      ctx.closePath();
      ctx.fillStyle = "rgba(248, 250, 252, 0.95)";
      ctx.strokeStyle = "rgba(79, 70, 229, 0.25)";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Keyboard Key Grid Lines
      ctx.strokeStyle = "rgba(79, 70, 229, 0.12)";
      ctx.lineWidth = 1;
      const rows = 4;
      const cols = 10;
      for (let r = 1; r < rows; r++) {
        const ry = laptopY + (laptopH / rows) * r;
        const rRatio = r / rows;
        const leftX = laptopX + 30 - 60 * rRatio;
        const rightX = laptopX + laptopW - 30 + 60 * rRatio;
        ctx.beginPath();
        ctx.moveTo(leftX, ry);
        ctx.lineTo(rightX, ry);
        ctx.stroke();
      }
      for (let c = 1; c < cols; c++) {
        const ratio = c / cols;
        const topX = laptopX + 30 + (laptopW - 60) * ratio;
        const botX = laptopX - 30 + (laptopW + 60) * ratio;
        ctx.beginPath();
        ctx.moveTo(topX, laptopY);
        ctx.lineTo(botX, laptopY + laptopH);
        ctx.stroke();
      }

      // Illuminated Laptop Screen Frame
      const screenW = laptopW * 0.72;
      const screenH = screenW * 0.48;
      const screenX = width / 2 - screenW / 2;
      const screenY = laptopY - screenH - 4;

      ctx.beginPath();
      ctx.roundRect(screenX, screenY, screenW, screenH, 8);
      ctx.fillStyle = "rgba(15, 23, 42, 0.94)";
      ctx.strokeStyle = "rgba(3, 105, 161, 0.4)";
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Terminal Header Dots
      ctx.fillStyle = "#EF4444";
      ctx.beginPath();
      ctx.arc(screenX + 14, screenY + 12, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.arc(screenX + 24, screenY + 12, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.arc(screenX + 34, screenY + 12, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Terminal Code Lines
      ctx.font = "11px var(--font-space-grotesk), monospace";
      ctx.fillStyle = "#38BDF8";
      ctx.fillText("> icode-studios --model gpt-4o-pipeline", screenX + 14, screenY + 30);
      ctx.fillStyle = "#A5B4FC";
      ctx.fillText("[Layer 1] Input Embeddings -> Connected", screenX + 14, screenY + 45);
      ctx.fillStyle = "#34D399";
      ctx.fillText("[Status] Neural Engine Active (Loss: 0.0012)", screenX + 14, screenY + 60);

      ctx.restore();

      // ── Draw Code Stream Particles Rising From Keyboard ──
      ctx.save();
      ctx.font = "11px monospace";
      codeParticles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < height * 0.1) {
          p.y = height * 0.85 + Math.random() * 40;
          p.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(3, 105, 161, ${p.opacity * 0.7})`;
        ctx.fillText(p.text, p.x, p.y);
      });
      ctx.restore();

      // ── Draw Synaptic Connection Edges ──
      ctx.save();
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        if (!fromNode || !toNode) return;

        // Hover distance influence
        const dx = (mouseRef.current.x - (fromNode.x + toNode.x) / 2);
        const dy = (mouseRef.current.y - (fromNode.y + toNode.y) / 2);
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        const isHovered = mouseDist < 140;

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);

        // Curved Bezier Synapse
        const cpX = (fromNode.x + toNode.x) / 2;
        const cpY = (fromNode.y + toNode.y) / 2 + Math.sin(time + conn.from) * 15;
        ctx.quadraticCurveTo(cpX, cpY, toNode.x, toNode.y);

        if (isHovered) {
          ctx.strokeStyle = "rgba(79, 70, 229, 0.45)";
          ctx.lineWidth = 2.2;
        } else {
          ctx.strokeStyle = `rgba(79, 70, 229, ${0.12 * conn.weight})`;
          ctx.lineWidth = 1.2;
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
        const py = fromNode.y + (toNode.y - fromNode.y) * p.progress + Math.sin(p.progress * Math.PI) * 10;

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
      }
      ctx.restore();

      // ── Draw Neural Nodes ──
      ctx.save();
      nodes.forEach((n, idx) => {
        // Float oscillation
        n.y = n.targetY + Math.sin(time * 2 + n.pulseOffset) * 4;

        // Mouse distance
        const dx = mouseRef.current.x - n.x;
        const dy = mouseRef.current.y - n.y;
        const mouseDist = Math.sqrt(dx * dx + dy * dy);
        const isHovered = mouseDist < 80;

        // Connect node to mouse cursor if hovered
        if (mouseDist < 120) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(3, 105, 161, ${0.35 * (1 - mouseDist / 120)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Outer Glow Ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? n.radius + 6 : n.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = isHovered
          ? "rgba(3, 105, 161, 0.25)"
          : n.layer === 0
          ? "rgba(3, 105, 161, 0.12)"
          : n.layer === 3
          ? "rgba(124, 58, 237, 0.15)"
          : "rgba(79, 70, 229, 0.12)";
        ctx.fill();

        // Node Circle Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? n.radius + 2 : n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.layer === 0 ? "#0369A1" : n.layer === 3 ? "#7C3AED" : "#4F46E5";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node Label
        ctx.font = "600 12px var(--font-sans), sans-serif";
        ctx.fillStyle = isHovered ? "#0F172A" : "#334155";
        ctx.textAlign = n.layer === 0 ? "right" : n.layer === 3 ? "left" : "center";
        const labelX = n.layer === 0 ? n.x - 18 : n.layer === 3 ? n.x + 18 : n.x;
        const labelY = n.layer === 1 || n.layer === 2 ? n.y - 16 : n.y + 4;
        ctx.fillText(n.label, labelX, labelY);
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
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  );
}
