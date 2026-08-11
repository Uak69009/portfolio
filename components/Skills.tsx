"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Server, Layers } from "lucide-react";
import { useAccent } from "@/hooks/useTheme";

import { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const skillCategories = [
  {
    icon: Brain,
    title: "Machine Learning & Deep Learning",
    skills: [
      "PyTorch", "TensorFlow", "Scikit-Learn", "Computer Vision",
      "OpenCV", "ResNeXt", "YOLO", "CNNs", "LSTM", "Reinforcement Learning",
    ],
  },
  {
    icon: Code2,
    title: "Generative AI & NLP",
    skills: [
      "Transformers", "LLM Fine-Tuning", "LoRA / QLoRA", "RAG Pipelines",
      "LangChain", "LlamaIndex", "Vector Databases", "Prompt Engineering",
      "HuggingFace", "OpenAI API",
    ],
  },
  {
    icon: Server,
    title: "MLOps, LLMOps & Infrastructure",
    skills: [
      "Docker", "FastAPI", "Flask", "Git", "Linux",
      "Model Deployment", "Model Monitoring", "CI/CD", "REST APIs", "WhatsApp API",
      "LLM Evaluation", "Guardrails", "Prompt Versioning", "LLM Observability", "LangSmith",
    ],
  },
  {
    icon: Layers,
    title: "Languages & Tools",
    skills: [
      "Python", "C++", "SQL", "Google Colab", "Jupyter",
      "Pandas", "NumPy", "Matplotlib", "Streamlit", "Postman",
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { accent, accentAlt, accentBg, accentBorder } = useAccent();

  return (
    <section
      id="skills"
      className="section-base transition-colors duration-300"
      style={{ background: "var(--bg-main)" }}
    >
      {/* Orb */}
      <div
        className="orb w-[500px] h-[500px] left-[-200px] top-1/2 -translate-y-1/2 opacity-15"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
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
              color: accent,
              background: accentBg(0.09),
              border: `1px solid ${accentBorder(0.22)}`,
            }}
          >
            Technical Arsenal
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: "var(--text-heading)" }}
          >
            Core Skills &amp;{" "}
            <span style={{ color: accent }}>Technologies</span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "var(--text-body)" }}>
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
                    style={{ background: accentBg(0.12), border: `1px solid ${accentBorder(0.28)}` }}
                  >
                    <Icon size={20} color={accent} />
                  </div>
                  <h3
                    className="font-semibold text-base"
                    style={{
                      color: "var(--text-heading)",
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
          <p className="text-sm mb-5 font-medium" style={{ color: "var(--text-heading)" }}>
            Core Proficiency
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Python & ML Frameworks", pct: 92 },
              { label: "Generative AI & LLMs", pct: 88 },
              { label: "MLOps & LLMOps", pct: 82 },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between mb-2 text-xs font-medium" style={{ color: "var(--text-body)" }}>
                  <span>{bar.label}</span>
                  <span style={{ color: accent }}>{bar.pct}%</span>
                </div>
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--border-color)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${bar.pct}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${accent}, ${accentAlt})`,
                      boxShadow: `0 0 8px ${accentBg(0.35)}`,
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
