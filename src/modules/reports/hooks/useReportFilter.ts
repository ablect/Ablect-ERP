import {

useReportFilterStore

}

from "../store/ReportFilterStore";

export function useReportFilter() {

  const {

    filter,

    setFilter,

  } = useReportFilterStore();

  return {

    filter,

    setFilter,

  };

}