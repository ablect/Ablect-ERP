import {

reportExportService

}

from "../services/ReportExportService";

import {

useReports

}

from "./useReports";

import type {

ExportFormat

}

from "../types/ExportFormat";

export function useExportReport() {

  const {

    metrics,

  } = useReports();

  function exportReport(

    format: ExportFormat,

  ) {

    reportExportService.export(

      format,

      metrics,

    );

  }

  return {

    exportReport,

  };

}