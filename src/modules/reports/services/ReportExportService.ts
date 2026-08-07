import type {

ExportFormat

}

from "../types/ExportFormat";

import {

reportFileName

}

from "../utils/reportFileName";

import {

downloadTextFile

}

from "../utils/downloadTextFile";

import {

convertMetricsToCSV

}

from "../utils/convertMetricsToCSV";

import {

prepareExcelData

}

from "../utils/prepareExcelData";

import {

exportExcel

}

from "../utils/exportExcel";

import {

preparePdfTable

}

from "../utils/preparePdfTable";

import {

pdfHeaders

}

from "../utils/pdfHeaders";

import {

exportPdf

}

from "../utils/exportPdf";

export const reportExportService = {

  export(

    format: ExportFormat,

    data: any,

  ) {

    if (format === "csv") {

      downloadTextFile(

        reportFileName("csv"),

        convertMetricsToCSV(data),

      );

      return;

    }

    if (format === "excel") {

      exportExcel(

        reportFileName("excel"),

        prepareExcelData(data),

      );

      return;

    }

    exportPdf(

      reportFileName("pdf"),

      "Business ERP Report",

      pdfHeaders,

      preparePdfTable(data),

    );

  },

};