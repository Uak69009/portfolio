"use client";

import { useState, FormEvent } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { useAccent } from "@/hooks/useTheme";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isTyping?: boolean;
}

export default function ChatInput({ onSendMessage, isTyping = false }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { isDark, accent, accentBg, accentBorder } = useAccent();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleMicToggle = async () => {
    if (typeof window === "undefined") return;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input requires Google Chrome, Edge, or Safari!");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      if (navigator.mediaDevices?.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (err) {
      alert("Microphone access denied. Please enable microphone permissions in your browser URL bar.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          setIsListening(false);
          onSendMessage(transcript);
          setInput("");
        }
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t flex items-center gap-2"
      style={{ borderColor: accentBorder(0.2) }}
    >
      {/* Microphone Push-to-Talk */}
      <button
        type="button"
        onClick={handleMicToggle}
        title={isListening ? "Listening... Click to stop" : "Speak via Microphone"}
        aria-label={isListening ? "Stop voice listening" : "Start voice listening"}
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
        placeholder={isListening ? "Listening to your voice..." : "Type or speak to the 3D Assistant..."}
        aria-label="Ask AI Assistant a question"
        className="flex-1 bg-transparent px-2 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded-lg"
        style={{ color: "var(--text-heading)" }}
      />

      <button
        type="submit"
        disabled={!input.trim() || isTyping}
        aria-label="Send message"
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-40 hover:scale-105"
        style={{
          background: accent,
          color: isDark ? "#0B1220" : "#FFFFFF",
        }}
      >
        <Send size={14} />
      </button>
    </form>
  );
}
