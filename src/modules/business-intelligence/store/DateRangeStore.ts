import { create } from "zustand";

export type DatePreset =
  | "today"
  | "yesterday"
  | "last7days"
  | "last30days"
  | "thisMonth"
  | "lastMonth"
  | "thisYear"
  | "custom";

export interface DateRange {

  preset: DatePreset;

  from: Date;

  to: Date;

}

interface DateRangeState {

  range: DateRange;

  setRange: (range: DateRange) => void;

}

export const useDateRangeStore = create<DateRangeState>((set) => ({

  range: {

    preset: "thisMonth",

    from: new Date(),

    to: new Date(),

  },

  setRange: (range) =>

    set({

      range,

    }),

}));