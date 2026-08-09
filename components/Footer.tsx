"use client";

import { Mail, Heart } from "lucide-react";
import { SiGithub, SiUpwork, SiFiverr } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: SiGithub, href: "https://github.com/Uak69009", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/in/umairamjadkhan", label: "LinkedIn" },
  { icon: SiUpwork, href: "https://upwork.com", label: "Upwork" },
  { icon: SiFiverr, href: "https://fiverr.com", label: "Fiverr" },
  { icon: Mail, href: "mailto:umairamjadkhan@gmail.com", label: "Email" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#070B14",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="orb w-[400px] h-[200px] left-1/2 -translate-x-1/2 -top-10 opacity-10"
        style={{ background: "radial-gradient(ellipse, #6366F1, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Top Row */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  color: "#fff",
                  fontFamily: "var(--font-space-grotesk, sans-serif)",
                }}
              >
                UAK
              </div>
              <span className="font-semibold" style={{ color: "#F9FAFB" }}>
                Umair Amjad Khan
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              AI &amp; Machine Learning Engineer specializing in LLM pipelines, RAG
              architectures, and production-grade intelligent systems.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#6B7280" }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors"
                    style={{ color: "#9CA3AF" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A5B4FC")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#6B7280" }}>
              Connect
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#9CA3AF",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.12)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
                      (e.currentTarget as HTMLElement).style.color = "#A5B4FC";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 14px rgba(99,102,241,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.color = "#9CA3AF";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>

            <p className="text-sm mt-4" style={{ color: "#6B7280" }}>
              📍 Pakistan &nbsp;|&nbsp; Open to Remote Work Worldwide
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

        {/* Bottom row */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "#4B5563" }}>
          <p>
            © {new Date().getFullYear()} Umair Amjad Khan. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Heart size={14} fill="#6366F1" color="#6366F1" /> using Next.js &amp; Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
