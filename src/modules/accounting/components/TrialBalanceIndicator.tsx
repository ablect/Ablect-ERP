export default function TrialBalanceIndicator({ balanced = true }: { balanced?: boolean }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${balanced ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{balanced ? "Balanced" : "Needs review"}</span>;
}
