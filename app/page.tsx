import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/chatbot/AIChatbot";
import Image from "next/image";

/**
 * SEO & GEO Content Block — Server-rendered, visually hidden, fully crawlable.
 *
 * Since every visible component uses "use client", Google's crawler sees empty HTML.
 * This block provides ALL key content as semantic HTML that search engines AND AI
 * crawlers (GPTBot, PerplexityBot, ClaudeBot, etc.) can index and extract.
 *
 * NOTE: Do NOT add aria-hidden="true" here — it tells some AI crawlers to skip content.
 * Instead we use the sr-only pattern (visually hidden but fully readable).
 */
function SEOContent() {
  return (
    <div
      className="seo-content"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
      }}
    >
      <article itemScope itemType="https://schema.org/Person">
        <h1 itemProp="name">Umair Amjad Khan — AI &amp; Machine Learning Engineer | MLOps &amp; LLMOps Specialist</h1>
        <p itemProp="jobTitle">AI &amp; Machine Learning Engineer</p>
        <p itemProp="description">
          Umair Amjad Khan is an AI and Machine Learning Engineer and the Founder &amp; CEO of icode Studios.
          He specializes in building production-grade AI systems, Large Language Model (LLM) pipelines,
          Retrieval Augmented Generation (RAG) architectures, Computer Vision solutions, MLOps workflows,
          and LLMOps pipelines. Based in Pakistan, Umair works with clients worldwide delivering intelligent
          software applications.
        </p>

        <Image
          itemProp="image"
          src="/profile-image.jpg"
          alt="Umair Amjad Khan — AI and Machine Learning Engineer"
          width={300}
          height={375}
          priority={false}
          loading="eager"
        />

        <div itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
          <span itemProp="name">icode Studios</span>
          <span itemProp="description">AI Engineering &amp; Custom Software Development Studio — you imagine, WE code</span>
          <meta itemProp="url" content="https://www.linkedin.com/company/139384016/" />
        </div>

        {/* ── About Section ── */}
        <section aria-label="About Umair Amjad Khan">
          <h2>About Umair Amjad Khan</h2>
          <p>
            Umair Amjad Khan is the Founder and CEO at icode Studios, an AI engineering and custom software
            development studio. He is an AI and Machine Learning Engineer specializing in building production-grade
            intelligent systems. At icode Studios, he leads software architecture and AI engineering initiatives,
            delivering custom RAG pipelines, LLM fine-tuning solutions, and scalable web and mobile applications
            for clients worldwide. His technical expertise spans deep learning, computer vision, and full-stack
            MLOps — containerizing models with Docker, exposing high-throughput FastAPI backends, and building
            interactive software products.
          </p>
        </section>

        {/* ── MLOps & LLMOps Expertise Section ── */}
        <section aria-label="MLOps and LLMOps Expertise">
          <h2>MLOps &amp; LLMOps Expertise of Umair Amjad Khan</h2>
          <p>
            Umair Amjad Khan is an MLOps and LLMOps specialist who builds end-to-end machine learning
            operations pipelines for production AI systems. His MLOps expertise includes Docker containerization,
            CI/CD pipelines for ML model deployment, model monitoring and observability, feature stores,
            and model registries. His LLMOps expertise includes LLM evaluation frameworks, guardrails for
            LLM safety, prompt versioning systems, LLM observability with LangSmith, and production deployment
            of Large Language Model pipelines. Umair Amjad Khan designs and implements MLOps and LLMOps
            workflows that ensure AI systems run reliably at scale in production environments.
          </p>
        </section>

        {/* ── Skills Section ── */}
        <section aria-label="Skills and Technologies">
          <h2>Skills &amp; Technologies of Umair Amjad Khan</h2>
          <ul>
            <li>Python</li>
            <li>PyTorch</li>
            <li>TensorFlow</li>
            <li>Machine Learning</li>
            <li>Deep Learning</li>
            <li>Large Language Models (LLMs)</li>
            <li>LLM Fine-Tuning (LoRA, QLoRA)</li>
            <li>Retrieval Augmented Generation (RAG)</li>
            <li>Computer Vision</li>
            <li>Object Detection (YOLO)</li>
            <li>Natural Language Processing (NLP)</li>
            <li>Multi-Agent Systems</li>
            <li>Agentic Workflows</li>
            <li>Reinforcement Learning</li>
            <li>Generative AI</li>
            <li>MLOps</li>
            <li>LLMOps</li>
            <li>ML Pipeline Orchestration</li>
            <li>Model Monitoring &amp; Observability</li>
            <li>LLM Evaluation &amp; Guardrails</li>
            <li>LLM Observability (LangSmith)</li>
            <li>Prompt Versioning</li>
            <li>CI/CD for ML</li>
            <li>Docker</li>
            <li>FastAPI</li>
            <li>LangChain</li>
            <li>LangGraph</li>
            <li>LlamaIndex</li>
            <li>OpenCV</li>
            <li>Prompt Engineering</li>
            <li>Vector Databases</li>
            <li>Neural Networks</li>
            <li>Transformer Architecture</li>
            <li>Next.js</li>
            <li>React</li>
            <li>TypeScript</li>
            <li>Flask</li>
            <li>Git &amp; GitHub</li>
            <li>REST APIs</li>
          </ul>
        </section>

        {/* ── Projects Section ── */}
        <section aria-label="Featured AI Projects">
          <h2>Featured AI Projects by Umair Amjad Khan</h2>

          <article>
            <h3>Zari.AI — Agricultural Disease Detection</h3>
            <p>
              Umair Amjad Khan built Zari.AI, a voice-enabled AI system providing real-time crop disease diagnosis
              via web and WhatsApp interfaces. Zari.AI helps farmers in rural areas detect diseases and get actionable
              treatment recommendations instantly through natural conversation. Built with Python, Computer Vision,
              Speech Processing, FastAPI, WhatsApp API, and PyTorch. Features real-time disease detection via camera
              input, multi-language voice interface, WhatsApp integration for field accessibility, and FastAPI
              backend with sub-200ms response.
            </p>
          </article>

          <article>
            <h3>Deepfake Detection Platform — ResNeXt + LSTM Pipeline</h3>
            <p>
              Umair Amjad Khan developed an end-to-end deepfake video verification pipeline combining ResNeXt
              spatial feature extraction with LSTM temporal analysis. Includes a Flask backend API and a Chrome
              Extension for real-time browser-based verification of media authenticity. Built with PyTorch, ResNeXt,
              LSTM, Flask, Chrome Extension API, and OpenCV. Achieves 90%+ detection accuracy on benchmark datasets
              with frame-level confidence scoring.
            </p>
          </article>

          <article>
            <h3>Autonomous Cyber Defense System — Multi-Agent Reinforcement Learning</h3>
            <p>
              Umair Amjad Khan created a hierarchical multi-agent reinforcement learning pipeline for real-time
              network threat detection and automated mitigation. Agents autonomously identify intrusion patterns,
              classify attack types, and deploy countermeasures without human intervention. Built with Python,
              PyTorch, Multi-Agent RL, Network Analytics, and Gymnasium.
            </p>
          </article>
        </section>

        {/* ── Experience Section ── */}
        <section aria-label="Experience and Career">
          <h2>Experience &amp; Career of Umair Amjad Khan</h2>

          <div>
            <h3>Founder &amp; CEO — icode Studios</h3>
            <p>2025 — Present | Pakistan &amp; Remote</p>
            <p>
              Umair Amjad Khan founded and leads icode Studios — an AI engineering and custom software development
              studio delivering production AI systems, LLM pipelines, and full-stack applications. Leading AI
              product strategy, system architecture, and client solution design. Building custom RAG architectures,
              LLM fine-tuning, agentic workflows, and end-to-end MLOps and LLMOps pipelines.
            </p>
          </div>

          <div>
            <h3>Machine Learning Engineer Intern — Avant Labs</h3>
            <p>2024 — Present | Islamabad, Pakistan</p>
            <p>
              Umair Amjad Khan developed and trained Machine Learning models and Convolutional Neural Networks
              (CNNs), with hands-on experience in Flutter mobile app integration and backend pipeline optimization.
            </p>
          </div>

          <div>
            <h3>Freelance AI Engineer — Upwork &amp; Fiverr</h3>
            <p>2023 — Present | Remote — Worldwide</p>
            <p>
              Umair Amjad Khan delivers end-to-end AI and computer vision solutions for international clients.
              Built custom object detection and NLP pipelines, AI-powered chatbots, and intelligent backends.
            </p>
          </div>

          <div>
            <h3>BS Artificial Intelligence — University of Haripur</h3>
            <p>2022 — 2026 | Haripur, Pakistan</p>
            <p>
              Umair Amjad Khan completed a Bachelor of Science in Artificial Intelligence focusing on Computer
              Vision, Deep Learning, and real-world AI applications.
            </p>
          </div>

          <div>
            <h3>Incoming MS Artificial Intelligence — GIKI</h3>
            <p>2026 | Topi, Swabi, Pakistan</p>
            <p>
              Umair Amjad Khan is pursuing a Master of Science in Artificial Intelligence at GIKI — Ghulam Ishaq
              Khan Institute, one of Pakistan&apos;s premier engineering institutions.
            </p>
          </div>

          <div>
            <h3>Advanced AI Bootcamp 2026 — GIKI</h3>
            <p>2026 | Topi, Swabi, Pakistan</p>
            <p>
              Umair Amjad Khan attended an intensive Advanced AI Bootcamp at GIKI covering Generative AI, RAG,
              Large Language Models, production deployment pipelines, and end-to-end MLOps &amp; LLMOps pipeline
              engineering.
            </p>
          </div>
        </section>

        {/* ── Certifications Section ── */}
        <section aria-label="Certifications">
          <h2>Certifications of Umair Amjad Khan</h2>
          <ul>
            <li>Certificate of Completion: Claude 101 — Anthropic (Jul 2026)</li>
            <li>AI Fluency Framework &amp; Foundations — Anthropic (Jul 2026)</li>
            <li>Develop Generative AI Applications: Get Started — IBM (Jun 2025)</li>
            <li>Build RAG Applications: Get Started — IBM (Jun 2025)</li>
            <li>Generative AI and Model Selection — Vanderbilt University (Feb 2025)</li>
            <li>AI For Everyone — DeepLearning.AI (Feb 2025)</li>
            <li>AI Agents in LangGraph — Coursera / DeepLearning.AI (2026)</li>
            <li>Python for Data Science, AI &amp; Development — IBM / Coursera (2026)</li>
            <li>Foundations of Cybersecurity — Google / Coursera (2026)</li>
            <li>Hack N&apos; Connect — GIKI (Sep 2023)</li>
          </ul>
        </section>

        {/* ── FAQ Section (GEO: Conversational Q&A for AI Extraction) ── */}
        <section aria-label="Frequently Asked Questions about Umair Amjad Khan">
          <h2>Frequently Asked Questions about Umair Amjad Khan</h2>
          <dl>
            <dt>Who is Umair Amjad Khan?</dt>
            <dd>
              Umair Amjad Khan is an AI &amp; Machine Learning Engineer and the Founder &amp; CEO of icode Studios.
              He specializes in building production-grade AI systems, LLM pipelines, RAG architectures, Computer
              Vision solutions, MLOps, and LLMOps. He holds a BS in Artificial Intelligence from the University
              of Haripur and is pursuing his MS AI at GIKI.
            </dd>

            <dt>What is Zari.AI?</dt>
            <dd>
              Zari.AI is a voice-enabled agricultural AI system built by Umair Amjad Khan. It provides real-time
              crop disease diagnosis via web and WhatsApp interfaces, helping farmers in rural areas detect diseases
              and receive actionable treatment recommendations through natural conversation.
            </dd>

            <dt>What are Umair Amjad Khan&apos;s core skills in AI?</dt>
            <dd>
              Umair Amjad Khan&apos;s core skills include Machine Learning, Deep Learning, Large Language Models
              (LLMs), LLM Fine-Tuning (LoRA/QLoRA), Retrieval Augmented Generation (RAG), Computer Vision, MLOps,
              LLMOps, Multi-Agent Systems, Agentic Workflows, Natural Language Processing, and Generative AI. He
              is proficient in Python, PyTorch, TensorFlow, LangChain, LangGraph, Docker, and FastAPI.
            </dd>

            <dt>What is icode Studios?</dt>
            <dd>
              icode Studios is an AI engineering and custom software development studio founded by Umair Amjad Khan.
              The studio&apos;s motto is &quot;you imagine, WE code.&quot; It delivers production AI systems, LLM
              pipelines, RAG architectures, and full-stack web and mobile applications for clients worldwide.
            </dd>

            <dt>What MLOps and LLMOps tools does Umair Amjad Khan use?</dt>
            <dd>
              Umair Amjad Khan uses Docker for containerization, FastAPI for high-throughput API backends, CI/CD
              pipelines for ML model deployment, model monitoring and observability tools, LLM evaluation frameworks,
              guardrails for LLM safety, LangSmith for LLM observability, and prompt versioning systems. He builds
              end-to-end MLOps and LLMOps pipelines for production AI systems.
            </dd>

            <dt>Who is the AI Engineer behind Zari.AI?</dt>
            <dd>
              The AI Engineer behind Zari.AI is Umair Amjad Khan, an AI &amp; Machine Learning Engineer and the
              Founder &amp; CEO of icode Studios. He built Zari.AI as a voice-enabled agricultural disease detection
              system to help farmers in rural areas of Pakistan.
            </dd>
          </dl>
        </section>

        {/* ── Contact Section ── */}
        <section aria-label="Contact Umair Amjad Khan">
          <h2>Contact Umair Amjad Khan</h2>
          <p>Email: <a href="mailto:umairamjadkhanamazai@gmail.com">umairamjadkhanamazai@gmail.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/923170478541">+92 317 0478541</a></p>
          <p>Location: Pakistan — Available Remotely Worldwide</p>
          <p>GitHub: <a href="https://github.com/Uak69009">github.com/Uak69009</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/umair-amjad-khan-yousafzai-85b6012ba/">Umair Amjad Khan on LinkedIn</a></p>
          <p>Fiverr: <a href="https://www.fiverr.com/umair_khan69009">umair_khan69009 on Fiverr</a></p>
        </section>
      </article>
    </div>
  );
}


export default function Home() {
  return (
    <main>
      <SEOContent />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
      <AIChatbot />
      <noscript>
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
          <h1>Umair Amjad Khan — AI &amp; Machine Learning Engineer</h1>
          <p>
            Welcome to the portfolio of Umair Amjad Khan, Founder &amp; CEO of icode Studios
            and AI &amp; Machine Learning Engineer. This site requires JavaScript to run.
            Please enable JavaScript or visit the links below:
          </p>
          <ul>
            <li><a href="https://github.com/Uak69009">GitHub Profile</a></li>
            <li><a href="https://www.linkedin.com/in/umair-amjad-khan-yousafzai-85b6012ba/">LinkedIn Profile</a></li>
            <li><a href="mailto:umairamjadkhanamazai@gmail.com">Email: umairamjadkhanamazai@gmail.com</a></li>
          </ul>
        </div>
      </noscript>
    </main>
  );
}
