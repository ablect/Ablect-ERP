import { useEffect, useRef } from "react";

export type BarcodeScannerOptions = {
  onScan: (barcode: string) => void;
  minLength?: number;
  maxInterKeyMs?: number;
  resetAfterMs?: number;
};

export function useBarcodeScanner({
  onScan,
  minLength = 3,
  maxInterKeyMs = 50,
  resetAfterMs = 180,
}: BarcodeScannerOptions) {
  const onScanRef = useRef(onScan);
  const bufferRef = useRef("");
  const lastKeyAtRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => { onScanRef.current = onScan; }, [onScan]);

  useEffect(() => {
    const clearBuffer = () => {
      bufferRef.current = "";
      lastKeyAtRef.current = 0;
      if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const value = bufferRef.current.trim();
        if (value.length >= minLength) {
          event.preventDefault();
          event.stopPropagation();
          onScanRef.current(value);
        }
        clearBuffer();
        return;
      }

      if (event.key.length !== 1 || event.ctrlKey || event.altKey || event.metaKey) return;

      const now = performance.now();
      const gap = lastKeyAtRef.current ? now - lastKeyAtRef.current : 0;
      bufferRef.current = gap > maxInterKeyMs ? event.key : bufferRef.current + event.key;
      lastKeyAtRef.current = now;

      if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(clearBuffer, resetAfterMs);
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      clearBuffer();
    };
  }, [maxInterKeyMs, minLength, resetAfterMs]);
}
