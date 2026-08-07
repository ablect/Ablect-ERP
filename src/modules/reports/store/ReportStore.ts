import { create } from "zustand";

import type { ReportMetric }
from "../types/ReportMetric";

type ReportState = {

  metrics: ReportMetric[];

  setMetrics: (
    metrics: ReportMetric[]
  ) => void;

};

export const useReportStore =
create<ReportState>((set) => ({

  metrics: [],

  setMetrics(metrics) {

    set({

      metrics,

    });

  },

}));