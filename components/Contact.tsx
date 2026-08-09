"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Mail,
  Send,
  CheckCircle2,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { SiGithub, SiUpwork, SiFiverr } from "react-icons/si";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

import { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const socialLinks = [
  {
    icon: SiGithub,
    label: "GitHub",
    href: "https://github.com/Uak69009",
    color: "#0F172A",
    bg: "rgba(15,23,42,0.06)",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://linkedin.com/in/umairamjadkhan",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.08)",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/923170478541",
    color: "#25D366",
    bg: "rgba(37,211,102,0.08)",
  },
  {
    icon: SiUpwork,
    label: "Upwork",
    href: "https://upwork.com",
    color: "#14A800",
    bg: "rgba(20,168,0,0.08)",
  },
  {
    icon: SiFiverr,
    label: "Fiverr",
    href: "https://fiverr.com",
    color: "#1DBF73",
    bg: "rgba(29,191,115,0.08)",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:umairamjadkhanamazai@gmail.com",
    color: "#0369A1",
    bg: "rgba(3,105,161,0.08)",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSending(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setErrorMessage(resData.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network error. Please try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-base"
      style={{ background: "#FFFFFF" }}
    >
      {/* Orbs */}
      <div
        className="orb w-[500px] h-[500px] left-[-150px] bottom-[-150px] opacity-15"
        style={{ background: "radial-gradient(circle, #4F46E5, transparent 70%)" }}
      />
      <div
        className="orb w-[400px] h-[400px] right-[-100px] top-0 opacity-15"
        style={{ background: "radial-gradient(circle, #0284C7, transparent 70%)" }}
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
              color: "#4F46E5",
              background: "rgba(79,70,229,0.08)",
              border: "1px solid rgba(79,70,229,0.2)",
            }}
          >
            Get In Touch
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: "#0F172A" }}
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: "#475569" }}>
            Whether you have a project in mind, want to collaborate, or just
            want to say hi — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Info */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Info cards */}
            {[
              {
                icon: Mail,
                label: "Email",
                value: "umairamjadkhanamazai@gmail.com",
                href: "mailto:umairamjadkhanamazai@gmail.com",
                color: "#0369A1",
              },
              {
                icon: FaWhatsapp,
                label: "WhatsApp",
                value: "+92 317 0478541",
                href: "https://wa.me/923170478541",
                color: "#25D366",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Pakistan 🇵🇰 — Available Remotely",
                href: null,
                color: "#7C3AED",
              },
              {
                icon: MessageSquare,
                label: "Response Time",
                value: "Usually within 24 hours",
                href: null,
                color: "#4F46E5",
              },
            ].map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className="glass-card p-5 flex items-center gap-4"
                  style={{ border: `1px solid ${info.color}20` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${info.color}12`, border: `1px solid ${info.color}30` }}
                  >
                    <Icon size={20} color={info.color} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#64748B" }}>
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-medium transition-colors"
                        style={{ color: "#0F172A" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = info.color)}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#0F172A")}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: "#0F172A" }}>
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Social Links */}
            <div className="glass-card p-6" style={{ border: "1px solid #E2E8F0" }}>
              <p className="text-sm font-semibold mb-4" style={{ color: "#475569" }}>
                Connect With Me
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
                      className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        background: s.bg,
                        border: `1px solid ${s.color}25`,
                        color: s.color,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${s.color}25`;
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      }}
                    >
                      <Icon size={16} />
                      {s.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={2}
            className="lg:col-span-3"
          >
            <div
              className="glass-card p-8 relative overflow-hidden"
              style={{ border: "1px solid rgba(79,70,229,0.2)" }}
            >
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-px gradient-border" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <CheckCircle2 size={56} color="#0284C7" />
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: "#0F172A", fontFamily: "var(--font-space-grotesk, sans-serif)" }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: "#475569" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  id="contact-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  noValidate
                  suppressHydrationWarning
                >
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#334155" }}
                      >
                        Full Name <span style={{ color: "#4F46E5" }}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="John Doe"
                        className="form-input"
                        suppressHydrationWarning
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && (
                        <p className="text-xs mt-1.5 text-rose-600 font-medium">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#334155" }}
                      >
                        Email Address <span style={{ color: "#4F46E5" }}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        className="form-input"
                        suppressHydrationWarning
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-xs mt-1.5 text-rose-600 font-medium">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#334155" }}
                    >
                      Subject <span style={{ color: "#4F46E5" }}>*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Project Inquiry / Collaboration / Job Offer..."
                      className="form-input"
                      suppressHydrationWarning
                      {...register("subject", { required: "Subject is required" })}
                    />
                    {errors.subject && (
                      <p className="text-xs mt-1.5 text-rose-600 font-medium">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#334155" }}
                    >
                      Message <span style={{ color: "#4F46E5" }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell me about your project, idea, or opportunity..."
                      className="form-input resize-none"
                      suppressHydrationWarning
                      {...register("message", {
                        required: "Message is required",
                        minLength: { value: 20, message: "Message must be at least 20 characters" },
                      })}
                    />
                    {errors.message && (
                      <p className="text-xs mt-1.5 text-rose-600 font-medium">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    id="btn-submit-contact"
                    type="submit"
                    disabled={sending}
                    className="btn-primary justify-center mt-2"
                    style={{ opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
