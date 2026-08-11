import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.icodestudios.dev";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-08-11"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
