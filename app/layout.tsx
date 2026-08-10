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
  title: "Umair Amjad Khan — AI & Machine Learning Engineer",
  description:
    "Umair Amjad Khan is an AI & Machine Learning Engineer and Founder & CEO of icode Studios. Specializing in LLMs, RAG pipelines, Computer Vision, MLOps, and production AI systems. Based in Pakistan, available worldwide.",
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
    "Generative AI Engineer",
    "AI Engineer Pakistan",
    "Machine Learning Engineer Pakistan",
    "freelance AI engineer",
    "hire AI engineer",
    "Python AI developer",
    "Deep Learning Engineer",
    "NLP Engineer",
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
    title: "Umair Amjad Khan — AI & Machine Learning Engineer",
    description:
      "Umair Amjad Khan is an AI & Machine Learning Engineer and Founder of icode Studios. Expert in LLMs, RAG, Computer Vision, and MLOps. Building production AI systems.",
    url: `${SITE_URL}/`,
    siteName: "Umair Amjad Khan — Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Umair Amjad Khan — AI and Machine Learning Engineer Portfolio",
      },
      {
        url: `${SITE_URL}/profile-image.jpg`,
        width: 600,
        height: 600,
        alt: "Umair Amjad Khan — Profile Photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umair Amjad Khan — AI & Machine Learning Engineer",
    description:
      "AI & Machine Learning Engineer | Founder @ icode Studios | LLMs, RAG, Computer Vision, MLOps | Available for hire worldwide.",
    images: [`${SITE_URL}/og-image.jpg`],
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
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/icon.png"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Umair Amjad Khan",
      givenName: "Umair",
      familyName: "Khan",
      additionalName: "Amjad",
      url: `${SITE_URL}/`,
      jobTitle: "AI & Machine Learning Engineer",
      description:
        "Umair Amjad Khan is an AI & Machine Learning Engineer and Founder & CEO of icode Studios. He specializes in building production-grade AI systems, LLM pipelines, RAG architectures, Computer Vision solutions, and MLOps workflows. Based in Pakistan, he works with clients worldwide.",
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/profile-image.jpg`,
        width: 600,
        height: 600,
        caption: "Umair Amjad Khan — AI and Machine Learning Engineer",
      },
      worksFor: {
        "@type": "Organization",
        name: "icode Studios",
        url: "https://www.linkedin.com/company/139384016/",
        description: "AI Engineering & Custom Software Development Studio — you imagine, WE code",
        founder: {
          "@id": `${SITE_URL}/#person`,
        },
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
            "Building production AI systems, LLM pipelines, RAG architectures, and Computer Vision solutions",
          skills:
            "Python, PyTorch, TensorFlow, LLM Fine-Tuning, RAG, Computer Vision, MLOps, Docker, FastAPI",
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
        "Reinforcement Learning",
        "Generative AI",
        "MLOps",
        "LLMOps",
        "Python",
        "PyTorch",
        "TensorFlow",
        "FastAPI",
        "Docker",
        "LangChain",
        "LangGraph",
        "OpenCV",
        "YOLO",
        "ResNet",
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
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Umair Amjad Khan — AI & Machine Learning Engineer Portfolio",
      url: `${SITE_URL}/`,
      description:
        "Official portfolio website of Umair Amjad Khan — AI & Machine Learning Engineer and Founder of icode Studios.",
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
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: "Umair Amjad Khan — AI & Machine Learning Engineer Portfolio",
      description:
        "Official portfolio of Umair Amjad Khan showcasing AI projects, certifications, experience, and skills in Machine Learning, LLMs, RAG, Computer Vision, and MLOps.",
      mainEntity: {
        "@id": `${SITE_URL}/#person`,
      },
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
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Deepfake Detection Platform — ResNeXt + LSTM Pipeline",
          description:
            "End-to-end deepfake video verification pipeline combining ResNeXt spatial feature extraction with LSTM temporal analysis.",
          url: "https://github.com/Uak69009",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Autonomous Cyber Defense System — Multi-Agent RL",
          description:
            "Hierarchical multi-agent reinforcement learning pipeline for real-time network threat detection and automated mitigation.",
          url: "https://github.com/Uak69009",
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
