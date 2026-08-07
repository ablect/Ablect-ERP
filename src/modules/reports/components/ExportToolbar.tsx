import ExportButton
from "./ExportButton";

import {

useExportReport

}

from "../hooks/useExportReport";

export default function ExportToolbar() {

  const {

    exportReport,

  } = useExportReport();

  return (

    <div className="flex flex-wrap gap-3">

      <ExportButton

        label="Export PDF"

        onClick={() =>

          exportReport("pdf")

        }

      />

      <ExportButton

        label="Export Excel"

        onClick={() =>

          exportReport("excel")

        }

      />

      <ExportButton

        label="Export CSV"

        onClick={() =>

          exportReport("csv")

        }

      />

    </div>

  );

}