"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";

const NeuralCanvas = dynamic(() => import("./NeuralCanvas"), { ssr: false });

const stats = [
  { label: "Projects Built", value: "10+", color: "#4F46E5" },
  { label: "AI Models Deployed", value: "5+", color: "#0369A1" },
  { label: "GitHub Repos", value: "21", color: "#7C3AED" },
];

function ProfileAvatar({ size = 240 }: { size?: number }) {
  const height = Math.round(size * 1.25);
  return (
    <div className="flex-shrink-0 float-anim">
      <div className="relative">
        <div
          className="relative p-[3px] rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #0284C7, #4F46E5, #7C3AED, #0284C7)",
            backgroundSize: "300% 300%",
            animation: "borderRotate 4s ease infinite",
            boxShadow:
              "0 20px 50px -10px rgba(79,70,229,0.25), 0 10px 30px -5px rgba(2,132,199,0.15)",
          }}
        >
          <div
            className="relative overflow-hidden rounded-[22px]"
            style={{ width: `${size}px`, height: `${height}px`, background: "#FFFFFF" }}
          >
            <Image
              src="/profile-image.jpg"
              alt="Umair Amjad Khan — AI and Machine Learning Engineer"
              fill
              className="object-cover object-top"
              priority
              sizes={`${size}px`}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileContent({ align = "center" }: { align?: "center" | "left" }) {
  const textAlign = align === "left" ? "text-center lg:text-left" : "text-center";
  const justify = align === "left" ? "justify-center lg:justify-start" : "justify-center";

  return (
    <div className={`flex-1 ${textAlign}`}>
      {/* Badge */}
      <div
        className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-semibold`}
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
      <p
        className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 flex flex-wrap items-center gap-2 ${justify} text-slate-800`}
      >
        <span>
          Founder &amp; CEO @{" "}
          <span className="text-indigo-600 font-extrabold">icode Studios</span>
        </span>
        <span className="hidden sm:inline text-slate-400">•</span>
        <span className="text-sky-700 font-extrabold">AI &amp; ML Engineer</span>
      </p>

      {/* Tagline */}
      <p
        className={`text-sm sm:text-base lg:text-lg mb-6 max-w-xl mx-auto ${
          align === "left" ? "lg:mx-0" : ""
        } leading-relaxed text-slate-700 font-medium`}
      >
        Spearheading <span className="text-indigo-600 font-bold">icode Studios</span> —
        Building Production AI Systems, LLM Pipelines, and Intelligent Applications that
        solve real-world problems.
      </p>

      {/* CTA Buttons */}
      <div className={`flex flex-wrap gap-3.5 ${justify}`}>
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
      <div className={`flex gap-8 sm:gap-10 mt-8 ${justify}`}>
        {stats.map((stat) => (
          <div key={stat.label} className={align === "left" ? "text-center lg:text-left" : "text-center"}>
            <div
              className="text-2xl sm:text-3xl font-extrabold"
              style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-xs mt-1 font-semibold text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WelcomeNote() {
  return (
    <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center mx-auto">
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 opacity-80" />

        <h2
          className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
          style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
        >
          Welcome to my <span className="gradient-text">digital workspace.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-700 font-medium mb-4 leading-relaxed max-w-3xl mx-auto">
          I&apos;m <span className="font-bold text-indigo-600">Umair Amjad Khan</span>—a
          Machine Learning Engineer and AI Specialist dedicated to building
          production-grade AI systems, LLM pipelines, and intelligent software
          applications. Whether you&apos;re exploring my latest open-source research,
          reviewing deployment architectures, or looking to collaborate on custom AI
          solutions, I&apos;m glad you&apos;re here.
        </p>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Explore my featured projects below, or feel free to reach out directly to
          start a conversation.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wide shadow-md bg-indigo-600 text-white shadow-indigo-600/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Scroll down to explore
        </div>
      </div>
    </div>
  );
}

function AmbientBackground() {
  return (
    <>
      <div
        className="orb w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #4F46E5 0%, transparent 70%)" }}
      />
      <div
        className="orb w-[500px] h-[500px] bottom-[-150px] right-[-150px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0284C7 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Desktop-only pinned scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const canvasOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.04, 0.22], [15, 0]);

  return (
    <div id="hero" className="relative w-full scroll-mt-24">
      {/* ══════════════════════════════════════════════
          MOBILE / TABLET (< lg): simple stacked layout.
          No sticky pin, no overflow-hidden — nothing
          ever gets clipped, everything scrolls naturally.
          ══════════════════════════════════════════════ */}
      <div className="lg:hidden relative w-full bg-white overflow-hidden">
        <AmbientBackground />

        <div className="relative z-10 flex flex-col items-center pt-24 pb-14 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full mb-8"
          >
            <WelcomeNote />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative w-full h-[360px] sm:h-[420px] mb-10 rounded-3xl overflow-hidden"
          >
            <NeuralCanvas />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="flex flex-col items-center gap-10 w-full"
          >
            <ProfileAvatar size={200} />
            <ProfileContent align="center" />
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP (lg+): original pinned scroll-fade
          from full-screen canvas into profile content.
          ══════════════════════════════════════════════ */}
      <div ref={containerRef} className="hidden lg:block relative w-full min-h-[160vh]">
        <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-white">

          <motion.div
            style={{ opacity: canvasOpacity, scale: canvasScale }}
            className="absolute inset-0 w-full h-full z-0 flex flex-col items-center pt-28 pb-10 pointer-events-none"
          >
            <div className="w-full mb-8 pointer-events-none shrink-0">
              <WelcomeNote />
            </div>
            <div className="relative w-full flex-1 z-0 pointer-events-auto min-h-[300px]">
              <NeuralCanvas />
            </div>
          </motion.div>

          <AmbientBackground />

          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(255,255,255,0.85) 100%)",
            }}
          />

          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="relative z-10 container mx-auto px-6 max-w-6xl w-full flex items-center justify-center"
          >
            <div className="flex flex-row items-center justify-between gap-14 w-full">
              <ProfileContent align="left" />
              <ProfileAvatar size={240} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
