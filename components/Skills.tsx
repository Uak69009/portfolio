"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Server, Layers } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
  }),
};

const skillCategories = [
  {
    icon: Brain,
    title: "Machine Learning & Deep Learning",
    color: "#6366F1",
    glow: "rgba(99,102,241,0.2)",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "Computer Vision",
      "OpenCV",
      "ResNeXt",
      "YOLO",
      "CNNs",
      "LSTM",
      "Reinforcement Learning",
    ],
  },
  {
    icon: Code2,
    title: "Generative AI & NLP",
    color: "#00F2FE",
    glow: "rgba(0,242,254,0.2)",
    skills: [
      "Transformers",
      "LLM Fine-Tuning",
      "LoRA / QLoRA",
      "RAG Pipelines",
      "LangChain",
      "LlamaIndex",
      "Vector Databases",
      "Prompt Engineering",
      "HuggingFace",
      "OpenAI API",
    ],
  },
  {
    icon: Server,
    title: "MLOps & Infrastructure",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.2)",
    skills: [
      "Docker",
      "FastAPI",
      "Flask",
      "Git",
      "Linux",
      "Model Deployment",
      "Model Monitoring",
      "CI/CD",
      "REST APIs",
      "WhatsApp API",
    ],
  },
  {
    icon: Layers,
    title: "Languages & Tools",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.2)",
    skills: [
      "Python",
      "C++",
      "SQL",
      "Google Colab",
      "Jupyter",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Streamlit",
      "Postman",
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="section-base"
      style={{ background: "linear-gradient(180deg, #0B0F19 0%, #111827 60%, #0B0F19 100%)" }}
    >
      {/* Orb */}
      <div
        className="orb w-[500px] h-[500px] left-[-200px] top-1/2 -translate-y-1/2 opacity-10"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
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
              color: "#6366F1",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            Technical Arsenal
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: "#F9FAFB" }}
          >
            Core Skills &amp;{" "}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "#9CA3AF" }}>
            A battle-tested toolkit for building production AI systems — from
            raw data to deployed intelligent applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={i + 1}
                className="glass-card glass-card-hover p-6"
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cat.glow, border: `1px solid ${cat.color}30` }}
                  >
                    <Icon size={20} color={cat.color} />
                  </div>
                  <h3
                    className="font-semibold text-base"
                    style={{
                      color: "#F9FAFB",
                      fontFamily: "var(--font-space-grotesk, sans-serif)",
                    }}
                  >
                    {cat.title}
                  </h3>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-badge"
                      style={{
                        borderColor: `${cat.color}25`,
                        background: `${cat.color}0D`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}60`;
                        (e.currentTarget as HTMLElement).style.color = "#F9FAFB";
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${cat.glow}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}25`;
                        (e.currentTarget as HTMLElement).style.color = "#D1D5DB";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom proficiency bar strip */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={6}
          className="mt-12 glass-card p-6"
        >
          <p className="text-sm mb-5 font-medium" style={{ color: "#9CA3AF" }}>
            Core Proficiency
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Python & ML Frameworks", pct: 92, color: "#6366F1" },
              { label: "Generative AI & LLMs", pct: 88, color: "#00F2FE" },
              { label: "MLOps & Deployment", pct: 80, color: "#8B5CF6" },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between mb-2 text-xs" style={{ color: "#9CA3AF" }}>
                  <span>{bar.label}</span>
                  <span style={{ color: bar.color }}>{bar.pct}%</span>
                </div>
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${bar.pct}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${bar.color}, ${bar.color}99)`,
                      boxShadow: `0 0 10px ${bar.color}55`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
