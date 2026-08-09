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
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://umairamjadkhan.dev"),
  title: "Umair Amjad Khan — AI & Machine Learning Engineer Portfolio",
  description:
    "Personal portfolio of Umair Amjad Khan, Founder & CEO @ icode Studios. Machine Learning Engineer specializing in LLMs, RAG, Computer Vision, and MLOps.",
  keywords: [
    "Umair Amjad Khan",
    "Machine Learning Engineer",
    "AI Engineer",
    "Artificial Intelligence Engineer",
    "icode Studios",
    "LLM",
    "Large Language Models",
    "RAG",
    "Retrieval Augmented Generation",
    "Computer Vision",
    "MLOps",
    "Generative AI",
    "Pakistan AI Engineer",
  ],
  authors: [{ name: "Umair Amjad Khan", url: "https://umairamjadkhan.dev/" }],
  creator: "Umair Amjad Khan",
  publisher: "icode Studios",
  alternates: {
    canonical: "https://umairamjadkhan.dev/",
  },
  openGraph: {
    title: "Umair Amjad Khan — AI & Machine Learning Engineer Portfolio",
    description:
      "Personal portfolio of Umair Amjad Khan, Founder & CEO @ icode Studios. Specializing in LLMs, RAG, Computer Vision, and MLOps.",
    url: "https://umairamjadkhan.dev/",
    siteName: "Umair Amjad Khan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://umairamjadkhan.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Umair Amjad Khan — AI and Machine Learning Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umair Amjad Khan — AI & Machine Learning Engineer Portfolio",
    description:
      "Personal portfolio of Umair Amjad Khan, Founder & CEO @ icode Studios. Specializing in LLMs, RAG, Computer Vision, and MLOps.",
    images: ["https://umairamjadkhan.dev/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://umairamjadkhan.dev/#person",
      name: "Umair Amjad Khan",
      url: "https://umairamjadkhan.dev/",
      jobTitle: "Machine Learning Engineer",
      description:
        "AI & Machine Learning Engineer specializing in LLMs, RAG, Computer Vision, and MLOps.",
      image: "https://umairamjadkhan.dev/profile-image.jpg",
      worksFor: {
        "@type": "Organization",
        name: "icode Studios",
        url: "https://www.linkedin.com/company/139384016/",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "University of Haripur",
        url: "https://www.uoh.edu.pk/",
      },
      sameAs: [
        "https://github.com/Uak69009",
        "https://www.linkedin.com/company/139384016/",
        "https://upwork.com",
        "https://fiverr.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://umairamjadkhan.dev/#website",
      name: "Umair Amjad Khan",
      url: "https://umairamjadkhan.dev/",
      author: {
        "@id": "https://umairamjadkhan.dev/#person",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://umairamjadkhan.dev/#profilepage",
      url: "https://umairamjadkhan.dev/",
      name: "Umair Amjad Khan Portfolio",
      mainEntity: {
        "@id": "https://umairamjadkhan.dev/#person",
      },
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
      </head>
      <body className="bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-indigo-500 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
