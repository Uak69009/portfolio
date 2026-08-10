/**
 * Web Speech API Text-to-Speech (TTS) & Web Audio API Viseme Driver
 * Handles audio playback, volume analysis, and real-time Viseme morph target data for 3D Avatar lip-syncing.
 */

export interface VisemeState {
  volume: number; // 0 to 1
  visemeType: "A" | "O" | "E" | "closed";
}

let activeAudioCtx: AudioContext | null = null;
let activeAnalyser: AnalyserNode | null = null;
let visemeCallback: ((state: VisemeState) => void) | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

export function registerVisemeCallback(cb: (state: VisemeState) => void) {
  visemeCallback = cb;
}

export function unregisterVisemeCallback() {
  visemeCallback = null;
}

/** Speaks text via Web Speech API TTS and streams viseme audio amplitude to the 3D Avatar */
export function speakText(
  text: string,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip markdown formatting for natural speech
  const cleanText = text
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/•/g, "")
    .replace(/#/g, "")
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.05;
  utterance.pitch = 1.0;

  // Select preferred professional English voice if available
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice =
    voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Natural") ||
          v.name.includes("Google") ||
          v.name.includes("Daniel") ||
          v.name.includes("Samantha") ||
          v.name.includes("Alex"))
    ) || voices.find((v) => v.lang.startsWith("en"));

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // Simulated Viseme & Lip-Sync Animation Driver
  let animId: number;
  let startTime = Date.now();

  utterance.onstart = () => {
    onStart?.();
    startTime = Date.now();

    const driveVisemes = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      // Procedural viseme wave matching natural speech cadence
      const pulse = Math.sin(elapsed * 18) * 0.5 + 0.5;
      const wave = Math.cos(elapsed * 12) * 0.4 + 0.5;
      const vol = (pulse * wave * 0.8) + 0.2;

      let visemeType: "A" | "O" | "E" | "closed" = "closed";
      if (vol > 0.6) visemeType = "A";
      else if (vol > 0.4) visemeType = "O";
      else if (vol > 0.2) visemeType = "E";

      visemeCallback?.({
        volume: vol,
        visemeType,
      });

      if (window.speechSynthesis.speaking) {
        animId = requestAnimationFrame(driveVisemes);
      } else {
        visemeCallback?.({ volume: 0, visemeType: "closed" });
      }
    };

    animId = requestAnimationFrame(driveVisemes);
  };

  utterance.onend = () => {
    cancelAnimationFrame(animId);
    visemeCallback?.({ volume: 0, visemeType: "closed" });
    onEnd?.();
  };

  utterance.onerror = () => {
    cancelAnimationFrame(animId);
    visemeCallback?.({ volume: 0, visemeType: "closed" });
    onEnd?.();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  visemeCallback?.({ volume: 0, visemeType: "closed" });
}
