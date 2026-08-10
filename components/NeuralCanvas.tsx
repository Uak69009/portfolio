"use client";

import { useEffect, useRef } from "react";

interface KeyCap {
  row: number;
  col: number;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  elevation: number;
  targetElevation: number;
  color: string;
  isSpecial?: boolean;
}

interface NeuralNode {
  x: number;
  y: number;
  targetY: number;
  layer: number;
  radius: number;
  pulseOffset: number;
}

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  speedY: number;
  text: string;
  opacity: number;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let keycaps: KeyCap[] = [];
    let nodes: NeuralNode[] = [];
    let connections: Array<{ from: number; to: number; weight: number }> = [];
    let pulses: Pulse[] = [];
    let particles: Particle[] = [];

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initLayout();
    };
    window.addEventListener("resize", handleResize);

    const initLayout = () => {
      keycaps = [];
      nodes = [];
      connections = [];
      pulses = [];

      // ── 1. Create Centered 3D Mechanical Keyboard Layout ──
      const rowLayouts = [
        ["ESC", "AI", "PyTorch", "RAG", "LoRA", "YOLO", "ResNeXt", "MLOps", "LLM", "FASTAPI", "DOCKER", "DEL"],
        ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "BACK"],
        ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
        ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ENTER"],
        ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "SHIFT"],
        ["CTRL", "OPT", "CMD", "_____ SPACEBAR _____", "CMD", "OPT", "CTRL"],
      ];

      const keyW = Math.min(Math.max(width * 0.042, 28), 44);
      const keyH = keyW * 0.9;
      const gap = Math.max(keyW * 0.16, 5);

      const kbdCenterY = height * 0.52;

      rowLayouts.forEach((rowKeys, rIdx) => {
        let currentX = 0;
        // Total width of row
        const rowWidth = rowKeys.reduce((acc, k) => {
          let multiplier = 1;
          if (k === "_____ SPACEBAR _____") multiplier = 5.2;
          else if (["BACK", "ENTER", "CAPS", "SHIFT", "TAB"].includes(k)) multiplier = 1.6;
          return acc + keyW * multiplier + gap;
        }, 0);

        currentX = width / 2 - rowWidth / 2;
        const rowY = kbdCenterY + (rIdx - 2.5) * (keyH + gap);

        rowKeys.forEach((kLabel, cIdx) => {
          let multiplier = 1;
          if (kLabel === "_____ SPACEBAR _____") multiplier = 5.2;
          else if (["BACK", "ENTER", "CAPS", "SHIFT", "TAB"].includes(kLabel)) multiplier = 1.6;

          const w = keyW * multiplier;
          const isSpecial = ["AI", "PyTorch", "RAG", "LoRA", "YOLO", "ResNeXt", "MLOps", "LLM", "FASTAPI", "DOCKER"].includes(kLabel);

          keycaps.push({
            row: rIdx,
            col: cIdx,
            label: kLabel === "_____ SPACEBAR _____" ? "icode Studios — <you imagine, WE code>" : kLabel,
            x: currentX,
            y: rowY,
            w,
            h: keyH,
            elevation: 0,
            targetElevation: 0,
            color: isSpecial ? "#1E40AF" : "#1D4ED8",
            isSpecial,
          });

          currentX += w + gap;
        });
      });

      // ── 2. Create Surrounding Neural Network Architecture Nodes ──
      const nodesPerLayer = [5, 6, 6, 5];
      const marginX = Math.max(width * 0.06, 20);

      nodesPerLayer.forEach((count, lIdx) => {
        const x = lIdx < 2 ? marginX + lIdx * (width * 0.14) : width - marginX - (3 - lIdx) * (width * 0.14);
        const totalH = Math.min(height * 0.65, 420);
        const startY = height / 2 - totalH / 2;
        const stepY = totalH / (count - 1 || 1);

        for (let nIdx = 0; nIdx < count; nIdx++) {
          nodes.push({
            x,
            y: startY + nIdx * stepY,
            targetY: startY + nIdx * stepY,
            layer: lIdx,
            radius: lIdx === 0 || lIdx === 3 ? 9 : 7,
            pulseOffset: Math.random() * Math.PI * 2,
          });
        }
      });

      // Build layer connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].layer === nodes[i].layer + 1) {
            if (Math.random() < 0.65) {
              connections.push({ from: i, to: j, weight: 0.3 + Math.random() * 0.7 });
            }
          }
        }
      }

      // Code particles
      const tokens = ["torch.tensor()", "attn_weights", "loss: 0.001", "RAG_pipe", "LoRA_fit", "FastAPI", "Docker", "q_k_v"];
      particles = Array.from({ length: 16 }, () => ({
        x: Math.random() * width,
        y: height + Math.random() * 100,
        speedY: 0.4 + Math.random() * 0.6,
        text: tokens[Math.floor(Math.random() * tokens.length)],
        opacity: 0.15 + Math.random() * 0.3,
      }));
    };

    initLayout();

    const spawnPulse = () => {
      if (connections.length === 0) return;
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const colors = ["#1D4ED8", "#1E40AF", "#16233B"];
      pulses.push({
        fromNode: conn.from,
        toNode: conn.to,
        progress: 0,
        speed: 0.01 + Math.random() * 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    let time = 0;
    let pulseTimer = 0;

    // ── Render Animation Loop ──
    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.015;
      pulseTimer++;

      const isDark = document.documentElement.classList.contains("dark");

      if (pulseTimer % 16 === 0) {
        if (connections.length > 0) {
          const conn = connections[Math.floor(Math.random() * connections.length)];
          const colors = isDark
            ? ["#FACC15", "#EAB308", "#FEF08A"]
            : ["#1D4ED8", "#1E40AF", "#16233B"];
          pulses.push({
            fromNode: conn.from,
            toNode: conn.to,
            progress: 0,
            speed: 0.01 + Math.random() * 0.015,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // ── Draw Synaptic Connection Edges ──
      ctx.save();
      connections.forEach((conn) => {
        const fn = nodes[conn.from];
        const tn = nodes[conn.to];
        if (!fn || !tn) return;

        ctx.beginPath();
        ctx.moveTo(fn.x, fn.y);
        const cpX = (fn.x + tn.x) / 2;
        const cpY = (fn.y + tn.y) / 2 + Math.sin(time + conn.from) * 12;
        ctx.quadraticCurveTo(cpX, cpY, tn.x, tn.y);
        ctx.strokeStyle = isDark
          ? `rgba(234, 179, 8, ${0.18 * conn.weight})`
          : `rgba(29, 78, 216, ${0.12 * conn.weight})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });
      ctx.restore();

      // ── Draw Signal Pulses ──
      ctx.save();
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        const fn = nodes[p.fromNode];
        const tn = nodes[p.toNode];

        if (!fn || !tn || p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const px = fn.x + (tn.x - fn.x) * p.progress;
        const py = fn.y + (tn.y - fn.y) * p.progress + Math.sin(p.progress * Math.PI) * 10;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.restore();

      // ── Draw Neural Nodes ──
      ctx.save();
      nodes.forEach((n) => {
        n.y = n.targetY + Math.sin(time * 2 + n.pulseOffset) * 3;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(234, 179, 8, 0.15)" : "rgba(29, 78, 216, 0.12)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = n.layer === 0 ? "#FACC15" : n.layer === 3 ? "#EAB308" : "#CA8A04";
        } else {
          ctx.fillStyle = n.layer === 0 ? "#1E40AF" : n.layer === 3 ? "#16233B" : "#1D4ED8";
        }
        ctx.fill();
        ctx.strokeStyle = isDark ? "#171717" : "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
      ctx.restore();

      // ── Draw Floating Code Particles ──
      ctx.save();
      ctx.font = "10px monospace";
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < height * 0.05) {
          p.y = height * 0.95 + Math.random() * 40;
          p.x = Math.random() * width;
        }
        ctx.fillStyle = isDark
          ? `rgba(250, 204, 21, ${p.opacity})`
          : `rgba(29, 78, 216, ${p.opacity})`;
        ctx.fillText(p.text, p.x, p.y);
      });
      ctx.restore();

      // ── Draw Centered 3D Interactive Mechanical Keyboard ──
      ctx.save();

      // Keyboard Ambient Shadow
      if (keycaps.length > 0) {
        const minX = Math.min(...keycaps.map((k) => k.x));
        const maxX = Math.max(...keycaps.map((k) => k.x + k.w));
        const minY = Math.min(...keycaps.map((k) => k.y));
        const maxY = Math.max(...keycaps.map((k) => k.y + k.h));
        const kbdW = maxX - minX;
        const kbdH = maxY - minY;

        ctx.beginPath();
        ctx.roundRect(minX - 16, minY - 16, kbdW + 32, kbdH + 32, 20);
        ctx.fillStyle = isDark ? "rgba(18, 18, 18, 0.94)" : "rgba(248, 250, 252, 0.92)";
        ctx.strokeStyle = isDark ? "rgba(234, 179, 8, 0.35)" : "rgba(29, 78, 216, 0.25)";
        ctx.lineWidth = 2;
        ctx.shadowColor = isDark ? "rgba(234, 179, 8, 0.2)" : "rgba(29, 78, 216, 0.15)";
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.stroke();
      }

      // Render 3D Keycaps
      keycaps.forEach((key) => {
        const keyCenterX = key.x + key.w / 2;
        const keyCenterY = key.y + key.h / 2;
        const dist = Math.sqrt((mx - keyCenterX) ** 2 + (my - keyCenterY) ** 2);

        const hoverRadius = 110;
        if (dist < hoverRadius) {
          const force = 1 - dist / hoverRadius;
          key.targetElevation = -16 * (force * force);
        } else {
          key.targetElevation = 0;
        }

        key.elevation += (key.targetElevation - key.elevation) * 0.2;

        const renderY = key.y + key.elevation;
        const isPopped = key.elevation < -2;

        const depth = 5 - key.elevation * 0.3;
        ctx.fillStyle = isDark
          ? isPopped ? "rgba(234, 179, 8, 0.4)" : "rgba(38, 38, 38, 0.95)"
          : isPopped ? "rgba(29, 78, 216, 0.3)" : "rgba(226, 232, 240, 0.95)";
        ctx.beginPath();
        ctx.roundRect(key.x, renderY + depth, key.w, key.h, 6);
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(key.x, renderY, key.w, key.h, 6);

        if (key.isSpecial) {
          if (isDark) {
            ctx.fillStyle = isPopped ? "#EAB308" : "rgba(234, 179, 8, 0.18)";
            ctx.strokeStyle = isPopped ? "#FACC15" : "rgba(234, 179, 8, 0.5)";
          } else {
            ctx.fillStyle = isPopped ? "#2563EB" : "rgba(30, 64, 175, 0.12)";
            ctx.strokeStyle = isPopped ? "#1E40AF" : "rgba(30, 64, 175, 0.4)";
          }
        } else {
          if (isDark) {
            ctx.fillStyle = isPopped ? "#CA8A04" : "#171717";
            ctx.strokeStyle = isPopped ? "#FACC15" : "rgba(255, 255, 255, 0.1)";
          } else {
            ctx.fillStyle = isPopped ? "#1D4ED8" : "#FFFFFF";
            ctx.strokeStyle = isPopped ? "#1E40AF" : "rgba(226, 232, 240, 0.95)";
          }
        }

        ctx.lineWidth = isPopped ? 2 : 1;
        ctx.fill();
        ctx.stroke();

        if (isPopped) {
          ctx.shadowColor = isDark
            ? (key.isSpecial ? "#FACC15" : "#EAB308")
            : (key.isSpecial ? "#2563EB" : "#1D4ED8");
          ctx.shadowBlur = 14;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.font = key.isSpecial
          ? "700 11px var(--font-space-grotesk), sans-serif"
          : key.label.length > 6
          ? "600 10px var(--font-sans), sans-serif"
          : "600 11px var(--font-sans), sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (isPopped) {
          ctx.fillStyle = isDark ? "#0B1220" : "#FFFFFF";
        } else if (key.isSpecial) {
          ctx.fillStyle = isDark ? "#FACC15" : "#0369A1";
        } else {
          ctx.fillStyle = isDark ? "#E2E8F0" : "#334155";
        }

        ctx.fillText(key.label, key.x + key.w / 2, renderY + key.h / 2);
      });

      ctx.restore();
    };

    render();

    // ── Mouse Tracking ──
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
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
