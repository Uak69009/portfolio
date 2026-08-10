"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Send,
  Sparkles,
  Bot,
  ArrowRight,
  Minimize2,
  AlertCircle,
  RotateCcw,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  User,
  Box,
} from "lucide-react";
import { useAccent } from "@/hooks/useTheme";
import { speakText, stopSpeaking } from "@/lib/speech";

const Avatar3DCanvas = dynamic(() => import("./Avatar3DCanvas"), {
  ssr: false,
});

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  quickActions?: Array<{ label: string; action: string }>;
  isError?: boolean;
}

const suggestedQuestions = [
  "🎯 What are your core AI skills?",
  "🚀 Tell me about your AI projects",
  "💼 What is icode Studios?",
  "📬 How can I contact or hire you?",
];

/** Utility to format basic Markdown bolding, bullets, and links safely */
function renderFormattedText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, lIdx) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        <a
          key={`${lIdx}-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:opacity-80"
        >
          {label}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    const content = parts.map((part, pIdx) => {
      if (typeof part !== "string") return part;
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith("**") && bPart.endsWith("**")) {
          return (
            <strong key={`${pIdx}-${bIdx}`} className="font-bold">
              {bPart.slice(2, -2)}
            </strong>
          );
        }
        return bPart;
      });
    });

    return (
      <span key={lIdx} className="block min-h-[1.2em]">
        {content}
      </span>
    );
  });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [show3DAvatar, setShow3DAvatar] = useState(true);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Hello! 👋 I am **Umair's Live 3D AI Avatar**. How may I assist you today with information regarding Umair's AI engineering capabilities, production projects, or icode Studios?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDark, accent, accentBg, accentBorder } = useAccent();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Speech-to-Text Push-to-Talk setup using Web Speech API
  const handleMicToggle = () => {
    if (typeof window === "undefined") return;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser. Try Chrome or Edge!");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      stopSpeaking();
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      handleSend(transcript);
    };

    recognition.onerror = (err: any) => {
      console.error("Speech recognition error:", err);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    stopSpeaking();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);
    setLastFailedMessage(null);

    const conversationHistory = [...messages, userMsg].slice(-6).map((m) => ({
      role: m.sender === "ai" ? "assistant" : "user",
      content: m.text,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!res.ok) throw new Error("API response error");

      const data = await res.json();
      const replyText = data.reply || "Thank you for reaching out. How else can I assist you?";

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickActions: data.quickActions,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Trigger TTS Audio & Viseme Lip-Syncing if Voice is Enabled
      if (isVoiceEnabled) {
        speakText(
          replyText,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      setLastFailedMessage(query);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        sender: "ai",
        isError: true,
        text: "Notice: Unable to establish live connection. Please email `umairamjadkhanamazai@gmail.com` or click retry.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickActions: [{ label: "Contact Directly", action: "#contact" }],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
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
      {/* Floating Trigger Button with LIVE 3D Avatar */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex items-center gap-3 p-1.5 pr-5 rounded-full shadow-2xl transition-all duration-300 min-h-[56px] backdrop-blur-xl border"
          style={{
            background: isDark
              ? "rgba(18, 18, 18, 0.92)"
              : "rgba(255, 255, 255, 0.92)",
            borderColor: accentBorder(0.35),
            color: "var(--text-heading)",
            boxShadow: isDark
              ? "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(234, 179, 8, 0.25)"
              : "0 10px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(29, 78, 216, 0.2)",
          }}
          aria-label="Open 3D AI Avatar Chat"
        >
          {/* Live Mini 3D Avatar Circle Viewport */}
          <div
            className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2"
            style={{
              borderColor: accent,
              background: isDark ? "#0A0A0A" : "#F1F5F9",
              boxShadow: `0 0 12px ${accentBg(0.5)}`,
            }}
          >
            <Avatar3DCanvas
              isDark={isDark}
              accentColor={accent}
              isSpeaking={isSpeaking}
            />
            {/* Live Green Status Dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-extrabold tracking-tight flex items-center gap-1" style={{ color: "var(--text-heading)" }}>
              <span>{isOpen ? "Close Avatar" : "Umair's 3D AI"}</span>
              <Sparkles size={11} style={{ color: accent }} />
            </span>
            <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {isOpen ? "Click to minimize" : "Live 3D &bull; Chat Now"}
            </span>
          </div>
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
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border backdrop-blur-2xl"
            style={{
              background: isDark ? "rgba(12, 12, 12, 0.96)" : "rgba(255, 255, 255, 0.96)",
              borderColor: accentBorder(0.3),
              boxShadow: isDark
                ? "0 20px 50px rgba(0,0,0,0.85), 0 0 30px rgba(234,179,8,0.15)"
                : "0 20px 50px rgba(0,0,0,0.15), 0 0 30px rgba(29,78,216,0.1)",
            }}
          >
            {/* Header Controls */}
            <div
              className="px-4 py-3 flex items-center justify-between border-b"
              style={{
                background: accentBg(0.12),
                borderColor: accentBorder(0.2),
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md"
                  style={{
                    background: accent,
                    color: isDark ? "#0B1220" : "#FFFFFF",
                  }}
                >
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3
                    className="font-bold text-xs sm:text-sm leading-tight flex items-center gap-1.5"
                    style={{ color: "var(--text-heading)" }}
                  >
                    3D AI Avatar &bull; Umair
                  </h3>
                  <p className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {isSpeaking ? "Speaking..." : isListening ? "Listening..." : "Interactive & Online"}
                  </p>
                </div>
              </div>

              {/* Action Buttons: 3D View, Mute, Minimize */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShow3DAvatar((v) => !v)}
                  title={show3DAvatar ? "Hide 3D Avatar" : "Show 3D Avatar"}
                  className="p-1.5 rounded-lg transition-colors hover:bg-black/10 dark:hover:bg-white/10"
                  style={{ color: show3DAvatar ? accent : "var(--text-muted)" }}
                >
                  <Box size={16} />
                </button>

                <button
                  onClick={() => {
                    setIsVoiceEnabled((v) => !v);
                    if (isVoiceEnabled) stopSpeaking();
                  }}
                  title={isVoiceEnabled ? "Mute Voice" : "Enable Voice"}
                  className="p-1.5 rounded-lg transition-colors hover:bg-black/10 dark:hover:bg-white/10"
                  style={{ color: isVoiceEnabled ? accent : "var(--text-muted)" }}
                >
                  {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>

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

            {/* 3D Animated Avatar Viewport */}
            {show3DAvatar && (
              <div className="relative w-full h-[180px] bg-gradient-to-b from-black/20 to-transparent flex-shrink-0 overflow-hidden border-b border-white/5">
                <Avatar3DCanvas
                  isDark={isDark}
                  accentColor={accent}
                  isSpeaking={isSpeaking}
                />

                {/* Subtitle Badge over 3D Canvas */}
                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center pointer-events-none">
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white/80 border border-white/10">
                    Real-Time Viseme Lip-Sync
                  </span>
                  {isSpeaking && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white animate-pulse">
                      🔊 Audio Playing
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 scrollbar-thin">
              {messages.map((msg) => {
                const isAI = msg.sender === "ai";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAI ? "items-start" : "items-end"}`}
                  >
                    <div className="flex items-end gap-2 max-w-[88%]">
                      {isAI && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-1 text-[10px] font-bold"
                          style={{
                            background: msg.isError ? "rgba(225,29,72,0.15)" : accentBg(0.2),
                            color: msg.isError ? "#E11D48" : accent,
                          }}
                        >
                          {msg.isError ? <AlertCircle size={13} /> : "AI"}
                        </div>
                      )}
                      <div
                        className="px-4 py-2.5 rounded-2xl text-xs leading-relaxed"
                        style={{
                          background: isAI
                            ? msg.isError
                              ? "rgba(225,29,72,0.08)"
                              : isDark
                              ? "rgba(28, 28, 28, 0.9)"
                              : "rgba(241, 245, 249, 0.9)"
                            : accent,
                          color: isAI
                            ? msg.isError
                              ? "#E11D48"
                              : "var(--text-heading)"
                            : isDark
                            ? "#0B1220"
                            : "#FFFFFF",
                          borderTopLeftRadius: isAI ? "4px" : "16px",
                          borderTopRightRadius: isAI ? "16px" : "4px",
                          border: msg.isError ? "1px solid rgba(225,29,72,0.3)" : undefined,
                        }}
                      >
                        {renderFormattedText(msg.text)}
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>

                    {/* Quick Action Buttons */}
                    {isAI && msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 ml-8">
                        {msg.quickActions.map((qa) => (
                          <button
                            key={qa.label}
                            onClick={() => handleActionClick(qa.action)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 hover:scale-105"
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

              {/* Retry button */}
              {lastFailedMessage && !isTyping && (
                <div className="flex justify-center my-1">
                  <button
                    onClick={() => handleSend(lastFailedMessage)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 hover:scale-105 transition-all"
                  >
                    <RotateCcw size={12} />
                    Retry Last Query
                  </button>
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 py-1">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: accentBg(0.2), color: accent }}
                  >
                    AI
                  </div>
                  <div className="flex gap-1 items-center bg-slate-200 dark:bg-zinc-800 px-3.5 py-2 rounded-2xl">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions Strip */}
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
                  onClick={() => handleSend(q.replace(/^[^\s]+\s*/, ""))}
                  className="flex-shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 hover:scale-105"
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

            {/* Input Form with Push-to-Talk Microphone */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t flex items-center gap-2"
              style={{ borderColor: accentBorder(0.2) }}
            >
              {/* Push-to-Talk Mic Button */}
              <button
                type="button"
                onClick={handleMicToggle}
                title={isListening ? "Listening... Click to stop" : "Speak via Microphone"}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isListening ? "animate-pulse ring-2 ring-rose-500 bg-rose-500 text-white" : ""
                }`}
                style={{
                  background: isListening ? "#E11D48" : accentBg(0.15),
                  color: isListening ? "#FFFFFF" : accent,
                  border: `1px solid ${accentBorder(0.3)}`,
                }}
              >
                {isListening ? <MicOff size={14} /> : <Mic size={14} />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening to your voice..." : "Type or speak to the 3D Avatar..."}
                className="flex-1 bg-transparent px-2 py-2 text-xs focus:outline-none"
                style={{ color: "var(--text-heading)" }}
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-40 hover:scale-105"
                style={{
                  background: accent,
                  color: isDark ? "#0B1220" : "#FFFFFF",
                }}
                aria-label="Send Message"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
