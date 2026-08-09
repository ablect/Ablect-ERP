import { useCallback } from "react";

type FeedbackTone = "tick" | "beep" | "error";

/**
 * Lightweight sensory feedback without introducing another audio dependency.
 * The hook uses Web Audio so the inventory module remains self-contained and
 * works with the existing dependency set.
 */
export function useUIFeedback() {
  const play = useCallback((tone: FeedbackTone) => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextClass) return;

      const context = new AudioContextClass();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;

      const settings: Record<FeedbackTone, { frequency: number; duration: number; volume: number }> = {
        tick: { frequency: 760, duration: 0.045, volume: 0.018 },
        beep: { frequency: 980, duration: 0.07, volume: 0.022 },
        error: { frequency: 150, duration: 0.11, volume: 0.028 },
      };

      const selected = settings[tone];
      oscillator.type = tone === "error" ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(selected.frequency, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(selected.volume, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + selected.duration);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + selected.duration + 0.01);
      oscillator.addEventListener("ended", () => void context.close());
    } catch {
      // Feedback is enhancement only and must never interrupt inventory work.
    }
  }, []);

  return {
    tick: useCallback(() => play("tick"), [play]),
    beep: useCallback(() => play("beep"), [play]),
    error: useCallback(() => play("error"), [play]),
  };
}

export default useUIFeedback;
