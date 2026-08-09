"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";

const NeuralCanvas = dynamic(() => import("./NeuralCanvas"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position inside Hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 1. Initial State (scrollYProgress = 0): 100% full screen 3D interactive keyboard animation ONLY
  // 2. As user begins scrolling down, canvas fades out rapidly to 0 opacity
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);

  // 3. Profile details reach 100% full opacity quickly and stay centered in viewport while scroll animation plays
  const contentOpacity = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.04, 0.22], [15, 0]);

  return (
    <div ref={containerRef} className="relative w-full min-h-[160vh] scroll-mt-32" id="hero">
      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-white">

        {/* ── 1. Full First Page 3D Interactive Keyboard & Neural Canvas ── */}
        <motion.div
          style={{ opacity: canvasOpacity, scale: canvasScale }}
          className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
        >
          <NeuralCanvas />
        </motion.div>

        {/* ── Ambient Glow Orbs ── */}
        <div
          className="orb w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #4F46E5 0%, transparent 70%)" }}
        />
        <div
          className="orb w-[500px] h-[500px] bottom-[-150px] right-[-150px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #0284C7 0%, transparent 70%)" }}
        />

        {/* ── Vignette Overlay ── */}
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

        {/* ── 2. Main Hero Profile Content (Vertically centered with pt-28 pb-16) ── */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 container mx-auto px-6 max-w-6xl w-full flex items-center justify-center pt-28 pb-16 my-auto"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 w-full my-auto">

            {/* Left: Text Content */}
            <div className="flex-1 text-center lg:text-left">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-semibold"
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
              </div>

              {/* Name */}
              <h1
                className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-3 leading-[1.08] tracking-tight text-slate-950"
                style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
              >
                <span>Umair</span>
                <br />
                <span className="text-indigo-600">Amjad Khan</span>
              </h1>

              {/* Title */}
              <p className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 flex flex-wrap items-center gap-2 justify-center lg:justify-start text-slate-800">
                <span>Founder &amp; CEO @ <span className="text-indigo-600 font-extrabold">icode Studios</span></span>
                <span className="hidden sm:inline text-slate-400">•</span>
                <span className="text-sky-700 font-extrabold">AI &amp; ML Engineer</span>
              </p>

              {/* Tagline */}
              <p className="text-sm sm:text-base lg:text-lg mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed text-slate-700 font-medium">
                Spearheading{" "}
                <span className="text-indigo-600 font-bold">
                  icode Studios
                </span>{" "}
                — Building Production AI Systems, LLM Pipelines, and Intelligent Applications that solve real-world problems.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start">
                <a
                  id="btn-download-cv"
                  href="/cv.pdf"
                  download="Umair_Amjad_Khan_CV.pdf"
                  className="btn-primary"
                >
                  <Download size={17} />
                  Download CV
                </a>

                <a
                  id="btn-github"
                  href="https://github.com/Uak69009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <SiGithub size={17} />
                  View GitHub
                </a>

                <a
                  id="btn-contact"
                  href="#contact"
                  className="btn-outline"
                  style={{ borderColor: "rgba(3,105,161,0.5)", color: "#0369A1" }}
                >
                  <Mail size={17} />
                  Contact Me
                </a>
              </div>

              {/* Stats row */}
              <div className="flex gap-8 sm:gap-10 mt-8 justify-center lg:justify-start">
                {[
                  { label: "Projects Built", value: "10+", color: "#4F46E5" },
                  { label: "AI Models Deployed", value: "5+", color: "#0369A1" },
                  { label: "GitHub Repos", value: "21", color: "#7C3AED" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div
                      className="text-2xl sm:text-3xl font-extrabold"
                      style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs mt-1 font-semibold text-slate-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Avatar — Clean Rounded Rectangle Portrait */}
            <div className="flex-shrink-0 float-anim">
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
                      width: "240px",
                      height: "300px",
                      background: "#FFFFFF",
                    }}
                  >
                    <Image
                      src="/profile-image.jpg"
                      alt="Umair Amjad Khan — AI and Machine Learning Engineer"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="240px"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}



