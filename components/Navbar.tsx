"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for active section highlighting
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(11, 15, 25, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex items-center gap-2 group"
            style={{ textDecoration: "none" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                color: "#fff",
                fontFamily: "var(--font-space-grotesk, sans-serif)",
              }}
            >
              UAK
            </div>
            <span
              className="hidden sm:block font-semibold text-sm"
              style={{ color: "#E5E7EB" }}
            >
              Umair Amjad Khan
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                    style={{
                      color: isActive ? "#A5B4FC" : "#9CA3AF",
                      background: isActive
                        ? "rgba(99,102,241,0.1)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.color = "#E5E7EB";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.color = "#9CA3AF";
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: "#6366F1" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              color: "#fff",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 20px rgba(99,102,241,0.45)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow = "none")
            }
          >
            Hire Me
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
            style={{
              background: "rgba(99,102,241,0.1)",
              color: "#A5B4FC",
            }}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 z-40 w-72"
            style={{
              background: "rgba(11,15,25,0.97)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex flex-col h-full pt-20 px-8 pb-8">
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 rounded-xl text-base font-medium transition-all"
                    style={{
                      color: active === link.href.slice(1) ? "#A5B4FC" : "#9CA3AF",
                      background:
                        active === link.href.slice(1)
                          ? "rgba(99,102,241,0.12)"
                          : "transparent",
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="btn-primary justify-center mt-6"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
