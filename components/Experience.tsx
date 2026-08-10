"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

import { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const timelineItems = [
  {
    type: "work",
    title: "Founder & CEO",
    organization: "icode Studios — <you imagine, WE code>",
    logo: "/icode-studios-logo.png",
    url: "https://www.linkedin.com/company/139384016/",
    location: "Pakistan & Remote",
    period: "2025 — Present",
    description:
      "Founded and leading icode Studios — an AI engineering & custom software development studio delivering production AI systems, LLM pipelines, and full-stack applications.",
    highlights: [
      "Leading AI product strategy, system architecture & client solution design",
      "Building custom RAG architectures, LLM fine-tuning & agentic workflows",
      "Delivering scalable web, mobile & cloud software for global clients",
    ],
    color: "#1D4ED8",
    bg: "rgba(29,78,216,0.08)",
    border: "rgba(29,78,216,0.25)",
  },
  {
    type: "education",
    title: "BS Artificial Intelligence",
    organization: "University of Haripur",
    logo: "/uoh-logo.png",
    url: "https://www.uoh.edu.pk/",
    location: "Haripur, Pakistan",
    period: "2022 — 2026",
    description:
      "Completed Bachelor of Science in Artificial Intelligence focusing on Computer Vision, Deep Learning, and real-world AI applications.",
    highlights: [
      "Completed Deepfake Detection System combining ResNet + LSTM architectures",
      "Object Detection projects using YOLO (Number Plate & Smartphone Detection)",
      "Specialized in Deep Learning, Computer Vision & Pattern Recognition",
    ],
    color: "#16233B",
    bg: "rgba(22,35,59,0.08)",
    border: "rgba(22,35,59,0.25)",
  },
  {
    type: "work",
    title: "Machine Learning Engineer Intern",
    organization: "Avant Labs",
    location: "Islamabad, Pakistan",
    period: "2024 — Present",
    description:
      "Developed and trained Machine Learning models and Convolutional Neural Networks (CNNs), while gaining hands-on introduction to mobile integration using Flutter.",
    highlights: [
      "Trained & optimized Machine Learning models & CNNs",
      "Gained hands-on experience with Flutter mobile app integration",
      "Worked on model inference and backend pipeline optimization",
    ],
    color: "#1D4ED8",
    bg: "rgba(29,78,216,0.08)",
    border: "rgba(29,78,216,0.25)",
  },
  {
    type: "work",
    title: "Data Entry & Data Visualization Intern",
    organization: "Galant Engineers",
    url: "https://www.linkedin.com/company/gallant-engineers-builders/home/",
    location: "Islamabad, Pakistan",
    period: "2023 — 2024",
    description:
      "Managed complex data entry, data cleaning, statistical analysis, and interactive visual dashboards for engineering workflows.",
    highlights: [
      "Cleaned, structured, and validated large-scale datasets",
      "Created interactive data visualizations and executive dashboards",
      "Streamlined reporting workflows for engineering analytics",
    ],
    color: "#16233B",
    bg: "rgba(22,35,59,0.08)",
    border: "rgba(22,35,59,0.25)",
  },
  {
    type: "work",
    title: "Freelance AI Engineer",
    organization: "Upwork & Fiverr",
    location: "Remote — Worldwide",
    period: "2023 — Present",
    description:
      "Delivered end-to-end AI and computer vision solutions for international clients on Upwork and Fiverr.",
    highlights: [
      "Built custom object detection & NLP pipelines for clients",
      "Developed AI-powered chatbots & intelligent backends",
      "Delivered production-ready ML solutions globally",
    ],
    color: "#1D4ED8",
    bg: "rgba(29,78,216,0.08)",
    border: "rgba(29,78,216,0.25)",
  },
  {
    type: "education",
    title: "Advanced AI Bootcamp 2026",
    organization: "GIKI — Ghulam Ishaq Khan Institute",
    logo: "/giki-logo.png",
    url: "https://giki.edu.pk/",
    location: "Topi, Swabi, Pakistan",
    period: "2026",
    description:
      "Attended an intensive Advanced AI Bootcamp at GIKI covering cutting-edge Generative AI, RAG, Large Language Models, and production deployment pipelines.",
    highlights: [
      "Full RAG (Retrieval-Augmented Generation) & NLP Architectures",
      "Deep Learning & LLM Fine-Tuning (LoRA / QLoRA)",
      "End-to-End MLOps & LLMOps Pipeline Engineering",
    ],
    color: "#16233B",
    bg: "rgba(22,35,59,0.08)",
    border: "rgba(22,35,59,0.25)",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="section-base transition-colors duration-300"
      style={{ background: "var(--bg-main)" }}
    >
      {/* Orb */}
      <div
        className="orb w-[500px] h-[500px] left-[-150px] top-1/2 -translate-y-1/2 opacity-15"
        style={{ background: "radial-gradient(circle, #1D4ED8, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>

        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="text-center mb-20"
        >
          <span
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              color: "#1E40AF",
              background: "rgba(29,78,216,0.08)",
              border: "1px solid rgba(29,78,216,0.25)",
            }}
          >
            Career &amp; Milestones
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: "var(--text-heading)" }}
          >
            Experience &amp;{" "}
            <span className="text-[#1D4ED8]">Journey</span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "var(--text-body)" }}>
            My professional path as an AI Engineer, Studio Founder, and Machine
            Learning researcher.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">

          {/* Center Vertical Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden sm:block">
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full rounded-full"
              style={{
                background: "linear-gradient(to bottom, #1D4ED8 0%, #16233B 50%, #1D4ED8 100%)",
              }}
            />
          </div>

          <div className="flex flex-col gap-10">
            {timelineItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              const TypeIcon = item.type === "work" ? Briefcase : GraduationCap;

              const LogoContent = item.logo ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 transition-transform duration-200 hover:scale-110">
                  <Image
                    src={item.logo}
                    alt={`${item.organization} official logo`}
                    fill
                    sizes="32px"
                    loading="lazy"
                    className="object-contain"
                  />
                </div>
              ) : (
                <TypeIcon size={20} color={item.color} />
              );

              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeUp}
                  custom={i + 1}
                  className={`relative flex items-start gap-6 lg:gap-0 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Mobile/Desktop dot */}
                  <div className="relative z-10 flex-shrink-0 flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-6">
                    <div
                      className="timeline-dot w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
                      style={{
                        background: item.bg,
                        border: `2px solid ${item.color}`,
                        boxShadow: `0 0 0 4px var(--bg-main), 0 4px 16px ${item.color}30`,
                      }}
                    >
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Visit ${item.organization} official site`}
                          className="flex items-center justify-center"
                        >
                          {LogoContent}
                        </a>
                      ) : (
                        LogoContent
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 glass-card p-6 lg:max-w-[calc(50%-3rem)] ${
                      isLeft ? "lg:mr-auto" : "lg:ml-auto"
                    }`}
                    style={{ border: `1px solid ${item.border}` }}
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{
                            color: item.color,
                            background: `${item.color}14`,
                            border: `1px solid ${item.color}30`,
                          }}
                        >
                          {item.type === "work" ? "Work" : "Education"}
                        </span>
                        {item.logo && (
                          item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`Visit ${item.organization} official site`}
                              className="relative w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-slate-200 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-[#1D4ED8]"
                            >
                              <Image
                                src={item.logo}
                                alt={item.organization}
                                fill
                                sizes="40px"
                                className="object-contain"
                              />
                            </a>
                          ) : (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-slate-200 shadow-sm">
                              <Image
                                src={item.logo}
                                alt={item.organization}
                                fill
                                sizes="40px"
                                className="object-contain"
                              />
                            </div>
                          )
                        )}
                      </div>

                      <h3
                        className="text-lg font-bold mb-1"
                        style={{
                          color: "var(--text-heading)",
                          fontFamily: "var(--font-space-grotesk, sans-serif)",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: item.color }}>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-1.5"
                          >
                            {item.organization}
                            <span className="text-xs opacity-75">↗</span>
                          </a>
                        ) : (
                          item.organization
                        )}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {item.period}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-body)" }}>
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <ul className="flex flex-col gap-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-body)" }}>
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
