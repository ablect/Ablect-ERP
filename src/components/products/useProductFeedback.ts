import { useCallback } from "react";

function tone(frequency: number, duration = 0.055) {
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.025, context.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration + 0.01);
  } catch {
    // Feedback is optional and must never block the ERP.
  }
}

export default function useProductFeedback() {
  const click = useCallback(() => tone(560), []);
  const success = useCallback(() => tone(740, 0.09), []);
  const error = useCallback(() => tone(180, 0.11), []);
  return { click, success, error };
}
