"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Image from "next/image";
import { useAccent } from "@/hooks/useTheme";

const NeuralCanvas = dynamic(() => import("./NeuralCanvas"), { ssr: false });

const statsData = [
  { label: "Projects Built", value: "10+" },
  { label: "AI Models Deployed", value: "5+" },
  { label: "GitHub Repos", value: "21" },
];

function ProfileAvatar({ size = 240 }: { size?: number }) {
  const height = Math.round(size * 1.25);
  const { accent, accentDark, accentBg } = useAccent();
  return (
    <div className="flex-shrink-0 float-anim">
      <div className="relative">
        <div
          className="relative p-[3px] rounded-3xl"
          style={{
            backgroundImage: `linear-gradient(135deg, ${accentDark}, ${accent})`,
            backgroundSize: "300% 300%",
            animation: "borderRotate 4s ease infinite",
            boxShadow: `0 20px 50px -10px ${accentBg(0.30)}, 0 10px 30px -5px ${accentBg(0.18)}`,
          }}
        >
          <div
            className="relative overflow-hidden rounded-[22px]"
            style={{ width: `${size}px`, height: `${height}px`, background: "var(--bg-main)" }}
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
  const { accent, accentAlt, accentBg, accentBorder } = useAccent();

  return (
    <div className={`flex-1 ${textAlign}`}>
      {/* Available badge */}
      <div
        className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-semibold`}
        style={{
          background: accentBg(0.08),
          border: `1px solid ${accentBorder(0.22)}`,
          color: accent,
        }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "#10B981", boxShadow: "0 0 8px #10B981" }}
        />
        Available for Opportunities
      </div>

      {/* Name */}
      <h1
        className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-3 leading-[1.08] tracking-tight"
        style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: "var(--text-heading)" }}
      >
        <span>Umair</span>
        <br />
        <span style={{ color: accent }}>Amjad Khan</span>
      </h1>

      {/* Title */}
      <p
        className={`text-lg sm:text-xl lg:text-2xl font-bold mb-3 flex flex-wrap items-center gap-2 ${justify}`}
        style={{ color: "var(--text-heading)" }}
      >
        <span>
          Founder &amp; CEO @{" "}
          <span style={{ color: accent, fontWeight: 800 }}>icode Studios</span>
        </span>
        <span className="hidden sm:inline text-slate-400">•</span>
        <span style={{ color: accentAlt, fontWeight: 800 }}>AI &amp; ML Engineer</span>
      </p>

      {/* Tagline */}
      <p
        className={`text-sm sm:text-base lg:text-lg mb-6 max-w-xl mx-auto ${
          align === "left" ? "lg:mx-0" : ""
        } leading-relaxed font-medium`}
        style={{ color: "var(--text-body)" }}
      >
        Spearheading{" "}
        <span style={{ color: accent, fontWeight: 700 }}>icode Studios</span> —
        Building Production AI Systems, LLM Pipelines, and Intelligent Applications that
        solve real-world problems.
      </p>

      {/* CTA Buttons */}
      <div className={`flex flex-wrap gap-3.5 ${justify}`}>
        <a id="btn-download-cv" href="/cv.pdf" download="Umair_Amjad_Khan_CV.pdf" className="btn-primary">
          <Download size={17} />
          Download CV
        </a>
        <a id="btn-github" href="https://github.com/Uak69009" target="_blank" rel="noopener noreferrer" className="btn-outline">
          <SiGithub size={17} />
          View GitHub
        </a>
        <a id="btn-contact" href="#contact" className="btn-outline">
          <Mail size={17} />
          Contact Me
        </a>
      </div>

      {/* Stats row */}
      <div className={`flex gap-8 sm:gap-10 mt-8 ${justify}`}>
        {statsData.map((stat) => (
          <div key={stat.label} className={align === "left" ? "text-center lg:text-left" : "text-center"}>
            <div
              className="text-2xl sm:text-3xl font-extrabold"
              style={{ color: accent, fontFamily: "var(--font-space-grotesk, sans-serif)" }}
            >
              {stat.value}
            </div>
            <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WelcomeNote() {
  const { accent, accentDark, accentBg, accentBorder } = useAccent();
  return (
    <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center mx-auto">
      <div
        className="welcome-card backdrop-blur-xl rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden transition-colors duration-300"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--card-border)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-1 opacity-80"
          style={{ background: `linear-gradient(90deg, ${accentDark}, ${accent})` }}
        />

        <h2
          className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: "var(--text-heading)" }}
        >
          Welcome to my <span style={{ color: accent }}>digital workspace.</span>
        </h2>
        <p className="text-sm sm:text-base font-medium mb-4 leading-relaxed max-w-3xl mx-auto" style={{ color: "var(--text-body)" }}>
          I&apos;m <span className="font-bold" style={{ color: accent }}>Umair Amjad Khan</span>—a
          Machine Learning Engineer and AI Specialist dedicated to building
          production-grade AI systems, LLM pipelines, and intelligent software
          applications. Whether you&apos;re exploring my latest open-source research,
          reviewing deployment architectures, or looking to collaborate on custom AI
          solutions, I&apos;m glad you&apos;re here.
        </p>
        <p className="text-xs sm:text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          Explore my featured projects below, or feel free to reach out directly to
          start a conversation.
        </p>
        <div
          className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wide shadow-md"
          style={{
            background: accent,
            color: "#0B1220",
            boxShadow: `0 4px 14px ${accentBg(0.4)}`,
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          Scroll down to explore
        </div>
      </div>
    </div>
  );
}

function AmbientBackground() {
  const { accent, accentDark, accentBg } = useAccent();
  return (
    <>
      <div
        className="orb w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accentDark} 0%, transparent 70%)` }}
      />
      <div
        className="orb w-[500px] h-[500px] bottom-[-150px] right-[-150px] opacity-15 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
      />
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </>
  );
}

export default function Hero() {
  return (
    <div
      id="hero"
      className="relative min-h-screen font-sans overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg-main)", color: "var(--text-body)" }}
    >
      {/* MOBILE & TABLET */}
      <div className="lg:hidden relative w-full pt-20 pb-16 px-6">
        <div className="container mx-auto max-w-xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full mb-6"
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

      {/* DESKTOP */}
      <div className="hidden lg:block relative w-full">
        <div
          className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300"
          style={{ background: "var(--bg-main)" }}
        >
          <div className="absolute inset-0 z-0 opacity-30">
            <NeuralCanvas />
          </div>

          <AmbientBackground />

          <div
            className="absolute inset-0 z-[1] pointer-events-none transition-colors duration-300"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, var(--bg-main) 85%)",
            }}
          />

          <div className="relative z-10 container mx-auto px-6 max-w-6xl w-full flex flex-col items-center gap-12 pt-24 pb-16">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full"
            >
              <WelcomeNote />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="w-full"
            >
              <div className="flex flex-row items-center justify-between gap-14 w-full">
                <ProfileContent align="left" />
                <ProfileAvatar size={240} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
