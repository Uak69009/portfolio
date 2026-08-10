import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/ai-system-prompt";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/** Fallback enterprise response generator when external LLM API keys are not configured or fail */
function getEnterpriseFallback(userMessage: string): {
  reply: string;
  quickActions?: Array<{ label: string; action: string }>;
} {
  const query = userMessage.toLowerCase();

  // Out of scope check
  const outOfScopeKeywords = ["recipe", "cook", "politics", "president", "weather", "crypto price", "joke", "song", "movie"];
  if (outOfScopeKeywords.some((k) => query.includes(k))) {
    return {
      reply: "I am Q (Question AI / QAI), specialized strictly as the AI Assistant for Umair Amjad Khan and icode Studios. I can assist you with questions regarding Umair's AI engineering capabilities, projects, technical arsenal, or booking a consultation.",
      quickActions: [
        { label: "View Core Skills", action: "#skills" },
        { label: "Explore AI Projects", action: "#projects" },
        { label: "Contact Umair", action: "#contact" },
      ],
    };
  }

  // Skills
  if (query.includes("skill") || query.includes("stack") || query.includes("tech") || query.includes("python") || query.includes("pytorch")) {
    return {
      reply: "Umair Amjad Khan specializes in production-grade AI & Machine Learning:\n\n• **Generative AI & LLMs**: Fine-Tuning (LoRA / QLoRA), RAG Pipelines, LangChain, LlamaIndex, Vector DBs, Prompt Engineering\n• **Deep Learning & Computer Vision**: PyTorch, TensorFlow, OpenCV, ResNeXt, YOLO, CNNs, LSTMs\n• **MLOps & Infrastructure**: Docker, FastAPI, Flask, CI/CD, Model Deployment & Monitoring\n• **Languages**: Python, C++, SQL",
      quickActions: [{ label: "Explore Technical Arsenal", action: "#skills" }],
    };
  }

  // Projects
  if (query.includes("project") || query.includes("zari") || query.includes("deepfake") || query.includes("cyber") || query.includes("portfolio")) {
    return {
      reply: "Umair's flagship production AI projects:\n\n1. **Zari.AI**: Voice & WhatsApp-enabled AI crop disease diagnosis system with sub-200ms FastAPI backend.\n2. **Deepfake Detection Platform**: Dual-stream ResNeXt + LSTM video verification pipeline (90%+ accuracy) with Chrome Extension.\n3. **Autonomous Cyber Defense**: Hierarchical Multi-Agent Reinforcement Learning (MARL) for network threat mitigation.",
      quickActions: [{ label: "View Featured Projects", action: "#projects" }],
    };
  }

  // Studio / Services
  if (query.includes("icode") || query.includes("studio") || query.includes("service") || query.includes("company")) {
    return {
      reply: "**icode Studios** (*\"you imagine, WE code\"*) is an AI engineering & custom software development studio founded by Umair Amjad Khan.\n\nWe specialize in custom RAG architectures, LLM fine-tuning, autonomous multi-agent systems, and full-stack web/mobile applications for global clients.",
      quickActions: [{ label: "Schedule Consultation", action: "#contact" }],
    };
  }

  // Contact / Hire
  if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("whatsapp") || query.includes("upwork") || query.includes("fiverr")) {
    return {
      reply: "You can reach Umair Amjad Khan directly:\n\n📧 **Email**: `umairamjadkhanamazai@gmail.com`  \n📱 **WhatsApp**: `+92 317 0478541`  \n🌐 **LinkedIn**: [Umair Amjad Khan](https://www.linkedin.com/in/umair-amjad-khan-yousafzai-85b6012ba/)  \n💼 **Freelance**: Available on Upwork & Fiverr.",
      quickActions: [
        { label: "Send Direct Message", action: "#contact" },
        { label: "Download CV", action: "/cv.pdf" },
      ],
    };
  }

  // Credentials / Education
  if (query.includes("certif") || query.includes("education") || query.includes("degree") || query.includes("giki") || query.includes("anthropic") || query.includes("ibm")) {
    return {
      reply: "Umair's Credentials & Education:\n\n🎓 **BS in Artificial Intelligence** (University of Haripur, 2022–2026)\n🚀 **Advanced AI Bootcamp** (GIKI, 2026)\n🏆 **Anthropic Certifications**: Claude 101 & AI Fluency\n🏆 **IBM Certifications**: Generative AI Apps & RAG Architectures\n🏆 **Vanderbilt University**: Generative AI & Model Selection",
      quickActions: [{ label: "View Credentials", action: "#certifications" }],
    };
  }

  // General default response
  return {
    reply: "I am Q (Question AI / QAI), the AI Representative for Umair Amjad Khan (Founder & CEO @ icode Studios). How can I assist you with questions regarding Umair's AI engineering capabilities, production RAG & LLM pipelines, featured projects, or booking a consultation?",
    quickActions: [
      { label: "Core Skills", action: "#skills" },
      { label: "AI Projects", action: "#projects" },
      { label: "Contact", action: "#contact" },
    ],
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid message payload." }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1]?.content || "";

    // 1. Sliding Window Context Management (Max last 6 messages = 3 turns)
    const MAX_CONTEXT_WINDOW = 6;
    const truncatedHistory = messages.slice(-MAX_CONTEXT_WINDOW);

    // 2. Check for OpenAI or Groq API Key
    const apiKey = process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;
    const apiEndpoint = process.env.GROQ_API_KEY
      ? "https://api.groq.com/openai/v1/chat/completions"
      : "https://api.openai.com/v1/chat/completions";
    const modelName = process.env.GROQ_API_KEY ? "llama-3.3-70b-versatile" : "gpt-4o-mini";

    if (apiKey) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: modelName,
            temperature: 0.2, // Low temperature for high precision & no hallucinations
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...truncatedHistory.map((m) => ({
                role: m.role === "assistant" ? "assistant" : "user",
                content: m.content,
              })),
            ],
          }),
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              quickActions: [
                { label: "View Skills", action: "#skills" },
                { label: "View Projects", action: "#projects" },
                { label: "Contact Umair", action: "#contact" },
              ],
            });
          }
        }
      } catch (err) {
        console.warn("LLM API call timed out or failed. Switching to Enterprise Knowledge Engine.", err);
      }
    }

    // 3. Fallback to Enterprise Knowledge Engine (Deterministic & High-speed)
    const fallbackResult = getEnterpriseFallback(latestUserMessage);
    return NextResponse.json(fallbackResult);
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json({
      reply: "I am currently experiencing a temporary connection issue. Please feel free to reach out to Umair directly at umairamjadkhanamazai@gmail.com or via WhatsApp at +92 317 0478541.",
      quickActions: [{ label: "Contact Directly", action: "#contact" }],
    });
  }
}
