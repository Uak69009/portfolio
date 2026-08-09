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
import { FaLinkedinIn } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: "easeOut" },
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
    color: "#F9FAFB",
    bg: "rgba(255,255,255,0.06)",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://linkedin.com/in/umairamjadkhan",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.1)",
  },
  {
    icon: SiUpwork,
    label: "Upwork",
    href: "https://upwork.com",
    color: "#6FDA44",
    bg: "rgba(111,218,68,0.1)",
  },
  {
    icon: SiFiverr,
    label: "Fiverr",
    href: "https://fiverr.com",
    color: "#1DBF73",
    bg: "rgba(29,191,115,0.1)",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:umairamjadkhan@gmail.com",
    color: "#00F2FE",
    bg: "rgba(0,242,254,0.1)",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSending(true);
    // Simulate async send (replace with your API / EmailJS / Formspree endpoint)
    await new Promise((r) => setTimeout(r, 1400));
    console.log("Form data:", data);
    setSubmitted(true);
    setSending(false);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      className="section-base"
      style={{ background: "linear-gradient(180deg, #0B0F19 0%, #111827 100%)" }}
    >
      {/* Orbs */}
      <div
        className="orb w-[500px] h-[500px] left-[-150px] bottom-[-150px] opacity-10"
        style={{ background: "radial-gradient(circle, #6366F1, transparent 70%)" }}
      />
      <div
        className="orb w-[400px] h-[400px] right-[-100px] top-0 opacity-10"
        style={{ background: "radial-gradient(circle, #00F2FE, transparent 70%)" }}
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
            Get In Touch
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)", color: "#F9FAFB" }}
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: "#9CA3AF" }}>
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
                value: "umairamjadkhan@gmail.com",
                href: "mailto:umairamjadkhan@gmail.com",
                color: "#00F2FE",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Pakistan 🇵🇰 — Available Remotely",
                href: null,
                color: "#8B5CF6",
              },
              {
                icon: MessageSquare,
                label: "Response Time",
                value: "Usually within 24 hours",
                href: null,
                color: "#6366F1",
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
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#6B7280" }}>
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-medium transition-colors"
                        style={{ color: "#E5E7EB" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = info.color)}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#E5E7EB")}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: "#E5E7EB" }}>
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Social Links */}
            <div className="glass-card p-6" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-sm font-semibold mb-4" style={{ color: "#9CA3AF" }}>
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
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        background: s.bg,
                        border: `1px solid ${s.color}25`,
                        color: s.color,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${s.color}30`;
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
              style={{ border: "1px solid rgba(99,102,241,0.2)" }}
            >
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-px gradient-border" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <CheckCircle2 size={56} color="#00F2FE" />
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: "#F9FAFB", fontFamily: "var(--font-space-grotesk, sans-serif)" }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: "#9CA3AF" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  id="contact-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#D1D5DB" }}
                      >
                        Full Name <span style={{ color: "#6366F1" }}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="John Doe"
                        className="form-input"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && (
                        <p className="text-xs mt-1.5" style={{ color: "#F87171" }}>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#D1D5DB" }}
                      >
                        Email Address <span style={{ color: "#6366F1" }}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        className="form-input"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-xs mt-1.5" style={{ color: "#F87171" }}>
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
                      style={{ color: "#D1D5DB" }}
                    >
                      Subject <span style={{ color: "#6366F1" }}>*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Project Inquiry / Collaboration / Job Offer..."
                      className="form-input"
                      {...register("subject", { required: "Subject is required" })}
                    />
                    {errors.subject && (
                      <p className="text-xs mt-1.5" style={{ color: "#F87171" }}>
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#D1D5DB" }}
                    >
                      Message <span style={{ color: "#6366F1" }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell me about your project, idea, or opportunity..."
                      className="form-input resize-none"
                      {...register("message", {
                        required: "Message is required",
                        minLength: { value: 20, message: "Message must be at least 20 characters" },
                      })}
                    />
                    {errors.message && (
                      <p className="text-xs mt-1.5" style={{ color: "#F87171" }}>
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
