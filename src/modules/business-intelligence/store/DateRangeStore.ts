import { create } from "zustand";
import type { DateRange } from "../types/DateRange";

type DateRangeState = {
  range: DateRange;
  setRange: (range: DateRange) => void;
};

export const useDateRangeStore = create<DateRangeState>((set) => ({
  range: {
    preset: "thisMonth",
    from: new Date(),
    to: new Date(),
  },
  setRange: (range) => set({ range }),
}));
