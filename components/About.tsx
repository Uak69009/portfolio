"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Layers, Zap, Globe } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: "easeOut" },
  }),
};

const stats = [
  { label: "Years of Experience", value: "3+", icon: Zap, color: "#00F2FE" },
  { label: "Projects Delivered", value: "10+", icon: Layers, color: "#6366F1" },
  { label: "AI Models Deployed", value: "5+", icon: Cpu, color: "#8B5CF6" },
  { label: "Clients Served", value: "15+", icon: Globe, color: "#F59E0B" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="section-base"
      style={{ background: "linear-gradient(180deg, #111827 0%, #0B0F19 100%)" }}
    >
      {/* Ambient orbs */}
      <div
        className="orb w-[500px] h-[500px] right-[-150px] top-1/2 -translate-y-1/2 opacity-10"
        style={{ background: "radial-gradient(circle, #00F2FE, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={0}
            >
              <span
                className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{
                  color: "#00F2FE",
                  background: "rgba(0,242,254,0.08)",
                  border: "1px solid rgba(0,242,254,0.2)",
                }}
              >
                About Me
              </span>
            </motion.div>

            <motion.h2
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={1}
              className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: "#F9FAFB" }}
            >
              Turning Data into{" "}
              <span className="gradient-text">Intelligent Systems</span>
            </motion.h2>

            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={2}
              className="flex flex-col gap-4 text-base leading-relaxed"
              style={{ color: "#9CA3AF" }}
            >
              <p>
                I&apos;m <span style={{ color: "#F9FAFB", fontWeight: 600 }}>Umair Amjad Khan</span>,
                Founder &amp; CEO at <span className="gradient-text font-bold">icode Studios</span> (&ldquo;you imagine, WE code&rdquo;)
                and an AI &amp; Machine Learning Engineer specializing in building production-grade intelligent systems.
              </p>
              <p>
                At icode Studios, I lead software architecture and AI engineering initiatives, delivering custom
                <span className="gradient-text-cyan-indigo font-semibold"> RAG pipelines</span>, LLM fine-tuning solutions,
                and scalable web &amp; mobile applications for clients worldwide.
              </p>
              <p>
                My technical expertise spans deep learning, computer vision, and full-stack MLOps — containerizing
                models with Docker, exposing high-throughput FastAPI backends, and building interactive software products.
              </p>
            </motion.div>

            {/* Specialties row */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-3 mt-8"
            >
              {[
                "LLM Fine-Tuning",
                "RAG Architectures",
                "Computer Vision",
                "MLOps Pipelines",
                "Multi-Agent Systems",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm rounded-lg font-medium"
                  style={{
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    color: "#A5B4FC",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Stats + Visual */}
          <div className="flex flex-col gap-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={fadeUp}
                    custom={i + 2}
                    className="glass-card glass-card-hover p-5 text-center"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{
                        background: `${stat.color}14`,
                        border: `1px solid ${stat.color}30`,
                      }}
                    >
                      <Icon size={20} color={stat.color} />
                    </div>
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{
                        fontFamily: "var(--font-space-grotesk, sans-serif)",
                        color: stat.color,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs" style={{ color: "#6B7280" }}>
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quote card */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={7}
              className="glass-card p-6 relative overflow-hidden"
              style={{ border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div
                className="absolute top-0 left-0 w-full h-1 gradient-border"
              />
              <div
                className="text-4xl mb-3 leading-none"
                style={{ color: "rgba(99,102,241,0.3)", fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </div>
              <p className="text-sm leading-relaxed italic" style={{ color: "#9CA3AF" }}>
                The best AI systems are not the most complex — they are the ones
                that solve real problems reliably, at scale, in production.
              </p>
              <p className="text-sm font-semibold mt-4 gradient-text-cyan-indigo">
                — My Engineering Philosophy
              </p>
            </motion.div>

            {/* What I&apos;m working on */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={8}
              className="glass-card p-5"
              style={{ border: "1px solid rgba(0,242,254,0.15)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#00F2FE", boxShadow: "0 0 8px #00F2FE" }}
                />
                <span className="text-sm font-semibold" style={{ color: "#F9FAFB" }}>
                  Currently Working On
                </span>
              </div>
              <ul className="flex flex-col gap-2 text-sm" style={{ color: "#9CA3AF" }}>
                <li>🤖 Advanced multi-modal RAG systems</li>
                <li>🌾 Expanding Zari.AI to new crop diseases</li>
                <li>🛡️ Publishing cyber defense research</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
