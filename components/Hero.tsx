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
              className="text-5xl lg:text-7xl font-extrabold mb-4 leading-[1.1] tracking-tight text-slate-950"
              style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
            >
              <span>Umair</span>
              <br />
              <span className="text-indigo-600">Amjad Khan</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xl lg:text-2xl font-bold mb-4 flex flex-wrap items-center gap-2 text-slate-800"
            >
              <span>Founder &amp; CEO @ <span className="text-indigo-600 font-extrabold">icode Studios</span></span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="text-sky-700 font-extrabold">AI &amp; ML Engineer</span>
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base lg:text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed text-slate-700 font-medium"
            >
              Spearheading{" "}
              <span className="text-indigo-600 font-bold">
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
                style={{ borderColor: "rgba(3,105,161,0.5)", color: "#0369A1" }}
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
                { label: "Projects Built", value: "10+", color: "#4F46E5" },
                { label: "AI Models Deployed", value: "5+", color: "#0369A1" },
                { label: "GitHub Repos", value: "21", color: "#7C3AED" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div
                    className="text-3xl font-extrabold"
                    style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1 font-semibold text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Avatar — Clean Rounded Rectangle Portrait (No overlays) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, type: "spring", stiffness: 70 }}
            className="flex-shrink-0 float-anim"
          >
            <div className="relative">
              {/* Animated gradient border wrapper */}
              <div
                className="relative p-[3px] rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, #0284C7, #4F46E5, #7C3AED, #0284C7)",
                  backgroundSize: "300% 300%",
                  animation: "borderRotate 4s ease infinite",
                  boxShadow: "0 20px 50px -10px rgba(79,70,229,0.25), 0 10px 30px -5px rgba(2,132,199,0.15)",
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
