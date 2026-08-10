"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Sparkles, Bot } from "lucide-react";
import { useAccent } from "@/hooks/useTheme";
import { MessageItem } from "./ChatMessages";
import { sendMessage } from "@/lib/chatbot/chatService";
import { speakText, stopSpeaking } from "@/lib/speech";

const Chat3DScene = dynamic(() => import("./Chat3DScene"), { ssr: false });
const ChatWindow = dynamic(() => import("./ChatWindow"), { ssr: false });

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Hi! I'm **Q (Question AI)**, your 3D AI assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const { isDark, accent, accentBg, accentBorder } = useAccent();

  // Keyboard accessibility: ESC key closes chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    stopSpeaking();

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const history = [...messages, userMsg].map((m) => ({
      role: m.sender === "ai" ? ("assistant" as const) : ("user" as const),
      content: m.text,
    }));

    try {
      const response = await sendMessage(text, history);

      const aiMsg: MessageItem = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickActions: response.quickActions,
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (isVoiceEnabled) {
        speakText(
          response.reply,
          () => setIsSpeaking(true),
          () => setIsSpeaking(false)
        );
      }
    } catch (err) {
      console.error("AIChatbot error:", err);
      const errorMsg: MessageItem = {
        id: `error-${Date.now()}`,
        sender: "ai",
        isError: true,
        text: "Connection warning. Feel free to contact Umair directly at umairamjadkhanamazai@gmail.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
      {/* Floating 3D AI Assistant Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          type="button"
          tabIndex={0}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex items-center gap-3 p-1.5 pr-5 rounded-full shadow-2xl transition-all duration-300 min-h-[56px] backdrop-blur-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          style={{
            background: isDark
              ? "rgba(18, 18, 18, 0.92)"
              : "rgba(255, 255, 255, 0.92)",
            borderColor: accentBorder(isHovered ? 0.6 : 0.35),
            color: "var(--text-heading)",
            boxShadow: isHovered
              ? isDark
                ? "0 12px 35px rgba(0, 0, 0, 0.9), 0 0 28px rgba(234, 179, 8, 0.35)"
                : "0 12px 35px rgba(0, 0, 0, 0.2), 0 0 28px rgba(29, 78, 216, 0.3)"
              : isDark
              ? "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(234, 179, 8, 0.2)"
              : "0 10px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(29, 78, 216, 0.15)",
          }}
          aria-label={isOpen ? "Close 3D AI Assistant" : "Open 3D AI Assistant"}
        >
          {/* Circular 3D Scene Container */}
          <div
            className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2"
            style={{
              borderColor: accent,
              background: isDark ? "#0A0A0A" : "#F1F5F9",
              boxShadow: `0 0 12px ${accentBg(0.5)}`,
            }}
          >
            <Chat3DScene isHovered={isHovered} isSpeaking={isSpeaking} />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-extrabold tracking-tight flex items-center gap-1" style={{ color: "var(--text-heading)" }}>
              <span>{isOpen ? "Close Q" : "Q AI (Question AI)"}</span>
              <Sparkles size={11} style={{ color: accent }} />
            </span>
            <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {isOpen ? "Click to collapse" : "Live 3D &bull; Ask Q"}
            </span>
          </div>
        </motion.button>
      </div>

      {/* Floating Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50"
          >
            <ChatWindow
              messages={messages}
              isTyping={isTyping}
              isSpeaking={isSpeaking}
              onClose={() => setIsOpen(false)}
              onSendMessage={handleSendMessage}
              onActionClick={handleActionClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
