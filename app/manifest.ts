import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Umair Amjad Khan — AI & Machine Learning Engineer Portfolio",
    short_name: "Umair Khan",
    description:
      "Personal portfolio of Umair Amjad Khan, Founder & CEO @ icode Studios. Machine Learning Engineer specializing in LLMs, RAG, Computer Vision, and MLOps.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#4F46E5",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
