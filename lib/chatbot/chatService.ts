/**
 * API Service Abstraction for AI Chatbot
 * Communicates with /api/chat (or custom OpenAI / RAG / Agent backend)
 */

export interface ChatServiceResponse {
  reply: string;
  quickActions?: Array<{ label: string; action: string }>;
}

export interface ChatHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export async function sendMessage(
  message: string,
  history: ChatHistoryMessage[] = []
): Promise<ChatServiceResponse> {
  try {
    const conversationHistory = [...history, { role: "user", content: message }].slice(-6);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversationHistory }),
    });

    if (!res.ok) {
      throw new Error(`Chat API error: ${res.statusText}`);
    }

    const data = await res.json();
    return {
      reply: data.reply || "Thank you for your inquiry. How else can I assist you today?",
      quickActions: data.quickActions,
    };
  } catch (error) {
    console.warn("Chat service fallback error:", error);

    // Mock / Fallback responses for local development or offline state
    const query = message.toLowerCase();

    if (query.includes("website") || query.includes("about")) {
      return {
        reply: "This website is the official portfolio of **Umair Amjad Khan** — Founder & CEO at **icode Studios** and AI & Machine Learning Engineer specializing in LLM pipelines, RAG architectures, and production AI systems.",
        quickActions: [
          { label: "View About", action: "#about" },
          { label: "Core Skills", action: "#skills" },
        ],
      };
    }

    if (query.includes("service") || query.includes("offer") || query.includes("studio")) {
      return {
        reply: "At **icode Studios** (*\"you imagine, WE code\"*), we offer custom RAG architectures, LLM fine-tuning solutions, multi-agent AI workflows, and scalable full-stack web/mobile applications.",
        quickActions: [{ label: "Start a Project", action: "#contact" }],
      };
    }

    if (query.includes("project") || query.includes("start") || query.includes("contact") || query.includes("team")) {
      return {
        reply: "You can connect with Umair directly at `umairamjadkhanamazai@gmail.com` or via WhatsApp at `+92 317 0478541` to start a project or schedule a technical consultation.",
        quickActions: [{ label: "Send Direct Inquiry", action: "#contact" }],
      };
    }

    return {
      reply: "Thank you for reaching out! I'm your 3D AI Assistant representing Umair Amjad Khan & icode Studios. How can I help you explore services, skills, or projects today?",
      quickActions: [
        { label: "Technical Arsenal", action: "#skills" },
        { label: "Featured Work", action: "#projects" },
        { label: "Contact Us", action: "#contact" },
      ],
    };
  }
}
