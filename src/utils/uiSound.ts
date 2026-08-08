let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;

  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext ??
      (window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }).webkitAudioContext;

    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }

  return audioContext;
}

export function playUiSound(
  kind: "click" | "success" | "error" = "click",
) {
  try {
    const context = getAudioContext();
    if (!context) return;

    if (context.state === "suspended") {
      void context.resume();
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    const settings = {
      click: { frequency: 520, duration: 0.045, volume: 0.025 },
      success: { frequency: 740, duration: 0.09, volume: 0.035 },
      error: { frequency: 190, duration: 0.11, volume: 0.03 },
    }[kind];

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(settings.frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(settings.volume, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + settings.duration,
    );

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + settings.duration + 0.01);
  } catch {
    // Audio is enhancement only. Never let it break the ERP UI.
  }
}
