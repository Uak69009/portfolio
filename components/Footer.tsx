"use client";

import { Mail, Heart } from "lucide-react";
import { SiGithub, SiUpwork, SiFiverr } from "react-icons/si";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { useAccent } from "@/hooks/useTheme";

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
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/umair-amjad-khan-yousafzai-85b6012ba/", label: "LinkedIn" },
  { icon: FaWhatsapp, href: "https://wa.me/923170478541", label: "WhatsApp" },
  { icon: SiUpwork, href: "https://upwork.com", label: "Upwork" },
  { icon: SiFiverr, href: "https://www.fiverr.com/umair_khan69009", label: "Fiverr" },
  { icon: Mail, href: "mailto:umairamjadkhanamazai@gmail.com", label: "Email" },
];

export default function Footer() {
  const { accent, accentBg, accentBorder } = useAccent();
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden transition-colors duration-300"
      style={{
        background: "var(--bg-alt)",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="orb w-[400px] h-[200px] left-1/2 -translate-x-1/2 -top-10 opacity-15"
        style={{ background: `radial-gradient(ellipse, ${accent}, transparent 70%)` }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Top Row */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/icon.svg"
                width={40}
                height={40}
                alt="Umair Amjad Khan AI Logo"
                className="rounded-xl shadow-sm w-10 h-10 object-contain"
              />
              <span className="font-semibold" style={{ color: "var(--text-heading)" }}>
                Umair Amjad Khan
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              AI &amp; Machine Learning Engineer specializing in LLM pipelines, RAG
              architectures, and production-grade intelligent systems.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm transition-colors"
                    style={{ color: "var(--text-body)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = accent)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-body)")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
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
                    aria-label={`Umair Amjad Khan on ${s.label}`}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-body)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = accentBg(0.15);
                      (e.currentTarget as HTMLElement).style.borderColor = accentBorder(0.4);
                      (e.currentTarget as HTMLElement).style.color = accent;
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${accentBg(0.25)}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--bg-main)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-body)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>

            <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
              📍 Pakistan &nbsp;|&nbsp; Open to Remote Work Worldwide
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border-color)" }} />

        {/* Bottom row */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Umair Amjad Khan. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Heart size={14} fill={accent} color={accent} /> using Next.js &amp; Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
