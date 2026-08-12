import { useCallback } from "react";

type FeedbackTone = "click" | "success" | "whoosh" | "error";

/** Lightweight browser audio feedback. No extra dependency is required. */
export function useUIFeedback() {
  const play = useCallback((tone: FeedbackTone) => {
    if (typeof window === "undefined") return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

      if (!AudioContextClass) return;

      const context = new AudioContextClass();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      const settings: Record<FeedbackTone, { frequency: number; duration: number }> = {
        click: { frequency: 620, duration: 0.045 },
        success: { frequency: 760, duration: 0.12 },
        whoosh: { frequency: 260, duration: 0.09 },
        error: { frequency: 180, duration: 0.11 },
      };

      const selected = settings[tone];
      oscillator.type = tone === "whoosh" ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(selected.frequency, now);
      if (tone === "whoosh") {
        oscillator.frequency.exponentialRampToValueAtTime(520, now + selected.duration);
      }

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(tone === "error" ? 0.018 : 0.025, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + selected.duration);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + selected.duration + 0.01);
      window.setTimeout(() => void context.close(), 180);
    } catch {
      // Feedback is optional and must never interrupt the ERP workflow.
    }
  }, []);

  return {
    click: useCallback(() => play("click"), [play]),
    success: useCallback(() => play("success"), [play]),
    whoosh: useCallback(() => play("whoosh"), [play]),
    error: useCallback(() => play("error"), [play]),
  };
}
