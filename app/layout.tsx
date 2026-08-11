import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
};

const SITE_URL = "https://www.icodestudios.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Umair Amjad Khan | AI & Machine Learning Engineer — MLOps, LLMOps, LLMs & RAG",
  description:
    "Official website of Umair Amjad Khan — AI & Machine Learning Engineer and Founder & CEO of icode Studios. Specializing in LLMs, RAG pipelines, Computer Vision, MLOps, LLMOps, and production AI systems.",
  keywords: [
    "Umair Amjad Khan",
    "Umair Khan",
    "Umair Amjad",
    "Umair Amjad Khan AI",
    "Umair Amjad Khan portfolio",
    "Umair Amjad Khan Machine Learning",
    "Umair Amjad Khan engineer",
    "Umair Amjad Khan icode Studios",
    "Machine Learning Engineer",
    "AI Engineer",
    "Artificial Intelligence Engineer",
    "icode Studios",
    "icode Studios founder",
    "LLM Engineer",
    "Large Language Models",
    "RAG pipeline engineer",
    "Retrieval Augmented Generation",
    "Computer Vision Engineer",
    "MLOps Engineer",
    "LLMOps Engineer",
    "MLOps pipeline",
    "LLMOps pipeline",
    "AI pipeline engineer",
    "ML pipeline orchestration",
    "LLM evaluation",
    "Generative AI Engineer",
    "AI Engineer Pakistan",
    "Machine Learning Engineer Pakistan",
    "freelance AI engineer",
    "hire AI engineer",
    "Python AI developer",
    "Deep Learning Engineer",
    "NLP Engineer",
    "Agentic Workflows",
    "Multi-Agent Systems",
    "Zari.AI",
  ],
  authors: [{ name: "Umair Amjad Khan", url: `${SITE_URL}/` }],
  creator: "Umair Amjad Khan",
  publisher: "Umair Amjad Khan",
  category: "Technology",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  verification: {
    google: "google70a3f2bd03998538.html",
    other: {
      "msvalidate.01": "YOUR_BING_WEBMASTER_VERIFICATION_CODE",
    },
  },
  openGraph: {
    title: "Umair Amjad Khan — AI & Machine Learning Engineer | MLOps & LLMOps",
    description:
      "Umair Amjad Khan is an AI & Machine Learning Engineer and Founder of icode Studios. Expert in LLMs, RAG, Computer Vision, MLOps, and LLMOps. Building production AI systems.",
    url: `${SITE_URL}/`,
    siteName: "Umair Amjad Khan — Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg?v=3`,
        width: 1200,
        height: 630,
        alt: "Umair Amjad Khan — AI and Machine Learning Engineer Portfolio",
      },
      {
        url: `${SITE_URL}/profile-image.jpg?v=3`,
        width: 600,
        height: 600,
        alt: "Umair Amjad Khan — Profile Photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umair Amjad Khan — AI & Machine Learning Engineer | MLOps & LLMOps",
    description:
      "AI & Machine Learning Engineer | Founder @ icode Studios | LLMs, RAG, Computer Vision, MLOps, LLMOps | Available for hire worldwide.",
    images: [`${SITE_URL}/og-image.jpg?v=3`],
    creator: "@umairamjadkhan",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png?v=3", type: "image/png", sizes: "512x512" },
      { url: "/logo.png?v=3", type: "image/png", sizes: "512x512" },
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon.ico?v=3", sizes: "any" },
    ],
    shortcut: ["/icon.png?v=3"],
    apple: [{ url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // ── Person Entity (Authoritative) ──
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Umair Amjad Khan",
      givenName: "Umair",
      familyName: "Khan",
      additionalName: "Amjad",
      alternateName: ["Umair Amjad", "Umair Khan", "Umair Amjad Khan Yousafzai"],
      disambiguatingDescription: "AI & Machine Learning Engineer, Founder & CEO of icode Studios, MLOps & LLMOps Specialist",
      url: `${SITE_URL}/`,
      mainEntityOfPage: `${SITE_URL}/`,
      jobTitle: "AI & Machine Learning Engineer",
      description:
        "Official profile of Umair Amjad Khan — AI & Machine Learning Engineer and Founder & CEO of icode Studios. Specializing in LLMs, RAG architectures, Computer Vision, MLOps, LLMOps, and production AI systems.",
      image: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#profileimage`,
        url: `${SITE_URL}/profile-image.jpg?v=3`,
        contentUrl: `${SITE_URL}/profile-image.jpg?v=3`,
        width: 600,
        height: 600,
        caption: "Umair Amjad Khan — AI and Machine Learning Engineer",
        inLanguage: "en",
      },
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/icon.png?v=3`,
        contentUrl: `${SITE_URL}/icon.png?v=3`,
        width: 512,
        height: 512,
        caption: "Umair Amjad Khan — Official AI Engineer Logo",
        inLanguage: "en",
      },
      brand: {
        "@id": `${SITE_URL}/#organization`,
      },
      worksFor: {
        "@id": `${SITE_URL}/#organization`,
      },
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "AI & Machine Learning Engineer",
          occupationLocation: {
            "@type": "Country",
            name: "Pakistan",
          },
          description:
            "Building production AI systems, LLM pipelines, RAG architectures, Computer Vision solutions, MLOps workflows, and LLMOps pipelines",
          skills:
            "Python, PyTorch, TensorFlow, LLM Fine-Tuning, RAG, Computer Vision, MLOps, LLMOps, Docker, FastAPI, LangChain, LangGraph",
        },
        {
          "@type": "Occupation",
          name: "Founder & CEO",
          description:
            "Leading icode Studios — an AI engineering & custom software development studio",
        },
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "University of Haripur",
          url: "https://www.uoh.edu.pk/",
          department: "Artificial Intelligence",
        },
        {
          "@type": "EducationalOrganization",
          name: "GIKI — Ghulam Ishaq Khan Institute",
          url: "https://giki.edu.pk/",
          description: "Advanced AI Bootcamp 2026",
        },
        {
          "@type": "EducationalOrganization",
          name: "GIKI — Ghulam Ishaq Khan Institute",
          url: "https://giki.edu.pk/",
          description: "Incoming MS Artificial Intelligence (2026)",
        },
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Large Language Models (LLMs)",
        "LLM Fine-Tuning",
        "LoRA",
        "QLoRA",
        "Retrieval Augmented Generation (RAG)",
        "Computer Vision",
        "Object Detection",
        "Natural Language Processing",
        "Multi-Agent Systems",
        "Agentic Workflows",
        "Reinforcement Learning",
        "Generative AI",
        "MLOps",
        "LLMOps",
        "ML Pipeline Orchestration",
        "Model Monitoring & Observability",
        "LLM Evaluation & Guardrails",
        "Feature Stores",
        "Model Registry",
        "CI/CD for ML",
        "Kubernetes for ML",
        "Prompt Versioning",
        "LLM Observability",
        "LangSmith",
        "Python",
        "PyTorch",
        "TensorFlow",
        "FastAPI",
        "Docker",
        "LangChain",
        "LangGraph",
        "LlamaIndex",
        "OpenCV",
        "YOLO",
        "ResNet",
        "ResNeXt",
        "Prompt Engineering",
        "Vector Databases",
        "Neural Networks",
        "Convolutional Neural Networks",
        "Recurrent Neural Networks",
        "Transformer Architecture",
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "BS Artificial Intelligence",
          credentialCategory: "degree",
          educationalLevel: "Bachelor's",
          recognizedBy: { "@type": "EducationalOrganization", name: "University of Haripur", url: "https://www.uoh.edu.pk/" },
          dateCreated: "2026",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Certificate of Completion: Claude 101",
          credentialCategory: "Certificate",
          recognizedBy: { "@type": "Organization", name: "Anthropic" },
          dateCreated: "2026-07",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "AI Fluency Framework & Foundations",
          credentialCategory: "Certificate",
          recognizedBy: { "@type": "Organization", name: "Anthropic" },
          dateCreated: "2026-07",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Develop Generative AI Applications: Get Started",
          credentialCategory: "Certificate",
          recognizedBy: { "@type": "Organization", name: "IBM" },
          dateCreated: "2025-06",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Build RAG Applications: Get Started",
          credentialCategory: "Certificate",
          recognizedBy: { "@type": "Organization", name: "IBM" },
          dateCreated: "2025-06",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Generative AI and Model Selection",
          credentialCategory: "Certificate",
          recognizedBy: { "@type": "Organization", name: "Vanderbilt University" },
          dateCreated: "2025-02",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "AI For Everyone",
          credentialCategory: "Certificate",
          recognizedBy: { "@type": "Organization", name: "DeepLearning.AI" },
          dateCreated: "2025-02",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "AI Agents in LangGraph",
          credentialCategory: "Certificate",
          recognizedBy: { "@type": "Organization", name: "Coursera / DeepLearning.AI" },
          dateCreated: "2026",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Python for Data Science, AI & Development",
          credentialCategory: "Certificate",
          recognizedBy: { "@type": "Organization", name: "IBM / Coursera" },
          dateCreated: "2026",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Foundations of Cybersecurity",
          credentialCategory: "Certificate",
          recognizedBy: { "@type": "Organization", name: "Google / Coursera" },
          dateCreated: "2026",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "umairamjadkhanamazai@gmail.com",
        telephone: "+923170478541",
        contactType: "professional",
        availableLanguage: ["English", "Urdu", "Pashto"],
        areaServed: "Worldwide",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "PK",
        addressRegion: "Pakistan",
      },
      nationality: {
        "@type": "Country",
        name: "Pakistan",
      },
      sameAs: [
        "https://github.com/Uak69009",
        "https://www.linkedin.com/in/umair-amjad-khan-yousafzai-85b6012ba/",
        "https://www.fiverr.com/umair_khan69009",
      ],
    },

    // ── Organization / Brand Entity (icode Studios) ──
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "icode Studios",
      url: "https://www.linkedin.com/company/139384016/",
      description: "AI Engineering & Custom Software Development Studio — you imagine, WE code",
      slogan: "you imagine, WE code",
      founder: {
        "@id": `${SITE_URL}/#person`,
      },
      foundingDate: "2025",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icode-studios-logo.png`,
        width: 512,
        height: 512,
        caption: "icode Studios — AI Engineering & Software Development",
      },
      sameAs: [
        "https://www.linkedin.com/company/139384016/",
      ],
    },

    // ── WebSite Entity ──
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Umair Amjad Khan — AI & Machine Learning Engineer Portfolio",
      url: `${SITE_URL}/`,
      description:
        "Official portfolio website of Umair Amjad Khan — AI & Machine Learning Engineer, MLOps & LLMOps Specialist, and Founder of icode Studios.",
      author: {
        "@id": `${SITE_URL}/#person`,
      },
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },

    // ── ProfilePage Entity ──
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: "Umair Amjad Khan — AI & Machine Learning Engineer Portfolio",
      description:
        "Official portfolio of Umair Amjad Khan showcasing AI projects, certifications, experience, and skills in Machine Learning, LLMs, RAG, Computer Vision, MLOps, and LLMOps.",
      dateCreated: "2025-01-01",
      dateModified: "2026-08-11",
      mainEntity: {
        "@id": `${SITE_URL}/#person`,
      },
      significantLink: [
        "https://github.com/Uak69009",
        "https://www.linkedin.com/in/umair-amjad-khan-yousafzai-85b6012ba/",
        "https://www.fiverr.com/umair_khan69009",
      ],
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
        ],
      },
    },

    // ── Featured Projects as CreativeWork ──
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#zari-ai`,
      name: "Zari.AI",
      alternateName: "Zari.AI — Agricultural Disease Detection",
      description:
        "Voice-enabled AI system providing real-time crop disease diagnosis via web and WhatsApp interfaces. Helps farmers in rural areas detect diseases and get actionable treatment recommendations instantly through natural conversation.",
      applicationCategory: "AI/Agriculture Technology",
      operatingSystem: "Web, WhatsApp",
      author: {
        "@id": `${SITE_URL}/#person`,
      },
      url: "https://github.com/Uak69009",
      dateCreated: "2025",
      keywords: "agricultural AI, crop disease detection, computer vision, WhatsApp bot, FastAPI, PyTorch",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#deepfake-detection`,
      name: "Deepfake Detection Platform",
      alternateName: "Deepfake Detection Platform — ResNeXt + LSTM Pipeline",
      description:
        "End-to-end deepfake video verification pipeline combining ResNeXt spatial feature extraction with LSTM temporal analysis. Includes a Flask backend API and a Chrome Extension for real-time browser-based verification.",
      applicationCategory: "AI/Media Verification",
      operatingSystem: "Web, Chrome Extension",
      author: {
        "@id": `${SITE_URL}/#person`,
      },
      url: "https://github.com/Uak69009",
      dateCreated: "2025",
      keywords: "deepfake detection, ResNeXt, LSTM, computer vision, media verification, PyTorch",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#cyber-defense`,
      name: "Autonomous Cyber Defense System",
      alternateName: "Autonomous Cyber Defense System — Multi-Agent Reinforcement Learning",
      description:
        "Hierarchical multi-agent reinforcement learning pipeline for real-time network threat detection and automated mitigation. Agents autonomously identify intrusion patterns and deploy countermeasures.",
      applicationCategory: "AI/Cybersecurity",
      operatingSystem: "Cross-platform",
      author: {
        "@id": `${SITE_URL}/#person`,
      },
      url: "https://github.com/Uak69009",
      dateCreated: "2026",
      keywords: "multi-agent RL, cybersecurity, network defense, reinforcement learning, PyTorch",
    },

    // ── ItemList for Rich Results ──
    {
      "@type": "ItemList",
      name: "Featured AI Projects by Umair Amjad Khan",
      description: "Production AI projects built by Umair Amjad Khan",
      numberOfItems: 3,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Zari.AI — Agricultural Disease Detection",
          description:
            "Voice-enabled AI system providing real-time crop disease diagnosis via web and WhatsApp interfaces.",
          url: "https://github.com/Uak69009",
          item: { "@id": `${SITE_URL}/#zari-ai` },
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Deepfake Detection Platform — ResNeXt + LSTM Pipeline",
          description:
            "End-to-end deepfake video verification pipeline combining ResNeXt spatial feature extraction with LSTM temporal analysis.",
          url: "https://github.com/Uak69009",
          item: { "@id": `${SITE_URL}/#deepfake-detection` },
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Autonomous Cyber Defense System — Multi-Agent RL",
          description:
            "Hierarchical multi-agent reinforcement learning pipeline for real-time network threat detection and automated mitigation.",
          url: "https://github.com/Uak69009",
          item: { "@id": `${SITE_URL}/#cyber-defense` },
        },
      ],
    },

    // ── FAQPage for AI Overviews & Featured Snippets ──
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Umair Amjad Khan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Umair Amjad Khan is an AI & Machine Learning Engineer and the Founder & CEO of icode Studios. He specializes in building production-grade AI systems, LLM pipelines, RAG architectures, Computer Vision solutions, MLOps, and LLMOps. He holds a BS in Artificial Intelligence from the University of Haripur and is pursuing his MS AI at GIKI.",
          },
        },
        {
          "@type": "Question",
          name: "What is Zari.AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zari.AI is a voice-enabled agricultural AI system built by Umair Amjad Khan. It provides real-time crop disease diagnosis via web and WhatsApp interfaces, helping farmers in rural areas detect diseases and receive actionable treatment recommendations through natural conversation.",
          },
        },
        {
          "@type": "Question",
          name: "What are Umair Amjad Khan's core skills in AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Umair Amjad Khan's core skills include Machine Learning, Deep Learning, Large Language Models (LLMs), LLM Fine-Tuning (LoRA/QLoRA), Retrieval Augmented Generation (RAG), Computer Vision, MLOps, LLMOps, Multi-Agent Systems, Agentic Workflows, Natural Language Processing, and Generative AI. He is proficient in Python, PyTorch, TensorFlow, LangChain, LangGraph, Docker, and FastAPI.",
          },
        },
        {
          "@type": "Question",
          name: "What is icode Studios?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "icode Studios is an AI engineering and custom software development studio founded by Umair Amjad Khan. The studio's motto is 'you imagine, WE code.' It delivers production AI systems, LLM pipelines, RAG architectures, and full-stack web and mobile applications for clients worldwide.",
          },
        },
        {
          "@type": "Question",
          name: "What MLOps and LLMOps tools does Umair Amjad Khan use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Umair Amjad Khan uses Docker for containerization, FastAPI for high-throughput API backends, CI/CD pipelines for ML model deployment, model monitoring and observability tools, LLM evaluation frameworks, guardrails for LLM safety, LangSmith for LLM observability, and prompt versioning systems. He builds end-to-end MLOps and LLMOps pipelines for production AI systems.",
          },
        },
        {
          "@type": "Question",
          name: "Who is the AI Engineer behind Zari.AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The AI Engineer behind Zari.AI is Umair Amjad Khan, an AI & Machine Learning Engineer and the Founder & CEO of icode Studios. He built Zari.AI as a voice-enabled agricultural disease detection system to help farmers in rural areas of Pakistan.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect & Preload for Google Core Web Vitals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/profile-image.jpg" type="image/jpeg" />
      </head>
      <body className="bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-[#1D4ED8] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
