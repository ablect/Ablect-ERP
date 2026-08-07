import { create } from "zustand";

import type { ReportFilter }
from "../types/ReportFilter";

type ReportFilterState = {

  filter: ReportFilter;

  setFilter: (
    filter: ReportFilter
  ) => void;

};

export const useReportFilterStore =
create<ReportFilterState>((set) => ({

  filter: {

    startDate: null,

    endDate: null,

  },

  setFilter(filter) {

    set({

      filter,

    });

  },

}));