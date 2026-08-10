"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";

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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load and apply theme preference
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as "light" | "dark" | null;
    const initial = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard Escape listener & Body scroll handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

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

  const isDark = theme === "dark";

  return (
    <header>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? isDark
              ? "rgba(0, 0, 0, 0.92)"
              : "rgba(255, 255, 255, 0.9)"
            : isDark
              ? "rgba(0, 0, 0, 0.6)"
              : "transparent",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(226, 232, 240, 0.9)"
            : "none",
          boxShadow: scrolled
            ? isDark
              ? "0 10px 30px -5px rgba(0, 0, 0, 0.4)"
              : "0 4px 20px -2px rgba(0,0,0,0.05)"
            : "none",
        }}
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex items-center gap-2 group min-h-[44px] min-w-[44px]"
            aria-label="Umair Amjad Khan Homepage"
            style={{ textDecoration: "none" }}
          >
            <Image
              src="/icon.svg"
              width={36}
              height={36}
              alt="Umair Amjad Khan AI Logo"
              className="rounded-lg shadow-sm w-9 h-9 object-contain"
            />
            <span
              className="hidden sm:block font-semibold text-sm transition-colors"
              style={{ color: isDark ? "#F8FAFC" : "#0B1220" }}
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
                    className="relative px-4 py-2 min-h-[44px] text-sm font-medium rounded-lg transition-all duration-200"
                    style={{
                      color: isActive
                        ? isDark ? "#FACC15" : "#1D4ED8"
                        : isDark ? "#94A3B8" : "#64748B",
                      background: isActive
                        ? isDark ? "rgba(234, 179, 8, 0.18)" : "rgba(29, 78, 216, 0.08)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.color = isDark ? "#FFFFFF" : "#0B1220";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.color = isDark ? "#94A3B8" : "#64748B";
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: isDark ? "#FACC15" : "#1D4ED8" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions (Theme Toggle + Hire Me) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
              style={{
                background: isDark ? "rgba(234, 179, 8, 0.15)" : "rgba(29, 78, 216, 0.08)",
                border: isDark ? "1px solid rgba(234, 179, 8, 0.5)" : "1px solid rgba(29, 78, 216, 0.2)",
                color: isDark ? "#FACC15" : "#1D4ED8",
              }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={19} /> : <Moon size={19} />}
              </motion.div>
            </button>

            {/* Desktop CTA */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #EAB308, #CA8A04)"
                  : "linear-gradient(135deg, #1D4ED8, #1E40AF)",
                color: isDark ? "#0B1220" : "#fff",
                boxShadow: isDark
                  ? "0 4px 14px rgba(234, 179, 8, 0.35)"
                  : "0 4px 14px rgba(29, 78, 216, 0.25)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = isDark
                  ? "0 6px 20px rgba(250, 204, 21, 0.5)"
                  : "0 6px 20px rgba(29, 78, 216, 0.5)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = isDark
                  ? "0 4px 14px rgba(234, 179, 8, 0.35)"
                  : "0 4px 14px rgba(29, 78, 216, 0.25)")
              }
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Right Controls (Theme Toggle + Hamburger) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
              style={{
                background: isDark ? "rgba(234, 179, 8, 0.15)" : "rgba(29, 78, 216, 0.08)",
                border: isDark ? "1px solid rgba(234, 179, 8, 0.5)" : "1px solid rgba(29, 78, 216, 0.2)",
                color: isDark ? "#FACC15" : "#1D4ED8",
              }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{
                background: isDark ? "rgba(234, 179, 8, 0.15)" : "rgba(29, 78, 216, 0.08)",
                color: isDark ? "#FACC15" : "#1D4ED8",
              }}
              aria-label="Toggle mobile navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 z-40 w-72"
            style={{
              background: isDark ? "rgba(0, 0, 0, 0.98)" : "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderLeft: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #E2E8F0",
              boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.3)",
            }}
            aria-label="Mobile Navigation Menu"
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
                    className="text-left px-4 py-3 rounded-xl text-base font-medium min-h-[44px] transition-all"
                    style={{
                      color: active === link.href.slice(1)
                        ? isDark ? "#FACC15" : "#1D4ED8"
                        : isDark ? "#94A3B8" : "#64748B",
                      background:
                        active === link.href.slice(1)
                          ? isDark ? "rgba(234, 179, 8, 0.18)" : "rgba(29, 78, 216, 0.08)"
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
                className="btn-primary justify-center min-h-[44px] mt-6"
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
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
