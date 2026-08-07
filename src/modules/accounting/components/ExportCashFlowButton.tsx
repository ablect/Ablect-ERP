import {
  useExportCashFlow,
} from "../hooks/useExportCashFlow";

export default function ExportCashFlowButton() {

  const {
    exportReport,
  } = useExportCashFlow();

  return (
    <button
      onClick={exportReport}
      className="px-4 py-2 rounded-md border"
    >
      Export
    </button>
  );

}