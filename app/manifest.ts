import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Umair Amjad Khan — AI & Machine Learning Engineer Portfolio",
    short_name: "Umair Khan",
    description:
      "Official portfolio of Umair Amjad Khan — AI & Machine Learning Engineer and Founder & CEO of icode Studios. Specializing in LLMs, RAG, Computer Vision, and MLOps.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0B1220",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
