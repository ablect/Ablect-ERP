import type {
  KPIComparison,
} from "../types/KPIComparison";

type Props = {

  comparison: KPIComparison;

};

export default function KPIComparisonBadge({

  comparison,

}: Props) {

  const positive =
    comparison.change >= 0;

  return (

    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        positive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >

      {positive ? "▲" : "▼"}

      <span className="ml-1">

        {Math.abs(comparison.change).toFixed(1)}%

      </span>

    </div>

  );

}