"use client";

import { useEffect, useState } from "react";

export function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

/** Returns the primary accent color — golden yellow in dark mode, blue in light */
export function useAccent() {
  const isDark = useIsDark();
  return {
    isDark,
    accent: isDark ? "#FACC15" : "#1D4ED8",
    accentAlt: isDark ? "#EAB308" : "#1E40AF",
    accentDark: isDark ? "#CA8A04" : "#16233B",
    accentBg: (opacity = 0.12) =>
      isDark
        ? `rgba(234, 179, 8, ${opacity})`
        : `rgba(29, 78, 216, ${opacity})`,
    accentBorder: (opacity = 0.3) =>
      isDark
        ? `rgba(234, 179, 8, ${opacity})`
        : `rgba(29, 78, 216, ${opacity})`,
  };
}
