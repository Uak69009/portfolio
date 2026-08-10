import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import Image from "next/image";

/**
 * SEO Content Block — Server-rendered, visually hidden, fully crawlable by Google.
 * 
 * Since every visible component uses "use client", Google's crawler sees empty HTML.
 * This block provides ALL key content as semantic HTML that Google can index.
 * It is visually hidden from users but fully readable by search engines.
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
      aria-hidden="true"
    >
      <article itemScope itemType="https://schema.org/Person">
        <h1 itemProp="name">Umair Amjad Khan</h1>
        <p itemProp="jobTitle">AI &amp; Machine Learning Engineer</p>
        <p itemProp="description">
          Umair Amjad Khan is an AI and Machine Learning Engineer and the Founder &amp; CEO of icode Studios.
          He specializes in building production-grade AI systems, Large Language Model (LLM) pipelines,
          Retrieval Augmented Generation (RAG) architectures, Computer Vision solutions, and MLOps workflows.
          Based in Pakistan, Umair works with clients worldwide delivering intelligent software applications.
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

        <div>
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
        </div>

        <div>
          <h2>Skills &amp; Expertise of Umair Amjad Khan</h2>
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
            <li>Reinforcement Learning</li>
            <li>Generative AI</li>
            <li>MLOps &amp; LLMOps</li>
            <li>Docker</li>
            <li>FastAPI</li>
            <li>LangChain</li>
            <li>LangGraph</li>
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
        </div>

        <div>
          <h2>Featured AI Projects by Umair Amjad Khan</h2>

          <article>
            <h3>Zari.AI — Agricultural Disease Detection</h3>
            <p>
              Voice-enabled AI system providing real-time crop disease diagnosis via web and WhatsApp interfaces.
              Helps farmers in rural areas detect diseases and get actionable treatment recommendations instantly
              through natural conversation. Built with Python, Computer Vision, Speech Processing, FastAPI,
              WhatsApp API, and PyTorch. Features real-time disease detection via camera input, multi-language
              voice interface, WhatsApp integration for field accessibility, and FastAPI backend with sub-200ms response.
            </p>
          </article>

          <article>
            <h3>Deepfake Detection Platform — ResNeXt + LSTM Pipeline</h3>
            <p>
              End-to-end deepfake video verification pipeline combining ResNeXt spatial feature extraction with
              LSTM temporal analysis. Includes a Flask backend API and a Chrome Extension for real-time browser-based
              verification of media authenticity. Built with PyTorch, ResNeXt, LSTM, Flask, Chrome Extension API,
              and OpenCV. Achieves 90%+ detection accuracy on benchmark datasets with frame-level confidence scoring.
            </p>
          </article>

          <article>
            <h3>Autonomous Cyber Defense System — Multi-Agent Reinforcement Learning</h3>
            <p>
              Hierarchical multi-agent reinforcement learning pipeline for real-time network threat detection
              and automated mitigation. Agents autonomously identify intrusion patterns, classify attack types,
              and deploy countermeasures without human intervention. Built with Python, PyTorch, Multi-Agent RL,
              Network Analytics, and Gymnasium.
            </p>
          </article>
        </div>

        <div>
          <h2>Experience &amp; Career of Umair Amjad Khan</h2>

          <div>
            <h3>Founder &amp; CEO — icode Studios</h3>
            <p>2025 — Present | Pakistan &amp; Remote</p>
            <p>
              Founded and leading icode Studios — an AI engineering and custom software development studio
              delivering production AI systems, LLM pipelines, and full-stack applications. Leading AI product
              strategy, system architecture, and client solution design. Building custom RAG architectures,
              LLM fine-tuning, and agentic workflows.
            </p>
          </div>

          <div>
            <h3>Machine Learning Engineer Intern — Avant Labs</h3>
            <p>2024 — Present | Islamabad, Pakistan</p>
            <p>
              Developing and training Machine Learning models and Convolutional Neural Networks (CNNs),
              with hands-on experience in Flutter mobile app integration and backend pipeline optimization.
            </p>
          </div>

          <div>
            <h3>Freelance AI Engineer — Upwork &amp; Fiverr</h3>
            <p>2023 — Present | Remote — Worldwide</p>
            <p>
              Delivering end-to-end AI and computer vision solutions for international clients.
              Built custom object detection and NLP pipelines, AI-powered chatbots, and intelligent backends.
            </p>
          </div>

          <div>
            <h3>BS Artificial Intelligence — University of Haripur</h3>
            <p>2022 — 2026 | Haripur, Pakistan</p>
            <p>
              Bachelor of Science in Artificial Intelligence focusing on Computer Vision, Deep Learning,
              and real-world AI applications.
            </p>
          </div>

          <div>
            <h3>Advanced AI Bootcamp 2026 — GIKI</h3>
            <p>2026 | Topi, Swabi, Pakistan</p>
            <p>
              Intensive Advanced AI Bootcamp at Ghulam Ishaq Khan Institute covering Generative AI, RAG,
              Large Language Models, and production deployment pipelines.
            </p>
          </div>
        </div>

        <div>
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
        </div>

        <div>
          <h2>Contact Umair Amjad Khan</h2>
          <p>Email: <a href="mailto:umairamjadkhanamazai@gmail.com">umairamjadkhanamazai@gmail.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/923170478541">+92 317 0478541</a></p>
          <p>Location: Pakistan — Available Remotely Worldwide</p>
          <p>GitHub: <a href="https://github.com/Uak69009">github.com/Uak69009</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/umair-amjad-khan-yousafzai-85b6012ba/">Umair Amjad Khan on LinkedIn</a></p>
          <p>Fiverr: <a href="https://www.fiverr.com/umair_khan69009">umair_khan69009 on Fiverr</a></p>
        </div>
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
      <Chatbot />
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
