"use client";

import { useAccent } from "@/hooks/useTheme";

const suggestions = [
  "Tell me about this website",
  "What services do you offer?",
  "Start a project",
  "Contact the team",
];

interface ChatSuggestionsProps {
  onSelectSuggestion: (text: string) => void;
}

export default function ChatSuggestions({ onSelectSuggestion }: ChatSuggestionsProps) {
  const { isDark } = useAccent();

  return (
    <div
      className="px-3 py-2 border-t overflow-x-auto flex gap-2 scrollbar-none"
      style={{
        borderColor: "var(--border-color)",
        background: isDark ? "rgba(0,0,0,0.25)" : "rgba(248,250,252,0.8)",
      }}
    >
      {suggestions.map((text) => (
        <button
          key={text}
          type="button"
          onClick={() => onSelectSuggestion(text)}
          className="flex-shrink-0 text-[11px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 hover:scale-105"
          style={{
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(241,245,249,0.9)",
            color: "var(--text-body)",
            border: "1px solid var(--border-color)",
          }}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
