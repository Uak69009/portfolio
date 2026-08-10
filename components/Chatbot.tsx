"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  RefreshCw,
  Minimize2,
} from "lucide-react";
import { useAccent } from "@/hooks/useTheme";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  quickActions?: Array<{ label: string; action: string }>;
}

const suggestedQuestions = [
  "🤖 What are your core AI skills?",
  "🚀 Tell me about your AI projects",
  "💼 What is icode Studios?",
  "📬 How can I contact or hire you?",
];

/** Knowledge base search engine for instant accurate responses */
function getAIResponse(userText: string): {
  text: string;
  quickActions?: Array<{ label: string; action: string }>;
} {
  const query = userText.toLowerCase();

  // Greetings
  if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.includes("greetings")) {
    return {
      text: "Hello! 👋 I'm **Umair's AI Assistant**. I can tell you all about Umair Amjad Khan's AI engineering expertise, projects, skills, or help you connect with him directly for custom AI solutions!",
      quickActions: [
        { label: "View Skills", action: "#skills" },
        { label: "View Projects", action: "#projects" },
        { label: "Contact Umair", action: "#contact" },
      ],
    };
  }

  // Skills & Tech Stack
  if (query.includes("skill") || query.includes("stack") || query.includes("tech") || query.includes("python") || query.includes("pytorch") || query.includes("framework")) {
    return {
      text: "Umair specializes in production-grade AI & Machine Learning:\n\n• **Generative AI & LLMs**: Fine-Tuning (LoRA / QLoRA), RAG Pipelines, LangChain, LlamaIndex, Vector DBs, Prompt Engineering\n• **Machine Learning & CV**: PyTorch, TensorFlow, Computer Vision, OpenCV, ResNeXt, YOLO, CNNs, LSTMs\n• **MLOps & Infrastructure**: Docker, FastAPI, Flask, CI/CD, Model Deployment & Monitoring\n• **Languages**: Python, C++, SQL",
      quickActions: [{ label: "Explore Technical Arsenal", action: "#skills" }],
    };
  }

  // Projects (Zari.AI, Deepfake, Cyber Defense)
  if (query.includes("project") || query.includes("zari") || query.includes("deepfake") || query.includes("cyber") || query.includes("work") || query.includes("portfolio")) {
    return {
      text: "Here are Umair's flagship AI projects:\n\n1. **Zari.AI**: Voice & WhatsApp-enabled AI crop disease diagnosis system with sub-200ms FastAPI backend.\n2. **Deepfake Detection Platform**: Dual-stream ResNeXt + LSTM pipeline with a Chrome Extension for real-time video verification.\n3. **Autonomous Cyber Defense**: Hierarchical Multi-Agent Reinforcement Learning (MARL) system for automated network threat detection.",
      quickActions: [{ label: "View All Projects", action: "#projects" }],
    };
  }

  // icode Studios
  if (query.includes("icode") || query.includes("studio") || query.includes("company") || query.includes("founder") || query.includes("ceo")) {
    return {
      text: "**icode Studios** (*\"you imagine, WE code\"*) is an AI engineering & custom software development studio founded by Umair Amjad Khan.\n\nWe build custom RAG architectures, LLM fine-tuning pipelines, agentic AI workflows, and full-stack web/mobile applications for clients globally.",
      quickActions: [{ label: "Get In Touch with icode Studios", action: "#contact" }],
    };
  }

  // Contact / Hire / Freelance / Pricing
  if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("whatsapp") || query.includes("upwork") || query.includes("fiverr") || query.includes("reach") || query.includes("freelance")) {
    return {
      text: "You can reach Umair directly through several channels:\n\n📧 **Email**: `umairamjadkhanamazai@gmail.com`  \n📱 **WhatsApp**: `+92 317 0478541`  \n🌐 **LinkedIn**: [Umair Amjad Khan](https://www.linkedin.com/in/umair-amjad-khan-yousafzai-85b6012ba/)  \n💼 **Freelance**: Available on Upwork & Fiverr for custom AI development.",
      quickActions: [
        { label: "Send Message Now", action: "#contact" },
        { label: "Download CV", action: "/cv.pdf" },
      ],
    };
  }

  // Experience / Education / Background
  if (query.includes("experience") || query.includes("education") || query.includes("giki") || query.includes("haripur") || query.includes("background") || query.includes("intern")) {
    return {
      text: "Umair's background:\n\n🎓 **BS in Artificial Intelligence** (University of Haripur, 2022–2026)\n🚀 **Advanced AI Bootcamp** (GIKI, 2026)\n💼 **Founder & CEO** @ icode Studios (2025–Present)\n⚡ **Machine Learning Intern** @ Avant Labs (2024–Present)\n📊 **Data Analytics** @ Galant Engineers (2023–2024)",
      quickActions: [{ label: "View Full Milestones", action: "#experience" }],
    };
  }

  // Certifications
  if (query.includes("certif") || query.includes("anthropic") || query.includes("ibm") || query.includes("coursera") || query.includes("vanderbilt") || query.includes("credential")) {
    return {
      text: "Umair holds verified certifications from industry leaders:\n\n• **Anthropic**: Claude 101 & AI Fluency Framework\n• **IBM**: Develop Generative AI Applications & Build RAG Applications\n• **Vanderbilt University**: Generative AI & Model Selection\n• **DeepLearning.AI**: AI For Everyone & LangGraph AI Agents",
      quickActions: [{ label: "View Credentials", action: "#certifications" }],
    };
  }

  // Default fallback answer
  return {
    text: "Thanks for your message! Umair specializes in building custom AI systems, LLM fine-tuning, RAG pipelines, and full-stack software. How can I assist you today?",
    quickActions: [
      { label: "View Core Skills", action: "#skills" },
      { label: "Explore AI Projects", action: "#projects" },
      { label: "Contact Umair", action: "#contact" },
    ],
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Hi! 👋 I'm **Umair's AI Assistant**. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDark, accent, accentAlt, accentBg, accentBorder } = useAccent();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(query);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickActions: response.quickActions,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: string) => {
    if (action.startsWith("#")) {
      const el = document.querySelector(action);
      el?.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    } else if (action.startsWith("/")) {
      window.open(action, "_blank");
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 min-h-[48px]"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #EAB308, #CA8A04)"
              : "linear-gradient(135deg, #1D4ED8, #1E40AF)",
            color: isDark ? "#0B1220" : "#FFFFFF",
            boxShadow: isDark
              ? "0 8px 25px rgba(234, 179, 8, 0.45)"
              : "0 8px 25px rgba(29, 78, 216, 0.4)",
          }}
          aria-label="Open AI Assistant Chat"
        >
          <div className="relative">
            <Bot size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-sm font-bold tracking-wide">
            {isOpen ? "Close AI" : "AI Assistant"}
          </span>
        </motion.button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border backdrop-blur-2xl"
            style={{
              background: isDark ? "rgba(12, 12, 12, 0.96)" : "rgba(255, 255, 255, 0.96)",
              borderColor: accentBorder(0.3),
              boxShadow: isDark
                ? "0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(234,179,8,0.15)"
                : "0 20px 50px rgba(0,0,0,0.15), 0 0 25px rgba(29,78,216,0.1)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between border-b"
              style={{
                background: accentBg(0.12),
                borderColor: accentBorder(0.2),
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{
                    background: accent,
                    color: isDark ? "#0B1220" : "#FFFFFF",
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3
                    className="font-bold text-sm leading-tight flex items-center gap-1.5"
                    style={{ color: "var(--text-heading)" }}
                  >
                    Umair&apos;s AI Assistant
                  </h3>
                  <p className="text-[11px] font-medium text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online &bull; Ready to help
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg transition-colors hover:bg-black/10 dark:hover:bg-white/10"
                  style={{ color: "var(--text-muted)" }}
                  aria-label="Minimize Chat"
                >
                  <Minimize2 size={16} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 scrollbar-thin">
              {messages.map((msg) => {
                const isAI = msg.sender === "ai";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAI ? "items-start" : "items-end"}`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%]">
                      {isAI && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-1 text-[10px] font-bold"
                          style={{
                            background: accentBg(0.2),
                            color: accent,
                          }}
                        >
                          AI
                        </div>
                      )}
                      <div
                        className="px-4 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line"
                        style={{
                          background: isAI
                            ? isDark
                              ? "rgba(28, 28, 28, 0.9)"
                              : "rgba(241, 245, 249, 0.9)"
                            : accent,
                          color: isAI
                            ? "var(--text-heading)"
                            : isDark
                            ? "#0B1220"
                            : "#FFFFFF",
                          borderTopLeftRadius: isAI ? "4px" : "16px",
                          borderTopRightRadius: isAI ? "16px" : "4px",
                          fontWeight: isAI ? 400 : 600,
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>

                    {/* Quick Action Buttons attached to AI messages */}
                    {isAI && msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 ml-8">
                        {msg.quickActions.map((qa) => (
                          <button
                            key={qa.label}
                            onClick={() => handleActionClick(qa.action)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200"
                            style={{
                              background: accentBg(0.12),
                              border: `1px solid ${accentBorder(0.3)}`,
                              color: accent,
                            }}
                          >
                            {qa.label}
                            <ArrowRight size={11} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 py-1">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: accentBg(0.2), color: accent }}
                  >
                    AI
                  </div>
                  <div className="flex gap-1 items-center bg-slate-200 dark:bg-zinc-800 px-3 py-2 rounded-2xl">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions Quick Strip */}
            <div
              className="px-3 py-2 overflow-x-auto flex gap-2 border-t scrollbar-none"
              style={{
                borderColor: accentBorder(0.15),
                background: isDark ? "rgba(0,0,0,0.2)" : "rgba(248,250,252,0.6)",
              }}
            >
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="flex-shrink-0 text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap transition-all duration-200"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(241,245,249,0.9)",
                    color: "var(--text-body)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div
              className="p-3 border-t flex items-center gap-2"
              style={{ borderColor: accentBorder(0.2) }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about Umair..."
                className="flex-1 bg-transparent px-3 py-2 text-xs focus:outline-none"
                style={{ color: "var(--text-heading)" }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-40"
                style={{
                  background: accent,
                  color: isDark ? "#0B1220" : "#FFFFFF",
                }}
                aria-label="Send Message"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
