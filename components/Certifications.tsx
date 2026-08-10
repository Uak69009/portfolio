"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ShieldCheck, Cpu } from "lucide-react";
import { SiAnthropic, SiCoursera } from "react-icons/si";

import { Variants } from "framer-motion";
import { useAccent } from "@/hooks/useTheme";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  skills?: string[];
  color: string;
  iconBg: string;
  badgeBg: string;
  brandIcon?: "anthropic" | "ibm" | "coursera" | "giki" | "deeplearning";
}

const certifications: Certification[] = [
  {
    id: "claude-101",
    title: "Certificate of Completion: Claude 101",
    issuer: "Anthropic",
    issueDate: "Jul 2026",
    credentialId: "rqyino9f2azv",
    color: "#1D4ED8",
    iconBg: "rgba(29, 78, 216, 0.12)",
    badgeBg: "rgba(29, 78, 216, 0.2)",
    brandIcon: "anthropic",
    skills: ["Claude AI", "Prompt Engineering", "LLM APIs"],
  },
  {
    id: "ai-fluency",
    title: "AI Fluency Framework & Foundations",
    issuer: "Anthropic",
    issueDate: "Jul 2026",
    credentialId: "9p7xdnwknfz6",
    color: "#16233B",
    iconBg: "rgba(22, 35, 59, 0.12)",
    badgeBg: "rgba(22, 35, 59, 0.2)",
    brandIcon: "anthropic",
    skills: ["Prompt Engineering", "AI Foundations"],
  },
  {
    id: "ibm-genai-apps",
    title: "Develop Generative AI Applications: Get Started",
    issuer: "IBM",
    issueDate: "Jun 2025",
    credentialId: "JYEPO77WHTAV",
    color: "#1D4ED8",
    iconBg: "rgba(29, 78, 216, 0.12)",
    badgeBg: "rgba(29, 78, 216, 0.2)",
    brandIcon: "ibm",
    skills: ["Generative AI", "Application Development", "Python"],
  },
  {
    id: "ibm-rag-apps",
    title: "Build RAG Applications: Get Started",
    issuer: "IBM",
    issueDate: "Jun 2025",
    credentialId: "7RFD0U06D9A1",
    color: "#16233B",
    iconBg: "rgba(22, 35, 59, 0.12)",
    badgeBg: "rgba(22, 35, 59, 0.2)",
    brandIcon: "ibm",
    skills: ["RAG Pipelines", "Vector Databases", "LangChain"],
  },
  {
    id: "vanderbilt-genai",
    title: "Generative AI and Model Selection",
    issuer: "Vanderbilt University",
    issueDate: "Feb 2025",
    credentialId: "V5YQQLJLG755",
    color: "#1D4ED8",
    iconBg: "rgba(29, 78, 216, 0.12)",
    badgeBg: "rgba(29, 78, 216, 0.2)",
    skills: ["Model Selection", "LLM Evaluation", "Fine-Tuning Strategy"],
  },
  {
    id: "deeplearning-ai-everyone",
    title: "AI For Everyone",
    issuer: "DeepLearning.AI",
    issueDate: "Feb 2025",
    credentialId: "P9ZL6GAT5SSJ",
    color: "#16233B",
    iconBg: "rgba(22, 35, 59, 0.12)",
    badgeBg: "rgba(22, 35, 59, 0.2)",
    brandIcon: "deeplearning",
    skills: ["AI Strategy", "Machine Learning Concepts", "AI Ethics"],
  },
  {
    id: "giki-hack-connect",
    title: "Hack N' Connect",
    issuer: "Ghulam Ishaq Khan Institute (GIKI)",
    issueDate: "Sep 2023",
    color: "#1D4ED8",
    iconBg: "rgba(29, 78, 216, 0.12)",
    badgeBg: "rgba(29, 78, 216, 0.2)",
    brandIcon: "giki",
    skills: ["Computer Networking", "Systems"],
  },
  {
    id: "langgraph-agents",
    title: "AI Agents in LangGraph (Short Course)",
    issuer: "Coursera / DeepLearning.AI",
    issueDate: "2026",
    color: "#16233B",
    iconBg: "rgba(22, 35, 59, 0.12)",
    badgeBg: "rgba(22, 35, 59, 0.2)",
    brandIcon: "coursera",
    skills: ["LangGraph", "Agentic Workflows", "Multi-Agent Systems"],
  },
  {
    id: "python-datascience",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM / Coursera",
    issueDate: "2026",
    color: "#1D4ED8",
    iconBg: "rgba(29, 78, 216, 0.12)",
    badgeBg: "rgba(29, 78, 216, 0.2)",
    brandIcon: "coursera",
    skills: ["Python", "Pandas", "Data Science", "API Integration"],
  },
  {
    id: "foundations-cybersecurity",
    title: "Foundations of Cybersecurity",
    issuer: "Google / Coursera",
    issueDate: "2026",
    color: "#16233B",
    iconBg: "rgba(22, 35, 59, 0.12)",
    badgeBg: "rgba(22, 35, 59, 0.2)",
    brandIcon: "coursera",
    skills: ["Cybersecurity", "Network Security", "Threat Analysis"],
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { accent, accentAlt, accentBg, accentBorder } = useAccent();

  const themedCertifications = certifications.map((c, i) => ({
    ...c,
    color: i % 2 === 0 ? accent : accentAlt,
    iconBg: accentBg(0.12),
    badgeBg: accentBg(0.20),
  }));

  const getBrandIcon = (brand?: string) => {
    switch (brand) {
      case "anthropic":
        return <SiAnthropic size={18} />;
      case "ibm":
        return <Cpu size={18} />;
      case "coursera":
        return <SiCoursera size={18} />;
      default:
        return <Award size={18} />;
    }
  };

  return (
    <section
      id="certifications"
      className="section-base transition-colors duration-300"
      style={{ background: "var(--bg-alt)" }}
    >
      {/* Orb */}
      <div
        className="orb w-[500px] h-[500px] right-[-150px] top-1/3 opacity-15"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        {/* Header */}
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
              border: `1px solid ${accentBorder(0.25)}`,
            }}
          >
            Verified Credentials
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: "var(--text-heading)" }}
          >
            Certifications &amp; <span style={{ color: accent }}>Specializations</span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "var(--text-body)" }}>
            Continuous learning credentials from leading AI organizations including Anthropic,
            IBM, DeepLearning.AI, and Vanderbilt University.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themedCertifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={i + 1}
              className="glass-card glass-card-hover p-6 flex flex-col justify-between relative group overflow-hidden"
              style={{ border: `1px solid ${cert.color}25` }}
            >
              {/* Top Accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: cert.color }}
              />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: cert.iconBg,
                      border: `1px solid ${cert.color}35`,
                      color: cert.color,
                    }}
                  >
                    {getBrandIcon(cert.brandIcon)}
                  </div>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full font-semibold"
                    style={{
                      color: cert.color,
                      background: cert.badgeBg,
                    }}
                  >
                    {cert.issueDate}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3
                  className="font-bold text-base mb-1.5 leading-snug"
                  style={{
                    color: "var(--text-heading)",
                    fontFamily: "var(--font-space-grotesk, sans-serif)",
                  }}
                >
                  {cert.title}
                </h3>
                <p className="text-xs font-semibold mb-4" style={{ color: cert.color }}>
                  {cert.issuer}
                </p>
              </div>

              <div>
                {/* Credential ID */}
                {cert.credentialId && (
                  <div
                    className="flex items-center gap-1.5 text-[11px] mb-4 font-mono px-2.5 py-1 rounded-md transition-colors duration-300"
                    style={{
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <ShieldCheck size={13} color={accent} className="flex-shrink-0" />
                    <span className="truncate">ID: {cert.credentialId}</span>
                  </div>
                )}

                {/* Skills tags */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md tech-tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
