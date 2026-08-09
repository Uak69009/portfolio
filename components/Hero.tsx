"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, Mail, ArrowDown, Terminal, Cpu, Brain, Sparkles, Code2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";

const NeuralCanvas = dynamic(() => import("./NeuralCanvas"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* ── 3D Neural Canvas Background ── */}
      <NeuralCanvas />

      {/* ── Ambient Orbs ── */}
      <div
        className="orb w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-15"
        style={{ background: "radial-gradient(circle, #4F46E5 0%, transparent 70%)" }}
      />
      <div
        className="orb w-[500px] h-[500px] bottom-[-150px] right-[-150px] opacity-15"
        style={{ background: "radial-gradient(circle, #0284C7 0%, transparent 70%)" }}
      />
      <div
        className="orb w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
      />

      {/* ── Vignette overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(255,255,255,0.85) 100%)",
        }}
      />

      {/* ── Grid Pattern ── */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(79,70,229,0.08)",
                border: "1px solid rgba(79,70,229,0.2)",
                color: "#4338CA",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#0369A1", boxShadow: "0 0 8px #0369A1" }}
              />
              Available for Opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold mb-4 leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
            >
              <span className="text-slate-900">Umair</span>
              <br />
              <span className="gradient-text">Amjad Khan</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xl lg:text-2xl font-semibold mb-4 flex flex-wrap items-center gap-2"
              style={{ color: "#334155" }}
            >
              <span>Founder &amp; CEO @ <span className="text-indigo-600 font-bold">icode Studios</span></span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="gradient-text-cyan-indigo font-bold">AI &amp; ML Engineer</span>
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base lg:text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{ color: "#475569" }}
            >
              Spearheading{" "}
              <span className="gradient-text-cyan-indigo font-bold">
                icode Studios
              </span>{" "}
              — Building Production AI Systems, LLM Pipelines, and Intelligent Applications that solve real-world problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                id="btn-download-cv"
                href="/cv.pdf"
                download="Umair_Amjad_Khan_CV.pdf"
                className="btn-primary"
              >
                <Download size={18} />
                Download CV
              </a>

              <a
                id="btn-github"
                href="https://github.com/Uak69009"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <SiGithub size={18} />
                View GitHub
              </a>

              <a
                id="btn-contact"
                href="#contact"
                className="btn-outline"
                style={{ borderColor: "rgba(3,105,161,0.4)", color: "#0369A1" }}
              >
                <Mail size={18} />
                Contact Me
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex gap-10 mt-12 justify-center lg:justify-start"
            >
              {[
                { label: "Projects Built", value: "10+" },
                { label: "AI Models Deployed", value: "5+" },
                { label: "GitHub Repos", value: "21" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div
                    className="text-3xl font-bold gradient-text-cyan-indigo"
                    style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#64748B" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Avatar — Rounded Rectangle Portrait + Neural & Code Badges */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, type: "spring", stiffness: 70 }}
            className="flex-shrink-0 float-anim relative"
          >
            <div className="relative">

              {/* Floating Top-Left Badge: Terminal IDE Input */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-6 -left-10 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 text-slate-800"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <Terminal size={13} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Keyboard IDE</span>
                  <span className="text-indigo-600 font-bold">&gt; model.fit(RAG)</span>
                </div>
              </motion.div>

              {/* Floating Bottom-Right Badge: Neural Engine */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-6 -right-8 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-sans font-medium bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 text-slate-800"
              >
                <div className="w-6 h-6 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                  <Brain size={14} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Neural Synapses</span>
                  <span className="text-sky-700 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Multi-Head Attn Active
                  </span>
                </div>
              </motion.div>

              {/* Animated gradient border wrapper */}
              <div
                className="relative p-[3px] rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, #0284C7, #4F46E5, #7C3AED, #0284C7)",
                  backgroundSize: "300% 300%",
                  animation: "borderRotate 4s ease infinite",
                  boxShadow: "0 20px 50px -10px rgba(79,70,229,0.3), 0 10px 30px -5px rgba(2,132,199,0.2)",
                }}
              >
                {/* Inner frame */}
                <div
                  className="relative overflow-hidden rounded-[22px]"
                  style={{
                    width: "260px",
                    height: "340px",
                    background: "#FFFFFF",
                  }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Umair Amjad Khan — AI & Machine Learning Engineer"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="260px"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "#4B5563" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} color="#4B5563" />
        </motion.div>
      </motion.div>
    </section>
  );
}
