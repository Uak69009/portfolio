"use client";

import { useState } from "react";
import { X, Sparkles, Volume2, VolumeX, Box, Minimize2 } from "lucide-react";
import Chat3DScene from "./Chat3DScene";
import ChatMessages, { MessageItem } from "./ChatMessages";
import ChatSuggestions from "./ChatSuggestions";
import ChatInput from "./ChatInput";
import { useAccent } from "@/hooks/useTheme";
import { speakText, stopSpeaking } from "@/lib/speech";

interface ChatWindowProps {
  messages: MessageItem[];
  isTyping: boolean;
  isSpeaking: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => void;
  onActionClick: (action: string) => void;
}

export default function ChatWindow({
  messages,
  isTyping,
  isSpeaking,
  onClose,
  onSendMessage,
  onActionClick,
}: ChatWindowProps) {
  const [show3DAvatar, setShow3DAvatar] = useState(true);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const { isDark, accent, accentBg, accentBorder } = useAccent();

  const handleSendAndSpeak = (text: string) => {
    onSendMessage(text);
  };

  return (
    <div
      className="w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border backdrop-blur-2xl transition-all duration-300"
      style={{
        background: isDark ? "rgba(12, 12, 12, 0.96)" : "rgba(255, 255, 255, 0.96)",
        borderColor: accentBorder(0.3),
        boxShadow: isDark
          ? "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(234,179,8,0.18)"
          : "0 25px 60px rgba(0,0,0,0.18), 0 0 35px rgba(29,78,216,0.12)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between border-b relative z-10"
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
              Q (Question AI) &bull; 3D Avatar
            </h3>
            <p className="text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {isSpeaking ? "Speaking..." : "Interactive 3D Assistant"}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShow3DAvatar((v) => !v)}
            title={show3DAvatar ? "Hide 3D Avatar" : "Show 3D Avatar"}
            aria-label="Toggle 3D Avatar View"
            className="p-1.5 rounded-lg transition-colors hover:bg-black/10 dark:hover:bg-white/10"
            style={{ color: show3DAvatar ? accent : "var(--text-muted)" }}
          >
            <Box size={16} />
          </button>

          <button
            type="button"
            onClick={() => {
              setIsVoiceEnabled((v) => !v);
              if (isVoiceEnabled) stopSpeaking();
            }}
            title={isVoiceEnabled ? "Mute Voice" : "Enable Voice"}
            aria-label="Toggle Avatar Speech Output"
            className="p-1.5 rounded-lg transition-colors hover:bg-black/10 dark:hover:bg-white/10"
            style={{ color: isVoiceEnabled ? accent : "var(--text-muted)" }}
          >
            {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Chat Window"
            className="p-1.5 rounded-lg transition-colors hover:bg-black/10 dark:hover:bg-white/10"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* 3D Header Avatar Viewport */}
      {show3DAvatar && (
        <div className="relative w-full h-[180px] bg-gradient-to-b from-black/20 to-transparent flex-shrink-0 overflow-hidden border-b border-white/5">
          <Chat3DScene isSpeaking={isSpeaking} />

          <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center pointer-events-none">
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white/80 border border-white/10">
              WebGL 3D Avatar
            </span>
            {isSpeaking && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white animate-pulse">
                🔊 Audio Playing
              </span>
            )}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <ChatMessages
        messages={messages}
        isTyping={isTyping}
        onActionClick={onActionClick}
      />

      {/* Chat Prompt Suggestions */}
      <ChatSuggestions onSelectSuggestion={handleSendAndSpeak} />

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendAndSpeak} isTyping={isTyping} />
    </div>
  );
}
