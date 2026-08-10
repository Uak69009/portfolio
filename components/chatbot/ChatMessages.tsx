"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
import { useAccent } from "@/hooks/useTheme";

export interface MessageItem {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  quickActions?: Array<{ label: string; action: string }>;
  isError?: boolean;
}

interface ChatMessagesProps {
  messages: MessageItem[];
  isTyping?: boolean;
  onActionClick?: (action: string) => void;
}

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

export default function ChatMessages({
  messages,
  isTyping = false,
  onActionClick,
}: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const { isDark, accent, accentBg, accentBorder } = useAccent();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
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
                  {msg.isError ? <AlertCircle size={13} /> : "Q"}
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

            {/* Quick Actions */}
            {isAI && msg.quickActions && msg.quickActions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 ml-8">
                {msg.quickActions.map((qa) => (
                  <button
                    key={qa.label}
                    onClick={() => onActionClick?.(qa.action)}
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

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-center gap-2 text-xs text-slate-400 py-1">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{ background: accentBg(0.2), color: accent }}
          >
            Q
          </div>
          <div className="flex gap-1 items-center bg-slate-200 dark:bg-zinc-800 px-3.5 py-2 rounded-2xl">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}
