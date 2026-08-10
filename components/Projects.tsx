"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Bot, Shield, Network } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const projects = [
  {
    id: 1,
    icon: Bot,
    iconColor: "#1D4ED8",
    iconBg: "rgba(29,78,216,0.08)",
    badge: "Featured Project",
    badgeColor: "#1D4ED8",
    title: "Zari.AI",
    subtitle: "Agricultural Disease Detection",
    description:
      "Voice-enabled AI system providing real-time crop disease diagnosis via web and WhatsApp interfaces. Helps farmers in rural areas detect diseases and get actionable treatment recommendations instantly through natural conversation.",
    highlights: [
      "Real-time disease detection via camera input",
      "Multi-language voice interface",
      "WhatsApp integration for field accessibility",
      "FastAPI backend with sub-200ms response",
    ],
    stack: ["Python", "Computer Vision", "Speech Processing", "FastAPI", "WhatsApp API", "PyTorch"],
    borderColor: "rgba(29,78,216,0.25)",
    glowColor: "rgba(29,78,216,0.08)",
    demoUrl: "#",
    githubUrl: "https://github.com/Uak69009",
  },
  {
    id: 2,
    icon: Shield,
    iconColor: "#16233B",
    iconBg: "rgba(22,35,59,0.08)",
    badge: "Research Project",
    badgeColor: "#1E40AF",
    title: "Deepfake Detection Platform",
    subtitle: "ResNeXt + LSTM Pipeline",
    description:
      "End-to-end deepfake video verification pipeline combining ResNeXt spatial feature extraction with LSTM temporal analysis. Includes a Flask backend API and a Chrome Extension for real-time browser-based verification of media authenticity.",
    highlights: [
      "Dual-stream ResNeXt + LSTM architecture",
      "Chrome Extension for instant web verification",
      "90%+ detection accuracy on benchmark datasets",
      "Frame-level confidence scoring with heatmaps",
    ],
    stack: ["PyTorch", "ResNeXt", "LSTM", "Flask", "Chrome Extension API", "OpenCV"],
    borderColor: "rgba(22,35,59,0.25)",
    glowColor: "rgba(22,35,59,0.08)",
    demoUrl: "#",
    githubUrl: "https://github.com/Uak69009",
  },
  {
    id: 3,
    icon: Network,
    iconColor: "#1D4ED8",
    iconBg: "rgba(29,78,216,0.08)",
    badge: "Systems AI",
    badgeColor: "#1D4ED8",
    title: "Autonomous Cyber Defense System",
    subtitle: "Multi-Agent RL for Network Security",
    description:
      "Hierarchical multi-agent reinforcement learning pipeline for real-time network threat detection and automated mitigation. Agents autonomously identify intrusion patterns, classify attack types, and deploy countermeasures without human intervention.",
    highlights: [
      "Hierarchical MARL with strategic + tactical agents",
      "Real-time anomaly detection & classification",
      "Autonomous threat mitigation protocols",
      "Network graph-based state representation",
    ],
    stack: ["Python", "PyTorch", "Multi-Agent RL", "Network Analytics", "Gymnasium"],
    borderColor: "rgba(29,78,216,0.25)",
    glowColor: "rgba(29,78,216,0.08)",
    demoUrl: null,
    githubUrl: "https://github.com/Uak69009",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      className="section-base transition-colors duration-300"
      style={{ background: "var(--bg-alt)" }}
    >
      {/* Orbs */}
      <div
        className="orb w-[600px] h-[600px] right-[-200px] top-1/2 -translate-y-1/2 opacity-15"
        style={{ background: "radial-gradient(circle, #1D4ED8, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>

        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: "#1E40AF",
              background: "rgba(29,78,216,0.08)",
              border: "1px solid rgba(29,78,216,0.25)",
            }}
          >
            Featured Work
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: "var(--text-heading)" }}
          >
            Production{" "}
            <span className="text-[#1D4ED8]">AI Projects</span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "var(--text-body)" }}>
            Real-world intelligent systems built from research to deployment —
            spanning computer vision, generative AI, and autonomous agents.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.id}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={i + 1}
                className="glass-card p-8 group relative overflow-hidden transition-all duration-400"
                style={{ border: `1px solid ${project.borderColor}` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px -10px ${project.glowColor}, 0 4px 16px -2px ${project.iconColor}20`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.borderColor = project.borderColor.replace("0.25", "0.5");
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = project.borderColor;
                }}
              >
                {/* Background gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${project.glowColor} 0%, transparent 60%)`,
                  }}
                />

                <div className="relative flex flex-col lg:flex-row gap-8">
                  {/* Left Column */}
                  <div className="flex-1">
                    {/* Badge + Icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: project.iconBg, border: `1px solid ${project.iconColor}30` }}
                      >
                        <Icon size={22} color={project.iconColor} />
                      </div>
                      <span
                        className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                        style={{
                          color: project.badgeColor,
                          background: `${project.badgeColor}14`,
                          border: `1px solid ${project.badgeColor}30`,
                        }}
                      >
                        {project.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{
                        fontFamily: "var(--font-space-grotesk, sans-serif)",
                        color: "var(--text-heading)",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium mb-4" style={{ color: project.iconColor }}>
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-body)" }}>
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="tech-tag" style={{
                          color: project.iconColor,
                          background: `${project.iconColor}0D`,
                          borderColor: `${project.iconColor}20`,
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Highlights + Links */}
                  <div className="lg:w-72 flex flex-col justify-between gap-6">
                    {/* Key Highlights */}
                    <div
                      className="rounded-xl p-5 transition-colors duration-300"
                      style={{ background: "var(--bg-main)", border: "1px solid var(--border-color)" }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                        Key Features
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-body)" }}>
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                              style={{ background: project.iconColor, boxShadow: `0 0 6px ${project.iconColor}` }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View live demo of ${project.title}`}
                          className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl text-sm font-semibold transition-all duration-200"
                          style={{
                            background: `linear-gradient(135deg, ${project.iconColor}18, ${project.iconColor}0A)`,
                            border: `1px solid ${project.iconColor}35`,
                            color: project.iconColor,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = `${project.iconColor}22`;
                            (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${project.iconColor}25`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${project.iconColor}18, ${project.iconColor}0A)`;
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }}
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View GitHub repository for ${project.title}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl text-sm font-semibold transition-all duration-200"
                        style={{
                          background: "var(--bg-main)",
                          border: "1px solid var(--border-color)",
                          color: "var(--text-body)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#1D4ED8";
                          (e.currentTarget as HTMLElement).style.color = "#1D4ED8";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                          (e.currentTarget as HTMLElement).style.color = "var(--text-body)";
                        }}
                      >
                        <SiGithub size={15} />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={5}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Uak69009"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <SiGithub size={18} />
            View All Repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
