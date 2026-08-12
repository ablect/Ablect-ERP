import { Plus } from "lucide-react";

export default function CreatePerformanceReviewButton() {
  return (
    <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700">
      <Plus size={16} /> New performance review
    </button>
  );
}
