import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Umair Amjad Khan | AI & Machine Learning Engineer",
  description:
    "Portfolio of Umair Amjad Khan — AI & ML Engineer specializing in LLM pipelines, RAG architectures, Computer Vision, and production-grade intelligent systems.",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM",
    "RAG",
    "Computer Vision",
    "PyTorch",
    "Umair Amjad Khan",
    "Pakistan",
  ],
  authors: [{ name: "Umair Amjad Khan" }],
  openGraph: {
    title: "Umair Amjad Khan | AI & Machine Learning Engineer",
    description:
      "Building Production AI Systems, LLM Pipelines, and Intelligent Applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umair Amjad Khan | AI & Machine Learning Engineer",
    description:
      "Building Production AI Systems, LLM Pipelines, and Intelligent Applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
